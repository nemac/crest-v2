import { uploadedShapeFileGeoJSON } from "../../reducers/mapPropertiesSlice";

export const UPLOAD_PLANS = {
  tooManyShapes: "tooManyShapes",
  warnLongProcessing: "warnLongProcessing",
  offerCorrection: "offerCorrection",
  addAreas: "addAreas",
};

// Decides what happens to a parsed shapefile before anything is added to the map.
export const uploadPlan = (featureCount, hasInvalidShapes, thresholds) => {
  if (featureCount > thresholds.maxFeatures) {
    return UPLOAD_PLANS.tooManyShapes;
  }
  if (featureCount > thresholds.maxFeaturesWarning) {
    return UPLOAD_PLANS.warnLongProcessing;
  }
  if (hasInvalidShapes) {
    return UPLOAD_PLANS.offerCorrection;
  }
  return UPLOAD_PLANS.addAreas;
};

// After the long-processing warning, valid shapes are added and invalid ones go to the correction screen.
export const proceedAfterLongWarning = ({
  hasInvalidShapes,
  geojson,
  dispatch,
  offerCorrection,
}) => {
  if (hasInvalidShapes) {
    offerCorrection();
    return;
  }
  dispatch(uploadedShapeFileGeoJSON(geojson));
};
