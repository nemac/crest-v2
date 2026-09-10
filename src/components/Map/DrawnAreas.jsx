import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Source, Layer, Marker } from "@vis.gl/react-maplibre";
import { MapLabel } from "../All/StyledComponents.jsx";
import {
  AREA_FILL_LAYER,
  BUFFER_FILL_LAYER,
  AREA_COLORS,
  BUFFER_COLORS,
  drawnAreaCollections,
} from "./drawnAreaData";

// Stored zoom at which Leaflet started showing the area tooltips.
const LABEL_MIN_ZOOM = 9;

const zoomSelector = (state) => state.mapProperties.zoom;

const colorFor = (hoveredName, colors) => [
  "case",
  ["==", ["get", "areaName"], hoveredName ?? ""],
  colors.hover,
  colors.base,
];

export default function DrawnAreas({ features, hoveredArea, hoveredBuffer }) {
  const zoom = useSelector(zoomSelector);
  const { areas, buffers } = useMemo(
    () => drawnAreaCollections(features),
    [features],
  );

  return (
    <>
      <Source id="drawn-buffers" type="geojson" data={buffers}>
        <Layer
          id={BUFFER_FILL_LAYER}
          type="fill"
          paint={{
            "fill-color": colorFor(hoveredBuffer, BUFFER_COLORS),
            "fill-opacity": 0.2,
          }}
        />
        <Layer
          id="drawn-buffers-line"
          type="line"
          paint={{
            "line-color": colorFor(hoveredBuffer, BUFFER_COLORS),
            "line-width": 2,
          }}
        />
      </Source>
      <Source id="drawn-areas" type="geojson" data={areas}>
        <Layer
          id={AREA_FILL_LAYER}
          type="fill"
          paint={{
            "fill-color": colorFor(hoveredArea, AREA_COLORS),
            "fill-opacity": 0.2,
          }}
        />
        <Layer
          id="drawn-areas-line"
          type="line"
          paint={{
            "line-color": colorFor(hoveredArea, AREA_COLORS),
            "line-width": 2,
          }}
        />
      </Source>
      {zoom >= LABEL_MIN_ZOOM &&
        features
          .filter((feature) => feature.properties.center)
          .map((feature) => (
            <Marker
              key={feature.properties.areaName}
              longitude={feature.properties.center.lng}
              latitude={feature.properties.center.lat}
              anchor="center"
            >
              <MapLabel>{feature.properties.areaName}</MapLabel>
            </Marker>
          ))}
    </>
  );
}

DrawnAreas.propTypes = {
  features: PropTypes.array.isRequired,
  hoveredArea: PropTypes.string,
  hoveredBuffer: PropTypes.string,
};
