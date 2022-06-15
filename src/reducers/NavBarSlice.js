import { createSlice } from '@reduxjs/toolkit';

export const NavBarSlice = createSlice({
  name: 'navbar',
  initialState: {
    activeTab: 'Home',
    menuOpen: false
  },
  reducers: {
    changeActiveTab: (state, action) => {
      const activeTab = action.payload === '' ? 'Home' : action.payload;
      state.activeTab = activeTab;
    },
    changeMenuOpen: (state, action) => {
      state.menuOpen = !state.menuOpen;
    }
  }
});

// Action creators are generated for each case reducer function
export const { changeActiveTab, changeMenuOpen } = NavBarSlice.actions;

export default NavBarSlice.reducer;
