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
import React, {
  useState, useEffect, useCallback, useRef
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useMapEvents,
  FeatureGroup,
  // GeoJSON,
  Polygon
} from 'react-leaflet';
import InfoIcon from '@mui/icons-material/Info';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import Control from 'react-leaflet-custom-control';
import PropTypes from 'prop-types';

import LeafletDrawTools from './LeafletDrawTools';
import ActiveTileLayers from './ActiveTileLayers';
import BasemapLayer from './BasemapLayer';
import { changeRegion, regionUserInitiated } from '../../reducers/regionSelectSlice';
import {
  changeZoom, changeCenter, changeIdentifyCoordinates
} from '../../reducers/mapPropertiesSlice';
import LeafletMapContainer from './LeafletMapContainer';
import ShowIdentifyPopup from './Identify';
import { mapConfig } from '../../configuration/config';
import ActionButtons from './ActionButtons';
import { createShareURL } from './ShareMap';
import DialogPopup from '../All/DialogPopup';
// import Boxforlayout from './BoxForLayouts';

const regions = mapConfig.regions;

// selector named functions for lint rules makes it easier to re-use if needed.
const selectedRegionSelector = (state) => state.selectedRegion.value;
const userInitiatedSelector = (state) => state.selectedRegion.userInitiated;
const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedCenterSelector = (state) => state.mapProperties.center;
const listVisibleSelector = (state) => state.mapLayerList.visible;
// const analyzedAreasSelector = (state) => state.mapProperties.analyzedAreas;

const useStyles = makeStyles((theme) => ({
  leafletButton: {
    color: '#000000',
    minHeight: '30px',
    minWidth: '30px',
    width: '30px',
    height: '30px',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#F4F4F4'
    }
  },
  shareButton: {
    color: '#000000',
    minHeight: '30px',
    minWidth: '60px',
    width: '60px',
    height: '30px',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#F4F4F4'
    }
  }
}));

export default function MapCard(props) {
  // const [map, setMap] = useState(null);
  const { map, setMap } = props;
  const [shareLinkOpen, setShareLinkOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();
  const featureGroupRef = useRef();

  // setting "() => true" for both center and zoom ensures that value is only read from store once
  const center = useSelector(selectedCenterSelector, () => true);
  const zoom = useSelector(selectedZoomSelector, () => true);
  const layerListVisible = useSelector(listVisibleSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  const userInitiatedRegion = useSelector(userInitiatedSelector);
  // const analyzedAreas = useSelector(analyzedAreasSelector);

  const handleRegionChange = useCallback((regionName, user) => {
    // catch bad region
    if (!regions[regionName]) return null;

    // check for user changing region as opposed to
    //  state update on refresh
    if (!user) return null;

    // ensure map has been instantiated
    if (map) {
      // zoom ot region locations
      map.setView(
        regions[regionName].mapProperties.center,
        regions[regionName].mapProperties.zoom
      );

      // Update redux store with new region, zoom, and center
      dispatch(changeRegion(regions[regionName].label));
      dispatch(changeZoom(regions[regionName].mapProperties.zoom));
      dispatch(changeCenter(regions[regionName].mapProperties.center));
      dispatch(regionUserInitiated(false));
    }
    return null;
  }, [map, dispatch]);

  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 10);
    }
  }, [map, layerListVisible]);

  useEffect(() => {
    handleRegionChange(selectedRegion, userInitiatedRegion);
  }, [selectedRegion, handleRegionChange, userInitiatedRegion]);

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

  const handleShareLinkClose = () => {
    // navigator.clipboard.writeText(shareUrl); THIS IS BROKEN ON HTTP
    setShareLinkOpen(false);
  };

  const shareMapHandler = () => {
    setShareUrl(createShareURL());
    setShareLinkOpen(true);
  };

  return (
    <div style={{ height: '100%' }}>
      <LeafletMapContainer center={center} zoom={zoom} innerRef={setMap}>
        <Control prepend='true' position='topleft'>
          <Button
            variant="contained"
            onClick={identifyClickHandler}
            className={classes.leafletButton}>
            <InfoIcon />
          </Button>
        </Control>
        <Control prepend='true' position='bottomleft'>
          <Button
            variant="contained"
            onClick={shareMapHandler}
            className={classes.shareButton}>
            SHARE
          </Button>
        </Control>
        <FeatureGroup ref={featureGroupRef}>
          <LeafletDrawTools
            map={map}
            featureGroupRef={featureGroupRef}
          />
        </FeatureGroup>
        <DialogPopup
          contentMessage={('Your Share URL is: ').concat(shareUrl)}
          buttonMessage='Dismiss'
          onClose={handleShareLinkClose}
          open={shareLinkOpen}
        />
        <ActiveTileLayers />
        <BasemapLayer map={map} />
        <MapEventsComponent />
        <ShowIdentifyPopup
          selectedRegion = {selectedRegion}
          map = {map}
        >
        </ShowIdentifyPopup>
      </LeafletMapContainer>
      <ActionButtons />
    </div>
  );
}

MapCard.propTypes = {
  map: PropTypes.object,
  setMap: PropTypes.func
};
