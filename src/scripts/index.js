//
import { Map } from './map';
import { MapLayersList } from './maplayers_list';
import { nav_bar } from './nav_bar';
// import { Store } from './store'
//
// var state = new Store({renderCount:0});
// state.renderCount =+ 1
// console.log(paths)
class ViewController {

  //view should instiate
  // state = new Store({test:"test"})

  /** Initialize Application */
  constructor () {
    console.log('start')
    this.initializeComponents()
    // this.;
    // console.log('1',state.getName())



  }

  initializeComponents () {


    // state.setName({test2:"test2"});
    // console.log('2', state.getName())
    // state.setName({test2:"test3"});
    // console.log('8', state.getName())

    // Initialize Map
    // this.mapComponent = new Map('map-holder',{state:state});
    this.mapComponent = new Map('map-holder');
    // console.log(this.mapComponent.renderCount);
    // console.log(this.mapComponent.overlayMaps)
    // Initialize Nav Var
    this.navComponent = new nav_bar('nav-holder',{activeNav: 'index'});

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
