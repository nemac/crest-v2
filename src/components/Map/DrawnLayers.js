import React from 'react';
import { FeatureGroup, GeoJSON, Tooltip } from 'react-leaflet';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import LeafletDrawTools from './LeafletDrawTools';

const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;

export default function DrawnLayers(props) {
  const {
    map,
    leafletFeatureGroupRef,
    bufferCheckbox,
    setDrawAreaDisabled,
    setTooLargeLayerOpen
  } = props;
  const drawnLayersFromState = useSelector(drawnLayersSelector);

  return (
    <FeatureGroup ref={leafletFeatureGroupRef}>
      <LeafletDrawTools
        map={map}
        leafletFeatureGroupRef={leafletFeatureGroupRef}
        bufferCheckbox={bufferCheckbox}
        setDrawAreaDisabled={setDrawAreaDisabled}
        setTooLargeLayerOpen={setTooLargeLayerOpen}
      />
      { drawnLayersFromState.features?.map((item, index) => (
        <React.Fragment key={item.properties.leafletId}>
          <GeoJSON data={item.geometry}>
            <Tooltip className="red-tooltip" permanent direction="center" opacity={1} >
              {item.properties.areaName}
            </Tooltip>
          </GeoJSON>
          <GeoJSON data={item.properties.bufferGeoJSON.geometry}/>
        </React.Fragment>
      ))}
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
