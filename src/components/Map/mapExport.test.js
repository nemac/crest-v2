import { describe, expect, it } from "vitest";
import { EXPORT_FILE_NAME, isExcludedFromExport } from "./mapExport";

const element = (...classes) => ({
  classList: { contains: (name) => classes.includes(name) },
});

describe("mapExport", () => {
  it("names the file like the Leaflet export did", () => {
    expect(EXPORT_FILE_NAME).toBe("CREST Map.png");
  });

  it("excludes overlay boxes and the MapLibre control container", () => {
    expect(isExcludedFromExport(element("map-overlay"))).toBe(true);
    expect(isExcludedFromExport(element("maplibregl-control-container"))).toBe(
      true,
    );
    expect(isExcludedFromExport(element("maplibregl-canvas-container"))).toBe(
      false,
    );
    expect(isExcludedFromExport({})).toBe(false);
  });
});
