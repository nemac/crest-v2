import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GeoJSON, Tooltip, useMapEvents } from 'react-leaflet';
import * as esri from 'esri-leaflet';

import LeafletMapContainer from './LeafletMapContainer';
import ActiveTileLayers from './ActiveTileLayers';
import BasemapLayer from './BasemapLayer';
import { changeZoom, changeCenter, changeResilienceHub } from '../../reducers/mapPropertiesSlice';
import { mapConfig } from '../../configuration/config';

const selectedRegionSelector = (state) => state.selectedRegion.value;
const selectedCenterSelector = (state) => state.mapProperties.center;
const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedResilienceHub = (state) => state.mapProperties.resilienceHub;

export default function ResilienceMapCard() {
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  const center = useSelector(selectedCenterSelector, () => true);
  const zoom = useSelector(selectedZoomSelector, () => true);
  const selectedRegion = useSelector(selectedRegionSelector);
  const resilienceHub = useSelector(selectedResilienceHub);
  const hubsURL = mapConfig.regions[selectedRegion].hubsFeatureServer;
  const hubsHexesUrl = mapConfig.regions[selectedRegion].hubsHexServer;
  const rankProperty = mapConfig.regions[selectedRegion].rankProperty;

  const featureLayerHubs = esri.featureLayer({
    url: hubsURL
  });

  // there currently isn't a hub core for every region
  let featureLayerHex;
  if (hubsHexesUrl) {
    featureLayerHex = esri.featureLayer({
      url: hubsHexesUrl
    });
  }

  // Change the map cursor style to pointer
  React.useEffect(() => {
    if (map) {
      map.getContainer().style.cursor = 'pointer';
    }
  }, [map]);

  // Run query on hex server if it exists after feature clicked on
  // React.useEffect(() => {
  //   if (!featureLayerHex) { return; } // return if no hex layer to query
  //   if (resilienceHub) {
  //     const calculatedData = [];
  //     let runningTotalScore = 0; // using this incremenet the hub core scores
  //     for (let i = 0; i < 10; i++) {
  //       calculatedData[i] = { name: 'Hub Score = ' + parseInt((i + 1), 10), value: 0 };
  //     }
  //     const query = featureLayerHex.query().within(resilienceHub);
  //     query.run((error, featureCollection, response) => {
  //       if (error) {
  //         return;
  //       }
  //       if (featureCollection.features.length === 0) {
  //         return;
  //       }
  //       // Count occurrences of each rank
  //       featureCollection.features.forEach(obj => {
  //         // Subtracting 1 because rankProperty 1 goes into 0th element etc
  //         calculatedData[parseInt(obj.properties[rankProperty] - 1, 10)].value += 1;
  //         runningTotalScore += parseInt(obj.properties[rankProperty], 10);
  //       });
  //       const round = Math.round((runningTotalScore / featureCollection.features.length) * 10) / 10;
  //       setAverageHubScore(round);
  //       setChartData(calculatedData);
  //     });
  //   }
  // }, [resilienceHub]);

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
      {resilienceHub &&
        <GeoJSON key={resilienceHub.id} data={resilienceHub}>
          <Tooltip direction='center' permanent>
            {resilienceHub.id}
          </Tooltip>
        </GeoJSON>
      }
      <ActiveTileLayers />
      <BasemapLayer map={map}/>
      <MapEventsComponent/>
    </LeafletMapContainer>
  );
}
