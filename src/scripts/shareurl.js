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

    this.shareurlTemplate = shareurlTemplate;

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
    this.makeSharedURL();
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


  static createShareURLWrapper () {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'shareurl-holder');
    wrapper.innerHTML = "";
    return wrapper
  }

  buildShareURLBox () {
    const shareBox = new DOMParser();
    const docShareBox = shareBox.parseFromString(this.shareurlTemplate, 'text/html');
    const elemShareBox = docShareBox.getElementById('shareurl-holder');
    const innerHTMLShareBox = elemShareBox.innerHTML;

    const newdiv = document.createElement("div");
    newdiv.setAttribute('id', 'shareurl-holder');
    newdiv.innerHTML = innerHTMLShareBox;
    document.body.appendChild(newdiv);
    return newdiv
  }

  static addShareURLListners () {
    const createShareURLCopyButton = document.querySelector('.btn-copy-share');
    const shareUrlBox = document.getElementById('shareurltextarea');

    shareUrlBox.addEventListener('click', ShareUrl.copyToClipboard);
    createShareURLCopyButton.addEventListener('click', ShareUrl.copyToClipboard);
    createShareURLCopyButton.classList.remove('disabled');
  }

  // save shapes to s3 so we can share user added shapes from a URL
  // async saveShapesToS3 () {
  makeSharedURL () {
    this.buildShareURLBox();
    this.shareurl = this.URL.getShareUrl();
    const shareUrlBox = document.getElementById('shareurltextarea');
    shareUrlBox.value = this.shareurl;

    ShareUrl.addShareURLListners();
    return this.shareurl;
  }

}
