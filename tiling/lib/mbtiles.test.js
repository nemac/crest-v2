import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { listTiles, mbtilesLoadSql, wgs84Bounds } from "./mbtiles.js";

describe("listTiles", () => {
  let dir;
  beforeEach(() => {
    dir = mkdtempSync(path.join(os.tmpdir(), "crest-tiles-"));
    [
      [13, 2390, 5069],
      [13, 2390, 5068],
      [10, 317, 652],
    ].forEach(([z, x, y]) => {
      mkdirSync(path.join(dir, String(z), String(x)), { recursive: true });
      writeFileSync(path.join(dir, String(z), String(x), `${y}.png`), "");
    });
    writeFileSync(path.join(dir, "13", "2390", "notes.txt"), "");
    writeFileSync(path.join(dir, "leaflet.html"), "");
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it("returns png tiles sorted by zoom, column, row and ignores other files", () => {
    expect(listTiles(dir)).toEqual([
      { z: 10, x: 317, y: 652, file: path.join(dir, "10", "317", "652.png") },
      {
        z: 13,
        x: 2390,
        y: 5068,
        file: path.join(dir, "13", "2390", "5068.png"),
      },
      {
        z: 13,
        x: 2390,
        y: 5069,
        file: path.join(dir, "13", "2390", "5069.png"),
      },
    ]);
  });
});

describe("mbtilesLoadSql", () => {
  const tiles = [
    { z: 10, x: 317, y: 652, file: "/w/t/10/317/652.png" },
    { z: 13, x: 2390, y: 5069, file: "/w/it's/13/2390/5069.png" },
  ];

  it("creates the schema, metadata, one insert per tile, and the index", () => {
    const sql = mbtilesLoadSql({
      name: "storm_surge",
      tiles,
      bounds: "-78.93,35.51,-66.53,47.45",
    });
    expect(sql).toBe(
      [
        "PRAGMA journal_mode=OFF;",
        "PRAGMA synchronous=OFF;",
        "CREATE TABLE metadata (name text, value text);",
        "CREATE TABLE tiles (zoom_level integer, tile_column integer, tile_row integer, tile_data blob);",
        "INSERT INTO metadata VALUES ('name','storm_surge');",
        "INSERT INTO metadata VALUES ('format','png');",
        "INSERT INTO metadata VALUES ('type','overlay');",
        "INSERT INTO metadata VALUES ('version','1');",
        "INSERT INTO metadata VALUES ('minzoom','10');",
        "INSERT INTO metadata VALUES ('maxzoom','13');",
        "INSERT INTO metadata VALUES ('bounds','-78.93,35.51,-66.53,47.45');",
        "BEGIN;",
        "INSERT INTO tiles VALUES (10,317,652,readfile('/w/t/10/317/652.png'));",
        "INSERT INTO tiles VALUES (13,2390,5069,readfile('/w/it''s/13/2390/5069.png'));",
        "COMMIT;",
        "CREATE UNIQUE INDEX tile_index ON tiles (zoom_level, tile_column, tile_row);",
        "",
      ].join("\n"),
    );
  });

  it("omits the bounds row when bounds are unknown", () => {
    const sql = mbtilesLoadSql({ name: "x", tiles, bounds: null });
    expect(sql).not.toMatch(/bounds/);
  });

  it("refuses an empty tile list", () => {
    expect(() =>
      mbtilesLoadSql({ name: "x", tiles: [], bounds: null }),
    ).toThrow(/no tiles/);
  });
});

describe("wgs84Bounds", () => {
  it("returns minx,miny,maxx,maxy from gdalinfo's wgs84Extent ring", () => {
    const json = {
      wgs84Extent: {
        type: "Polygon",
        coordinates: [
          [
            [-76.1354, 47.4526],
            [-78.9306, 37.019],
            [-70.5628, 35.5051],
            [-66.5337, 45.6813],
            [-76.1354, 47.4526],
          ],
        ],
      },
    };
    expect(wgs84Bounds(json)).toBe("-78.930600,35.505100,-66.533700,47.452600");
  });
});
