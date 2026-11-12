import { describe, expect, it, vi } from "vitest";
import {
  UPLOAD_PLANS,
  proceedAfterLongWarning,
  uploadPlan,
} from "./uploadSteps";
import { uploadedShapeFileGeoJSON } from "../../reducers/mapPropertiesSlice";

const thresholds = { maxFeatures: 40, maxFeaturesWarning: 10 };
const geojson = { type: "FeatureCollection", features: [] };

describe("uploadPlan", () => {
  it.each([
    [41, false, UPLOAD_PLANS.tooManyShapes],
    [41, true, UPLOAD_PLANS.tooManyShapes],
    [11, false, UPLOAD_PLANS.warnLongProcessing],
    [40, true, UPLOAD_PLANS.warnLongProcessing],
    [10, true, UPLOAD_PLANS.offerCorrection],
    [10, false, UPLOAD_PLANS.addAreas],
    [1, false, UPLOAD_PLANS.addAreas],
  ])("%i shapes, invalid=%s -> %s", (count, hasInvalidShapes, expected) => {
    expect(uploadPlan(count, hasInvalidShapes, thresholds)).toBe(expected);
  });
});

describe("proceedAfterLongWarning", () => {
  it("adds the uploaded areas when every shape is valid", () => {
    const dispatch = vi.fn();
    const offerCorrection = vi.fn();
    proceedAfterLongWarning({
      hasInvalidShapes: false,
      geojson,
      dispatch,
      offerCorrection,
    });
    expect(dispatch).toHaveBeenCalledWith(uploadedShapeFileGeoJSON(geojson));
    expect(offerCorrection).not.toHaveBeenCalled();
  });

  it("offers the correction screen instead when a shape is invalid", () => {
    const dispatch = vi.fn();
    const offerCorrection = vi.fn();
    proceedAfterLongWarning({
      hasInvalidShapes: true,
      geojson,
      dispatch,
      offerCorrection,
    });
    expect(offerCorrection).toHaveBeenCalledOnce();
    expect(dispatch).not.toHaveBeenCalled();
  });
});
