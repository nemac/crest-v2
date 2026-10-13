#! /usr/bin/env python
"""Copy a region's rasters from the dataset bucket into a local directory."""
import argparse
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
from src import config as cfg  # noqa: E402


def download_commands(config, region, dir_path):
    bucket = config["dataset_bucket"]
    return [f's3://{bucket}/{dataset["path"]}' for dataset in config["datasets"][region]], dir_path


def download_region(config, region, dir_path):
    sources, dest = download_commands(config, region, dir_path)
    for source in sources:
        command = f"aws s3 cp {source} {dest}"
        print(command)
        os.system(command)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dir", required=True)
    parser.add_argument("--region", required=True, help="a key under datasets in config.yml")
    parser.add_argument("--config", help="alternative config.yml (default: CONFIG_PATH or src/config.yml)")
    args = parser.parse_args(argv)
    download_region(cfg.load_config(args.config), args.region, args.dir)


if __name__ == "__main__":
    main()
