//import dependencies
import Navigo from 'navigo';

//import custom classess
import { Store } from './store';

//import extended components
import { Map } from './map';
import { MapLayersList } from './maplayers_list';
import { nav_bar } from './nav_bar';

//import html templates
import AboutPage from '../templates/about.html';
import DownloadDataPage from '../templates/downloaddata.html';
import NotFoundPage from '../templates/notfound.html';

//initialize classes
const router = new Navigo('http://localhost:8080', true, "!#");
let state = new Store({test:"test"});


class ViewController {

    constructor () {

      //setup navigo router.
      router.on({
        //default route also map
        '/': (params, query)=>{

          //initialize navbar
          this.initializeNavbar('index');

          //initialize map
          this.initializeMap();

        },
        //go to map page
        '/map': (params, query)=>{

          //initialize navbar
          this.initializeNavbar('index');

          //initialize map
          this.initializeMap();

        },
        //go to about page
        '/about': (params, query)=>{

          //initialize navbar
          this.initializeNavbar('about');

          //initialize about
          this.componentElem = document.getElementById("app");
          this.componentElem.innerHTML = AboutPage;

        },
        //go to download data page
        '/downloaddata': (params, query)=>{

          //initialize navbar
          this.initializeNavbar('download');

          //initialize download
          this.componentElem = document.getElementById("app");
          this.componentElem.innerHTML = DownloadDataPage;

        },

      })


      router.notFound(function (query) {
        //initialize 404
        this.componentElem = document.getElementById("app");
        this.componentElem.innerHTML = NotFoundPage;
      });

      //resolve
      router.resolve();

    }

    initializeNavbar (page){
      this.navComponent = new nav_bar('nav-holder',{activeNav: page});
    }

    initializeMap(){

      // this.mapComponent = new Map('map-holder',{state:state});
        console.log('initializeMap',state)
      this.mapComponent = new Map('map-holder');
      console.log(this.mapComponent.map)
      // Initialize Layer Toggle Panel
      this.maplayersComponent = new MapLayersList('maplayers_list-holder',{
        events: { layerToggle:
          // Toggle layer in map controller on "layerToggle" event
           event => { this.mapComponent.toggleLayer(event.detail) }
        }
      })
    }
}

window.ctrl = new ViewController();
