#!/usr/bin/env python3
"""Convert every TIFF in a local folder to a Cloud-Optimized GeoTIFF, remapping nodata (cogeotiff.py --convert_nodata)."""
import argparse
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
from tools import cogeotiff  # noqa: E402


def matching_files(folder, extension):
    return [os.path.join(folder, name) for name in sorted(os.listdir(folder)) if name.endswith(extension)]


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("folder", help="folder that holds the TIFFs")
    parser.add_argument("--ext", default=".tif", help="only convert files with this extension (default: .tif)")
    args = parser.parse_args(argv)
    for path in matching_files(args.folder, args.ext):
        cogeotiff.main(["--convert_nodata", path])


if __name__ == "__main__":
    main()
