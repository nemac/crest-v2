import React, {
  useState, useRef, useCallback
} from 'react';
import { useDispatch } from 'react-redux';
import { Popup } from 'react-leaflet';
import * as L from 'leaflet';
import { Button } from '@mui/material/';
import AddchartIcon from '@mui/icons-material/Addchart';
import PropTypes from 'prop-types';
import * as turf from '@turf/turf';
import EsriLeafletGeoSearch from 'react-esri-leaflet/plugins/EsriLeafletGeoSearch';

import '../../css/SearchPlaces.css';
import { addSearchPlacesGeoJSON } from '../../reducers/mapPropertiesSlice';

const apiKey = 'AAPKa0a45bdbd847441badbdcf07a97939bd0Y1Vpjt3MU7qyu7R9QThGqpucpKmbVXGEdmQo1hqhdjLDKA2zrwty2aeDjT-7-By';

export default function SearchPlaces(props) {
  const { map } = props;
  const dispatch = useDispatch();

  const identifyDataRef = useRef(null);
  const [popupContent, setPopupContent] = useState(null);

  const handleGetAreaStatistics = useCallback(() => {
    const circle = L.circle(identifyDataRef.current, { radius: 1000 });
    const centerLatLng = circle.getLatLng();
    const center = [centerLatLng.lng, centerLatLng.lat];
    const radius = circle.getRadius();
    // Turf Circle
    const options = { steps: 32, units: 'meters' };
    const turfCircle = turf.circle(center, radius, options);
    dispatch(addSearchPlacesGeoJSON(turfCircle));
    setPopupContent(null);
  }, [dispatch]);

  const handleOnSearchResults = useCallback((data) => {
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

  if (!map) {
    return (null);
  }

  return (
    <>
      <EsriLeafletGeoSearch
        position="topleft"
        useMapBounds={false}
        attribution='Powered by ESRI'
        providers={{
          arcgisOnlineProvider: {
            token: apiKey,
            label: 'ArcGIS Online Results',
            maxResults: 10
          }
        }}
        eventHandlers={{
          results: (r) => handleOnSearchResults(r)
        }}
      />
      {popupContent}
    </>
  );
}

SearchPlaces.propTypes = {
  map: PropTypes.object
};
