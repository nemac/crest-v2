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

import { zonalStatsAPI } from '../../api/ZonalStats';
import { retreiveShapeFiles } from '../../api/retreiveShapeFile';
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
const uploadedShapeFileSelector = (state) => state.mapProperties.uploadedShapeFile;

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
  const [areaNumber, setAreaNumber] = useState(1);
  const dispatch = useDispatch();
  const drawToolsEnabled = useSelector(sketchAreaSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  const drawnLayersFromState = useSelector(drawnLayersSelector);
  const zonalStatsAreas = useSelector(zonalStatsAreasSelector);
  const uploadedShapeFile = useSelector(uploadedShapeFileSelector);
  const bufferSize = 1;
  const bufferUnits = 'kilometers';
  const bufferStyle = {
    color: '#99c3ff',
    '&:hover': {
      color: '#ffc107',
      'stroke-width': 5
    }
  };

  /* This useEffect runs once on startup and is responsible for creating layers from state
     1. Copy drawn layer state to local variable and clear drawn layer and zonal stats state
     2. Iterate through each drawn layer and add it and buffer layer (if exists) to map
     3. Push new information back into drawn layer state (this is due to leaflet ids updating)
     4. Update zonal stats state information with new leaflet ids */
  useEffect(() => {
    const features = drawnLayersFromState.features;
    let areaNameAdjustment; // we will use this to determine what area name number we are on
    // doing this parse and stringify so I can have a modifiable object
    const areasFeatures = JSON.parse(JSON.stringify(zonalStatsAreas.features));
    dispatch(removeAllFeaturesFromDrawnLayers());
    dispatch(removeAllFeaturesFromZonalStatsAreas());
    features.forEach((feature, index) => {
      const featureCopy = feature;
      const areaName = featureCopy.properties.areaName;
      areaNameAdjustment = parseInt(areaName.split(' ')[1], 10); // should number of highest area in list
      const zonalStatsFeature = areasFeatures[index]; // HUGE assumption that indexes match
      let layer = L.geoJSON(feature);
      const layerId = L.stamp(layer);
      featureCopy.properties.leafletId = layerId;
      const leafletIdsList = [layerId];
      layer.bindTooltip(areaName, { direction: 'center', permanent: true, className: classes.leafletTooltips });
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
      // bump area number up total length of features so no duplicate area names
      setAreaNumber(areaNumber + areaNameAdjustment);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // purposefully using empty array '[]' so it only runs once on startup

  // Watches for an uploaded shapefile and adds it as a layer to leaflet Draw feature group
  useEffect(() => {
    if (!uploadedShapeFile) {
      return;
    }
    const retreiveShapeFilesPromise = retreiveShapeFiles(uploadedShapeFile);
    retreiveShapeFilesPromise.then((data) => {
      console.log(data);
    });
  }, [uploadedShapeFile]);

  function onCreated(e) {
    // toggle sketch area off since new area was just created
    dispatch(toggleSketchArea());
    // Doing a quick check up top to make sure that the newly drawn polygon isn't too big
    const drawnLayerBounds = e.layer.getBounds();
    const latDiff = Math.abs(drawnLayerBounds._southWest.lat - drawnLayerBounds._northEast.lat);
    const lngDiff = Math.abs(drawnLayerBounds._southWest.lng - drawnLayerBounds._northEast.lng);
    if ((latDiff || lngDiff >= 3) || (latDiff >= 2 && lngDiff >= 2)) {
      setTooLargeLayerOpen(true);
      leafletDrawFeatureGroupRef.current.removeLayer(e.layer);
      return;
    }

    setDrawAreaDisabled(true); // disable draw until zonal stats done below
    const areaName = `Area ${areaNumber}`;
    const drawnLayer = e.layer;
    drawnLayer.bindTooltip(areaName, { direction: 'center', permanent: true, className: classes.leafletTooltips });
    let layerToAnalyze = e.layer;
    const leafletIdsList = [L.stamp(drawnLayer)];
    const drawnLayerGeoJSON = drawnLayer.toGeoJSON();
    drawnLayerGeoJSON.properties.leafletId = L.stamp(drawnLayer);
    drawnLayerGeoJSON.properties.areaName = areaName;
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
  setDrawAreaDisabled: PropTypes.func,
  setTooLargeLayerOpen: PropTypes.func
};
