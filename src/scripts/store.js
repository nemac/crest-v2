/**
 * This component is intended to handle the storage and retrieval of the state of
 * the NFWF application. As of this writing it is using localStorage to do this.
 * Uses simple class instance methods with the short-hand method declaration
 * pattern.
 *
 * To note: There is a difference between the Store and the State. As of 0a3106e
 * the Store is a String saved to the browsers localStorage and is a serialized
 * version of the State. The State is an Object which is interacted with by
 * parsing the State string from the Store, modifying the results of the parse,
 * and re-serializing it back to the Store.
 */
export class Store {
  // ..and an (optional) custom class constructor. If one is
  // not supplied, a default constructor is used instead:
  // constructor() { }
  constructor() {
    // this.state = state;
    this.store = window.localStorage;

    // this.state = {};
    // if(this.isStateExists){
    //   this.state = this.getState();
    // } else {
    //   const state = {};
    //   this.state = {state};
    // }
  }

  // // GETTERS

  // As of 0a3106e this is probably intended to be used as a getter for the
  // Store. However it is pulling an unused and undeclared variable _state so it
  // probably just returns undefined.
  get Store() {
    return this._state;
  }

  // Gets an individual item from the state
  //
  // @param item - string
  // @return string || object
  getStateItem(item) {
    if (this.checkItem(item)) {
      const currentState = this.getState('state');
      const stateItem = currentState[item];
      return stateItem;
    }

    return {};
  }

  // Gets the entire state object
  //
  // @return object
  getState() {
    if (Store.storageAvailable()) {
      if (this.isStateExists()) {
        const currentStateStr = this.store.state;
        const currentState = JSON.parse(currentStateStr);
        return currentState;
      }
    }
    return {};
  }

  // // SETTERS

  // Setter for the state to the Store, preserving any non-overwritten
  // properties in the Store.
  //
  // @param state - object
  saveState(state) {
    if (Store.storageAvailable()) {
      const currentState = this.getState('state');
      const newState = { ...currentState, ...state };
      const newStateStr = JSON.stringify(newState);

      this.store.setItem('state', newStateStr);
    }
  }

  // Setter for the state to the Store, overriding any non-overwritten
  // properties in the Store.
  //
  // @param state - object
  saveNewState(state) {
    if (Store.storageAvailable()) {
      const newStateStr = JSON.stringify(state);
      this.store.setItem('state', newStateStr);
    }
  }

  // Setter which overrides the entire Store with a new State object.
  //
  // @param StateObject - object
  setStateFromObject(StateObject) {
    this.saveNewState(StateObject);
  }

  // Setter for a key value pair to the State, which means that it writes it to
  // the Store.
  //
  // @param key - string
  // @param value - string
  addStateItem(key, value) {
    const currentState = this.getState();
    currentState[key] = value;
    const newStateObj = JSON.parse(JSON.stringify(currentState));
    this.saveNewState(newStateObj);
  }

  // Setter for a key value pair to the Store.
  //
  // @param key - string
  // @param value - string
  setStoreItem(key, value) {
    const storeObj = { [key]: value };
    const newStateObj = { ...this.getState(), ...storeObj };
    this.saveState(newStateObj);
  }

  // // REMOVERS

  // Removes the entire state from the browser.
  clearState() {
    if (Store.storageAvailable()) {
      this.store.removeItem('state');
    }
  }

  // Removes a key value pair from the State and the Store.
  //
  // @param key - string
  removeStateItem(key) {
    const currentState = this.getState();
    currentState[key] = undefined;
    const newStateObj = JSON.parse(JSON.stringify(currentState));
    this.saveNewState(newStateObj);
  }

  // // UTILITIES

  // Check if localStorage available.
  // Taken from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  //
  // @return boolean
  static storageAvailable() {
    const type = 'localStorage';
    let storage;
    try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    }
  }

  // Check if the state has been saved to the browser store
  //
  // @return boolean
  isStateExists() {
    if (Store.storageAvailable()) {
      const stateStr = this.store.state;

      if (stateStr) {
        return true;
      }
    }
    return false;
  }

  // Check if an item has been saved to the store
  // unused as of 0a3106e
  //
  // @param item - string
  // @return boolean
  isStateItemExist(item) {
    if (this.isStateExists()) {
      const stateStr = this.store.state;
      if (stateStr.indexOf(item) > 0) {
        return true;
      }
    }
    return false;
  }

  // Also checks if an item has been saved to the store
  //
  // @param item - string
  // @return boolean
  checkItem(item) {
    if (this.isStateExists()) {
      const stateStr = this.store.state;
      if (typeof (stateStr) === 'string' && stateStr.indexOf(item) > 0) {
        return true;
      }
    }
    return false;
  }

  //  const ele.addEventListener('click', (e) => {
  //    this.setStateFromObject();
  //  })

  // We will look at static and subclassed methods shortly
}
