import L from 'leaflet';
import { Store } from './store';
import { identifyConfig } from '../config/identifyConfig';
import { mapConfig } from '../config/mapConfig';

// Legend Templates
import ColorRampTenBreaks from '../templates/colorramp_breaks_ten.html';
import ColorRampNineBreaks from '../templates/colorramp_breaks_nine.html';
import ColorRampEightBreaks from '../templates/colorramp_breaks_eight.html';
import ColorRampSevenBreaks from '../templates/colorramp_breaks_seven.html';
import ColorRampSixBreaks from '../templates/colorramp_breaks_six.html';
import ColorRampFiveBreaks from '../templates/colorramp_breaks_five.html';
import ColorRampFourBreaks from '../templates/colorramp_breaks_four.html';
import ColorRampThreeBreaks from '../templates/colorramp_breaks_three.html';
import ColorRampTwoBreaks from '../templates/colorramp_breaks_two.html';
import ColorRampOneBreaks from '../templates/colorramp_breaks_one.html';

const store = new Store({});
const { TMSLayers } = mapConfig;
const { zoomRegions } = mapConfig;


// Parses the configuration of identify values and gets the requested configuration object
// @param type | String - matches the layer key
// @param rank | String || Number - rounded and matches the value key
// @return Object
export function getIdentifyValue(type, rank) {
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

/**
 * update the display of element
 *  @param { Object } element - Element object from click event, used to toggle
 *                   display state
 */
export function toggleElementDisplay(thisEle, elements) {
  elements.forEach((ele) => {
    const name = ele.replace('main_nav_', '');
    const tabEle = document.querySelector(`[ref="tab-${name}"]`);
    const mapClass = tabEle.className;
    const newMapClass = mapClass + (mapClass.indexOf(' d-none') > 0) ? ' ' : 'd-none';

    tabEle.className = newMapClass;
  });
}

// convert a number to to the word representation
// of the number.  We are using the word in the HTML class
// and will use this to highlight the value in the chart details
export function numberToWord(number) {
  let numberWord = 'none';

  switch (number) {
    case 0:
      numberWord = 'none';
      break;
    case 1:
      numberWord = 'one';
      break;
    case 2:
      numberWord = 'two';
      break;
    case 3:
      numberWord = 'three';
      break;
    case 4:
      numberWord = 'four';
      break;
    case 5:
      numberWord = 'five';
      break;
    case 6:
      numberWord = 'six';
      break;
    case 7:
      numberWord = 'seven';
      break;
    case 8:
      numberWord = 'eight';
      break;
    case 9:
      numberWord = 'nine';
      break;
    case 10:
      numberWord = 'ten';
      break;
    case 11:
      numberWord = 'eleven';
      break;
    case 12:
      numberWord = 'twelve';
      break;
    case 13:
      numberWord = 'thirteen';
      break;
    case 14:
      numberWord = 'fourteen';
      break;
    case 15:
      numberWord = 'fifteen';
      break;
    case 16:
      numberWord = 'sixteen';
      break;
    case 17:
      numberWord = 'seventeen';
      break;
    case 18:
      numberWord = 'eightteen';
      break;
    case 19:
      numberWord = 'nineteen';
      break;
    case 20:
      numberWord = 'twenty';
      break;
    default:
  }
  return numberWord;
}

// Returns the HTML for a specified legend type
//
// @param type | String
// @return String
export function getLegendHtml(maxValue) {
  switch (maxValue) {
    case 10:
      return ColorRampTenBreaks;
    case 9:
      return ColorRampNineBreaks;
    case 8:
      return ColorRampEightBreaks;
    case 7:
      return ColorRampSevenBreaks;
    case 6:
      return ColorRampSixBreaks;
    case 5:
      return ColorRampFiveBreaks;
    case 4:
      return ColorRampFourBreaks;
    case 3:
      return ColorRampThreeBreaks;
    case 2:
      return ColorRampTwoBreaks;
    case 1:
      return ColorRampOneBreaks;
    default:
      return ColorRampTenBreaks;
  }
}

// Reformats data for the drivers of inputs
// @param data | Object - all data from the API
// @return Array
//  TODO add from mapconfig
export function groupByDriver(collection, property) {
    var i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }
    return result;
}

