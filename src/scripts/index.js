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
    this.maplayers_list = new maplayers_list('maplayers_list-holder');


  }

}


window.ctrl = new ViewController()
