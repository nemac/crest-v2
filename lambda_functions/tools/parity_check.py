#!/usr/bin/env python3
"""Compare zonal-stats results for the config test polygons between two zonal_stats URLs."""
import argparse
import json
import math
import os
import sys
import urllib.request

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
from src import config as cfg  # noqa: E402


def fetch(url, region, body):
    request = urllib.request.Request(f"{url.rstrip('/')}/?region={region}&source=parity", data=body.encode("utf-8"),
                                     headers={"content-type": "application/json"}, method="POST")
    with urllib.request.urlopen(request, timeout=150) as response:
        return json.load(response)["features"][0]["properties"]["mean"]


def same(a, b, tolerance):
    if isinstance(a, str) or isinstance(b, str):
        return a == b
    return math.isclose(a, b, abs_tol=tolerance)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", required=True, help="zonal_stats URL to treat as the reference (prod-v2)")
    parser.add_argument("--candidate", required=True, help="zonal_stats URL under test (dev)")
    parser.add_argument("--regions", nargs="*", help="subset of regions (default: every legacy region)")
    parser.add_argument("--tolerance", type=float, default=1e-6)
    args = parser.parse_args()
    config = cfg.load_config()
    regions = args.regions or [r for r in config["test"]["polygons"] if r != "north_atlantic"]
    failures = 0
    for region in regions:
        body = config["test"]["polygons"][region]
        base, candidate = fetch(args.base, region, body), fetch(args.candidate, region, body)
        diffs = [key for key in set(base) | set(candidate) if not same(base.get(key), candidate.get(key), args.tolerance)]
        print(f"{region:28s} keys={len(base)}/{len(candidate)} diffs={len(diffs)}")
        for key in sorted(diffs):
            print(f"  {key}: base={base.get(key)} candidate={candidate.get(key)}")
        failures += bool(diffs)
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
