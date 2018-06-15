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
import mapinfo from '../templates/mapinfo.html';

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
    this.map.on('moveend', function(e) {
      self.saveStore('mapCenter', this.getCenter() );
      self.saveStore('mapZoom', this.getZoom() );
    });

    this.map.on('click', function(ev) {
      self.saveStore('mapClick', ev.latlng );
      self.retreiveMapClick();
      // if(ev.containerPoint !== undefined){
      //   self.saveStore('mapContainerPoint', {x: ev.containerPoint.x, y: ev.containerPoint.y} );
      // } else {
      //   const containerPoint = store.getStateItem('mapContainerPoint');
      //   self.saveStore('mapContainerPoint', {x: containerPoint.x, y: containerPoint.y} );
      // }
      //
      // if(ev.originalEvent !== undefined){
      //   const originalEvent = store.getStateItem('mapClickPage');
      //   self.saveStore('mapClickPage', {pageX: originalEvent.pageX, pageY: originalEvent.pageY}  );
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

  }


  /** Load map data from the API */
  async retreiveMapClick () {

    // L.clearMarkers(this.map)
    if (this.marker !== undefined) {
          this.map.removeLayer(this.marker);
    };
    console.log(this.marker)
    const IndentifyJson = {"asset": "255", "threat": "255", "exposure": "1"};

    const mapClick = store.getStateItem('mapClick');
    // const mapContainerPoint = store.getStateItem('mapContainerPoint');
    // //
    var myIcon = L.divIcon({className: 'map-info-point'});
    // //
    this.marker = L.marker([mapClick.lat,mapClick.lng], {icon: myIcon});
    this.map.addLayer(this.marker);
    // mapinfoMarker.bindPopup(mapinfo).openPopup();
    // this.map.invalidateSize();
    // mapinfo
    //
    // var tooltipTemplate =
    //     'In the district live <strong>{persons} persons<strong>.<br />' +
    //     '{children} of them are children, {adults} adults and {seniors} seniors';
    //
    // var tooltipData = {
    //   persons : 1400,
    //   children : 400,
    //   adults: 800,
    //   seniors : 200
    // };
    //
    // var tooltipContent = L.Util.template(tooltipTemplate, tooltipData);
    // // returns: 'In the district live <strong>1400 persons</strong>.<br />400 of them are children, 800 adults and 200 seniors'
    //
    // // now we can add the HTML to a certain element
    // L.DomUtil.get('tooltip').innerHTML = tooltipContent;
    //

    // const appendEl = document.querySelector('.leaflet-pane.leaflet-marker-pane')
    //
    // const pt =  L.DomUtil.getStyle(appendEl);
    // console.log(pt)
    // const mapInfoElement = L.DomUtil.create('div','mapInfo');
    // //
    // // const mapClick = store.getStateItem('mapClick');
    // mapInfoElement.innerHTML = '<div id="mapInfo-content" ref="mapInfo-content" class="mapInfo-content">test</div>';
    // //
    // console.log('mapInfoElement', mapInfoElement)
    // this.map.openPopup(mapInfoElement,mapClick)
    // // document.getElementById('mapInfo');
    // // L.DomUtil.removeClass(mapInfoElement, 'd-none');
    // L.DomUtil.setPosition(mapInfoElement,L.point(mapClick.lat,mapClick.lng));
    //
    // // Download kingdom boundaries
    // // const IndentifyJson = await this.IndentifyAPI.getIndentifySummary();
    // const mapInfoElement = document.getElementById('mapInfo');
    // L.DomUtil.removeClass(mapInfoElement, 'd-none');
    // console.log(appendEl.style.transform)
    // L.DomUtil.setPosition(mapInfoElement,L.point(mapContainerPoint.x,mapContainerPoint.y));
    // L.DomUtil.toFront(mapInfoElement)
    // console.log(mapContainerPoint.x,mapContainerPoint.y)
    // // mapInfoElement.className = mapInfoElement.className.replace(' d-none','');
    // // L.DomUtil.setPosition(mapInfoElement,L.point(mapClick.lat,mapClick.lng));
    // // L.DomUtil.toFront(mapInfoElement)
    // // const mapClick = store.getStateItem('mapClickPage');
    // console.log(mapInfoElement)
    // // mapInfoElement.css = mapInfoElement.css + ' '
    //
    // console.log(IndentifyJson);

    // const IndentifyJson = await this.IndentifyAPI.getIndentifySummary();
    // console.log(IndentifyJson)
    // const IndentifyJson = await this.IndentifyAPI.getIndentifySummary();
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
