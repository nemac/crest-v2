import React from 'react';
import { useSelector } from 'react-redux';
import { TileLayer } from 'react-leaflet';

export default function ActiveTileLayers() {
  const activeLayerListSelector = (state) => state.mapLayerList.activeLayerList;
  const layerList = useSelector(activeLayerListSelector);

  return (
    // eslint-disable-next-line max-len
    Object.values(layerList).map((lyr) => <TileLayer key={lyr.id} url={lyr.url} attribution={lyr.attribution} opacity={lyr.opacity} maxNativeZoom={lyr.maxNativeZoom}/>)
  );
}
