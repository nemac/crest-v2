// default map template
import maplayersListTemplate from '../templates/maplayers_list.html';

import { Component } from './components';
import { mapConfig } from '../config/mapConfig';
import { Store } from './store';

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

    // check if map layer list is minimized on initialization if so minimize it.
    const mapLayerListState = store.getStateItem('maplayerlist');

    if (mapLayerListState === 'close') {
      const element = document.getElementById('maplayers_list_close');
      const event = new Event('click');
      element.dispatchEvent(event);
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
