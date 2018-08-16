import { StorageAPI } from './localStorageAPI';

const URL_IGNORE_KEYS = ['userarea', 'item3'];
/**
 * This component listens for the localstoreage to be updated, and will update the url
 * if the browser is able to do so.
 */
export class URL {
  constructor() {
    this.url = new StorageAPI();
    const handler = this.setUrl.bind(this);
    StorageAPI.listenForStateChange(handler);
    this.setStateFromURL();
  }

  static updateURL(url) {
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, '', url);
    }
  }

  encodeStateString() {
    const stateStringWithOutIgnoredKeys = this.removeIgnoreKeys();
    return encodeURIComponent(stateStringWithOutIgnoredKeys);
  }

  // some keys are to big for the URL so we have to ignore them
  // i.e geoJson instead we will have to share the geojson in
  // s3 or github-gists - TODO expand the share geojson to use gists
  // the shape remains in the state store but is removed from the URL
  // use the constant URL_IGNORE_KEY to ignore state items from the URL
  removeIgnoreKeys() {
    // get current state
    const stateOBJ = JSON.parse(this.url.getStateAsString());

    // remove the ignored keys
    const filtered = Object.keys(stateOBJ)
      .filter(key => !URL_IGNORE_KEYS.includes(key))
      .reduce((obj, key) => {
        obj[key] = stateOBJ[key];
        return obj;
    }, {});

    // return state string
    return JSON.stringify(filtered)
  }

  // some keys are to big for the URL so we have to ignore them
  // i.e geoJson instead we will have to share the geojson in
  // s3 or github-gists - TODO expand the share geojson to use gists
  // the shape remains in the state store but is removed from the URL
  // use the constant URL_IGNORE_KEY to ignore state items from the URL
  // this will add the key back to string so we can retain the state in a refersh
  addIgnoreKeys() {
    // get current state
    const stateOBJ = JSON.parse(this.url.getItem('state'))

    // add the ignored keys
    const filtered = Object.keys(stateOBJ)
      .filter(key => URL_IGNORE_KEYS.includes(key))
      .reduce((obj, key) => {
        obj[key] = stateOBJ[key];
        return obj;
    }, {});

    // // get current state from url without ignored stae
    // const urlstate = URL.getStateFromURL();
    //
    // // convert the URL state string to a object
    // const urlstateOBJ = JSON.parse(urlstate)
    //
    // // add the ignore state to url state
    // const realstate = {...urlstate, ...filtered}

    // return state string
    return JSON.stringify(filtered)
  }
  
  setUrl() {
    const state = this.encodeStateString();
    // const stateOBJ = JSON.parse(this.url.getStateAsString());
    // const notallowed = ['userarea', 'item3'];
    //
    // const filtered = Object.keys(stateOBJ)
    //   .filter(key => !notallowed.includes(key))
    //   .reduce((obj, key) => {
    //     obj[key] = stateOBJ[key];
    //     return obj;
    // }, {});
    //
    // const state2 = encodeURIComponent(JSON.stringify(filtered));
    URL.updateURL(`?state=${state}`);
  }

  static getUrl() {
    return window.location.search;
  }

  static getStateFromURL() {
    const url = URL.getUrl().substring(1);
    let state = '';
    url.split('&').forEach((param) => {
      const args = param.split('=');
      if (args[0] === 'state') {
        [, state] = args;
      }
    });

    return decodeURIComponent(state);
  }

  // TODO: Add handler to ensure the state string is valid and that the end user did not tamper with
  // it
  setStateFromURL() {
    const state = URL.getStateFromURL();

      // need to get current state from store and deal with ignored state items.
      // shapes are to big for url so we will ignore them.
      // if we need to share shape we will have to hold them externally on a gist or s3 folder
      // the gist is not built yet.
      const curstate = JSON.parse(this.url.getItem('state'))

      const allowed = ['userarea', 'item3'];

      const filtered = Object.keys(curstate)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = curstate[key];
          return obj;
      }, {});

      console.log('setStateFromURL curstate', curstate)
      console.log('setStateFromURL filtered', filtered)
    const urlstate = JSON.parse(state)
    const realstate = {...urlstate, ...filtered}
    console.log('setStateFromURL realstate', realstate)
    const realstatestr = JSON.stringify(realstate)
    if (realstatestr) {
      this.url.setStateAsString(realstatestr);
    }
  }
}
