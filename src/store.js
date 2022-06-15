import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import regionSelectReducer from './reducers/regionSelectSlice';
import mapPropertiesReducer from './reducers/mapPropertiesSlice';
import NavBarReducer from './reducers/NavBarSlice';
import { loadState } from './localStorage';

const reducers = combineReducers({
  selectedRegion: regionSelectReducer,
  mapProperties: mapPropertiesReducer,
  navBar: NavBarReducer

});

export const store = configureStore({
  devTools: true, // prob should turn off in prod
  reducer: reducers,
  // here we restore previously persisted state
  preloadedState: loadState()
});
