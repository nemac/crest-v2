#!/usr/bin/env python3
"""Convert a GeoTIFF to a Cloud-Optimized GeoTIFF with gdal_translate and gdaladdo (both must be on PATH)."""
import argparse
import json
import os
import shlex
import subprocess

OVERVIEW_LEVELS = ["2", "4", "8", "16"]


def run(command):
    print(shlex.join(command))
    subprocess.run(command, check=True)


def translate_options(output_format, output_type, resample, blocksize, nodata):
    options = [
        "-stats",
        "-ot", output_type,
        "-of", output_format,
        "-r", resample,
        "-co", "COMPRESS=LZW",
        "-co", "TILED=YES",
        "-co", f"BLOCKXSIZE={blocksize}",
        "-co", f"BLOCKYSIZE={blocksize}",
        "-co", "COPY_SRC_OVERVIEWS=NO",
    ]
    if nodata is not None:
        options += ["-a_nodata", str(nodata)]
    return options


def scale_options(src_dataset):
    """Stretch every band from its own min/max to 0-254, leaving 255 for nodata."""
    info = subprocess.run(["rio", "info", "-v", src_dataset], check=True, capture_output=True, text=True)
    stats = json.loads(info.stdout)["stats"]
    options = []
    for number, band in enumerate(stats, start=1):
        options += [f"-scale_{number}", str(band["min"]), str(band["max"]), "0", "254"]
    return options


def nodata_vrt_path(src_dataset, tmpdir):
    folder = tmpdir or os.path.dirname(src_dataset)
    return os.path.join(folder, os.path.basename(src_dataset) + ".vrt")


def build_nodata_vrt(src_dataset, nodata, vrt_path):
    run(["gdalbuildvrt", "-vrtnodata", str(nodata), vrt_path, src_dataset])


def destination_path(src_dataset, extension):
    return f"{os.path.splitext(src_dataset)[0]}.{extension}"


def move_aside(src_dataset):
    """gdal_translate cannot overwrite its own input, so rename the source to <name>.old first."""
    old_path = f"{src_dataset}.old"
    os.rename(src_dataset, old_path)
    return old_path


def add_overviews(dst_dataset):
    run([
        "gdaladdo",
        "--config", "COMPRESS_OVERVIEW", "DEFLATE",
        "--config", "PREDICTOR_OVERVIEW", "2",
        "--config", "INTERLEAVE_OVERVIEW", "PIXEL",
        "--config", "GDAL_TIFF_OVR_BLOCKSIZE", "128",
        dst_dataset,
        *OVERVIEW_LEVELS,
    ])


def convert_to_cogeotiff(args):
    options = translate_options(args.output_format, args.output_type, args.resample, args.blocksize, args.nodata)
    if args.scale:
        options += scale_options(args.src_dataset)
    dst_dataset = destination_path(args.src_dataset, args.extension)
    vrt_path = None
    if args.convert_nodata and args.nodata is not None:
        vrt_path = nodata_vrt_path(args.src_dataset, args.tmpdir)
        build_nodata_vrt(args.src_dataset, args.nodata, vrt_path)
        source = vrt_path
    elif dst_dataset == args.src_dataset:
        source = move_aside(args.src_dataset)
    else:
        source = args.src_dataset
    try:
        run(["gdal_translate", *options, source, dst_dataset])
    finally:
        if vrt_path and os.path.exists(vrt_path):
            os.remove(vrt_path)
    add_overviews(dst_dataset)
    return dst_dataset


def setup_arg_parser():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("-ext", "--extension", default="tif", help="file extension for the new file")
    parser.add_argument("-of", "--output_format", default="GTiff", help="output format (a GDAL driver)")
    parser.add_argument("-ot", "--output_type", default="Byte", help="output data type")
    parser.add_argument("-r", "--resample", default="average", help="resampling algorithm")
    parser.add_argument("-nd", "-a_nodata", "--nodata", default="255", help="nodata value for the new file")
    parser.add_argument("--tmpdir", help="folder for the temporary nodata VRT (default: next to the source)")
    parser.add_argument("-bs", "--blocksize", "-blocksize", default="256", help="tile block size")
    parser.add_argument(
        "-cn",
        "--convert_nodata",
        action="store_true",
        help="remap the source's nodata pixels to --nodata through an intermediate VRT",
    )
    parser.add_argument("--scale", action="store_true", help="stretch each band to 0-254")
    parser.add_argument("src_dataset")
    return parser


def main(argv=None):
    args = setup_arg_parser().parse_args(argv)
    print(convert_to_cogeotiff(args))


if __name__ == "__main__":
    main()
