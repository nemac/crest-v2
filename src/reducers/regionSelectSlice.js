import { createSlice } from '@reduxjs/toolkit';
import { mapConfig } from '../configuration/config';

const regions = mapConfig.regions;

const initialState = {
  userInitiated: false,
  value: regions['Atlantic, Gulf of Mexico, and Pacific Coasts'].label // Continental US
};

export const regionSelectSlice = createSlice({
  name: 'selectedRegion',
  initialState,
  reducers: {
    updateAllRegion: (state, action) => ({ ...action.payload }),
    changeRegion: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
    regionUserInitiated: (state, action) => {
      state.userInitiated = action.payload;
    },
    resetRegionSelect: () => initialState
  }
});

// Action creators are generated for each case reducer function
export const {
  updateAllRegion, changeRegion, regionUserInitiated, resetRegionSelect
} = regionSelectSlice.actions;

export default regionSelectSlice.reducer;
