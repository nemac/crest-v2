import React, { useState, useEffect, useCallback } from "react";
import ReactGA from "react-ga4";

import { useSelector, useDispatch } from "react-redux";
import { GeoJSON, Circle } from "react-leaflet";
import { LayersClear, Share } from "@mui/icons-material";
import { Button } from "@mui/material";
import Control from "react-leaflet-custom-control";
import PropTypes from "prop-types";

import SearchPlaces from "./SearchPlaces.jsx";
import MapCard from "./MapCard.jsx";

import {
  changeRegion,
  regionUserInitiated,
} from "../../reducers/regionSelectSlice";
import {
  changeZoom,
  changeCenter,
  changeIdentifyResults,
  changeIdentifyIsLoaded,
} from "../../reducers/mapPropertiesSlice";

import ShowIdentifyPopup from "./IdentifyPopup.jsx";
import IdentifyButtonWrapper from "./IdentifyButton.jsx";
import { mapConfig } from "../../configuration/config";
import { createShareURL } from "./ShareMap.jsx";
import ModalShare from "../All/ModalShare.jsx";
import LeafletDrawTools from "./LeafletDrawTools.jsx";
import { StyledReactLeafletTooltip } from "../All/StyledComponents.jsx";
import { useGetIdentifyQuery } from "../../services/identify";

const regions = mapConfig.regions;

// selector named functions for lint rules makes it easier to re-use if needed.
const selectedRegionSelector = (state) => state.selectedRegion.value;
const userInitiatedSelector = (state) => state.selectedRegion.userInitiated;
const areaVisibleSelector = (state) => state.mapProperties.areaVisible;
const listVisibleSelector = (state) => state.mapLayerList.visible;
const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;
const identifyCoordinatesSelector = (state) =>
  state.mapProperties.identifyCoordinates;
const identifyIsLoadedSelector = (state) =>
  state.mapProperties.identifyIsLoaded;
const identifyItemsSelector = (state) => state.mapProperties.identifyResults;
const useBufferSelector = (state) => state.mapProperties.useBuffer;

