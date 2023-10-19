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
    startIndex,
    endIndex,
    steps,
    updateSteps,
    setUpdateSteps,
    activeStep
  } = props;
  const ref = React.useRef(null);
  console.log(ref.current);
  useEffect(() => {
    console.log('use effect triggered...');
    console.log('update steps is: ', updateSteps);
    console.log('ref.current.getLayers(): ', ref.current.getLayers());
    if (ref.current?.getLayers().length === 10 && updateSteps) {
      console.log('10 layers found...');
      ref.current.clearLayers();
    }
    if (ref.current?.getLayers().length === 0 && localGeo && updateSteps) {
      let count = startIndex;
      console.log('count is: ', count);
      console.log('startIndex is: ', startIndex);
      console.log('endIndex is: ', endIndex);
      console.log('localGeo is: ', localGeo);
      const thisSection = localGeo.features.slice(startIndex, endIndex + 1);
      L.geoJSON(thisSection).eachLayer((layer) => {
        count += 1;
        if (count <= endIndex + 1 && count > startIndex) {
          console.log('inside if with ', count);
          console.log('layer is: ', layer);
      
          // Create a deep copy of the feature
          const feature = JSON.parse(JSON.stringify(layer.feature));
      
          // Modify the copied feature
          feature.properties = feature.properties || {};
          feature.properties.id = count;
          const geo = layer.toGeoJSON();
      
          console.log('right before if statement...');
          if (!validPolygon(geo)) {
            ref.current?.addLayer(layer.setStyle({ color: 'red' }));
            const areaSize = calculateAreaOfPolygon(geo) / 1000000;
            steps.current?.push({
              title: `Shape ${feature.properties.id}`,
              id: feature.properties.id,
              isValid: false,
              text: `INVALID: Polygon is too large.\nSize: ${areaSize.toFixed(0)}`,
              color: 'red',
              layer: layer.setStyle({ color: 'red' }),
              center: layer.getCenter()
            });
          } else {
            ref.current?.addLayer(layer.setStyle({ color: 'green' }));
            steps.current?.push({
              title: `Shape ${feature.properties.id}`,
              id: feature.properties.id,
              isValid: true,
              text: 'VALID',
              color: 'green',
              layer: layer.setStyle({ color: 'green' }),
              center: layer.getCenter()
            });
          }
          setUpdateSteps(false);
          console.log('disabling update steps');
        }
      });
      
    }
  }, [endIndex, localGeo, setUpdateSteps, startIndex, steps, updateSteps]);

  const handleChange = () => {
    const geo = ref.current?.toGeoJSON();
    if (geo?.type === 'FeatureCollection') {
      setLocalGeo(geo);
    }
  };

  const handleEditVertex = (e) => {
    const layer = e.poly;
    console.log(layer);
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
    console.log('binding tooltip now...');
    layer.bindTooltip(thisStep.text, {
      permanent: true,
      direction: 'center'
    }).openTooltip();

    const newGeo = ref.current?.toGeoJSON();
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
    const geo = ref.current?.toGeoJSON();
    if (geo?.type === 'FeatureCollection') {
      setLocalGeo(geo);
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
  startIndex: PropTypes.number,
  endIndex: PropTypes.number,
  steps: PropTypes.object,
  updateSteps: PropTypes.bool,
  setUpdateSteps: PropTypes.func,
  activeStep: PropTypes.number
};

export default function ShapeFileCorrectionMap(props) {
  const {
    setMap, map, geoToRedraw, setGeoToRedraw
  } = props;

  const dispatch = useDispatch();
  const center = useSelector(selectedCenterSelector, () => true);
  // const zoom = useSelector(selectedZoomSelector, () => true);
  const zoom = 10;
  console.log('geo to redraw: ', geoToRedraw);
  const [localGeo, setLocalGeo] = React.useState(geoToRedraw);
  const [activeStep, setActiveStep] = React.useState(0);
  const [batchNo, setBatchNo] = React.useState(0);
  const [updateSteps, setUpdateSteps] = React.useState(true);

  const steps = React.useRef([]);
  const startIndex = batchNo * 10;
  const endIndex = Math.min((startIndex + 9), localGeo.features.length - 1);

  const totalBatches = localGeo.features.length / 10;
  console.log('steps.current.length: ', steps.current.length);
  console.log('activeStep: ', activeStep);
  console.log('startIndex: ', startIndex);
  console.log('endIndex: ', endIndex);
  console.log('updateStep: ', updateSteps);
  console.log('zoom: ', zoom);
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
    console.log(properties);

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
              Number of invalid layers: {steps.current?.slice(startIndex, endIndex + 1).filter((step) => step.isValid === false).length}
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
                    {console.log(steps)}
                    {steps.current?.slice(startIndex, endIndex + 1).map((item) => (
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
                  {activeStep !== startIndex ? (
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
                  {activeStep !== endIndex ? (
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
                  if (batchNo < totalBatches) {
                    setBatchNo(batchNo + 1);
                    setActiveStep(endIndex + 1);
                    setUpdateSteps(true);
                    console.log('setting update steps');
                  } else {
                    setGeoToRedraw(null);
                  }
                  dispatch(uploadedShapeFileGeoJSON(localGeo));
                }}
              >
                Send shapes back to map
              </Button>
            </Grid>
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
            steps={steps}
            startIndex={startIndex}
            endIndex={endIndex}
            updateSteps={updateSteps}
            setUpdateSteps={setUpdateSteps}
            activeStep={activeStep}
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
  setGeoToRedraw: PropTypes.func
};
