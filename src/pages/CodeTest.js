import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Polygon, Tooltip } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useSelector } from 'react-redux';

const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;
const selectedCenterSelector = (state) => state.mapProperties.center;

const multiPolygon = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07],
  ],
]

const poly = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
  ]
]

console.log(multiPolygon);

function App() {
  const drawnLayersFromState = useSelector(drawnLayersSelector);
  const center = useSelector(selectedCenterSelector, () => true);
  const [polyList, setPolyList] = useState([]);

  useEffect(() => {
    const features = JSON.parse(JSON.stringify(drawnLayersFromState.features));
    const multiPolyList = [];
    features.forEach((feature) => {
      const reverseCoordinates = [];
      feature.geometry.coordinates[0].forEach((coords) => {
        reverseCoordinates.push(coords.reverse());
      });
      multiPolyList.push(reverseCoordinates);
    });
    setPolyList(multiPolyList);
    console.log(polyList);
  }, [drawnLayersFromState]);

  return (
    <MapContainer center={[51.51, -0.05]} zoom={12} style={{ height: "100vh", width: "100%" }}>
      {multiPolygon.map((coords) => (
        <Polygon key={coords} positions={coords}>
          <Tooltip opacity={1} direction="center">
            Hi I am a tooltip!!!
          </Tooltip>
         </Polygon>
      ))};
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@latest/dist/leaflet.draw-src.css" />
      <FeatureGroup>
        <EditControl
          position='topleft'
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
            polygon: {
              allowIntersection: false // Prevent user from drawing self-intersecting polygons
            }
          }}
        />
      </FeatureGroup>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default App;