export default function AnalyzeProjectSitesMapCard(props) {
  const {
    map,
    setMap,
    leafletFeatureGroupRef,
    setDrawAreaDisabled,
    setCurrentDrawn,
    hover,
    setErrorState,
  } = props;
  const [shareLinkOpen, setShareLinkOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const dispatch = useDispatch();
  // setting "() => true" for both center and zoom ensures that value is only read from store once

  const areaVisible = useSelector(areaVisibleSelector);
  const layerListVisible = useSelector(listVisibleSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  const userInitiatedRegion = useSelector(userInitiatedSelector);
  const drawnFromState = useSelector(drawnLayersSelector);

  const identifyCoordinates = useSelector(identifyCoordinatesSelector);
  const identifyItems = useSelector(identifyItemsSelector);
  const identifyIsLoaded = useSelector(identifyIsLoadedSelector);
  const bufferCheckbox = useSelector(useBufferSelector);

  // need to create an invisible circle to trigger non-empty map for export
  const dummyPoint = [51.505, -0.09];

  const { data, error, isFetching } = useGetIdentifyQuery(
    {
      region: mapConfig.regions[selectedRegion].regionName,
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

  if (error) {
    // TODO: Do something with errors
    // console.log('jeff error ', error);
  }

  if (isFetching) {
    // TODO: Do something with isFetching???
    // console.log('jeff isFetching ', isFetching);
  }

  const handleRegionChange = useCallback(
    (regionName, user) => {
      // catch bad region
      if (!regions[regionName]) return null;

      // check for user changing region as opposed to
      //  state update on refresh
      if (!user) return null;

      // ensure map has been instantiated
      if (map) {
        // zoom to region locations
        map.setView(
          regions[regionName].mapProperties.center,
          regions[regionName].mapProperties.zoom,
        );

        // Update redux store with new region, zoom, and center
        dispatch(changeRegion(regions[regionName].label));
        dispatch(changeZoom(regions[regionName].mapProperties.zoom));
        dispatch(changeCenter(regions[regionName].mapProperties.center));
        dispatch(regionUserInitiated(false));
        ReactGA.event({
          category: "engagement",
          action: "change_region",
          label: regions[regionName].label,
        });
      }
      return null;
    },
    [map, dispatch],
  );

  useEffect(() => {
    let timer;
    if (map) {
      timer = setTimeout(() => map.invalidateSize(), 10);
    }
    return () => clearTimeout(timer);
  }, [map, areaVisible, layerListVisible]);

  useEffect(() => {
    handleRegionChange(selectedRegion, userInitiatedRegion);
  }, [selectedRegion, handleRegionChange, userInitiatedRegion]);

  const mapEventHandlers = {
    moveend: () => {
      // Send updated zoom and center to redux when moveend event occurs.
      dispatch(changeZoom(map.getZoom()));
      dispatch(changeCenter([map.getCenter().lat, map.getCenter().lng]));
    },
    zoomend: () => {
      if (map.getZoom() >= 9) {
        return map.eachLayer((layer) => {
          layer.openTooltip();
        });
      }
      return map.eachLayer((layer) => {
        layer.closeTooltip();
      });
    },
  };

  const handleShareLinkClose = (event) => {
    // navigator.clipboard.writeText(shareUrl); // THIS IS BROKEN ON HTTP
    setShareLinkOpen(false);
  };

  const handleShareLinkCopy = () => {
    navigator.clipboard.writeText(shareUrl); // THIS IS BROKEN ON HTTP
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

  const escapeSelector = (selector) => selector.replace(/[()]/g, "\\$&");

  const handleMouseover = (overColor, areaName) => (event) => {
    const { target } = event;
    target.setStyle({
      color: overColor,
    });
    const boxID = `#box-${areaName.toString().toLowerCase().replaceAll(" ", "-").replaceAll(",", "-")}`;
    const moreGraphElem = document.querySelector(escapeSelector(boxID));
    if (moreGraphElem) moreGraphElem.style.border = `2px solid ${overColor}`;
  };

  const handleAreaClick = (areaName) => (event) => {
    const elemID = `#btn-more-less-${areaName.toString().toLowerCase().replaceAll(" ", "-").replaceAll(",", "-")}`;
    const moreLessButton = document.querySelector(escapeSelector(elemID));
    if (moreLessButton) {
      moreLessButton.click();
      moreLessButton.scrollIntoView({ block: "end", inline: "end" });
    }
  };

  const handleMouseout = (outColor, areaName) => (event) => {
    const { target } = event;
    target.setStyle({
      color: outColor,
    });
    const boxID = `#box-${areaName.toString().toLowerCase().replaceAll(" ", "-").replaceAll(",", "-")}`;
    const moreGraphElem = document.querySelector(escapeSelector(boxID));
    if (moreGraphElem) moreGraphElem.style.border = "1px solid #555555";
  };

  return (
    <MapCard setMap={setMap} map={map} mapEventHandlers={mapEventHandlers}>
      <IdentifyButtonWrapper map={map} />
      <SearchPlaces map={map} leafletFeatureGroupRef={leafletFeatureGroupRef} />
      <Control position="bottomleft">
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
      </Control>
      <LeafletDrawTools
        bufferCheckbox={bufferCheckbox}
        leafletFeatureGroupRef={leafletFeatureGroupRef}
        setDrawAreaDisabled={setDrawAreaDisabled}
        setCurrentDrawn={setCurrentDrawn}
        setErrorState={setErrorState}
      />
      {drawnFromState?.features
        ?.filter((item) => item.properties.region === selectedRegion) // .replace("of America","of Mexico") temp fix for region in json data on AOGL
        .map((item) => (
          <React.Fragment key={item.geometry.coordinates}>
            <GeoJSON
              data={item}
              onEachFeature={(feature, layer) => {
                layer.on({
                  mouseover: handleMouseover(
                    "#dda006",
                    item.properties.areaName,
                  ),
                  mouseout: handleMouseout("#4992f9", item.properties.areaName),
                  click: handleAreaClick(item.properties.areaName),
                });
              }}
              style={{
                weight: 2,
                opacity: 1,
                color:
                  hover.areaName === item.properties.areaName
                    ? "#dda006"
                    : "#4992f9",
              }}
            >
              <StyledReactLeafletTooltip
                direction="center"
                position={item.properties.center}
                permanent
              >
                {item.properties.areaName}
              </StyledReactLeafletTooltip>
            </GeoJSON>
            <GeoJSON
              data={item.properties.buffGeo}
              onEachFeature={(feature, layer) => {
                layer.on({
                  mouseover: handleMouseover(
                    "#ffc107",
                    item.properties.areaName,
                  ),
                  mouseout: handleMouseout("#99c3ff", item.properties.areaName),
                  click: handleAreaClick(item.properties.areaName),
                });
              }}
              style={{
                weight: 2,
                opacity: 1,
                color:
                  hover.bufferAreaName === item.properties.areaName
                    ? "#ffc107"
                    : "#99c3ff",
              }}
            />
          </React.Fragment>
        ))}
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
      <Circle center={dummyPoint} pathOptions={{ opacity: 0 }} radius={1} />
      <ShowIdentifyPopup
        region={selectedRegion}
        identifyItems={identifyItems}
        identifyIsLoaded={identifyIsLoaded}
        identifyCoordinates={identifyCoordinates}
      />
    </MapCard>
  );
}

AnalyzeProjectSitesMapCard.propTypes = {
  map: PropTypes.object,
  setMap: PropTypes.func,
  leafletFeatureGroupRef: PropTypes.object,
  setDrawAreaDisabled: PropTypes.func,
  setCurrentDrawn: PropTypes.func,
  setErrorState: PropTypes.func,
  hover: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};
