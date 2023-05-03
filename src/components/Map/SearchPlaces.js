/*
Purpose
  Search for places and locations we will use ESRI's
  version since the liscenesing works best.
  will make a custom component appear for searching
  will require a esri leaflet plugin think its called geocodeone

Child Components
  - map.js

Libs
  - esrileaflet geocoding or something like that

API
  - leaflet

State needed
  - Not sure yet

Props
  Not sure yet
*/
import React, { useEffect } from 'react';
import L from 'leaflet';
import { geosearch } from 'esri-leaflet-geocoder';
import * as ELG from 'esri-leaflet-geocoder';

export default function SearchPlaces(props) {
  const { map } = props;
  const apiKey = 'AAPKa0a45bdbd847441badbdcf07a97939bd0Y1Vpjt3MU7qyu7R9QThGqpucpKmbVXGEdmQo1hqhdjLDKA2zrwty2aeDjT-7-By';
  const handleOnSearchResuts = (data) => {
    console.log('Search results', data);
  };
  useEffect(() => {
    if (!map) { return; }
    const searchControl = geosearch({
      providers: [
        ELG.arcgisOnlineProvider({
          // API Key to be passed to the ArcGIS Online Geocoding Service
          apikey: apiKey
        })
      ]
    });
    searchControl.addTo(map);

    searchControl.on('results', handleOnSearchResuts);
    return () => {
      searchControl.off('results', handleOnSearchResuts);
    }
  }, [map]);

  return (
    <div />
  );
}
