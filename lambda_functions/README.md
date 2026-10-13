# CREST API

The Lambda backend for CREST: identify, zonal statistics, shape upload, and share links.
It lives in this repository so the API deploys from the same branch as the site that calls it.
The history of the former `nemac/nfwf_crest_api` repository is preserved under this folder.

## Layout

- `src/` the five Lambda handlers, shared modules, `config.yml`, and the region VRTs in `src/vrt/`
- `tests/` pytest suite with synthetic rasters built in a temp directory
- `tools/` offline utilities (see Tools)
- `lib/` vendored `libexpat.so.1`, which the AL2023 Python 3.13 Lambda runtime lacks (see `lib/README.md`)
- `template.yaml`, `samconfig.toml`, `Makefile` AWS SAM deployment

## Local setup

```bash
cd lambda_functions
python3.13 -m venv .venv
.venv/bin/pip install -r requirements-dev.txt
brew install gdal   # provides gdalbuildvrt, used by tools/build_vrt.py and the tests
```

## Tests

```bash
.venv/bin/python -m pytest -q
```

## Request contracts

All endpoints are Lambda function URLs. Errors use 400 (bad input, including an unknown region), 404 (share link not
found), 409 (share link already exists), 413 (payload too large), and 500.

- Identify: `GET ?region&lng&lat` returns `{"<layer name>": "<value as string>"}`. NoData and
  off-raster points return `"NaN"`.
- Zonal stats: `POST ?region&source` with a GeoJSON FeatureCollection returns the same collection with
  `properties.mean` set to `{"<layer name>": float | "NaN", "lc_*": float}`. The `lc_*` keys are omitted entirely when no valid land-cover pixel lies inside the polygon. `source` is logged to label the caller.
- Share links: `GET ?shareUrl` reads a saved link, `POST {location, state}` writes one.
- Upload shape: `POST` a FeatureCollection to store a user shape.

The raster reader masks each band by its own NoData and treats values above 100 as invalid (`MAX_VALID` in
`src/rasters.py`), while negative values are kept so signed bands such as vertical land motion work.

## Adding a region

1. Convert each raster with `gdal_translate -of COG` and upload it to the dataset bucket.
2. In `src/config.yml`, add the region under `regions` and its layers under `datasets`
   (plus `<region>_landcover` for the land cover raster).
   A layer with its own NoData sets it per dataset, for example `nodata: 0` on `vertical_land_motion`.
3. Build the VRT against S3 and commit it:
   `.venv/bin/python tools/build_vrt.py --region <key>` (and `--region <key>_landcover`).
   Use `--local DIR` to build from local copies instead.

## Land cover

North Atlantic uses C-CAP 2021, clipped to the regional boundary on the index grid. Regions list their
scheme (`nlcd` or `ccap`) in `config.yml`, and `landcover_classes` maps the `lc_*` keys to class codes.

## Deploy

```bash
PYTHON=.venv/bin/python sam build
AWS_PROFILE=jbliss sam deploy --config-env dev
```

This deploys the `crest-api-dev` stack. `samconfig.toml` also holds a `prod` section, which is not armed.
The dev workflow will run this on push once the OIDC backend deploy lands (follow-up plan). The dev site
workflow reads the function URLs from the stack outputs `IdentifyUrl`, `ZonalStatsUrl`, `UploadShapeUrl`,
`ShareReadUrl`, and `ShareWriteUrl`.

## Parity check

Compares zonal-stats results for the config test polygons between two deployments:

```bash
.venv/bin/python tools/parity_check.py --base <prod zonal_stats url> --candidate <dev zonal_stats url>
```

Options: `--regions` limits the regions and `--tolerance` sets the numeric tolerance (default 1e-6).

## Tools

- `tools/build_vrt.py` builds a region VRT from `config.yml`, one `gdalbuildvrt` call per band.
- `tools/parity_check.py` compares two zonal-stats deployments.
- `tools/cogeotiff.py` converts a GeoTIFF to a Cloud-Optimized GeoTIFF.
- `tools/batch_cogeotiff.py` runs `cogeotiff.py` over a folder of TIFFs.
- `tools/download_rasters.py --region <key> --dir DIR` copies a region's rasters out of the dataset bucket.
- `tools/prep_hubs.py` runs zonal stats over every feature of a boundary shapefile and writes a new
  shapefile using the schema in `tools/hubs_config.py`; `--config` points it at an alternative
  `config.yml` (for example one whose VRTs reference local rasters). The script needs
  `pip install -r requirements-tools.txt` (fiona, pyproj). The one-script rewrite that also covers
  the original hubs layer is tracked in `docs/backlog.md`.
