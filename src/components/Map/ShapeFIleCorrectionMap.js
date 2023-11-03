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
import { FormatShapes } from '@mui/icons-material';

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
    batchSize
  } = props;
  const ref = React.useRef(null);
  const dispatch = useDispatch();

  // console.log('ref.current: ', ref.current);
  useEffect(() => {
    // console.log('update steps is: ', updateSteps);
    // console.log('ref.current.getLayers(): ', ref.current.getLayers());
    // if (ref.current?.getLayers().length === 10 && updateSteps) {
    //   console.log('10 layers found...');
    //   ref.current.clearLayers();
    // }
    if (ref.current?.getLayers().length === 0 && localGeo && updateSteps) {
      let count = 0;
      let countValid = 0;
      let countInvalid = 0;
      let validBatch = {
        type: 'FeatureCollection',
        features: []
      };
      // console.log('count is: ', count);
      // console.log('startIndex is: ', startIndex);
      // console.log('endIndex is: ', endIndex);
      // console.log('localGeo is: ', localGeo);
      // console.log('geoToRedraw: ', geoToRedraw);
      // const thisSection = geoToRedraw.features.slice(startIndex, endIndex + 1);
      L.geoJSON(localGeo).eachLayer((layer) => {
        count += 1;
        // if (count <= endIndex + 1 && count > startIndex) {
        // if (count <= localGeo.length) {
        // console.log('inside if with ', count);
        // console.log('layer is: ', layer);

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
          // ref.current?.addLayer(layer.setStyle({ color: 'red' }));
          const areaSize = calculateAreaOfPolygon(geo) / 1000000;
          steps.current?.push({
            title: `Shape ${feature.properties.id}`,
            id: feature.properties.id,
            isValid: false,
            text: `INVALID: Polygon is too large.\nSize: ${areaSize.toFixed(0)}`,
            color: 'red',
            layer: layer.setStyle({ color: 'red' }),
            center: []
            // center: layer.getCenter()
          });
        } else {
          countValid += 1;
          // console.log('should be dispatching: ', layer);
          // console.log(validBatch);
          validBatch.features.push(geo);
          if (countValid >= batchSize || count >= localGeo.features.length) {
            // console.log('reached end of good batch, dispatching now');
            dispatch(uploadedShapeFileGeoJSON(validBatch));
            validBatch = {
              type: 'FeatureCollection',
              features: []
            };
            countValid = 0;
          }
        }
        // }
        // const newGeo = ref.current?.toGeoJSON();
        // if (newGeo?.type === 'FeatureCollection') {
        //   setLocalGeo(newGeo);
        // }
        // setUpdateSteps(false);
        // console.log('disabling update steps');
      });
      // NOW WE CAN STEP THROUGH STEPS AND RENDER TO MAP AND GET CENTER
      // console.log('current number invalid: ', steps.current.length);
      if (steps.current.length >= batchSize) {
        // console.log('too many steps, updating in batches...');
      } else {
        // console.log('number of steps: ', steps.current.length);
        endIndex.current = steps.current.length - 1;
        steps.current.forEach((invalidLayer) => {
          ref.current?.addLayer(invalidLayer.layer.setStyle({ color: 'red' }));
          invalidLayer.center = invalidLayer.layer.getCenter();
        });
      }
    }
  }, [endIndex, localGeo, setUpdateSteps, steps, updateSteps]);

  const handleChange = () => {
    const newGeo = ref.current?.toGeoJSON();
    if (newGeo?.type === 'FeatureCollection') {
      setLocalGeo(newGeo);
    }
  };

  const handleEditVertex = (e) => {
    const layer = e.poly;
    // console.log(layer);
    const stepIndex = activeStep;
    const geo = layer.toGeoJSON();
    const thisStep = steps.current[stepIndex];
    if (validPolygon(geo)) {
      layer.setStyle({ color: 'green' });
      thisStep.color = 'green';
      thisStep.text = 'VALID';
      thisStep.isValid = true;
      thisStep.center = layer.getCenter();
    } else {
      layer.setStyle({ color: 'red' });
      const areaSize = calculateAreaOfPolygon(geo) / 1000000;
      thisStep.color = 'red';
      thisStep.text = `INVALID: Polygon is too large.\nSize: ${areaSize.toFixed(0)} / 500`;
      thisStep.isValid = false;
      thisStep.center = layer.getCenter();
    }

    // Remove existing tooltips
    layer.unbindTooltip();

    // Add a new tooltip
    // console.log('binding tooltip now...');
    layer.bindTooltip(thisStep.text, {
      permanent: true,
      direction: 'center'
    }).openTooltip();

    const newGeo = ref.current?.toGeoJSON();
    // console.log('newGeo: ', newGeo);
    if (newGeo?.type === 'FeatureCollection') {
      setLocalGeo(newGeo);
    }
  };

  const handleEditStop = (e) => {
    let featNum = 0;
    ref.current.eachLayer((layer) => {
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
    const newGeo = ref.current?.toGeoJSON();
    // console.log('newGeo: ', newGeo);
    if (newGeo?.type === 'FeatureCollection') {
      setLocalGeo(newGeo);
    }
  };

  return (
    <FeatureGroup ref={ref}>
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
  batchSize: PropTypes.number
};

export default function ShapeFileCorrectionMap(props) {
  const {
    setMap, map, geoToRedraw, setGeoToRedraw, setErrorState
  } = props;

  const dispatch = useDispatch();
  const center = useSelector(selectedCenterSelector, () => true);
  // const zoom = useSelector(selectedZoomSelector, () => true);
  const zoom = 10;
  // console.log('geo to redraw: ', geoToRedraw);
  const [localGeo, setLocalGeo] = React.useState(geoToRedraw);
  const [activeStep, setActiveStep] = React.useState(0);
  const [updateSteps, setUpdateSteps] = React.useState(true);

  const steps = React.useRef([]);
  const endIndex = React.useRef(0);
  const numberInvalid = steps.current?.filter((step) => step.isValid === false).length;
  const batchSize = 10;

  // console.log('steps.current.length: ', steps.current.length);
  // console.log('activeStep: ', activeStep);
  // console.log('startIndex: ', startIndex);
  // console.log('endIndex: ', endIndex);
  // console.log('updateStep: ', updateSteps);
  // console.log('zoom: ', zoom);

  // PROBABLY NEED TO UPDATE THIS TO MATCH NEW INDEXING
  if (steps.current.length > activeStep) {
    map.flyTo(steps.current[activeStep].center, zoom);
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
                    {steps.current?.slice(0, endIndex.current + 1).map((item) => (
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
                  {activeStep !== 0 ? (
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
                        setLocalGeo(ref.current);
                        dispatch(uploadedShapeFileGeoJSON(localGeo));
                        setErrorState({ ...previous, error: false });
                      },
                      acceptButtonText: `Edit Next ${nextBatchSize} Shapes`,
                      acceptButtonClose: () => {
                        setUpdateSteps(true);
                        // console.log('setting update steps');
                        dispatch(uploadedShapeFileGeoJSON(localGeo));
                        // console.log('sending back : ', localGeo);
                        setErrorState({ ...previous, error: false });
                      }
                    }));
                    // setBatchNo(batchNo + 1);
                    setActiveStep(endIndex.current + 1);
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
            batchSize={batchSize}
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
