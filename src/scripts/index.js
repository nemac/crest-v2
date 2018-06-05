//
import { Map } from './map'


class ViewController {

    /** Initialize Application */
  constructor () {
    this.initializeComponents()
  }

  initializeComponents () {
    // Initialize Map
    this.mapComponent = new Map('map-placeholder')
  }

}


window.ctrl = new ViewController()
