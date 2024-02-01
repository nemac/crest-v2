import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as L from 'leaflet';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Alert from '@mui/material/Alert';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

import BasemapLayer from './BasemapLayer';
import LeafletMapContainer from './LeafletMapContainer';
import EditControlFC from './EditShapefileControl';
import GenericMapHolder from './GenericMapHolder';
import ShapeActionButton from './ShapeActionButton';


import { uploadedShapeFileGeoJSON } from '../../reducers/mapPropertiesSlice';
import { download } from '@crmackey/shp-write';

const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedCenterSelector = (state) => state.mapProperties.center;

const StyledBox = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%', 
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px',
  overflowY: 'scroll'
}));

export default function ShapeFileCorrectionMap(props) {
  const {
    setMap, map, geoToRedraw, setGeoToRedraw
  } = props;

  const dispatch = useDispatch();
  const center = useSelector(selectedCenterSelector, () => true);
  const zoom = useSelector(selectedZoomSelector, () => true);
  const [localGeo, setLocalGeo] = useState(geoToRedraw);
  const [activeStep, setActiveStep] = useState(0);
  const [updateSteps, setUpdateSteps] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  // // Kinda ugly way to do it, maybe we should pass batchSize down to here and leafletDrawTools
  // // TODO: This was originally written to be batched but decided we can just send it all at once.
  // // it's easier to just set this batch to a ridiculous size for now and hopefully fix later
  // const batchSize = 1000000;
  const mapRef = useRef(null); // For edit controls
  const steps = useRef([]); // our dataset that needs to be fixed
  const geoToReturn = useRef(geoToRedraw);
  // We slice into steps for batching, start and end indices are for slicing
  const endIndex = useRef(steps.current.length);
  const startIndex = useRef(0);
  // numberInvalid is displayed to user and safeguards returning bad shapes
  // eslint-disable-next-line max-len
  const numberInvalid = steps.current?.slice(startIndex.current, endIndex.current + 1).filter((step) => step.isValid === false).length;
  const numberNotFixed = steps.current?.slice(startIndex.current, endIndex.current + 1).filter((step) => step.isFixed === false).length;
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

  const btnClickEdit = (e) => {
    // This works but its a bad pattern for react. But I dont care it works and I dont 
    // want to spend more time figureit out
    const editButton = document.querySelector('.leaflet-draw-edit-edit');
    if (editButton) {
      editButton.click();
      setIsEdit(true);
    }
  };

  const btnClickCancel = (e) => {
    // This works but its a bad pattern for react. But I dont care it works and I dont 
    // want to spend more time figureit out
    const cancelButton = document.querySelector('a[title="Cancel editing, discards all changes"]');
    if (cancelButton) {
      cancelButton.click();
      setIsEdit(false);
    }
  };

  const btnClickSave = (e) => {
    // This works but its a bad pattern for react. But I dont care it works and I dont 
    // want to spend more time figureit out
    const saveButton = document.querySelector('a[title="Save changes"]');
    if (saveButton) {
      saveButton.click();
      // setActiveStep(0);
      setIsEdit(false);
    }
  };

  const btnClickDelete = (e) => {
    // This works but its a bad pattern for react. But I dont care it works and I dont 
    // want to spend more time figureit out
    const deleteButton = document.querySelector('.leaflet-draw-edit-remove');
    if (deleteButton) {
      deleteButton.click();
      // setActiveStep(0);
      setIsEdit(true);
    }

    // again not the best approach but I cannot get anything else to work and I am out of time
    const center = map.getCenter();
    map.fireEvent('click', {
      latlng: center,
      layerPoint: map.latLngToLayerPoint(center),
      containerPoint: map.latLngToContainerPoint(center),
      originalEvent: {
        target: map,
      },
    }); 

    // again not the best approach but I cannot get anything else to work and I am out of time
    // Check if there's any polygon at the center coordinates and trigger click on it
    const layers = map._layers; // Access all layers on the map
    for (const key in layers) {
      const layer = layers[key];
      if (layer instanceof L.Polygon && layer.getBounds().contains(center)) {
        // If it's a polygon and its bounds contain the center coordinates
        layer.fireEvent('click');
      }
    }

    // again not the best approach but I cannot get anything else to work and I am out of time
    const saveButton = document.querySelector('a[title="Save changes"]');
    if (saveButton) {
      saveButton.click();
      setIsEdit(false);
    }
  };
  
  const isCurrentFixed = steps.current[activeStep]?.isFixed;
  const isCurrentDeleted = (steps.current[activeStep]?.howFixedText === 'DELETED');

  return (
    <GenericMapHolder
      leftColumn={
        <StyledBox>
          <Grid container>
            <Grid xs={12} >
              { numberNotFixed === 0 ? (
              <Alert severity={'success'} sx={{backgroundColor: '#444444'}}>
                All issues have been resolved.
              </Alert>
              ) : (
              <Alert severity={'warning'} sx={{backgroundColor: '#444444'}}>
                While importing your shapefile we found {numberInvalid} {numberInvalid < 2 ? ' area with an issue' : ' areas with isssues'}. 
              </Alert>
              ) }
            </Grid>
            <Grid container spacing={0} px={1} pt={2} pb={2} m={0} sx={{ width: '100%' }}>

              <Grid container spacing={0} p={0} mt={2} mb={0} mx={0} sx={{ width: '100%' }} style={{backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'}}>
                <Grid xs={12} md={3}>
                    <ShapeActionButton
                      buttonLabel={'Back'}
                      buttonName={'Back'}
                      onClick={handlePrevious}
                      buttonDisabled={activeStep === startIndex.current}
                      isIconFirst={true}>
                      <ArrowCircleLeftIcon />
                    </ShapeActionButton>
                </Grid>
                <Grid xs={12} md={6} sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center' }} >
                  {activeStep+1} / {numberInvalid}
                </Grid>
                <Grid xs={12} md={3}>
                    <ShapeActionButton
                      buttonLabel={'Next'}
                      buttonName={'Next'}
                      onClick={handleNext}
                      buttonDisabled={activeStep === endIndex.current}
                      isIconFirst={false}>
                      <ArrowCircleRightIcon />
                    </ShapeActionButton>
                </Grid>
              </Grid>

            </Grid>         
            <Grid container spacing={0} px={2} pt={2} pb={1} m={0} sx={{ width: '100%' }}>
              <Grid xs={12} px={2} pt={0} pb={0}>
                <Box >
                  <Typography variant="h6" component="div">
                    Area {activeStep+1}
                  </Typography>
                  {isCurrentFixed ? (<></>) : (
                  <Typography variant="h7" component="div">
                    Please review and resolve the issues
                  </Typography>)}
                </Box>
              </Grid>          
              <Grid xs={12} px={2} pt={0} pb={0}>
                {isCurrentFixed ? (
                  isCurrentDeleted ? (
                    <Box>
                      <Alert severity="success">
                        <strong>{steps.current[activeStep]?.howFixedText}</strong>
                      </Alert>
                    </Box>
                  ) : (                  
                    <Box>
                      <Alert severity="success">
                        <strong>{steps.current[activeStep]?.howFixedText}</strong>
                      </Alert>
                    </Box>
                  )
                ) : (
                  <Box>
                    <Alert severity="error">
                      {steps.current[activeStep]?.invalidText}
                      <br />    
                      {steps.current[activeStep]?.fixStatus} {steps.current[activeStep]?.fixStatusGoal}
                    </Alert>
                  </Box>
                )}
              </Grid>           
              <Grid xs={12} px={2} pt={2} pb={0}>
                <Box >
                  <Accordion style={{ padding: 0}} >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header">
                      Tips fix this area
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" component="p">
                        {steps.current[activeStep]?.fixText}                      
                      </Typography>                     
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Grid>              
            </Grid>         
          </Grid>
          <Grid container spacing={0} px={2} pt={1} pb={2} m={0} sx={{ width: '100%' }} >
            <Grid xs={12} px={2} pt={2} pb={0}
              style={{
                backgroundImage: isEdit ? 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))' : null
              }}>
              <Button
                variant="contained"
                color="CRESTPrimary"
                aria-label={"edit"}
                fullWidth={true}
                onClick={btnClickEdit}
                style={{display: numberNotFixed > 0 ? 'inline-flex' : 'none' }}>
                  <EditIcon style={{paddingRight: '8px'}}/>
                  Edit area
              </Button>
            </Grid>
            <Grid container spacing={0} px={3} pt={1} pb={2} m={0} 
              sx={{ width: '100%' }}
              style={{
                display: isEdit ? 'inline-flex' : 'none',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'
              }}
              >
              <Grid xs={12} md={6} px={1} pt={2} pb={0}>
                <Button
                  variant="contained"
                  color="CRESTSecondary"
                  aria-label={"Save"}
                  fullWidth={true}
                  onClick={btnClickSave}
                  style={{display: isEdit ? 'inline-flex' : 'none', fontSize: '0.775rem' }}>
                    <SaveIcon style={{paddingRight: '8px'}}/>
                    Save edits
                </Button>
              </Grid>          
              <Grid xs={12} md={6} px={1} pt={2} pb={0}>
              < Button
                  variant="contained"
                  color="CRESTSecondary"
                  aria-label={"Cancel"}
                  fullWidth={true}
                  onClick={btnClickCancel}
                  style={{display: isEdit ? 'inline-flex' : 'none', fontSize: '0.775rem' }}>
                    <CancelIcon style={{paddingRight: '8px'}}/>
                    Cancel edits
                </Button>
              </Grid>              
            </Grid>
            <Grid xs={12} md={12} px={2} pt={2} pb={0}>
              <Button
                variant="contained"
                color="CRESTPrimary"
                aria-label={"Delete"}
                fullWidth={true}
                onClick={btnClickDelete}
                style={{display: numberNotFixed > 0 ? 'inline-flex' : 'none' }}>
                  <DeleteForeverIcon style={{paddingRight: '8px'}}/>
                  Delete area
              </Button>
            </Grid>               
            <Grid container spacing={0} p={0} mt={2} mb={0} mx={0} sx={{ width: '100%' }} style={{backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'}}>
              <Grid xs={12} md={3}>
                  <ShapeActionButton
                    buttonLabel={'Back'}
                    buttonName={'Back'}
                    onClick={handlePrevious}
                    buttonDisabled={activeStep === startIndex.current}
                    isIconFirst={true}>
                    <ArrowCircleLeftIcon />
                  </ShapeActionButton>
              </Grid>
              <Grid xs={12} md={6} sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center' }} >
                {activeStep+1} / {numberInvalid}
              </Grid>
              <Grid xs={12} md={3}>
                  <ShapeActionButton
                    buttonLabel={'Next'}
                    buttonName={'Next'}
                    onClick={handleNext}
                    buttonDisabled={activeStep === endIndex.current}
                    isIconFirst={false}>
                    <ArrowCircleRightIcon />
                  </ShapeActionButton>
              </Grid>
            </Grid>

            <Grid xs={12} px={1} pt={2} pb={0}>
              <Button
                variant="contained"
                color="CRESTCta"
                aria-label={"Save"}
                fullWidth={true}
                style={{display: numberNotFixed === 0 ? 'inline-flex' : 'none' }}
                onClick={() => {
                  setGeoToRedraw(null);
                  dispatch(uploadedShapeFileGeoJSON(geoToReturn.current));
                }}>
                  <FileUploadOutlinedIcon style={{paddingRight: '8px'}}/>
                  Complete the upload
              </Button>
            </Grid>
            <Grid xs={12} px={1} pt={2} pb={0}>
              <Button
                variant="contained"
                color="CRESTPrimary"
                aria-label={"Save"}
                fullWidth={true}
                style={{display: numberNotFixed === 0 ? 'inline-flex' : 'none' }}
                onClick={() => download(geoToReturn.current)}>
                  <DownloadIcon style={{paddingRight: '8px'}}/>
                  Download the shapefile (with edits)
              </Button>
            </Grid>
          </Grid>
        </StyledBox>
      }
      mapCard={
        <LeafletMapContainer center={center} zoom={zoom} mapRef={mapRef} innerRef={setMap}>
          <EditControlFC
            position="topleft"
            localGeo={localGeo}
            setLocalGeo={setLocalGeo}
            startIndex={startIndex}
            geoToReturn={geoToReturn}
            setIsEdit={setIsEdit}
            steps={steps}
            endIndex={endIndex}
            updateSteps={updateSteps}
            setUpdateSteps={setUpdateSteps}
            setActiveStep={setActiveStep}
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
