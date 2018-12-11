// dependencies
import L from 'leaflet';

// default map template
import mapInfoTemplate from '../templates/mapinfo.html';

import { Component } from './components';
import { Store } from './store';

import { IdentifyAPI } from './identifyAPI';

import {
  checkValidObject,
  spinnerOff,
  spinnerOn,
  googleAnalyticsEvent
} from './utilitys';

import {
  drawMapInfoStats
} from './zonalStats';

// required for bootstrap
window.$ = require('jquery');
// required for tooltip, popup...
window.Popper = require('popper.js');

window.jQuery = window.$;

// tooltip and popover require javascript side modification to enable them (new in Bootstrap 4)
// use tooltip and popover components everywhere
$(() => {
  $('[data-toggle="tooltip"]').tooltip({
    trigger: 'hover focus'
  });

  $('[data-toggle="popover"]').popover();
});

const store = new Store({});

/**
* handles the identify interactions on the map
* dosen't not deal with lambda api call but it does make that call
* it does deal with the response information
* and generally handles adding any shapes to the map.
*/
export class MapInfo extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, mapInfoTemplate);

    const { mapComponent } = props;

    this.map = mapComponent.map;
    this.mapComponent = mapComponent;

    this.addMapInformationControl(this.map);

    this.IdentifyAPI = new IdentifyAPI();

    // setup marker layer which is not set yet.
    this.marker = undefined;
  }

  // add Identify control to leaflet map
  addMapInformationControl(leafletmap) {
    L.Control.Watermark = L.Control.extend({
      onAdd: MapInfo.mapInfoMakerOnAddHandler,

      // Nothing to do here
      onRemove: MapInfo.mapInfoMakerOnRemoveHandler
    });

    L.control.watermark = opts => new L.Control.Watermark(opts);

    L.control.watermark({ position: 'topleft' }).addTo(leafletmap);

    // get btn for mapinfo add click event
    const leafletControlElement = document.querySelector('.btn-mapinfo-holder');
    leafletControlElement.addEventListener('click', this.mapInformationClickHandler.bind(this));
  }

  // mapinfo (identify) control (button) on add function.
  // fires when the control (button) is removed
  static mapInfoMakerOnRemoveHandler(map) {
    // Nothing to do here yet
    return null;
  }

  // map info click handler
  mapInformationClickHandler(ev) {
    this.addMapClickIdentifyClickHandler();
    // ga event action, category, label
    googleAnalyticsEvent('click', 'button', 'mapinfo');

    // remove previous marker point
    if (this.marker !== undefined) {
      this.mapComponent.map.removeLayer(this.marker);
    }

    // make the map cursor cross hairs
    this.mapComponent.mapCursorCrosshair();

    // remove from state
    store.removeStateItem('mapClick');
  }

  // mapinfo (identify) control (button) on add function.
  // fires when the control (button) is added
  static mapInfoMakerOnAddHandler() {
    // setup custom style for mapinfo indentify control (button)
    const fa = L.DomUtil.create('div', 'btn-mapinfo-holder leaflet-bar');
    fa.setAttribute('id', 'btn-mapinfo-holder');
    fa.innerHTML = '<a class="btn btn-light btn-mapinfo" href="#" title="Map Information" ' +
                    'role="button" aria-label="Map Information"> ' +
                    '<i class="fas fa-info i-mapinfo"></a>';
    L.DomEvent.disableClickPropagation(fa);
    return fa;
  }

  // restore the state form map info/identify
  restoreMapInfoState() {
    // check the mapclick variable. if map clicked restore the state
    const mapClick = store.getStateItem('mapClick');

    // ensure the mapclick state is a valid object
    if (checkValidObject(mapClick)) {
      this.mapComponent.setMapClick(mapClick);
      const IdentifyJsonFromStore = store.getStateItem('mapinfo');
      // check if mapinfo data is store use
      // data in store over going to api again
      this.retreiveMapClick(checkValidObject(IdentifyJsonFromStore));
    }
  }

  // remove the map maker, Identify
  // point.
  removeMapMarker() {
    // remove previous marker point
    if (this.marker !== undefined) {
      this.map.removeLayer(this.marker);
    }
  }

  // re-instiate mapClick indentify
  // adding not as hanlder callback so I can use this (class) calls
  // would be better to handle this as a traditional callback
  addMapClickIdentifyClickHandler() {
    // click
    this.map.on('click', (ev) => {
      // remove old maker if it exists
      // this.marker is defined at class creation
      this.removeMapMarker();

      // save the map action to state store
      store.saveAction('click');

      // save the mapclick location to the state store
      store.setStoreItem('mapClick', ev.latlng);
      // ga event action, category, label
      googleAnalyticsEvent('click', 'map', 'mapinfo');

      // if there was a point retrieve the information from the
      // lambda api function
      if (ev.containerPoint !== undefined) {
        this.retreiveMapClick(false);
      }
    });
  }

  // Load map data from the API
  // todo what else can be seperated out to make functions more
  // testable.
  async retreiveMapClick(restore) {
    // toggle spinner css from utility.js
    spinnerOn();
    store.setStoreItem('working_mapinfo', true);

    // if there is no state exit and stop spinner
    if (!store.isStateExists()) {
      store.setStoreItem('working_mapinfo', false);
      spinnerOff('retreiveMapClick isStateExists');
      this.mapComponent.mapCursorDefault();

      // this removes the map click for mapinfo the user
      // must click the i button to do this action we will have to remove this
      // if we want users to always be able to click the map and do mapinfo
      this.mapComponent.map.off('click');
      return false;
    }

    // get the map click location from the store
    const mapClick = store.getStateItem('mapClick');

    // ensure the mapclick is valid has information we can use
    if (!checkValidObject(mapClick)) {
      store.setStoreItem('working_mapinfo', false);
      spinnerOff('retreiveMapClick checkValidObject mapClick');
      this.mapComponent.mapCursorDefault();
      // must click the i button to do this action we will have to remove this
      // if we want users to always be able to click the map and do mapinfo
      this.mapComponent.map.off('click');
      return false;
    }

    let IdentifyJson = {};
    // use store data if exists otherwise use lambda function
    if (restore) {
      // store data
      IdentifyJson = store.getStateItem('mapinfo');
      // ga event action, category, label
      googleAnalyticsEvent('call', 'store', 'IdentifyAPI');
    } else {
      // make call to lambda api.
      IdentifyJson = await this.IdentifyAPI.getIdentifySummary(mapClick.lat, mapClick.lng);
      store.setStoreItem('mapinfo', IdentifyJson);
      // ga event action, category, label
      googleAnalyticsEvent('call', 'lambda', 'IdentifyAPI');
    }

    // get the custom map marker icon
    const myIcon = MapInfo.createMapInfoIcon();

    // add the marker at the clicked point
    this.addMaker(mapClick, myIcon);

    // get the mapinfo (identify) html document and udpate
    // the content with returned values
    const doc = MapInfo.getDocument();
    MapInfo.buildMapInfoConent(IdentifyJson, doc);

    // bind the html to the leaflet marker and open as leaflet popup
    const popup = MapInfo.bindPopup(this.marker, doc);

    // toggle spinner css from utility.js
    store.setStoreItem('working_mapinfo', false);

    // add the a click handler to popup to remove the
    // the point marker from the map and state
    this.addRemoveMarkerOnClick(popup);

    spinnerOff('retreiveMapClick complete');
    this.mapComponent.mapCursorDefault();
    // must click the i button to do this action we will have to remove this
    // if we want users to always be able to click the map and do mapinfo
    this.mapComponent.map.off('click');
    return true;
  }

  // build content from identify api (lamda function)
  // @param { Object } IdentifyJson is json data returned from api
  // @param { Object } doc is html document (identify/mapinfo html element)
  //
  static buildMapInfoConent(IdentifyJson, doc) {
    drawMapInfoStats(IdentifyJson, doc);
    // tooltip and popover require javascript side modification to enable them (new in Bootstrap 4)
    // use tooltip and popover components everywhere
    $(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover focus'
      });

      $('[data-toggle="popover"]').popover();
    });
  }

  // bind popup to marker
  // @param { Object } doc is html document (identify/mapinfo html element)
  static bindPopup(marker, doc) {
    const mapinformationel = doc.getElementById('map_info_list');
    const tooltipContent = L.Util.template(mapinformationel.outerHTML);

    const popup = marker.bindPopup(
      tooltipContent,
      {
        autoClose: false,
        closeOnClick: false,
        opacity: 0.9,
        autoPan: false,
        className: 'map-information-popup'
      }
    ).openPopup().setLatLng(marker.getLatLng());

    // add labels for assessabbility
    const SearchLocationsCloseButtonElement = document.querySelector('.map-information-popup .leaflet-popup-close-button');
    SearchLocationsCloseButtonElement.setAttribute('aria-label', 'Close Map Information');
    SearchLocationsCloseButtonElement.setAttribute('title', 'Close Map Information');

    return popup;
  }

  // creates custom icon and adds css class for styling
  static createMapInfoIcon() {
    return L.divIcon({ className: 'map-info-point' });
  }

  // add maker for identify/mapInfo
  // @param { Object } mapclick object lat long
  // @param { Object } icon leaflet icon used as maker on map
  addMaker(mapClick, icon) {
    this.marker = L.marker([mapClick.lat, mapClick.lng], { icon });
    this.map.addLayer(this.marker);
  }

  // add remove popup when use closes the popup
  // adding not as hanlder callback so I can use this (class) calls
  // would be better to handle this as a traditional callback
  // @param { Object } popup to add popupclose event too.
  addRemoveMarkerOnClick(popup) {
    popup.on('popupclose', () => {
      // remove previous marker point
      if (this.marker !== undefined) {
        this.map.removeLayer(this.marker);
      }

      // remove from state
      store.removeStateItem('mapClick');
      store.removeStateItem('mapinfo');
    });
  }

  // create a html dom element for the mapinfo html template
  static getDocument() {
    const parser = new DOMParser();
    return parser.parseFromString(mapInfoTemplate, 'text/html');
  }
}
