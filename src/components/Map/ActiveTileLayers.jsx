import React from 'react';
import { useSelector } from 'react-redux';
import { TileLayer } from 'react-leaflet';
import { mapConfig } from '../../configuration/config';

// selector named functions for lint rules makes it easier to re-use if needed.
const selectedRegionSelector = (state) => state.selectedRegion.value;
const activeLayerListSelector = (state) => state.mapLayerList.activeLayerList;

export default function ActiveTileLayers() {
  const regions = mapConfig.regions;
  const selectedRegion = useSelector(selectedRegionSelector);
  const regionName = regions[selectedRegion].regionName // e.g. continental_us, etc
  const layerList = useSelector(activeLayerListSelector);
  const layers = Object.values(layerList)
    .filter((lyr) => lyr.region === regionName)
    .map((lyr) => (
      <TileLayer
        key={lyr.id}
        url={lyr.url}
        opacity={lyr.opacity}
        pane={'overlayPane'}
        maxNativeZoom={lyr.maxNativeZoom}
      />
    ));

  return (
    layers
  );
}
