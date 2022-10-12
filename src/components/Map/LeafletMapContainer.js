import React from 'react';
import { MapContainer } from 'react-leaflet';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import LeafletDrawTools from './LeafletDrawTools';
import { mapConfig } from '../../configuration/config';

const useStyles = makeStyles((theme) => ({
  leafletMapContainer: {
    height: 'calc(100% - 64px)',
    width: 'calc(100% - 1px)'
  },
  drawTools: {
    visibility: 'hidden'
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
    <MapContainer className = {classes.leafletMapContainer}
      center={center}
      zoom={zoom}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      bounds={extent}
      closePopupOnClick={false}
      ref={innerRef}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""/>
      <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@latest/dist/leaflet.draw-src.css" />
      <LeafletDrawTools/>
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
