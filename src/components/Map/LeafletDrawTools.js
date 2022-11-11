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

import { featureGroup, L } from 'leaflet';
import React from 'react';
import { EditControl } from 'react-leaflet-draw';
import { useDispatch, useSelector } from 'react-redux';

import { zonalStatsAPI } from '../../api/ZonalStats';
import { addNewFeatureToAnalyzedAreas, toggleSketchArea } from '../../reducers/mapPropertiesSlice';

export default function LeafletDrawTools(props) {
  const dispatch = useDispatch();
  const sketchAreaSelector = (state) => state.mapProperties.sketchArea;
  const selectedRegionSelector = (state) => state.selectedRegion.value;
  const selectedRegion = useSelector(selectedRegionSelector);
  const drawToolsEnabled = useSelector(sketchAreaSelector);
  const featureGroups = featureGroup();

  function onCreated(e) {
    // TODO: Should this be a hardcoded false or is toggle okay?
    dispatch(toggleSketchArea());
    // const featureGroupie = props.featureGroupRef.current;
    // featureGroupie.removeLayer(e.layer._leaflet_id);

    // // Add layer to feature group, convert to geojson, and call zonal stats
    featureGroups.addLayer(e.layer);
    const geojson = featureGroups.toGeoJSON();
    const zonalStatsPromise = zonalStatsAPI(geojson, selectedRegion);

    // Wait for promise to complete, enrich with id and mean, and then add polygon to redux
    zonalStatsPromise.then((data) => {
      const meanData = data.features[0].properties.mean;
      console.log(meanData);
      console.log('promise has completed: hubs: ' + meanData.hubs + ' exposure: ' + meanData.exposure 
      + ' threat: ' + meanData.threat + ' asset: ' + meanData.asset + ' wildlife: ' + meanData.wildlife);
      // add created polygon to redux/local storage using geojson from before
      geojson.features.forEach((feature) => {
        // make copy of feature and enrich it with leaflet id and mean results from zonal stats
        const tempFeature = feature;
        tempFeature.properties.id = e.layer._leaflet_id;
        tempFeature.properties.mean = data.features[0].properties.mean;
        dispatch(addNewFeatureToAnalyzedAreas(tempFeature));
      });
    });

    // // Removing layer so featureGroups does not just keep building up with more and more layers
    featureGroups.removeLayer(e.layer);
  }

  const onDeleted = (e) => {
    // eslint-disable-next-line no-console
    console.log(e);
    // eslint-disable-next-line no-console
    console.log('deleted!');
  };

  if (!drawToolsEnabled) {
    return null;
  }

  if (drawToolsEnabled) {
    return (
      <EditControl
        position='topleft'
        onCreated={onCreated}
        onDeleted={onDeleted}
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
          remove: true,
          featureGroup: featureGroups
        }}
      />
    );
  }
}
