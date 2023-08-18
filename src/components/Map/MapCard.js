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
  useState, useEffect, useCallback
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMapEvents, Circle } from 'react-leaflet';
import ShareIcon from '@mui/icons-material/Share';
import { Button } from '@mui/material';
import Control from 'react-leaflet-custom-control';
import PropTypes from 'prop-types';

import ActiveTileLayers from './ActiveTileLayers';
import SearchPlaces from './SearchPlaces';
import BasemapLayer from './BasemapLayer';

import { changeRegion, regionUserInitiated } from '../../reducers/regionSelectSlice';
import {
  changeZoom, changeCenter
} from '../../reducers/mapPropertiesSlice';
import LeafletMapContainer from './LeafletMapContainer';
import ShowIdentifyPopup from './IdentifyPopup';
import IdentifyButtonWrapper from './IdentifyButton';
import { mapConfig } from '../../configuration/config';
import ActionButtons from './ActionButtons';
import { createShareURL } from './ShareMap';
import ModelErrors from '../All/ModelErrors';
import ModalShare from '../All/ModalShare';
import DrawnLayers from './DrawnLayers';

// import Boxforlayout from './BoxForLayouts';

const regions = mapConfig.regions;

// selector named functions for lint rules makes it easier to re-use if needed.
const selectedRegionSelector = (state) => state.selectedRegion.value;
const userInitiatedSelector = (state) => state.selectedRegion.userInitiated;
const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedCenterSelector = (state) => state.mapProperties.center;
const listVisibleSelector = (state) => state.mapLayerList.visible;
// const analyzedAreasSelector = (state) => state.mapProperties.analyzedAreas;

export default function MapCard(props) {
  const {
    map,
    setMap,
    bufferCheckbox,
    leafletFeatureGroupRef,
    setDrawAreaDisabled,
    tooLargeLayerOpen,
    setTooLargeLayerOpen
  } = props;
  const [shareLinkOpen, setShareLinkOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const dispatch = useDispatch();

  // setting "() => true" for both center and zoom ensures that value is only read from store once
  const center = useSelector(selectedCenterSelector, () => true);
  const zoom = useSelector(selectedZoomSelector, () => true);
  const layerListVisible = useSelector(listVisibleSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  const userInitiatedRegion = useSelector(userInitiatedSelector);
  // const analyzedAreas = useSelector(analyzedAreasSelector);

  // need to create an invisible circle to trigger non-empty map for export
  const dummyPoint = [51.505, -0.09]

  const handleRegionChange = useCallback((regionName, user) => {
    // catch bad region
    if (!regions[regionName]) return null;

    // check for user changing region as opposed to
    //  state update on refresh
    if (!user) return null;

    // ensure map has been instantiated
    if (map) {
      // zoom to region locations
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
      },
      zoomend: () => {
        const featureGroup = leafletFeatureGroupRef.current;
        featureGroup.eachLayer((layer) => {
          if (map.getZoom() < 10) {
            layer.closeTooltip();
          } else {
            layer.openTooltip();
          }
        });
      }
    });
    return null;
  };

  const handleShareLinkClose = (event) => {
    // navigator.clipboard.writeText(shareUrl); // THIS IS BROKEN ON HTTP
    setShareLinkOpen(false);
  };

  const handleShareLinkCopy = () => {
    navigator.clipboard.writeText(shareUrl); // THIS IS BROKEN ON HTTP
  };

  const handleTooLargeLayerClose = () => {
    setTooLargeLayerOpen(false);
  };

  const handleSelectURLDblClick = (event) => {
    const range = document.createRange();
    range.selectNodeContents(event.target);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  };

  const shareMapHandler = (event) => {
    event.stopPropagation();
    setShareUrl(createShareURL());
    setShareLinkOpen(true);
  };

  return (
    <div style={{ height: '100%' }}>
      <LeafletMapContainer center={center} zoom={zoom} innerRef={setMap}>
        <IdentifyButtonWrapper map={map} />
        <SearchPlaces map = {map} leafletFeatureGroupRef={leafletFeatureGroupRef} />
        <Control position='bottomleft'>
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            onClick={shareMapHandler}
            color="CRESTPrimary"
            sx={{ margin: '0 0 20px 0' }}
          >
            Share Map
          </Button>
        </Control>
        <Circle center={dummyPoint} pathOptions={{opacity: 0}} radius={1} />
        <DrawnLayers
          map={map}
          leafletFeatureGroupRef={leafletFeatureGroupRef}
          bufferCheckbox={bufferCheckbox}
          setDrawAreaDisabled={setDrawAreaDisabled}
          setTooLargeLayerOpen={setTooLargeLayerOpen}
        />
        <ModalShare
          contentTitle={'Share map url'}
          contentMessage={shareUrl}
          buttonMessage='Dismiss'
          onClose={handleShareLinkClose}
          onDoubleClick={handleSelectURLDblClick}
          secondaryClick={handleShareLinkCopy}
          secondaryButtonMessage='Copy Map URL'
          open={shareLinkOpen}
        />
        <ModelErrors
          contentTitle={'Sketch an Area Error '}
          contentMessage={'The sketched area is too large.'}
          buttonMessage='Dismiss'
          errorType={'error'} // error, warning, info, success (https://mui.com/material-ui/react-alert/)
          onClose={handleTooLargeLayerClose}
          open={tooLargeLayerOpen}
        />
        <ActiveTileLayers />
        <BasemapLayer map={map} />
        <MapEventsComponent />
        <ShowIdentifyPopup
          selectedRegion = {selectedRegion}
          map = {map}
        >
        </ShowIdentifyPopup>
        {/* <MapPrint position="topleft" title="My Map" sizeModes={['A4Portrait']} exportOnly={true} hidden={true} printRef={mapPrint} /> */}
      </LeafletMapContainer>
      <ActionButtons map={map} />
    </div>
  );
}

MapCard.propTypes = {
  bufferCheckbox: PropTypes.bool,
  map: PropTypes.object,
  setMap: PropTypes.func,
  leafletFeatureGroupRef: PropTypes.object,
  setDrawAreaDisabled: PropTypes.func,
  tooLargeLayerOpen: PropTypes.bool,
  setTooLargeLayerOpen: PropTypes.func
};
