import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Source, Layer, Marker } from "@vis.gl/react-maplibre";
import * as turf from "@turf/turf";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { LayersClear } from "@mui/icons-material";
import MapCard from "./MapCard.jsx";
import MapOverlay from "./MapOverlay.jsx";

import {
  changeRegion,
  regionUserInitiated,
} from "../../reducers/regionSelectSlice";
import {
  changeZoom,
  changeCenter,
  changeResilienceHub,
} from "../../reducers/mapPropertiesSlice";
import { MapLabel } from "../All/StyledComponents.jsx";
import { mapConfig } from "../../configuration/config";
import { queryFeatureLayer } from "../../services/arcgisQuery";
import { jumpToStored, readViewState } from "../../utility/viewState";

const selectedRegionSelector = (state) => state.selectedRegion.value;
const selectedResilienceHub = (state) => state.mapProperties.resilienceHub;
const userInitiatedSelector = (state) => state.selectedRegion.userInitiated;

const HUB_COLOR = "#3388ff";

export default function ResilienceMapCard(props) {
  const { setAverageHubScore, setChartData, setErrorState } = props;
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  const selectedRegion = useSelector(selectedRegionSelector);
  const resilienceHub = useSelector(selectedResilienceHub);
  const userInitiatedRegion = useSelector(userInitiatedSelector);
  const hubsURL = mapConfig.regions[selectedRegion].hubsFeatureServer;

  const handleRegionChange = useCallback(
    (regionName, user) => {
      if (!mapConfig.regions[regionName] || !user || !map) return;
      jumpToStored(map, mapConfig.regions[regionName].mapProperties);
      dispatch(changeResilienceHub(null));
      dispatch(changeRegion(mapConfig.regions[regionName].label));
      dispatch(changeZoom(mapConfig.regions[regionName].mapProperties.zoom));
      dispatch(
        changeCenter(mapConfig.regions[regionName].mapProperties.center),
      );
      dispatch(regionUserInitiated(false));
      setAverageHubScore(null);
      setChartData(null);
    },
    [map, dispatch, setAverageHubScore, setChartData],
  );

  useEffect(() => {
    handleRegionChange(selectedRegion, userInitiatedRegion);
  }, [selectedRegion, handleRegionChange, userInitiatedRegion]);

  const mapEventHandlers = {
    onClick: (event) => {
      const { lng, lat } = event.lngLat;
      queryFeatureLayer(hubsURL, {
        geometry: { type: "Point", coordinates: [lng, lat] },
      })
        .then((featureCollection) => {
          if (featureCollection.features.length > 0) {
            dispatch(changeResilienceHub(featureCollection.features[0]));
          }
        })
        .catch(() => null);
    },
    onMoveEnd: (event) => {
      const { center, zoom } = readViewState(event.target);
      dispatch(changeZoom(zoom));
      dispatch(changeCenter(center));
    },
  };

  const clearHandler = (event) => {
    event.stopPropagation();
    setErrorState((previous) => ({
      ...previous,
      error: true,
      errorType: "warning",
      errorTitle: "Clear All State",
      errorMessage:
        "Warning. This will clear all map and chart data then reload the page. Do you want to proceed",
      acceptButtonText: "Proceed",
      acceptButtonClose: () => {
        setErrorState({ ...previous, error: false });
        localStorage.clear();
        window.location.reload(true);
      },
    }));
  };

  const hubCenter = resilienceHub
    ? turf.center(resilienceHub).geometry.coordinates
    : null;

  return (
    <MapCard
      setMap={setMap}
      mapEventHandlers={mapEventHandlers}
      cursor="pointer"
    >
      <MapOverlay position="bottom-left">
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
      {resilienceHub && (
        <>
          <Source id="resilience-hub" type="geojson" data={resilienceHub}>
            <Layer
              id="resilience-hub-fill"
              type="fill"
              paint={{ "fill-color": HUB_COLOR, "fill-opacity": 0.2 }}
            />
            <Layer
              id="resilience-hub-line"
              type="line"
              paint={{ "line-color": HUB_COLOR, "line-width": 3 }}
            />
          </Source>
          <Marker
            longitude={hubCenter[0]}
            latitude={hubCenter[1]}
            anchor="center"
          >
            <MapLabel>{resilienceHub.id}</MapLabel>
          </Marker>
        </>
      )}
    </MapCard>
  );
}

ResilienceMapCard.propTypes = {
  setAverageHubScore: PropTypes.func,
  setChartData: PropTypes.func,
  setErrorState: PropTypes.func,
};
