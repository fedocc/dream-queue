from __future__ import annotations

import json
import csv
import struct
import zlib
from pathlib import Path

from baseline_simulation import run as run_baseline
from optimized_simulation import run as run_optimized


ROOT = Path(__file__).resolve().parents[2]
CHARTS = ROOT / "outputs" / "charts"
REPORTS = ROOT / "outputs" / "reports"


def try_matplotlib():
    try:
        import matplotlib.pyplot as plt

        return plt
    except Exception:
        return None


def _png_chunk(chunk_type: bytes, data: bytes) -> bytes:
    return struct.pack(">I", len(data)) + chunk_type + data + struct.pack(">I", zlib.crc32(chunk_type + data) & 0xFFFFFFFF)


def _write_png(path: Path, width: int, height: int, pixels: list[list[tuple[int, int, int]]]) -> None:
    raw = b"".join(b"\x00" + b"".join(bytes(pixel) for pixel in row) for row in pixels)
    payload = b"\x89PNG\r\n\x1a\n"
    payload += _png_chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0))
    payload += _png_chunk(b"IDAT", zlib.compress(raw, 9))
    payload += _png_chunk(b"IEND", b"")
    path.write_bytes(payload)


def _draw_rect(pixels: list[list[tuple[int, int, int]]], x0: int, y0: int, x1: int, y1: int, color: tuple[int, int, int]) -> None:
    height = len(pixels)
    width = len(pixels[0])
    for y in range(max(0, y0), min(height, y1)):
        for x in range(max(0, x0), min(width, x1)):
            pixels[y][x] = color


def write_bar_png(path: Path, values: list[float], colors: list[tuple[int, int, int]], width: int = 760, height: int = 420) -> None:
    pixels = [[(248, 250, 248) for _ in range(width)] for _ in range(height)]
    margin = 52
    chart_h = height - margin * 2
    max_value = max(values) or 1
    _draw_rect(pixels, margin, height - margin, width - margin, height - margin + 2, (90, 100, 96))
    bar_space = (width - margin * 2) / len(values)
    for idx, value in enumerate(values):
        bar_w = int(bar_space * 0.55)
        x0 = int(margin + idx * bar_space + (bar_space - bar_w) / 2)
        x1 = x0 + bar_w
        bar_h = int(chart_h * value / max_value)
        y0 = height - margin - bar_h
        _draw_rect(pixels, x0, y0, x1, height - margin, colors[idx % len(colors)])
        _draw_rect(pixels, x0, y0, x1, y0 + 4, (35, 48, 44))
    _write_png(path, width, height, pixels)


def write_grouped_bar_png(path: Path, before: list[float], after: list[float], width: int = 960, height: int = 420) -> None:
    pixels = [[(248, 250, 248) for _ in range(width)] for _ in range(height)]
    margin = 52
    chart_h = height - margin * 2
    max_value = max(before + after) or 1
    _draw_rect(pixels, margin, height - margin, width - margin, height - margin + 2, (90, 100, 96))
    group_space = (width - margin * 2) / len(before)
    for idx, (left, right) in enumerate(zip(before, after)):
        bar_w = max(8, int(group_space * 0.28))
        base_x = int(margin + idx * group_space + group_space * 0.22)
        for offset, value, color in [(0, left, (185, 80, 69)), (bar_w + 3, right, (63, 143, 112))]:
            x0 = base_x + offset
            x1 = x0 + bar_w
            bar_h = int(chart_h * value / max_value)
            y0 = height - margin - bar_h
            _draw_rect(pixels, x0, y0, x1, height - margin, color)
    _write_png(path, width, height, pixels)


def main() -> None:
    CHARTS.mkdir(parents=True, exist_ok=True)
    REPORTS.mkdir(parents=True, exist_ok=True)
    baseline = run_baseline()
    optimized = run_optimized()
    summary = {"baseline": baseline.__dict__, "optimized": optimized.__dict__}
    (REPORTS / "simulation_summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    revenue = read_revenue_scenarios()

    plt = try_matplotlib()
    if plt is None:
        write_bar_png(
            CHARTS / "before_after_wait_time.png",
            [baseline.avg_wait_time, optimized.avg_wait_time],
            [(185, 80, 69), (63, 143, 112)],
        )
        names = list(baseline.attraction_loads.keys())
        write_grouped_bar_png(
            CHARTS / "queue_load_by_attraction.png",
            [baseline.attraction_loads[n] for n in names],
            [optimized.attraction_loads.get(n, 0) for n in names],
        )
        write_bar_png(
            CHARTS / "revenue_scenarios.png",
            list(revenue.values()),
            [(138, 167, 194), (63, 143, 112), (196, 136, 60)],
        )
        write_bar_png(
            CHARTS / "visitor_satisfaction.png",
            [baseline.visitor_satisfaction_score, optimized.visitor_satisfaction_score],
            [(185, 80, 69), (63, 143, 112)],
        )
        print("matplotlib unavailable; wrote simple PNG charts with stdlib renderer")
        return

    plt.figure(figsize=(6, 4))
    plt.bar(["Without product", "With product"], [baseline.avg_wait_time, optimized.avg_wait_time], color=["#d95f5f", "#3f8f70"])
    plt.ylabel("Average wait, minutes")
    plt.title("Average Wait Time")
    plt.tight_layout()
    plt.savefig(CHARTS / "before_after_wait_time.png", dpi=160)
    plt.close()

    names = list(baseline.attraction_loads.keys())
    plt.figure(figsize=(9, 4))
    plt.bar(names, [baseline.attraction_loads[n] for n in names], alpha=0.75, label="Without product")
    plt.bar(names, [optimized.attraction_loads.get(n, 0) for n in names], alpha=0.75, label="With product")
    plt.ylabel("Peak estimated wait, minutes")
    plt.xticks(rotation=30, ha="right")
    plt.legend()
    plt.tight_layout()
    plt.savefig(CHARTS / "queue_load_by_attraction.png", dpi=160)
    plt.close()

    plt.figure(figsize=(6, 4))
    plt.bar(revenue.keys(), revenue.values(), color=["#8aa7c2", "#3f8f70", "#c4883c"])
    plt.ylabel("Annual fast-slot revenue, RUB")
    plt.title("Revenue Scenarios")
    plt.tight_layout()
    plt.savefig(CHARTS / "revenue_scenarios.png", dpi=160)
    plt.close()

    plt.figure(figsize=(6, 4))
    plt.bar(["Without product", "With product"], [baseline.visitor_satisfaction_score, optimized.visitor_satisfaction_score], color=["#d95f5f", "#3f8f70"])
    plt.ylim(0, 100)
    plt.ylabel("Satisfaction score")
    plt.title("Visitor Satisfaction")
    plt.tight_layout()
    plt.savefig(CHARTS / "visitor_satisfaction.png", dpi=160)
    plt.close()
    print(f"wrote charts to {CHARTS}")


def read_revenue_scenarios() -> dict[str, float]:
    path = REPORTS / "financial_scenarios.csv"
    if not path.exists():
        return {"Conservative": 0.0, "Base": 0.0, "Aggressive": 0.0}
    with path.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))
    return {
        row["scenario"].capitalize(): float(row["annual_fast_slot_revenue"])
        for row in rows
    }


if __name__ == "__main__":
    main()
