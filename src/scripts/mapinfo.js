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

    L.control.watermark({ position: 'topleft' }).addTo(leafletmap);
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
  addMapClickIdentifyClickHandler() {
    // click
    this.map.on('click', (ev) => {
      // remove old maker if it exists
      //  this.marker is defined at class creation
      this.removeMapMarker();

      this.mapComponent.saveZoomAndMapPosition();
      store.saveAction('click');
      store.setStoreItem('mapClick', ev.latlng);

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

    if (!store.isStateExists()) {
      spinnerOff();
      return false;
    }

    const mapClick = store.getStateItem('mapClick');

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

    const myIcon = MapInfo.createMapInfoIcon();

    this.addMaker(mapClick, myIcon);

    const doc = MapInfo.getDocument();
    MapInfo.buildMapInfoConent(IdentifyJson, doc);

    this.bindPopup(doc);

    this.addRemoveMarkerOnClick();

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

    this.marker.bindPopup(
      tooltipContent,
      {
        autoClose: false,
        closeOnClick: false,
        opacity: 0.9,
        autoPan: false,
        offset: L.point(-123, 20)
      }
    ).openPopup();
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
  // remove class
  addRemoveMarkerOnClick() {
    this.map.on('popupclose', () => {
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
