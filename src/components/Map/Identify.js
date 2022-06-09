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
import { betaIdentifyEndpoint, prodIdentifyEndpoint, mapConfig } from '../../configuration/config';

export default function Identify(lat, lng, selectedRegion){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});
  const endPoint = betaIdentifyEndpoint
  const fetchPoint = endPoint+"?lat="+lat+"&lng="+lng+"&region="+mapConfig.regions[selectedRegion].regionName

  /*const fetchData = async () => {
    setIsLoaded(false);
    await fetch(fetchPoint)
    .then(response => {
      return response.json()
    })
    .then(data =>{
      setIsLoaded(true);
      setItems(data);
    })
  }

  useEffect(() => {
    fetchData();
  }, [lat, lng])

  if (!isLoaded) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <ul>
        {Object.keys(items).map(item => 
          <li key={item}>{item} : {items[item]}</li>
        )}
      </ul>
    </div>
  )*/
  return (
    <div>
      Hello World
    </div>
  )
}
