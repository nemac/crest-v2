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
  addStyle,
  replaceMapInfoValue
} from './utilitys';

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

    MapInfo.addMapInformationControl(this.map);

    this.IdentifyAPI = new IdentifyAPI();

    // setup marker layer which is not set yet.
    this.marker = undefined;

    this.addMapClickIdentifyClickHandler();
  }

  // add Identify control to leaflet map
  static addMapInformationControl(leafletmap) {
    L.Control.Watermark = L.Control.extend({
      onAdd: MapInfo.mapInfoMakerOnAddHandler,

      // Nothing to do here
      onRemove: MapInfo.mapInfoMakerOnRemoveHandler
    });

    L.control.watermark = opts => new L.Control.Watermark(opts);

    L.control.watermark({ position: 'topleft' }).addTo(leafletmap);
  }

  // mapinfo (identify) control (button) on add function.
  // fires when the control (button) is removed
  static mapInfoMakerOnRemoveHandler(map) {
    // Nothing to do here yet
    return null;
  }

  // mapinfo (identify) control (button) on add function.
  // fires when the control (button) is added
  static mapInfoMakerOnAddHandler(map) {
    // setup custom style for mapinfo indentify control (button)
    const fa = L.DomUtil.create('div', 'btn btn-light btn-mapinfo');
    fa.innerHTML = '<i class="fas fa-info i-mapinfo"></i>';
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
      this.retreiveMapClick();
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

      // set zoom and map position on map click (just and case it changes)
      // it's possible the add marker will autopan
      this.mapComponent.saveZoomAndMapPosition();

      // save the map action to state store
      store.saveAction('click');

      // save the mapclick location to the state store
      store.setStoreItem('mapClick', ev.latlng);

      // if there was a point retrieve the information from the
      // lambda api function
      if (ev.containerPoint !== undefined) {
        this.retreiveMapClick();
      }
    });
  }

  // Load map data from the API
  // todo what else can be seperated out to make functions more
  // testable.
  async retreiveMapClick() {
    // toggle spinner css from utility.js
    spinnerOn();

    // if there is no state exit and stop spinner
    if (!store.isStateExists()) {
      spinnerOff();
      return false;
    }

    // get the map click location from the store
    const mapClick = store.getStateItem('mapClick');

    // ensure the mapclick is valid has information we can use
    if (!checkValidObject(mapClick)) {
      spinnerOff();
      return false;
    }

    // make call to lambda api.
    const IdentifyJson = await this.IdentifyAPI.getIdentifySummary(mapClick.lat, mapClick.lng);

    // for testing without api
    // const IdentifyJson = {
    // "aquatic": 6, "tirrestrial": 2, "asset": "1", "threat": "3", "exposure": "1"
    // };

    // get the custom map marker icon
    const myIcon = MapInfo.createMapInfoIcon();

    // add the marker at the clicked point
    this.addMaker(mapClick, myIcon);

    // get the mapinfo (identify) html document and udpate
    // the content with returned values
    const doc = MapInfo.getDocument();
    MapInfo.buildMapInfoConent(IdentifyJson, doc);

    // bind the html to the leaflet marker and open as leaflet popup
    const popup = this.bindPopup(doc);

    // add the a click handler to popup to remove the
    // the point marker from the map and state
    this.addRemoveMarkerOnClick(popup);

    // toggle spinner css from utility.js
    spinnerOff();
    return true;
  }

  // build content from identify api (lamda function)
  // @param { Object } IdentifyJson is json data returned from api
  // @param { Object } doc is html document (identify/mapinfo html element)
  //
  static buildMapInfoConent(IdentifyJson, doc) {
    // template needs responive info box.
    Object.keys(IdentifyJson).forEach((key) => {
      const styleItem = IdentifyAPI.getIdentifyItem(key, parseInt(IdentifyJson[key], 10));

      const templateValues = {
        name: key,
        backgroundColor: styleItem[0].backgroundColor,
        color: styleItem[0].color,
        label: styleItem[0].label
      };

      // both in utilit.js might not be best place?
      addStyle(doc, key, templateValues);
      replaceMapInfoValue(doc, key, templateValues);
    });
  }

  // bind popup to marker
  // @param { Object } doc is html document (identify/mapinfo html element)
  bindPopup(doc) {
    const mapinformationel = doc.getElementById('map_info_list');
    const tooltipContent = L.Util.template(mapinformationel.outerHTML);

    const popup = this.marker.bindPopup(
      tooltipContent,
      {
        autoClose: false,
        closeOnClick: false,
        opacity: 0.9,
        autoPan: false,
        offset: L.point(-123, 20)
      }
    ).openPopup();

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
    });
  }

  // create a html dom element for the mapinfo html template
  static getDocument() {
    const parser = new DOMParser();
    return parser.parseFromString(mapInfoTemplate, 'text/html');
  }
}
