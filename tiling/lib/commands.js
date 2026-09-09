import path from "node:path";

export const Z13_RESOLUTION = 156543.03392804097 / 2 ** 13;

export const OVERVIEW_LEVELS = [
  2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192,
];

export function tmsToXyzRow(zoom, tmsRow) {
  return 2 ** zoom - 1 - tmsRow;
}

export function layerPaths({ name, workDir, outDir }) {
  return {
    colorFile: path.join(workDir, `${name}.colors.txt`),
    rgbaTif: path.join(workDir, `${name}.rgba.tif`),
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
      label: "warp",
      cmd: "gdalwarp",
      args: [
        "-t_srs",
        "EPSG:3857",
        "-tr",
        String(Z13_RESOLUTION),
        String(Z13_RESOLUTION),
        "-r",
        "near",
        "-multi",
        "-wo",
        "NUM_THREADS=ALL_CPUS",
        "-of",
        "MBTiles",
        "-co",
        "TILE_FORMAT=PNG",
        "-co",
        `NAME=${name}`,
        paths.rgbaTif,
        paths.mbtiles,
      ],
    },
    {
      label: "overviews",
      cmd: "gdaladdo",
      args: ["-r", "nearest", paths.mbtiles, ...OVERVIEW_LEVELS.map(String)],
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
