import { describe, expect, it } from "vitest";
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
});
