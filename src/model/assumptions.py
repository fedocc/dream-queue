from __future__ import annotations

from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
ASSUMPTIONS_PATH = ROOT / "configs" / "assumptions.yaml"


def _parse_scalar(value: str) -> Any:
    value = value.strip()
    if value == "":
        return {}
    try:
        if "." in value:
            return float(value)
        return int(value)
    except ValueError:
        return value


def load_yaml_like(path: Path = ASSUMPTIONS_PATH) -> dict[str, Any]:
    data: dict[str, Any] = {}
    stack: list[tuple[int, dict[str, Any]]] = [(-1, data)]
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        if not raw_line.strip() or raw_line.strip().startswith("#"):
            continue
        indent = len(raw_line) - len(raw_line.lstrip(" "))
        key, _, value = raw_line.strip().partition(":")
        while stack and indent <= stack[-1][0]:
            stack.pop()
        parent = stack[-1][1]
        parsed = _parse_scalar(value)
        parent[key] = parsed
        if parsed == {}:
            stack.append((indent, parent[key]))
    return data

