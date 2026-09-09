import { describe, expect, it } from "vitest";
import manifest from "./layers.json";
import palettes from "../src/configuration/palettes/conus.json";

describe("tiling manifest", () => {
  it("points at the local TIF directory with the shared nodata", () => {
    expect(manifest.sourceDir).toBe("CREST_TIFS");
    expect(manifest.nodata).toBe(255);
  });

  it("lists 23 layers with unique names and sources", () => {
    expect(manifest.layers).toHaveLength(23);
    const names = manifest.layers.map((l) => l.name);
    const sources = manifest.layers.map((l) => l.source);
    expect(new Set(names).size).toBe(23);
    expect(new Set(sources).size).toBe(23);
  });

  it.each(manifest.layers)(
    "$name references a palette and a CREST tif",
    (layer) => {
      expect(layer.name).toMatch(/^[a-z0-9_]+$/);
      expect(layer.source).toMatch(/^CONUS_NAtl_.*_CREST_\d{8}\.tif$/);
      expect(palettes).toHaveProperty(layer.palette);
    },
  );

  it("overrides nodata to 0 only for vertical land motion", () => {
    const overrides = manifest.layers.filter((l) => "nodata" in l);
    expect(overrides).toEqual([
      expect.objectContaining({ name: "vertical_land_motion", nodata: 0 }),
    ]);
  });
});
