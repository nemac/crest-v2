// dependencies
import L from 'leaflet';
import { geosearch, arcgisOnlineProvider } from 'esri-leaflet-geocoder';

// default searchlocations template
import searchlocationsTemplate from '../templates/searchlocations.html';

import { Component } from './components';
import { Store } from './store';

// import { checkValidObject } from './utilitys';

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
      for (var i = data.results.length - 1; i >= 0; i--) {

        // test whether there are any results
        if (data.results.length > 0) {
          // set map view to coordinates of the first item in the results and the zoom level to 18
          this.mapComponent.map.setView(data.results[0].latlng, 16);

          // add marker at location to the map
          this.addMaker(data.results[0].latlng, icon)
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
}
