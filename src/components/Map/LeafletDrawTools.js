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
import { makeStyles } from '@mui/styles';
import * as L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import buffer from '@turf/buffer';
import * as turf from '@turf/turf';

import { zonalStatsAPI } from '../../api/ZonalStats';
import {
  addNewFeatureToZonalStatsAreas,
  toggleSketchArea,
  addNewFeatureToDrawnLayers,
  removeAllFeaturesFromDrawnLayers,
  removeAllFeaturesFromZonalStatsAreas,
  uploadedShapeFileGeoJSON
} from '../../reducers/mapPropertiesSlice';

const sketchAreaSelector = (state) => state.mapProperties.sketchArea;
const selectedRegionSelector = (state) => state.selectedRegion.value;
const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;
const zonalStatsAreasSelector = (state) => state.mapProperties.zonalStatsAreas;
const uploadedShapeFileSelector = (state) => state.mapProperties.uploadedShapeFileGeoJSON;

const useStyles = makeStyles((theme) => ({
  // Feels a bit hacky that I had to tack !important on to everything to get the override
  leafletTooltips: {
    backgroundColor: 'transparent !important',
    border: 'transparent !important',
    color: '#FFFFFF !important',
    'box-shadow': 'none !important',
    fontSize: '1.5em',
    fontWeight: 700
  }
}));

export default function LeafletDrawTools(props) {
  const {
    bufferCheckbox,
    leafletDrawFeatureGroupRef,
    setDrawAreaDisabled,
    setTooLargeLayerOpen
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const bufferSize = 1;
  const bufferUnits = 'kilometers';
  const bufferStyle = {
    color: '#99c3ff',
    '&:hover': {
      color: '#ffc107',
      'stroke-width': 5
    }
  };
  const maxPolygonAreaSize = 100000000; // 1000 sq km
  const [areaNumber, setAreaNumber] = useState(1);

  const drawToolsEnabled = useSelector(sketchAreaSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  const drawnLayersFromState = useSelector(drawnLayersSelector);
  const zonalStatsAreas = useSelector(zonalStatsAreasSelector);
  const shapeFileGeoJSON = useSelector(uploadedShapeFileSelector);

  // BEGIN FUNCTIONS FOR DRAWN LAYERS

  const calculateAreaOfPolygon = ((geojson) => {
    const coordinates = geojson.geometry.coordinates;
    const polygon = turf.polygon(coordinates);
    const area = turf.area(polygon);
    return area;
  });

  const createBufferLayer = ((layer) => {
    const geojson = buffer(layer.toGeoJSON(), bufferSize, { units: bufferUnits });
    const bufferLayer = L.geoJSON(geojson, { style: bufferStyle });
    return bufferLayer;
  });

  // END FUNCTIONS FOR DRAWN LAYERS

  /* This useEffect runs once on startup and is responsible for creating layers from state
     1. Copy drawn layer state to local variable and clear drawn layer and zonal stats state
     2. Iterate through each drawn layer and add it and buffer layer (if exists) to map
     3. Push new information back into drawn layer state (this is due to leaflet ids updating)
     4. Update zonal stats state information with new leaflet ids */
  useEffect(() => {
    // make a deep copy of the features from state since I was getting read only errors otherwise
    const features = JSON.parse(JSON.stringify(drawnLayersFromState.features));
    let areaNameAdjustment; // we will use this to determine what area name number we are on
    // make a deep copy of the features from state since I was getting read only errors otherwise
    dispatch(removeAllFeaturesFromDrawnLayers());
    dispatch(removeAllFeaturesFromZonalStatsAreas());
    features.forEach((feature, index) => {
      const featureCopy = feature;
      const areaName = featureCopy.properties.areaName;
      areaNameAdjustment = parseInt(areaName.split(' ')[1], 10); // should number of highest area in list
      let layer = L.geoJSON(feature);
      const layerId = L.stamp(layer);
      featureCopy.properties.leafletId = layerId;
      const leafletIdsList = [layerId];
      leafletDrawFeatureGroupRef.current.addLayer(layer);
      layer.bindTooltip(areaName, { direction: 'center', permanent: true, className: classes.leafletTooltips });
      if (feature.properties.buffer) {
        layer = buffer(layer.toGeoJSON(), bufferSize, { units: bufferUnits });
        layer = L.geoJSON(layer, { style: bufferStyle });
        const bufferLayerId = L.stamp(layer);
        featureCopy.properties.bufferLayerId = bufferLayerId;
        leafletIdsList.push(bufferLayerId);
        leafletDrawFeatureGroupRef.current.addLayer(layer);
      }
      featureCopy.properties.leafletIds = leafletIdsList;
      dispatch(addNewFeatureToDrawnLayers(featureCopy));
      // bump area number up total length of features so no duplicate area names
      setAreaNumber(areaNumber + areaNameAdjustment);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // purposefully using empty array '[]' so it only runs once on startup

  // Watches for an uploaded shapefile and adds it as a layer to leaflet Draw feature group
  useEffect(() => {
    if (!shapeFileGeoJSON) {
      return;
    }
    console.log('useEffect in leaflet draw tools shape file');
    console.log(shapeFileGeoJSON);
    const features = JSON.parse(JSON.stringify(shapeFileGeoJSON.features));
    features.forEach((feature, index) => {
      const featureCopy = feature;
      const layer = L.geoJSON(featureCopy);
      leafletDrawFeatureGroupRef.current.addLayer(layer);
    });
    dispatch(uploadedShapeFileGeoJSON(null));
  }, [shapeFileGeoJSON, dispatch]);



  function onCreated(e) {
    // Toggle sketch area off since new area was just created
    dispatch(toggleSketchArea());

    const geojson = e.layer.toGeoJSON();
    // Check size of polygon and return if it is too large
    if (calculateAreaOfPolygon(geojson) > maxPolygonAreaSize) {
      setTooLargeLayerOpen(true);
      leafletDrawFeatureGroupRef.current.removeLayer(e.layer);
      return;
    }

    setDrawAreaDisabled(true); // disable draw until zonal stats done below

    // Create variables, attach necessary properties for state, and bind tooltip
    let bufferLayer;
    const areaName = `Area ${areaNumber}`;
    const leafletId = L.stamp(e.layer);
    const leafletIdsList = [leafletId];
    geojson.properties.leafletId = leafletId;
    geojson.properties.areaName = areaName;
    geojson.properties.buffer = bufferCheckbox;
    geojson.properties.region = selectedRegion;
    e.layer.bindTooltip(areaName, { direction: 'center', permanent: true, className: classes.leafletTooltips });

    // check if buffer checkbox is checked and if so, create a buffer using turf.js
    if (bufferCheckbox) {
      bufferLayer = createBufferLayer(e.layer);
      const bufferLayerId = L.stamp(bufferLayer);
      geojson.properties.bufferLayerId = bufferLayerId;
      leafletIdsList.push(bufferLayerId);
      leafletDrawFeatureGroupRef.current.addLayer(bufferLayer); // add buffer layer to ref
    }

    const layerToAnalyze = bufferLayer || e.layer;

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
        geojson.properties.zonalStatsData = data.features[0].properties.mean;
        geojson.properties.leafletIds = leafletIdsList;
        dispatch(addNewFeatureToDrawnLayers(geojson));
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
  setDrawAreaDisabled: PropTypes.func,
  setTooLargeLayerOpen: PropTypes.func
};
