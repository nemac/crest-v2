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
* explore Component
* Explore handles drawing on map, uploading of shapefile,
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

    this.addMapClickIdentify();
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
  addMapClickIdentify() {
    // click
    this.map.on('click', (ev) => {
      // remove old maker if it exists
      //  this.marker is defined at class creation
      this.removeMapMarker();

      this.mapComponent.saveMapPosition();
      store.saveAction('click');
      store.setStoreItem('mapClick', ev.latlng);

      if (ev.containerPoint !== undefined) {
        this.retreiveMapClick();
      }
    });
  }

  // Load map data from the API
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

      // both in utilit.js might not be best place?
      addStyle(doc, key, templateValues);
      replaceMapInfoValue(doc, key, templateValues);
    });

    const mapinformationel = doc.getElementById('map_info_list');
    const tooltipContent = L.Util.template(mapinformationel.outerHTML);

    // TODO overide css popup for leaflet
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

    // remove class
    this.map.on('popupclose', () => {
      // remove previous marker point
      if (this.marker !== undefined) {
        this.map.removeLayer(this.marker);
      }

      // remove from state
      store.removeStateItem('mapClick');
    });

    // toggle spinner css from utility.js
    spinnerOff();
    return true;
  }
  // // bind popup to marker
  // bindPopup() {
  //
  // }
}
