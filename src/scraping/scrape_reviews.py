"""Placeholder scraper interface.

The MVP starts with manually collected review JSON. Replace this module with
source-specific scrapers only after checking robots.txt and site terms.
"""

from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]


def main() -> None:
    print(f"Real-sourced review evidence is stored in {ROOT / 'data' / 'raw' / 'reviews'}")


if __name__ == "__main__":
    main()
