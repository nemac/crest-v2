// import React, { useEffect } from 'react';

// eslint-disable-next-line no-unused-vars
import { mapConfig, betaZonalStatsEndpoint, prodZonalStatsEndpoint } from '../configuration/config';

export const zonalStatsAPI = async (geojson, selectedRegion) => {
  // uncomment the endpoint you want to use and comment out the other
  let endpoint = betaZonalStatsEndpoint;
  // const endpoint = prodZonalStatsEndpoint;

  const regionQueryString = `?region=${mapConfig.regions[selectedRegion].regionName}`;
  endpoint += regionQueryString;

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
      // eslint-disable-next-line no-console
      console.log('Success:', actualData);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
    });
};
