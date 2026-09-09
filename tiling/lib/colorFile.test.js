import { describe, expect, it } from "vitest";
import { hexToRgb, paletteToColorFile } from "./colorFile.js";

describe("hexToRgb", () => {
  it("parses uppercase hex", () => {
    expect(hexToRgb("#00CC44")).toEqual([0, 204, 68]);
  });

  it("parses lowercase hex", () => {
    expect(hexToRgb("#fdfaec")).toEqual([253, 250, 236]);
  });

  it("rejects malformed input", () => {
    expect(() => hexToRgb("00CC44")).toThrow(/hex/);
    expect(() => hexToRgb("#00CC4")).toThrow(/hex/);
  });
});

describe("paletteToColorFile", () => {
  it("writes one opaque line per entry in palette order", () => {
    const text = paletteToColorFile([
      { value: -1, color: "#00CC44", label: "Uplift" },
      { value: 1, color: "#CDA0C5" },
      { value: 2, color: "#DF659C" },
    ]);
    expect(text).toBe(
      "-1 0 204 68 255\n1 205 160 197 255\n2 223 101 156 255\n",
    );
  });

  it("does not add nodata or zero lines", () => {
    const text = paletteToColorFile([{ value: 5, color: "#0084A8" }]);
    expect(text).toBe("5 0 132 168 255\n");
  });
});
