import { createSlice } from "@reduxjs/toolkit";
import { mapConfig } from "../configuration/config";

const regions = mapConfig.regions;

const startingState = {
  zoom: regions["Atlantic, Gulf of America, and Pacific Coasts"].mapProperties
    .zoom, // conus - TODO: I hate this how can I fix this?
  center:
    regions["Atlantic, Gulf of America, and Pacific Coasts"].mapProperties
      .center, // conus - TODO: I hate this how can I fix this?
  identifyCoordinates: null,
  identifyResults: null,
  identifyIsLoaded: false,
  basemap: "Dark Gray",
  sketchArea: false,
  useBuffer: true,
  uploadedShapeFileGeoJSON: null,
  resilienceHub: null,
  areaNumber: 1,
  drawnLayers: {
    type: "FeatureCollection",
    features: [],
  },
};

export const mapPropertiesSlice = createSlice({
  name: "mapProperties",
  initialState: startingState,
  reducers: {
    updateAllMapProperties: (state, action) => ({ ...action.payload }),
    changeZoom: (state, action) => {
      state.zoom = action.payload;
    },
    changeCenter: (state, action) => {
      state.center = action.payload;
    },
    changeIdentifyCoordinates: (state, action) => {
      state.identifyCoordinates = action.payload;
    },
    changeIdentifyResults: (state, action) => {
      state.identifyResults = action.payload;
    },
    changeIdentifyIsLoaded: (state, action) => {
      state.identifyIsLoaded = action.payload;
    },
    changeBasemap: (state, action) => {
      state.basemap = action.payload;
    },
    toggleSketchArea: (state) => {
      state.sketchArea = !state.sketchArea;
    },
    changeUseBuffer: (state, action) => {
      state.useBuffer = !state.useBuffer;
    },
    updateDrawnLayers: (state, action) => {
      // drawnLayers is a list of the drawn layers geometry and whether or not there is a buffer
      // used to rebuild all of the layers on page refresh
      state.drawnLayers = action.payload;
    },
    addNewFeatureToDrawnLayers: (state, action) => {
      // drawnLayers is a list of the drawn layers geometry and whether or not there is a buffer
      // used to rebuild all of the layers on page refresh
      state.drawnLayers.features = [
        ...state.drawnLayers.features,
        action.payload,
      ];
    },
    removeFeatureFromDrawnLayers: (state, action) => {
      state.drawnLayers.features = [
        ...state.drawnLayers.features.slice(0, action.payload),
        ...state.drawnLayers.features.slice(action.payload + 1),
      ];
    },
    removeFeatureByGeometry: (state, action) => {
      state.drawnLayers.features = [
        ...state.drawnLayers.features.filter(
          (feature) =>
            JSON.stringify(feature.geometry) !== JSON.stringify(action.payload),
        ),
      ];
    },
    removeAllFeaturesFromDrawnLayers: (state) => {
      state.drawnLayers = startingState.drawnLayers;
    },
    uploadedShapeFileGeoJSON: (state, action) => {
      state.uploadedShapeFileGeoJSON = action.payload;
    },
    addSearchPlacesGeoJSON: (state, action) => {
      state.searchPlacesFileGeoJSON = action.payload;
    },
    changeResilienceHub: (state, action) => {
      state.resilienceHub = action.payload;
    },
    incrementAreaNumber: (state) => {
      state.areaNumber += 1;
    },
    resetAreaNumber: (state) => {
      state.areaNumber = 1;
    },
    changeAreaName: (state, action) => {
      // Find the index of the feature we want to update
      const featureIndex = state.drawnLayers.features.findIndex(
        (feature) => feature.properties.areaName === action.payload.oldAreaName,
      );

      // If the feature exists (index is not -1)
      if (featureIndex !== -1) {
        // Update only the areaName property while keeping everything else the same
        state.drawnLayers.features[featureIndex] = {
          ...state.drawnLayers.features[featureIndex],
          properties: {
            ...state.drawnLayers.features[featureIndex].properties,
            areaName: action.payload.newAreaName,
          },
        };
      }
    },
    resetMapProperties: () => startingState,
  },
});

// Action creators are generated for each case reducer function
export const {
  updateAllMapProperties,
  changeZoom,
  changeCenter,
  changeIdentifyCoordinates,
  changeIdentifyResults,
  changeIdentifyIsLoaded,
  changeBasemap,
  toggleSketchArea,
  addNewFeatureToDrawnLayers,
  removeFeatureFromDrawnLayers,
  removeAllFeaturesFromDrawnLayers,
  uploadedShapeFileGeoJSON,
  addSearchPlacesGeoJSON,
  changeResilienceHub,
  updateDrawnLayers,
  removeFeatureByGeometry,
  incrementAreaNumber,
  resetAreaNumber,
  resetMapProperties,
  changeUseBuffer,
  changeAreaName,
} = mapPropertiesSlice.actions;

export default mapPropertiesSlice.reducer;
