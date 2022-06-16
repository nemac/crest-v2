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
import { Popup } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { changeIdentifyResults, changeIdentifyIsLoaded } from '../../reducers/mapPropertiesSlice';
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

export default function ShowIdentifyPopup(props) {
  const { selectedRegion } = props;
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

  if (!identifyCoordinates) {
    return null;
  }

  if (!identifyIsLoaded) {
    return (
      <Popup position={identifyCoordinates} autoPan={false}>
        Loading...
      </Popup>
    );
  }

  return (
    <Popup position={identifyCoordinates} autoPan={false}>
      <ul>
        {Object.keys(items).map((item) => <li key={item}>{item} : {items[item]}</li>)}
      </ul>
    </Popup>
  );
}

ShowIdentifyPopup.propTypes = {
  selectedRegion: PropTypes.string
};
