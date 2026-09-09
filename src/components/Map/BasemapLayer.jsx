import React, { useEffect, useCallback, useRef } from "react";
// import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { vectorBasemapLayer } from "esri-leaflet-vector";
import { AttributionControl, useMap } from "react-leaflet";
import { agolApiKey, mapConfig } from "../../configuration/config";

const basemaps = mapConfig.basemaps;
const regions = mapConfig.regions;

const baseMapSelector = (state) => state.mapProperties.basemap;
const selectedRegionSelector = (state) => state.selectedRegion.value;

export default function BasemapLayer(props) {
  const selectedBasemap = useSelector(baseMapSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  const basemapRef = useRef(null);
  const map = useMap();

  const handleBasemapChange = useCallback(
    (basemapName) => {
      if (basemapRef.current !== null) {
        basemapRef.current.remove(map);
      }

      if (map) {
        const newBasemap = vectorBasemapLayer(basemaps[basemapName].basemap, {
          apikey: agolApiKey,
          pane: "mapPane",
          version: 2,
          attribution: regions[selectedRegion].attribution,
          worldview: basemaps[basemapName].worldview
            ? basemaps[basemapName].worldview
            : "",
        });
        newBasemap.addTo(map);
        basemapRef.current = newBasemap;
      }
    },
    [map, selectedRegion],
  );

  useEffect(() => {
    handleBasemapChange(selectedBasemap);
  }, [selectedBasemap, handleBasemapChange]);

  return <AttributionControl />;
}

BasemapLayer.propTypes = {};
