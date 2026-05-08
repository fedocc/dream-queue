from __future__ import annotations

import json
import os
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = ROOT / "data" / "raw" / "reviews" / "apify"
CONFIG_PATH = ROOT / "configs" / "review_sources.yaml"


def parse_simple_yaml(path: Path) -> dict[str, Any]:
    """Small YAML subset parser to avoid adding a dependency for one config."""
    root: dict[str, Any] = {}
    stack: list[tuple[int, Any]] = [(-1, root)]
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.split("#", 1)[0].rstrip()
        if not line.strip():
            continue
        indent = len(line) - len(line.lstrip(" "))
        stripped = line.strip()
        while indent <= stack[-1][0]:
            stack.pop()
        parent = stack[-1][1]
        if stripped.startswith("- "):
            value = stripped[2:].strip()
            if not isinstance(parent, list):
                raise ValueError(f"List item without list parent: {raw}")
            parent.append(value)
            continue
        key, _, value = stripped.partition(":")
        if value.strip() == "":
            next_container: Any = [] if key == "start_urls" else {}
            parent[key] = next_container
            stack.append((indent, next_container))
        else:
            parsed: Any = value.strip()
            if parsed in {"true", "false"}:
                parsed = parsed == "true"
            else:
                try:
                    parsed = int(parsed)
                except ValueError:
                    pass
            parent[key] = parsed
    return root


def api_request(method: str, url: str, token: str, payload: dict[str, Any] | None = None) -> dict[str, Any]:
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Apify API error {exc.code}: {body}") from exc


def actor_run_url(actor_id: str) -> str:
    encoded = urllib.parse.quote(actor_id, safe="")
    return f"https://api.apify.com/v2/acts/{encoded}/runs"


def start_actor(actor_id: str, token: str, payload: dict[str, Any]) -> str:
    result = api_request("POST", actor_run_url(actor_id), token, payload)
    return result["data"]["id"]


def wait_for_run(run_id: str, token: str, poll_seconds: int = 8) -> dict[str, Any]:
    url = f"https://api.apify.com/v2/actor-runs/{run_id}"
    while True:
        result = api_request("GET", url, token)
        status = result["data"]["status"]
        if status in {"SUCCEEDED", "FAILED", "ABORTED", "TIMED-OUT"}:
            return result["data"]
        print(f"run {run_id}: {status}")
        time.sleep(poll_seconds)


def fetch_dataset(dataset_id: str, token: str) -> list[dict[str, Any]]:
    url = f"https://api.apify.com/v2/datasets/{dataset_id}/items?clean=true&format=json"
    result = api_request("GET", url, token)
    if not isinstance(result, list):
        raise RuntimeError("Expected dataset items list from Apify")
    return result


def yandex_payload(start_urls: list[str], max_reviews: int) -> dict[str, Any]:
    return {
        "startUrls": [{"url": url} for url in start_urls],
        "maxReviews": max_reviews,
        "language": "ru",
    }


def two_gis_payload(start_urls: list[str], max_reviews: int) -> dict[str, Any]:
    return {
        "startUrls": [{"url": url} for url in start_urls],
        "maxReviews": max_reviews,
        "includeReviews": True,
    }


def main() -> None:
    if "mode: local_only" in CONFIG_PATH.read_text(encoding="utf-8"):
        print("Review collection is disabled: configs/review_sources.yaml is in local_only mode.")
        return

    config = parse_simple_yaml(CONFIG_PATH)
    token = os.environ.get("APIFY_TOKEN")
    if not token:
        raise SystemExit("APIFY_TOKEN is not set. Export it first: export APIFY_TOKEN=...")

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    jobs = [
        (
            "yandex_maps",
            config["apify"]["yandex_maps_actor"],
            yandex_payload(
                config["sources"]["yandex_maps"]["start_urls"],
                config["sources"]["yandex_maps"]["max_reviews"],
            ),
        ),
        (
            "two_gis",
            config["apify"]["two_gis_actor"],
            two_gis_payload(
                config["sources"]["two_gis"]["start_urls"],
                config["sources"]["two_gis"]["max_reviews"],
            ),
        ),
    ]

    for name, actor_id, payload in jobs:
        print(f"starting {name} actor: {actor_id}")
        run_id = start_actor(actor_id, token, payload)
        run = wait_for_run(run_id, token)
        if run["status"] != "SUCCEEDED":
            raise RuntimeError(f"{name} actor finished with {run['status']}")
        items = fetch_dataset(run["defaultDatasetId"], token)
        out_path = OUT_DIR / f"{name}_{run_id}.json"
        out_path.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"wrote {len(items)} items to {out_path}")


if __name__ == "__main__":
    main()
