import React from 'react';
import { makeStyles } from '@mui/styles';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const useStyles = makeStyles((theme) => ({
  leafletContainer: {
    height: '400px',
    width:'80%'
  }
}));

export default function Leaflet() {
  const classes = useStyles();
  return (
    <MapContainer className = {classes.leafletContainer} center={[35.5951, -82.5515]} zoom={13} scrollWheelZoom={false}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}