import { describe, expect, it } from "vitest";
import { continentalUSDevConfig } from "./continental_us_dev";
import { continentalUSConfig } from "./continental_us";
import palettes from "../palettes/conus.json";
import manifest from "../../../tiling/layers.json";

const rasterLayers = continentalUSDevConfig.layerList;

describe("continental_us_dev", () => {
  it("keeps the region identity of the legacy config", () => {
    expect(continentalUSDevConfig.label).toBe(continentalUSConfig.label);
    expect(continentalUSDevConfig.regionName).toBe("continental_us");
    expect(continentalUSDevConfig.mapProperties).toEqual(
      continentalUSConfig.mapProperties,
    );
    expect(continentalUSDevConfig.attribution).toBe("NFWF 2026");
    expect(continentalUSDevConfig.analysisDisabled).toBe(true);
    expect(continentalUSDevConfig.zonalStatsKeys).toEqual([]);
  });

  it("has one raster layer per tiled archive, in manifest order", () => {
    const names = manifest.layers.map((layer) => layer.name);
    expect(rasterLayers.map((layer) => layer.palette)).toEqual(names);
    rasterLayers.forEach((layer) => {
      expect(layer.url).toBe(
        `pmtiles://https://tiles.resilientcoasts.org/dev/conus/${layer.palette}.pmtiles`,
      );
      expect(layer.id).toBe(`CONUS_dev_${layer.palette}`);
      expect(layer.maxzoom).toBe(13);
      expect(layer.region).toBe("continental_us");
      expect(layer.opacity).toBe(0.75);
      expect(layer.attribution).toBe("NFWF 2026");
      expect(layer.description.length).toBeGreaterThan(40);
      expect(palettes[layer.palette]).toBeDefined();
      expect(layer.chartCSSColor[0]).toBe("#E9ECEF");
      palettes[layer.palette].forEach((entry) => {
        expect(layer.chartCSSColor[entry.value]).toBe(entry.color);
      });
    });
  });

  it("uses the four spec groups with unique ids and chart orders", () => {
    expect(
      continentalUSDevConfig.chartInputs.map((c) => c.ChartInputLabel),
    ).toEqual([
      "Summary",
      "Threat Index Inputs",
      "Community Asset Inputs",
      "Fish and Wildlife Index Inputs",
    ]);
    const ids = continentalUSDevConfig.layerList.map((layer) => layer.id);
    expect(new Set(ids).size).toBe(23);
    const orders = continentalUSDevConfig.layerList.map(
      (layer) => layer.chartOrder,
    );
    expect(new Set(orders).size).toBe(23);
    const groups = new Set(
      continentalUSDevConfig.chartInputs.map((c) => c.ChartInputLabel),
    );
    continentalUSDevConfig.layerList.forEach((layer) => {
      expect(groups.has(layer.ChartInputLabel)).toBe(true);
    });
  });
});
