import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import regionSelectReducer from './reducers/regionSelectSlice';
import mapPropertiesReducer from './reducers/mapPropertiesSlice';
import mapLayerListReducer from './reducers/mapLayerListSlice';
import NavBarReducer from './reducers/NavBarSlice';
import AnalyzeAreaReducer from './reducers/analyzeAreaSlice';
import { useZonalStatsMutation } from './services/zonalstats';
import { identifyApi } from './services/identify';
import { shareMapApi } from './services/shareMap';
import { readGeoApi } from './services/readGeojson';
import { loadState } from './localStorage';

const reducers = combineReducers({
  selectedRegion: regionSelectReducer,
  mapProperties: mapPropertiesReducer,
  analyzeArea: AnalyzeAreaReducer,
  mapLayerList: mapLayerListReducer,
  navBar: NavBarReducer,
  [useZonalStatsMutation.reducerPath]: useZonalStatsMutation.reducer,
  [identifyApi.reducerPath]: identifyApi.reducer,
  [shareMapApi.reducerPath]: shareMapApi.reducer,
  [readGeoApi.reducerPath]: readGeoApi.reducer
});

export const setupStore = (preloadedState) => configureStore({
  reducer: reducers,
  preloadedState
});

export const store = configureStore({
  devTools: true, // prob should turn off in prod
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(identifyApi.middleware)
    .concat(shareMapApi.middleware)
    .concat(readGeoApi.middleware),
  reducer: reducers,
  // here we restore previously persisted state
  preloadedState: loadState()
});
