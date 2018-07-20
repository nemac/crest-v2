// dependencies
import L from 'leaflet';
import { geosearch } from 'esri-leaflet-geocoder';

// default searchlocations template
import searchlocationsTemplate from '../templates/searchlocations.html';

import { Component } from './components';
import { Store } from './store';

import { checkValidObject } from './utilitys';

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

    const { mapComponent } = props;

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
    const searchControl = geosearch(GeoSearchOptions).addTo(mapComponent.map);
    const searchControlElement = document.querySelector('.geocoder-control.leaflet-control');
    const searchBoxElement = document.querySelector('.geocoder-control-input.leaflet-bar');
    const collapseSearch = L.DomUtil.create('div', 'btn-search-locations-collapse-holder float-right d-none', searchControlElement);

    L.DomEvent.disableClickPropagation(searchControlElement);

    // handle expanding of search box.  displays a collapse button to dom
    searchBoxElement.addEventListener('click', (ev) => {
      searchControl.options.collapseAfterResult = false;
      L.DomUtil.removeClass(collapseSearch, 'd-none');
    });

    // handle collapse of search box.  removed from displays the collapse button
    // from dom
    collapseSearch.addEventListener('click', (ev) => {
      searchControl.options.collapseAfterResult = true;
      searchControl.clear();
      searchControl.disable();
      // the leaflet-geocodiong force focus on the search input box
      // which forces the code to keep the css dom elements vissible
      // the onlly way to overcopme this is disable and the shortly
      // re-enable the dom element via the plugins code
      setTimeout(() => { searchControl.enable(); }, 0);
      L.DomUtil.addClass(collapseSearch, 'd-none');
    });

    collapseSearch.innerHTML = '<i class="fas fa-angle-double-left btn-search-locations-collapse"></i>';

    // get mapcompment
    this.mapComponent = mapComponent;

    // setup marker layer which is not set yet.
    this.marker = undefined;

    searchControl.on('results', (data) => {
      // clear old locations\
      this.removeSearchLocations();

      // only retrieve first item (need to remove multiselect)
      const location = data.results[0].latlng;
      const label = data.results[0].properties.ShortLabel;
      store.setStoreItem('mapSearchLocations', { location, label });

      // add search location marker
      this.addSearchLocationsMarker(true);
      const popup = this.addSearchLocationsPopup(location, -123);

      if (checkValidObject(popup)) {
        // set popup close handler
        popup.on('popupclose', () => {
          this.removeSearchLocations();
        });
      }
    });
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

  // creates custom icon and adds css class for styling
  static createSearchLocationsIcon() {
    return L.divIcon({ className: 'searchlocations-point' });
  }

  // restore the state form map info/identify
  restoreSearchLocationsState() {
    // add search location marker
    this.addSearchLocationsMarker(false);
    const location = SearchLocations.getSearchLocationsLocation();
    // TODO Deal with changing width on startup
    const popup = this.addSearchLocationsPopup(location, 265);

    if (checkValidObject(popup)) {
      // set popup close handler
      popup.on('popupclose', () => {
        this.removeSearchLocations();
      });
    }
  }

  // add the search location popup to the maker (searched location)
  // @param { Object } location (marker) object lat long
  // @param { Integer } offsetx for offseting the popup
  // for some reason when I restore the offset is different so I have
  // pass it differently for search and add and restore and add
  addSearchLocationsPopup(location, offsetx) {
    if (checkValidObject(this.marker)) {
      const content = SearchLocations.getSearchLocationsLabel();
      const popup = this.marker.bindPopup(
        content,
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
        this.marker.openPopup(location);
      }

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
}
