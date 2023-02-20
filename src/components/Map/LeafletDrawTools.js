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

import React, { useState } from 'react';
import * as L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import buffer from '@turf/buffer';

import { zonalStatsAPI } from '../../api/ZonalStats';
import {
  addNewFeatureToAnalyzedAreas,
  toggleSketchArea,
  addNewFeatureToDrawnLayers
} from '../../reducers/mapPropertiesSlice';

export default function LeafletDrawTools(props) {
  const {
    bufferCheckbox,
    leafletDrawFeatureGroupRef,
    setChartRemoveButtonId,
    setDrawAreaDisabled
  } = props;
  const [areaNumber, setAreaNumber] = useState(1);
  const dispatch = useDispatch();
  const sketchAreaSelector = (state) => state.mapProperties.sketchArea;
  const selectedRegionSelector = (state) => state.selectedRegion.value;
  // const featureSelector = (state) => state.mapProperties.analyzedAreas;
  const drawToolsEnabled = useSelector(sketchAreaSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  // const selectedFeature = useSelector(featureSelector);

  function onCreated(e) {
    setDrawAreaDisabled(true); // disable draw until zonal stats done below
    // toggle sketch area off since new area was just created
    dispatch(toggleSketchArea());
    // grab layer id and push it to the remove button id list
    const drawnLayer = e.layer;
    const drawnLayerId = L.stamp(drawnLayer);
    const drawnLayerGeoJSON = drawnLayer.toGeoJSON();
    drawnLayerGeoJSON.properties.id = drawnLayerId;
    dispatch(addNewFeatureToDrawnLayers(drawnLayerGeoJSON)); // push drawn layer to redux
    let bufferLayer;
    let bufferLayerId;
    let bufferLayerGeoJSON;
    // check if buffer checkbox is checked and if so, create a 1 km buffer using turf.js
    if (bufferCheckbox) {
      bufferLayerGeoJSON = buffer(drawnLayer.toGeoJSON(), 1, { units: 'kilometers' });
      bufferLayer = L.geoJSON(bufferLayerGeoJSON);
      bufferLayerId = L.stamp(bufferLayer);
      bufferLayerGeoJSON.properties.id = bufferLayerId;
      dispatch(addNewFeatureToDrawnLayers(bufferLayerGeoJSON)); // push buffer layer to redux
      setChartRemoveButtonId([{ id: bufferLayerId }, { id: drawnLayerId }]);
      leafletDrawFeatureGroupRef.current.addLayer(bufferLayer);
    } else {
      setChartRemoveButtonId([{ id: drawnLayerId }]);
    }

    // Determine which layer needs to be analyzed in zonal stats below
    const layerToAdd = bufferLayer || drawnLayer;
    const layerToAddId = bufferLayerId || drawnLayerId;

    // Create dummy featureGroup, add to geojson, and call zonal stats.
    // Zonal stats requires featureGroup so we need to make a dummy featureGroup for this
    const dummyFeatureGroup = L.featureGroup();
    dummyFeatureGroup.addLayer(layerToAdd);
    const geojson = dummyFeatureGroup.toGeoJSON();
    const zonalStatsPromise = zonalStatsAPI(geojson, selectedRegion);

    // Wait for promise to complete, enrich with id and mean, and then add polygon to redux
    zonalStatsPromise.then((data) => {
      // add created polygon to redux/local storage using geojson from before
      geojson.features.forEach((feature) => {
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
        tempFeature.properties.id = layerToAddId;
        tempFeature.properties.areaName = `Area ${areaNumber}`;
        tempFeature.properties.mean = data.features[0].properties.mean;
        dispatch(addNewFeatureToAnalyzedAreas(tempFeature));
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
  setChartRemoveButtonId: PropTypes.func,
  setDrawAreaDisabled: PropTypes.func
};
