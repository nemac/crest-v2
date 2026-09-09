# CREST tiling pipeline

Turns NFWF's class-valued GeoTIFFs into one PMTiles archive per layer, coloured from
`src/configuration/palettes/conus.json`, plus a vector PMTiles archive for the regional
boundary. Replaces the MapServer/MapCache pipeline in nemac/NFWF-tile-creater.

## Prerequisites

- GDAL 3.8 or newer on PATH (`gdaldem`, `gdalwarp`, `gdaladdo`, `gdalinfo`, `ogr2ogr`).
  `brew install gdal`.
- `pmtiles` CLI. `brew install pmtiles`.
- `sqlite3` (smoke test only).
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
   would otherwise render transparent.
3. `gdaldem color-relief -alpha -exact_color_entry`: exact class colours, everything else
   transparent.
4. `gdalwarp` to EPSG:3857 at exactly the zoom 13 resolution, nearest resampling, straight
   into MBTiles (RGBA PNG). The MBTiles writer derives the zoom from the resolution.
5. `gdaladdo -r nearest` builds zooms 12 down to 0.
6. `pmtiles convert`, then `pmtiles show` prints the header.

Nearest resampling everywhere means classes never blend into intermediate colours.

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

## Expected runtimes and sizes (2026-09-09, this MacBook)

Boundary: about 85 seconds, 1.8 MB. Raster layers: a few minutes each for the warp, well under
150 MB each, under 3 GB total. Fill in measured numbers after the first full run.
