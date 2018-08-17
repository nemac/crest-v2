// import dependencies
import Navigo from 'navigo';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';

// import custom classess
import { Store } from './store';
import { URL } from './url';

// import extended components
import { Map } from './map';
import { MapLayersList } from './maplayers_list';
import { NavBar } from './navBar';

// import html templates
import AboutPage from '../templates/about.html';
import DownloadDataPage from '../templates/downloaddata.html';
import NotFoundPage from '../templates/notfound.html';

import ZonalWrapper from '../templates/zonal_wrapper.html';

import identifyConfig from '../config/identifyConfig';

// initialize navbar
const navBarComponent = new NavBar('nav-holder');
new URL();

let mapComponent;
let maplayersComponent;
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

const zonalTempData = {
  asset: 1.001414273281114,
  threat: 2.989012184508268,
  exposure: 2.99325500435161,
  aquatic: 5.0,
  terrestrial: 1.0,
  hubs: NaN
};

function makeDiv() {
  return document.createElement('div');
}

function makeTextElement(text) {
  return document.createTextNode(text);
}

function makeScreenReaderText(text) {
  const elem = document.createElement('span');
  elem.className = 'hidden';
  elem.appendChild(makeTextElement(text));
  return elem;
}

function makeZonalWrapper() {
  const zonalWrap = makeDiv();
  zonalWrap.className = 'zonal-wrapper';
  return zonalWrap;
}

function makeBoxWrapper() {
  const boxWrap = makeDiv();
  boxWrap.className = 'zonal-item';
  return boxWrap;
}

function makeLabel() {
  const zonalLabel = makeDiv();
  zonalLabel.className = 'zonal-label';
  const areaCount = document.getElementsByClassName('zonal-wrapper').length + 1;
  zonalLabel.appendChild(makeTextElement(`Area ${areaCount}`));
  return zonalLabel;
}

function getIdentifyValue(type, rank) {
  const identifyData = identifyConfig.colorLookup;
  const trueRank = Math.round(typeof rank !== 'number' ? parseFloat(rank) : rank);
  let item;
  let i;
  let l;

  for (i = 0, l = identifyData.length; i < l; i += 1) {
    item = identifyData[i];
    if (item.layer === type && item.value === trueRank) {
      break;
    }
  }

  return item;
}

function makeZonalBox(type, rank) {
  const zonalBox = makeDiv();
  const zonalData = getIdentifyValue(type, rank);
  zonalBox.className = `zonal-${type} zonal-box noselect`;
  zonalBox.setAttribute('data-ranking', rank);
  zonalBox.style.color = zonalData.color;
  zonalBox.style.backgroundColor = zonalData.backgroundColor;
  zonalBox.appendChild(makeTextElement(zonalData.label));
  return zonalBox;
}

function makeAssetBox(rank) {
  return makeZonalBox('asset', rank);
}

function makeThreatBox(rank) {
  return makeZonalBox('threat', rank);
}

function makeTerrestrialBox(rank) {
  return makeZonalBox('terrestrial', rank);
}

function makeAquaticBox(rank) {
  return makeZonalBox('aquatic', rank);
}

function makeFishWildBox(wildlife, fish) {
  const fishWildWrapper = makeBoxWrapper();
  fishWildWrapper.appendChild(makeAquaticBox(fish));
  fishWildWrapper.appendChild(makeTerrestrialBox(wildlife));
  return fishWildWrapper;
}

function makeExposureBox(asset, threat) {
  const exposureWrapper = makeBoxWrapper();
  exposureWrapper.appendChild(makeAssetBox(asset));
  exposureWrapper.appendChild(makeThreatBox(threat));
  return exposureWrapper;
}

function makeHubBoxElem(hubText, hubStatus) {
  const hubWrapper = makeDiv();
  hubWrapper.className = 'zonal-hub-wrapper zonal-item';
  const hubElem = makeDiv();
  hubElem.className = `zonal-hub zonal-hub-${hubStatus} noselect`;
  hubElem.appendChild(makeScreenReaderText(hubText));
  hubWrapper.appendChild(hubElem);
  return hubWrapper;
}

function makeInHubBox() {
  return makeHubBoxElem('The Zone is in at least one Hub', 'in');
}

function makeOutHubBox() {
  return makeHubBoxElem('The Zone is not in at least one Hub', 'out');
}

function makeHubBox(inHub) {
  return Number.isNaN(inHub) ? makeInHubBox() : makeOutHubBox();
}

function makeShortZonalStatsInterior(data) {
  return [
    makeLabel(),
    makeHubBox(data.hubs),
    makeFishWildBox(data.terrestrial, data.aquatic),
    makeExposureBox(data.asset, data.threat)
  ];
}

function drawShortZonalStats(data) {
  const wrapper = makeZonalWrapper();
  makeShortZonalStatsInterior(data).forEach((elem) => {
    wrapper.appendChild(elem);
  });
  document.getElementById('zonal-content').appendChild(wrapper);
}

function getZonalStatsData(geojson = '') {
  return zonalTempData;
}

function tempDrawShortZonalStats() {
  if (!document.getElementById('zonal-header')) {
    document.getElementById('zonal-wrapper').innerHTML = ZonalWrapper;
  }
  drawShortZonalStats(getZonalStatsData());
}

document.getElementById('testzonal').addEventListener('click', tempDrawShortZonalStats);

// Creates the entire map component
//
// Closes over global import Map
function initMapComponent() {
  if (mapComponent === undefined) {
    mapComponent = initMap('map-holder');
    maplayersComponent = initMapLayerList(mapComponent, 'maplayers_list-holder');
  }

  // restore only if first render
  if (mapComponent.renderCount === 0) {
    mapComponent.restoreMapState();
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
