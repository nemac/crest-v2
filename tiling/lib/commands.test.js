import { describe, expect, it } from "vitest";
import {
  OVERVIEW_LEVELS,
  Z13_RESOLUTION,
  buildBoundaryCommands,
  buildLayerCommands,
  layerPaths,
} from "./commands.js";

const opts = {
  name: "storm_surge",
  sourcePath: "CREST_TIFS/CONUS_NAtl_Storm_Surge_CREST_20260810.tif",
  colorFilePath: "tiling/work/storm_surge.colors.txt",
  workDir: "tiling/work",
  outDir: "tiling/work/out",
};

describe("constants", () => {
  it("uses the exact web mercator zoom 13 resolution", () => {
    expect(Z13_RESOLUTION).toBeCloseTo(19.109257071294063, 12);
  });

  it("lists thirteen power-of-two overview levels to reach zoom 0", () => {
    expect(OVERVIEW_LEVELS).toHaveLength(13);
    OVERVIEW_LEVELS.forEach((level, i) => expect(level).toBe(2 ** (i + 1)));
  });
});

describe("layerPaths", () => {
  it("derives every intermediate and output path from the name", () => {
    expect(layerPaths(opts)).toEqual({
      colorFile: "tiling/work/storm_surge.colors.txt",
      rgbaTif: "tiling/work/storm_surge.rgba.tif",
      mbtiles: "tiling/work/storm_surge.mbtiles",
      pmtiles: "tiling/work/out/storm_surge.pmtiles",
    });
  });
});

describe("buildLayerCommands", () => {
  const commands = buildLayerCommands(opts);
  const byLabel = Object.fromEntries(commands.map((c) => [c.label, c]));

  it("runs the five steps in order", () => {
    expect(commands.map((c) => c.label)).toEqual([
      "color-relief",
      "warp",
      "overviews",
      "convert",
      "show",
    ]);
  });

  it("colours with exact entries and an alpha band", () => {
    expect(byLabel["color-relief"].cmd).toBe("gdaldem");
    expect(byLabel["color-relief"].args).toEqual([
      "color-relief",
      "-alpha",
      "-exact_color_entry",
      "-co",
      "COMPRESS=DEFLATE",
      "-co",
      "TILED=YES",
      opts.sourcePath,
      opts.colorFilePath,
      "tiling/work/storm_surge.rgba.tif",
    ]);
  });

  it("warps to web mercator at zoom 13 with nearest resampling into PNG MBTiles", () => {
    const { cmd, args } = byLabel.warp;
    expect(cmd).toBe("gdalwarp");
    expect(args).toEqual([
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
      "NAME=storm_surge",
      "tiling/work/storm_surge.rgba.tif",
      "tiling/work/storm_surge.mbtiles",
    ]);
  });

  it("builds nearest-neighbour overviews down to zoom 0", () => {
    expect(byLabel.overviews.cmd).toBe("gdaladdo");
    expect(byLabel.overviews.args).toEqual([
      "-r",
      "nearest",
      "tiling/work/storm_surge.mbtiles",
      ...OVERVIEW_LEVELS.map(String),
    ]);
  });

  it("converts to pmtiles and shows the header", () => {
    expect(byLabel.convert).toEqual({
      label: "convert",
      cmd: "pmtiles",
      args: [
        "convert",
        "tiling/work/storm_surge.mbtiles",
        "tiling/work/out/storm_surge.pmtiles",
      ],
    });
    expect(byLabel.show).toEqual({
      label: "show",
      cmd: "pmtiles",
      args: ["show", "tiling/work/out/storm_surge.pmtiles"],
    });
  });
});

describe("buildBoundaryCommands", () => {
  const commands = buildBoundaryCommands({
    name: "north_atlantic_boundary",
    sourcePath:
      "regional_boundary/nfwf_north_atlantic_boundary_092023_Project.shp",
    workDir: "tiling/work",
    outDir: "tiling/work/out",
  });

  it("writes 2D vector tiles for zooms 0 to 13 into a layer named boundary", () => {
    expect(commands.map((c) => c.label)).toEqual([
      "vector-tiles",
      "convert",
      "show",
    ]);
    expect(commands[0].cmd).toBe("ogr2ogr");
    expect(commands[0].args).toEqual([
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
      "NAME=north_atlantic_boundary",
      "tiling/work/north_atlantic_boundary.mbtiles",
      "regional_boundary/nfwf_north_atlantic_boundary_092023_Project.shp",
    ]);
    expect(commands[1].args).toEqual([
      "convert",
      "tiling/work/north_atlantic_boundary.mbtiles",
      "tiling/work/out/north_atlantic_boundary.pmtiles",
    ]);
  });
});
