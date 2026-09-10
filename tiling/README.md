# CREST tiling pipeline

Turns NFWF's class-valued GeoTIFFs into one PMTiles archive per layer, coloured from
`src/configuration/palettes/conus.json`, plus a vector PMTiles archive for the regional
boundary. Replaces the MapServer/MapCache pipeline in nemac/NFWF-tile-creater.

## Prerequisites

- GDAL 3.11 or newer on PATH (`gdaldem`, `gdal raster tile`, `gdalinfo`, `ogr2ogr`). `brew install gdal`.
- `pmtiles` CLI. `brew install pmtiles`.
- `sqlite3` (loads each tile directory into MBTiles; also used by the smoke test).
- AWS CLI with the `jbliss` profile (upload only).
- Source data, both gitignored: `CREST_TIFS/` holding the TIFs named in `layers.json`, and
  `regional_boundary/` holding the North Atlantic boundary shapefile.

## Run

```bash
npm test                              # palette, manifest, command, and audit unit tests
node tiling/smoke-test.js             # real GDAL run on a 64x64 fixture, about 10 seconds
node tiling/build.js storm_surge      # one layer
node tiling/build.js --all            # all 23 layers
node tiling/build-boundary.js         # boundary vector tiles
node tiling/upload.js --all           # dry run: prints the aws commands
AWS_PROFILE=jbliss node tiling/upload.js --all --yes   # only with Jeff's go-ahead
```

Add `--dry-run` to either build command to print the GDAL commands without running them.
Outputs land in `tiling/work/out/<name>.pmtiles`; intermediates in `tiling/work/`.

## What each layer build does

1. Writes `<name>.colors.txt` from the palette: `value R G B 255` per class.
2. Audits the source with `gdalinfo -json -hist`: every pixel value must be in the palette
   or be the layer's NoData (the manifest default, or a per-layer override). A missing class
   would otherwise render transparent. The same call supplies the WGS84 bounds.
3. `gdaldem color-relief -alpha -exact_color_entry`: exact class colours, everything else
   transparent.
4. `gdal raster tile` (GDAL 3.11+): every zoom from 0 to 13 as PNG files in a TMS-numbered
   directory, nearest resampling for both the base zoom and the overviews, blank tiles
   skipped, all CPUs.
5. A sqlite3 script loads that directory into MBTiles with `readfile()`, writing the
   `metadata` rows (name, format, type, version, minzoom, maxzoom, bounds).
6. `pmtiles convert`, then `pmtiles show` prints the header. The tile directory is deleted.

Nearest resampling everywhere means classes never blend into intermediate colours.

Do not go back to `gdalwarp -of MBTiles`: its temporary `partial_tiles.db` grows without bound
on the large layers and the build never finishes.

## Vertical Land Motion

The source is Int8 (signed) to hold the -1 uplift class, with NoData declared as 255, which
Int8 cannot hold, so its background is unmasked 0. Jessica Orlando confirmed (Slack,
2026-09-09) that 0 was stripped from every input and may be treated as NoData. The manifest
sets `"nodata": 0` for this layer so the audit accepts it; since 0 has no palette entry it
renders transparent. The zonal-statistics copy of this raster needs the same treatment
(`gdal_edit.py -a_nodata 0`) and a backend change to accept -1; both are tracked outside this
repo.

## Hosting

Archives are served from `https://tiles.resilientcoasts.org/dev/conus/<name>.pmtiles`
(bucket `tiles.resilientcoasts.org`, CloudFront `E34VC6CQ814IM`). Range requests and CORS
were verified working through that distribution. The repo's deploy IAM user cannot write to
that bucket; uploads are manual with `AWS_PROFILE=jbliss`. Re-uploading a layer needs the
invalidation the upload script issues.

## Measured runtimes and sizes (2026-09-10, 16-core MacBook, all 23 layers sequentially)

The `gdal raster tile` step takes 11 to 21 seconds per layer and the MBTiles load under 2
seconds; a full `node tiling/build.js --all` run finishes in about 10 minutes. Archive sizes
track how much of the region a layer covers: the five summary indices are 264 to 556 MB each,
the threat and wildlife inputs 26 to 330 MB, Critical Facilities 9 MB. All 23 raster archives
total 4.8 GB; the boundary is 1.8 MB (85 seconds). Tiles are RGBA PNG; WebP lossless would be
smaller if size ever matters.
