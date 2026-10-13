import { describe, expect, it } from "vitest";
import { anchorTransform } from "./CustomToolTip.jsx";

const viewBox = { x: 40, y: 20, width: 400, height: 200 };

describe("anchorTransform", () => {
  it("centres on the column and sits above the bar top", () => {
    const transform = anchorTransform({
      coordinate: { x: 100, y: 150 },
      viewBox,
      chartValue: 0.5,
    });
    expect(transform).toBe(
      "translate(clamp(0px, calc(100px - 50%), calc(440px - 100%)), max(0px, calc(120px - 100% - 8px)))",
    );
  });

  it("anchors negative and no-data bars to the zero line", () => {
    const transform = anchorTransform({
      coordinate: { x: 100, y: 150 },
      viewBox,
      minValue: -0.25,
      chartValue: -0.25,
    });
    expect(transform).toContain("calc(180px - 100% - 8px)");
  });

  it("returns nothing before recharts supplies geometry", () => {
    expect(anchorTransform({ coordinate: null, viewBox })).toBeUndefined();
  });
});
