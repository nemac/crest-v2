export class Store {
  // ..and an (optional) custom class constructor. If one is
  // not supplied, a default constructor is used instead:
  // constructor() { }
  constructor() {
    // this.state = state;
    this.store = window.localStorage;

    if(this.isStateExists){
      this.state = this.getState();
    } else {
      const state = {};
      this.state = {state};
    }
    //this.saveState(state);
  }

  get Store() {
     return this._state
  }

  get Store() {
     return this._state
  }
  // Simple class instance methods using short-hand method
  // declaration
  saveState(state) {
    if (this.storageAvailable){
      const currentStateStr = this.store.getItem("state");
      const currentState = JSON.parse(currentStateStr);
      const newState = { ...currentState, ...state};
      const newStateStr = JSON.stringify(newState);

      this.store.setItem("state", newStateStr);
    }

  }

  //clear localStorage for state.
  clearState() {
    if (this.storageAvailable()) {
      this.store.removeItem("state");
    }
  }

  //check if localStorage available take from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  storageAvailable() {
    const type = 'localStorage';
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
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

  //check of state exists
  isStateExists(){
    if (this.storageAvailable()) {
      const stateStr = this.store.getItem("state");
      if(stateStr){
        return true
      } else {
        return false
      }
    }
    return false
  }

  //check for state item exists
  isStateItemExist(item){
    if (this.storageAvailable()) {
      const stateStr = this.store.getItem("state");
      if(stateStr){
        return true
      } else {
        return false
      }
    }
    return false
  }
  
  //return current state
  getState(){
    if (this.storageAvailable()) {
      if(this.isStateExists){
        const currentStateStr = this.store.getItem("state");
        const currentState = JSON.parse(currentStateStr);
        return currentState;
      } else {
        return {}
      }
    }
    return {}
  }

  // We will look at static and subclassed methods shortly
}
