//
import { Map } from './map'
import { MapLayersList } from './maplayers_list'
import { nav_bar } from './nav_bar'

class ViewController {

  /** Initialize Application */
  constructor () {
    this.initializeComponents()
  }

  initializeComponents () {
    // Initialize Map
    this.mapComponent = new Map('map-holder');

    // Initialize Nav Var
    this.navComponent = new nav_bar('nav-holder');

    // Initialize Layer Toggle Panel
    this.maplayersComponent = new MapLayersList('maplayers_list-holder',{
      events: { layerToggle:
        // Toggle layer in map controller on "layerToggle" event
         event => { this.mapComponent.toggleLayer(event.detail) }
      }
    })
  }
}


window.ctrl = new ViewController()
