import React, { useEffect, useState } from 'react';
import * as L from 'leaflet';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import buffer from '@turf/buffer';
import * as turf from '@turf/turf';

import { zonalStatsAPI } from '../../api/ZonalStats';
import {
  toggleSketchArea,
  addNewFeatureToDrawnLayers,
  removeAllFeaturesFromDrawnLayers,
  removeAllFeaturesFromZonalStatsAreas,
  uploadedShapeFileGeoJSON,
  addSearchPlacesGeoJSON,
  incrementAreaNumber,
  addBufferLayerToList
} from '../../reducers/mapPropertiesSlice';
import { setEmptyState } from '../../reducers/analyzeAreaSlice';

const sketchAreaSelector = (state) => state.mapProperties.sketchArea;
const selectedRegionSelector = (state) => state.selectedRegion.value;
const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;
const uploadedShapeFileSelector = (state) => state.mapProperties.uploadedShapeFileGeoJSON;
const searchPlacesFileSelector = (state) => state.mapProperties.searchPlacesFileGeoJSON;

const areaNumberSelector = (state) => state.mapProperties.areaNumber;

export default function LeafletDrawTools(props) {
  const {
    bufferCheckbox,
    leafletFeatureGroupRef,
    setDrawAreaDisabled,
    setTooLargeLayerOpen,
    setListOfDrawnLayers,
    setBufferGeo,
    setBufferLayersList
  } = props;
  const dispatch = useDispatch();

  const bufferSize = 1;
  const bufferUnits = 'kilometers';
  const maxPolygonAreaSize = 100000000; // 1000 sq km

  const drawToolsEnabled = useSelector(sketchAreaSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  const drawnLayersFromState = useSelector(drawnLayersSelector);
  const shapeFileGeoJSON = useSelector(uploadedShapeFileSelector);
  const searchPlacesGeoJSON = useSelector(searchPlacesFileSelector);
  const areaNumber = useSelector(areaNumberSelector);

  // BEGIN FUNCTIONS FOR DRAWN LAYERS

  const calculateAreaOfPolygon = ((layer) => {
    const geojson = layer.toGeoJSON();
    const coordinates = geojson.geometry.coordinates;
    const polygon = turf.polygon(coordinates);
    const area = turf.area(polygon);
    return area;
  });

  if (searchPlacesGeoJSON) {
    console.log('searchPlacesGeoJSON', searchPlacesGeoJSON);
    dispatch(addSearchPlacesGeoJSON(null));
  }

  // const createBufferLayer = ((layer) => {
  //   const geojson = buffer(layer.toGeoJSON(), bufferSize, { units: bufferUnits });
  //   const bufferLayer = L.geoJSON(geojson, { style: bufferStyle });
  //   return bufferLayer;
  // });

  // const enrichGeoJsonWithProperties = ((geojson, leafletId, bufferLayer, areaName) => {
  //   const enrichedGeoJSON = geojson;
  //   enrichedGeoJSON.properties = geojson.properties || {};
  //   let bufferLayerId;
  //   if (bufferLayer) {
  //     bufferLayerId = L.stamp(bufferLayer);
  //     enrichedGeoJSON.properties.bufferLayerId = bufferLayerId;
  //     enrichedGeoJSON.properties.buffer = bufferCheckbox;
  //   }
  //   const leafletIdsList = [
  //     leafletId,
  //     ...(bufferLayerId ? [bufferLayerId] : []) // conditionally add bufferLayerId if it exists
  //   ];
  //   enrichedGeoJSON.properties.leafletId = leafletId;
  //   enrichedGeoJSON.properties.leafletIds = leafletIdsList;
  //   enrichedGeoJSON.properties.areaName = areaName;
  //   enrichedGeoJSON.properties.region = selectedRegion;

  //   return enrichedGeoJSON;
  // });

  // END FUNCTIONS FOR DRAWN LAYERS

  /* This useEffect runs once on startup and is responsible for creating layers from state
     1. Copy drawn layer state to local variable and clear drawn layer and zonal stats state
     2. Iterate through each drawn layer and add it and buffer layer (if exists) to map
     3. Push new information back into drawn layer state (this is due to leaflet ids updating)
     4. Update zonal stats state information with new leaflet ids */
  // useEffect(() => {
  //   setTimeout(() => {
  //     // make a deep copy of the features from state since I was getting read only errors otherwise
  //     const features = JSON.parse(JSON.stringify(drawnLayersFromState.features));
  //     let areaNameAdjustment; // we will use this to determine what area name number we are on
  //     // make a deep copy of the features from state since I was getting read only errors otherwise
  //     dispatch(removeAllFeaturesFromDrawnLayers());
  //     dispatch(removeAllFeaturesFromZonalStatsAreas());
  //     features.forEach((feature) => {
  //       const featureCopy = feature;
  //       const areaName = featureCopy.properties.areaName;
  //       areaNameAdjustment = parseInt(areaName.split(' ')[1], 10); // should number of highest area in list
  //       let layer = L.geoJSON(feature);
  //       const layerId = L.stamp(layer);
  //       featureCopy.properties.leafletId = layerId;
  //       const leafletIdsList = [layerId];
  //       leafletFeatureGroupRef.current.addLayer(layer);
  //       layer.bindTooltip(areaName, { direction: 'center', permanent: true, className: leafletTooltips });
  //       if (feature.properties.buffer) {
  //         layer = buffer(layer.toGeoJSON(), bufferSize, { units: bufferUnits });
  //         layer = L.geoJSON(layer, { style: bufferStyle });
  //         const bufferLayerId = L.stamp(layer);
  //         featureCopy.properties.bufferLayerId = bufferLayerId;
  //         leafletIdsList.push(bufferLayerId);
  //         leafletFeatureGroupRef.current.addLayer(layer);
  //       }
  //       featureCopy.properties.leafletIds = leafletIdsList;
  //       dispatch(addNewFeatureToDrawnLayers(featureCopy));
  //       // areaNameAdjustment can be NaN due to example area names so check for that
  //       if (Number.isNaN(areaNameAdjustment)) {
  //         areaNameAdjustment = 0;
  //       }
  //       // bump area number up total length of features so no duplicate area names
  //       setAreaNumber(areaNumber + areaNameAdjustment);
  //       dispatch(setEmptyState(false));
  //     });
  //   }, 500);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []); // purposefully using empty array '[]' so it only runs once on startup

  // Watches for an uploaded shapefile and adds it as a layer to leaflet Draw feature group
  // useEffect(() => {
  //   if (!shapeFileGeoJSON) {
  //     return;
  //   }

  //   // I couldn't get areaNumberRef working like I wanted to so using a local counter instead
  //   let counter = areaNumber;
  //   const shapeFileFeatures = JSON.parse(JSON.stringify(shapeFileGeoJSON.features));
  //   shapeFileFeatures.forEach((shapeFeature, index) => {
  //     const shapeFeatureCopy = shapeFeature;
  //     const layer = L.geoJSON(shapeFeatureCopy);
  //     leafletFeatureGroupRef.current.addLayer(layer);

  //     // check if buffer checkbox is checked and if so, create a buffer using turf.js
  //     let bufferLayer;
  //     if (bufferCheckbox) {
  //       bufferLayer = createBufferLayer(layer);
  //       leafletFeatureGroupRef.current.addLayer(bufferLayer); // add buffer layer to ref
  //     }

  //     const areaName = `Area ${counter}`;
  //     const leafletId = L.stamp(layer);
  //     let geojson = layer.toGeoJSON();
  //     geojson = enrichGeoJsonWithProperties(geojson, leafletId, bufferLayer, areaName);
  //     counter += 1;
  //     setAreaNumber(counter); // so the areaNumber is in sync with the counter
  //     layer.bindTooltip(areaName, { direction: 'center', permanent: true, className: leafletTooltips });

  //     // Zonal stats requires featureGroup so we need to make a dummy featureGroup for this
  //     const dummyFeatureGroup = L.featureGroup();
  //     dummyFeatureGroup.addLayer(layer);
  //     const dummyFeatureGroupGeoJSON = dummyFeatureGroup.toGeoJSON();
  //     const zonalStatsPromise = zonalStatsAPI(dummyFeatureGroupGeoJSON, selectedRegion);

  //     // Wait for promise to complete, add returned zonal stats, and then add to redux
  //     zonalStatsPromise.then((data) => {
  //       dispatch(setEmptyState(false));
  //       data.features.forEach((feature) => {
  //         geojson.properties.zonalStatsData = feature.properties.mean; // Should only be 1 feature
  //         dispatch(addNewFeatureToDrawnLayers(geojson));
  //         setDrawAreaDisabled(false);
  //       });
  //     });
  //   });
  //   dispatch(uploadedShapeFileGeoJSON(null));
  // }, [shapeFileGeoJSON, dispatch]);

  // Watches for an area to be added from search Places and adds its layer to the draw group ref
  // useEffect(() => {
  //   if (!searchPlacesGeoJSON) {
  //     return;
  //   }
  //   // make a deep copy of the features from state since I was getting read only errors otherwise
  //   const geojsonCopy = JSON.parse(JSON.stringify(searchPlacesGeoJSON));
  //   const layer = L.geoJSON(searchPlacesGeoJSON);
  //   leafletFeatureGroupRef.current.addLayer(layer);
  //   const areaName = `Area ${areaNumber}`;
  //   const leafletId = L.stamp(layer);
  //   const geojson = enrichGeoJsonWithProperties(geojsonCopy, leafletId, null, areaName); // null is for bufferlayer
  //   setAreaNumber(areaNumber + 1);
  //   layer.bindTooltip(areaName, { direction: 'center', permanent: true, className: leafletTooltips });
  //   const dummyFeatureGroup = L.featureGroup();
  //   dummyFeatureGroup.addLayer(layer);
  //   const dummyFeatureGroupGeoJSON = dummyFeatureGroup.toGeoJSON();
  //   const zonalStatsPromise = zonalStatsAPI(dummyFeatureGroupGeoJSON, selectedRegion);
  //   zonalStatsPromise.then((data) => {
  //     dispatch(setEmptyState(false));
  //     data.features.forEach((feature) => {
  //       geojson.properties.zonalStatsData = feature.properties.mean; // Should only be 1 feature
  //       dispatch(addNewFeatureToDrawnLayers(geojson));
  //       setDrawAreaDisabled(false);
  //     });
  //   });

  //   dispatch(addSearchPlacesGeoJSON(null));
  // // eslint-disable-next-line max-len
  // }, //[searchPlacesGeoJSON, dispatch, leafletFeatureGroupRef, areaNumber, leafletTooltips, selectedRegion, setDrawAreaDisabled]);

  // function onCreated(e) {
  //   // Toggle sketch area off since new area was just created
  //   dispatch(toggleSketchArea());

  //   // Check size of polygon and remove it and return if it is too large
  //   if (calculateAreaOfPolygon(e.layer) > maxPolygonAreaSize) {
  //     setTooLargeLayerOpen(true);
  //     leafletFeatureGroupRef.current.removeLayer(e.layer);
  //     return;
  //   }

  //   // disable draw until zonal stats done below
  //   setDrawAreaDisabled(true);

  //   // check if buffer checkbox is checked and if so, create a buffer using turf.js
  //   let bufferLayer;
  //   if (bufferCheckbox) {
  //     bufferLayer = createBufferLayer(e.layer);
  //     leafletFeatureGroupRef.current.addLayer(bufferLayer); // add buffer layer to ref
  //   }

  //   // Enrich geojson with properties, bind tooltip, and choose which layer to analyze
  //   const areaName = `Area ${areaNumber}`;
  //   const leafletId = L.stamp(e.layer);
  //   let geojson = e.layer.toGeoJSON();
  //   geojson = enrichGeoJsonWithProperties(geojson, leafletId, bufferLayer, areaName);
  //   setAreaNumber(areaNumber + 1);
  //   e.layer.bindTooltip(areaName, { direction: 'center', permanent: true, className: leafletTooltips });
  //   const layerToAnalyze = bufferLayer || e.layer;

  //   // Zonal stats requires featureGroup so we need to make a dummy featureGroup for this
  //   const dummyFeatureGroup = L.featureGroup();
  //   dummyFeatureGroup.addLayer(layerToAnalyze);
  //   const dummyFeatureGroupGeoJSON = dummyFeatureGroup.toGeoJSON();
  //   const zonalStatsPromise = zonalStatsAPI(dummyFeatureGroupGeoJSON, selectedRegion);

  //   // Wait for promise to complete, add returned zonal stats, and then add to redux
  //   zonalStatsPromise.then((data) => {
  //     dispatch(setEmptyState(false));
  //     data.features.forEach((feature) => {
  //       geojson.properties.zonalStatsData = feature.properties.mean; // Should only be 1 feature
  //       dispatch(addNewFeatureToDrawnLayers(geojson));
  //       setDrawAreaDisabled(false);
  //     });
  //   });
  // }

  const addBufferLayer = (geo, ref) => {
    const buffGeo = buffer(geo, bufferSize, { units: bufferUnits });
    setBufferGeo((previous) => ({
      ...previous,
      features: [...previous.features, ...[buffGeo]]
    }));
    const bufferLayer = L.geoJSON(buffGeo, { style: { color: '#99c3ff' } });
    //ref?.current?.addLayer(bufferLayer);
    //dispatch(addBufferLayerToList(JSON.stringify(bufferLayer)));
    setBufferLayersList((previous) => [...previous, bufferLayer]);
    return buffGeo;
  };

  React.useEffect(() => {
    setListOfDrawnLayers(leafletFeatureGroupRef?.current?.getLayers());
    if (leafletFeatureGroupRef?.current?.getLayers().length === 0 && drawnLayersFromState) {
      L.geoJSON(drawnLayersFromState).eachLayer((layer) => {
        if (
          layer instanceof L.Polyline ||
          layer instanceof L.Polygon ||
          layer instanceof L.Marker
        ) {
          if (layer?.feature?.properties.radius && leafletFeatureGroupRef.current) {
            new L.Circle(layer.feature.geometry.coordinates.slice().reverse(), {
              radius: layer.feature?.properties.radius
            }).addTo(leafletFeatureGroupRef.current);
          } else {
            leafletFeatureGroupRef.current?.addLayer(layer);
          }
          setListOfDrawnLayers(leafletFeatureGroupRef?.current?.getLayers());
          addBufferLayer(layer.toGeoJSON(), leafletFeatureGroupRef);
        }
      });
    }
  }, [drawnLayersFromState, leafletFeatureGroupRef]);

  function handleOnCreate(e, ref) {
    // Toggle sketch area off since new area was just created
    dispatch(toggleSketchArea());

    // Check size of polygon and remove it and return if it is too large
    if (calculateAreaOfPolygon(e.layer) > maxPolygonAreaSize) {
      setTooLargeLayerOpen(true);
      leafletFeatureGroupRef.current.removeLayer(e.layer);
      return;
    }

    // disable draw until zonal stats done below
    setDrawAreaDisabled(true);

    const geo = e.layer.toGeoJSON();
    let buffGeo;
    if (bufferCheckbox) {
      buffGeo = addBufferLayer(geo, ref);
    }
    geo.properties = geo.properties || {};
    geo.properties.areaName = `Area ${areaNumber}`;
    geo.properties.region = selectedRegion;
    const layerToAnalyze = L.geoJSON(buffGeo) || e.layer;

    // Zonal stats requires featureGroup so we need to make a dummy featureGroup for this
    const featureGroupGeoJSON = L.featureGroup().addLayer(layerToAnalyze).toGeoJSON();
    const zonalStatsPromise = zonalStatsAPI(featureGroupGeoJSON, selectedRegion);

    // Wait for promise to complete, add returned zonal stats, and then add to redux
    zonalStatsPromise.then((data) => {
      dispatch(setEmptyState(false));
      data.features.forEach((feature) => { // Should only be 1 feature
        geo.properties.zonalStatsData = feature.properties.mean;
        dispatch(addNewFeatureToDrawnLayers(geo));
        dispatch(incrementAreaNumber());
        setDrawAreaDisabled(false);
      });
    });
  }
  return (
    <FeatureGroup ref={leafletFeatureGroupRef}>
      {drawToolsEnabled && (
        <EditControl
          key={`edit-control-${areaNumber}`}
          position='topleft'
          onCreated={(e) => { handleOnCreate(e, leafletFeatureGroupRef); }}
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
            remove: false
          }}
        />
      )}
    </FeatureGroup>
  );
}

LeafletDrawTools.propTypes = {
  bufferCheckbox: PropTypes.bool,
  leafletFeatureGroupRef: PropTypes.object,
  setDrawAreaDisabled: PropTypes.func,
  setTooLargeLayerOpen: PropTypes.func,
  setListOfDrawnLayers: PropTypes.func,
  setBufferGeo: PropTypes.func
};
