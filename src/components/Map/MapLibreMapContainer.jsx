import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  Map,
  AttributionControl,
  NavigationControl,
  Source,
  Layer,
} from "@vis.gl/react-maplibre";
import { Box } from "@mui/material";
import { agolApiKey, mapConfig } from "../../configuration/config";
import { basemapStyleUrl } from "./basemapStyle";
import { OVERLAY_ANCHOR_LAYER } from "./layerSources";
import { toInitialViewState } from "../../utility/viewState";

const basemapSelector = (state) => state.mapProperties.basemap;
const selectedRegionSelector = (state) => state.selectedRegion.value;

const emptyCollection = { type: "FeatureCollection", features: [] };

export default function MapLibreMapContainer(props) {
  const {
    center,
    zoom,
    setMap,
    children,
    interactiveLayerIds,
    cursor,
    onMoveEnd,
    onClick,
    onMouseMove,
    onMouseLeave,
  } = props;
  const basemap = useSelector(basemapSelector);
  const selectedRegion = useSelector(selectedRegionSelector);

  const handleLoad = useCallback(
    (event) => {
      if (setMap) setMap(event.target);
    },
    [setMap],
  );

  return (
    <Box
      id="map-container"
      sx={{
        position: "relative",
        height: "calc(100% - 64px)",
        width: "calc(100% - 1px)",
      }}
    >
      <Map
        initialViewState={toInitialViewState({ center, zoom })}
        mapStyle={basemapStyleUrl(mapConfig.basemaps[basemap], agolApiKey)}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
        canvasContextAttributes={{ preserveDrawingBuffer: true }}
        interactiveLayerIds={interactiveLayerIds}
        cursor={cursor}
        onLoad={handleLoad}
        onMoveEnd={onMoveEnd}
        onClick={onClick}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <NavigationControl position="top-left" showCompass={false} />
        <AttributionControl
          compact={false}
          customAttribution={mapConfig.regions[selectedRegion].attribution}
        />
        <Source
          id="overlay-anchor-source"
          type="geojson"
          data={emptyCollection}
        >
          <Layer id={OVERLAY_ANCHOR_LAYER} type="line" />
        </Source>
        {children}
      </Map>
    </Box>
  );
}

MapLibreMapContainer.propTypes = {
  center: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired,
  setMap: PropTypes.func,
  children: PropTypes.node,
  interactiveLayerIds: PropTypes.arrayOf(PropTypes.string),
  cursor: PropTypes.string,
  onMoveEnd: PropTypes.func,
  onClick: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
};