// ensure the object or variable is valid...
// TODO: This should probably be looking for positives rather than checking it
// isn't one of a few negatives. For example this will let booleans, malformed
// lat/long objects, arrays and floats through when it probably shouldn't. The
// code doesn't really say what a valid object is other than not undefined,
// null, empty arrays, empty objects and empty strings.
//
// @param obj - typeless
export function checkValidObject(obj) {
  if (obj === undefined || obj === null) { return false; }
  if (typeof obj === 'object' && Object.keys(obj).length === 0) { return false; }
  if (typeof obj === 'string' && obj.length === 0) { return false; }

  return true;
}

// toggle spinner visibility on
export function spinnerOn() {
  const el = document.getElementById('map-working');
  const elHolder = document.querySelector('.leaflet-working');

  // ensure elements and class names exists
  if (el === undefined) { return false; }
  if (el.className.baseVal === undefined) { return false; }
  if (elHolder === undefined) { return false; }
  if (elHolder.className === undefined) { return false; }

  // update class for svg spinner
  const elClassName = el.className.baseVal;
  el.className.baseVal = elClassName.replace(' d-none', '');

  // update class for div element that holds svg.  Do this so it dose not cover
  // cover other map elements and panes
  elHolder.className = elHolder.className.replace(' d-none', '');
  elHolder.className = elHolder.className.replace('h-100', '');
  elHolder.className = elHolder.className.replace('w-100', '');
  elHolder.className += ' h-100';
  elHolder.className += ' w-100';

  return true;
}

// check if one of our ajax calls is working
// if we add anymore we will need to add it here
export function checkworking() {
  const workingDrawlayers = store.getStateItem('working_drawlayers');
  if (workingDrawlayers) { return true; }
  // console.log('working_drawlayers');

  const workingBasemap = store.getStateItem('working_basemap');
  if (workingBasemap) { return true; }
  // console.log('working_basemap');

  const workingMapinfo = store.getStateItem('working_mapinfo');
  if (workingMapinfo) { return true; }
  // console.log('working_mapinfo');

  const workingZonalstats = store.getStateItem('working_zonalstats');
  if (workingZonalstats) { return true; }
  // console.log('working_zonalstats');

  const workingSearch = store.getStateItem('working_search');
  if (workingSearch) { return true; }
  // console.log('working_search');

  const workingS3Retreive = store.getStateItem('working_s3retreive');
  if (workingS3Retreive) { return true; }
  // console.log('working_s3retreive');

  const workingS3Save = store.getStateItem('working_s3save');
  if (workingS3Save) { return true; }
  // console.log('working_s3save');

  return false;
}


// toggle spinner visibility off
export function spinnerOff(source = '') {
  if (checkworking()) { return false; }

  const el = document.getElementById('map-working');
  const elHolder = document.querySelector('.leaflet-working');

  // ensure elements and class names exists
  if (el === undefined) { return false; }
  if (el.className.baseVal === undefined) { return false; }
  if (elHolder === undefined) { return false; }
  if (elHolder.className === undefined) { return false; }

  // update class for svg spinner
  const elClassName = el.className.baseVal;
  el.className.baseVal = elClassName.replace(' d-none', '');
  el.className.baseVal += ' d-none';

  // update class for div element that holds svg.  Do this so it dose not cover
  // cover other map elements and panes
  elHolder.className = elHolder.className.replace(' d-none', '');
  elHolder.className = elHolder.className.replace('h-100', '');
  elHolder.className = elHolder.className.replace('w-100', '');
  elHolder.className += ' d-none';

  return true;
}

