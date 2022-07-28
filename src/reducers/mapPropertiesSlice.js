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
    basemap: 'Dark Gray'
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
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  changeZoom, changeCenter, changeIdentifyCoordinates,
  changeIdentifyResults, changeIdentifyIsLoaded, changeBasemap
} = mapPropertiesSlice.actions;

export default mapPropertiesSlice.reducer;
