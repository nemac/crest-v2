import { createSlice } from "@reduxjs/toolkit";

export const mapLayerListSlice = createSlice({
  name: 'mapLayerList',
  initialState: {
    visible: true,
    activeLayerList: [],
    activeLayerTiles: []
  },
  reducers: {
    toggleVisible: (state) => {
      state.visible = !state.visible
    },
    addLayer: (state, action) => {
      // console.log(typeof state.activeLayerList)
      console.log('inside dispatch')
      console.log('payload:')
      console.log(action.payload)
      console.log('payload.label')
      console.log(action.payload.label)
      console.log('payload.url')
      console.log(action.payload.url)
      state.activeLayerList.push(action.payload.label) ;
      state.activeLayerTiles.push(action.payload.url) ;

    },
    removeLayer: (state, action) => {
      let i = state.activeLayerList.indexOf(action.payload.label) ;
      state.activeLayerList.splice(i, 1) ;
      state.activeLayerTiles.splice(i,1) ;
    }
  },
});

// Action creators are generated for each case reducer function
export const { toggleVisible, addLayer, removeLayer } = mapLayerListSlice.actions

export default mapLayerListSlice.reducer