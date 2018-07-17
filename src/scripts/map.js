// dependencies
import L from 'leaflet';
import { basemapLayer, featureLayer } from 'esri-leaflet';

import { Component } from './components';
import { mapConfig } from '../config/mapConfig';

// SCSS
import '../css/_custom_leaflet.scss';

// Import custom classess
import { Store } from './store';

// import utilities
import { checkValidObject, spinnerOff, spinnerOn } from './utilitys';

// Downloaded esri-leaflet-vector to utils directory so the package works with webpack es6
// Must update manually since there are custom changes to the component!
// See github issue https://github.com/Esri/esri-leaflet-vector/issues/31 from tgirgin23
import * as vector from '../vendor/esri/esri-leaflet-vector/EsriLeafletVector';

// templates
import mapTemplate from '../templates/map.html';

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

    // Initialize Leaflet map
    this.map = L.map(this.refs.mapContainer, mapConfig.mapOptions);

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

      // to do add to seperate function/method
      tileLayer.on('load', () => {
        spinnerOff();
      });

      tileLayer.on('unload', () => {
        spinnerOff();
      });

      tileLayer.on('error', () => {
        spinnerOff();
      });

      tileLayer.on('tileunload', () => {
        spinnerOff();
      });

      tileLayer.on('tileerror', () => {
        spinnerOff();
      });

      const mapDisplayLayersObj = { [layer.id]: false };

      Object.assign(this.mapOverlayLayers, mapDisplayLayersObj);

      // Merge current layer into overlayMaps layers object
      Object.assign(this.overlayMaps, obj);
    });

    store.setStoreItem('mapLayerDisplayStatus', this.mapOverlayLayers);

    const workingElement = L.DomUtil.create('div', 'position-relative d-flex align-items-center justify-content-center leaflet-working d-none', L.DomUtil.get('map'));
    workingElement.innerHTML = '<i id="map-working" class="fa fa-spinner fa-spin d-none"></i>';
    L.DomUtil.toFront(workingElement);
    L.DomEvent.disableClickPropagation(workingElement);
  }

  saveMapPosition() {
    store.setStoreItem('mapCenter', this.map.getCenter());
    store.setStoreItem('mapZoom', this.map.getZoom());
  }


  // Add map listeners in function so we can call it from index or setup and we
  // only update state store after map is intialized.
  addMapEventListners() {
    this.map.on('moveend', (event) => {
      this.saveMapPosition();
      store.saveAction('moveend');
    });

    this.map.on('zoomend', (event) => {
      this.saveMapPosition();
      store.saveAction('zoomend');
    });

    this.map.on('dblclick', (event) => {
      this.saveMapPosition();
      store.saveAction('dblclick');
    });

    this.map.on('keypress', (event) => {
      this.saveMapPosition();
      store.saveAction('keypress');
    });
  }

  // check if should restore the map state
  static shouldRestore(props) {
    if (props === undefined || props.restore === undefined) {
      return false;
    }

    return props.restore;
  }

  // Toggle map layer visibility
  toggleLayer(layerName) {
    store.saveAction('maplayertoggle');
    let mapDisplayLayersObj = {};
    const layer = this.overlayMaps[layerName];
    if (this.map.hasLayer(layer)) {
      this.map.removeLayer(layer);
      mapDisplayLayersObj = { [layerName]: false };
    } else {
      spinnerOn();
      this.map.addLayer(layer);
      mapDisplayLayersObj = { [layerName]: true };
    }
    Object.assign(this.mapOverlayLayers, mapDisplayLayersObj);
    store.setStoreItem('mapLayerDisplayStatus', this.mapOverlayLayers);
  }

  // provide access to leaflet invalidateSize
  invalidateSize() {
    this.map.invalidateSize();
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
    this.map.panTo(value);

    if (!checkValidObject(value)) {
      return false;
    }
    this.map.panTo(value);
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
    if (!checkValidObject(value)) {
      return false;
    }
    this.map.setZoom(value);
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
    if (!checkValidObject(value)) {
      return false;
    }
    const latlng = L.latLng([value.lat, value.lng]);
    this.map.fireEvent('click', { latlng });
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
    if (checkValidObject(mapClick)) {
      self.setMapClick(mapClick);
      // this.retreiveMapClick();
    }

    // handle zoom and center set view for zoom and center when both state objects set
    if (checkValidObject(mapZoom) && checkValidObject(mapCenter)) {
      self.map.setView(mapCenter, mapZoom);
      self.setMapCenter(mapCenter);
    }

    if (checkValidObject(mapZoom) && !checkValidObject(mapCenter)) {
      // handle zoom when only zoom object set
      self.setMapZoom(mapZoom);
    } else if (checkValidObject(mapCenter) && !checkValidObject(mapZoom)) {
      // handle recenter when only mapCenter object set
      self.setMapCenter(mapCenter);
    }

    return true;
  }
}
