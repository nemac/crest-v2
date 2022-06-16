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
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMapEvents } from 'react-leaflet';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from '@mui/material';
import Control from 'react-leaflet-custom-control';
import { BasicSelect } from './basicSelect';
import { changeRegion } from '../../reducers/regionSelectSlice';
import {
  changeZoom, changeCenter, changeIdentifyCoordinates,
  changeIdentifyResults, changeIdentifyIsLoaded
} from '../../reducers/mapPropertiesSlice';
import LeafletMapContainer from './LeafletMapContainer';
import ShowIdentifyPopup from './Identify';
import Boxforlayout from './BoxForLayouts';
import { mapConfig } from '../../configuration/config';

const regions = mapConfig.regions;

// selector named functions for lint rules makes it easier to re-use if needed.
const selectedRegionSelector = (state) => state.selectedRegion.value;
const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedCenterSelector = (state) => state.mapProperties.center;

export default function MapCard() {
  const [map, setMap] = useState(null);

  // setting "() => true" for both center and zoom ensures that value is only read from store once
  const center = useSelector(selectedCenterSelector, () => true);
  const zoom = useSelector(selectedZoomSelector, () => true);

  const dispatch = useDispatch();
  const selectedRegion = useSelector(selectedRegionSelector);

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

  // This component exists solely for the useMapEvents hook
  const MapEventsComponent = () => {
    useMapEvents({
      moveend: () => { // Send updated zoom and center to redux when moveend event occurs.
        dispatch(changeZoom(map.getZoom()));
        dispatch(
          changeCenter(
            [map.getCenter().lat, map.getCenter().lng]
          )
        );
      },
      popupclose: () => { // Reset all redux popup state when popup is closed.
        dispatch(changeIdentifyCoordinates(null));
        dispatch(changeIdentifyIsLoaded(false));
        dispatch(changeIdentifyResults(null));
      }
    });
    return null;
  };

  const identifyClickHandler = () => {
    map.getContainer().style.cursor = 'crosshair';
    map.once('click', (e) => {
      const coordinates = e.latlng;
      dispatch(changeIdentifyCoordinates({ lat: coordinates.lat, lng: coordinates.lng }));
      map.getContainer().style.cursor = 'grab';
    });
  };

  const displayMap = (
    <LeafletMapContainer center={center} zoom={zoom} whenCreated={setMap}>
      <Control prepend='true' position='topleft'>
        <Button
          color="primary"
          onClick={identifyClickHandler}>
          <InfoIcon />
        </Button>
      </Control>
      <MapEventsComponent/>
      <ShowIdentifyPopup
        selectedRegion = {selectedRegion}
      />
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
