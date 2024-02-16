import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "Home",
  menuOpen: false,
};

export const NavBarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    updateAllNavbar: (state, action) => ({ ...action.payload }),
    changeActiveTab: (state, action) => {
      const activeTab = action.payload === "" ? "Home" : action.payload;
      state.activeTab = activeTab;
    },
    changeMenuOpen: (state, action) => {
      state.menuOpen = !state.menuOpen;
    },
    resetNavBar: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { updateAllNavbar, changeActiveTab, changeMenuOpen, resetNavBar } =
  NavBarSlice.actions;

export default NavBarSlice.reducer;
