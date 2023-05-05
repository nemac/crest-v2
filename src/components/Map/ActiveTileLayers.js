import React from 'react';
import { useSelector } from 'react-redux';
import { TileLayer } from 'react-leaflet';

const activeLayerListSelector = (state) => state.mapLayerList.activeLayerList;

export default function ActiveTileLayers() {
  const layerList = useSelector(activeLayerListSelector);
  const layers = Object.values(layerList).map((lyr) => (<TileLayer key={lyr.id} url={lyr.url} opacity={lyr.opacity} pane={'overlayPane'} maxNativeZoom={lyr.maxNativeZoom} />
  ));

  return (
    layers
  );
}
