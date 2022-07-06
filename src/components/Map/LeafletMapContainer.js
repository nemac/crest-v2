import React from 'react';
import {
  MapContainer,
  TileLayer,
  FeatureGroup
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { mapConfig } from '../../configuration/config';

const useStyles = makeStyles((theme) => ({
  leafletMapContainer: {
    height: 'calc(100% - 100px)', // TODO: this will need to be adjusted when we move the region selector to the map layer list (will 64px height of map actions)
    width: 'calc(100% - 1px)'
  }
}));

const regions = mapConfig.regions;

export default function LeafletMapContainer(props) {
  const {
    children, center, zoom, whenCreated
  } = props;
  const classes = useStyles();
  const extent = regions['Continental U.S'].mapProperties.extent; // conus - TODO: I hate this how can I fix this?

  return (
    <MapContainer className = {classes.leafletMapContainer}
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      bounds={extent}
      whenCreated={whenCreated}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""/>
      <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@latest/dist/leaflet.draw-src.css" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <EditControl
          position='topright'
          draw={{
            rectangle: false,
            circle: false
          }}
        />
      </FeatureGroup>
      {children}
    </MapContainer>
  );
}

LeafletMapContainer.propTypes = {
  children: PropTypes.node,
  center: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired,
  whenCreated: PropTypes.func
};
