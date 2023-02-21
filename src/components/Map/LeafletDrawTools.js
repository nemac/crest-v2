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

import React, { useEffect, useState } from 'react';
import * as L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import buffer from '@turf/buffer';

import { zonalStatsAPI } from '../../api/ZonalStats';
import {
  addNewFeatureToZonalStatsAreas,
  toggleSketchArea,
  addNewFeatureToDrawnLayers,
  removeAllFeaturesFromDrawnLayers,
  removeAllFeaturesFromZonalStatsAreas
} from '../../reducers/mapPropertiesSlice';

const sketchAreaSelector = (state) => state.mapProperties.sketchArea;
const selectedRegionSelector = (state) => state.selectedRegion.value;
const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;
const zonalStatsAreasSelector = (state) => state.mapProperties.zonalStatsAreas;

export default function LeafletDrawTools(props) {
  const {
    bufferCheckbox,
    leafletDrawFeatureGroupRef,
    setDrawAreaDisabled
  } = props;
  const [areaNumber, setAreaNumber] = useState(1);
  const dispatch = useDispatch();
  const drawToolsEnabled = useSelector(sketchAreaSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  const drawnLayersFromState = useSelector(drawnLayersSelector);
  const zonalStatsAreas = useSelector(zonalStatsAreasSelector);
  const bufferSize = 1;
  const bufferUnits = 'kilometers';
  const bufferStyle = {
    color: '#99c3ff'
  }

  /* This useEffect runs once on startup and is responsible for creating layers from state
     1. Copy drawn layer state to local variable and clear drawn layer and zonal stats state
     2. Iterate through each drawn layer and add it and buffer layer (if exists) to map
     3. Push new information back into drawn layer state (this is due to leaflet ids updating)
     4. Update zonal stats state information with new leaflet ids */
  useEffect(() => {
    const features = drawnLayersFromState.features;
    // doing this parse and stringify so I can have a modifiable object
    const areasFeatures = JSON.parse(JSON.stringify(zonalStatsAreas.features));
    dispatch(removeAllFeaturesFromDrawnLayers());
    dispatch(removeAllFeaturesFromZonalStatsAreas());
    features.forEach((feature, index) => {
      const featureCopy = feature;
      const zonalStatsFeature = areasFeatures[index]; // HUGE assumption that indexes match
      let layer = L.geoJSON(feature);
      const layerId = L.stamp(layer);
      featureCopy.properties.leafletId = layerId;
      const leafletIdsList = [layerId];
      leafletDrawFeatureGroupRef.current.addLayer(layer);
      dispatch(addNewFeatureToDrawnLayers(featureCopy));
      if (feature.properties.buffer) {
        layer = buffer(layer.toGeoJSON(), bufferSize, { units: bufferUnits });
        layer = L.geoJSON(layer, { style: bufferStyle });
        const bufferLayerId = L.stamp(layer);
        leafletIdsList.push(bufferLayerId);
        leafletDrawFeatureGroupRef.current.addLayer(layer);
      }
      zonalStatsFeature.properties.leafletIds = leafletIdsList;
      dispatch(addNewFeatureToZonalStatsAreas(zonalStatsFeature));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // purposefully using empty array '[]' so it only runs once on startup

  function onCreated(e) {
    setDrawAreaDisabled(true); // disable draw until zonal stats done below
    // toggle sketch area off since new area was just created
    dispatch(toggleSketchArea());
    const drawnLayer = e.layer;
    let layerToAnalyze = e.layer;
    const leafletIdsList = [L.stamp(drawnLayer)];
    const drawnLayerGeoJSON = drawnLayer.toGeoJSON();
    drawnLayerGeoJSON.properties.leafletId = L.stamp(drawnLayer);
    drawnLayerGeoJSON.properties.areaName = `Area ${areaNumber}`;
    drawnLayerGeoJSON.properties.buffer = bufferCheckbox;
    dispatch(addNewFeatureToDrawnLayers(drawnLayerGeoJSON));

    // check if buffer checkbox is checked and if so, create a 1 km buffer using turf.js
    if (bufferCheckbox) {
      layerToAnalyze = buffer(layerToAnalyze.toGeoJSON(), bufferSize, { units: bufferUnits });
      layerToAnalyze = L.geoJSON(layerToAnalyze, { style: bufferStyle });
      const bufferLayerId = L.stamp(layerToAnalyze);
      leafletIdsList.push(bufferLayerId);
      leafletDrawFeatureGroupRef.current.addLayer(layerToAnalyze); // add buffer layer to ref
    }

    // Create dummy featureGroup, add to geojson, and call zonal stats.
    // Zonal stats requires featureGroup so we need to make a dummy featureGroup for this
    const dummyFeatureGroup = L.featureGroup();
    dummyFeatureGroup.addLayer(layerToAnalyze);
    const featureGroupGeoJSON = dummyFeatureGroup.toGeoJSON();
    const zonalStatsPromise = zonalStatsAPI(featureGroupGeoJSON, selectedRegion);

    // Wait for promise to complete, add returned zonal stats, and then add to redux
    zonalStatsPromise.then((data) => {
      featureGroupGeoJSON.features.forEach((feature) => {
        // make copy of feature and enrich it with leaflet id and mean results from zonal stats
        const tempFeature = feature;
        // TODO JEFF - YOU NEED TO REWORK THIS AREA NUMBER THING AND THE setAreaNumber below.
        // Right now area number resets to 1 on refresh and does not take into account anything
        // in storage/redux
        /* // look for most recent feature and increment based on that area number
        const mostRecentFeature = selectedFeature.features[selectedFeature.features.length - 1];
        console.log(mostRecentFeature);
        if (mostRecentFeature) {
          // areaName should be something like "Area 8" so this should return 8 and increment to 9
          const newNum = parseInt(mostRecentFeature.properties.areaName.split('Area ')[1], 10) + 1;
          setAreaNumber(newNum);
        } */
        tempFeature.properties.zonalStatsData = data.features[0].properties.mean;
        tempFeature.properties.areaName = `Area ${areaNumber}`;
        tempFeature.properties.leafletIds = leafletIdsList;
        tempFeature.properties.drawnLayerGeoJSON = drawnLayer.toGeoJSON();
        // dispatch(addNewFeatureToDrawnLayers(tempFeature));
        dispatch(addNewFeatureToZonalStatsAreas(tempFeature));
        setAreaNumber(areaNumber + 1);
        setDrawAreaDisabled(false);
      });
    });
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
          remove: true
        }}
      />
    );
  }
}

LeafletDrawTools.propTypes = {
  bufferCheckbox: PropTypes.bool,
  leafletDrawFeatureGroupRef: PropTypes.object,
  setDrawAreaDisabled: PropTypes.func
};
