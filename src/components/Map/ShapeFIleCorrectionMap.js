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
  validPolygon
} from '../../utility/utilityFunctions';
import GenericMapHolder from './GenericMapHolder';

import ExampleActionButton from '../Example/ExampleActionButton';

import { uploadedShapeFileGeoJSON } from '../../reducers/mapPropertiesSlice';
// import { FormatShapes } from '@mui/icons-material';

const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedCenterSelector = (state) => state.mapProperties.center;

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
    geoToRedraw,
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
  console.log(mapRef);

  // console.log('mapRef.current: ', mapRef.current);
  useEffect(() => {
    if (mapRef.current?.getLayers().length === 0 && localGeo && updateSteps) {
      let count = 0;
      let countValid = 0;
      let countInvalid = 0;
      let validBatch = {
        type: 'FeatureCollection',
        features: []
      };
      L.geoJSON(localGeo).eachLayer((layer) => {
        count += 1;
        console.log('count in localgeo: ', count);
        // Create a deep copy of the feature
        const feature = JSON.parse(JSON.stringify(layer.feature));

        // Modify the copied feature
        feature.properties = feature.properties || {};
        feature.properties.id = count;
        const geo = layer.toGeoJSON();
        // console.log('checking shapes...');

        if (!validPolygon(geo)) {
          // console.log('bad shape found... adding to steps');
          countInvalid += 1;
          // mapRef.current?.addLayer(layer.setStyle({ color: 'red' }));
          const areaSize = calculateAreaOfPolygon(geo) / 1000000;
          steps.current?.push({
            title: `Shape ${feature.properties.id}`,
            id: feature.properties.id,
            isValid: false,
            text: `INVALID: Polygon is too large.\nSize: ${areaSize.toFixed(0)}`,
            color: 'red',
            layer: layer.setStyle({ color: 'red' })
          });
        } else {
          countValid += 1;

          validBatch.features.push(geo);
          if (countValid >= batchSize || count >= localGeo.features.length) {
            dispatch(uploadedShapeFileGeoJSON(validBatch));
            validBatch = {
              type: 'FeatureCollection',
              features: []
            };
            countValid = 0;
          }
        }

      });
      // NOW WE CAN STEP THROUGH STEPS AND RENDER TO MAP AND GET CENTER
      // console.log('current number invalid: ', steps.current.length);
      console.log('length of steps:', steps.current.length);
      // console.log('active + batchsize: ', activeStep + batchSize - 1);
      endIndex.current = Math.min(steps.current.length, activeStep + batchSize - 1);
      console.log('OK REACHED OUR CHECK FOR THE NEXT BIT...');
      console.log('endIndex is: ', endIndex.current);
      if (steps.current.length >= batchSize) { // more than one batch total
        // console.log('too many steps, updating in batches...');
        console.log('now we slice: ', steps.current.slice(activeStep, endIndex.current));
        steps.current.slice(activeStep, endIndex.current + 1).forEach((invalidLayer) => {
          invalidLayer.layer.options.stepID = invalidLayer.id - 1;
          mapRef.current?.addLayer(invalidLayer.layer.setStyle({ color: 'red' }));
          // invalidLayer.center = invalidLayer.layer.getCenter();
        });
      } else {
        console.log('number of steps: ', steps.current.length);
        endIndex.current = steps.current.length - 1;
        steps.current.forEach((invalidLayer) => {
          invalidLayer.layer.options.stepID = invalidLayer.id - 1;
          mapRef.current?.addLayer(invalidLayer.layer.setStyle({ color: 'red' }));
        });
      }
    }
  }, [endIndex, localGeo, setUpdateSteps, steps, mapRef]);

  const handleChange = () => {
    const newGeo = mapRef.current?.toGeoJSON();
    if (newGeo?.type === 'FeatureCollection') {
      setLocalGeo(newGeo);
    }
  };

  const handleEditVertex = (e) => {
    const layer = e.poly;
    setActiveStep(layer.options.stepID);
    console.log(layer);
    const stepIndex = activeStep;
    const geo = layer.toGeoJSON();
    const thisStep = steps.current[stepIndex];
    if (validPolygon(geo)) {
      layer.setStyle({ color: 'green' });
      thisStep.color = 'green';
      thisStep.text = 'VALID';
      thisStep.isValid = true;
    } else {
      layer.setStyle({ color: 'red' });
      const areaSize = calculateAreaOfPolygon(geo) / 1000000;
      thisStep.color = 'red';
      thisStep.text = `INVALID: Polygon is too large.\nSize: ${areaSize.toFixed(0)} / 500`;
      thisStep.isValid = false;
    }

    // Remove existing tooltips
    layer.unbindTooltip();

    // Add a new tooltip
    // console.log('binding tooltip now...');
    layer.bindTooltip(thisStep.text, {
      permanent: true,
      direction: 'center'
    }).openTooltip();

    const newGeo = mapRef.current?.toGeoJSON();
    // console.log('newGeo: ', newGeo);
    if (newGeo?.type === 'FeatureCollection') {
      setLocalGeo(newGeo);
    }
  };

  const handleEditStop = (e) => {
    let featNum = 0;
    mapRef.current.eachLayer((layer) => {
      const geo = layer.toGeoJSON();
      const thisStep = steps.current[featNum];
      featNum += 1;
      if (validPolygon(geo)) {
        layer.setStyle({ color: 'green' });
        thisStep.color = 'green';
        thisStep.isValid = true;
        thisStep.text = 'VALID';
      } else {
        // only set new invalid layer if it is not already in the array
        // stinks that we have to dig into layer but that seems to be the only way
        const areaSize = calculateAreaOfPolygon(geo) / 1000000;
        layer.setStyle({ color: 'red' });
        thisStep.color = 'red';
        thisStep.isValid = false;
        thisStep.text = `INVALID: Polygon is too large.\nSize: ${areaSize.toFixed(0)} / 500`;
      }
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
    const newGeo = mapRef.current?.toGeoJSON();
    // console.log('newGeo: ', newGeo);
    if (newGeo?.type === 'FeatureCollection') {
      setLocalGeo(newGeo);
    }
  };

  return (
    <FeatureGroup ref={mapRef}>
      <EditControl
        position="topleft"
        // onCreated={handleChange}
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
  geoToRedraw: PropTypes.object,
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
  // console.log('geo to redraw: ', geoToRedraw);
  const [localGeo, setLocalGeo] = React.useState(geoToRedraw);
  const [activeStep, setActiveStep] = React.useState(0);
  const [updateSteps, setUpdateSteps] = React.useState(true);
  const batchSize = 10;

  const steps = React.useRef([]);
  const endIndex = React.useRef(Math.min(batchSize - 1, steps.current.length));
  const startIndex = React.useRef(0);
  const mapRef = React.useRef(null);

  // eslint-disable-next-line max-len
  const numberInvalid = steps.current?.slice(activeStep, endIndex.current + 1).filter((step) => step.isValid === false).length;

  // console.log('steps.current.length: ', steps.current.length);
  // console.log('activeStep: ', activeStep);
  // console.log('startIndex: ', startIndex);
  // console.log('endIndex: ', endIndex);
  // console.log('updateStep: ', updateSteps);
  // console.log('zoom: ', zoom);

  // PROBABLY NEED TO UPDATE THIS TO MATCH NEW INDEXING
  console.log('steps: ', steps);
  console.log('activeStep: ', activeStep);
  if (steps.current.length > activeStep) {
    const shape = steps.current[activeStep].layer.toGeoJSON();
    const bounds = L.geoJSON(shape).getBounds();
    map.fitBounds(bounds);
  }

  const handleNext = () => {
    const newStep = activeStep + 1;
    setActiveStep(newStep);
  };

  const handlePrevious = () => {
    const newStep = activeStep - 1;
    setActiveStep(newStep);
  };

  const CustomStepIcon = (properties, color, id) => {
    const active = activeStep === id - 1;
    // console.log(properties);

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
            {/* <Grid container spacing={0} p={0} m={0} sx={{ width: '100%' }}> */}
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
                {/* <Divider sx={{ marginLeft: '6px', marginRight: '6px' }} /> */}
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
                  // console.log('numberInvalid: ', numberInvalid);
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
                  } else if (steps.current.length > batchSize) {
                    const remainingShapes = steps.current.length - batchSize;
                    const nextBatchSize = Math.min(remainingShapes, batchSize);
                    setErrorState((previous) => ({
                      ...previous,
                      error: true,
                      errorTitle: 'Edit More Shapes',
                      errorType: 'warning',
                      errorMessage: `Would you like to edit the next ${nextBatchSize} shapes?`,
                      errorButtonText: 'Send And Return To Map',
                      errorClose: () => {
                        // console.log('dispatching uploadShapeFileGeoJSON');
                        setGeoToRedraw(null);
                        console.log(ref.current);
                        dispatch(uploadedShapeFileGeoJSON(localGeo));
                        setErrorState({ ...previous, error: false });
                      },
                      acceptButtonText: `Edit Next ${nextBatchSize} Shapes`,
                      acceptButtonClose: () => {
                        setActiveStep(endIndex.current + 1);
                        startIndex.current += batchSize;
                        endIndex.current += nextBatchSize;
                        console.log('attempting to clear layers...');
                        console.log('mapRef: ', mapRef.current);
                        mapRef.current.clearLayers();
                        // console.log('setting update steps');
                        dispatch(uploadedShapeFileGeoJSON(localGeo));
                        setUpdateSteps(true);
                        // console.log('sending back : ', localGeo);
                        setErrorState({ ...previous, error: false });
                      }
                    }));
                    // setBatchNo(batchNo + 1);
                    // setActiveStep(endIndex.current + 1);
                  } else {
                    // console.log('dispatching uploadShapeFileGeoJSON');
                    // console.log('payload: ', localGeo);
                    setGeoToRedraw(null);
                    // Also send remaining valid batch...
                    dispatch(uploadedShapeFileGeoJSON(localGeo));
                  }
                }}
              >
                Send shapes back to map
              </Button>
            </Grid>
            {/* <Grid xs={12}>
              <Button
                onClick={() => {
                  if (batchNo < totalBatches) {
                    setBatchNo(batchNo + 1);
                    setActiveStep(endIndex + 1);
                    setUpdateSteps(true);
                  }
                }}
              >
                Skip to next shape batch
              </Button>
            </Grid> */}
            {/* <Grid xs={12}>
              <Button
                onClick={() => {
                  if (batchNo > 1) {
                    setBatchNo(batchNo - 1);
                    setActiveStep(startIndex - 10);
                    setUpdateSteps(true);
                  }
                }}
              >
                Return to previous shape batch
              </Button>
            </Grid> */}
            <Grid xs={12}>
              <Button
                onClick={() => {
                  setGeoToRedraw(null);
                  download(localGeo);
                }}
              >
                Download shapes to a new shapefile
              </Button>
            </Grid>
          {/* </Grid> */}
        </Box>
      }
      mapCard={
        <LeafletMapContainer center={center} zoom={zoom} innerRef={setMap}>
          <EditControlFC
            position="topleft"
            localGeo={localGeo}
            setLocalGeo={setLocalGeo}
            geoToRedraw={geoToRedraw}
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
