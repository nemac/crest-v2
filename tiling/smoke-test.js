#!/usr/bin/env node
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { buildLayer } from "./build.js";
import { tmsToXyzRow } from "./lib/commands.js";
import { capture } from "./lib/run.js";

const CLASSES = [-1, 1, 2, 3, 4, 5];
const PALETTE = [
  { value: -1, color: "#00CC44" },
  { value: 1, color: "#CDA0C5" },
  { value: 2, color: "#DF659C" },
  { value: 3, color: "#DF2159" },
  { value: 4, color: "#AA062E" },
  { value: 5, color: "#67000E" },
];
const EXPECTED_RGBA = new Set([
  "0,0,0,0",
  "0,204,68,255",
  "205,160,197,255",
  "223,101,156,255",
  "223,33,89,255",
  "170,6,46,255",
  "103,0,14,255",
]);

function writeFixture(dir) {
  const rows = [];
  for (let y = 0; y < 64; y += 1) {
    const row = [];
    for (let x = 0; x < 64; x += 1) {
      const border = x < 8 || x >= 56 || y < 8 || y >= 56;
      row.push(border ? 0 : CLASSES[Math.floor((x - 8) / 8)]);
    }
    rows.push(row.join(" "));
  }
  const asc = path.join(dir, "fixture.asc");
  writeFileSync(
    asc,
    `ncols 64\nnrows 64\nxllcorner 1800000\nyllcorner 600000\ncellsize 30\nNODATA_value -128\n${rows.join("\n")}\n`,
  );
  const tif = path.join(dir, "fixture.tif");
  capture("gdal_translate", [
    "-q",
    "-ot",
    "Int8",
    "-a_srs",
    "ESRI:102003",
    "-a_nodata",
    "255",
    asc,
    tif,
  ]);
  return tif;
}

function tileColours(pmtiles, mbtiles, dir) {
  const row = capture("sqlite3", [
    "-separator",
    " ",
    mbtiles,
    "select tile_column, tile_row from tiles where zoom_level=13 limit 1",
  ]).trim();
  const [x, yTms] = row.split(" ").map(Number);
  const y = tmsToXyzRow(13, yTms);
  const png = path.join(dir, "tile.png");
  const tile = spawnSync(
    "pmtiles",
    ["tile", pmtiles, "13", String(x), String(y)],
    {
      maxBuffer: 16 * 1024 * 1024,
    },
  );
  if (tile.error) {
    throw new Error(`could not start pmtiles: ${tile.error.message}`);
  }
  if (tile.status !== 0) {
    throw new Error(`pmtiles tile exited with status ${tile.status}`);
  }
  writeFileSync(png, tile.stdout);
  const bands = [1, 2, 3, 4].map((b) => {
    const asc = path.join(dir, `band${b}.asc`);
    capture("gdal_translate", [
      "-q",
      "-of",
      "AAIGrid",
      "-b",
      String(b),
      png,
      asc,
    ]);
    return readFileSync(asc, "utf8")
      .split("\n")
      .slice(6)
      .join(" ")
      .trim()
      .split(/\s+/);
  });
  const seen = new Set();
  bands[0].forEach((_, i) =>
    seen.add(bands.map((band) => Number(band[i])).join(",")),
  );
  return seen;
}

function main() {
  const dir = mkdtempSync(path.join(os.tmpdir(), "crest-tiling-smoke-"));
  try {
    const source = writeFixture(dir);
    const manifest = {
      sourceDir: dir,
      nodata: 255,
      layers: [
        {
          name: "fixture",
          source: path.basename(source),
          palette: "fixture",
          nodata: 0,
        },
      ],
    };
    const pmtiles = buildLayer("fixture", {
      manifest,
      palettes: { fixture: PALETTE },
      keepIntermediates: true,
      sourceDir: dir,
      workDir: path.join(dir, "work"),
      outDir: path.join(dir, "out"),
    });
    const header = capture("pmtiles", ["show", pmtiles]);
    if (!/tile type: png/.test(header) || !/max zoom: 13/.test(header)) {
      throw new Error(`Unexpected pmtiles header:\n${header}`);
    }
    const colours = tileColours(
      pmtiles,
      path.join(dir, "work", "fixture.mbtiles"),
      dir,
    );
    const unexpected = [...colours].filter((c) => !EXPECTED_RGBA.has(c));
    if (unexpected.length > 0) {
      throw new Error(
        `Tile contains colours outside the palette: ${unexpected.join(" | ")}`,
      );
    }
    console.log(
      `\nSMOKE TEST PASSED: ${colours.size} distinct RGBA values, all from the palette.`,
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(`\n${error.message}`);
    process.exit(1);
  }
}
