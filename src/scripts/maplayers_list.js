//default map template
import maplayers_listTemplate from '../templates/maplayers_list.html'
import { Component } from './components';
import { mapConfig } from '../config/mapConfig';

//scss
import '../css/maplayers_list.scss';

//templates
import layer_checkboxTemplate from '../templates/layer_checkbox.html'

/**
 * MapLayersList Component
 * Render and control map layer control
 */
export class MapLayersList extends Component {
  constructor (placeholderId, props) {
    super(placeholderId, props, maplayers_listTemplate);

    const WMSLayers = mapConfig.TileLayers;

    // Add a toggle button for each layer
    WMSLayers.forEach((layerProps) => this.addMapLayer(layerProps))
  }


  /** Create and append new layer button DIV */
  addMapLayer (layerProps) {
    const layerName = layerProps.id

    //convert to html element
    const ToggleLayersHTML = this.refs.ToggleLayers.innerHTML;
    let parser = new DOMParser()
    let el = parser.parseFromString(layer_checkboxTemplate, "text/html");

    //get elements
    let layerItem = el.getElementById('layerToggle')

    //get and update the layer's checkbox
    let checkBox = el.getElementById('customCheck');
    checkBox.setAttribute('ref', `${layerProps.id}-toggle`) //checkbox ref
    checkBox.setAttribute('id', `${layerProps.id}-toggle`); //checkbox id

    //get and update the layer's label
    let customLabel = el.getElementById('customLabel');
    customLabel.setAttribute('for', `${layerProps.id}-toggle`)
    customLabel.textContent = layerProps.label;   //label text
    customLabel.setAttribute('ref', `${layerProps.id}-label`) //checkbox ref
    customLabel.setAttribute('id', `${layerProps.id}-label`); //label id

    //update the layers click event
    checkBox.addEventListener('click', (e) => this.toggleMapLayer(layerName))
    this.refs.ToggleLayers.appendChild(layerItem)

  }


  /** Toggle map layer visibility */
  toggleMapLayer (layerName) {

    // Trigger layer toggle callback
    this.triggerEvent('layerToggle', layerName)

  }
}
