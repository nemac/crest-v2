import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import PropTypes from 'prop-types';
import * as L from 'leaflet';
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { download } from '@crmackey/shp-write';
import RectangleTwoToneIcon from '@mui/icons-material/RectangleTwoTone';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/system';

import BasemapLayer from './BasemapLayer';
import LeafletMapContainer from './LeafletMapContainer';
import {
  calculateAreaOfPolygon,
  caclulatePolygonVertices,
  validPolygon
} from '../../utility/utilityFunctions';
import GenericMapHolder from './GenericMapHolder';

import ExampleActionButton from '../Example/ExampleActionButton';

import {
  uploadedShapeFileGeoJSON,
  clearUploadedShapeFileGeoJSON
} from '../../reducers/mapPropertiesSlice';

const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedCenterSelector = (state) => state.mapProperties.center;
const selectedUploadedShapeFile = (state) => state.mapProperties.uploadedShapeFileGeoJSON;

const RectangleTwoToneIconStyled = styled(RectangleTwoToneIcon)(
  ({ theme }) => ({
    color: 'transparent',
    borderColor: 'white',
    borderStyle: 'solid',
    height: '42px',
    width: '10px',
    px: '0.1'
  })
);
function EditControlFC(props) {
  const {
    localGeo,
    setLocalGeo,
    geoToReturn,
    endIndex,
    steps,
    updateSteps,
    setUpdateSteps,
    activeStep,
    setActiveStep,
    batchSize,
    mapRef
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    // Only trigger if we have an empty map and things to update
    if (mapRef.current?.getLayers().length === 0 && localGeo && updateSteps) {
      let count = 0; // All Layers
      let countValid = 0; // Layers we don't need to fix, send immediately
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
          const areaSize = calculateAreaOfPolygon(geo) / 1000000;
          const numVertices = caclulatePolygonVertices(geo);
          let invalidText = '';
          if (areaSize > 500000000 && numVertices > 1000) {
            invalidText = `INVALID: Polygon is too large and contains too many vertices.\nSize: ${areaSize.toFixed(0)} / 500\nVertices: ${numVertices} / 1000`;
          } else if (areaSize > 500000000) {
            invalidText = `INVALID: Polygon is too large.\nSize: ${areaSize.toFixed(0)} / 500`;
          } else if (numVertices > 1000) {
            invalidText = `INVALID: Polygon contains too many vertices.\nVertices: ${numVertices} / 1000`;
          }
          steps.current?.push({
            title: `Shape ${feature.properties.id}`,
            id: feature.properties.id,
            isValid: false,
            text: invalidText,
            color: 'red',
            layer: layer.setStyle({ color: 'red' })
          });
        } else { // if it is valid, batch and send it when we reach our batch size
          countValid += 1;

          validBatch.features.push(geo);
          if (countValid >= batchSize || count >= localGeo.features.length) {
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
      endIndex.current = Math.min(steps.current.length, activeStep + batchSize - 1);
      if (steps.current.length >= batchSize) { // more than one batch total
        // we will only look and operate in the range of this batch
        steps.current.slice(activeStep, endIndex.current + 1).forEach((invalidLayer) => {
          // This seemed like the easiest way to match steps with the map layers
          invalidLayer.layer.options.stepID = invalidLayer.id - 1;
          if (invalidLayer.text !== 'DELETED') {
            mapRef.current?.addLayer(invalidLayer.layer.setStyle({ color: 'red' }));
          }
        });
      } else { // only one batch to work with, much simpler
        endIndex.current = steps.current.length - 1;
        steps.current.forEach((invalidLayer) => {
          invalidLayer.layer.options.stepID = invalidLayer.id - 1;
          if (invalidLayer.text !== 'DELETED') {
            mapRef.current?.addLayer(invalidLayer.layer.setStyle({ color: 'red' }));
          }
        });
      }
    }
    // May not need to watch ALL of these variables, worth revisiting
  }, [endIndex, localGeo, setUpdateSteps, steps, updateSteps]);

  const handleChange = (e) => {
    // get deleted layers...
    // don't like digging into _layers, but not sure how else to get id
    const deletedLayers = Object.values(e.layers._layers);
    deletedLayers.forEach((layer) => {
      const updatedFeatures = geoToReturn.current.features.filter(
        (feature) => feature.properties.id !== layer.feature.properties.id
      );
      geoToReturn.current.features = updatedFeatures;
      const thisStep = steps.current[layer.options.stepID];
      thisStep.color = 'green';
      thisStep.text = 'DELETED'; // this will keep us from re-rendering!
      thisStep.isValid = true;
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
    // set properties for valid
    if (validPolygon(geo)) {
      layer.setStyle({ color: 'green' });
      thisStep.color = 'green';
      thisStep.text = 'VALID';
      thisStep.isValid = true;
    } else { // update size and make sure we have invalid properties
      layer.setStyle({ color: 'red' });
      const areaSize = calculateAreaOfPolygon(geo) / 1000000;
      const numVertices = caclulatePolygonVertices(geo);
      let invalidText = '';
      if (areaSize > 500000000 && numVertices > 1000) {
        invalidText = `INVALID: Polygon is too large and contains too many vertices.\nSize: ${areaSize.toFixed(0)} / 500\nVertices: ${numVertices} / 1000`;
      } else if (areaSize > 500000000) {
        invalidText = `INVALID: Polygon is too large.\nSize: ${areaSize.toFixed(0)} / 500`;
      } else if (numVertices > 1000) {
        invalidText = `INVALID: Polygon contains too many vertices.\nVertices: ${numVertices} / 1000`;
      }
      thisStep.color = 'red';
      thisStep.text = invalidText;
      thisStep.isValid = false;
    }

    // Remove existing tooltips
    layer.unbindTooltip();

    // Add a new tooltip
    layer.bindTooltip(thisStep.text, {
      permanent: true,
      direction: 'center'
    }).openTooltip();

    // Update localGeo for dispatch
    const newGeo = mapRef.current?.toGeoJSON();
    if (newGeo?.type === 'FeatureCollection') {
      setLocalGeo(newGeo);
    }
  };

  const handleEditStop = (e) => {
    const mapGeo = mapRef.current.toGeoJSON();
    mapRef.current.eachLayer((layer) => {
      const geo = layer.toGeoJSON();
      const thisStep = steps.current[layer.options.stepID];
      // finalize updates for good / bad
      if (validPolygon(geo)) {
        layer.setStyle({ color: 'green' });
        thisStep.color = 'green';
        thisStep.isValid = true;
        thisStep.text = 'VALID';
      } else {
        const areaSize = calculateAreaOfPolygon(geo) / 1000000;
        const numVertices = caclulatePolygonVertices(geo);
        let invalidText = '';
        if (areaSize > 500000000 && numVertices > 1000) {
          invalidText = `INVALID: Polygon is too large and contains too many vertices.\nSize: ${areaSize.toFixed(0)} / 500\nVertices: ${numVertices} / 1000`;
        } else if (areaSize > 500000000) {
          invalidText = invalidText;
        } else if (numVertices > 1000) {
          invalidText = `INVALID: Polygon contains too many vertices.\nVertices: ${numVertices} / 1000`;
        }
        layer.setStyle({ color: 'red' });
        thisStep.color = 'red';
        thisStep.isValid = false;
        thisStep.text = invalidText;
      }
      // update geoToReturn in case we download this stuff
      const thisFeature = mapGeo.features.find((feature) => feature.properties.id === layer.feature.properties.id);
      geoToReturn.current.features[layer.feature.properties.id] = thisFeature;
      // make sure tooltips are open
      layer
        .bindTooltip(
          thisStep.text,
          {
            permanant: true,
            direction: 'center'
          }
        )
        .openTooltip();
    });
    // update localGeo for dispatch
    const newGeo = mapRef.current?.toGeoJSON();
    if (newGeo?.type === 'FeatureCollection') {
      setLocalGeo(newGeo);
    }
  };

  return (
    <FeatureGroup ref={mapRef}>
      <EditControl
        position="topleft"
        onDeleted={handleChange}
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
  geoToReturn: PropTypes.object,
  endIndex: PropTypes.object,
  steps: PropTypes.object,
  updateSteps: PropTypes.bool,
  setUpdateSteps: PropTypes.func,
  activeStep: PropTypes.number,
  setActiveStep: PropTypes.func,
  batchSize: PropTypes.number,
  mapRef: PropTypes.object
};

export default function ShapeFileCorrectionMap(props) {
  const {
    setMap, map, geoToRedraw, setGeoToRedraw, setErrorState
  } = props;

  const dispatch = useDispatch();
  const center = useSelector(selectedCenterSelector, () => true);
  const zoom = useSelector(selectedZoomSelector, () => true);
  const uploadedShapeFileArray = useSelector(selectedUploadedShapeFile, () => true);
  const [localGeo, setLocalGeo] = React.useState(geoToRedraw);
  const [activeStep, setActiveStep] = React.useState(0);
  const [updateSteps, setUpdateSteps] = React.useState(true);
  // Kinda ugly way to do it, maybe we should pass batchSize down to here and leafletDrawTools
  const batchSize = 10;
  const mapRef = React.useRef(null); // For edit controls
  const steps = React.useRef([]); // our dataset that needs to be fixed
  const geoToReturn = React.useRef(geoToRedraw);
  // We slice into steps for batching, start and end indices are for slicing
  const endIndex = React.useRef(Math.min(batchSize - 1, steps.current.length));
  const startIndex = React.useRef(0);
  // numberInvalid is displayed to user and safeguards returning bad shapes
  // eslint-disable-next-line max-len
  const numberInvalid = steps.current?.slice(startIndex.current, endIndex.current + 1).filter((step) => step.isValid === false).length;
  // Always make sure that we are zoomed in to the operating shape
  if (steps.current.length > activeStep) {
    const shape = steps.current[activeStep].layer.toGeoJSON();
    const bounds = L.geoJSON(shape).getBounds();
    map.fitBounds(bounds);
  }

  // Next button logic to step through steps
  const handleNext = () => {
    const newStep = activeStep + 1;
    setActiveStep(newStep);
  };

  // Previous button logic to step through steps
  const handlePrevious = () => {
    const newStep = activeStep - 1;
    setActiveStep(newStep);
  };

  const handleEditMore = (nextBatchSize, previous) => {
    setUpdateSteps(true);
    setActiveStep(endIndex.current + 1);
    startIndex.current += batchSize;
    endIndex.current += nextBatchSize;
    dispatch(uploadedShapeFileGeoJSON(localGeo));
    mapRef.current.clearLayers();
    const toAdd = steps.current.slice(startIndex.current, endIndex.current + 1);
    toAdd.forEach((invalidLayer) => {
      invalidLayer.layer.options.stepID = invalidLayer.id - 1;
      mapRef.current?.addLayer(invalidLayer.layer.setStyle({ color: 'red' }));
    });
    setErrorState({ ...previous, error: false });
  };

  const CustomStepIcon = (properties, color, id) => {
    const active = activeStep === id - 1;

    return (
      <RectangleTwoToneIconStyled
        sx={{
          backgroundColor: color,
          filter: active ? 'brightness(1.0)' : 'brightness(0.5)'
        }}
      />
    );
  };

  return (
    <GenericMapHolder
      leftColumn={
        <Box sx={{ height: '100%', width: '100%' }}>
          <Grid container>
            <Grid xs={12}>
              Welcome to the shape file fixer. This tool will allow you to fix
              any invalid shapes in your shape file.
            </Grid>
            <Grid xs={12}>
              Number of invalid layers: {numberInvalid}
            </Grid>
              <Grid item xs={12} py={1}>
                <Typography
                  variant="body2"
                  component="div"
                  justifyContent="center"
                  alignItems="center"
                  p={1}
                  sx={{ display: 'flex' }}
                >
                  {'Shapes to Upload'}
                </Typography>
              </Grid>
              <Grid item xs={12} py={1}>
                <Typography
                  align="center"
                  variant="body2"
                  component="div"
                  sx={{ fontWeight: 'bold' }}
                >
                  Shape {activeStep + 1}
                </Typography>
              </Grid>
              <Grid item xs={12} py={1}>
                <Box sx={{ width: '100%' }}>
                  <Stepper
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    activeStep={activeStep}
                    nonLinear={true}
                    connector={null}
                  >
                    {steps.current?.slice(startIndex.current, endIndex.current + 1).map((item) => (
                      <Step key={item.title}>
                        <StepLabel StepIconComponent={(properties) => CustomStepIcon(properties, item.color, item.id)} />
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Grid>
              <Grid item xs={12} py={1}>
                <Box sx={{ height: '175px' }}>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {steps.current[activeStep]?.title}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {steps.current[activeStep]?.text}
                  </Typography>
                </Box>
              </Grid>
              <Grid container spacing={0} p={0} m={0} sx={{ width: '100%' }}>
                <Grid item xs={12} md={3}>
                  {activeStep !== startIndex.current ? (
                    <ExampleActionButton
                      buttonLabel={'Previous'}
                      buttonName={'Previous'}
                      onClick={handlePrevious}
                      buttonDisabled={false}
                    >
                      <ArrowCircleLeftIcon />
                    </ExampleActionButton>
                  ) : (
                    <ExampleActionButton
                      buttonLabel={'Previous'}
                      buttonName={'Previous'}
                      onClick={handlePrevious}
                      buttonDisabled={true}
                    >
                      <ArrowCircleLeftIcon />
                    </ExampleActionButton>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                </Grid>
                <Grid item xs={12} md={3}>
                  {activeStep !== endIndex.current ? (
                    <ExampleActionButton
                      buttonLabel={'Next'}
                      buttonName={'Next'}
                      onClick={handleNext}
                      buttonDisabled={false}
                    >
                      <ArrowCircleRightIcon />
                    </ExampleActionButton>
                  ) : (
                    <ExampleActionButton
                      buttonLabel={'Next'}
                      buttonName={'Next'}
                      onClick={handleNext}
                      buttonDisabled={true}
                    >
                      <ArrowCircleRightIcon />
                    </ExampleActionButton>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12}>
              <Button
                onClick={() => {
                  if (numberInvalid) {
                    setErrorState((previous) => ({
                      ...previous,
                      error: true,
                      errorTitle: 'Invalid Shapes',
                      errorType: 'warning',
                      errorMessage: 'This batch contains invalid shapes. Please fix before sending to map.',
                      errorClose: () => {
                        setErrorState({ ...previous, error: false });
                      }
                    }));
                  } else if (steps.current.length > endIndex.current + 1) {
                    const remainingShapes = steps.current.length - endIndex.current - 1;
                    const nextBatchSize = Math.min(remainingShapes, batchSize);
                    setErrorState((previous) => ({
                      ...previous,
                      error: true,
                      errorTitle: 'Edit More Shapes',
                      errorType: 'warning',
                      errorMessage: `Would you like to edit the next ${nextBatchSize} shapes?`,
                      errorButtonText: 'Send And Return To Map',
                      errorClose: () => {
                        setGeoToRedraw(null);
                        dispatch(uploadedShapeFileGeoJSON(localGeo));
                        setErrorState({ ...previous, error: false });
                      },
                      acceptButtonText: `Edit Next ${nextBatchSize} Shapes`,
                      acceptButtonClose: () => handleEditMore(nextBatchSize, previous)
                    }));
                  } else {
                    setGeoToRedraw(null);
                    // Also send remaining valid batch...
                    dispatch(uploadedShapeFileGeoJSON(localGeo));
                  }
                }}
              >
                Send shapes back to map
              </Button>
            </Grid>
            <Grid xs={12}>
              <Button
                onClick={() => {
                  setGeoToRedraw(null);
                  dispatch(clearUploadedShapeFileGeoJSON());
                  download(geoToReturn.current);
                }}
              >
                Download shapes to a new shapefile
              </Button>
            </Grid>
        </Box>
      }
      mapCard={
        <LeafletMapContainer center={center} zoom={zoom} innerRef={setMap}>
          <EditControlFC
            position="topleft"
            localGeo={localGeo}
            setLocalGeo={setLocalGeo}
            geoToReturn={geoToReturn}
            // geoToRedraw={geoToRedraw}
            steps={steps}
            endIndex={endIndex}
            updateSteps={updateSteps}
            setUpdateSteps={setUpdateSteps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            batchSize={batchSize}
            mapRef={mapRef}
          />
          <BasemapLayer />
        </LeafletMapContainer>
      }
    />
  );
}

ShapeFileCorrectionMap.propTypes = {
  setMap: PropTypes.func,
  map: PropTypes.object,
  geoToRedraw: PropTypes.object,
  setGeoToRedraw: PropTypes.func,
  setErrorState: PropTypes.func
};
