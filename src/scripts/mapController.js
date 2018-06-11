import { Map } from './map';
import { MapLayersList } from './maplayers_list';
import { nav_bar } from './nav_bar';


    const mapComponent = new Map('map-holder');
    // console.log(this.mapComponent.renderCount);
    // console.log(this.mapComponent.overlayMaps)
    // Initialize Nav Var
    const navComponent = new nav_bar('nav-holder',{activeNav: 'index'});

    // Initialize Layer Toggle Panel
    const maplayersComponent = new MapLayersList('maplayers_list-holder',{
      events: { layerToggle:
        // Toggle layer in map controller on "layerToggle" event
         event => { mapComponent.toggleLayer(event.detail) }
      }
    })
