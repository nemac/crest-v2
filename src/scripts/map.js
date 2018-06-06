//dependencies
import L from 'leaflet';
import { basemapLayer, featureLayer } from 'esri-leaflet';

import { Component } from './components';
import { mapConfig } from '../config/mapConfig';

//SCSS
import '../css/_custom_leaflet.scss';

//downloaded esri-leaflet-vector to utuls directory so the package worked with webpack es6
//run updates will have to be manually!
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

    this.map.zoomControl.setPosition('topleft') // Position zoom control
    this.layers = {} // Map layer dict (key/value = title/layer)
    this.selectedRegion = null // Store currently selected region

    // add ESRI vector map
    var vectorTiles = vector.basemap(mapConfig.ESRIVectorBasemap.name);
    vectorTiles.addTo(this.map);

    //add wms layers
    //may switch this out for tiled s3 layers  or tile esri layers later
    const WMSLayers = mapConfig.TileLayers;

    //base map for now only one
    const baseMaps = {
      "Base Map": vectorTiles
    };

    //blank overlays object
    let overlayMaps = {};

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
        transparent: layer.transparent
      });

      //current leaflet layer object
      const obj = {
        [layer.label]: tileLayer,
      }

      //merge current layer into overlayMaps layers object
      Object.assign(overlayMaps, obj)

    })

    //add control and layers to map
    //  todo:  add this as a seperate Component
    L.control.layers(baseMaps,overlayMaps).addTo(this.map);

  }

  /** Check if layer is added to map  */
  get_map_object () {
    return this.map
  }

}
