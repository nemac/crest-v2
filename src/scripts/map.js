
import '../css/_custom_leaflet.scss';
import L from 'leaflet';
import { basemapLayer, featureLayer } from 'esri-leaflet';
import { Component } from './components';
import { ESRIVectorBasemap } from '../config/mapConfig';

//downloaded esri-leaflet-vector to utuls directory so the package worked with webpack es6
//run updates will have to be manually!
//see github issue https://github.com/Esri/esri-leaflet-vector/issues/31  from tgirgin23
import * as vector from './utils/esri-leaflet-vector/EsriLeafletVector';

//default map template
import mapTemplate from '../templates/map.html'

/**
 * Leaflet Map Component
 * Render map items, and provide user interactivity.
 * @extends Component
 */
export class Map extends Component {
  /** Map Component Constructor
   * @param { String } placeholderId Element ID to inflate the map into
   * @param { Object } props.events.click Map item click listener
   */
  constructor (mapPlaceholderId, props) {
    super(mapPlaceholderId, props, mapTemplate)

    // Initialize Leaflet map
    this.map = L.map(this.refs.mapContainer, {
      center: [ 35.5951, -82.5515 ],
      zoom: 13,
      maxZoom: 18,
      minZoom: 4
    })

    this.map.zoomControl.setPosition('topleft') // Position zoom control
    this.layers = {} // Map layer dict (key/value = title/layer)
    this.selectedRegion = null // Store currently selected region

    // add ESRI vector map
    var vectorTiles = vector.basemap(ESRIVectorBasemap.name);
    vectorTiles.addTo(this.map);

  }
}
