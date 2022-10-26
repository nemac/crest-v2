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

import { featureGroup } from 'leaflet';
import React from 'react';
import { EditControl } from 'react-leaflet-draw';
import { useDispatch, useSelector } from 'react-redux';

import { addNewFeatureToAnalyzedAreas } from '../../reducers/mapPropertiesSlice';

export default function LeafletDrawTools(props) {
  const dispatch = useDispatch();
  const sketchAreaSelector = (state) => state.mapProperties.sketchArea;
  const drawToolsEnabled = useSelector(sketchAreaSelector);
  const featureGroups = featureGroup();

  const onCreated = (e) => {
    // console.log(e);
    featureGroups.addLayer(e.layer);
    const geoJsonFeatureGroups = featureGroups.toGeoJSON();
    geoJsonFeatureGroups.features.forEach(
      (feature) => dispatch(addNewFeatureToAnalyzedAreas(feature))
    );
  };

  if (!drawToolsEnabled) {
    return null;
  }

  if (drawToolsEnabled) {
    return (
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
          edit: false,
          remove: false,
          featureGroup: featureGroups
        }}
      />
    );
  }
}
