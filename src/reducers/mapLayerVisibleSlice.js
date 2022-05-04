import { createSlice } from "@reduxjs/toolkit";

export const mapLayerListVisibleSlice = createSlice({
  name: 'mapLayerListVisible',
  initialState: {
    visible: true
  },
  reducers: {
    toggleVisible: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It 
      // doesn't actually mutate the state because it uses the Immer library, 
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.visible = !state.visible
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleVisible } = mapLayerListVisibleSlice.actions

export default mapLayerListVisibleSlice.reducer