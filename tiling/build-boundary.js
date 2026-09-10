#!/usr/bin/env node
import { mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BOUNDARY_NAME, buildBoundaryCommands } from "./lib/commands.js";
import { runCommands } from "./lib/run.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");

const BOUNDARY = {
  name: BOUNDARY_NAME,
  source: "regional_boundary/nfwf_north_atlantic_boundary_092023_Project.shp",
};

function main(argv) {
  const dryRun = argv.includes("--dry-run");
  const workDir = path.join(here, "work");
  const outDir = path.join(workDir, "out");
  mkdirSync(outDir, { recursive: true });
  runCommands(
    buildBoundaryCommands({
      name: BOUNDARY.name,
      sourcePath: path.join(repoRoot, BOUNDARY.source),
      workDir,
      outDir,
    }),
    { dryRun },
  );
  if (!dryRun) {
    const out = path.join(outDir, `${BOUNDARY.name}.pmtiles`);
    console.log(
      `\n[result] ${out} ${(statSync(out).size / 1024 / 1024).toFixed(1)} MB`,
    );
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(`\n${error.message}`);
    process.exit(1);
  }
}
