// import dependencies
import Navigo from 'navigo';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';

// import custom classess
import { Store } from './store';
import { URL } from './url';
import { checkValidObject } from './utilitys';

// import extended components
import { Map } from './map';
import { MapLayersList } from './maplayers_list';
import { NavBar } from './navBar';
import { AboutNavBar } from './aboutNav';
import { Explore } from './explore';
import { MapInfo } from './mapinfo';
import { SearchLocations } from './searchlocations';

// import html templates
import AboutPage from '../templates/about.html';
import DownloadDataPage from '../templates/downloaddata.html';
import NotFoundPage from '../templates/notfound.html';
import ExplorePage from '../templates/explore.html';
import SearchLocationsPage from '../templates/searchlocations.html';

// initialize navbar
// const aboutnavBarComponent = new AboutNavBar('nav-holder');
const navBarComponent = new NavBar('nav-holder');

new URL();

let mapComponent;
let maplayersComponent;
let exploreComponent;
let mapInfoComponent;
let searchLocationsComponent;

const store = new Store({});

let homeloc = window.location.origin;
// handle gh pages dist folder.
if (homeloc === 'https://nemac.github.io') {
  homeloc += '/NFWF_tool/dist';
}

// Creates a new Leaflet Map in the target DOM element
//
// @param selector - string DOM selector
// Closes over global import Map
function initMap(selector) {
  return new Map(selector);
}

// Creates a new Leaflet Map in the target DOM element
//
// @param map - instantiated element of class Map
// @param selector - string DOM selector
// Closes over global import MapLayersList
function initMapLayerList(map, selector) {
  return new MapLayersList(selector, {
    events: {
      layerToggle: (event) => { map.toggleLayer(event.detail); }
    }
  });
}

// Creates the entire map component
//
// Closes over global import Map
function initMapComponent() {
  if (mapComponent === undefined) {
    mapComponent = initMap('map-holder');
    maplayersComponent = initMapLayerList(mapComponent, 'maplayers_list-holder');
    mapInfoComponent = new MapInfo('', { mapComponent });
    exploreComponent = new Explore('explore-holder', { mapComponent, mapInfoComponent });
    searchLocationsComponent = new SearchLocations('', { mapComponent, mapInfoComponent, exploreComponent });
  }

  // restore only if first render
  if (mapComponent.renderCount === 0) {
    mapComponent.restoreMapState();

    if (checkValidObject(mapInfoComponent)) {
      mapInfoComponent.restoreMapInfoState();
    }

    if (checkValidObject(searchLocationsComponent)) {
      searchLocationsComponent.restoreSearchLocationsState();
    }
  }

  mapComponent.renderCount += 1;

  // delay listners unitll after setup also needs slight time out so the map dose not move on start
  setTimeout(() => { mapComponent.addMapEventListners(mapComponent.map); }, 1000);
}

// deal with nav bars so back button is not broken
//
// @param selector - string DOM selector
// Closes over global import NavBar
function setNavBars(selector) {
  NavBar.resetTabContent();
  NavBar.toggleTabContent(selector);
  NavBar.tabUpdate(selector);
}

// Initializes the static pages by inserting the rendered template into the selected DOM element
//
// @param selector - string DOM selector
// @param template - HTML template
function initStaticPage(selector, template) {
  const componentElem = document.getElementById(selector);
  componentElem.innerHTML = template;
}

const router = new Navigo(homeloc, true);

// TODO: make the tab content area dynamic also similar to the nav tabs

// examples of coded map interactions for testing
// const maintitleElement = document.getElementById('maintitle');
// maintitleElement.addEventListener('click', (e) => {
//   const mapCenter = store.getStateItem('mapCenter')
//
//   mapComponent.restoreMapCenter(mapCenter)
//   mapComponent.map.panTo(mapCenter);
//   console.log('end', mapCenter)
//   const store = new Store({});
//   mapComponent.setLayerStatus('SA_ThreatIndex');
//   mapComponent.setMapClick({lat: 32.76966654128219, lng: -79.93103027343751});
//   mapComponent.setMapZoom(5);
//   mapComponent.setMapCenter({lat: 32.76966654128219, lng: -79.93103027343751});
//   console.log('test')
//   mapComponent.clearState();
//   console.log(store.clearState())
//   console.log(store.getStateItem("mapClick"))
//   console.log(mapComponent.restoreMapState())
//   mapComponent.setStateFromObject(store.getState())
//   console.log(store.getStateItem('mapLayerDisplayStatus'))
//   console.log(store.removeStateItem('mapClick'));
//   console.log(store.addStateItem('mapClick',{lat: 32.76966654128219, lng: -79.93103027343751}));
//   console.log()
// });

router.on({
  '/': (params, query) => {
    setNavBars('main-nav-map');
    initMapComponent();
  },
  '/Home': (params, query) => {
    setNavBars('main-nav-map');
    initMapComponent();
  },
  '/About': (params, query) => {
    setNavBars('main-nav-about');
    initStaticPage('about-holder', AboutPage);
  },
  '/Download': (params, query) => {
    setNavBars('main-nav-download');
    initStaticPage('download-holder', DownloadDataPage);
  }
});

// implement later need to make the tab content area dynamic also
router.notFound((query) => {
  NavBar.resetTabContent();
  NavBar.toggleTabContent('main-nav-notfound');

  // initialize 404
  initStaticPage('notfound-holder', NotFoundPage);
});

router.resolve();
