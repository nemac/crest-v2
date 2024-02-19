import React, { useEffect, useCallback, useRef } from "react";
// import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { vectorBasemapLayer } from "esri-leaflet-vector";
import { AttributionControl, useMap } from "react-leaflet";
import { mapConfig } from "../../configuration/config";

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
          apikey:
            "AAPKa0a45bdbd847441badbdcf07a97939bd0Y1Vpjt3MU7qyu7R9QThGqpucpKmbVXGEdmQo1hqhdjLDKA2zrwty2aeDjT-7-By",
          pane: "mapPane",
          version: 2,
          attribution: regions[selectedRegion].attribution,
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
