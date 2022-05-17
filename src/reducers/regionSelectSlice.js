import { createSlice } from '@reduxjs/toolkit';
import { mapConfig } from '../configuration/config';

const regions = mapConfig.regions;

export const regionSelectSlice = createSlice({
  name: 'selectedRegion',
  initialState: {
    value: regions['Continental U.S'].label // Continental US
  },
  reducers: {
    changeRegion: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { changeRegion } = regionSelectSlice.actions;

export default regionSelectSlice.reducer;
