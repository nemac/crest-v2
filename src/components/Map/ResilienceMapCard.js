import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GeoJSON, useMapEvents } from 'react-leaflet';
import * as esri from 'esri-leaflet';

import LeafletMapContainer from './LeafletMapContainer';
import ActiveTileLayers from './ActiveTileLayers';
import BasemapLayer from './BasemapLayer';

import { changeRegion, regionUserInitiated } from '../../reducers/regionSelectSlice';
import { changeZoom, changeCenter, changeResilienceHub } from '../../reducers/mapPropertiesSlice';
import { StyledReactLeafletTooltip } from '../All/StyledComponents';
import { mapConfig } from '../../configuration/config';

const selectedRegionSelector = (state) => state.selectedRegion.value;
const selectedCenterSelector = (state) => state.mapProperties.center;
const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedResilienceHub = (state) => state.mapProperties.resilienceHub;
const userInitiatedSelector = (state) => state.selectedRegion.userInitiated;

export default function ResilienceMapCard() {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const [map, setMap] = useState(null);
  const center = useSelector(selectedCenterSelector, () => true);
  const zoom = useSelector(selectedZoomSelector, () => true);
  const selectedRegion = useSelector(selectedRegionSelector);
  const resilienceHub = useSelector(selectedResilienceHub);
  const userInitiatedRegion = useSelector(userInitiatedSelector);
  const hubsURL = mapConfig.regions[selectedRegion].hubsFeatureServer;

  const featureLayerHubs = esri.featureLayer({
    url: hubsURL
  });

  // Change the map cursor style to pointer
  React.useEffect(() => {
    if (map) {
      map.getContainer().style.cursor = 'pointer';
      // I truly dislike that I have to set this timeout to get the tooltip in the right spot
      setTimeout(() => {
        setReady(true);
      }, 500);
    }
  }, [map]);

  const handleRegionChange = useCallback((regionName, user) => {
    // catch bad region
    if (!mapConfig.regions[regionName]) return null;

    // check for user changing region as opposed to
    //  state update on refresh
    if (!user) return null;

    // ensure map has been instantiated
    if (map) {
      // zoom to region locations
      map.setView(
        mapConfig.regions[regionName].mapProperties.center,
        mapConfig.regions[regionName].mapProperties.zoom
      );

      // Update redux store with new region, zoom, and center
      dispatch(changeRegion(mapConfig.regions[regionName].label));
      dispatch(changeZoom(mapConfig.regions[regionName].mapProperties.zoom));
      dispatch(changeCenter(mapConfig.regions[regionName].mapProperties.center));
      dispatch(regionUserInitiated(false));
    }
    return null;
  }, [map, dispatch]);

  useEffect(() => {
    handleRegionChange(selectedRegion, userInitiatedRegion);
  }, [selectedRegion, handleRegionChange, userInitiatedRegion]);

  // This component exists solely for the useMapEvents hook
  const MapEventsComponent = () => {
    useMapEvents({
      click: (e) => {
        const query = featureLayerHubs.query().nearby(e.latlng, 0);
        query.run((error, featureCollection, response) => {
          if (error) {
            return;
          }
          if (featureCollection.features.length === 0) {
            return;
          }
          dispatch(changeResilienceHub(featureCollection.features[0]));
        });
      },
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

  return (
    <LeafletMapContainer center={center} zoom={zoom} innerRef={setMap}>
      {ready && (
        <GeoJSON key={resilienceHub?.id} data={resilienceHub}>
          <StyledReactLeafletTooltip direction='center' permanent>
            {resilienceHub?.id}
          </StyledReactLeafletTooltip>
        </GeoJSON>
      )}
      <ActiveTileLayers />
      <BasemapLayer map={map}/>
      <MapEventsComponent/>
    </LeafletMapContainer>
  );
}
