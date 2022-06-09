import React, { useState }from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { mapConfig } from '../../configuration/config';

const useStyles = makeStyles((theme) => ({
  leafletMapContainer: {
    height: 'calc(100% - 100px)', // TODO: this will need to be adjusted when we move the region selector to the map layer list (will 64px height of map actions)
    width: 'calc(100% - 1px)'
  },
}));

const regions = mapConfig.regions;

// selector named functions for lint rules makes it easier to re-use if needed.
const selectedRegionSelector = (state) => state.selectedRegion.value;
const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedCenterSelector = (state) => state.mapProperties.center;

export default function LeafletMapContainer(props) {
  const { children } = props;
  const classes = useStyles();
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(useSelector((state) => state.mapProperties.center))
  //const dispatch = useDispatch()
  const selectedRegion = useSelector((state) => state.selectedRegion.value)
  const zoom = useSelector((state) => state.mapProperties.zoom)
  const extent = regions['Continental U.S'].mapProperties.extent // conus - TODO: I hate this how can I fix this?

  return (
    <MapContainer className = {classes.leafletMapContainer}
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      bounds={extent}
      whenCreated={setMap}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""/>
      <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@latest/dist/leaflet.draw-src.css" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  )
}

LeafletMapContainer.propTypes = {
  children: PropTypes.node
}