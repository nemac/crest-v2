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
import React, { useEffect, useState, useRef } from 'react';
import { Popup } from 'react-leaflet';
import L from 'leaflet';
import { Button, IconButton } from '@mui/material/';

import { geosearch } from 'esri-leaflet-geocoder';
import * as ELG from 'esri-leaflet-geocoder';
import ShowIdentifyPopup from './Identify';
import { makeStyles } from '@mui/styles';
import InfoIcon from '@mui/icons-material/Info';

export default function SearchPlaces(props) {
  const { map } = props;

  let identifyData = null;
  const apiKey = 'AAPKa0a45bdbd847441badbdcf07a97939bd0Y1Vpjt3MU7qyu7R9QThGqpucpKmbVXGEdmQo1hqhdjLDKA2zrwty2aeDjT-7-By';
  const [popupContent, setPopupContent] = useState(null);
  const searchControlRef = useRef(null);


  const handleOnSearchResuts = (data) => {
    console.log('Search results', data);
    identifyData = data.latlng;
    console.log(identifyData);

    setPopupContent(
      <Popup position={identifyData} onClose={() => setPopupContent(null)}>
        <div>
          <h2>{data.results[0].text}</h2>
          <p><IconButton
            variant="contained"
            aria-label="Close"
            color="CRESTSecondary"
            onClick={(() => console.log('clicked identify!'))}>
            <InfoIcon />
          </IconButton>
            <Button
              variant="contained"
              color="CRESTPrimary"
              onClick={(() => console.log('clicked explore!'))}
            >Explore</Button></p>
        </div>
      </Popup>
    );
  };
  useEffect(() => {
    if (!map) { return; }

    if (!searchControlRef.current) {
      const searchControl = geosearch({
        providers: [
          ELG.arcgisOnlineProvider({
            // API Key to be passed to the ArcGIS Online Geocoding Service
            apikey: apiKey
          })
        ]
      });
      searchControl.addTo(map);
      searchControlRef.current = searchControl;


      searchControlRef.current.on('results', handleOnSearchResuts);
      return () => {
        searchControlRef.current.off('results', handleOnSearchResuts);
      }
    }
  }, [handleOnSearchResuts, map]);

  return (
    <>
      {popupContent}
    </>
  );
  // return (
  //   isSearched ? <div /> : <ShowIdentifyPopup map={map} selectedRegion={identifyData} />

  // );
}
