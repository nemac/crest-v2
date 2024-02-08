import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import MapIcon from '@mui/icons-material/Map';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import RectangleTwoToneIcon from '@mui/icons-material/RectangleTwoTone';
import { styled } from '@mui/system';

import {
  toggleLayer,
  toggleLegend,
  toggleCollapsed,
  initializeState
} from '../../reducers/mapLayerListSlice';
import {
  changeZoom,
  changeCenter,
  changeBasemap,
  addNewFeatureToDrawnLayers
} from '../../reducers/mapPropertiesSlice';
import { changeActiveTab } from '../../reducers/NavBarSlice';
import ExampleActionButton from './ExampleActionButton.jsx';
import { flyToLocation } from './StepActions.jsx';
import { mapConfig } from '../../configuration/config';

const RectangleTwoToneIconStyled = styled(RectangleTwoToneIcon)(({ theme }) => ({
  color: 'transparent',
  borderColor: 'white',
  borderStyle: 'solid',
  height: '42px',
  width: '22px'
}));

// just a place holder needs props passed in and image etc
export default function ExampleCard(props) {
  const {
    map,
    setExamplePolyData,
    expanded,
    handleExpanded,
    title,
    summaryText,
    examplePolygonGeojson,
    steps,
    mapCoordinates,
    examplePolygonLabel,
    examplePolygonCenter,
    zoom
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [previousStep, setPreviousStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setPreviousStep(activeStep);
  };

  const handlePrevious = () => {
    setActiveStep(activeStep - 1);
    setPreviousStep(activeStep);
  };

  const viewExampleOnMap = () => {
    dispatch(changeActiveTab('AnalyzeProjectSites'));
    navigate('/AnalyzeProjectSites');
    dispatch(addNewFeatureToDrawnLayers(examplePolygonGeojson.features[0]));
    dispatch(changeCenter(examplePolygonCenter));
    dispatch(changeZoom(zoom));
  };

  const CustomStepIcon = (properties) => {
    const { active } = properties;

    return (
        <RectangleTwoToneIconStyled
          sx={{ background: active ? 'gray' : 'white' }}
        />
    );
  };

  // This use effect is responsible for doing all of the step actions as you move forward
  // or backwards in the examples. REMINDER THAT STEPS ARE ZERO BASED SO STEPS 1-7 ARE
  // [0,1 ,2 ,3, 4, 5,6] IN THE STEP LIST
  useEffect(() => {
    // remove all polygon data if none are expanded
    if (!expanded) {
      setExamplePolyData(null);
    }

    const activeStepLayer = mapConfig.regions['Atlantic, Gulf of Mexico, and Pacific Coasts'].layerList[steps[activeStep].layerIndex];
    const previousStepLayer = mapConfig.regions['Atlantic, Gulf of Mexico, and Pacific Coasts'].layerList[steps[previousStep].layerIndex];

    // zero out the active and previous step if not expanded, toggle layer, and reset map
    if (map && expanded !== title) {
      setActiveStep(0);
      setPreviousStep(0);
      const defaultCenter = mapConfig.regions['Atlantic, Gulf of Mexico, and Pacific Coasts'].mapProperties.center;
      const defaultZoom = mapConfig.regions['Atlantic, Gulf of Mexico, and Pacific Coasts'].mapProperties.zoom;
      flyToLocation(map, defaultCenter, defaultZoom);
      if (activeStep >= 2) {
        dispatch(toggleLayer(activeStepLayer));
        dispatch(toggleLegend(activeStepLayer));
        dispatch(toggleCollapsed(activeStepLayer.ChartInputLabel));
      }
    }

    if (map && expanded === title) {
      // reset and initialize state when active step is 0
      if (activeStep === 0) {
        setExamplePolyData(null);
        dispatch(initializeState());
        dispatch(changeBasemap('Dark Gray'));
      }

      // Always draw poly and make sure you are at the correct location on the map
      if (activeStep >= 1) {
        flyToLocation(map, mapCoordinates, zoom);
        setExamplePolyData((previous) => ({ ...previous, label: examplePolygonLabel }));
        setExamplePolyData((previous) => ({ ...previous, geojson: examplePolygonGeojson }));
        setExamplePolyData((previous) => ({ ...previous, center: examplePolygonCenter }));
      }

      // Special case to make sure the layer turned on from Step 3 (previousStep 2) is toggled off
      if (activeStep === 1 && previousStep === 2) {
        dispatch(toggleLayer(previousStepLayer));
        dispatch(toggleLegend(previousStepLayer));
        dispatch(toggleCollapsed(previousStepLayer.ChartInputLabel));
      }

      // turn on layer for the active step and turn off layer for previous step
      if (activeStep >= 2) {
        dispatch(toggleLayer(activeStepLayer));
        dispatch(toggleLegend(activeStepLayer));
        dispatch(toggleCollapsed(activeStepLayer.ChartInputLabel));
        // have to check and make sure previous step is not 1 since there is no layer to toggle in 1
        if (previousStep !== 1) {
          dispatch(toggleLayer(previousStepLayer));
          dispatch(toggleLegend(previousStepLayer));
          dispatch(toggleCollapsed(previousStepLayer.ChartInputLabel));
        }
      }
    }
  }, [dispatch, map, expanded, activeStep, setActiveStep, previousStep, setPreviousStep]);

  // // This use effect is responsible for resetting the examples when accordions are collapsed
  // useEffect(() => {
  //   if (expanded !== title) {
  //     setActiveStep(0);
  //     setPreviousStep(null);
  //   }
  // }, [expanded, activeStep, setActiveStep, previousStep, setPreviousStep, title]);

  return (
    <Accordion expanded={expanded === title} onChange={handleExpanded(title)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h7" component="div" justifyContent="center" alignItems="center" p={1} sx={{ display: 'flex', fontWeight: 'bold' }} >
          {title}
        </Typography>
      </AccordionSummary>
      {/* revist  */}
      <Divider light sx={{ marginLeft: '6px', marginRight: '6px' }} />
      <AccordionDetails >
        <Grid container spacing={0} p={0} m={0} sx={{ width: '100%' }}>
          <Grid item xs={12} py={1}>
            <Typography variant="body2" component="div" justifyContent="center" alignItems="center" p={1} sx={{ display: 'flex' }} >
              {summaryText}
            </Typography>
            {/* <Divider sx={{ marginLeft: '6px', marginRight: '6px' }} /> */}
          </Grid>
          <Grid item xs={12} py={1} >
            <Typography align='center' variant="body2" component="div" sx={{ fontWeight: 'bold' }} >Step {activeStep + 1}</Typography>
          </Grid>
          <Grid item xs={12} py={1} >
            <Box sx={{ width: '100%' }}>
              <Stepper sx={{ display: 'flex', justifyContent: 'center' }} activeStep={activeStep} nonLinear={true} connector={null}>
                {steps.map((item) => (
                  <Step key={item.title}>
                    <StepLabel StepIconComponent={CustomStepIcon} />
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid>
          <Grid item xs={12} py={1} >
            <Box sx={{ height: '175px' }}>
              <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }} >
                {steps[activeStep].title}
              </Typography>
              <Typography variant="body2" component="div" >
                {steps[activeStep].text}
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
                buttonDisabled={false}>
                <ArrowCircleLeftIcon/>
              </ExampleActionButton>
            ) : (
              <ExampleActionButton
                buttonLabel={'Previous'}
                buttonName={'Previous'}
                onClick={handlePrevious}
                buttonDisabled={true}>
                <ArrowCircleLeftIcon/>
              </ExampleActionButton>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <ExampleActionButton
              buttonLabel={'View in CREST'}
              buttonName={'View in CREST'}
              onClick={viewExampleOnMap}
              buttonDisabled={false}>
              <MapIcon/>
            </ExampleActionButton>
          </Grid>
          <Grid item xs={12} md={3}>
            {activeStep !== steps.length - 1 ? (
              <ExampleActionButton
                buttonLabel={'Next'}
                buttonName={'Next'}
                onClick={handleNext}
                buttonDisabled={false}>
                <ArrowCircleRightIcon/>
              </ExampleActionButton>
            ) : (
              <ExampleActionButton
                buttonLabel={'Next'}
                buttonName={'Next'}
                onClick={handleNext}
                buttonDisabled={true}>
                <ArrowCircleRightIcon/>
              </ExampleActionButton>
            )}
          </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

ExampleCard.propTypes = {
  map: PropTypes.object,
  setExamplePolyData: PropTypes.func,
  expanded: PropTypes.string,
  handleExpanded: PropTypes.func,
  title: PropTypes.string,
  summaryText: PropTypes.string,
  examplePolygonGeojson: PropTypes.object,
  steps: PropTypes.array,
  mapCoordinates: PropTypes.array,
  examplePolygonLabel: PropTypes.string,
  examplePolygonCenter: PropTypes.array,
  zoom: PropTypes.number
};
