//
import { Map } from './map'
import { maplayers_list } from './maplayers_list'


class ViewController {

  /** Initialize Application */
  constructor () {
    this.initializeComponents()
  }

  initializeComponents () {
    // Initialize Map
    this.mapComponent = new Map('map-holder');

    // Initialize Layer Toggle Panel
    this.maplayers_list = new maplayers_list('maplayers_list-holder',{
      events: { layerToggle:
        // Toggle layer in map controller on "layerToggle" event
         event => { this.mapComponent.toggleLayer(event.detail) }
      }
    })
  }
}


window.ctrl = new ViewController()
