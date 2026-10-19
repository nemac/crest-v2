import { describe, expect, it } from "vitest";
import { getLabel, getRange } from "./ChartFunctions.jsx";

const REGION = "U.S. Virgin Islands";

describe("getLabel", () => {
  it("uses the layer label for a known index", () => {
    expect(getLabel(REGION, "hubs")).toBe("Resilience Hubs Score");
  });

  it("falls back to the raw key when no layer matches, so legacy data stays identifiable", () => {
    expect(getLabel(REGION, "landslides")).toBe("landslides");
  });
});

describe("getRange", () => {
  it("gives the class range for a known index", () => {
    expect(getRange(REGION, "hubs")).toBe("1-10");
  });

  it("leaves the range empty for land cover and unknown keys", () => {
    expect(getRange(REGION, "lc_bare_land")).toBe("");
    expect(getRange(REGION, "landslides")).toBe("");
  });
});
