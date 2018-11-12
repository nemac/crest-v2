// default map template
import maplayersListTemplate from '../templates/maplayers_list.html';

import { Component } from './components';
import { mapConfig } from '../config/mapConfig';
import { Store } from './store';

// Legend Templates
import ColorRampHub from '../templates/colorramp_hub.html';
import ColorRampAquatic from '../templates/colorramp_aquatic.html';
import ColorRampTerrestrial from '../templates/colorramp_terrestrial.html';
import ColorRampExposure from '../templates/colorramp_exposure.html';
import ColorRampAsset from '../templates/colorramp_asset.html';
import ColorRampThreat from '../templates/colorramp_threat.html';
import ColorRampDriverAsset from '../templates/colorramp_driver_asset.html';
import ColorRampDriverThreat from '../templates/colorramp_driver_threat.html';

// scss
import '../css/maplayers_list.scss';

const store = new Store({});

// templates
// import layer_checkboxTemplate from '../templates/layer_checkbox.html'

/**
 * MapLayersList Component
 * Render and control map layer control
 */
export class MapLayersList extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, maplayersListTemplate);

    const WMSLayers = mapConfig.TileLayers;
    const TMSLayers = mapConfig.TMSLayers;

    MapLayersList.addOpenMapLayerListener();
    MapLayersList.addCloseMapLayerListener();

    // Add a toggle button for each layer
    WMSLayers.forEach((layerProps) => { this.updateMapLayer(layerProps); });
    TMSLayers.forEach((layerProps) => { this.updateMapLayer(layerProps); });
    TMSLayers.forEach((layerProps) => { MapLayersList.addLegendHTML(layerProps); });

    // check if map layer list is minimized on initialization if so minimize it.
    const mapLayerListState = store.getStateItem('maplayerlist');

    if (mapLayerListState === 'close') {
      const element = document.getElementById('maplayers_list_close');
      const event = new Event('click');
      element.dispatchEvent(event);
    }

    MapLayersList.addBaseMapListeners(props.mapComponent);
    MapLayersList.addDescriptionListeners();
  }

  static addBaseMapListeners(mapComponent) {
    document.getElementById('basemap-DarkGray').addEventListener('click', (e) => {
      mapComponent.changeBaseMap('DarkGray');
      MapLayersList.updateBaseMapLabel('Dark Gray');
    });

    document.getElementById('basemap-Imagery').addEventListener('click', (e) => {
      mapComponent.changeBaseMap('Imagery');
      MapLayersList.updateBaseMapLabel('Imagery');
    });

    document.getElementById('basemap-Topographic').addEventListener('click', (e) => {
      mapComponent.changeBaseMap('Topographic');
      MapLayersList.updateBaseMapLabel('Topographic');
    });

    document.getElementById('basemap-Streets').addEventListener('click', (e) => {
      mapComponent.changeBaseMap('Streets');
      MapLayersList.updateBaseMapLabel('Streets');
    });

    const btnBaseMapElem = document.getElementById('btn-basemap');
    if (btnBaseMapElem) {
      btnBaseMapElem.addEventListener('click', (e) => { MapLayersList.baseMapListToggle(e); });
    }

    const btnBaseMapList = document.getElementById('basemaplist');
    if (btnBaseMapList) {
      btnBaseMapList.addEventListener('click', (e) => { MapLayersList.baseMapListToggle(e); });
    }
  }

  static updateBaseMapLabel(basemapname) {
    const labelElem = document.getElementById('btn-basemap-label');
    if (labelElem) {
      labelElem.innerHTML = basemapname;
    }
  }

  // toggle basemap list on
  static baseMapListToggle(e) {
    const baseMapListElem = document.getElementById('basemaplist');
    const isBaseMapListVissible = baseMapListElem.classList.contains('active');
    if (isBaseMapListVissible) {
      baseMapListElem.classList.remove('active');
    } else {
      baseMapListElem.classList.add('active');
    }
  }

  static addOpenMapLayerListener() {
    const layerListCollapse = document.getElementById('maplayers_list_open');
    layerListCollapse.addEventListener('mouseover', (e) => { e.target.style.cursor = 'pointer'; });
    layerListCollapse.addEventListener('mouseout', (e) => { e.target.style.cursor = 'default'; });

    // add the listener
    layerListCollapse.addEventListener('click', (ev) => {
      store.setStoreItem('lastaction', 'maplayerlistopen');
      store.setStoreItem('maplayerlist', 'open');
      const layerListOpened = document.getElementById('maplayers_list_opened');
      const layerListCollapsed = document.getElementById('map_info_list_collapse');

      layerListCollapsed.className = `${layerListCollapsed.className} d-none`;
      layerListOpened.className = layerListOpened.className.replace(' d-none', '');
    });
  }

  static addCloseMapLayerListener() {
    const layerListClose = document.getElementById('maplayers_list_close');
    layerListClose.addEventListener('mouseover', (e) => { e.target.style.cursor = 'pointer'; });
    layerListClose.addEventListener('mouseout', (e) => { e.target.style.cursor = 'default'; });

    // add the listener
    layerListClose.addEventListener('click', (ev) => {
      store.setStoreItem('lastaction', 'maplayerlistclose');
      store.setStoreItem('maplayerlist', 'close');
      const layerListOpened = document.getElementById('maplayers_list_opened');
      const layerListCollapsed = document.getElementById('map_info_list_collapse');

      // layerListOpened.className = layerListOpened.className.replace(' d-none','');
      layerListOpened.className = `${layerListOpened.className} d-none`;
      layerListCollapsed.className = layerListCollapsed.className.replace(' d-none', '');
    });
  }

  /** Create and append new layer button DIV */
  updateMapLayer(layerProps) {
    // add listener
    this.addLayerListListener(layerProps.id);

    // update label
    MapLayersList.updateLayerListName(layerProps.id, layerProps.label);
  }

  // Gets the HTML wrapper of layer controls by id
  //
  // @param id | String
  // @return DOM Element
  static getLayerWrapperFromString(id) {
    return document.getElementById(`${id}-layerToggle`);
  }

  // Gets the HTML wrapper of layer controls by child elem
  //
  // @param elem | DOM Element
  // @return DOM Element
  static getLayerWrapperFromElem(elem) {
    return elem.closest('.custom-control');
  }

  // Multiple functions need to get the wrapper but have different parameters available in their
  // closure, so this gets the wrapper based on what they have.
  //
  // @param param | String || DOM Element
  // @return DOM Element
  static getLayerWrapper(param) {
    return typeof param === 'string' ? MapLayersList.getLayerWrapperFromString(param) :
      MapLayersList.getLayerWrapperFromElem(param);
  }

  // Gets the HTML wrapper of a layers legend and description
  //
  // @param elem | DOM Element
  // @return DOM Element
  static getLegendWrapper(elem) {
    return elem.querySelector('.layer-legend');
  }

  // Returns the HTML for a specified legend type
  //
  // @param type | String
  // @return String
  static getLegendHtml(type) {
    switch (type) {
      case 'hub':
        return ColorRampHub;
      case 'asset':
        return ColorRampAsset;
      case 'threat':
        return ColorRampThreat;
      case 'exposure':
        return ColorRampExposure;
      case 'terrestrial':
        return ColorRampTerrestrial;
      case 'aquatic':
        return ColorRampAquatic;
      case 'driver-asset':
        return ColorRampDriverAsset;
      case 'driver-threat':
        return ColorRampDriverThreat;
      default:
        return '';
    }
  }

  // Gets the HTML wrapper of a layers description
  //
  // @param elem | DOM Element
  // @return DOM Element
  static getDescriptionWrapper(elem) {
    return elem.querySelector('.layer-description-text');
  }

  // Opens and closes the legend area
  //
  // @param elem | DOM Element
  static toggleLegendHtml(elem) {
    elem.classList.toggle('closed');
    MapLayersList.getLayerWrapper(elem).querySelector('.layer-description-wrapper').classList.toggle('closed');
  }

  // Gets the id of the legend to be used in the store
  //
  // @param elem | DOM Element
  static getLegendId(elem) {
    return `${MapLayersList.getLayerWrapper(elem).id.replace('-layerToggle', '')}-legend`;
  }

  // Adds or removes the legend from the store
  //
  // @param elem | DOM Element
  static toggleLegendState(elem) {
    const legendId = MapLayersList.getLegendId(elem);
    store.checkItem(legendId) ? store.removeStateItem(legendId) :
      store.addStateItem(legendId, 'true');
  }

  // Opens the legend block if the legend id is in the store
  //
  // @param elem | DOM Element
  static setInitialLegendStatus(elem) {
    const legendId = MapLayersList.getLegendId(elem);
    if (store.checkItem(legendId)) {
      MapLayersList.toggleLegendHtml(elem);
    }
  }

  // Inserts the legend and layer description
  //
  // @param layerProps | Object
  static addLegendHTML(layerProps) {
    const layerElem = MapLayersList.getLayerWrapper(layerProps.id);
    MapLayersList.getLegendWrapper(layerElem).innerHTML =
        MapLayersList.getLegendHtml(layerProps.legend);
    MapLayersList.getDescriptionWrapper(layerElem).textContent = layerProps.description;
    MapLayersList.setInitialLegendStatus(layerElem.getElementsByClassName('layer-description-toggler')[0]);
  }

  // Handles the toggle legend button being interacted with
  // `this` is the button dom element.
  static handleLegendChange(e) {
    MapLayersList.toggleLegendHtml(this);
    MapLayersList.toggleLegendState(this);
  }

  // Adds listeners to the legend buttons
  static addDescriptionListeners() {
    const descriptionButtons = document.getElementsByClassName('layer-description-toggler');
    let i;
    let l;
    for (i = 0, l = descriptionButtons.length; i < l; i += 1) {
      descriptionButtons[i].addEventListener('click', MapLayersList.handleLegendChange);
    }
  }

  /**
   *  update the label text from the mapConfig.js file
   *    this is an overide so we can overide the default layer list text
   *  @param { string }  layer id for selecting the dom element.
   *   @param { string }  layer iname the layers name for the label text.
   *
   */
  static updateLayerListName(layerId, layerName) {
    // get and update the layer's label
    const label = document.getElementById(`${layerId}-label`);

    // ensure the html dom element exists
    if (label !== undefined) {
      if (label != null) {
        // update the label
        label.textContent = layerName;
      }
    }
  }

  /**
   *  adds an event listner to the maplayer list.
   *    The listner fires when a user clicks and toggles the display of the map layer
   *  @param { string }  layer id.
   *
   */
  addLayerListListener(layerId) {
    // get and update the layer's checkbox
    const checkBox = document.getElementById(`${layerId}-toggle`);

    // ensure the html dom element exists
    if (checkBox !== undefined) {
      if (checkBox != null) {
        // add the listner
        checkBox.addEventListener('click', (e) => { this.toggleMapLayer(layerId); });
      }
    }
  }

  /** Toggle map layer visibility */
  toggleMapLayer(layerName) {
    // Trigger layer toggle callback
    this.triggerEvent('layerToggle', layerName);
  }
}

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = (s) => {
    let el = this;
    if (!document.documentElement.contains(el)) {
      return null;
    }
    do {
      if (el.matches(s)) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}
