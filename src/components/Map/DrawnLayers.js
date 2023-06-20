import React from 'react';
import { FeatureGroup } from 'react-leaflet';
import PropTypes from 'prop-types';
import LeafletDrawTools from './LeafletDrawTools';

export default function DrawnLayers(props) {
  const {
    map,
    leafletFeatureGroupRef,
    bufferCheckbox,
    setDrawAreaDisabled,
    setTooLargeLayerOpen
  } = props;
  return (
    <FeatureGroup ref={leafletFeatureGroupRef}>
      <LeafletDrawTools
        map={map}
        leafletFeatureGroupRef={leafletFeatureGroupRef}
        bufferCheckbox={bufferCheckbox}
        setDrawAreaDisabled={setDrawAreaDisabled}
        setTooLargeLayerOpen={setTooLargeLayerOpen}
      />
    </FeatureGroup>
  );
}

DrawnLayers.propTypes = {
  map: PropTypes.object,
  bufferCheckbox: PropTypes.bool,
  leafletFeatureGroupRef: PropTypes.object,
  setDrawAreaDisabled: PropTypes.func,
  setTooLargeLayerOpen: PropTypes.func
};
