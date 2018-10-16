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

    const { mapComponent, URLCls, hasShareURL } = props;
    this.mapComponent = mapComponent;
    this.URL = URLCls;
    this.hasShareURL = hasShareURL;

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

  static copyToClipboard(e) {
    e.stopPropagation();
      const textArea = document.getElementById('shareurltextarea');
      if (textArea) {
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
      }
  };

  // share url (identify) control (button) on add function.
  // fires when the control (button) is added
  static mapShareURLMakerOnAddHandler() {
    // setup custom style for share url indentify control (button)
    const origsharebtn = document.getElementById('btn-mapshareurl-holder');
    if (origsharebtn) {
      origsharebtn.outerHTML = "";
    }

    const sharebtn = L.DomUtil.create('div', 'btn-mapshareurl-holder');
    sharebtn.setAttribute('id', 'btn-mapshareurl-holder');
    sharebtn.innerHTML = '<a class="btn btn-light btn-mapshareurl" href="#" title="Share URL" ' +
                    'role="button" aria-label="Share URL"> ' +
                    '<i class="fas fa-share-alt i-shareurl"></i></a>';
    L.DomEvent.disableClickPropagation(sharebtn);
    return sharebtn;
  }

  // creates custom icon and adds css class for styling
  static createMapShareURLIcon() {
    return L.divIcon({ className: 'map-shareurl-point' });
  }

  createURLTextBox () {

  }

  createShareURLCopyButton () {

  }

  createShareURLWrapper () {

  }

  // save shapes to s3 so we can share user added shapes from a URL
  async saveShapesToS3 () {
    store.setStoreItem('working_s3save', true);
    spinnerOn();

    // get user all users so we can iterate and save the shapes to s3
    this.shareurl = '';
    const userareas = store.getStateItem('userareas');
    let newshapes = {};
    const totalshapes =  Object.keys(userareas).length;

    // construct the share url boxes.
    const shareurlbox = document.getElementById('shareurltextarea');
    if (shareurlbox) {
      document.body.removeChild(shareurlbox);
    }

    const shareurlboxholder = document.getElementById('btn-mapshareurl-holder');

    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'shareurl-holder');

    wrapper.innerHTML = "";

    // create share url input holds the actual url
    const el = document.createElement('input');
    el.setAttribute('id', 'shareurltextarea');
    el.setAttribute('aria-label', 'share url');
    el.classList.add('form-control');
    el.value = this.shareurl;
    el.setAttribute('readonly', '');
    wrapper.insertBefore(el, wrapper.firstChild);

    // create the copy button
    const button = document.createElement('button');
    const checksharurl = document.querySelector('#shareurl-holder');

    // only add once otherwise the copy button will be added each time we click it
    if (!checksharurl) {
      if (!checkValidObject(checksharurl)) {
        button.setAttribute('id', 'btn-icon');
        button.setAttribute('aria-label', 'copy share url');
        button.setAttribute('title', 'copy share url');
        button.classList.add('btn-copy-share');
        button.classList.add('disabled');
        button.innerHTML = '<i class="fas fa-copy"></i>';
        wrapper.insertBefore(button, wrapper.firstChild);
        shareurlboxholder.insertBefore(wrapper , shareurlboxholder.nextElementSibling);
      }
    }

    document.body.appendChild(el);

    let count = 0;
    const percentcomplete = 0;
    this.shareurl = `Working to generating Share URL ${percentcomplete} percent complete.`;
    el.value = this.shareurl;

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

        const saved_userarea = await this.StoreShapesAPI.saveShape(userarea);
        const saved_userarea_buffered = await this.StoreShapesAPI.saveShape(buffered);
        const saved_zonalstatsjson = await this.StoreShapesAPI.saveShape(zonal);
        count += 1;
        const percentcomplete = ((count/totalshapes) * 100).toFixed(0);
        this.shareurl = `Working to generating Share URL ${percentcomplete} percent complete.`;
        el.value = this.shareurl;

        // create new state object with s3 bucket name and file name for the user addded shapes
        const newshape = {
          [`savedshape${count}`]: [
            { name },
            { savedshape_userarea: saved_userarea },
            { savedshape_userarea_buffered: saved_userarea_buffered },
            { savedshape_zonalstatsjson: saved_zonalstatsjson }
          ]
        };

        // update the state item
        const savedshapes = store.getStateItem('savedshapes');
        const newshapes = { ...savedshapes, ...newshape, };
        store.setStoreItem('savedshapes', newshapes);

      }
    }

    // update the url for coping
    this.shareurl = this.URL.getShareUrl();
    el.value = this.shareurl;

    // add event listeners for coping the url
    el.addEventListener('click', ShareUrl.copyToClipboard);
    button.addEventListener('click', ShareUrl.copyToClipboard);
    button.classList.remove('disabled');

    // turn the working state off
    store.setStoreItem('working_s3save', false);
    spinnerOff();
    return this.shareurl;
  }
}