// TODO: Either generalize this so it isn't always background color and color but instead
// an attribute/value pair. Or preferably make this use classes so we can have the colors
// be in css.
export function addStyle(doc, type, values) {
  const element = doc.getElementById(`${type}-score`);
  if (element !== undefined && element !== null) {
    element.setAttribute('style', `background-color: ${values.backgroundColor}; color: ${values.color};`);
  }
}

// Note that the back-ticks are intentional. They use the new ES6 Template
// Literals pattern.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
export function replaceMapInfoValue(doc, type, values) {
  const element = doc.getElementById(`${type}-score`);
  if (element !== undefined && element !== null) {
    element.textContent = values.label;
  }
}

// check if a parentelemet contains a dom id
// deals with event bubbling so we can check
// if the child is in a specifc parent
export function ParentContains(target, id) {
  for (let p = target && target.parentElement; p; p = p.parentElement) {
    if (p.id === id) { return true; }
  }
  return false;
}

export function flatten(arr) {
  const flat = [];
  arr.forEach((d) => {
    if (Array.isArray(d)) {
      flat.push(...d);
    } else {
      flat.push(d);
    }
  });
  return flat;
}

export function uuid() {
  return crypto.getRandomValues(new Uint32Array(4)).join('-');
}

// adds a custom google events
export function googleAnalyticsEvent(action = '', category = '', label = '', value = 0) {
  gtag('event', action, {  // eslint-disable-line
    event_category: category,
    event_label: label,
    value: `${value}`,
    uuid: store.getStateItem('uuid')
  });
}

