import { describe, expect, it } from "vitest";
import palettes from "./conus.json";
import {
  NO_DATA_COLOR,
  barValue,
  chartCSSColorFromPalette,
  signedBarValue,
  topClass,
} from "./chartColors";

describe("chartCSSColorFromPalette", () => {
  it("prefixes the no-data colour and keeps every class colour", () => {
    const colors = chartCSSColorFromPalette(palettes.storm_surge);
    expect(colors[0]).toBe(NO_DATA_COLOR);
    expect(Object.keys(colors)).toHaveLength(6);
    expect(colors[1]).toBe(palettes.storm_surge[0].color);
    expect(colors[5]).toBe(palettes.storm_surge[4].color);
  });

  it("keeps the -1 uplift class for vertical land motion", () => {
    const colors = chartCSSColorFromPalette(palettes.vertical_land_motion);
    expect(colors[-1]).toBe("#00CC44");
    expect(colors[0]).toBe(NO_DATA_COLOR);
    expect(Object.keys(colors)).toHaveLength(7);
  });

  it("handles a single-class palette", () => {
    expect(chartCSSColorFromPalette(palettes.critical_facilities)).toEqual({
      0: NO_DATA_COLOR,
      5: "#0084A8",
    });
  });
});

describe("bar scaling", () => {
  const vlm = chartCSSColorFromPalette(palettes.vertical_land_motion);
  const ten = chartCSSColorFromPalette(palettes.threat_index);

  it("ignores the no-data and uplift keys when finding the top class", () => {
    expect(topClass(vlm)).toBe(5);
    expect(topClass(ten)).toBe(10);
  });

  it("scales positive means and floors negative or zero means", () => {
    expect(barValue(ten, 5)).toBe(0.5);
    expect(barValue(vlm, 2.5)).toBe(0.5);
    expect(barValue(vlm, -1)).toBe(0);
    expect(barValue(vlm, 0)).toBe(0);
  });
});

describe("signedBarValue", () => {
  const vlm = chartCSSColorFromPalette(palettes.vertical_land_motion);
  const ten = chartCSSColorFromPalette(palettes.threat_index);
  it("draws negative means downward only when the palette has a negative class", () => {
    expect(signedBarValue(vlm, -1)).toBe(-0.2);
    expect(signedBarValue(vlm, 2.5)).toBe(0.5);
    expect(signedBarValue(ten, -3)).toBe(0);
    expect(signedBarValue(ten, 5)).toBe(0.5);
  });
});
