/*
Purpose
  the actions when a user is sketching/drawing an area
  we may need to add child for the drawing actions which include:
    - finish
    - delete last point
    - cancel

  is a leaflet button so needs access to leaflet object can be a challenge in React

Child Components
  - map.js

Libs
  - leaflet
  - leaflet draw

API
  - New api create a saved state JSON object with a unique id to share

State needed
  - zonal stat GEOJSON returned from API

Props
  - Not sure yet
*/

import React from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useSelector } from 'react-redux';

export default function LeafletDrawTools(props) {
  const sketchAreaSelector = (state) => state.mapProperties.sketchArea;
  const drawToolsEnabled = useSelector(sketchAreaSelector);

  const onCreated = () => {
    // eslint-disable-next-line no-console
    console.log('im created!');
  };

  if (!drawToolsEnabled) {
    return null;
  }

  if (drawToolsEnabled) {
    return (
      <FeatureGroup>
        <EditControl
          position='topleft'
          onCreated={onCreated}
          draw={{
            polyline: false,
            polygon: true,
            rectangle: false,
            circle: false,
            marker: false,
            circlemarker: false
          }}
          edit={{
            edit: false
          }}
        />
      </FeatureGroup>
    );
  }
}
