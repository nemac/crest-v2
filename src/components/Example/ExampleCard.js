import React, { useEffect } from 'react';

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
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import RectangleTwoToneIcon from '@mui/icons-material/RectangleTwoTone';

import { toggleLayer, toggleLegend, toggleCollapsed, initializeState } from '../../reducers/mapLayerListSlice';
import {
  changeZoom, changeCenter
} from '../../reducers/mapPropertiesSlice';
import { addNewFeatureToDrawnLayers } from '../../reducers/mapPropertiesSlice';
import { changeActiveTab } from '../../reducers/NavBarSlice';
import ExampleActionButton from './ActionButton';
import { flyToLocation } from './StepActions';
import { mapConfig } from '../../configuration/config';
import { center } from '@turf/turf';

const useStyles = makeStyles((theme) => ({
  CardBackground: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    color: theme.palette.CRESTGridBackground.contrastText,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px',
    height: '100%'
  },
  tempButtonBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.CRESTBlack.dark
  },
  EmptyStateBodyText: {
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: '0.9rem'
    }
  },
  titleText: {
    display: 'flex'
  },
  activeStep: {
    color: 'transparent',
    background: 'gray',
    borderColor: 'white',
    borderStyle: 'solid'
  },
  notActiveStep: {
    color: 'transparent',
    background: 'white',
    borderColor: 'white',
    borderStyle: 'solid'
  }
}));

// just a place holder needs props passed in and image etc
export default function ExampleCard(props) {
  const { map, examplePolyData, setExamplePolyData, expanded, handleExpanded, title, summaryText, geojson, 
    steps, mapCoordinates, examplePolygonLabel, examplePolygonCoords, examplePolygonCenter, zoom } = props;
  const classes = useStyles();
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
    dispatch(addNewFeatureToDrawnLayers(geojson.features[0]));
    dispatch(changeCenter(examplePolygonCenter));
    dispatch(changeZoom(zoom));
  };

  const CustomStepIcon = (props) => {
    const { active } = props;

    return (
        <RectangleTwoToneIcon
        className={clsx(classes.root, {
          [classes.activeStep]: active,
          [classes.notActiveStep]: !active
        })}/>
    );
  };

  // This use effect is responsible for doing all of the step actions as you move forward
  // or backwards in the examples. REMINDER THAT STEPS ARE ZERO BASED SO STEPS 1-7 ARE
  // [0,1 ,2 ,3, 4, 5,6] IN THE STEP LIST
  useEffect(() => {
    // reset to defaults when nothing is expanded
    if (!expanded) {
      setExamplePolyData(null);
      dispatch(initializeState());
    }

    const activeStepLayer = mapConfig.regions['Continental U.S'].layerList[steps[activeStep].layerIndex];
    const previousStepLayer = mapConfig.regions['Continental U.S'].layerList[steps[previousStep].layerIndex]

    // zero out the active and previous step if not expanded, toggle layer, and reset map
    if (map && expanded !== title) {
      setActiveStep(0);
      setPreviousStep(0);
      const defaultCenter = mapConfig.regions['Continental U.S'].mapProperties.center;
      const defaultZoom = mapConfig.regions['Continental U.S'].mapProperties.zoom;
      flyToLocation(map, defaultCenter, defaultZoom);
      if (activeStep >= 2) {
        dispatch(toggleLayer(activeStepLayer));
        dispatch(toggleLegend(activeStepLayer));
        dispatch(toggleCollapsed(activeStepLayer.ChartInputLabel));
      }
    }

    if (map && expanded === title) {
      if (activeStep === 0) {
        setExamplePolyData(null);
      }

      // Always draw poly and make sure you are at the correct location on the map
      if (activeStep >= 1) {
        flyToLocation(map, mapCoordinates, zoom);
        setExamplePolyData((previous) => ({ ...previous, label: examplePolygonLabel }));
        setExamplePolyData((previous) => ({ ...previous, coords: examplePolygonCoords }));
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
  }, [map, expanded, activeStep, setActiveStep, previousStep, setPreviousStep]);

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
        <Typography variant="h6" component="div" justifyContent="center" alignItems="center" p={1} className={classes.titleText} >
          {title}
        </Typography>
      </AccordionSummary>
      <Divider light sx={{ marginLeft: '6px', marginRight: '6px' }} />
      <AccordionDetails>
        <Grid container spacing={0} p={0} mt={1} mb={1} className={classes.contentBox}>
          <Grid item xs={12} >
            <Typography variant="body1" component="div" justifyContent="center" alignItems="center" p={1} className={classes.titleText} >
              {summaryText}
            </Typography>
            {/* <Divider sx={{ marginLeft: '6px', marginRight: '6px' }} /> */}
          </Grid>
          <Typography align='center' sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Grid item xs={12} >
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep} nonLinear={true}>
                {steps.map((item) => (
                  <Step key={item.title}>
                    <StepLabel StepIconComponent={CustomStepIcon}/>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid>
          <Grid item xs={12} >
            <Box sx={{ height: '175px' }}>
              <Typography>
                {steps[activeStep].title}
              </Typography>
              <Typography>
                {steps[activeStep].text}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3} >
            {activeStep !== 0 ? (
              <ExampleActionButton
                buttonLabel={'Previous'}
                buttonName={'Previous'}
                onClick={handlePrevious}>
                <ArrowCircleLeftIcon/>
              </ExampleActionButton>
            ) : (
             <div> </div>)}
          </Grid>
          <Grid item xs={3}>
            <ExampleActionButton
              buttonLabel={'View in CREST'}
              buttonName={'View in CREST'}
              onClick={viewExampleOnMap}>
              <MapIcon/>
            </ExampleActionButton>
          </Grid>
          <Grid item xs={3}>
            {activeStep !== steps.length - 1 ? (
              <ExampleActionButton
                buttonLabel={'Next'}
                buttonName={'Next'}
                onClick={handleNext}>
                <ArrowCircleRightIcon/>
              </ExampleActionButton>
            ) : (
             <div> </div>)}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
