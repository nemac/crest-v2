/*
Purpose
  holds map and map actions

Child Components
  - Map-ActionButton.js
  - Map-ActionButtons.js
  - Map-ClearAllState.js
  - Map-DrawArea.js
  - Map-DrawAreaActions.js
  - Map-MapIdentify.js
  - Map-SearchPlaces.js
  - Map-SearchPlacesAction.js
  - Map-ShareMap.js

Libs
  - leaflet

API
  - indentify
  - zonal stats
  - share map

State needed
  - zoom level
  - center
  - basemap
  - region
  - layers on and off
  - all zonal stat GEOJSON so we can draw it
  - probably missed stuff

Props
  - Not sure yet

*/
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { makeStyles } from '@mui/styles';
import {
  // Marker,
  MapContainer,
  // MapConsumer,
  Popup,
  TileLayer,
  useMap,
  useMapEvents
} from 'react-leaflet';
import L, { divIcon } from 'leaflet';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from '@mui/material'
import Control from 'react-leaflet-custom-control';
import { betaIdentifyEndpoint, prodIdentifyEndpoint, mapConfig } from '../../configuration/config';
import { BasicSelect } from './basicSelect';
import { changeRegion } from '../../reducers/regionSelectSlice';
import { changeZoom, changeCenter, changeIdentifyCoordinates, changeIdentifyResults, changeIdentifyIsLoaded } from '../../reducers/mapPropertiesSlice';
import LeafletMapContainer from './LeafletMapContainer';
import Identify, { IdentifyAPI } from './Identify';
import Boxforlayout from './BoxForLayouts';

const useStyles = makeStyles((theme) => ({
  leafletContainer: {
    height: 'calc(100% - 100px)', // TODO: this will need to be adjusted when we move the region selector to the map layer list (will 64px height of map actions)
    width: 'calc(100% - 1px)'
  },
}));

const regions = mapConfig.regions;

// selector named functions for lint rules makes it easier to re-use if needed.
const selectedRegionSelector = (state) => state.selectedRegion.value;
const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedCenterSelector = (state) => state.mapProperties.center;

export default function MapCard() {
  const identifyIsLoaded = useSelector((state) => state.mapProperties.identifyIsLoaded);
  const identifyItems = useSelector((state) => state.mapProperties.identifyResults);
  const identifyCoordinates = useSelector((state) => state.mapProperties.identifyCoordinates);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(useSelector((state) => state.mapProperties.center, () => true))
  const dispatch = useDispatch()
  const selectedRegion = useSelector((state) => state.selectedRegion.value)
  const zoom = useSelector((state) => state.mapProperties.zoom, () => true)
  const endPoint = betaIdentifyEndpoint
  //const center = useSelector((state) => state.mapProperties.center)
  const extent = regions['Continental U.S'].mapProperties.extent // conus - TODO: I hate this how can I fix this?
  var ReactDOMServer = require('react-dom/server');
  const classes = useStyles();

  const handleRegionSelectChange = (event) => {
    // Update map with new center and zoom
    map.setView(
      regions[event.target.value].mapProperties.center,
      regions[event.target.value].mapProperties.zoom
    );

    // Update redux store with new region, zoom, and center
    dispatch(changeRegion(regions[event.target.value].label));
    dispatch(changeZoom(regions[event.target.value].mapProperties.zoom));
    dispatch(changeCenter(regions[event.target.value].mapProperties.center));
  };

  const MapEventsComponent = () => {
    const map = useMap();
    const mapForMoveEndEvents = useMapEvents({
      moveend: () => { // this covers both zoom and center
        dispatch(changeZoom(map.getZoom()))
        dispatch(
          changeCenter(
            [map.getCenter().lat, map.getCenter().lng]
          )
        );
      },
      popupclose: () => {
        dispatch(changeIdentifyCoordinates(null));
        dispatch(changeIdentifyIsLoaded(false));
        dispatch(changeIdentifyResults(null));
      }
    });
    return null;
  }

  const infoIconSelected = ReactDOMServer.renderToStaticMarkup(
    <InfoIcon />
  );

  const infoIconUnselected = ReactDOMServer.renderToStaticMarkup(
    <InfoOutlinedIcon />
  );

  const ShowIdentifyPopup = () => {
    console.log(identifyCoordinates)
    if (!identifyCoordinates) {
      return null
    }

    if (!identifyIsLoaded) {
      return (
        <Popup position={identifyCoordinates} autoPan={false}>
          Loading...
        </Popup>
      )
    }
  
    return (
      <Popup position={identifyCoordinates} autoPan={false}>
        <ul>
          {Object.keys(identifyItems).map(item => 
            <li key={item}>{item} : {identifyItems[item]}</li>
          )}
        </ul>
      </Popup>
    )
  }

  const IdentifyPopups = () => {
    const [coordinates, setCoordinates] = useState([]);
    const map = useMap();
    map.once('click', e => {
      const { lat, lng } = e.latlng;
      setCoordinates([lat, lng]);
    });
    return coordinates.length > 0 ? (
      <ShowIdentifyPopup
        coordinates={coordinates}
      />
    ) : null
  }

  /*const IdentifyButton = () => {
    const map = useMap();
    const customController = L.Control.extend({
      options: {
        position: "topleft"
      },

      onAdd: function (map) {
        const button = L.DomUtil.create("button");
        button.innerHTML = infoIconUnselected
        L.DomEvent.disableClickPropagation(button);
        button.onclick = (e) => {
          // if-else changes icon to be selected or not selected
          if (button.innerHTML === infoIconUnselected) {
            button.innerHTML = infoIconSelected
            map.once('click', e => {
              const { lat, lng } = e.latlng;
              console.log(lat, lng);
            });
          } else {
            map.off('click');
            button.innerHTML = infoIconUnselected
          }
          //map.locate()
        }
        return button;
      }
    })

    map.addControl(new customController());
    return null;
  }*/

  const fetchData = async (fetchPoint) => {
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

  const clickHandler = () => {
    map.getContainer().style.cursor = 'crosshair';
    map.once('click', e => {
      dispatch(changeIdentifyCoordinates([e.latlng.lat, e.latlng.lng]));
      const lat=e.latlng.lat
      const lng = e.latlng.lng
      map.getContainer().style.cursor = 'grab';
      const fetchPoint = endPoint+"?lat="+lat+"&lng="+lng+"&region="+mapConfig.regions[selectedRegion].regionName
      fetchData(fetchPoint)
    })
  }

  const displayMap = (
    <LeafletMapContainer center={center} zoom={zoom} whenCreated={setMap}>
      <Control prepend='true' position='topleft'>
        <Button 
          color="primary"
          onClick={clickHandler}>
          <InfoIcon />
        </Button>
      </Control>
      <MapEventsComponent/>
      <ShowIdentifyPopup/>
    </LeafletMapContainer>
  );

  return (
    <div style={{ height: '100%' }}>
      {map ? <BasicSelect
                defaultValue={selectedRegion}
                values={Object.keys(regions)}
                onChange={handleRegionSelectChange}/> : null}
      {displayMap}
      <Boxforlayout
        boxHeight={'64px'} >
        Map Action buttons - add area, export, map layers, this is a place holder
        for the actual component
      </Boxforlayout>
    </div>
  );
}
