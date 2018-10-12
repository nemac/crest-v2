// dependencies
import L from 'leaflet';
import { Component } from './components';
import { Store } from './store';
import shareurlTemplate from '../templates/shareurl.html';
import { StoreShapesAPI } from './StoreShapesAPI';

import {
  checkValidObject,
  spinnerOff,
  spinnerOn,
} from './utilitys';

const store = new Store({});

/**
* handles the identify interactions on the map
* dosen't not deal with lambda api call but it does make that call
* it does deal with the response information
* and generally handles adding any shapes to the map.
*/
export class ShareUrl extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, shareurlTemplate);

    const { mapComponent, URLCls } = props;
    this.mapComponent = mapComponent;
    this.URL = URLCls;

    this.map = mapComponent.map;
    this.mapComponent = mapComponent;
    this.shareurl = ''

    this.addShareUrlControl(this.map);

    // initalize s3 stored shapes API
    this.StoreShapesAPI = new StoreShapesAPI();

  }

  // add Identify control to leaflet map
  addShareUrlControl(leafletmap) {
    L.Control.Watermark = L.Control.extend({
      onAdd: ShareUrl.mapShareURLMakerOnAddHandler,

      // Nothing to do here
      onRemove: ShareUrl.mapShareURLakerOnRemoveHandler
    });

    L.control.watermark = opts => new L.Control.Watermark(opts);

    L.control.watermark({ position: 'bottomleft' }).addTo(leafletmap);

    // get btn for share URL add click event
    const leafletControlElement = document.querySelector('.btn-mapshareurl-holder');
    leafletControlElement.addEventListener('click', this.mapShareURLClickHandler.bind(this));
  }

  // share url (identify) control (button) on add function.
  // fires when the control (button) is removed
  static mapShareURLakerOnRemoveHandler(map) {
    // Nothing to do here yet
    return null;
  }

  // map shareurl click handler
  mapShareURLClickHandler(ev) {
    this.saveShapesToS3();
  }

  static copyToClipboard(str) {
    // const textArea = document.getElementById('shareurltextarea');
    // if (textArea) {
    //   document.body.removeChild(textArea);
    // }
    //
    // const el = document.createElement('textarea');
    // el.setAttribute('id', 'shareurltextarea');
    // el.value = str;
    // el.setAttribute('readonly', '');
    // el.style.position = 'absolute';
    // el.style.left = '-9999px';
    // document.body.appendChild(el);
    //
    // const execCopy = e => {
      const textArea = document.getElementById('shareurltextarea');
      console.log('copyToClipboard', textArea.value)
      if (textArea) {
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      }
  };

  // share url (identify) control (button) on add function.
  // fires when the control (button) is added
  static mapShareURLMakerOnAddHandler() {
    // setup custom style for share url indentify control (button)
    const fa = L.DomUtil.create('div', 'btn-mapshareurl-holder');
    fa.setAttribute('id', 'btn-mapshareurl-holder');
    fa.innerHTML = '<a class="btn btn-light btn-mapshareurl" href="#" title="Share URL" ' +
                    'role="button" aria-label="Share URL"> ' +
                    '<i class="fas fa-share-alt i-shareurl"></i></a>';
    L.DomEvent.disableClickPropagation(fa);
    return fa;
  }

  // creates custom icon and adds css class for styling
  static createMapShareURLIcon() {
    return L.divIcon({ className: 'map-shareurl-point' });
  }

  // save shapes to s3 so we can share user added shapes
  async saveShapesToS3 () {
    // spinnerOn();
    // store.setStoreItem('working_s3save', true);
    // const savedshapes = store.getStateItem('savedshapes');
    // const userareas = await this.StoreShapesAPI.saveShape(store.getStateItem('userareas'));
    this.shareurl = '';
    const userareas = store.getStateItem('userareas');
    let newshapes = {};
    const totalshapes =  Object.keys(userareas).length;

    const shareurlbox = document.getElementById('shareurltextarea');
    if (shareurlbox) {
      document.body.removeChild(shareurlbox);
    }

    const shareurlboxholder = document.getElementById('btn-mapshareurl-holder');

    const el = document.createElement('input');
    el.setAttribute('id', 'shareurltextarea');
    el.setAttribute('aria-label', 'share url');
    el.classList.add('form-control');

    el.value = this.shareurl;
    el.setAttribute('readonly', '');
    shareurlboxholder.insertBefore(el, shareurlboxholder.childNodes[0]);

    el.style.position = 'relative';
    // el.style.left = '10px';
    // el.style.top = '50px';
    el.style.zIndex = '999999999';
    document.body.appendChild(el);
    console.log('el.value', el.value)

    let count = 0;
    const percentcomplete = 0;
    this.shareurl = `Working to generating Share URL ${percentcomplete} percent complete.`;
    console.log(this.shareurl)

    const checkobj = {}.hasOwnProperty;
    // using for loop because it allows await functionality with
    // async calls to zonal stats api.  this will ensure we wait for the promise to
    // resolve and is added to the store before we progress on. using a check for hasOwnProperty
    // to deal with all the prototpe entries
    for (const key in userareas) {
      if (checkobj.call(userareas, key)) {
        const name = userareas[key][0].name;
        const userarea = userareas[key][1].userarea;
        const buffered = userareas[key][2].userarea_buffered;
        const zonal = userareas[key][3].zonalstatsjson;

        const saved_userarea = await this.StoreShapesAPI.saveShape(JSON.stringifyuserarea);
        const saved_userarea_buffered = await this.StoreShapesAPI.saveShape(buffered);
        const saved_zonalstatsjson = await this.StoreShapesAPI.saveShape(zonal);

        count += 1;
        const percentcomplete = ((count/totalshapes) * 100).toFixed(0);
        this.shareurl = `Working to generating Share URL ${percentcomplete} percent complete.`;
        el.value = this.shareurl;

        console.log(this.shareurl)
        const newshape = {
          [`savedshape${count}`]: [
            { name },
            { savedshape_userarea: saved_userarea },
            { savedshape_userarea_buffered: saved_userarea_buffered },
            { savedshape_zonalstatsjson: saved_zonalstatsjson }
          ]
        };

        const savedshapes = store.getStateItem('savedshapes');
        const newshapes = { ...savedshapes, ...newshape, };
        store.setStoreItem('savedshapes', newshapes);

      }
    }

    this.shareurl = this.URL.getShareUrl();
    console.log(this.shareurl)
    el.value = this.shareurl;
    el.addEventListener('click', ShareUrl.copyToClipboard);

    store.setStoreItem('working_s3save', false);
    spinnerOff();
    return this.shareurl;
  }
}
