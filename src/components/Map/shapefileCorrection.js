import { sketchShapeThresholds } from "../../configuration/config";
import {
  calculateAreaOfPolygon,
  calculatePolygonVertices,
  validPolygon,
} from "../../utility/utilityFunctions";

export const MESSAGES = {
  tooManyVertices: "This area has too many vertices.",
  tooBig: "This area is too large.",
  fixVertices:
    "Edit the area.\nA red outline means there is an issue.\nRight-click a white square (vertex) to delete it.\nDelete vertices until the outline turns green.\nSave the changes.",
  fixSize:
    "Edit the area.\nA red outline means there is an issue.\nDrag the white squares (vertices) so the area is smaller.\nYou can also right-click a vertex to delete it and reduce the size of the area.\nThe outline turns green when the area meets the size requirement.\nSave the changes.",
};

export const describeInvalid = (feature) => {
  const { areaThreshold, verticeThreshold } = sketchShapeThresholds;
  const areaSize = calculateAreaOfPolygon(feature) / 1000000;
  const numVertices = calculatePolygonVertices(feature);
  const tooBig = areaSize > areaThreshold;
  const tooMany = numVertices > verticeThreshold;
  if (!tooBig && !tooMany) return null;
  if (tooBig && tooMany) {
    return {
      invalidText: `${MESSAGES.tooManyVertices} and ${MESSAGES.tooBig}`,
      fixText: `${MESSAGES.fixVertices} and ${MESSAGES.fixSize}`,
      fixStatus: `The current size of the area is ${areaSize.toFixed(0)} sq km and the current number of vertices is ${numVertices.toFixed(0)}`,
      fixStatusGoal: `and the size needs to be less than ${areaThreshold} and the number of vertices needs to be less than ${verticeThreshold}`,
    };
  }
  if (tooBig) {
    return {
      invalidText: MESSAGES.tooBig,
      fixText: MESSAGES.fixSize,
      fixStatus: `The current size of the area is ${areaSize.toFixed(0)} sq km`,
      fixStatusGoal: `and the size needs to be less than ${areaThreshold}`,
    };
  }
  return {
    invalidText: MESSAGES.tooManyVertices,
    fixText: MESSAGES.fixVertices,
    fixStatus: `The current number of vertices is ${numVertices.toFixed(0)}`,
    fixStatusGoal: `and the number of vertices needs to be less than ${verticeThreshold}`,
  };
};

export const buildSteps = (featureCollection) =>
  featureCollection.features
    .map((feature, index) => ({ feature, index }))
    .filter(({ feature }) => !validPolygon(feature))
    .map(({ feature, index }) => ({
      index,
      title: `Shape ${index + 1}`,
      isFixed: false,
      howFixedText: "Needs to be fixed",
      drawId: null,
      ...describeInvalid(feature),
    }));

export const applyGeometryChange = (step, geometry) => {
  const invalid = describeInvalid({
    type: "Feature",
    properties: {},
    geometry,
  });
  if (invalid) {
    return {
      ...step,
      ...invalid,
      isFixed: false,
      howFixedText: "EDITED VERTEX",
    };
  }
  return { ...step, isFixed: true, howFixedText: "FIXED" };
};

export const markDeleted = (step) => ({
  ...step,
  isFixed: true,
  howFixedText: "DELETED",
});

export const finalFeatureCollection = (featureCollection, steps) => {
  const deleted = new Set(
    steps.filter((s) => s.howFixedText === "DELETED").map((s) => s.index),
  );
  return {
    ...featureCollection,
    features: featureCollection.features.filter((_, i) => !deleted.has(i)),
  };
};
