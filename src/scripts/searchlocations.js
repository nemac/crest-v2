// dependencies
import L from 'leaflet';
import { geosearch } from 'esri-leaflet-geocoder';

// default searchlocations template
import searchlocationsTemplate from '../templates/searchlocations.html';

import { Component } from './components';
import { Store } from './store';

import {
  checkValidObject,
  spinnerOn
} from './utilitys';

const store = new Store({});

/**
* SearchLocations Component
* SearchLocations handles searching places and geocoding,
* uses the https://github.com/Esri/esri-leaflet-geocoder leaflet plugin
* Apache License https://github.com/Esri/esri-leaflet-geocoder/blob/master/LICENSE
* and examples of use at http://esri.github.io/esri-leaflet/examples/geocoding-control.html
*/
export class SearchLocations extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, searchlocationsTemplate);

    const { mapComponent, mapInfoComponent, exploreComponent } = props;

    this.mapComponent = mapComponent;
    this.mapInfoComponent = mapInfoComponent;
    this.exploreComponent = exploreComponent;
    // TODO: add config for geosearch
    // might need to add other limits
    const GeoSearchOptions = {
      useMapBounds: false,
      countries: 'USA',
      collapseAfterResult: false,
      allowMultipleResults: false,
      attribution: 'Powered by ESRI'
    };

    // add search control with options
    this.searchControl = geosearch(GeoSearchOptions).addTo(mapComponent.map);
    this.searchControlElement = document.querySelector('.geocoder-control.leaflet-control');
    this.searchBoxElement = document.querySelector('.geocoder-control-input.leaflet-bar');
    this.collapseSearch = L.DomUtil.create('div', 'btn-search-locations-collapse-holder float-right d-none', this.searchControlElement);

    // make sure map click events do not fire when user clicks on search conrol
    L.DomEvent.disableClickPropagation(this.searchControlElement);

    // handle expanding of search box.  displays a collapse button to dom
    this.searchBoxElement.addEventListener('click', this.searchBoxExpandClickHandler.bind(this));

    // handle collapse of search box.  removed from displays the collapse button
    // from dom
    this.collapseSearch.addEventListener('click', this.searchBoxCollapseClickHandler.bind(this));

    this.collapseSearch.innerHTML = '<i class="fas fa-angle-double-left btn-search-locations-collapse"></i>';

    // get mapcompment
    this.mapComponent = mapComponent;

    // setup marker layer which is not set yet.
    this.marker = undefined;
    this.markerBounds = undefined;

    // add results hanlder for when user picks a location
    this.searchControl.on('results', this.resultsHandler.bind(this));
  }

  // handle search box click.  This expands the search box.
  searchBoxExpandClickHandler(ev) {
    this.searchControl.options.collapseAfterResult = false;
    L.DomUtil.removeClass(this.collapseSearch, 'd-none');
  }

  // handle collapse of search box.  removed from displays the collapse button
  // from dom
  searchBoxCollapseClickHandler(ev) {
    this.searchControl.options.collapseAfterResult = true;
    this.searchControl.clear();
    this.searchControl.disable();
    // the leaflet-geocodiong force focus on the search input box
    // which forces the code to keep the css dom elements vissible
    // the onlly way to overcopme this is disable and the shortly
    // re-enable the dom element via the plugins code
    setTimeout(() => { this.searchControl.enable(); }, 0);
    L.DomUtil.addClass(this.collapseSearch, 'd-none');
  }

  // handle geocoding results from the esri leaflet geocoding plugin
  resultsHandler(data) {
    // clear old locations
    this.removeSearchLocations();

    // save results
    SearchLocations.saveResultsToStore(data);

    // add search location marker
    this.addSearchLocationsMarker(true);

    // add popup with slight delay
    this.delayedSearchLocationPopup();
  }

  // popup close handler
  searchLocationsPopupClose() {
    this.removeSearchLocations();
  }

  // add maker for idenSearchLocations
  // @param { Object } location object lat long
  // @param { Object } icon leaflet icon used as maker on map
  addMaker(location, icon) {
    this.marker = L.marker([location.lat, location.lng], { icon });
    this.mapComponent.map.addLayer(this.marker);
  }

  // remove old SearchLocations
  removeSearchLocations() {
    // clear old locations
    if (checkValidObject(this.marker)) {
      this.mapComponent.map.removeLayer(this.marker);
    }

    // remove the last location
    store.removeStateItem('mapSearchLocations');
  }

  // add search locations popup from the state store
  // @param { Boolean } zoomtolocation true zooms to location false just draws
  // default is false
  addSearchLocationsMarker(zoomtolocation = false) {
    // check the mapclick variable. if map clicked restore the state
    const { location } = store.getStateItem('mapSearchLocations');

    // ensure the mapSearchLocations state is a valid object
    if (checkValidObject(location)) {
      // get the custom map marker icon for the SearchLocations result
      const icon = SearchLocations.createSearchLocationsIcon();

      // zoom to location if searched we will not on restore (browser refresh)
      if (zoomtolocation) {
        // set map view to coordinates of the first item in the results and the zoom level to 18
        this.mapComponent.map.setView(location, 16);
      }

      // add marker at location to the map
      this.addMaker(location, icon);
    }
  }

  // handler for adding the location as an mapInfo point
  addSearchLocationsMapInfoHandler() {
    // get the info button element
    const iButtonElement = document.getElementById('i-btn');

    // make the info button exists in the dom
    if (iButtonElement !== null) {
      // add the click handler
      iButtonElement.addEventListener('click', (ev) => {
        spinnerOn();
        // remove old marker
        this.mapInfoComponent.removeMapMarker();

        // add new marker location to store so the new marker can be added
        store.setStoreItem('mapClick', store.getStateItem('mapSearchLocations').location);

        // add the marker for the mapinfo from the mapinfo component
        this.mapInfoComponent.retreiveMapClick();
        this.removeSearchLocations();
      });
    }
  }

  addSearchLocationsExploreHandler() {
    const eButtonElement = document.getElementById('e-btn');
    if (eButtonElement !== null) {
      eButtonElement.addEventListener('click', (ev) => {
        // spinnerOn();
        if (this.markerBounds !== undefined) {
          this.mapInfoComponent.map.removeLayer(this.markerBounds);
        }

        // clear old user area
        // remove existing Area
        this.exploreComponent.drawAreaGroup.clearLayers();
        store.removeStateItem('userarea');

        // add the user area. in this case the user area is a point
        // we are running zonal states so we need a polygon. we are using a small
        // bounding box of "50" meters for now we may need to make 1 kilomter later
        // to pass to the zonal stats api
        const userArea = store.getStateItem('mapSearchLocations').location;
        const center = L.latLng(userArea.lat, userArea.lng);
        const bounds = center.toBounds(50);

        const latlngs = [];

        // get the corners of the box so we can convert it too geoJSON
        latlngs.push(bounds.getSouthWest()); // bottom left
        latlngs.push(bounds.getSouthEast()); // bottom right
        latlngs.push(bounds.getNorthEast()); // top right
        latlngs.push(bounds.getNorthWest()); // top left

        // create a polygon. leaflet can only convert shapes, markers to geoJSON
        const userPoly = L.polygon(latlngs);
        const userPolyGeoJSON = userPoly.toGeoJSON();

        // add the geoJSON to the store
        store.setStoreItem('userarea', userPolyGeoJSON);

        // add the shape to the map
        this.exploreComponent.drawUserArea();

        // this.markerBounds = L.geoJSON(userPolyGeoJSON).addTo(this.mapInfoComponent.map);
        this.removeSearchLocations();
      });
    }
  }

  delayedSearchLocationPopup() {
    // have to set time the popup is not added to the dom immediately
    // so we must wait a very breif time to add the marker and popu.
    // otherwise the popup will be appear in the wrong location
    setTimeout(() => {
      const location = SearchLocations.getSearchLocationsLatLong();

      // get the mapinfo (identify) html document and udpate
      // the content with returned values
      // const doc = SearchLocations.getDocument();
      const popup = this.addSearchLocationsPopup(location, -123);

      // add event handlers
      this.addSearchLocationsMapInfoHandler();
      this.addSearchLocationsExploreHandler();

      // make sure thge popup object exists
      if (checkValidObject(popup)) {
        // set popup close handler
        popup.on('popupclose', this.popupCloseHanlder.bind(this));
      }
    }, 10);
  }

  // handler for closing popup
  popupCloseHanlder() {
    this.removeSearchLocations();
  }

  // restore the state form map info/identify
  restoreSearchLocationsState() {
    // add search location marker
    this.addSearchLocationsMarker(false);
    this.delayedSearchLocationPopup();
  }

  // add the search location popup to the maker (searched location)
  // @param { Object } location (marker) object lat long
  // @param { Integer } offsetx for offseting the popup
  // for some reason when I restore the offset is different so I have
  // pass it differently for search and add and restore and add
  addSearchLocationsPopup(location, offsetx) {
    if (checkValidObject(this.marker)) {
      const content = SearchLocations.getSearchLocationsLabel();

      // get the SearchLocations html document and udpate
      // the content with returned values
      const doc = SearchLocations.getDocument();

      const element = doc.getElementById('searchlocations-content');
      if (element !== undefined && element !== null) {
        element.innerHTML = content;
      }

      // add the search locations html template to a dom element
      // so we can add the element as a leaflet popup
      const searchlocationsEl = doc.getElementById('searchlocations_list');
      const searchlocationsContent = L.Util.template(searchlocationsEl.outerHTML);

      // create popup object and bind it to location marker
      const popup = this.marker.bindPopup(
        searchlocationsContent,
        {
          autoClose: false,
          closeOnClick: false,
          opacity: 0.9,
          autoPan: false,
          className: 'search-locations-popup',
          offset: L.point(offsetx, 20)
        }
      );

      // open popup if location is valid
      if (checkValidObject(location)) {
        // open popup
        this.marker.openPopup(location);
      }
      // return the popup object
      return popup;
    }
    return null;
  }

  // get text label from searched location from statore
  static getSearchLocationsLabel() {
    // check the mapclick variable. if map clicked restore the state
    const mapSearchLocations = store.getStateItem('mapSearchLocations');
    if (checkValidObject(mapSearchLocations)) {
      return mapSearchLocations.label;
    }
    return '';
  }

  // get location x y searched location from statore
  static getSearchLocationsLocation() {
    // check the mapclick variable. if map clicked restore the state
    const mapSearchLocations = store.getStateItem('mapSearchLocations');
    if (checkValidObject(mapSearchLocations)) {
      return mapSearchLocations.location;
    }
    return '';
  }

  // create a html dom element for the SearchLocations html template
  static getDocument() {
    const parser = new DOMParser();
    return parser.parseFromString(searchlocationsTemplate, 'text/html');
  }

  // return lat long of search location from store
  static getSearchLocationsLatLong() {
    return L.latLng(
      SearchLocations.getSearchLocationsLocation().lat,
      SearchLocations.getSearchLocationsLocation().lng
    );
  }

  // creates custom icon and adds css class for styling
  static createSearchLocationsIcon() {
    return L.divIcon({ className: 'searchlocations-point' });
  }

  static saveResultsToStore(data) {
    // save location to store
    // only retrieve first item (need to remove multiselect)
    store.setStoreItem('mapSearchLocations', { location: data.results[0].latlng, label: data.results[0].properties.ShortLabel });
  }
}
