import { describe, expect, it } from "vitest";
import { mkdtempSync, writeFileSync, existsSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { buildLayer } from "./build.js";

const options = {
  manifest: {
    sourceDir: "src",
    nodata: 255,
    layers: [
      { name: "known", source: "known.tif", palette: "missing_palette" },
    ],
  },
  palettes: {},
  dryRun: true,
  sourceDir: "/nonexistent",
  workDir: "/nonexistent/work",
  outDir: "/nonexistent/out",
};

describe("buildLayer", () => {
  it("rejects a layer name that is not in the manifest", () => {
    expect(() => buildLayer("unknown", options)).toThrow(
      /No layer named "unknown"/,
    );
  });

  it("rejects a layer whose palette does not exist", () => {
    expect(() => buildLayer("known", options)).toThrow(
      /No palette named "missing_palette"/,
    );
  });

  it("does not delete a previous build's intermediates in dry-run mode", () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), "crest-build-test-"));
    try {
      const mbtiles = path.join(dir, "known.mbtiles");
      writeFileSync(mbtiles, "previous build");
      buildLayer("known", {
        manifest: {
          sourceDir: dir,
          nodata: 255,
          layers: [{ name: "known", source: "known.tif", palette: "p" }],
        },
        palettes: { p: [{ value: 1, color: "#000000" }] },
        dryRun: true,
        sourceDir: dir,
        workDir: dir,
        outDir: path.join(dir, "out"),
      });
      expect(existsSync(mbtiles)).toBe(true);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
