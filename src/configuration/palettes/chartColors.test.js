import { describe, expect, it } from "vitest";
import palettes from "./conus.json";
import { NO_DATA_COLOR, chartCSSColorFromPalette } from "./chartColors";

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
