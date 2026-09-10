import { describe, expect, it, vi } from "vitest";
import * as turf from "@turf/turf";

vi.mock("../../configuration/config", () => ({
  sketchShapeThresholds: { areaThreshold: 500, verticeThreshold: 1000 },
}));

const {
  describeInvalid,
  buildSteps,
  applyGeometryChange,
  markDeleted,
  finalFeatureCollection,
} = await import("./shapefileCorrection");

const small = turf.circle([-77.95, 34.24], 2, {
  steps: 16,
  units: "kilometers",
});
const huge = turf.circle([-77.95, 34.24], 30, {
  steps: 16,
  units: "kilometers",
});
const spiky = turf.circle([-77.95, 34.24], 2, {
  steps: 1200,
  units: "kilometers",
});

describe("describeInvalid", () => {
  it("returns null for a valid shape", () => {
    expect(describeInvalid(small)).toBeNull();
  });

  it("flags an oversized shape", () => {
    const result = describeInvalid(huge);
    expect(result.invalidText).toBe("This area is too large.");
    expect(result.fixStatusGoal).toContain("less than 500");
  });

  it("flags too many vertices", () => {
    const result = describeInvalid(spiky);
    expect(result.invalidText).toBe("This area has too many vertices.");
    expect(result.fixText).toContain("Right-click");
  });
});

describe("steps", () => {
  const collection = turf.featureCollection([small, huge, spiky]);

  it("builds one step per invalid feature with its source index", () => {
    const steps = buildSteps(collection);
    expect(steps.map((s) => s.index)).toEqual([1, 2]);
    expect(steps[0].title).toBe("Shape 2");
    expect(steps[0].isFixed).toBe(false);
    expect(steps[0].howFixedText).toBe("Needs to be fixed");
    expect(steps[0].drawId).toBeNull();
  });

  it("marks a step fixed when its new geometry is valid", () => {
    const [step] = buildSteps(collection);
    const fixed = applyGeometryChange(step, small.geometry);
    expect(fixed.isFixed).toBe(true);
    expect(fixed.howFixedText).toBe("FIXED");
    const stillBad = applyGeometryChange(fixed, huge.geometry);
    expect(stillBad.isFixed).toBe(false);
    expect(stillBad.howFixedText).toBe("EDITED VERTEX");
  });

  it("marks deletions and drops them from the final collection", () => {
    const steps = buildSteps(collection).map((s, i) =>
      i === 0 ? markDeleted(s) : s,
    );
    expect(steps[0].isFixed).toBe(true);
    expect(steps[0].howFixedText).toBe("DELETED");
    const result = finalFeatureCollection(collection, steps);
    expect(result.features).toHaveLength(2);
    expect(result.features[0]).toBe(collection.features[0]);
    expect(result.features[1]).toBe(collection.features[2]);
  });
});
