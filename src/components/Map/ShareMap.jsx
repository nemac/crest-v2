import { v4 } from "uuid";
import { betaShareLinkEndpoint } from "../../configuration/config";
import { updateAllMapProperties } from "../../reducers/mapPropertiesSlice";
import { updateAllAnalyze } from "../../reducers/analyzeAreaSlice";
import { updateAllRegion } from "../../reducers/regionSelectSlice";
import { updateAllNavbar } from "../../reducers/NavBarSlice";
import { updateAllMapLayerList } from "../../reducers/mapLayerListSlice";
import { loadState } from "../../localStorage";

const endpoint = betaShareLinkEndpoint;
// const endpoint = prodShareLinkEndpoint;

export const createShareURL = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", endpoint);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  const uuid = v4();
  const date = new Date();
  const padL = (nr, len = 2, chr = "0") => `${nr}`.padStart(2, chr);
  const dateString = `${date.getFullYear()}-${padL(date.getMonth())}-${padL(date.getDate())}`;
  const shareUrlString = uuid.concat(dateString);
  const s3Location = "beta/".concat(shareUrlString).concat(".json");
  const shareUrl = window.location.href
    .concat("?")
    .concat("shareUrl=")
    .concat(shareUrlString);
  const payload = JSON.stringify({ location: s3Location, state: loadState() });
  xhr.send(payload);
  return shareUrl;
};

export const UpdateRedux = (jsonData, dispatch, setShareUrlComplete) => {
  if (!jsonData.mapProperties) {
    return;
  }
  dispatch(updateAllMapProperties(jsonData.mapProperties));
  dispatch(updateAllAnalyze(jsonData.analyzeArea));
  dispatch(updateAllMapLayerList(jsonData.mapLayerList));
  dispatch(updateAllNavbar(jsonData.navBar));
  dispatch(updateAllRegion(jsonData.selectedRegion));
  setShareUrlComplete(true);
};
