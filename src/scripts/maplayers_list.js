//default map template
import maplayers_listTemplate from '../templates/maplayers_list.html'
import { Component } from './components';
import { mapConfig } from '../config/mapConfig';

//scss
import '../css/maplayers_list.scss';

//templates
import layer_checkboxTemplate from '../templates/layer_checkbox.html'

/**
 * maplayers_list Component
 * Render and control map layer control
 */
export class maplayers_list extends Component {
  constructor (placeholderId, props) {
    super(placeholderId, props, maplayers_listTemplate);

    const WMSLayers = mapConfig.TileLayers;

    // Add a toggle button for each layer
    WMSLayers.forEach((layerProps) => this.addMapLayer(layerProps))
  }

  //update the id and for attribute of html for layer
  updateLayerId (layerProps){
    document.getElementById('customCheck').setAttribute('id', `${layerProps.id}-toggle`);
    document.getElementById('customLabel').setAttribute('for', `${layerProps.id}-toggle`)
    document.getElementById('customLabel').setAttribute('id', `${layerProps.id}-label`);
  }

  //update the layer name text for the checkbox's labels
  updateLayerName (layerProps){
    document.getElementById('customLabel').textContent = layerProps.label;
  }

  /** Create and append new layer button DIV */
  addMapLayer (layerProps) {

    const ToggleLayersHTML = this.refs.ToggleLayers.innerHTML;
    this.refs.ToggleLayers.innerHTML = ToggleLayersHTML + layer_checkboxTemplate;
    
    //update le
    this.updateLayerName(layerProps);
    this.updateLayerId(layerProps);



  }
}
