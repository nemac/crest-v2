// dependencies
import L from 'leaflet';
import { geosearch, arcgisOnlineProvider } from 'esri-leaflet-geocoder';

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

    const searchControl = geosearch().addTo(mapComponent.map);

    this.mapComponent = mapComponent;

    // create the geocoding control and add it to the map
    this.SearchLocationResults = L.layerGroup().addTo(mapComponent.map);

    // get the custom map marker icon for the SearchLocations result
    const icon = SearchLocations.createSearchLocationsIcon();

    // add handler for search
    // listen for the results event and add every result to the map
    searchControl.on("results", (data) => {
      // clear old locations
      // this.SearchLocationResults.clearLayers();
      this.mapComponent.map.removeLayer(this.SearchLocationResults);
      store.removeStateItem('mapSearchLocations');

      for (var i = data.results.length - 1; i >= 0; i--) {

        // test whether there are any results
        if (data.results.length > 0) {
          const location = data.results[0].latlng;
          // set map view to coordinates of the first item in the results and the zoom level to 18
          this.mapComponent.map.setView(location, 16);

          // add marker at location to the map
          this.addMaker(location, icon)

          console.log(data.results[0].text);

          // create a popup at the coordinates of the result and add the result text to the popup and open it on the map
         const popup = L.popup({ closeOnClick: true })
           .setLatLng(location)
           .setContent(data.results[0].text)
           .openOn(this.mapComponent.map);

          popup.
          // set state for mapSearchLocations
          store.setStoreItem('mapSearchLocations', location);

        }
      }
    });
  }

  // creates custom icon and adds css class for styling
  static createSearchLocationsIcon() {
    return L.divIcon({ className: 'searchlocations-point' });
  }
  // add maker for idenSearchLocations
  // @param { Object } location object lat long
  // @param { Object } icon leaflet icon used as maker on map
  addMaker(location, icon) {
    this.SearchLocationResults = L.marker([location.lat, location.lng], { icon });
    this.mapComponent.map.addLayer(this.SearchLocationResults);
  }


  // restore the state form map info/identify
  restoreSearchLocationsState() {
    // check the mapclick variable. if map clicked restore the state
    const mapSearchLocations = store.getStateItem('mapSearchLocations');



    // ensure the mapclick state is a valid object
    if (checkValidObject(mapSearchLocations)) {
      // get the custom map marker icon for the SearchLocations result
      const icon = SearchLocations.createSearchLocationsIcon();
      
      // set map view to coordinates of the first item in the results and the zoom level to 18
      this.mapComponent.map.setView(mapSearchLocations, 16);

      // add marker at location to the map
      this.addMaker(mapSearchLocations, icon)
    }
  }
}
