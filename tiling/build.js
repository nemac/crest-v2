#!/usr/bin/env node
import { mkdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { paletteToColorFile } from "./lib/colorFile.js";
import { buildLayerCommands, layerPaths } from "./lib/commands.js";
import { auditValues, parseHistogramValues } from "./lib/audit.js";
import { wgs84Bounds } from "./lib/mbtiles.js";
import { captureJson, readJson, runCommands } from "./lib/run.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");

export function buildLayer(
  layerName,
  {
    manifest,
    palettes,
    dryRun = false,
    keepIntermediates = false,
    sourceDir,
    workDir,
    outDir,
  },
) {
  const layer = manifest.layers.find((l) => l.name === layerName);
  if (!layer) {
    throw new Error(`No layer named "${layerName}" in the manifest`);
  }
  const palette = palettes[layer.palette];
  if (!palette) {
    throw new Error(
      `No palette named "${layer.palette}" for layer ${layerName}`,
    );
  }
  mkdirSync(workDir, { recursive: true });
  mkdirSync(outDir, { recursive: true });

  const sourcePath = path.join(sourceDir, layer.source);
  const paths = layerPaths({ name: layer.name, workDir, outDir });
  writeFileSync(paths.colorFile, paletteToColorFile(palette));

  let bounds = null;
  if (!dryRun) {
    console.log(`\n[audit] gdalinfo -json -hist ${sourcePath}`);
    const info = captureJson("gdalinfo", ["-json", "-hist", sourcePath]);
    const present = parseHistogramValues(info);
    const nodata = layer.nodata ?? manifest.nodata;
    const allowed = [...palette.map((e) => e.value), nodata];
    const audit = auditValues(present, allowed);
    console.log(`[audit] values present: ${present.join(", ")}`);
    if (!audit.ok) {
      throw new Error(
        `[audit] ${layerName} contains values with no palette entry: ${audit.unexpected.join(", ")}`,
      );
    }
    bounds = wgs84Bounds(info);
    console.log(`[audit] wgs84 bounds: ${bounds}`);
  }

  if (!dryRun) {
    rmSync(paths.tileDir, { recursive: true, force: true });
    rmSync(paths.mbtiles, { force: true });
  }

  runCommands(
    buildLayerCommands({
      name: layer.name,
      sourcePath,
      colorFilePath: paths.colorFile,
      workDir,
      outDir,
      bounds,
    }),
    { dryRun },
  );

  if (!dryRun) {
    const megabytes = statSync(paths.pmtiles).size / 1024 / 1024;
    console.log(`\n[result] ${paths.pmtiles} ${megabytes.toFixed(1)} MB`);
    rmSync(paths.tileDir, { recursive: true, force: true });
    if (!keepIntermediates) {
      rmSync(paths.rgbaTif, { force: true });
      rmSync(paths.mbtiles, { force: true });
    }
  }
  return paths.pmtiles;
}

function main(argv) {
  const dryRun = argv.includes("--dry-run");
  const keepIntermediates = argv.includes("--keep-intermediates");
  const targets = argv.filter((a) => !a.startsWith("--"));
  const manifest = readJson(path.join(here, "layers.json"));
  const palettes = readJson(
    path.join(repoRoot, "src/configuration/palettes/conus.json"),
  );
  const names = argv.includes("--all")
    ? manifest.layers.map((l) => l.name)
    : targets;
  if (names.length === 0) {
    console.error(
      "Usage: node tiling/build.js <layer name> | --all [--dry-run] [--keep-intermediates]",
    );
    process.exit(1);
  }
  const options = {
    manifest,
    palettes,
    dryRun,
    keepIntermediates,
    sourceDir: path.join(repoRoot, manifest.sourceDir),
    workDir: path.join(here, "work"),
    outDir: path.join(here, "work", "out"),
  };
  names.forEach((name) => {
    console.log(`\n===== ${name} =====`);
    buildLayer(name, options);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(`\n${error.message}`);
    process.exit(1);
  }
}
