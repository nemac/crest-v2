import React, {
  useState, useEffect, useCallback
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMapEvents, GeoJSON } from 'react-leaflet';
import ShareIcon from '@mui/icons-material/Share';
import { Button } from '@mui/material';
import Control from 'react-leaflet-custom-control';
import PropTypes from 'prop-types';

import ActiveTileLayers from './ActiveTileLayers';
import SearchPlaces from './SearchPlaces';
import BasemapLayer from './BasemapLayer';

import { changeRegion, regionUserInitiated } from '../../reducers/regionSelectSlice';
import {
  changeZoom, changeCenter, changeIdentifyResults, changeIdentifyIsLoaded
} from '../../reducers/mapPropertiesSlice';
import LeafletMapContainer from './LeafletMapContainer';
import ShowIdentifyPopup from './IdentifyPopup';
import IdentifyButtonWrapper from './IdentifyButton';
import { mapConfig } from '../../configuration/config';
import { createShareURL } from './ShareMap';
import ModelErrors from '../All/ModelErrors';
import ModalShare from '../All/ModalShare';
import LeafletDrawTools from './LeafletDrawTools';
import { StyledReactLeafletTooltip } from '../All/StyledComponents';
import { useGetIdentifyQuery } from '../../services/identify';

// import Boxforlayout from './BoxForLayouts';

const regions = mapConfig.regions;

// selector named functions for lint rules makes it easier to re-use if needed.
const selectedRegionSelector = (state) => state.selectedRegion.value;
const userInitiatedSelector = (state) => state.selectedRegion.userInitiated;
const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedCenterSelector = (state) => state.mapProperties.center;
const listVisibleSelector = (state) => state.mapLayerList.visible;
const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;
const identifyCoordinatesSelector = (state) => state.mapProperties.identifyCoordinates;
const identifyIsLoadedSelector = (state) => state.mapProperties.identifyIsLoaded;
const identifyItemsSelector = (state) => state.mapProperties.identifyResults;
// const bufferLayersSelector = (state) => state.mapProperties.bufferLayers;
// const analyzedAreasSelector = (state) => state.mapProperties.analyzedAreas;

export default function MapCard(props) {
  const {
    map,
    setMap,
    bufferCheckbox,
    leafletFeatureGroupRef,
    setDrawAreaDisabled,
    tooLargeLayerOpen,
    setTooLargeLayerOpen,
    setCurrentDrawn,
    hover
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
  const drawnFromState = useSelector(drawnLayersSelector);
  // const bufferLayersFromState = useSelector(bufferLayersSelector);
  // const analyzedAreas = useSelector(analyzedAreasSelector);
  const identifyCoordinates = useSelector(identifyCoordinatesSelector);
  const identifyItems = useSelector(identifyItemsSelector);
  const identifyIsLoaded = useSelector(identifyIsLoadedSelector);

  const { data, error, isFetching } = useGetIdentifyQuery({
    region: mapConfig.regions[selectedRegion].regionName,
    coordinates: identifyCoordinates
  }, { skip: identifyItems });

  useEffect(() => {
    if (data) {
      dispatch(changeIdentifyIsLoaded(true));
      dispatch(changeIdentifyResults(data));
    }
  }, [data, dispatch]);

  if (error) {
    // TODO: Do something with errors
    // console.log('jeff error ', error);
  }

  if (isFetching) {
    // TODO: Do something with isFetching???
    // console.log('jeff isFetching ', isFetching);
  }

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
        if (map.getZoom() >= 10) {
          return map.eachLayer((layer) => { layer.openTooltip(); });
        }
        return map.eachLayer((layer) => { layer.closeTooltip(); });
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
      <LeafletDrawTools
        bufferCheckbox={bufferCheckbox}
        leafletFeatureGroupRef={leafletFeatureGroupRef}
        setDrawAreaDisabled={setDrawAreaDisabled}
        setTooLargeLayerOpen={setTooLargeLayerOpen}
        setCurrentDrawn={setCurrentDrawn}
      />
      {drawnFromState?.features?.map((item, index) => (
        <React.Fragment key={item.geometry.coordinates} >
          <GeoJSON
            data={item}
            style={{
              weight: 2,
              opacity: 1,
              color: hover.areaName === item.properties.areaName ? '#dda006' : '#4992f9'
            }}
          >
            <StyledReactLeafletTooltip direction='center' permanent>
              {item.properties.areaName}
            </StyledReactLeafletTooltip>
          </GeoJSON>
          <GeoJSON
            data={item.properties.buffGeo}
            style={{
              weight: 2,
              opacity: 1,
              color: hover.bufferAreaName === item.properties.areaName ? '#ffc107' : '#99c3ff'
            }}
          />
        </React.Fragment>
      ))}
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
        region={selectedRegion}
        identifyItems={identifyItems}
        identifyIsLoaded={identifyIsLoaded}
        identifyCoordinates={identifyCoordinates}
      />
    </LeafletMapContainer>
  );
}

MapCard.propTypes = {
  bufferCheckbox: PropTypes.bool,
  map: PropTypes.object,
  setMap: PropTypes.func,
  leafletFeatureGroupRef: PropTypes.object,
  setDrawAreaDisabled: PropTypes.func,
  tooLargeLayerOpen: PropTypes.bool,
  setTooLargeLayerOpen: PropTypes.func,
  setCurrentDrawn: PropTypes.func,
  hover: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};
