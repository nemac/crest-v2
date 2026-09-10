import path from "node:path";
import { listTiles, mbtilesLoadSql } from "./mbtiles.js";

export const BOUNDARY_NAME = "north_atlantic_boundary";

export function tmsToXyzRow(zoom, tmsRow) {
  return 2 ** zoom - 1 - tmsRow;
}

export function layerPaths({ name, workDir, outDir }) {
  return {
    colorFile: path.join(workDir, `${name}.colors.txt`),
    rgbaTif: path.join(workDir, `${name}.rgba.tif`),
    tileDir: path.join(workDir, `${name}_tiles`),
    mbtiles: path.join(workDir, `${name}.mbtiles`),
    pmtiles: path.join(outDir, `${name}.pmtiles`),
  };
}

export function buildLayerCommands({
  name,
  sourcePath,
  colorFilePath,
  workDir,
  outDir,
  bounds = null,
}) {
  const paths = layerPaths({ name, workDir, outDir });
  return [
    {
      label: "color-relief",
      cmd: "gdaldem",
      args: [
        "color-relief",
        "-alpha",
        "-exact_color_entry",
        "-co",
        "COMPRESS=DEFLATE",
        "-co",
        "TILED=YES",
        sourcePath,
        colorFilePath,
        paths.rgbaTif,
      ],
    },
    {
      label: "tile",
      cmd: "gdal",
      args: [
        "raster",
        "tile",
        "-q",
        "--tiling-scheme",
        "WebMercatorQuad",
        "--min-zoom",
        "0",
        "--max-zoom",
        "13",
        "-r",
        "nearest",
        "--overview-resampling",
        "nearest",
        "--convention",
        "tms",
        "--skip-blank",
        "--webviewer",
        "none",
        "-j",
        "ALL_CPUS",
        paths.rgbaTif,
        paths.tileDir,
      ],
    },
    {
      label: "mbtiles",
      cmd: "sqlite3",
      args: [paths.mbtiles],
      input: () =>
        mbtilesLoadSql({ name, tiles: listTiles(paths.tileDir), bounds }),
    },
    {
      label: "convert",
      cmd: "pmtiles",
      args: ["convert", paths.mbtiles, paths.pmtiles],
    },
    { label: "show", cmd: "pmtiles", args: ["show", paths.pmtiles] },
  ];
}

export function buildBoundaryCommands({ name, sourcePath, workDir, outDir }) {
  const mbtiles = path.join(workDir, `${name}.mbtiles`);
  const pmtiles = path.join(outDir, `${name}.pmtiles`);
  return [
    {
      label: "vector-tiles",
      cmd: "ogr2ogr",
      args: [
        "-f",
        "MBTiles",
        "-dim",
        "XY",
        "-t_srs",
        "EPSG:3857",
        "-nln",
        "boundary",
        "-dsco",
        "MINZOOM=0",
        "-dsco",
        "MAXZOOM=13",
        "-dsco",
        `NAME=${name}`,
        mbtiles,
        sourcePath,
      ],
    },
    { label: "convert", cmd: "pmtiles", args: ["convert", mbtiles, pmtiles] },
    { label: "show", cmd: "pmtiles", args: ["show", pmtiles] },
  ];
}
