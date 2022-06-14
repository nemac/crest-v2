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
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeIdentifyCoordinates, changeIdentifyResults, changeIdentifyIsLoaded } from '../../reducers/mapPropertiesSlice';
import { betaIdentifyEndpoint, prodIdentifyEndpoint, mapConfig } from '../../configuration/config';

//const dispatch = useDispatch;

export const IdentifyAPI = async (dispatch, coordinates, selectedRegion) => {
  // uncomment the endpoint you want to use and comment out the other
  const endPoint = betaIdentifyEndpoint;
  //const endpoint = prodIdentifyEndpoint;
  const lat = coordinates.lat
  const lng = coordinates.lng
  const fetchPoint = endPoint+"?lat="+lat+"&lng="+lng+"&region="+mapConfig.regions[selectedRegion].regionName

  dispatch(changeIdentifyIsLoaded(false));
  return await fetch(fetchPoint)  
  .then(response => {
    return response.json()
  })
  .then(data =>{
    console.log(data)
    dispatch(changeIdentifyIsLoaded(true));
    dispatch(changeIdentifyResults(data));
  })
}

export default function Identify(props){
  const { identifyIsLoaded, identifyItems, coordinates, selectedRegion } = props;
  dispatch(changeIdentifyCoordinates([coordinates.lat, coordinates.lng]));
  // uncomment the endpoint you want to use and comment out the other
  const endPoint = betaIdentifyEndpoint;
  //const endpoint = prodIdentifyEndpoint;
  // fetchPoint will look similar to: 
  //https://rlwk45u34h.execute-api.us-east-1.amazonaws.com/beta/identify/?lat=32.819580976242975&lng=-80.11869138513946&region=continental_us
  const fetchPoint = endPoint+"?lat="+lat+"&lng="+lng+"&region="+mapConfig.regions[selectedRegion].regionName

  const fetchData = async () => {
    dispatch(changeIdentifyIsLoaded(false));
    await fetch(fetchPoint)
    .then(response => {
      return response.json()
    })
    .then(data =>{
      dispatch(changeIdentifyIsLoaded(true));
      dispatch(changeIdentifyResults(data));
    })
  }

  //useEffect(() => {
   // fetchData();
  //}, [lat, lng])

  if (!identifyIsLoaded) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <ul>
        {Object.keys(identifyItems).map(item => 
          <li key={item}>{item} : {identifyItems[item]}</li>
        )}
      </ul>
    </div>
  )
}
