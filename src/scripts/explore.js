// dependencies
import L from 'leaflet';
import { Draw } from 'leaflet-draw';

// default map template
import exploreTemplate from '../templates/explore.html';

import { Component } from './components';
import { Store } from './store';


const store = new Store({});

/**
 * explore Component
 * Render explore
 */
export class Explore extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, exploreTemplate);

    const { mapComponent } = props;
    const drawAreaGroup = L.featureGroup().addTo(mapComponent.map);
    // const polygonOptions =  { allowIntersection: false, showArea: true};

    // draw polygon handler
    const polygonDrawer = new L.Draw.Polygon(mapComponent.map);

    // color first vertex green
    mapComponent.map.on('draw:drawvertex', (e) => {
      const vertexElements = document.querySelectorAll('.leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-zoom-animated.leaflet-interactive');
      const fistVertexElement = vertexElements[0];
      fistVertexElement.className += ' leaflet-marker-icon-first';
    });

    // handle stop of draw with escape before finsihed
    mapComponent.map.on('draw:deletestop', () => {
      store.removeStateItem('userarea');

      // re-add indentify
      mapComponent.addMapClickIdentify();
    });
    // Assumming you have a Leaflet map accessible
    mapComponent.map.on('draw:created', (e) => {
      const { layer } = e;
      drawAreaGroup.addLayer(layer);

      // Do whatever you want with the layer.
      // e.type will be the type of layer that has been draw
      //    (polyline, marker, polygon, rectangle, circle)
      // E.g. add it to the map
      layer.addTo(mapComponent.map);

      // re-add indentify
      mapComponent.addMapClickIdentify();

      // update store
      store.setStoreItem('lastaction', 'draw area');
      store.setStoreItem('userarea', layer.toGeoJSON());
    });

    // Click handler for you button to start drawing polygons
    const drawAreaElement = document.getElementById('draw-area-btn');

    // console.log(drawAreaElement)
    drawAreaElement.addEventListener('click', (ev) => {
      // draw existing Area
      drawAreaGroup.clearLayers();
      store.removeStateItem('userarea');

      // currently removes old indentify which is not correct
      mapComponent.map.off('click');
      polygonDrawer.enable();
    });

    const userarea = store.getStateItem('userarea');
    if (Explore.checkValidObject(userarea)) {
      const layer = L.geoJson(userarea);
      drawAreaGroup.addLayer(layer);
    }
  }

  // ensure the object or variable is valid...
  // TODO: This should probably be looking for positives rather than checking it
  // isn't one of a few negatives. For example this will let booleans, malformed
  // lat/long objects, arrays and floats through when it probably shouldn't. The
  // code doesn't really say what a valid object is other than not undefined,
  // null, empty arrays, empty objects and empty strings.
  //
  // @param obj - typeless
  // add to store? so not duplicated from mapComponent
  static checkValidObject(obj) {
    if (obj === undefined || obj === null) { return false; }
    if (typeof obj === 'object' && Object.keys(obj).length === 0) { return false; }
    if (typeof obj === 'string' && obj.length === 0) { return false; }

    return true;
  }
}
