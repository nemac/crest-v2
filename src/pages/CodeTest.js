/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON, Tooltip, FeatureGroup, useMapEvents, Circle } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import * as L from 'leaflet';

const DrawItems = (props) => {
  const { ready } = props;
  const [drawnItems, setDrawnItems] = useState(() => {
    const data = localStorage.getItem('drawnItems');
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    setDrawnItems(drawnItems);
  }, [ready, drawnItems]);

  const handleDrawCreate = (e) => {
    const layer = e.layer;
    const newItem = { geoJson: layer.toGeoJSON(), center: layer.getBounds().getCenter() };
    setDrawnItems(prevItems => {
      const updatedItems = [...prevItems, newItem];
      localStorage.setItem('drawnItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const drawOptions = {
    rectangle: false,
    circle: false,
    circlemarker: false,
    marker: false,
    polyline: false
  };

  return (
    <FeatureGroup>
      <EditControl position="topleft" onCreated={handleDrawCreate} draw={drawOptions} />
      {ready ? (drawnItems.map((item, index) => (
        <GeoJSON key={index} data={item.geoJson}>
          <Tooltip className="red-tooltip" permanent direction="center" opacity={1} position={item.center} >
            Hi, I am a Tooltip!
          </Tooltip>
      </GeoJSON>
      ))) : ( <div></div> )}
    </FeatureGroup>
  );
};

const App = () => {
  const [map, setMap] = useState(null);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    if (map) {
      map.flyTo([51.51, -0.11], 9)
    }
  }, [map]);

  return (
    <React.Fragment>
      <MapContainer ref={setMap} center={[51.51, -0.12]} zoom={9} style={{ height: '100vh', width: '100%' }}>
        <Circle
          center={[51.51, -0.08]}
          radius={100}
        />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <DrawItems ready={ready} />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@latest/dist/leaflet.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@latest/dist/leaflet.draw-src.css" />
        <link rel="stylesheet" href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css"/>
      </MapContainer>
    </React.Fragment>
  );
};

export default App;
