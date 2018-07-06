// dependencies
import L from 'leaflet';
import { basemapLayer, featureLayer } from 'esri-leaflet';

import { Component } from './components';
import { mapConfig } from '../config/mapConfig';

// SCSS
import '../css/_custom_leaflet.scss';

// Import custom classess
import { Store } from './store';
import { IdentifyAPI } from './identifyAPI';

// Downloaded esri-leaflet-vector to utils directory so the package works with webpack es6
// Must update manually since there are custom changes to the component!
// See github issue https://github.com/Esri/esri-leaflet-vector/issues/31 from tgirgin23
import * as vector from '../vendor/esri/esri-leaflet-vector/EsriLeafletVector';

// templates
import mapTemplate from '../templates/map.html';
import mapInfoTemplate from '../templates/mapinfo.html';

const store = new Store({});

/**
 * Leaflet Map Component
 * Render map items, and provide user interactivity.
 * @extends Component
 */
export class Map extends Component {
  /**
   * Map Component Constructor
   * @param { String } placeholderId Element ID to inflate the map into
   * @param { Object } props.events.click Map item click listener
   */
  constructor(mapPlaceholderId, props) {
    super(mapPlaceholderId, props, mapTemplate);

    this.renderCount = 0;

    // set last storage object, it will be overwritten after map is intialized
    this.restoreStateStore = store.getState();
    // console.log('test3',store.getState());
    // Initialize Leaflet map
    this.map = L.map(this.refs.mapContainer, mapConfig.mapOptions);

    this.IdentifyAPI = new IdentifyAPI();

    this.map.zoomControl.setPosition('topleft'); // Position zoom control
    this.overlayMaps = {}; // Map layer dict (key/value = title/layer)
    this.value = null; // Store currently selected region
    this.mapOverlayLayers = {};

    /**
     * Adds ESRI vector map
     * var vectorTiles = vector.basemap(mapConfig.ESRIVectorBasemap.name);
     * Not using vector tiles yet since there is some bugginess from ESRI
     * mainly the map starts out not fully rendering
     */
    const mapTiles = basemapLayer(mapConfig.ESRIVectorBasemap.name);
    mapTiles.addTo(this.map);

    /**
     * Yes I am zooming in then zooming out. But leaflets tiles
     * do not setup with fully with a dynamic map container (set to 100% height.)
     * and the overlays are offset with intial draw. This zoom in zoom out
     * forces leaflet to Render everything correctly
     */
    if (!store.isStateExists()) {
      this.map.zoomOut(1);
      this.map.zoomIn(1);
    }

    L.Util.requestAnimFrame(this.map.invalidateSize, this.map, !1, this.map._container);

    // Adds wms layers
    // May switch this out for tiled s3 layers or tile esri layers later
    const WMSLayers = mapConfig.TileLayers;

    // Base maps - for now only one
    const baseMaps = {
      'Base Map': mapTiles
    };

    // Iterate over each wms map layer and add them to the map
    WMSLayers.forEach((layer) => {
      const tileLayer = L.tileLayer.wms(layer.url, {
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

      // Current leaflet layer object
      const obj = {
        [layer.id]: tileLayer
      };

      tileLayer.on('load', () => {
        Map.spinnerOff();
      });

      tileLayer.on('unload', () => {
        Map.spinnerOff();
      });

      tileLayer.on('error', () => {
        Map.spinnerOff();
      });

      const mapDisplayLayersObj = { [layer.id]: false };

      Object.assign(this.mapOverlayLayers, mapDisplayLayersObj);

      // Merge current layer into overlayMaps layers object
      Object.assign(this.overlayMaps, obj);
    });

    this.saveStore('mapLayerDisplayStatus', this.mapOverlayLayers);
    this.addMapInformationControl();

    const mapClick = store.getStateItem('mapClick');

    const workingElement = L.DomUtil.create('div', 'position-relative d-flex align-items-center justify-content-center leaflet-working d-none', L.DomUtil.get('map'));
    workingElement.innerHTML = '<i id="map-working" class="fa fa-spinner fa-spin d-none"></i>';
    L.DomUtil.toFront(workingElement);
  }

  saveMapPosition() {
    this.saveStore('mapCenter', this.map.getCenter());
    this.saveStore('mapZoom', this.map.getZoom());
  }

  saveAction(type) {
    this.saveStore('lastaction', type);
  }

  // Add map listeners in function so we can call it from index or setup and we
  // only update state store after map is intialized.
  addMapEventListners() {
    const self = this;

    this.map.on('moveend', (event) => {
      this.saveMapPosition();
      this.saveAction('moveend');
    });

    this.map.on('zoomend', (event) => {
      this.saveMapPosition();
      this.saveAction('zoomend');
    });

    this.map.on('dblclick', (event) => {
      this.saveMapPosition();
      this.saveAction('dblclick');
    });

    this.map.on('keypress', (event) => {
      this.saveMapPosition();
      this.saveAction('keypress');
    });

    // click
    this.map.on('click', (ev) => {
      this.saveMapPosition();
      this.saveAction('click');
      self.saveStore('mapClick', ev.latlng);
      if (ev.containerPoint !== undefined) {
        self.retreiveMapClick();
      }
    });
  }

  // toggle spinner visibility on
  static spinnerOn() {
    const el = document.getElementById('map-working');
    const elHolder = document.querySelector('.leaflet-working');

    // ensure elements and class names exists
    if (el === undefined) { return false; }
    if (el.className.baseVal === undefined) { return false; }
    if (elHolder === undefined) { return false; }
    if (elHolder.className === undefined) { return false; }

    // update class for svg spinner
    const elClassName = el.className.baseVal;
    el.className.baseVal = elClassName.replace(' d-none', '');

    // update class for div element that holds svg.  Do this so it dose not cover
    // cover other map elements and panes
    elHolder.className = elHolder.className.replace(' d-none', '');
    elHolder.className = elHolder.className.replace('h-100', '');
    elHolder.className = elHolder.className.replace('w-100', '');
    elHolder.className += ' h-100';
    elHolder.className += ' w-100';

    return true;
  }

  // toggle spinner visibility off
  static spinnerOff() {
    const el = document.getElementById('map-working');
    const elHolder = document.querySelector('.leaflet-working');

    // ensure elements and class names exists
    if (el === undefined) { return false; }
    if (el.className.baseVal === undefined) { return false; }
    if (elHolder === undefined) { return false; }
    if (elHolder.className === undefined) { return false; }

    // update class for svg spinner
    const elClassName = el.className.baseVal;
    el.className.baseVal = elClassName.replace(' d-none', '');
    el.className.baseVal += ' d-none';

    // update class for div element that holds svg.  Do this so it dose not cover
    // cover other map elements and panes
    elHolder.className = elHolder.className.replace(' d-none', '');
    elHolder.className = elHolder.className.replace('h-100', '');
    elHolder.className = elHolder.className.replace('w-100', '');
    elHolder.className += ' d-none';

    return true;
  }

  // Identify
  addMapInformationControl() {
    L.Control.Watermark = L.Control.extend({
      onAdd: (map) => {
        const fa = L.DomUtil.create('div', 'btn btn-light btn-mapinfo');
        fa.innerHTML = '<i class="fas fa-info i-mapinfo"></i>';
        L.DomEvent.disableClickPropagation(fa);
        return fa;
      },

      // Nothing to do here
      onRemove: (map) => {}
    });

    L.control.watermark = opts => new L.Control.Watermark(opts);

    L.control.watermark({ position: 'topleft' }).addTo(this.map);
  }

  // Note that the back-ticks are intentional. They use the new ES6 Template
  // Literals pattern.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  static replaceMapInfoValue(doc, type, values) {
    const element = doc.getElementById(`${type}-score`);
    if (element !== undefined && element !== null) {
      element.textContent = values.label;
    }
  }

  // TODO: Either generalize this so it isn't always background colot and color but instead
  // an attribute/value pair. Or preferably make this use classes so we can have the colors
  // be in css.
  static addStyle(doc, type, values) {
    const element = doc.getElementById(`${type}-score`);
    if (element !== undefined && element !== null) {
      element.setAttribute('style', `background-color: ${values.backgroundColor}; color: ${values.color};`);
    }
  }

  // Load map data from the API
  async retreiveMapClick() {
    Map.spinnerOn();

    if (!store.isStateExists()) {
      return false;
    }

    // remove previous marker point
    if (this.marker !== undefined) {
      this.map.removeLayer(this.marker);
    }

    const mapClick = store.getStateItem('mapClick');

    if (!Map.checkValidObject(mapClick)) {
      return false;
    }

    // make call to lambda api.
    const IdentifyJson = await this.IdentifyAPI.getIdentifySummary(mapClick.lat, mapClick.lng);

    // for testing without api
    // const IdentifyJson = {
    // "aquatic": 6, "tirrestrial": 2, "asset": "1", "threat": "3", "exposure": "1"
    // };

    const myIcon = L.divIcon({ className: 'map-info-point' });

    this.marker = L.marker([mapClick.lat, mapClick.lng], { icon: myIcon });
    this.map.addLayer(this.marker);

    const parser = new DOMParser();
    const doc = parser.parseFromString(mapInfoTemplate, 'text/html');

    // template needs responive info box.
    Object.keys(IdentifyJson).forEach((key) => {
      const styleItem = IdentifyAPI.getIdentifyItem(key, parseInt(IdentifyJson[key], 10));

      const templateValues = {
        name: key,
        backgroundColor: styleItem[0].backgroundColor,
        color: styleItem[0].color,
        label: styleItem[0].label
      };

      Map.addStyle(doc, key, templateValues);
      Map.replaceMapInfoValue(doc, key, templateValues);
    });

    const mapinformationel = doc.getElementById('map_info_list');
    const tooltipContent = L.Util.template(mapinformationel.outerHTML);

    // TODO overide css popup for leaflet
    this.marker.bindPopup(
      tooltipContent,
      { opacity: 0.9, autoPan: false, offset: L.point(-123, 20) }
    ).openPopup();

    Map.spinnerOff();
    return true;
  }

  static shouldRestore(props) {
    if (props === undefined || props.restore === undefined) {
      return false;
    }

    return props.restore;
  }

  // Toggle map layer visibility
  toggleLayer(layerName) {
    let mapDisplayLayersObj = {};
    const layer = this.overlayMaps[layerName];
    if (this.map.hasLayer(layer)) {
      this.map.removeLayer(layer);
      mapDisplayLayersObj = { [layerName]: false };
    } else {
      Map.spinnerOn();
      this.map.addLayer(layer);
      mapDisplayLayersObj = { [layerName]: true };
    }
    Object.assign(this.mapOverlayLayers, mapDisplayLayersObj);
    this.saveStore('mapLayerDisplayStatus', this.mapOverlayLayers);
  }

  // provide access to leaflet invalidateSize
  invalidateSize() {
    this.map.invalidateSize();
  }

  // TODO: Is this duplicated?
  saveStore(key, value) {
    const storeObj = { [key]: value };

    this.store = { ...this.store, ...storeObj };
    store.saveState(this.store);
  }

  /**
   *  recenters map accoring to a lat long
   *  @param { Object } - ex {lat: 32.76966654128219, lng: -79.93103027343751}
   *
   *  const ele.addEventListener('click', (e) => {
   *      this.setMapCenter({lat: 32.76966654128219, lng: -79.93103027343751});
   *   })
   */
  setMapCenter(value) {
    if (Map.checkValidObject(value)) {
      return false;
    }
    this.map.panTo(value);
    this.invalidateSize();

    return true;
  }

  /**
   *  zooms map into zoom level
   *  @param { integer }  integer usuall 1-18
   *
   *  const ele.addEventListener('click', (e) => {
   *      this.setMapZoom(5);
   *   })
   */
  setMapZoom(value) {
    if (Map.checkValidObject(value)) {
      return false;
    }
    this.map.setZoom(value);
    this.invalidateSize();

    return true;
  }

  /**
   *  Force a map click event without user interaction
   *  @param { Object }  {lat: 32.76966654128219, lng: -79.93103027343751}
   *
   *      this.setMapClick({lat: 32.76966654128219, lng: -79.93103027343751});
   *
   *
   */
  setMapClick(value) {
    if (Map.checkValidObject(value)) {
      return false;
    }

    const latlng = L.latLng([value.lat, value.lng]);
    this.map.fireEvent('click', { latlng });
    this.invalidateSize();

    return true;
  }

  /**
   *  Force a map layer toggle event without user interaction
   *  @param { string }  layer id examples are SA_ExposureIndex, SA_AssetIndex, SA_ThreatIndex
   *
   *  const ele.addEventListener('click', (e) => {
   *      this.setLayerStatus('SA_ThreatIndex');
   *   })
   *
   */
  static setLayerStatus(value) {
    const layerToggleElement = document.getElementById(`${value}-toggle`);
    const event = new Event('click');
    layerToggleElement.dispatchEvent(event);
    layerToggleElement.checked = !layerToggleElement.checked;
  }

  /**
   *  restore mapComponent when state exists
   *
   *  const ele.addEventListener('click', (e) => {
   *      this.restoreState();
   *   })
   *
   */
  restoreMapState() {
    // get last storage object
    store.setStateFromObject(this.restoreStateStore);

    const mapStates = ['mapCenter', 'mapClick', 'mapZoom', 'mapLayerDisplayStatus', 'mapContainerPoint'];
    const state = store.getState();
    const self = this;

    // state exits
    if (!store.isStateExists()) {
      return false;
    }

    this.invalidateSize();

    // Instantiate store variables. Otherwise the order will cause
    // the startup position to shift occasionally
    let mapZoom = null;
    let mapClick = null;
    let mapCenter = null;
    let mapLayerDisplayStatus = null;

    // iterate over the state objects and set the store variables
    mapStates.forEach((stateItem) => {
      const stateObj = state[stateItem];

      if (stateItem === 'mapCenter') { mapCenter = stateObj; } // recenter from store
      if (stateItem === 'mapClick') { mapClick = stateObj; } // map click from store
      if (stateItem === 'mapZoom') { mapZoom = stateObj; } // reset map zoom from store
      if (stateItem === 'mapLayerDisplayStatus') { mapLayerDisplayStatus = stateObj; } // set layer display
    });

    // check the mapdisplay variable and toggle layers on when state
    // says to
    if (!mapLayerDisplayStatus !== null) {
      Object.keys(mapLayerDisplayStatus).forEach((key) => {
        if (mapLayerDisplayStatus[key]) {
          Map.setLayerStatus(key);
        }
      });
    }

    // check the mapclick variable. if map clicked restore the state
    if (Map.checkValidObject(mapClick)) {
      self.setMapClick(mapClick);
      this.retreiveMapClick();
      // this.invalidateSize();
    }

    // handle zoom and center set view for zoom and center when both state objects set
    if (Map.checkValidObject(mapZoom) && Map.checkValidObject(mapCenter)) {
      self.map.setView(mapCenter, mapZoom);
    }

    if (Map.checkValidObject(mapZoom) && !Map.checkValidObject(mapCenter)) {
      // handle zoom when only zoom object set
      self.setMapZoom(mapZoom);
    } else if (Map.checkValidObject(mapCenter) && !Map.checkValidObject(mapZoom)) {
      // handle recenter when only mapCenter object set
      self.setMapCenter(mapCenter);
    }

    return true;
  }

  // ensure the object or variable is valid...
  // TODO: This should probably be looking for positives rather than checking it
  // isn't one of a few negatives. For example this will let booleans, malformed
  // lat/long objects, arrays and floats through when it probably shouldn't. The
  // code doesn't really say what a valid object is other than not undefined,
  // null, empty arrays, empty objects and empty strings.
  //
  // @param obj - typeless
  static checkValidObject(obj) {
    if (obj === undefined || obj === null) { return false; }
    if (typeof obj === 'object' && Object.keys(obj).length === 0) { return false; }
    if (typeof obj === 'string' && obj.length === 0) { return false; }

    return true;
  }
}
