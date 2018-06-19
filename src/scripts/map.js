//dependencies
import L from 'leaflet';
import { basemapLayer, featureLayer } from 'esri-leaflet';

import { Component } from './components';
import { mapConfig } from '../config/mapConfig';

//SCSS
import '../css/_custom_leaflet.scss';

//import custom classess
import { Store } from './store'
import { IndentifyAPI } from './IndentifyAPI';

var store = new Store({});
//downloaded esri-leaflet-vector to utuls directory so the package worked with webpack es6
//updates will have to be manually!
//see github issue https://github.com/Esri/esri-leaflet-vector/issues/31  from tgirgin23
import * as vector from './utils/esri-leaflet-vector/EsriLeafletVector';

//templates
import mapTemplate from '../templates/map.html'
import mapInfoTemplate from '../templates/mapinfo.html';

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

    this.renderCount = 0;

    //set last storage object, it will be overwritten after map is intialized
    this.restoreStateStore = store.getState();

    // Initialize Leaflet map
    this.map = L.map(this.refs.mapContainer, mapConfig.mapOptions);

    this.IndentifyAPI = new IndentifyAPI();

    this.map.zoomControl.setPosition('topleft') // Position zoom control
    this.overlayMaps = {} // Map layer dict (key/value = title/layer)
    this.value = null // Store currently selected region
    this.mapOverlayLayers = {}
    this.marker;

    /* add ESRI vector map
    * var vectorTiles = vector.basemap(mapConfig.ESRIVectorBasemap.name);
    * not using vector tiles yet some bugginess from ESRI
    * mainly the map starts out not fully rendering
    */
    var mapTiles = basemapLayer(mapConfig.ESRIVectorBasemap.name);
    mapTiles.addTo(this.map);


    /*
    * Yes I am zooming in then zooming out.  But leaflets tiles
    * do not setup with fully with a dynamic map container (set to 100% height.)
    * and the overlays are offset with intial draw.  this zoom in zoom iut
    * forces leaflet to Render everything correctly
    */
    this.map.zoomOut(1);
    this.map.zoomIn(1);
    L.Util.requestAnimFrame(this.map.invalidateSize, this.map, !1, this.map._container);

    const self = this;


    this.map.on('unload', function(e) {
      self.saveStore('mapCenter', this.getCenter() );
      self.saveStore('mapZoom', this.getZoom() );
    });

    this.map.on('moveend', function(e) {
      self.saveStore('mapCenter', this.getCenter() );
      self.saveStore('mapZoom', this.getZoom() );
    });

    this.map.on('zoomend', function(e) {
      self.saveStore('mapCenter', this.getCenter() );
      self.saveStore('mapZoom', this.getZoom() );
    });

    this.map.on('dblclick', function(e) {
      self.saveStore('mapCenter', this.getCenter() );
      self.saveStore('mapZoom', this.getZoom() );
    });

    this.map.on('mousedown', function(e) {
      self.saveStore('mapCenter', this.getCenter() );
      self.saveStore('mapZoom', this.getZoom() );
    });

    this.map.on('keypress', function(e) {
      self.saveStore('mapCenter', this.getCenter() );
      self.saveStore('mapZoom', this.getZoom() );
    });


    this.map.on('click', function(ev) {
      self.saveStore('mapCenter', this.getCenter() );
      self.saveStore('mapZoom', this.getZoom() );
      self.saveStore('mapClick', ev.latlng );
      if(ev.containerPoint !== undefined){
        self.retreiveMapClick();
      }

      // if(ev.containerPoint !== undefined){
      //   self.saveStore('mapContainerPoint', {x: ev.containerPoint.x, y: ev.containerPoint.y} );
      // } else {
      //   const containerPoint = store.getStateItem('mapContainerPoint');
      //   self.saveStore('mapContainerPoint', {x: containerPoint.x, y: containerPoint.y} );
      // }
      //
      // if(ev.originalEvent === undefined){
      //   const originalEvent = store.getStateItem('mapClickPage');
      //   self.saveStore('mapClickPage', {pageX: originalEvent.pageX, pageY: originalEvent.pageY}  );
      // } else {
      //   self.saveStore('mapClickPage', {pageX: ev.originalEvent.pageX, pageY: ev.originalEvent.pageY}  );
      // }

    });

    //add wms layers
    //may switch this out for tiled s3 layers or tile esri layers later
    const WMSLayers = mapConfig.TileLayers;

    //base map for now only one
    const baseMaps = {
      "Base Map": mapTiles
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

      const mapDisplayLayersObj = {[layer.id]: false};

      Object.assign(this.mapOverlayLayers, mapDisplayLayersObj);

      //merge current layer into overlayMaps layers object
      Object.assign(this.overlayMaps, obj);

    })

    this.saveStore('mapLayerDisplayStatus', this.mapOverlayLayers );
    this.addMapInformationControl();

    const mapClick = store.getStateItem('mapClick');
    if(Object.keys(mapClick).length > 0){
      this.retreiveMapClick ();
    }
  }

  addMapInformationControl(){

    L.Control.Watermark = L.Control.extend({
        onAdd: function(map) {
            let fa = L.DomUtil.create('div','btn btn-light btn-mapinfo');
            fa.innerHTML = '<i class="fas fa-info i-mapinfo"></i>'
            L.DomEvent.disableClickPropagation(fa);
            return fa;
        },



        onRemove: function(map) {
            // Nothing to do here
        }
    });

    L.control.watermark = function(opts) {
        return new L.Control.Watermark(opts);
    }


    L.control.watermark({ position: 'topleft' }).addTo(this.map);
  }


  replaceMapInfoValue(doc, type, values){
    let element = doc.getElementById(`${type}-score`);
    element.textContent = values.label;
  }

  addStyle(doc, type, values){
     let element = doc.getElementById(`${type}-score`);
     element.setAttribute("style", 'background-color: ' + values.backgroundColor + '; color: ' + values.color + ';');
  }
  /** Load map data from the API */
  async retreiveMapClick () {


    // remove prevouis marker point
    if (this.marker !== undefined) {
          this.map.removeLayer(this.marker);
    };


    const mapClick = store.getStateItem('mapClick');

    const IndentifyJson = await this.IndentifyAPI.getIndentifySummary(mapClick.lat,mapClick.lng);
    // const IndentifyJson = {"aquatic": 6,"terristrial": 2, "asset": "1", "threat": "3", "exposure": "1"};

    var myIcon = L.divIcon({className: 'map-info-point'});

    this.marker = L.marker([mapClick.lat,mapClick.lng], {icon: myIcon});
    this.map.addLayer(this.marker);


    let parser = new DOMParser()
    let doc = parser.parseFromString(mapInfoTemplate, "text/html");

    //template needs responive info box.
    for(var key in IndentifyJson){

      const styleItem = this.IndentifyAPI.getIndentifyItem (key, parseInt(IndentifyJson[key]) )

      const templateValues = {"name": key,
                          "backgroundColor": styleItem[0].backgroundColor,
                          "color": styleItem[0].color,
                          "label": styleItem[0].label};


      this.addStyle(doc, key, templateValues)
      this.replaceMapInfoValue(doc, key, templateValues)

    }


    let mapinformationel = doc.getElementById('map_info_list');

    var tooltipContent = L.Util.template(mapinformationel.outerHTML);


    //to do overide css popup for leaflet
    this.marker.bindPopup(tooltipContent,{offset:L.point(-123,20)}).openPopup();

  }

  shouldRestore(props){
    if(props === undefined){ return false }

    if(props.restore === undefined){return false}

    return props.restore
  }

  /** Toggle map layer visibility */
  toggleLayer (layerName) {
    let mapDisplayLayersObj = {};
    const layer = this.overlayMaps[layerName]
    if (this.map.hasLayer(layer)) {
      this.map.removeLayer(layer)
      mapDisplayLayersObj = {[layerName]: false};
    } else {
      this.map.addLayer(layer)
      mapDisplayLayersObj = {[layerName]: true};
    }
    Object.assign(this.mapOverlayLayers, mapDisplayLayersObj);
    this.saveStore('mapLayerDisplayStatus', this.mapOverlayLayers );
  }

  /** provide access to leaflet invalidateSize **/
  invalidateSize(){
    this.map.invalidateSize();
  }


  saveStore(key, value){
    const storeObj = {[key]: value};

    this.store = {...this.store, ...storeObj};
    store.saveState(this.store)

  }

  /*
  *  recenters map accoring to a lat long
  *  @param { Object }  {lat: 32.76966654128219, lng: -79.93103027343751}
  *
  *  const ele.addEventListener('click', (e) => {
  *      this.setMapCenter({lat: 32.76966654128219, lng: -79.93103027343751});
  *   })
  */
  setMapCenter(value){
    this.map.panTo( value);
    this.invalidateSize();
  }

  /*
  *  zooms map into zoom level
  *  @param { integer }  integer usuall 1-18
  *
  *  const ele.addEventListener('click', (e) => {
  *      this.setMapZoom(5);
  *   })
  */
  setMapZoom(value){
    this.map.setZoom(value);
    this.invalidateSize();
  }

  /*
  *  Force a map click event without user interaction
  *  @param { Object }  {lat: 32.76966654128219, lng: -79.93103027343751}
  *
  *      this.setMapClick({lat: 32.76966654128219, lng: -79.93103027343751});
  *
  *
  */
  setMapClick(value){
    const latlng = L.latLng([value.lat, value.lng]);
    this.map.fireEvent('click', {latlng: latlng})
    this.invalidateSize();
  }

  /*
  *  Force a map layer toggle event without user interaction
  *  @param { string }  layer id examples are SA_ExposureIndex, SA_AssetIndex, SA_ThreatIndex
  *
  *  const ele.addEventListener('click', (e) => {
  *      this.setLayerStatus('SA_ThreatIndex');
  *   })
  *
  */
  setLayerStatus(value){

    const layerToggleElement = document.getElementById(`${value}-toggle`);
    var event = new Event('click');
    layerToggleElement.dispatchEvent(event);
    layerToggleElement.checked ? layerToggleElement.checked = false : layerToggleElement.checked = true;

  }

  /*
  *  restore mapComponent when state exists
  *
  *  const ele.addEventListener('click', (e) => {
  *      this.restoreState();
  *   })
  *
  */
  restoreMapState(){

     //get last storage objet
     store.setStateFromObject(this.restoreStateStore);

     const mapStates = ['mapCenter', 'mapClick', 'mapZoom', 'mapLayerDisplayStatus','mapContainerPoint']
     const state = store.getState();
     const self = this;
      //state exits
     if(!store.isStateExists()){return false}

     mapStates.map( (stateItem)=>{
       const stateObj = state[stateItem];

       if(stateItem === 'mapCenter'){ self.setMapCenter(stateObj)} //recenter from store
       if(stateItem === 'mapClick'){self.setMapClick(stateObj)} //map click from store
       if(stateItem === 'mapZoom'){self.setMapZoom(stateObj)} //reset map zoom from store

       if(stateItem === 'mapLayerDisplayStatus'){
         for(var key in stateObj){
           if(stateObj[key]){
              this.setLayerStatus(key);
           }
         }
       }

     })


  }
  // history.pushState({id: 'nomap'}, '', './momap');


}
