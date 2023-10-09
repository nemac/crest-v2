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
    steps
  } = props;
  const ref = React.useRef(null);

  useEffect(() => {
    if (ref.current?.getLayers().length === 0 && localGeo) {
      let count = 0;
      console.log('count is: ', count);
      console.log('startIndex is: ', startIndex);
      console.log('endIndex is: ', endIndex);
      L.geoJSON(localGeo).eachLayer((layer) => {
        count += 1;
        // I thiiink this is right, but the limits are busted somewhere else...
        if (count <= endIndex && count >= startIndex) {
          console.log('inside if with ', count);
          const cloneLayer = layer;
          const feature = layer.feature || {};
          const geo = cloneLayer.toGeoJSON();
          feature.type = feature.type || 'Feature';
          const properties = feature.properties || {};
          properties.id = count;
          cloneLayer.feature = feature;
          if (!validPolygon(geo)) {
            ref.current?.addLayer(cloneLayer.setStyle({ color: 'red' }));
            const areaSize = calculateAreaOfPolygon(geo) / 1000000;
            steps.current?.push({
              title: `Shape ${properties.id}`,
              id: properties.id,
              isValid: false,
              text: `INVALID: Polygon is too large.\nSize: ${areaSize.toFixed(0)}`,
              color: 'red',
              layer: cloneLayer.setStyle({ color: 'red' }),
              center: layer.getCenter()
            });
          } else {
            ref.current?.addLayer(cloneLayer.setStyle({ color: 'green' }));
            steps.current?.push({
              title: `Shape ${properties.id}`,
              id: properties.id,
              isValid: true,
              text: 'VALID',
              color: 'green',
              layer: cloneLayer.setStyle({ color: 'green' }),
              center: layer.getCenter()
            });
          }
        }
      });
    }
  }, [endIndex, localGeo, startIndex, steps]);

  const handleChange = () => {
    const geo = ref.current?.toGeoJSON();
    if (geo?.type === 'FeatureCollection') {
      setLocalGeo(geo);
    }
  };

  const handleEditVertex = (e) => {
    const layer = e.poly;
    const stepIndex = layer.feature.properties.id - 1;
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
    layer
      .bindTooltip(
        thisStep.text,
        {
          permanant: true,
          direction: 'center'
        }
      )
      .openTooltip();
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
  steps: PropTypes.object
};

export default function ShapeFileCorrectionMap(props) {
  const {
    setMap, map, geoToRedraw, setGeoToRedraw
  } = props;

  const dispatch = useDispatch();
  const center = useSelector(selectedCenterSelector, () => true);
  const zoom = useSelector(selectedZoomSelector, () => true);
  console.log('geo to redraw: ', geoToRedraw);
  const [localGeo, setLocalGeo] = React.useState(geoToRedraw);
  const [activeStep, setActiveStep] = React.useState(0);
  const [batchNo, setBatchNo] = React.useState(0);

  const steps = React.useRef([]);
  const startIndex = batchNo * 10;
  let endIndex;
  if (steps.current.length === 0) {
    endIndex = startIndex + 10;
  } else {
    endIndex = Math.min((startIndex + 10), steps.current.length - 1);
  }
  const totalBatches = steps.current.length / 10;

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
                    {steps.current?.slice(startIndex, endIndex).map((item) => (
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
                  {/* <ExampleActionButton
                    buttonLabel={'View in CREST'}
                    buttonName={'View in CREST'}
                    onClick={viewExampleOnMap}
                    buttonDisabled={false}
                  >
                    <MapIcon />
                  </ExampleActionButton> */}
                </Grid>
                <Grid item xs={12} md={3}>
                  {activeStep !== endIndex - 1 ? (
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
