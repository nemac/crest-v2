// import dependencies
import Navigo from 'navigo';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';

// import custom classess
import { Store } from './store';
// import extended components
import { Map } from './map';
import { MapLayersList } from './maplayers_list';
import { nav_bar } from './nav_bar';

// import html templates
import AboutPage from '../templates/about.html';
import DownloadDataPage from '../templates/downloaddata.html';
import NotFoundPage from '../templates/notfound.html';

// initialize navbar
const navbarComponent = new nav_bar('nav-holder');
let mapComponent;
let maplayersComponent;

const store = new Store({});

let homeloc = window.location.origin;
// handle gh pages dist folder.
if (homeloc === 'https://nemac.github.io') {
  homeloc += '/NFWF_tool/dist';
}

const router = new Navigo(homeloc, true);

// TODO: make the tab content area dynamic also similar to the nav tabs

// examples of coded map interactions
const maintitleElement = document.getElementById('maintitle');
maintitleElement.addEventListener('click', (e) => {
  // mapComponent.setLayerStatus('SA_ThreatIndex');
  // mapComponent.setMapClick({lat: 32.76966654128219, lng: -79.93103027343751});
  // mapComponent.setMapZoom(5);
  // mapComponent.setMapCenter({lat: 32.76966654128219, lng: -79.93103027343751});
  // console.log('test')
  // mapComponent.clearState();
  // console.log(store.clearState())
  // console.log(store.getStateItem("mapClick"))
  // console.log(mapComponent.restoreMapState())
  // mapComponent.setStateFromObject(store.getState())
  // console.log(store.getStateItem('mapLayerDisplayStatus'))
  // console.log(store.removeStateItem('mapClick'));
  // console.log(store.addStateItem('mapClick',{lat: 32.76966654128219, lng: -79.93103027343751}));
  // console.log()
});

router.on({
  '/': (params, query) => {
    if (mapComponent === undefined) {
      mapComponent = new Map('map-holder');

      maplayersComponent = new MapLayersList('maplayers_list-holder', {
        events: {
          // Toggle layer in map controller on "layerToggle" event
          layerToggle: (event) => { mapComponent.toggleLayer(event.detail); }
        }
      });
    }

    // deal with nav bars so back button is not broken
    navbarComponent.resetTabContent();
    navbarComponent.toggleTabContent('main-nav-map');
    navbarComponent.tabUpdate('main-nav-map');

    // restore only if first render
    if (mapComponent.renderCount === 0) {
      mapComponent.restoreMapState();
    }
    mapComponent.renderCount += 1;
    const mapCenter = store.getStateItem('mapCenter');

    // delay listners unitll after setup
    mapComponent.addMapEventListners(mapComponent.map);
  },
  '/Home': (params, query) => {
    if (mapComponent === undefined) {
      mapComponent = new Map('map-holder');

      maplayersComponent = new MapLayersList('maplayers_list-holder', {
        // Toggle layer in map controller on "layerToggle" event
        events: {
          layerToggle: (event) => { mapComponent.toggleLayer(event.detail); }
        }
      });
    }

    // deal with nav bars so back button is not broken
    navbarComponent.resetTabContent();
    navbarComponent.toggleTabContent('main-nav-map');
    navbarComponent.tabUpdate('main-nav-map');

    if (mapComponent.renderCount === 0) {
      mapComponent.restoreMapState();
    }
    mapComponent.renderCount += 1;
    const mapCenter = store.getStateItem('mapCenter');

    // delay listners unitll after setup
    mapComponent.addMapEventListners(mapComponent.map);
  },
  '/About': (params, query) => {
    // deal with nav bars so back button is not broken
    navbarComponent.resetTabContent();
    navbarComponent.toggleTabContent('main-nav-about');
    navbarComponent.tabUpdate('main-nav-about');

    const componentElem = document.getElementById('about-holder');
    componentElem.innerHTML = AboutPage;
  },
  '/Download': (params, query) => {
    // deal with nav bars so back button is not broken
    navbarComponent.resetTabContent();
    navbarComponent.toggleTabContent('main-nav-download');
    navbarComponent.tabUpdate('main-nav-download');

    const componentElem = document.getElementById('download-holder');
    componentElem.innerHTML = DownloadDataPage;
  }
});

// implement later need to make the tab content area dynamic also
router.notFound((query) => {
  // initialize 404
  this.componentElem = document.getElementById('notfound-holder');
  this.componentElem.innerHTML = NotFoundPage;

  navbarComponent.resetTabContent();
  navbarComponent.toggleTabContent('main-nav-notfound');
});

router.resolve();
