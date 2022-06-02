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
import React, { useMemo, useState } from 'react';
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
import { mapConfig } from '../../configuration/config';
import { BasicSelect } from './basicSelect';
import { changeRegion } from '../../reducers/regionSelectSlice';
import { changeZoom, changeCenter } from '../../reducers/mapPropertiesSlice';
import Identify from './Identify';
import Boxforlayout from './BoxForLayouts';

const useStyles = makeStyles((theme) => ({
  leafletContainer: {
    height: 'calc(100% - 100px)', // TODO: this will need to be adjusted when we move the region selector to the map layer list (will 64px height of map actions)
    width: 'calc(100% - 1px)'
  },
  identifySelected: {
    'leaflet-grab': {
      cursor: 'crosshair'
    }
  }
}));

const regions = mapConfig.regions;

// selector named functions for lint rules makes it easier to re-use if needed.
const selectedRegionSelector = (state) => state.selectedRegion.value;
const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedCenterSelector = (state) => state.mapProperties.center;

export default function MapCard() {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(useSelector((state) => state.mapProperties.center))
  const dispatch = useDispatch()
  const selectedRegion = useSelector((state) => state.selectedRegion.value)
  const zoom = useSelector((state) => state.mapProperties.zoom)
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
    const mapForMoveEndEvents = useMapEvents({
      moveend: () => { // this covers both zoom and center
        dispatch(changeZoom(mapForMoveEndEvents.getZoom()))
        dispatch(
          changeCenter(
            [mapForMoveEndEvents.getCenter().lat, mapForMoveEndEvents.getCenter().lng]
          )
        );
      },
    });
    return null;
  }

  const infoIconSelected = ReactDOMServer.renderToStaticMarkup(
    <InfoIcon />
  );

  const infoIconUnselected = ReactDOMServer.renderToStaticMarkup(
    <InfoOutlinedIcon />
  );

  const ShowIdentifyPopups = ({ identifyPopups }) => {
    console.log(identifyPopups)
    return <Popup 
        position={identifyPopups}
    >
      {Identify()}
    </Popup>
    /*return identifyPopups.map((identifyPopup, index) => {
      return <Popup 
        key={index}
        uniceid={index}
        position={identifyPopup}
      >
        {Identify()}
      </Popup>
    })*/
  }

  const IdentifyPopups = () => {
    const [identifyPopup, setIdentifyPopup] = useState([]);
    const map = useMap();
    map.on('click', (e) =>{
      console.log('test');
      const { lat, lng } = e.latlng;
      setIdentifyPopup([...identifyPopup, [lat, lng]]);
    });
    /*return identifyPopup.length > 0 ? (
      <ShowIdentifyPopups
        identifyPopups={identifyPopup}
      />
    ) : null*/ return null
  }

  const IdentifyButton = () => {
    const map = useMap();
    const customController = L.Control.extend({
      options: {
        position: "topleft"
      },

      onAdd: function () {
        const button = L.DomUtil.create("button");
        button.innerHTML = infoIconUnselected
        L.DomEvent.disableClickPropagation(button);
        button.onclick = () => {
          // if-else changes icon to be selected or not selected
          if (button.innerHTML === infoIconUnselected) {
            button.innerHTML = infoIconSelected
            map.on('click', Identify);
          } else {
          map.off('click', Identify);
            button.innerHTML = infoIconUnselected
          }
          //map.locate()
        }
        return button;
      }
    })

    map.addControl(new customController());
    return null;
  }

  const displayMap = useMemo(
    () => (
      <MapContainer className = {classes.leafletContainer}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        bounds={extent}
        whenCreated={setMap}>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""/>
        <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@latest/dist/leaflet.draw-src.css" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <IdentifyPopups/>
      </MapContainer>
    ),
    [center, classes.leafletContainer, extent, zoom]
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
