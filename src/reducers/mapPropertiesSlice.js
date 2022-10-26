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
    analyzedAreas: {}
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
    updateAnalyzedAreas: (state, action) => {
      // TODO: This just completely overwrites all polygons. Need to fix this.
      state.analyzedAreas = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  changeZoom, changeCenter, changeIdentifyCoordinates,
  changeIdentifyResults, changeIdentifyIsLoaded, changeBasemap,
  toggleSketchArea, updateAnalyzedAreas
} = mapPropertiesSlice.actions;

export default mapPropertiesSlice.reducer;
