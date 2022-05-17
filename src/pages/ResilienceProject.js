import * as React from 'react';
import Map from '../components/Map/Map';
import MapLayerList from '../components/MapLayerList/MapLayerList'

export default function ResilienceProject() {
  return (
    <div>
      Welcome to the Where Should I Do a Resilience Project page of Crest V2
      <Map/>
      <MapLayerList/>
    </div>
  );
}
