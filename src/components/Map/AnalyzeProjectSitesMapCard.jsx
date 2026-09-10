import React, { useState, useEffect, useCallback } from "react";
import ReactGA from "react-ga4";
import { useSelector, useDispatch } from "react-redux";
import { LayersClear, Share } from "@mui/icons-material";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

import MapCard from "./MapCard.jsx";
import MapOverlay from "./MapOverlay.jsx";
import DrawnAreas from "./DrawnAreas.jsx";
import IdentifyButton from "./IdentifyButton.jsx";
import ShowIdentifyPopup from "./IdentifyPopup.jsx";
import DrawTools from "./DrawTools.jsx";
import useTerraDraw, { createSketchModes } from "./useTerraDraw";
import {
  DRAWN_INTERACTIVE_LAYERS,
  BUFFER_FILL_LAYER,
  AREA_COLORS,
  BUFFER_COLORS,
} from "./drawnAreaData";
import { useGetIdentifyQuery } from "../../services/identify";
import {
  changeRegion,
  regionUserInitiated,
} from "../../reducers/regionSelectSlice";
import {
  changeZoom,
  changeCenter,
  changeIdentifyCoordinates,
  changeIdentifyResults,
  changeIdentifyIsLoaded,
} from "../../reducers/mapPropertiesSlice";
import { mapConfig } from "../../configuration/config";
import { createShareURL } from "./ShareMap.jsx";
import ModalShare from "../All/ModalShare.jsx";
import { jumpToStored, readViewState } from "../../utility/viewState";

const regions = mapConfig.regions;

const selectedRegionSelector = (state) => state.selectedRegion.value;
const userInitiatedSelector = (state) => state.selectedRegion.userInitiated;
const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;
const sketchAreaSelector = (state) => state.mapProperties.sketchArea;
const identifyCoordinatesSelector = (state) =>
  state.mapProperties.identifyCoordinates;
const identifyIsLoadedSelector = (state) =>
  state.mapProperties.identifyIsLoaded;
const identifyItemsSelector = (state) => state.mapProperties.identifyResults;
const useBufferSelector = (state) => state.mapProperties.useBuffer;

const NO_HOVER = { areaName: null, bufferAreaName: null };

const escapeSelector = (selector) => selector.replace(/[()]/g, "\\$&");

const slug = (areaName) =>
  areaName.toString().toLowerCase().replaceAll(" ", "-").replaceAll(",", "-");

const setChartCardBorder = (areaName, border) => {
  const element = document.querySelector(
    escapeSelector(`#box-${slug(areaName)}`),
  );
  if (element) element.style.border = border;
};

export default function AnalyzeProjectSitesMapCard(props) {
  const { map, setMap, setErrorState, hover, setDrawAreaDisabled } = props;
  const [shareLinkOpen, setShareLinkOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const dispatch = useDispatch();
  const selectedRegion = useSelector(selectedRegionSelector);
  const userInitiatedRegion = useSelector(userInitiatedSelector);
  const drawnFromState = useSelector(drawnLayersSelector);
  const sketchArea = useSelector(sketchAreaSelector);
  const identifyCoordinates = useSelector(identifyCoordinatesSelector);
  const identifyItems = useSelector(identifyItemsSelector);
  const identifyIsLoaded = useSelector(identifyIsLoadedSelector);
  const [identifyArmed, setIdentifyArmed] = useState(false);
  const [mapHover, setMapHover] = useState(NO_HOVER);
  const bufferCheckbox = useSelector(useBufferSelector);
  const draw = useTerraDraw(map, createSketchModes);

  const regionFeatures = (drawnFromState?.features ?? []).filter(
    (item) => item.properties.region === selectedRegion,
  );

  const { data } = useGetIdentifyQuery(
    {
      region: regions[selectedRegion].regionName,
      coordinates: identifyCoordinates,
    },
    { skip: !identifyCoordinates },
  );

  useEffect(() => {
    if (data) {
      dispatch(changeIdentifyIsLoaded(true));
      dispatch(changeIdentifyResults(data));
    }
  }, [data, dispatch]);

  const clearMapHover = () => {
    if (mapHover.areaName)
      setChartCardBorder(mapHover.areaName, "1px solid #555555");
    if (mapHover.bufferAreaName) {
      setChartCardBorder(mapHover.bufferAreaName, "1px solid #555555");
    }
    setMapHover(NO_HOVER);
  };

  const handleAreaClick = (areaName) => {
    const button = document.querySelector(
      escapeSelector(`#btn-more-less-${slug(areaName)}`),
    );
    if (button) {
      button.click();
      button.scrollIntoView({ block: "end", inline: "end" });
    }
  };

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
    onClick: (event) => {
      if (identifyArmed) {
        const { lat, lng } = event.lngLat;
        dispatch(changeIdentifyIsLoaded(false));
        dispatch(changeIdentifyCoordinates({ lat, lng }));
        dispatch(changeIdentifyResults(null));
        setIdentifyArmed(false);
        return;
      }
      if (sketchArea) return;
      const feature = event.features?.[0];
      if (feature) handleAreaClick(feature.properties.areaName);
    },
    onMouseMove: (event) => {
      const feature = event.features?.[0];
      if (!feature) return;
      const isBuffer = feature.layer.id === BUFFER_FILL_LAYER;
      const { areaName } = feature.properties;
      const next = isBuffer
        ? { areaName: null, bufferAreaName: areaName }
        : { areaName, bufferAreaName: null };
      if (
        next.areaName === mapHover.areaName &&
        next.bufferAreaName === mapHover.bufferAreaName
      ) {
        return;
      }
      clearMapHover();
      setMapHover(next);
      setChartCardBorder(
        areaName,
        `2px solid ${isBuffer ? BUFFER_COLORS.hover : AREA_COLORS.hover}`,
      );
    },
    onMouseLeave: () => {
      clearMapHover();
    },
  };

  const hoveredArea = hover?.areaName ?? mapHover.areaName;
  const hoveredBuffer = hover?.bufferAreaName ?? mapHover.bufferAreaName;
  const cursor = identifyArmed ? "crosshair" : undefined;

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
    <MapCard
      setMap={setMap}
      mapEventHandlers={mapEventHandlers}
      interactiveLayerIds={DRAWN_INTERACTIVE_LAYERS}
      cursor={cursor}
    >
      <MapOverlay position="top-left">
        <IdentifyButton onArm={() => setIdentifyArmed(true)} />
      </MapOverlay>
      <DrawnAreas
        features={regionFeatures}
        hoveredArea={hoveredArea}
        hoveredBuffer={hoveredBuffer}
      />
      <ShowIdentifyPopup
        region={selectedRegion}
        identifyItems={identifyItems}
        identifyIsLoaded={identifyIsLoaded}
        identifyCoordinates={identifyCoordinates}
      />
      <DrawTools
        map={map}
        draw={draw}
        bufferCheckbox={bufferCheckbox}
        setDrawAreaDisabled={setDrawAreaDisabled}
        setErrorState={setErrorState}
      />
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
  hover: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  setDrawAreaDisabled: PropTypes.func,
};
