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
import L from 'leaflet';
import { Button } from '@mui/material/';
import AddchartIcon from '@mui/icons-material/Addchart';
import { geosearch } from 'esri-leaflet-geocoder';
import * as ELG from 'esri-leaflet-geocoder';
import { makeStyles } from '@mui/styles';
import InfoIcon from '@mui/icons-material/Info';
import ShowIdentifyPopup from './Identify';
import {
  addNewFeatureToDrawnLayers,
  uploadedShapeFileGeoJSON,
  addNewFeatureToZonalStatsAreas
} from '../../reducers/mapPropertiesSlice';

export default function SearchPlaces(props) {
  const { map, leafletDrawFeatureGroupRef } = props;
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

  let identifyData = null;
  const [popupContent, setPopupContent] = useState(null);

  const searchControlRef = useRef(null);
  // const searchLocation = useRef(null);

  function circleToFeature(circle) {
    const center = circle.getLatLng();
    const radius = circle.getRadius();
    const feature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [center.lng, center.lat]
      },
      properties: {
        radius,
        areaName: 'TESTAREA'
      }
    };
    return feature;
  }

  const handleOnSearchResuts = useCallback((data) => {
    console.log('Search results', data);
    identifyData = data.latlng;
    console.log(identifyData);

    const handleGetAreaStatistics = (data) => {
      const thisArea = L.circle(identifyData, { radius: 1000 });
      thisArea.addTo(map);
      const newFeature = circleToFeature(thisArea);
      // newLayer.addTo(map);

      let layer = L.geoJSON(newFeature);
      const layerId = L.stamp(layer);
      newFeature.properties.leafletId = layerId;
      const leafletIdsList = [layerId];
      leafletDrawFeatureGroupRef.current.addLayer(layer);
      // layer.bindTooltip('TESTAREATT', { direction: 'center', permanent: true });
      if (newFeature.properties.buffer) {
        // layer = buffer(layer.toGeoJSON(), bufferSize, { units: bufferUnits });
        // layer = L.geoJSON(layer, { style: bufferStyle });
        // const bufferLayerId = L.stamp(layer);
        // newFeature.properties.bufferLayerId = bufferLayerId;
        // leafletIdsList.push(bufferLayerId);
        leafletDrawFeatureGroupRef.current.addLayer(layer);
      }
      newFeature.properties.leafletIds = leafletIdsList;
      // dispatch(addNewFeatureToDrawnLayers(newFeature));
      // dispatch(addNewFeatureToZonalStatsAreas(newFeature));
      dispatch(uploadedShapeFileGeoJSON(newFeature));
      console.log(newFeature);
      searchControlRef.current.clear();

      // return(
      //   <Circle center={identifyData} radius={1000} />
      // )
    };

    setPopupContent(
      <Popup position={identifyData} onClose={() => setPopupContent(null)}>
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
  }, []);
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
