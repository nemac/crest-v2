import { describe, expect, it } from "vitest";
import { mapConfig } from "./config";

const LANDCOVER_KEYS = ["nlcdLandcover", "ccapLandcover"];
const HEX = /^#[0-9A-Fa-f]{6}$/;

describe("land cover configs", () => {
  it.each(LANDCOVER_KEYS)(
    "%s has entries with the fields the chart needs",
    (key) => {
      const entries = mapConfig[key];
      expect(Array.isArray(entries)).toBe(true);
      expect(entries.length).toBeGreaterThan(0);
      entries.forEach((entry) => {
        expect(entry.name).toBeTruthy();
        expect(entry.value).toBeTruthy();
        expect(entry.color).toMatch(HEX);
      });
    },
  );
});
