import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TileLayer } from 'react-leaflet';
import { updateAttributions } from '../../reducers/mapPropertiesSlice';

const activeLayerListSelector = (state) => state.mapLayerList.activeLayerList;
const attributionsSelector = (state) => state.mapProperties.attributions;

export default function ActiveTileLayers() {
  const dispatch = useDispatch();
  const handleAttributionsChange = useCallback((currAtts, newAtts) => {
    if (currAtts.join(', ') !== newAtts.join(', ')) {
      console.log('mismatch!');
      console.log(`${newAtts} != ${currAtts}`);
      console.log('dispatching ', newAtts.join(''), ' to redux state');
      dispatch(updateAttributions(newAtts));
    }
  }, [dispatch]);
  const currentAttributions = useSelector(attributionsSelector);
  const layerList = useSelector(activeLayerListSelector);
  const layerAttributions = new Set(); // This should become redux State and read in BasemapLayer.js
  const layers = Object.values(layerList).map((lyr) => {
    layerAttributions.add(lyr.attribution);
    return (<TileLayer key={lyr.id} url={lyr.url} opacity={lyr.opacity} pane={'overlayPane'} maxNativeZoom={lyr.maxNativeZoom} />
    );
  });
  const currAttributions = [...currentAttributions].sort();
  const newAttributions = Array.from(layerAttributions).sort();

  useEffect(() => {
    handleAttributionsChange(currAttributions, newAttributions);
  }, [handleAttributionsChange, newAttributions, currAttributions]);
  return (
    // eslint-disable-next-line max-len
    layers
  );
}
