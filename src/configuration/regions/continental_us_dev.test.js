import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { continentalUSDevConfig } from "./continental_us_dev";
import { continentalUSConfig } from "./continental_us";
import palettes from "../palettes/conus.json";
import manifest from "../../../tiling/layers.json";

const rasterLayers = continentalUSDevConfig.layerList.filter(
  (layer) => layer.palette,
);
const backend = parse(readFileSync("lambda_functions/src/config.yml", "utf8"));

describe("continental_us_dev", () => {
  it("keeps the region identity of the legacy config", () => {
    expect(continentalUSDevConfig.label).toBe(continentalUSConfig.label);
    expect(continentalUSDevConfig.regionName).toBe("north_atlantic");
    expect(continentalUSDevConfig.mapProperties).toEqual(
      continentalUSConfig.mapProperties,
    );
    expect(continentalUSDevConfig.attribution).toBe("NFWF 2026");
    expect(continentalUSDevConfig.analysisDisabled).toBeUndefined();
    expect(continentalUSDevConfig.zonalStatsKeys).toEqual([
      ...backend.datasets.north_atlantic.map((dataset) => dataset.name),
      ...Object.keys(backend.landcover_classes.ccap),
    ]);
  });

  it("has one raster layer per tiled archive, in manifest order", () => {
    const names = manifest.layers
      .map((layer) => layer.name)
      .filter((name) => name !== "land_cover");
    expect(rasterLayers.map((layer) => layer.palette)).toEqual(names);
    rasterLayers.forEach((layer) => {
      expect(layer.url).toBe(
        `pmtiles://https://tiles.resilientcoasts.org/dev/conus/${layer.palette}.pmtiles`,
      );
      expect(layer.id).toBe(`CONUS_dev_${layer.palette}`);
      expect(layer.maxzoom).toBe(13);
      expect(layer.region).toBe("north_atlantic");
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

  it("adds the C-CAP land cover overlay with a custom legend", () => {
    const landCover = continentalUSDevConfig.layerList.find(
      (layer) => layer.id === "CONUS_dev_land_cover",
    );
    expect(landCover.isLegendCustom).toBe(true);
    expect(landCover.chartCSSColor).toHaveLength(24);
    landCover.chartCSSColor.forEach((entry) => {
      expect(entry.backgroundColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(entry.label).toBeTruthy();
    });
    expect(landCover.url).toMatch(/\/land_cover\.pmtiles$/);
    expect(landCover.region).toBe("north_atlantic");
    expect(landCover.palette).toBeUndefined();
  });

  it("uses the spec groups with unique ids and chart orders", () => {
    expect(
      continentalUSDevConfig.chartInputs.map((c) => c.ChartInputLabel),
    ).toEqual([
      "Summary",
      "Threat Index Inputs",
      "Community Asset Inputs",
      "Fish and Wildlife Index Inputs",
      "Additional Overlays",
    ]);
    const ids = continentalUSDevConfig.layerList.map((layer) => layer.id);
    expect(new Set(ids).size).toBe(24);
    const orders = continentalUSDevConfig.layerList.map(
      (layer) => layer.chartOrder,
    );
    expect(new Set(orders).size).toBe(24);
    const groups = new Set(
      continentalUSDevConfig.chartInputs.map((c) => c.ChartInputLabel),
    );
    continentalUSDevConfig.layerList.forEach((layer) => {
      expect(groups.has(layer.ChartInputLabel)).toBe(true);
    });
  });

  it("drives the charts, identify popup, and sort from its own layers", () => {
    const { chartValues, summaryIndices, sortIndices } = continentalUSDevConfig;
    expect(Object.keys(chartValues)).toEqual([
      "Summary Chart",
      "Threats Inputs",
      "Community Assets Inputs",
      "Fish and Wildlife Inputs",
      "Landcover",
    ]);
    expect(summaryIndices).toEqual(chartValues["Summary Chart"]);
    expect(summaryIndices).toEqual([
      "resilience_opportunities",
      "community_exposure_index",
      "threat_index",
      "community_asset_index",
      "fish_and_wildlife_index",
    ]);
    expect(chartValues["Threats Inputs"]).toHaveLength(8);
    expect(chartValues["Community Assets Inputs"]).toHaveLength(3);
    expect(chartValues["Fish and Wildlife Inputs"]).toHaveLength(7);
    Object.values(sortIndices)
      .filter((key) => key !== "areaNumber")
      .forEach((key) => expect(summaryIndices).toContain(key));
  });
});
