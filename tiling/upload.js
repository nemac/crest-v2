#!/usr/bin/env node
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readJson, runCommands } from "./lib/run.js";

const here = path.dirname(fileURLToPath(import.meta.url));
export const BUCKET = "tiles.resilientcoasts.org";
export const PREFIX = "dev/conus";
export const DISTRIBUTION_ID = "E34VC6CQ814IM";

export function uploadCommands(names, outDir) {
  const copies = names.map((name) => ({
    label: `upload ${name}`,
    cmd: "aws",
    args: [
      "s3",
      "cp",
      path.join(outDir, `${name}.pmtiles`),
      `s3://${BUCKET}/${PREFIX}/${name}.pmtiles`,
      "--content-type",
      "application/octet-stream",
      "--cache-control",
      "public,max-age=3600",
    ],
  }));
  return [
    ...copies,
    {
      label: "invalidate",
      cmd: "aws",
      args: [
        "cloudfront",
        "create-invalidation",
        "--distribution-id",
        DISTRIBUTION_ID,
        "--paths",
        `/${PREFIX}/*`,
      ],
    },
  ];
}

function main(argv) {
  const yes = argv.includes("--yes");
  const outDir = path.join(here, "work", "out");
  const manifest = readJson(path.join(here, "layers.json"));
  const names = argv.includes("--all")
    ? [...manifest.layers.map((l) => l.name), "north_atlantic_boundary"]
    : argv.filter((a) => !a.startsWith("--"));
  if (names.length === 0) {
    console.error("Usage: node tiling/upload.js <name> | --all [--yes]");
    process.exit(1);
  }
  const missing = names.filter(
    (n) => !existsSync(path.join(outDir, `${n}.pmtiles`)),
  );
  if (missing.length > 0) {
    throw new Error(`Not built yet: ${missing.join(", ")}`);
  }
  if (yes && !process.env.AWS_PROFILE) {
    throw new Error("Set AWS_PROFILE (jbliss) before uploading");
  }
  if (!yes) {
    console.log(
      "Dry run. Re-run with --yes to upload. Never do that without Jeff's go-ahead.",
    );
  }
  runCommands(uploadCommands(names, outDir), { dryRun: !yes });
}

try {
  main(process.argv.slice(2));
} catch (error) {
  console.error(`\n${error.message}`);
  process.exit(1);
}
