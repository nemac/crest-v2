import * as React from 'react';
import Map from '../components/Map/Map';
import MapLayerList from '../components/MapLayerList/MapLayerList'

export default function AnalyzeProjectSite() {
  return (
    <div>
      Welcome to the Analyze Project Sites page of Crest V2
      <Map/>
      <MapLayerList layerListVisible={true}/> {/*hard-coding to true for now*/}
    </div>
  )
}