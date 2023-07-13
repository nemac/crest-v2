/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON, Tooltip, FeatureGroup, useMapEvents, Circle } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import * as L from 'leaflet';
import { feature } from '@turf/turf';
import buffer from '@turf/buffer';
import * as turf from '@turf/turf';

const DrawItems = (props) => {
  const { drawnItems, setDrawnItems, featureGroupRef, geojsonRef } = props;

  const bufferStyle = {
    color: '#99c3ff',
    '&:hover': {
      color: '#ffc107',
      'stroke-width': 5
    }
  };

  const createBufferLayer = ((layer) => {
    const geojson = buffer(layer.toGeoJSON(), 5, { units: 'kilometers' });
    const bufferLayer = L.geoJSON(geojson, { style: bufferStyle });
    return bufferLayer;
  });

  const handleDrawCreate = (e) => {
    const layer = e.layer;
    // Doing this stupid thing to remove the layer because I cannot figure out how to use EditControl
    // without the feature group and I want the geojson because it is WAY easier to do
    featureGroupRef.current.removeLayer(layer);
    const bufferLayer = createBufferLayer(layer);
    //featureGroupRef.current.addLayer(bufferLayer);
    const leafletId = L.stamp(layer);
    const bufferId = L.stamp(bufferLayer);
    const newItems = [
      { id: leafletId, leafletId, bufferId, geojson: layer.toGeoJSON(), center: layer.getBounds().getCenter() },
      { id: bufferId, geojson: bufferLayer.toGeoJSON() }
    ];
    newItems.forEach((newItem) => {
      setDrawnItems(prevItems => {
        const updatedItems = [...prevItems, newItem];
        localStorage.setItem('drawnItems', JSON.stringify(updatedItems));
        return updatedItems;
      });
    });
  };

  const drawOptions = {
    rectangle: false,
    circle: false,
    circlemarker: false,
    marker: false,
    polyline: false,
    polygon: false
  };

  // useEffect(() => {
  //   console.log(drawnItems);
  // }, [featureGroupRef, drawnItems, setStater]);

  return (
    <FeatureGroup ref={featureGroupRef} >
      <EditControl position="topleft" onCreated={handleDrawCreate} draw={drawOptions} edit={{ edit: false, remove: false }} />
      { drawnItems?.map((item, index) => (
        <GeoJSON
          key={item.id}
          data={item.geojson}
          ref={geojsonRef}
        >
          { item.center &&
            <Tooltip className="red-tooltip" permanent direction="center" opacity={1} position={item.center} >
              {item.leafletId}
            </Tooltip>
          }
        </GeoJSON>
      ))}
    </FeatureGroup>
  );
};

const App = () => {
  const [map, setMap] = useState(null);
  const geojsonRef = useRef();
  const featureGroupRef = useRef();
  const [drawnItems, setDrawnItems] = useState(() => {
    const data = localStorage.getItem('drawnItems');
    return data ? JSON.parse(data) : [];
  });

  const handleRemoveDrawnItems = (gjItem) => {
    const newList = drawnItems.filter((item) => (item.id !== gjItem.id && item.id !== gjItem.bufferId));
    localStorage.setItem('drawnItems', JSON.stringify(newList));
    setDrawnItems(newList);
    // featureGroupRef?.current.removeLayer(gjItem.leafletId);
    // featureGroupRef?.current.removeLayer(gjItem.bufferId);
  };

  useEffect(() => {
    if (map) {
      map.flyTo([51.51, -0.11], 9)
    }
  }, [map]);

  return (
    <React.Fragment>
      <button
        onClick={() => {
          new L.Draw.Polygon(map, { allowIntersection: false }).enable();
        }}
      >
        DRAW
      </button>
      { drawnItems?.map((item, index) => (
          <React.Fragment key={index} >
            { item.leafletId && <button type="button" onClick={() => handleRemoveDrawnItems(item)}>
              {`Remove ${item.leafletId}`}
            </button> }
          </React.Fragment>
      ))}
      <MapContainer ref={setMap} center={[51.51, -0.12]} zoom={9} style={{ height: '80%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <DrawItems drawnItems={drawnItems} setDrawnItems={setDrawnItems} featureGroupRef={featureGroupRef} geojsonRef={geojsonRef} />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@latest/dist/leaflet.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@latest/dist/leaflet.draw-src.css" />
        <link rel="stylesheet" href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css"/>
      </MapContainer>
    </React.Fragment>
  );
};

export default App;
