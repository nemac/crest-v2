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
    analyzedAreas: {
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
    addNewFeatureToAnalyzedAreas: (state, action) => {
      /* analyzed areas ONLY includes buffer layer and drawn layer if no buffer
       charts and tables are read from this table */
      state.analyzedAreas.features.push(action.payload);
    },
    addNewFeatureToDrawnLayers: (state, action) => {
      /* drawn layers includes ALL layers including the buffer and the originally drawn layer
       leaflet map pulls from this and needs both the buffer and the drawn layer */
      state.drawnLayers.features.push(action.payload);
    },
    // using index passed in from action, remove that indexed element from feature list
    removeFeatureFromAnalyzedAreas: (state, action) => {
      state.analyzedAreas.features = state.analyzedAreas.features.slice(action);
    },
    removeAllFeaturesFromAnalyzedAreas: (state) => {
      state.analyzedAreas.features = []; // empty list should clear everything back to normal
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  changeZoom, changeCenter, changeIdentifyCoordinates,
  changeIdentifyResults, changeIdentifyIsLoaded, changeBasemap,
  toggleSketchArea, addNewFeatureToAnalyzedAreas, removeAllFeaturesFromAnalyzedAreas,
  removeFeatureFromAnalyzedAreas, addNewFeatureToDrawnLayers
} = mapPropertiesSlice.actions;

export default mapPropertiesSlice.reducer;
