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
    this.map.on('moveend', function(e) {
      self.saveStore('mapCenter', this.getCenter() );
      self.saveStore('mapZoom', this.getZoom() );
    });

    this.map.on('click', function(ev) {
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

  }


  /** Load map data from the API */
  async retreiveMapClick () {


    // console.log(this.IndentifyAPI.getIndentifyItem ('exposure', 255));

    // remove prevuis marker
    if (this.marker !== undefined) {
          this.map.removeLayer(this.marker);
    };

    const IndentifyJson = {"asset": "1", "threat": "3", "exposure": "1"};

    // const IndentifyJson = await this.IndentifyAPI.getIndentifySummary();

    const mapClick = store.getStateItem('mapClick');

    var myIcon = L.divIcon({className: 'map-info-point'});

    this.marker = L.marker([mapClick.lat,mapClick.lng], {icon: myIcon});
    this.map.addLayer(this.marker);


    var mapInfo_Template = `<div ref="map_info_list" class="map_info_list">
                              <div class="toggle-list">
                                <h5>Map Information</h5>
                                <hr />
                                <div ref="mapinfodata" id="mapinfodata" class="text-left mapinfodata">`


    for(var key in IndentifyJson){
      // mapInfo_Template += "<div>" + key + "  score: {" + key + "}</div>"
      const styleItem = this.IndentifyAPI.getIndentifyItem (key, parseInt(IndentifyJson[key]) )

      // console.log('here', styleItem[0].layer )
      // if(styleItem[0] !== undefined){
        // console.log( "<div>" + key + "  score: {" + key + "}</div>")
        mapInfo_Template += ' <div class="mapinfodata-holder" >' +
                            '    <div class="mapinfodata-score text-left" > ' + key + ' score: </div>' +
                            '   <div class="data-score text-center" style="background-color: ' + styleItem[0].backgroundColor + '; color: ' + styleItem[0].color + ';" >' + styleItem[0].label + '</div>' +
                            ' </div>'

    // }

      // console.log(this.IndentifyAPI.getIndentifyItem (key, parseInt(IndentifyJson[key]) ))
      // const item = await this.IndentifyAPI.getIndentifyItem(key, IndentifyJson[key])
      // console.log(item)
    }

    mapInfo_Template += `     </div>
                            </div>
                          </div>`;

    //to do loop json to dynamically create this
    // or create from template
    // var mapInfo_function = function(mapInfoTemplate, mapInfoData){
    //   for(var key in mapInfoData){
    //     if(mapInfoData[key]){
    //       console.log(mapInfoData[key]);
    //     }
    //   }
    //
    //     // L.Util.template(tooltipTemplate, tooltipData);
    //     // mapInfoTemplate
    // }


        // '<div> asset score: {asset}</div><div> threat score: {threat}</div><div> exposure score: {exposure}</div>';

    // var tooltipData = IndentifyJson;
    //
    var tooltipContent = L.Util.template(mapInfo_Template);

    //to do overide css popup for leaflet
    this.marker.bindPopup(tooltipContent,{offset:L.point(-125,20)}).openPopup();

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
