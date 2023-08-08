import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'Home',
  menuOpen: false
};

export const NavBarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    changeActiveTab: (state, action) => {
      const activeTab = action.payload === '' ? 'Home' : action.payload;
      state.activeTab = activeTab;
    },
    changeMenuOpen: (state, action) => {
      state.menuOpen = !state.menuOpen;
    },
    resetNavBar: () => initialState
  }
});

// Action creators are generated for each case reducer function
export const { changeActiveTab, changeMenuOpen, resetNavBar } = NavBarSlice.actions;

export default NavBarSlice.reducer;
