import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { MapContainer, TileLayer} from 'react-leaflet';
import { mapConfig } from '../configuration/config';

const useStyles = makeStyles((theme) => ({
  leafletContainer: {
    height: '600px',
    width:'60%'
  }
}));

const regions = mapConfig.regions;

function RegionSelect({ map }) {
  const handleRegionChange = (e) => {
    map.setView(regions[e.target.value].mapProperties.center, regions[e.target.value].mapProperties.zoom)
  }
  return (
    <select onChange={e => handleRegionChange(e)}>
      {
        regions.map((element, key) => <option key={key} value={key}>{element.label}</option>)
      };
    </select>
  )
}

export default function LeafletMap() {
  const classes = useStyles();

  var center = [ -14.314288224896458, -169.71405029296875]
  var extent = [ -170.88, -14.71, -168.92, -13.90]
  var zoom = 9
  const [map, setMap] = useState(null);
  const displayMap = useMemo(
    () => (
      <MapContainer className = {classes.leafletContainer} 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        bounds={extent}
        whenCreated={setMap}
      >
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""/>
        <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@latest/dist/leaflet.draw-src.css" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    ),
    [],
  )
  return (
    <div>
      {map ? <RegionSelect map={map} />: null}
      {displayMap}
    </div>
  )
}