/*
Purpose
  Share the map and state with others or just a link
  or to get back to where the user was on a Previous session

Child Components
  - map.js

Libs
  - Not sure yet

API
  - New api create a saved state JSON object with a unique id to share

State needed
  - Not sure yet

Props
  - Not sure yet
*/
import { useDispatch } from 'react-redux';
import { v4 } from "uuid";
import {
  changeZoom, changeCenter, changeIdentifyCoordinates,
  changeIdentifyResults, changeIdentifyIsLoaded
} from '../../reducers/mapPropertiesSlice';
import { regionUserInitiated, changeRegion } from '../../reducers/regionSelectSlice';
import { changeActiveTab, changeMenuOpen } from '../../reducers/NavBarSlice';
import {
  toggleVisible, toggleLayer,
  toggleCollapsed, toggleLegend
} from '../../reducers/mapLayerListSlice';
import {
  changeEmptyState, changeMore, changeGraphTable,
  changeSortDirection, changeSortBy
} from '../../reducers/analyzeAreaSlice';
import { loadState } from '../../localStorage';

export const buildShareURL = () => {
  const xhr = new XMLHttpRequest();
  const url = 'https://rlwk45u34h.execute-api.us-east-1.amazonaws.com/beta/share-link';
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
};

export const UpdateRedux = (jsonData, dispatch) => {
  // const dispatch = useDispatch();
  if (!jsonData.mapProperties) {
    return;
  }
  const parsedJsonData = jsonData;
  console.log(parsedJsonData);
  const visible = Boolean(parsedJsonData.mapLayerList.visible);
  dispatch(changeZoom(parsedJsonData.mapProperties.zoom));
  dispatch(changeCenter(parsedJsonData.mapProperties.center));
  dispatch(changeIdentifyCoordinates(parsedJsonData.mapProperties.identifyCoordinates));
  dispatch(changeIdentifyResults(parsedJsonData.mapProperties.identifyResults));
  dispatch(changeIdentifyIsLoaded(parsedJsonData.mapProperties.identifyIsLoaded));
  dispatch(regionUserInitiated(parsedJsonData.selectedRegion.userInitiated));
  dispatch(changeRegion(parsedJsonData.selectedRegion.value));
  dispatch(changeActiveTab(parsedJsonData.navBar.activeTab));
  dispatch(changeMenuOpen(parsedJsonData.navBar.menuOpen));
  //dispatch(toggleVisible(!!visible));
  //dispatch(toggleLayer(parsedJsonData.mapLayerList.activeLayerList)); 
  //dispatch(toggleCollapsed(parsedJsonData.mapLayerList.expandedCharts));
  //dispatch(toggleLegend(parsedJsonData.mapLayerList.displayedLegends));
  //dispatch(changeEmptyState(parsedJsonData.AnalyzeArea.isEmptyState));
  //dispatch(changeMore(parsedJsonData.AnalyzeArea.isMore));
  //dispatch(changeGraphTable(parsedJsonData.AnalyzeArea.isItAGraph));
  //dispatch(changeSortDirection(parsedJsonData.AnalyzeArea.isSortASC));
  //dispatch(changeSortBy(parsedJsonData.AnalyzeArea.sortBy));
};
