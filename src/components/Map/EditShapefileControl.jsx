import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import PropTypes from 'prop-types';
import * as L from 'leaflet';
import { uploadedShapeFileGeoJSON } from '../../reducers/mapPropertiesSlice';

import {
  calculateAreaOfPolygon,
  caclulatePolygonVertices,
  validPolygon
} from '../../utility/utilityFunctions';

export default function EditControlFC(props) {
  const {
    localGeo,
    setLocalGeo,
    geoToReturn,
    endIndex,
    steps,
    updateSteps,
    setUpdateSteps,
    setActiveStep,
    mapRef,
    setIsEdit
  } = props;
  const dispatch = useDispatch();

  // error thresholds
  const areaThreshold = 500;
  const verticeThreshold = 1000;

  // error messages
  const errorShapeHasToManyVertices = 'This area has too many vertices.';
  const errorShapeIsToBig = 'This area is too large.';
  const errorShapeIsToBigAndShapeHasToManyVertices = `${errorShapeHasToManyVertices} and ${errorShapeIsToBig}`;

  // fix messages
  const fixShapeHasToManyVertices = 'Edit the area.\nThe dashed red lines indicate there is an issue.\nClick on a white square (vertice) to delete it.\nDelete squares (vertices) until the dashed line turns green.\nSave the changes.';
  const fixShapeIsToBig = 'Edit the area.\nThe dashed lines are red indicating there is an issue. Move the white squares (vertices) by dragging them so the area is smaller.\nYou can also delete squares (vertices) by clicking on them to reduce the size of the area.\nThe dashed lines will turn green when the size of the area meets the size requirement.\nSave the changes.';
  const fixShapeIsToBigAndShapeHasToManyVertices = `${fixShapeHasToManyVertices} and ${fixShapeIsToBig}`;

  useEffect(() => {
    // Only trigger if we have an empty map and things to update
    if (mapRef.current?.getLayers().length === 0 && localGeo && updateSteps) {
      let count = 0; // All Layers
      let countValid = 0; // Layers we don't need to fix, send immediately
      let countInvalid = 0; // Layers we don't need to fix, send immediately
      let validBatch = { // data structure to hold good layers that don't need editing
        type: 'FeatureCollection',
        features: []
      };
        // One time only we go through the loop to sort good and bad shapes
      L.geoJSON(localGeo).eachLayer((layer) => {
        geoToReturn.current.features[count].properties.id = count;
        count += 1;
        // Create a deep copy of the feature
        const feature = JSON.parse(JSON.stringify(layer.feature));

        // Modify the copied feature
        feature.properties = feature.properties || {};
        feature.properties.id = count;
        const geo = layer.toGeoJSON();

        // If not valid, we will now push to our "steps" to work on
        if (!validPolygon(geo)) {
          countInvalid += 1;
          const areaSize = calculateAreaOfPolygon(geo) / 1000000; // SQ KM
          const numVertices = caclulatePolygonVertices(geo);
          let invalidText = '';
          let fixText = '';
          let fixStatus = '';
          let fixStatusGoal = '';
          if (areaSize > areaThreshold && numVertices > verticeThreshold) {
            invalidText = errorShapeIsToBigAndShapeHasToManyVertices;
            fixText = fixShapeIsToBigAndShapeHasToManyVertices;
            fixStatus = `The current size of the area is ${areaSize.toFixed(0)} sq km and the current number of vertices is ${numVertices.toFixed(0)}`;
            fixStatusGoal = `and the size neeeds to be less than ${areaThreshold} and the number of vertices needs to be less than ${verticeThreshold}`;
          } else if (areaSize > areaThreshold) {
            invalidText = errorShapeIsToBig;
            fixText = fixShapeIsToBig;
            fixStatus = `The current size of the area is ${areaSize.toFixed(0)} sq km`;
            fixStatusGoal = `and the size neeeds to be less than ${areaThreshold}`;
          } else if (numVertices > verticeThreshold) {
            invalidText = errorShapeHasToManyVertices;
            fixText = fixShapeHasToManyVertices;
            fixStatus = `The current number of vertices is${numVertices.toFixed(0)}`;
            fixStatusGoal = `and the number of vertices needs to be less than ${verticeThreshold}`;
          }
          steps.current?.push({
            title: `Shape ${feature.properties.id}`,
            id: feature.properties.id,
            invalidIndex: countInvalid,
            isValid: false,
            isFixed: false,
            invalidText,
            howFixedText: 'Needs to be fixed',
            fixText,
            fixStatus,
            fixStatusGoal,
            color: 'red',
            layer: layer.setStyle({ color: 'red' })
          });
        } else { // if it is valid, batch and send it when we reach our batch size
          countValid += 1;

          validBatch.features.push(geo);
          if (countValid >= count >= localGeo.features.length) {
            dispatch(uploadedShapeFileGeoJSON(validBatch));
            // after sending, we reset our valid batch to create the next batch
            validBatch = {
              type: 'FeatureCollection',
              features: []
            };
            countValid = 0; // and our counter
          }
        }
      });

      // NOW WE CAN STEP THROUGH STEPS AND RENDER TO MAP FOR THIS BAD BATCH
      endIndex.current = steps.current.length;
      endIndex.current = steps.current.length - 1;
      steps.current.forEach((invalidLayer) => {
        // not best practice do do this but need to keep things moving
        // eslint-disable-next-line no-param-reassign
        invalidLayer.layer.options.stepID = invalidLayer.id - 1;
        // eslint-disable-next-line no-param-reassign
        invalidLayer.layer.options.activeStep = steps.current.length - 1;
        if (invalidLayer.howFixedText !== 'DELETED') {
          mapRef.current?.addLayer(invalidLayer.layer.setStyle({ color: 'red' }));
        }
      });
    }
    // May not need to watch ALL of these variables, worth revisiting need them for linting issues
  }, [
    dispatch,
    endIndex,
    localGeo,
    setUpdateSteps,
    steps,
    updateSteps,
    errorShapeIsToBigAndShapeHasToManyVertices,
    fixShapeIsToBigAndShapeHasToManyVertices,
    geoToReturn,
    mapRef
  ]);

  const handleDelete = (e) => {
    // get deleted layers...
    // don't like digging into _layers, but not sure how else to get id
    setIsEdit(false);
    const deletedLayers = Object.values(e.layers._layers);
    deletedLayers.forEach((layer) => {
      const updatedFeatures = geoToReturn.current.features.filter(
        (feature) => feature.properties.id !== layer.feature.properties.id
      );
      geoToReturn.current.features = updatedFeatures;
      const indexFeature = steps.current.filter(
        (feature) => feature.id === layer.options.stepID + 1
      );
      const thisStep = steps.current[indexFeature[0].invalidIndex - 1];
      thisStep.color = 'green';
      thisStep.howFixedText = 'DELETED'; // this will keep us from re-rendering!
      thisStep.isFixed = true;
    });

    // Update localGeo for dispatch
    const newGeo = mapRef.current?.toGeoJSON();
    if (newGeo?.type === 'FeatureCollection') {
      setLocalGeo(newGeo);
    }
  };

  const handleEditVertex = (e) => {
    // get the layer
    const layer = e.poly;
    // we set active step based on the layer so that whatever shape
    // the user chooses to edit, we can skip to that step
    setActiveStep(layer.options.stepID);
    const geo = layer.toGeoJSON();
    const thisStep = steps.current[layer.options.stepID];
    let invalidText = '';
    let fixText = '';
    let fixStatus = '';
    let fixStatusGoal = '';
    // set properties for valid
    if (validPolygon(geo)) {
      layer.setStyle({ color: 'green' });
      thisStep.color = 'green';
      thisStep.isFixed = true;
      thisStep.howFixedText = 'FIXED';
    } else { // update size and make sure we have invalid properties
      layer.setStyle({ color: 'red' });
      const areaSize = calculateAreaOfPolygon(geo) / 1000000;
      const numVertices = caclulatePolygonVertices(geo);
      if (areaSize > areaThreshold && numVertices > verticeThreshold) {
        invalidText = errorShapeIsToBigAndShapeHasToManyVertices;
        fixText = fixShapeIsToBigAndShapeHasToManyVertices;
        fixStatus = `The current size of the area is ${areaSize.toFixed(0)} sq km and the current number of vertices is ${numVertices.toFixed(0)}`;
        fixStatusGoal = `and the size neeeds to be less than ${areaThreshold} and the number of vertices needs to be less than ${verticeThreshold}`;
        thisStep.howFixedText = 'EDITIED VERTEX';
      } else if (areaSize > areaThreshold) {
        invalidText = errorShapeIsToBig;
        fixText = fixShapeIsToBig;
        fixStatus = `The current size of the area is ${areaSize.toFixed(0)} sq km`;
        fixStatusGoal = `and the size neeeds to be less than ${areaThreshold}`;
        thisStep.howFixedText = 'EDITIED VERTEX';
      } else if (numVertices > verticeThreshold) {
        invalidText = errorShapeHasToManyVertices;
        fixText = fixShapeHasToManyVertices;
        fixStatus = `The current number of vertices is ${numVertices.toFixed(0)}`;
        fixStatusGoal = `and the number of vertices needs to be less than ${verticeThreshold}`;
        thisStep.howFixedText = 'EDITIED VERTEX';
      }
      thisStep.color = 'red';
      if (thisStep) {
        thisStep.invalidText = invalidText;
        thisStep.fixText = fixText;
        thisStep.fixStatus = fixStatus;
        thisStep.fixStatusGoal = fixStatusGoal;
        thisStep.isValid = false;
        thisStep.isFixed = false;
      }
    }

    // Remove existing tooltips
    layer.unbindTooltip();

    // Update localGeo for dispatch
    const newGeo = mapRef.current?.toGeoJSON();
    if (newGeo?.type === 'FeatureCollection') {
      setLocalGeo(newGeo);
    }
  };

  const handleEditStop = (e) => {
    setIsEdit(false);
    const mapGeo = mapRef.current.toGeoJSON();
    mapRef.current.eachLayer((layer) => {
      const geo = layer.toGeoJSON();
      const thisStep = steps.current[layer.options.stepID];
      let invalidText = '';
      let fixText = '';
      let fixStatus = '';
      let fixStatusGoal = '';
      // finalize updates for good / bad
      if (validPolygon(geo)) {
        layer.setStyle({ color: 'green' });
        thisStep.color = 'green';
        thisStep.isFixed = true;
        thisStep.howFixedText = 'FIXED';
      } else {
        const areaSize = calculateAreaOfPolygon(geo) / 1000000;
        const numVertices = caclulatePolygonVertices(geo);
        if (areaSize > areaThreshold && numVertices > verticeThreshold) {
          invalidText = errorShapeIsToBigAndShapeHasToManyVertices;
          fixText = fixShapeIsToBigAndShapeHasToManyVertices;
          fixStatus = `The current size of the area is ${areaSize.toFixed(0)} sq km and the current number of vertices is ${numVertices.toFixed(0)}`;
          fixStatusGoal = `and the size neeeds to be less than ${areaThreshold} and the number of vertices needs to be less than ${verticeThreshold}`;
          thisStep.howFixedText = 'EDITIED VERTEX';
        } else if (areaSize > areaThreshold) {
          invalidText = errorShapeIsToBig;
          fixText = fixShapeIsToBig;
          fixStatus = `The current size of the area is ${areaSize.toFixed(0)} sq km`;
          fixStatusGoal = `and the size neeeds to be less than ${areaThreshold}`;
          thisStep.howFixedText = 'EDITIED VERTEX';
        } else if (numVertices > verticeThreshold) {
          invalidText = errorShapeHasToManyVertices;
          fixText = fixShapeHasToManyVertices;
          fixStatus = `The current number of vertices is ${numVertices.toFixed(0)}`;
          fixStatusGoal = `and the number of vertices needs to be less than ${verticeThreshold}`;
          if (thisStep) thisStep.howFixedText = 'EDITIED VERTEX';
        }
        layer.setStyle({ color: 'red' });
        if (thisStep) {
          thisStep.invalidText = invalidText;
          thisStep.fixText = fixText;
          thisStep.fixStatus = fixStatus;
          thisStep.fixStatusGoal = fixStatusGoal;
        }
      }
      // update geoToReturn in case we download this stuff
      const thisFeature = mapGeo.features.find(
        (feature) => feature.properties.id === layer.feature.properties.id
      );
      geoToReturn.current.features[layer.feature.properties.id] = thisFeature;
    });
    // update localGeo for dispatch
    const newGeo = mapRef.current?.toGeoJSON();
    if (newGeo?.type === 'FeatureCollection') {
      setLocalGeo(newGeo);
    }
    //   setActiveStep(0)
  };

  return (
      <FeatureGroup ref={mapRef}>
        <EditControl
          position="topleft"
          onDeleted={handleDelete}
          onEditVertex={handleEditVertex}
          onEditStop={handleEditStop}
          draw={{
            rectangle: false,
            circle: false,
            polyline: false,
            polygon: false,
            marker: false,
            circlemarker: false
          }}
          edit={{
            poly: { allowIntersection: false }
          }}
        />
      </FeatureGroup>
  );
}

EditControlFC.propTypes = {
  localGeo: PropTypes.object,
  setLocalGeo: PropTypes.func,
  setIsEdit: PropTypes.func,
  geoToReturn: PropTypes.object,
  endIndex: PropTypes.object,
  steps: PropTypes.object,
  updateSteps: PropTypes.bool,
  setUpdateSteps: PropTypes.func,
  setActiveStep: PropTypes.func,
  mapRef: PropTypes.object
};
