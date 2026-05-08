"""Placeholder attraction collector.

For the first MVP, attraction data is maintained manually in JSON/YAML.
"""

from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]


def main() -> None:
    print(f"Official-source attraction evidence is stored in {ROOT / 'data' / 'raw' / 'attractions'}")


if __name__ == "__main__":
    main()