// prep all userareas data for charting, and dump into the state
export function formatChartData() {
  // data: {
  //   labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
  //   datasets: [
  //     {
  //       label: "Population (millions)",
  //       backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
  //       data: [2478,5267,734,784,433]
  //     }
  //   ]
  // },

  // const layerRegionInfo = TMSLayers.filter(layers => layers.region === region);

  const test = {
    chartData: [
      {
        region: 'test1',
        areaName: '123',
        label: 'Test 1',
        charts: [{
          chartGroup: 'Chart 1 test 1',
          data: [0, 1, 2, 3],
          label: ['One', 'Two', 'Three'],
          color: ['Red', 'Green', 'Blue'],
        },
        {
          chartGroup: 'Chart 2 test 1',
          data: [0, 1, 2, 3],
          label: ['One', 'Two', 'Three'],
          color: ['Red', 'Green', 'Blue'],
        }]
      },
      {
        region: 'test2',
        areaName: '456',
        label: 'Test 2',
        charts: [{
          chartGroup: 'Chart 1 test 2',
          data: [0, 1, 2, 3],
          label: ['One', 'Two', 'Three'],
          color: ['Red', 'Green', 'Blue'],
        },
        {
          chartGroup: 'Chart 2 test 2',
          data: [0, 1, 2, 3],
          label: ['One', 'Two', 'Three'],
          color: ['Red', 'Green', 'Blue'],
        }]
      },
    ]
  }

  const { chartData } = test;
  const areaName = chartData.filter(chart => chart.areaName === '456')
  const { charts } = areaName[0];
  const areaNameChart = charts.filter(chart => chart.chartGroup === 'Chart 2 test 2')
  console.log('areaNameChart', areaNameChart)

  //  get user areas and uploaded shapefiles from state
  const Currentshapes = store.getStateItem('userareas');
  //  get hubs from state
  const HubIntersectionJson = store.getStateItem('HubIntersectionJson');
  //  get nature server hubs from state
  const NatureServeHubIntersectionJson = store.getStateItem('NatureServeHubIntersectionJson');



  // // constrain charts for all valid regions from mapConfig
  // // iterate valid regions from mapConfig
  // Object.keys(zoomRegions).map((zoomRegionsKey) => {
  //   // console.log(zoomRegionsKey, zoomRegions[zoomRegionsKey])
  //
  //   // get a valid region from mapConfig
  //   const region = zoomRegions[zoomRegionsKey];
  //
  //   // get valid layers from mapConfig
  //   const regionLayers = TMSLayers.filter(layers => layers.region === region.region);
  //   console.log('region', region.region)
  //    // some regions may not have layers yet make sure they exist
  //   if (regionLayers.length > 0 ) {
  //
  //     // get unique chart types from mapConfig should by summary and [N] drivers
  //     const driverGroups = groupByDriver(regionLayers, 'chartInputName');
  //     Object.keys(driverGroups).map((driverGroupKey) => {
  //       console.log('    driverGroups', driverGroups[driverGroupKey][0].chartInputName)
  //     });
  //   }
  // });





  // user areas and uploaded shapefiles
  const currentshapes = store.getStateItem('userareas');
  let allchartdata = []
  Object.keys(currentshapes).map((currentshapekey) => {
    const name = currentshapes[currentshapekey][0].name
    const zonalStatsJson = currentshapes[currentshapekey][3].zonalstatsjson
    const statistics = zonalStatsJson.features[0].properties.mean
    let region = 'continental_us';

    if (zonalStatsJson.features[0].properties.region) {
      region = zonalStatsJson.features[0].properties.region.toString().trim();
    }

    // const regionLayers = TMSLayers.filter(layers => layers.region === region.region);

    let values = [];
    let apiKeys = [];


    const chartdata = { name, region, statistics}
    // let palette = [];
    allchartdata.push(chartdata)

    // Object.keys(zonalData).map((zonalKey) => {
    //   // const layerProp = regionLayers.filter(layers => layers.apikey === zonalKey);
    //   // const paletteValue = layerProp[0].chartCSSColor[parseInt(zonalData[zonalKey])] // numberToWord(parseInt(zonalData[zonalKey]));
    //   // console.log(zonalKey, layerProp, paletteValue)
    //
    //   // arrays
    //   values.push(zonalData[zonalKey]);
    //   apiKeys.push(zonalKey);
    //   chartdata.push(chartdata:{})
    //
    //   // palette.push(paletteValue);
    //   // labels.push(layerProp[0].chartLabel);
    // });

    // console.log('prepareChartData labels', labels)
    // console.log('prepareChartData palette', palette)
  });
  console.log('DATA', allchartdata.filter(layer => layer.name === 'Area 1'))

  // const layerInfo = layerRegionInfo.filter(layer => layer.chartDriver);
  // const driverGroups = groupByDriver(layerInfo, 'chartInputName');
  //
  // // iterate each group i.e. FishAndWildlife, assets, threats
  // driverGroups.map( driver => {
  //   const driverGroupName = driver[0].chartInputName;
  //   const driverGroupArray = [];
  //   const barWidth = ((100 / driver.length) - 2);
  //
  //   console.log('driver', driver.length, barWidth)
  //
  //   // iterate the driver group and get data
  //   driver.map( layer => {
  //     let apiKey = layer.apikey;
  //     let value = data[apiKey];
  //     // check nav for hubs, for now the api returns different values and field names in hub areas stashed in s3 and AGOL
  //     if (activeNav ===  'main-nav-map-searchhubs' || activeNav ===  'main-nav-map-searchNShubs') {
  //       apiKey = layer.hubsapikey;
  //       value = data[apiKey];
  //     }
  //
  //     const inputData = { key: apiKey, value: value };
  //     const inputGraph = wrapper.querySelector(`.zonal-long-graph-wrapper.zonal-long-graph-wrapper-${driverGroupName}`);
  //     drawDriver(inputGraph, `${driverGroupName}-graph`, `${driverGroupName}-graph`, inputData, region, true);
  //   });
  // });

}

