import { describe, expect, it } from "vitest";
import {
  buildBoundaryCommands,
  buildLayerCommands,
  layerPaths,
  tmsToXyzRow,
} from "./commands.js";

const opts = {
  name: "storm_surge",
  sourcePath: "CREST_TIFS/CONUS_NAtl_Storm_Surge_CREST_20260810.tif",
  colorFilePath: "tiling/work/storm_surge.colors.txt",
  workDir: "tiling/work",
  outDir: "tiling/work/out",
};

describe("tmsToXyzRow", () => {
  it("flips the row index within a zoom level", () => {
    expect(tmsToXyzRow(0, 0)).toBe(0);
    expect(tmsToXyzRow(1, 0)).toBe(1);
    expect(tmsToXyzRow(13, 0)).toBe(8191);
    expect(tmsToXyzRow(13, 8191)).toBe(0);
  });
});

describe("layerPaths", () => {
  it("derives every intermediate and output path from the name", () => {
    expect(layerPaths(opts)).toEqual({
      colorFile: "tiling/work/storm_surge.colors.txt",
      rgbaTif: "tiling/work/storm_surge.rgba.tif",
      tileDir: "tiling/work/storm_surge_tiles",
      mbtiles: "tiling/work/storm_surge.mbtiles",
      pmtiles: "tiling/work/out/storm_surge.pmtiles",
    });
  });
});

describe("buildLayerCommands", () => {
  const commands = buildLayerCommands({
    ...opts,
    bounds: "-78.93,35.51,-66.53,47.45",
  });
  const byLabel = Object.fromEntries(commands.map((c) => [c.label, c]));

  it("runs the five steps in order", () => {
    expect(commands.map((c) => c.label)).toEqual([
      "color-relief",
      "tile",
      "mbtiles",
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

  it("tiles all zooms with nearest resampling into a TMS directory, skipping blanks", () => {
    expect(byLabel.tile.cmd).toBe("gdal");
    expect(byLabel.tile.args).toEqual([
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
      "tiling/work/storm_surge.rgba.tif",
      "tiling/work/storm_surge_tiles",
    ]);
  });

  it("loads the tile directory into MBTiles through sqlite3 with SQL generated at run time", () => {
    expect(byLabel.mbtiles.cmd).toBe("sqlite3");
    expect(byLabel.mbtiles.args).toEqual(["tiling/work/storm_surge.mbtiles"]);
    expect(typeof byLabel.mbtiles.input).toBe("function");
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
