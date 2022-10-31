// import React, { useEffect } from 'react';

// eslint-disable-next-line no-unused-vars
import { betaZonalStatsEndpoint, prodZonalStatsEndpoint } from '../configuration/config';

export const zonalStatsAPI = async (geojson) => {
  // uncomment the endpoint you want to use and comment out the other
  let endpoint = betaZonalStatsEndpoint;
  // const endpoint = prodZonalStatsEndpoint;

  // region hardcoded to US for now
  // TODO: FIX FIX FIX FIX FIX FIX
  const region = '?region=continental_us';
  endpoint += region;

  await fetch(endpoint, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(geojson)
  })
    .then((response) => response.json())
    .then((data) => {
      const actualData = data.features[0].properties.mean;
      console.log('Success:', actualData);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
