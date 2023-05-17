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
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popup } from 'react-leaflet';
import * as L from 'leaflet';
import { Button } from '@mui/material/';
import AddchartIcon from '@mui/icons-material/Addchart';
import { geosearch } from 'esri-leaflet-geocoder';
import * as ELG from 'esri-leaflet-geocoder';
import LeafletDrawTools from './LeafletDrawTools';

import {
  addNewFeatureToDrawnLayers,
  uploadedShapeFileGeoJSON,
  addNewFeatureToZonalStatsAreas,
  addSearchPlacesGeoJSON
} from '../../reducers/mapPropertiesSlice';

export default function SearchPlaces(props) {
  const { map, leafletFeatureGroupRef } = props;
  console.log('map is ', map);
  console.log('at dereference: ', leafletFeatureGroupRef)
  const dispatch = useDispatch();
  const apiKey = 'AAPKa0a45bdbd847441badbdcf07a97939bd0Y1Vpjt3MU7qyu7R9QThGqpucpKmbVXGEdmQo1hqhdjLDKA2zrwty2aeDjT-7-By';
  const GeoSearchOptions = {
    providers: [
      ELG.arcgisOnlineProvider({
        // API Key to be passed to the ArcGIS Online Geocoding Service
        apikey: apiKey
      })
    ],
    useMapBounds: false,
    expanded: false,
    placeholder: 'Search for places or addresses',
    collapseAfterResult: false,
    allowMultipleResults: false,
    attribution: 'Powered by ESRI'
  };

  const identifyDataRef = useRef(null);
  const [popupContent, setPopupContent] = useState(null);

  const searchControlRef = useRef(null);

  const handleGetAreaStatistics = useCallback(() => {
    const thisArea = L.circle(identifyDataRef.current, { radius: 1000 });
    const asGJSON = thisArea.toGeoJSON();
    dispatch(addSearchPlacesGeoJSON(asGJSON));
  }, [dispatch]);

  const handleOnSearchResuts = useCallback((data) => {
    console.log('Search results', data);
    console.log('inside search results ', map);
    identifyDataRef.current = data.latlng;
    console.log('identify ref is currently: ', identifyDataRef.current);

    setPopupContent(
      <Popup position={identifyDataRef.current} onClose={() => setPopupContent(null)}>
        <div>
          <h2>{data.results[0].text}</h2>
          <p><Button
            variant="contained"
            color="CRESTPrimary"
            onClick={handleGetAreaStatistics}
          ><AddchartIcon /> Get Statistics for this location</Button></p>
        </div>
      </Popup>
    );
  }, [handleGetAreaStatistics, map]);
  useEffect(() => {
    if (!map) { return; }

    if (!searchControlRef.current) {
      const searchControl = geosearch(GeoSearchOptions);
      searchControl.addTo(map);
      searchControlRef.current = searchControl;

      searchControlRef.current.on('results', handleOnSearchResuts);
      // return () => {
        // searchControlRef.current.off('results', handleOnSearchResuts);
      // };
    }
  }, [GeoSearchOptions, handleOnSearchResuts, map]);

  return (
    <>
      {popupContent}
    </>
  );
  // return (
  //   isSearched ? <div /> : <ShowIdentifyPopup map={map} selectedRegion={identifyData} />

  // );
}
