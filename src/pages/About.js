import * as React from 'react';
import { Counter } from '../components/counter/Counter';
import { makeStyles } from '@mui/styles';

/*export default function About() {
  return (
    <div>
      Welcome to the About page of Crest V2
      <Counter/>
    </div>
  )
}*/

const useStyles = makeStyles((theme) => ({
  leafletContainer: {
    height: '600px',
    width:'60%'
  }
}));

import { useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet'

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

export default function About() {
  const classes = useStyles();
  return (
    <MapContainer className = {classes.leafletContainer} center={{ lat: 51.505, lng: -0.09 }} zoom={13}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  )
}