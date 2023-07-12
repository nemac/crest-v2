import React from 'react';
import { MapContainer } from 'react-leaflet';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';

import { mapConfig } from '../../configuration/config';

const regions = mapConfig.regions;

export const StyledMapContainer = styled(MapContainer)(({ theme }) => ({
  height: 'calc(100% - 64px)',
  width: 'calc(100% - 1px)'
}));

export default function LeafletMapContainer(props) {
  const {
    children, center, zoom, innerRef
  } = props;
  // const dispatch = useDispatch();
  const extent = regions['Continental U.S'].mapProperties.extent; // conus - TODO: I hate this how can I fix this?

  return (
    <StyledMapContainer
      center={center}
      zoom={zoom}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      bounds={extent}
      closePopupOnClick={false}
      ref={innerRef}
      attributionControl={false}
      worldCopyJump={true}
    >
      <link rel="stylesheet" href="https://unpkg.com/leaflet@latest/dist/leaflet.css" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@latest/dist/leaflet.draw-src.css" />
      <link rel="stylesheet" href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css"/>
      {children}
    </StyledMapContainer>
  );
}

LeafletMapContainer.propTypes = {
  children: PropTypes.node,
  center: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired,
  innerRef: PropTypes.func
};
