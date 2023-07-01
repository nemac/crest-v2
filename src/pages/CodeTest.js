/* eslint-disable no-console */
import React from 'react';
import * as ReactDOM from 'react-dom';
import { TileLayer, useMap } from 'react-leaflet';
import { createControlComponent } from '@react-leaflet/core';
import * as L from 'leaflet';
import { Button } from '@mui/material';
import EsriLeafletGeoSearch from 'react-esri-leaflet/plugins/EsriLeafletGeoSearch';
import LeafletMapContainer from '../components/Map/LeafletMapContainer';
import * as esri from 'esri-leaflet';
import { FeatureLayer } from 'react-esri-leaflet';

const apiKey = 'AAPKa0a45bdbd847441badbdcf07a97939bd0Y1Vpjt3MU7qyu7R9QThGqpucpKmbVXGEdmQo1hqhdjLDKA2zrwty2aeDjT-7-By';
const featureLayerURL = 'https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/ak_hubs_core_030722/FeatureServer/0';
const center = [61.21, -149.90];

// const featureLayer = esri.featureLayer({
//   url: featureLayerURL
// });

function MyMapComponent() {
  return (
    <div style={{ height: '100%' }}>
      <LeafletMapContainer center={center} zoom={12}>
        <FeatureLayer
          url={featureLayerURL}
          eventHandlers={{
            click: (e) => console.log('click', e.layer.feature)
          }}
        />
        <TileLayer
          eventHandlers={{
            click: () => console.log('click')
          }}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />
      </LeafletMapContainer>
    </div>
  );
}

export default MyMapComponent;
