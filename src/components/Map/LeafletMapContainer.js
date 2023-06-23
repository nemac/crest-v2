import React from 'react';
import { MapContainer } from 'react-leaflet';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import { mapConfig } from '../../configuration/config';

const useStyles = makeStyles((theme) => ({
  leafletMapContainer: {
    height: 'calc(100% - 64px)',
    width: 'calc(100% - 1px)'
  }
}));

const regions = mapConfig.regions;

export default function LeafletMapContainer(props) {
  const {
    children, center, zoom, innerRef
  } = props;
  // const dispatch = useDispatch();
  const classes = useStyles();
  const extent = regions['Continental U.S'].mapProperties.extent; // conus - TODO: I hate this how can I fix this?

  return (
    <MapContainer
      className={classes.leafletMapContainer}
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
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@latest/dist/leaflet.draw-src.css" />
      {children}
    </MapContainer>
  );
}

LeafletMapContainer.propTypes = {
  children: PropTypes.node,
  center: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired,
  innerRef: PropTypes.func
};
