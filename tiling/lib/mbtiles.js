import { readdirSync } from "node:fs";
import path from "node:path";

const DIGITS = /^\d+$/;

export function listTiles(tileDir) {
  const tiles = readdirSync(tileDir)
    .filter((zName) => DIGITS.test(zName))
    .flatMap((zName) =>
      readdirSync(path.join(tileDir, zName))
        .filter((xName) => DIGITS.test(xName))
        .flatMap((xName) =>
          readdirSync(path.join(tileDir, zName, xName))
            .map((file) => /^(\d+)\.png$/.exec(file))
            .filter((match) => match)
            .map((match) => ({
              z: Number(zName),
              x: Number(xName),
              y: Number(match[1]),
              file: path.join(tileDir, zName, xName, match[0]),
            })),
        ),
    );
  return tiles.sort((a, b) => a.z - b.z || a.x - b.x || a.y - b.y);
}

const quote = (value) => `'${String(value).replace(/'/g, "''")}'`;

export function mbtilesLoadSql({ name, tiles, bounds }) {
  if (tiles.length === 0) {
    throw new Error(`${name}: no tiles to load into MBTiles`);
  }
  const zooms = tiles.map((t) => t.z);
  const metadata = [
    ["name", name],
    ["format", "png"],
    ["type", "overlay"],
    ["version", "1"],
    ["minzoom", String(Math.min(...zooms))],
    ["maxzoom", String(Math.max(...zooms))],
    ...(bounds ? [["bounds", bounds]] : []),
  ];
  return [
    "PRAGMA journal_mode=OFF;",
    "PRAGMA synchronous=OFF;",
    "CREATE TABLE metadata (name text, value text);",
    "CREATE TABLE tiles (zoom_level integer, tile_column integer, tile_row integer, tile_data blob);",
    ...metadata.map(
      ([k, v]) => `INSERT INTO metadata VALUES (${quote(k)},${quote(v)});`,
    ),
    "BEGIN;",
    ...tiles.map(
      (t) =>
        `INSERT INTO tiles VALUES (${t.z},${t.x},${t.y},readfile(${quote(t.file)}));`,
    ),
    "COMMIT;",
    "CREATE UNIQUE INDEX tile_index ON tiles (zoom_level, tile_column, tile_row);",
    "",
  ].join("\n");
}

export function wgs84Bounds(gdalinfoJson) {
  const ring = gdalinfoJson.wgs84Extent.coordinates[0];
  const xs = ring.map((p) => p[0]);
  const ys = ring.map((p) => p[1]);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]
    .map((v) => v.toFixed(6))
    .join(",");
}
