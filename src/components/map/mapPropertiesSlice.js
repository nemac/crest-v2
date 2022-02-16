import { createSlice } from "@reduxjs/toolkit";
import { mapConfig } from '../../configuration/config';

const regions = mapConfig.regions

export const mapPropertiesSlice = createSlice({
  name: 'mapProperties',
  initialState: {
    zoom: regions[1].mapProperties.zoom, // conus - TODO: I hate this how can I fix this?
    center: regions[1].mapProperties.center // conus - TODO: I hate this how can I fix this? 
  },
  reducers: {
    changeZoom: (state, action) => {
      state.zoom = action.payload
    },
    changeCenter: (state, action) => {
      state.center = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeZoom, changeCenter } = mapPropertiesSlice.actions

export default mapPropertiesSlice.reducer