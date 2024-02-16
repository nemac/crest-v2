import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GeoJSON, useMapEvents } from "react-leaflet";
import * as esri from "esri-leaflet";
import Control from "react-leaflet-custom-control";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { LayersClear } from "@mui/icons-material";

import LeafletMapContainer from "./LeafletMapContainer.jsx";
import ActiveTileLayers from "./ActiveTileLayers.jsx";
import BasemapLayer from "./BasemapLayer.jsx";

import {
  changeRegion,
  regionUserInitiated,
} from "../../reducers/regionSelectSlice";
import {
  changeZoom,
  changeCenter,
  changeResilienceHub,
} from "../../reducers/mapPropertiesSlice";
import { StyledReactLeafletTooltip } from "../All/StyledComponents.jsx";
import { mapConfig } from "../../configuration/config";

const selectedRegionSelector = (state) => state.selectedRegion.value;
const selectedCenterSelector = (state) => state.mapProperties.center;
const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedResilienceHub = (state) => state.mapProperties.resilienceHub;
const userInitiatedSelector = (state) => state.selectedRegion.userInitiated;

export default function ResilienceMapCard(props) {
  const { setAverageHubScore, setChartData, setErrorState } = props;
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const [map, setMap] = useState(null);
  const center = useSelector(selectedCenterSelector, () => true);
  const zoom = useSelector(selectedZoomSelector, () => true);
  const selectedRegion = useSelector(selectedRegionSelector);
  const resilienceHub = useSelector(selectedResilienceHub);
  const userInitiatedRegion = useSelector(userInitiatedSelector);
  const hubsURL = mapConfig.regions[selectedRegion].hubsFeatureServer;

  const featureLayerHubs = esri.featureLayer({
    url: hubsURL,
  });

  // Change the map cursor style to pointer
  React.useEffect(() => {
    if (map) {
      map.getContainer().style.cursor = "pointer";
      // I truly dislike that I have to set this timeout to get the tooltip in the right spot
      setTimeout(() => {
        setReady(true);
      }, 500);
    }
  }, [map]);

  const handleRegionChange = useCallback(
    (regionName, user) => {
      // catch bad region
      if (!mapConfig.regions[regionName]) return null;

      // check for user changing region as opposed to
      //  state update on refresh
      if (!user) return null;

      // ensure map has been instantiated
      if (map) {
        // zoom to region locations
        map.setView(
          mapConfig.regions[regionName].mapProperties.center,
          mapConfig.regions[regionName].mapProperties.zoom,
        );

        // Update redux store with new region, zoom, and center
        dispatch(changeResilienceHub(null));
        dispatch(changeRegion(mapConfig.regions[regionName].label));
        dispatch(changeZoom(mapConfig.regions[regionName].mapProperties.zoom));
        dispatch(
          changeCenter(mapConfig.regions[regionName].mapProperties.center),
        );
        dispatch(regionUserInitiated(false));
        // reset hub data on region switch to avoid confusion
        setAverageHubScore(null);
        setChartData(null);
      }
      return null;
    },
    [map, dispatch],
  );

  useEffect(() => {
    handleRegionChange(selectedRegion, userInitiatedRegion);
  }, [selectedRegion, handleRegionChange, userInitiatedRegion]);

  // This component exists solely for the useMapEvents hook
  const MapEventsComponent = () => {
    useMapEvents({
      click: (e) => {
        const query = featureLayerHubs.query().nearby(e.latlng, 0);
        query.run((error, featureCollection, response) => {
          if (error) {
            return;
          }
          if (featureCollection.features.length === 0) {
            return;
          }
          dispatch(changeResilienceHub(featureCollection.features[0]));
        });
      },
      moveend: () => {
        // Send updated zoom and center to redux when moveend event occurs.
        dispatch(changeZoom(map.getZoom()));
        dispatch(changeCenter([map.getCenter().lat, map.getCenter().lng]));
      },
    });
    return null;
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
    <LeafletMapContainer center={center} zoom={zoom} innerRef={setMap}>
      <Control position="bottomleft">
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

      {ready &&
        (resilienceHub ? (
          <GeoJSON key={resilienceHub?.id} data={resilienceHub}>
            <StyledReactLeafletTooltip direction="center" permanent>
              {resilienceHub?.id}
            </StyledReactLeafletTooltip>
          </GeoJSON>
        ) : (
          <></>
        ))}
      <ActiveTileLayers />
      <BasemapLayer map={map} />
      <MapEventsComponent />
    </LeafletMapContainer>
  );
}

ResilienceMapCard.propTypes = {
  setAverageHubScore: PropTypes.func,
  setChartData: PropTypes.func,
  setErrorState: PropTypes.func,
};
