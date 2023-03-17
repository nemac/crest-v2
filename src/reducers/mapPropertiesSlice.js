import { createSlice } from '@reduxjs/toolkit';
import { mapConfig } from '../configuration/config';

const regions = mapConfig.regions;

export const mapPropertiesSlice = createSlice({
  name: 'mapProperties',
  initialState: {
    zoom: regions['Continental U.S'].mapProperties.zoom, // conus - TODO: I hate this how can I fix this?
    center: regions['Continental U.S'].mapProperties.center, // conus - TODO: I hate this how can I fix this?
    identifyCoordinates: null,
    identifyResults: null,
    identifyIsLoaded: false,
    basemap: 'Dark Gray',
    sketchArea: false,
    uploadedShapeFile: null,
    zonalStatsAreas: {
      type: 'FeatureCollection',
      features: []
    },
    drawnLayers: {
      type: 'FeatureCollection',
      features: []
    }
  },
  reducers: {
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
    addNewFeatureToZonalStatsAreas: (state, action) => {
      // zonalStatsAreas is a list of the analyzed zonal stats along with other properties
      // used for charts
      state.zonalStatsAreas.features = [...state.zonalStatsAreas.features, action.payload];
    },
    addNewFeatureToDrawnLayers: (state, action) => {
      // drawnLayers is a list of the drawn layers geometry and whether or not there is a buffer
      // used to rebuild all of the layers on page refresh
      state.drawnLayers.features = [...state.drawnLayers.features, action.payload];
    },
    removeFeatureFromZonalStatsAreas: (state, action) => {
      state.zonalStatsAreas.features = [
        ...state.zonalStatsAreas.features.slice(0, action.payload),
        ...state.zonalStatsAreas.features.slice(action.payload + 1)
      ];
    },
    removeAllFeaturesFromZonalStatsAreas: (state) => {
      state.zonalStatsAreas.features = []; // empty list should clear everything back to normal
    },
    removeFeatureFromDrawnLayers: (state, action) => {
      state.drawnLayers.features = [
        ...state.drawnLayers.features.slice(0, action.payload),
        ...state.drawnLayers.features.slice(action.payload + 1)
      ];
    },
    removeAllFeaturesFromDrawnLayers: (state) => {
      state.drawnLayers.features = []; // empty list should clear everything back to normal
    },
    uploadedShapeFileGeoJSON: (state, action) => {
      state.uploadedShapeFileGeoJSON = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  changeZoom, changeCenter, changeIdentifyCoordinates,
  changeIdentifyResults, changeIdentifyIsLoaded, changeBasemap,
  toggleSketchArea, addNewFeatureToZonalStatsAreas, removeAllFeaturesFromZonalStatsAreas,
  removeFeatureFromZonalStatsAreas, addNewFeatureToDrawnLayers, removeFeatureFromDrawnLayers,
  removeAllFeaturesFromDrawnLayers, uploadedShapeFileGeoJSON
} = mapPropertiesSlice.actions;

export default mapPropertiesSlice.reducer;
