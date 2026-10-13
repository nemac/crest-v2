#!/usr/bin/env python3
"""Build a region VRT from config.yml: one gdalbuildvrt call per band, stitched into one file."""
import argparse
import os
import subprocess
import sys
import tempfile
import xml.etree.ElementTree as ET

import rasterio

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
from src import config as cfg  # noqa: E402

LANDCOVER_SUFFIX = "_landcover"


def output_path(config, key):
    if key.endswith(LANDCOVER_SUFFIX):
        return cfg.region_config(config, key[: -len(LANDCOVER_SUFFIX)])["landcover_vrt"]
    return cfg.region_config(config, key)["vrt"]


def source_path(config, dataset, local_dir, vsi):
    if local_dir:
        return os.path.abspath(os.path.join(local_dir, dataset["path"]))
    return f"{vsi}{config['dataset_bucket']}/{dataset['path']}"


def union_bounds(paths):
    crs = None
    bounds = None
    for path in paths:
        with rasterio.open(path) as src:
            if crs is None:
                crs = src.crs
            elif src.crs != crs:
                raise ValueError(f"{path} has a different projection than {paths[0]}")
            b = src.bounds
            bounds = (b.left, b.bottom, b.right, b.top) if bounds is None else (
                min(bounds[0], b.left), min(bounds[1], b.bottom), max(bounds[2], b.right), max(bounds[3], b.top))
    return bounds


def build_band_vrt(source, nodata, bounds, out_path):
    cmd = ["gdalbuildvrt", "-q", "-overwrite", "-vrtnodata", str(nodata), "-te", *[repr(v) for v in bounds], out_path, source]
    subprocess.run(cmd, check=True)
    root = ET.parse(out_path).getroot()
    for element in root.iter("SourceFilename"):
        element.set("relativeToVRT", "0")
        element.text = source
    return root


def build_vrt(config, key, local_dir=None, vsi="/vsis3/"):
    datasets = config["datasets"][key]
    nodatas = cfg.dataset_nodata(config, key)
    sources = [source_path(config, dataset, local_dir, vsi) for dataset in datasets]
    bounds = union_bounds(sources)
    out = output_path(config, key)
    root = None
    with tempfile.TemporaryDirectory() as tmp:
        for number, (source, nodata) in enumerate(zip(sources, nodatas), start=1):
            band_root = build_band_vrt(source, nodata, bounds, os.path.join(tmp, f"band{number}.vrt"))
            band = band_root.find("VRTRasterBand")
            band.set("band", str(number))
            if root is None:
                root = band_root
            else:
                root.append(band)
    ET.indent(root, space="  ")
    ET.ElementTree(root).write(out)
    return out


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--region", required=True, help="datasets key, e.g. north_atlantic or north_atlantic_landcover")
    parser.add_argument("--config", help="config.yml path (default: src/config.yml or $CONFIG_PATH)")
    parser.add_argument("--local", metavar="DIR", help="read sources from DIR instead of S3")
    parser.add_argument("--vsi", default="/vsis3/", help="GDAL VSI prefix for cloud sources")
    args = parser.parse_args()
    print(build_vrt(cfg.load_config(args.config), args.region, args.local, args.vsi))


if __name__ == "__main__":
    main()
