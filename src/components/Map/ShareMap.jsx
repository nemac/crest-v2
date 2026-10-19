import { v4 } from "uuid";
import { mapConfig, shareLinkWriteEndpoint } from "../../configuration/config";
import { updateAllMapProperties } from "../../reducers/mapPropertiesSlice";
import { updateAllAnalyze } from "../../reducers/analyzeAreaSlice";
import { updateAllRegion } from "../../reducers/regionSelectSlice";
import { updateAllNavbar } from "../../reducers/NavBarSlice";
import { updateAllMapLayerList } from "../../reducers/mapLayerListSlice";
import { loadState } from "../../localStorage";
import { migrateSavedState } from "../../stateMigrations";

export const createShareURL = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", shareLinkWriteEndpoint);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  const uuid = v4();
  const date = new Date();
  const monthString = date.toLocaleString("en-US", { month: "short" });
  const padL = (nr, len = 2, chr = "0") => `${nr}`.padStart(2, chr);
  const dateString = `_${date.getFullYear()}-${padL(monthString)}-${padL(date.getDate())}`;
  const shareUrlString = uuid.concat(dateString);
  const s3Location = shareUrlString.concat(".json");
  const shareUrl = window.location.href
    .concat("?")
    .concat("shareUrl=")
    .concat(shareUrlString);
  const payload = JSON.stringify({ location: s3Location, state: loadState() });
  xhr.send(payload);
  return shareUrl;
};

const sliceUpdates = [
  ["mapProperties", updateAllMapProperties],
  ["analyzeArea", updateAllAnalyze],
  ["mapLayerList", updateAllMapLayerList],
  ["navBar", updateAllNavbar],
  ["selectedRegion", updateAllRegion],
];

// The share read endpoint answers {"message": ...}; network failures and timeouts carry error.error instead.
// After a failed read the shareUrl param is removed, so the hook must not run again with an empty id.
export const skipShareRead = (proceeded, shareUrl) => !proceeded || !shareUrl;

export const shareErrorText = (error) =>
  error?.data?.message ?? error?.error ?? "unknown error";

// Returns why shared state cannot be opened, or null when it can.
export const shareProblem = (shareData) => {
  if (!shareData?.mapProperties) {
    return "This share link has no map data.";
  }
  if (!mapConfig.regions[shareData.selectedRegion?.value]) {
    return "This share link is for a region CREST no longer has.";
  }
  return null;
};

// Loads shared state into the store; returns a problem message instead when it cannot be opened.
export const UpdateRedux = (shareData, dispatch, setShareUrlComplete) => {
  const jsonData = migrateSavedState(shareData);
  const problem = shareProblem(jsonData);
  if (problem) {
    return problem;
  }
  sliceUpdates.forEach(([key, update]) => {
    if (jsonData[key]) {
      dispatch(update(jsonData[key]));
    }
  });
  setShareUrlComplete(true);
  return null;
};
