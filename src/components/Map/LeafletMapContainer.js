import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';
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
const basemaps = mapConfig.basemaps;

const baseMapSelector = (state) => state.mapProperties.basemap;

export default function LeafletMapContainer(props) {
  const {
    children, center, zoom, innerRef
  } = props;
  const classes = useStyles();
  const extent = regions['Continental U.S'].mapProperties.extent; // conus - TODO: I hate this how can I fix this?
  const basemap = useSelector(baseMapSelector);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.setUrl(basemaps[basemap]);
    }
  }, [basemap]);

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
      <TileLayer ref={ref}
        attribution='&copy; {basemap} <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={basemaps[basemap]}
      />
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
