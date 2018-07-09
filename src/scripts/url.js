import { StorageAPI } from './localStorageAPI';

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
    return encodeURIComponent(this.url.getStateAsString());
  }

  setUrl() {
    const state = this.encodeStateString();
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
    if (state) {
      this.url.setStateAsString(state);
    }
  }
}
