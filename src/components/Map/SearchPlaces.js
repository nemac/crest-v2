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
import React, {
  useEffect, useState, useRef, useCallback
} from 'react';
import { useDispatch } from 'react-redux';
import { Popup } from 'react-leaflet';
import * as L from 'leaflet';
import { Button } from '@mui/material/';
import AddchartIcon from '@mui/icons-material/Addchart';
import { geosearch } from 'esri-leaflet-geocoder';
import PropTypes from 'prop-types';
import * as ELG from 'esri-leaflet-geocoder';
import * as turf from '@turf/turf';

import { addSearchPlacesGeoJSON } from '../../reducers/mapPropertiesSlice';

export default function SearchPlaces(props) {
  const { map } = props;
  const dispatch = useDispatch();
  const apiKey = 'AAPKa0a45bdbd847441badbdcf07a97939bd0Y1Vpjt3MU7qyu7R9QThGqpucpKmbVXGEdmQo1hqhdjLDKA2zrwty2aeDjT-7-By';

  const identifyDataRef = useRef(null);
  const [popupContent, setPopupContent] = useState(null);

  const searchControlRef = useRef(null);

  const handleGetAreaStatistics = useCallback(() => {
    const circle = L.circle(identifyDataRef.current, { radius: 1000 });
    const centerLatLng = circle.getLatLng();
    const center = [centerLatLng.lng, centerLatLng.lat];
    const radius = circle.getRadius();
    // Turf Circle
    const options = { steps: 32, units: 'meters' };
    const turfCircle = turf.circle(center, radius, options);
    const newTurfCircle = new L.GeoJSON(turfCircle);
    const asGJSON = newTurfCircle.toGeoJSON();
    dispatch(addSearchPlacesGeoJSON(asGJSON));
  }, [dispatch]);

  const handleOnSearchResuts = useCallback((data) => {
    identifyDataRef.current = data.latlng;

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
  }, [handleGetAreaStatistics]);

  useEffect(() => {
    if (!map) { return; }

    if (!searchControlRef.current) {
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
      const searchControl = geosearch(GeoSearchOptions);
      searchControl.addTo(map);
      searchControlRef.current = searchControl;

      searchControlRef.current.on('results', handleOnSearchResuts);
      // return () => {
      // searchControlRef.current.off('results', handleOnSearchResuts);
      // };
    }
  }, [handleOnSearchResuts, map]);

  return (
    <>
      {popupContent}
    </>
  );
}

SearchPlaces.propTypes = {
  map: PropTypes.object
};
