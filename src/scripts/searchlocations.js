// dependencies
import L from 'leaflet';
import { geosearch, arcgisOnlineProvider } from 'esri-leaflet-geocoder';

// default searchlocations template
import searchlocationsTemplate from '../templates/searchlocations.html';

import { Component } from './components';
import { Store } from './store';

import { checkValidObject,
  spinnerOff,
  spinnerOn,
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

    const { mapComponent } = props;

    const searchControl = geosearch().addTo(mapComponent.map);

    this.mapComponent = mapComponent;

    // setup marker layer which is not set yet.
    this.marker = undefined;

    searchControl.on("results", (data) => {

      // clear old locations\
      this.removeSearchLocations();

      // only retrieve first item (need to remove multiselect)
      const location = data.results[0].latlng;
      const label = data.results[0].properties.ShortLabel;
      store.setStoreItem('mapSearchLocations', {location, label});

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

  // // add search locations popup from the state store
  // // @param { Boolean } zoomtolocation true zooms to location false just draws
  // // default is false
  addSearchLocationsMarker(zoomtolocation = false) {
    // check the mapclick variable. if map clicked restore the state
    const mapSearchLocations = store.getStateItem('mapSearchLocations');
    const location = mapSearchLocations.location;
    const label = mapSearchLocations.label;

    // ensure the mapSearchLocations state is a valid object
    if (checkValidObject(location)) {
      // get the custom map marker icon for the SearchLocations result
      const icon = SearchLocations.createSearchLocationsIcon();

      //zoom to location if searched we will not on restore (browser refresh)
      if(zoomtolocation) {
        // set map view to coordinates of the first item in the results and the zoom level to 18
        this.mapComponent.map.setView(location, 16);
      }

      // add marker at location to the map
      this.addMaker(location, icon)
    }
  }

  // creates custom icon and adds css class for styling
  static createSearchLocationsIcon() {
    return L.divIcon({ className: 'searchlocations-point' });
  }

  // restore the state form map info/identify
  restoreSearchLocationsState() {
    // add search location marker
    this.addSearchLocationsMarker(true);
    const location = this.getSearchLocationsLocation();
    console.log('location restoreSearchLocationsState', location)
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
    console.log('addSearchLocationsPopup', location);
    if (checkValidObject(this.marker)) {
      const content = this.getSearchLocationsLabel();
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

      return popup
    }
    return;
  }

  getSearchLocationsLabel() {
    // check the mapclick variable. if map clicked restore the state
    const mapSearchLocations = store.getStateItem('mapSearchLocations');
    if (checkValidObject(mapSearchLocations)) {
        return mapSearchLocations.label;
    }

    return '';

  }

  getSearchLocationsLocation() {
    // check the mapclick variable. if map clicked restore the state
    const mapSearchLocations = store.getStateItem('mapSearchLocations');
    if (checkValidObject(mapSearchLocations)) {
        return mapSearchLocations.location;
    }

    return '';

  }


  //
  // // add search locations popup from the state store
  // // @param { Boolean } zoomtolocation true zooms to location false just draws
  // // default is false
  // addSearchLocationsMarker(zoomtolocation = false) {
  //   // check the mapclick variable. if map clicked restore the state
  //   const mapSearchLocations = store.getStateItem('mapSearchLocations');
  //   const location = mapSearchLocations.location;
  //   const label = mapSearchLocations.label;
  //
  //   // ensure the mapSearchLocations state is a valid object
  //   if (checkValidObject(location)) {
  //     console.log('really', location)
  //     // get the custom map marker icon for the SearchLocations result
  //     const icon = SearchLocations.createSearchLocationsIcon();
  //
  //     if(zoomtolocation) {
  //       // set map view to coordinates of the first item in the results and the zoom level to 18
  //       this.mapComponent.map.setView(location, 16);
  //     }
  //
  //     // add marker at location to the map
  //     this.addMaker(location, icon)
  //
  //     const searchLocationsPopup = this.SearchLocationResults.bindPopup(
  //       label,
  //       {
  //         autoClose: false,
  //         closeOnClick: false,
  //         opacity: 0.9,
  //         autoPan: false,
  //         offset: L.point(-123, 20)
  //       }
  //     ).openPopup();
  //
  //     return searchLocationsPopup;
  //
  //   }
  //
  // }
  //
  //
  // //remove search locations from state and map
  // removeSearchLocations() {
  //   console.log('removeSearchLocations', this.SearchLocationResults )
  //   // remove previous marker point
  //   if (this.SearchLocationResults !== undefined) {
  //     this.mapComponent.map.removeLayer(this.SearchLocationResults);
  //   }
  //
  //   // remove from state
  //   store.removeStateItem('mapSearchLocations');
  // }
  //
  // // creates custom icon and adds css class for styling
  // static createSearchLocationsIcon() {
  //   return L.divIcon({ className: 'searchlocations-point' });
  // }
  // // add maker for idenSearchLocations
  // // @param { Object } location object lat long
  // // @param { Object } icon leaflet icon used as maker on map
  // addMaker(location, icon) {
  //   this.SearchLocationResults = L.marker([location.lat, location.lng], { icon });
  //   this.mapComponent.map.addLayer(this.SearchLocationResults);
  // }
  //
  // add
  // // restore the state form map info/identify
  // restoreSearchLocationsState() {
  //   // // check the mapclick variable. if map clicked restore the state
  //   // const mapSearchLocations = store.getStateItem('mapSearchLocations');
  //   // // const location = mapSearchLocations.location;
  //   // // const label = mapSearchLocations.label;
  //   //
  //   // // // ensure the mapclick state is a valid object
  //   // // if (checkValidObject(location)) {
  //   //    // set state for mapSearchLocations
  //   //    // store.setStoreItem('mapSearchLocations', {location, label});
  //   //
  //   //    // add seach locations
  //   //    const popup = this.addSearchLocationsMarker();
  //   //    console.log('popup', popup);
  //   //
  //   //    // set popup close handler
  //   //    popup.on('popupclose', this.removeSearchLocations);
  //   // // }
  // }
}