// add google event tags for downloads.
export function addDownloadGoogleEvents() {
  const downloadIds = [
    'download-hubs',
    'download-exposure',
    'download-assets',
    'download-threats',
    'download-aquatic',
    'download-terrestrial',
    'download-populationdensity',
    'download-socialvulnerability',
    'download-criticalfacilities',
    'download-criticalinfrastructure',
    'download-drainage',
    'download-erosion',
    'download-floodproneareas',
    'download-sealevelrise',
    'download-stromsurge',
    'download-geostressor',
    'download-slope'
  ];

  downloadIds.forEach((id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.addEventListener('click', (ev) => {
        // ga event action, category, label
        googleAnalyticsEvent('click', 'downloads', id);
      });
    }
  });

  const watersheds = [
    'whatcando-btn-reslinceprojects',
    'whatcando-btn-analyzesites',
    'whatcando-btn-learnmore',
    'whatcando-btn-targetedwatershed',
    'whatcando-btn-finalreport',
    'whatcando-btn-startusingCREST'
  ];

  watersheds.forEach((id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.addEventListener('click', (ev) => {
        // ga event action, category, label
        googleAnalyticsEvent('click', 'landingpage', id);
      });
    }
  });
}

// set stateitems if they do not exist
// we will have to any new ones if added.
// this will help when we adding new statitems "breaks" the webpage
export function addMissingStateItems() {
  // check for base map default is DarkGray
  if (!checkValidObject(store.getStateItem('basemap'))) {
    store.setStoreItem('basemap', 'DarkGray');
  }

  if (!checkValidObject(store.getStateItem('uuid'))) {
    store.setStoreItem('uuid', uuid());
  }


  // check for lastaction default is moveend
  if (!checkValidObject(store.getStateItem('lastaction'))) {
    store.setStoreItem('lastaction', 'moveend');
  }

  // check for mapCenter default is {lat: 32.7765, lng: -79.9311} (charleston for now)
  if (!checkValidObject(store.getStateItem('mapCenter'))) {
    store.setStoreItem('mapCenter', { lat: 36.27970720524017, lng: -95.05371093750001 });
  }

  // check for mapLayerDisplayStatus default is listed below
  // to long to list again
  if (!checkValidObject(store.getStateItem('mapLayerDisplayStatus'))) {
    store.setStoreItem('mapLayerDisplayStatus', {
      CONUS_HubsTMS: true,
      NS_HubsTMS: true,
      CONUS_ExposureTMS: false,
      NS_ExposureTMS: false,
      CONUS_AssetsTMS: false,
      NS_AssetsTMS: false,
      CONUS_ThreatsTMS: false,
      NS_ThreatsTMS: false,
      CONUS_AquaticTMS: false,
      CONUS_TerrestrialTMS: false,
      NSFishAndWildlifeTMS: false,
      CONUS_PopDensityTMS: false,
      CONUS_SocVulnTMS: false,
      CONUS_CriticalFacilitiesTMS: false,
      CONUS_CriticalInfrastructureTMS: false,
      CONUS_DraingeTMS: false,
      CONUS_ErosionTMS: false,
      CONUS_SLRTMS: false,
      CONUS_StormSurgeTMS: false,
      CONUS_GeoStressTMS: false,
      CONUS_SlopeTMS: false,
      CONUS_FloodProneAreasTMS: false,
      CONUS_FishAndWildlifeTMS: false,

      PR_HubsTMS: false,
      PR_ExposureTMS: false,
      PR_AssetsTMS: false,
      PR_ThreatsTMS: false,
      PR_AquaticTMS: false,
      PR_TerrestrialTMS: false,
      PR_PopDensityTMS: false,
      PR_SocVulnTMS: false,
      PR_CriticalFacilitiesTMS: false,
      PR_CriticalInfrastructureTMS: false,
      PR_DraingeTMS: false,
      PR_ErosionTMS: false,
      PR_SLRTMS: false,
      PR_StormSurgeTMS: false,
      PR_GeoStressTMS: false,
      PR_SlopeTMS: false,
      PR_FloodProneAreasTMS: false,
      PR_FishAndWildlifeTMS: false,
      PR_LandslideIndexTiles: false,
      PR_TsunamiIndexTiles: false,

      USVI_HubsTMS: false,
      USVI_ExposureTMS: false,
      USVI_AssetsTMS: false,
      USVI_ThreatsTMS: false,
      USVI_AquaticTMS: false,
      USVI_TerrestrialTMS: false,
      USVI_PopDensityTMS: false,
      USVI_SocVulnTMS: false,
      USVI_CriticalFacilitiesTMS: false,
      USVI_CriticalInfrastructureTMS: false,
      USVI_DraingeTMS: false,
      USVI_ErosionTMS: false,
      USVI_SLRTMS: false,
      USVI_StormSurgeTMS: false,
      USVI_GeoStressTMS: false,
      USVI_SlopeTMS: false,
      USVI_FloodProneAreasTMS: false,
      USVI_FishAndWildlifeTMS: false
    });
  }

  // check for maplayerlist default is open
  if (!checkValidObject(store.getStateItem('maplayerlist'))) {
    if (window.screen.availWidth < 769) {
      store.setStoreItem('maplayerlist', 'close');
    } else {
      store.setStoreItem('maplayerlist', 'open');
    }
  }

  // check for region default is conus
  if (!checkValidObject(store.getStateItem('region'))) {
    store.setStoreItem('region', 'continental_us');
  }


  // check for userareacount default is 0
  if (!checkValidObject(store.getStateItem('userareacount'))) {
    store.setStoreItem('userareacount', 0);
  }

  // check for mapCenter default is {lat: 32.7765, lng: -79.9311} (charleston for now)
  if (!checkValidObject(store.getStateItem('mapZoom'))) {
    store.setStoreItem('mapZoom', 4);
  }

  // check for activeNav default is main-nav-map
  if (!checkValidObject(store.getStateItem('activeNav'))) {
    store.setStoreItem('activeNav', 'main-nav-map');
  }

  // check for aboutNav default is about-nav-aboutgen
  if (!checkValidObject(store.getStateItem('aboutNav'))) {
    store.setStoreItem('aboutNav', 'about-nav-aboutgen');
  }

  // check for savedshapes default is {} NULL object
  if (!checkValidObject(store.getStateItem('savedshapes'))) {
    store.setStoreItem('savedshapes', {});
  }

  // check for userarea default is {} NULL object
  if (!checkValidObject(store.getStateItem('userarea'))) {
    store.setStoreItem('userarea', {});
  }

  // check for userareas default is {} NULL object
  if (!checkValidObject(store.getStateItem('userareas'))) {
    store.setStoreItem('userareas', {});
  }

  // check for userarea_buffered default is {} NULL object
  if (!checkValidObject(store.getStateItem('userarea_buffered'))) {
    store.setStoreItem('userarea_buffered', {});
  }

  // check for zonalstatsjson default is {} NULL object
  if (!checkValidObject(store.getStateItem('zonalstatsjson'))) {
    store.setStoreItem('zonalstatsjson', {});
  }

  // check for working_basemap default is false
  if (!checkValidObject(store.getStateItem('working_basemap'))) {
    store.setStoreItem('working_basemap', false);
  }

  // check for working_mapinfo default is false
  if (!checkValidObject(store.getStateItem('working_mapinfo'))) {
    store.setStoreItem('working_mapinfo', false);
  }

  // check for working_mapinfo default is false
  if (!checkValidObject(store.getStateItem('working_zonalstats'))) {
    store.setStoreItem('working_zonalstats', false);
  }

  // check for working_s3retreive default is false
  if (!checkValidObject(store.getStateItem('working_s3retreive'))) {
    store.setStoreItem('working_s3retreive', false);
  }

  // check for working_search default is false
  if (!checkValidObject(store.getStateItem('working_search'))) {
    store.setStoreItem('working_search', false);
  }

  // check for working_s3save default is false
  if (!checkValidObject(store.getStateItem('working_s3save'))) {
    store.setStoreItem('working_s3save', false);
  }

  // check for working_drawlayers default is false
  if (!checkValidObject(store.getStateItem('working_drawlayers'))) {
    store.setStoreItem('working_drawlayers', false);
  }

  // check for zonalactive default is false
  if (!checkValidObject(store.getStateItem('zonalactive'))) {
    store.setStoreItem('zonalactive', ['none', 'none']);
  }
}
