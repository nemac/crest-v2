import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { MapContainer, TileLayer, Circle, FeatureGroup } from 'react-leaflet';

const useStyles = makeStyles((theme) => ({
  leafletContainer: {
    height: '400px',
    width:'80%'
  }
}));

export default function LeafletMap() {
  const centerPosition = [35.5951, -82.5515];
  const classes = useStyles();
  return (
    <MapContainer className = {classes.leafletContainer} center={centerPosition} zoom={13} scrollWheelZoom={true}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""/>
      <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@latest/dist/leaflet.draw-src.css" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}