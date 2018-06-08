//dependencies
import L from 'leaflet';
import { basemapLayer, featureLayer } from 'esri-leaflet';

import { Component } from './components';
import { mapConfig } from '../config/mapConfig';

//SCSS
import '../css/_custom_leaflet.scss';

//downloaded esri-leaflet-vector to utuls directory so the package worked with webpack es6
//updates will have to be manually!
//see github issue https://github.com/Esri/esri-leaflet-vector/issues/31  from tgirgin23
import * as vector from './utils/esri-leaflet-vector/EsriLeafletVector';

//templates
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
    this.map = L.map(this.refs.mapContainer, mapConfig.mapOptions)

    // this.map.on('load',console.log('map loaded'));
    // this.map.on('load',$('#map-holder').s$('#map-holder').height());


    this.map.zoomControl.setPosition('topleft') // Position zoom control
    this.overlayMaps = {} // Map layer dict (key/value = title/layer)
    this.selectedRegion = null // Store currently selected region

    /* add ESRI vector map
    * var vectorTiles = vector.basemap(mapConfig.ESRIVectorBasemap.name);
    * not using vector tiles yet some bugginess from ESRI
    * mainly the map starts out not fully rendering
    */
    var vectorTiles = basemapLayer(mapConfig.ESRIVectorBasemap.name);
    vectorTiles.addTo(this.map);

    // this.map.fitBounds(this.map.getBounds());
    // console.log(this.map.getBounds())
    var el = document.getElementById('map');

    // var event = new Event('resize');
    // el.dispatchEvent(event);

    //add wms layers
    //may switch this out for tiled s3 layers  or tile esri layers later
    const WMSLayers = mapConfig.TileLayers;

    //base map for now only one
    const baseMaps = {
      "Base Map": vectorTiles
    };

    //iterate the wms map layers add add to map
    WMSLayers.map((layer)=>{
      var tileLayer = L.tileLayer.wms(layer.url, {
        id: layer.id,
        layers: layer.layer,
        crs: layer.crs,
        format: layer.format,
        opacity: layer.opacity,
        attribution: layer.attribution,
        tileSize: layer.tileSize,
        transparent: layer.transparent,
        zIndex: layer.zIndex
      });

      //current leaflet layer object
      const obj = {
        [layer.id]: tileLayer,
      };

      //merge current layer into overlayMaps layers object
      Object.assign(this.overlayMaps, obj);
    })

    this.map.invalidateSize();
    this.toggleLayer('SA_ExposureIndex');
    this.toggleLayer('SA_ExposureIndex');
    this.map.invalidateSize();
  }

  /** Toggle map layer visibility */
  toggleLayer (layerName) {
    console.log(layerName)
    const layer = this.overlayMaps[layerName]
    if (this.map.hasLayer(layer)) {
      this.map.removeLayer(layer)
    } else {
      this.map.addLayer(layer)
    }
    this.map.invalidateSize();
  }

}
