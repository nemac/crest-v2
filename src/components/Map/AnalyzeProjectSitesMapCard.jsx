import React, { useState, useEffect, useCallback } from "react";
import ReactGA from "react-ga4";
import { useSelector, useDispatch } from "react-redux";
import { LayersClear, Share } from "@mui/icons-material";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

import MapCard from "./MapCard.jsx";
import MapOverlay from "./MapOverlay.jsx";
import {
  changeRegion,
  regionUserInitiated,
} from "../../reducers/regionSelectSlice";
import { changeZoom, changeCenter } from "../../reducers/mapPropertiesSlice";
import { mapConfig } from "../../configuration/config";
import { createShareURL } from "./ShareMap.jsx";
import ModalShare from "../All/ModalShare.jsx";
import { jumpToStored, readViewState } from "../../utility/viewState";

const regions = mapConfig.regions;

const selectedRegionSelector = (state) => state.selectedRegion.value;
const userInitiatedSelector = (state) => state.selectedRegion.userInitiated;

export default function AnalyzeProjectSitesMapCard(props) {
  const { map, setMap, setErrorState } = props;
  const [shareLinkOpen, setShareLinkOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const dispatch = useDispatch();
  const selectedRegion = useSelector(selectedRegionSelector);
  const userInitiatedRegion = useSelector(userInitiatedSelector);

  const handleRegionChange = useCallback(
    (regionName, user) => {
      if (!regions[regionName] || !user || !map) return;
      jumpToStored(map, regions[regionName].mapProperties);
      dispatch(changeRegion(regions[regionName].label));
      dispatch(changeZoom(regions[regionName].mapProperties.zoom));
      dispatch(changeCenter(regions[regionName].mapProperties.center));
      dispatch(regionUserInitiated(false));
      ReactGA.event({
        category: "engagement",
        action: "change_region",
        label: regions[regionName].label,
      });
    },
    [map, dispatch],
  );

  useEffect(() => {
    handleRegionChange(selectedRegion, userInitiatedRegion);
  }, [selectedRegion, handleRegionChange, userInitiatedRegion]);

  const mapEventHandlers = {
    onMoveEnd: (event) => {
      const { center, zoom } = readViewState(event.target);
      dispatch(changeZoom(zoom));
      dispatch(changeCenter(center));
    },
  };

  const handleShareLinkClose = () => {
    setShareLinkOpen(false);
  };

  const handleShareLinkCopy = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  const handleSelectURLDblClick = (event) => {
    const range = document.createRange();
    range.selectNodeContents(event.target);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  };

  const shareMapHandler = (event) => {
    event.stopPropagation();
    setShareUrl(createShareURL());
    setShareLinkOpen(true);
    ReactGA.event({
      category: "engagement",
      action: "share_map",
      label: "share map",
    });
  };

  const clearHandler = (event) => {
    event.stopPropagation();
    setErrorState((previous) => ({
      ...previous,
      error: true,
      errorType: "warning",
      errorTitle: "Clear All State",
      errorMessage:
        "Warning. This will clear all state and reload the page. Do you want to proceed?",
      acceptButtonText: "Proceed",
      acceptButtonClose: () => {
        setErrorState({ ...previous, error: false });
        localStorage.clear();
        window.location.reload(true);
      },
    }));
  };

  return (
    <MapCard setMap={setMap} mapEventHandlers={mapEventHandlers}>
      <MapOverlay position="bottom-left">
        <Button
          variant="contained"
          startIcon={<Share />}
          onClick={shareMapHandler}
          color="CRESTPrimary"
          sx={{ margin: "0 0 10px 0", display: "flex" }}
        >
          Share
        </Button>
        <Button
          variant="contained"
          startIcon={<LayersClear />}
          onClick={clearHandler}
          color="CRESTPrimary"
          sx={{ margin: "0 0 20px 0", display: "flex" }}
        >
          Clear
        </Button>
      </MapOverlay>
      <ModalShare
        contentTitle={"Share map url"}
        contentMessage={shareUrl}
        buttonMessage="Dismiss"
        onClose={handleShareLinkClose}
        onDoubleClick={handleSelectURLDblClick}
        secondaryClick={handleShareLinkCopy}
        secondaryButtonMessage="Copy Map URL"
        open={shareLinkOpen}
      />
    </MapCard>
  );
}

AnalyzeProjectSitesMapCard.propTypes = {
  map: PropTypes.object,
  setMap: PropTypes.func,
  setErrorState: PropTypes.func,
};
