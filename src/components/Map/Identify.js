/*
Purpose
  When a user clicks on the map gets the stats for that point
    we were going to to the hole hub but the idea of hub as selecable element
    is going away its just a hex so we cannot do that

    is a leaflet button so needs access to leaflet object can be a challenge in React

    handle errors:
      - Nothing returned
      - HTTP Error

Child Components
  - None

Libs
  - leaflet

API
  - indentify

State needed
  - indentify GEOJSON returned from API

Props
  - Not sure yet
*/
import React, { useEffect } from 'react';
import { Popup, CircleMarker } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

import { 
  changeIdentifyCoordinates,
  changeIdentifyResults,
  changeIdentifyIsLoaded
} from '../../reducers/mapPropertiesSlice';
// eslint-disable-next-line no-unused-vars
import { betaIdentifyEndpoint, prodIdentifyEndpoint, mapConfig } from '../../configuration/config';

export const IdentifyAPI = async (dispatch, coordinates, selectedRegion) => {
  // uncomment the endpoint you want to use and comment out the other
  const endPoint = betaIdentifyEndpoint;
  // const endpoint = prodIdentifyEndpoint;
  const lat = coordinates.lat;
  const lng = coordinates.lng;
  const fetchPoint = `${endPoint}?lat=${lat}&lng=${lng}&region=${mapConfig.regions[selectedRegion].regionName}`;

  dispatch(changeIdentifyIsLoaded(false));
  await fetch(fetchPoint)
    .then((response) => (
      response.json()
    ))
    .then((data) => {
      dispatch(changeIdentifyIsLoaded(true));
      dispatch(changeIdentifyResults(data));
    });
};

const useStyles = makeStyles((theme) => ({
  indentifyPopup: {
    bottom: '-22px !important',
    left: '-308px !important',
    '& .leaflet-popup-content-wrapper': {
      padding: `${theme.spacing(1)} !important`,
      borderRadius: `${theme.spacing(0.5)} !important`,
      backgroundColor: `${theme.palette.CRESTGridBackground.dark} !important`,
      color: `${theme.palette.CRESTGridBackground.contrastText} !important`,
      border: `1px solid ${theme.palette.CRESTBorderColor.main} !important`,
      width: '310px !important',
      height: '215px !important',
      overflow: 'clip !important'
    },
    '& .leaflet-popup-content': {
      margin: '0px !important'
    },
    '& .leaflet-popup-tip': {
      width: '0px !important',
      height: '0px !important'
    },
    '& a.leaflet-popup-close-button': {
      paddingTop: '2px !important',
      paddingLeft: '3px !important',
      borderRadius: '20px !important',
      width: '20px !important',
      height: '20px !important',
      top: '15px !important',
      right: '10px !important',
      backgroundColor: `${theme.palette.CRESTLight.main} !important`,
      color: `${theme.palette.CRESTLight.contrastText} !important`
    }
  },
  valueName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  value: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '2rem'

  }
}));

export default function ShowIdentifyPopup(props) {
  const { selectedRegion, map } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const identifyItemsSelector = (state) => state.mapProperties.identifyResults;
  const identifyIsLoadedSelector = (state) => state.mapProperties.identifyIsLoaded;
  const identifyCoordinatesSelector = (state) => state.mapProperties.identifyCoordinates;
  // identifyItems is items in order to shorten it for the .map function below. Yay linter errors.
  const items = useSelector(identifyItemsSelector);
  const identifyIsLoaded = useSelector(identifyIsLoadedSelector);
  const identifyCoordinates = useSelector(identifyCoordinatesSelector);

  useEffect(() => {
    if (!identifyCoordinates) {
      return;
    }
    IdentifyAPI(dispatch, identifyCoordinates, selectedRegion);
  }, [dispatch, identifyCoordinates, selectedRegion]);

  const closePopups = () => {
    map.closePopup();
    dispatch(changeIdentifyIsLoaded(false));
    dispatch(changeIdentifyResults(null));
    dispatch(changeIdentifyCoordinates(null));
  };

  if (!identifyCoordinates) {
    return null;
  }

  if (!identifyIsLoaded) {
    return (
        <div>
          <Popup
            position={identifyCoordinates}
            autoPan={false}
            className={classes.indentifyPopup}
            closeButton={false}
          >
            <Typography variant="h6" component="div" align="center" gutterBottom>
              Map Information
              <button onClick={closePopups}>Close</button>
            </Typography>
            <Divider />
            <Grid container spaceing={2} justifyContent="start" alignItems="start" pt={1.5}>
              <Grid item xs={12}>
                <Typography variant="h6" component="div" align="center" gutterBottom>
                  Loading...
                </Typography>
              </Grid>
            </Grid>
          </Popup>
          <CircleMarker
              center={{ lat: identifyCoordinates.lat, lng: identifyCoordinates.lng }}
              fillColor='#444444'
              color='#555555'
              fillOpacity='0.9'
              radius={5} />
        </div>
    );
  }

  return (
    <div>
      <Popup
        position={identifyCoordinates}
        autoPan={false}
        closeButton={false}
        className={classes.indentifyPopup}
      >
        <Typography variant="h6" component="div" align="center" gutterBottom>
          Map Information
          <button onClick={closePopups}>Close</button>
        </Typography>
        <Divider />
        <Grid container spaceing={2} pt={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6" component="div" align="center" gutterBottom>
              Need Graph here
            </Typography>
          </Grid>
          <Grid item xs={2.4}>
            <Box className={classes.valueName}>
              Hubs
            </Box>
            <Box className={classes.value}>
              {items.hubs === '255' ? '-' : items.hubs }
            </Box>
          </Grid>
          <Grid item xs={2.4}>
            <Box className={classes.valueName}>
              Exposure
            </Box>
            <Box className={classes.value}>
              {items.exposure === '255' ? '-' : items.exposure }
            </Box>
          </Grid>
          <Grid item xs={2.4}>
            <Box className={classes.valueName}>
              Asset
            </Box>
            <Box className={classes.value}>
              {items.asset === '255' ? '-' : items.asset }
            </Box>
          </Grid>
          <Grid item xs={2.4}>
            <Box className={classes.valueName}>
              Threat
            </Box>
            <Box className={classes.value}>
              {items.threat === '255' ? '-' : items.threat }
            </Box>
          </Grid>
          <Grid item xs={2.4}>
            <Box className={classes.valueName}>
              Wildlife
            </Box>
            <Box className={classes.value}>
              {items.wildlife === '255' ? '-' : items.wildlife }
            </Box>
          </Grid>
        </Grid>
      </Popup>
      <CircleMarker
          center={{ lat: identifyCoordinates.lat, lng: identifyCoordinates.lng }}
          fillColor='#444444'
          color='#555555'
          fillOpacity='0.9'
          radius={5} />
      </div>
  );
}

ShowIdentifyPopup.propTypes = {
  selectedRegion: PropTypes.string
};
