//default map template
import maplayers_listTemplate from '../templates/maplayers_list.html'
import { Component } from './components';
import { mapConfig } from '../config/mapConfig';

//scss
import '../css/maplayers_list.scss';

//templates
// import layer_checkboxTemplate from '../templates/layer_checkbox.html'

/**
 * MapLayersList Component
 * Render and control map layer control
 */
export class MapLayersList extends Component {
  constructor (placeholderId, props) {
    super(placeholderId, props, maplayers_listTemplate);

    const WMSLayers = mapConfig.TileLayers;

    // Add a toggle button for each layer
    WMSLayers.forEach((layerProps) => this.updateMapLayer(layerProps))

  }


  /** Create and append new layer button DIV */
  updateMapLayer (layerProps) {

    //add listner
    this.addLayerListListner(layerProps.id);

    //update label
    this.updateLayerListName(layerProps.id, layerProps.label);


  }


  /*
  *  update the label text from the mapConfig.js file
  *    this is an overide so we can overide the default layer list text
  *  @param { string }  layer id for selecting the dom element.
  *   @param { string }  layer iname the layers name for the label text.
  *
  */
  updateLayerListName(layerId, layerName){
    //get and update the layer's label
    let label = document.getElementById(`${layerId}-label`);

    //ensure the html dom element exists
    if (label !== undefined || label !== null){
      //update the label
      label.textContent = layerName;
    }

  }

  /*
  *  adds an event listner to the maplayer list.
  *    The listner fires when a user clicks and toggles the display of the map layer
  *  @param { string }  layer id.
  *
  */
  addLayerListListner(layerId){
    //get and update the layer's checkbox
    let checkBox = document.getElementById(`${layerId}-toggle`);

    //ensure the html dom element exists
    if(checkBox !== undefined || checkBox !== null){

      //add the listner
      checkBox.addEventListener('click', (e) => this.toggleMapLayer(layerId));
    }


  }


  /** Toggle map layer visibility */
  toggleMapLayer (layerName) {

    // Trigger layer toggle callback
    this.triggerEvent('layerToggle', layerName)


  }
}
