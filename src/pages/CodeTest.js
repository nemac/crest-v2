/* eslint-disable no-console */
import React from 'react';
import * as ReactDOM from 'react-dom';
import { TileLayer } from 'react-leaflet';
import { createControlComponent } from '@react-leaflet/core';
import * as L from 'leaflet';
import { Button } from '@mui/material';
import EsriLeafletGeoSearch from 'react-esri-leaflet/plugins/EsriLeafletGeoSearch';
import LeafletMapContainer from '../components/Map/LeafletMapContainer';

const apiKey = 'AAPKa0a45bdbd847441badbdcf07a97939bd0Y1Vpjt3MU7qyu7R9QThGqpucpKmbVXGEdmQo1hqhdjLDKA2zrwty2aeDjT-7-By';

const createIdentifyButonControl = () => {
  const control = L.control({ position: 'topleft' });

  control.onAdd = () => {
    const container = L.DomUtil.create('div', '');

    ReactDOM.render(
      <Button variant="contained" onClick={() => console.log('hello')}>Click Me</Button>,
      container
    );

    return container;
  };

  return control;
};

const IdentifyButton = createControlComponent(createIdentifyButonControl);

function MyMapComponent() {
  return (
    <div style={{ height: '100%' }}>
      <LeafletMapContainer center={[51.505, -0.09]} zoom={13}>
        <IdentifyButton/>
          <EsriLeafletGeoSearch providers={{
            arcgisOnlineProvider: {
              token: apiKey,
              label: 'ArcGIS Online Results',
              maxResults: 10
            }
          }}/>;
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LeafletMapContainer>
    </div>
  );
}

export default MyMapComponent;
