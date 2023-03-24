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
import { v4 } from 'uuid';
import { betaShareLinkEndpoint } from '../../configuration/config';
import {
  changeZoom, changeCenter, changeIdentifyCoordinates,
  changeIdentifyResults, changeIdentifyIsLoaded
} from '../../reducers/mapPropertiesSlice';
import { regionUserInitiated, changeRegion } from '../../reducers/regionSelectSlice';
import { changeActiveTab, changeMenuOpen } from '../../reducers/NavBarSlice';
/* import {
  toggleVisible, toggleLayer,
  toggleCollapsed, toggleLegend, replaceActiveLayerList
} from '../../reducers/mapLayerListSlice'; */
import { replaceActiveLayerList } from '../../reducers/mapLayerListSlice';
/* import {
  changeEmptyState, changeMore, changeGraphTable,
  changeSortDirection, changeSortBy
} from '../../reducers/analyzeAreaSlice'; */
import { loadState } from '../../localStorage';

const endpoint = betaShareLinkEndpoint;
// const endpoint = prodShareLinkEndpoint;

export const createShareURL = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', endpoint);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  const uuid = v4();
  const s3Location = 'beta/'.concat(uuid).concat('.json');
  const shareUrl = window.location.href.concat('?').concat('shareUrl=').concat(uuid);
  const payload = JSON.stringify({ location: s3Location, state: loadState() });
  xhr.send(payload);
  return shareUrl;
};

export const UpdateRedux = (jsonData, dispatch) => {
  // const dispatch = useDispatch();
  if (!jsonData.mapProperties) {
    return;
  }

  // TODO: Some redux state still needs to be implemented
  /*
  dispatch(toggleVisible(visble));
  dispatch(toggleCollapsed(jsonData.mapLayerList.expandedCharts));
  dispatch(toggleLegend(jsonData.mapLayerList.displayedLegends));
  dispatch(changeEmptyState(jsonData.AnalyzeArea.isEmptyState));
  dispatch(changeMore(jsonData.AnalyzeArea.isMore));
  dispatch(changeGraphTable(jsonData.AnalyzeArea.isItAGraph));
  dispatch(changeSortDirection(jsonData.AnalyzeArea.isSortASC));
  dispatch(changeSortBy(jsonData.AnalyzeArea.sortBy));
  */

  dispatch(changeZoom(jsonData.mapProperties.zoom));
  dispatch(changeCenter(jsonData.mapProperties.center));
  dispatch(changeIdentifyCoordinates(jsonData.mapProperties.identifyCoordinates));
  dispatch(changeIdentifyResults(jsonData.mapProperties.identifyResults));
  dispatch(changeIdentifyIsLoaded(jsonData.mapProperties.identifyIsLoaded));
  dispatch(regionUserInitiated(jsonData.selectedRegion.userInitiated));
  dispatch(changeRegion(jsonData.selectedRegion.value));
  dispatch(changeActiveTab(jsonData.navBar.activeTab));
  dispatch(changeMenuOpen(jsonData.navBar.menuOpen));
  dispatch(replaceActiveLayerList(jsonData.mapLayerList.activeLayerList));
};

async function fetchShareUrl(fetchUrl, setHaveError) {
  const response = await fetch(fetchUrl);
  if (!response.ok) {
    setHaveError(true);
    return null;
  }
  const json = await response.json();
  return json;
}

export function HaveShareUrlAndUpdateRedux(shareUrl, setShareUrlComplete, setHaveError) {
  const dispatch = useDispatch();
  if (shareUrl.length !== 36) {
    setHaveError(true);
    return null;
  }
  const fetchUrl = endpoint.concat('?shareUrl=').concat(shareUrl);
  fetchShareUrl(fetchUrl, setHaveError).then((json) => {
    if (!json) {
      setHaveError(true);
    }
    if (json) {
      UpdateRedux(json, dispatch);
    }
    setShareUrlComplete(true);
  });
}
