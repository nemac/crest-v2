import { describe, expect, it } from "vitest";
import { auditValues, parseHistogramValues } from "./audit.js";

function gdalinfoWithBuckets(min, max, counts) {
  return {
    bands: [{ histogram: { count: counts.length, min, max, buckets: counts } }],
  };
}

describe("parseHistogramValues", () => {
  it("returns the integer values with non-zero counts for a byte band", () => {
    const counts = new Array(256).fill(0);
    counts[2] = 10;
    counts[5] = 7;
    counts[255] = 1000;
    expect(
      parseHistogramValues(gdalinfoWithBuckets(-0.5, 255.5, counts)),
    ).toEqual([2, 5, 255]);
  });

  it("handles signed int8 histograms with negative values", () => {
    const counts = new Array(256).fill(0);
    counts[127] = 3; // -1
    counts[128] = 900; // 0
    counts[133] = 4; // 5
    expect(
      parseHistogramValues(gdalinfoWithBuckets(-128.5, 127.5, counts)),
    ).toEqual([-1, 0, 5]);
  });

  it("rejects a band with no histogram", () => {
    expect(() => parseHistogramValues({ bands: [{}] })).toThrow(/no histogram/);
  });

  it("rejects a bucket width too coarse to resolve integer classes", () => {
    expect(() =>
      parseHistogramValues(
        gdalinfoWithBuckets(-0.5, 511.5, new Array(256).fill(0)),
      ),
    ).toThrow(/too coarse/);
  });
});

describe("auditValues", () => {
  it("passes when every present value is allowed", () => {
    expect(auditValues([1, 2, 5, 255], [1, 2, 3, 4, 5, 255])).toEqual({
      ok: true,
      unexpected: [],
    });
  });

  it("reports values missing from the palette", () => {
    expect(auditValues([-1, 0, 1, 6], [-1, 1, 2, 3, 4, 5, 255])).toEqual({
      ok: false,
      unexpected: [0, 6],
    });
  });
});
