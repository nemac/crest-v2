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
import * as L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import buffer from '@turf/buffer';

import { zonalStatsAPI } from '../../api/ZonalStats';
import { addNewFeatureToAnalyzedAreas, toggleSketchArea } from '../../reducers/mapPropertiesSlice';

export default function LeafletDrawTools(props) {
  const { bufferCheckbox, leafletDrawFeatureGroupRef } = props;
  const dispatch = useDispatch();
  const sketchAreaSelector = (state) => state.mapProperties.sketchArea;
  const selectedRegionSelector = (state) => state.selectedRegion.value;
  const selectedRegion = useSelector(selectedRegionSelector);
  const drawToolsEnabled = useSelector(sketchAreaSelector);

  function onCreated(e) {
    // toggle sketch area off since new area was just created
    dispatch(toggleSketchArea());
    let layerToAdd = e.layer;
    // check if buffer checkbox is checked and if so, create a 1 km buffer using turf.js
    if (bufferCheckbox) {
      layerToAdd = buffer(layerToAdd.toGeoJSON(), 1, { units: 'kilometers' });
      layerToAdd = L.geoJSON(layerToAdd);
      leafletDrawFeatureGroupRef.current.addLayer(layerToAdd);
    } else { // otherwise just add the layer to the leaflet draw tools feature group
      leafletDrawFeatureGroupRef.current.addLayer(layerToAdd);
    }

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
        tempFeature.properties.id = e.layer._leaflet_id;
        tempFeature.properties.mean = data.features[0].properties.mean;
        dispatch(addNewFeatureToAnalyzedAreas(tempFeature));
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
  leafletDrawFeatureGroupRef: PropTypes.object
};
