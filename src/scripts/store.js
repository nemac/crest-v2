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

      const currentState = this.getState("state");
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
      const stateStr = this.store["state"];
      if(stateStr === undefined){return false}

      // const stateStr = this.checkItem("state");
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
    if (this.isStateExists()) {
      const stateStr = this.store["state"];
      if(stateStr.indexOf(item) > 0){
        return true
      } else {
        return false
      }
    }
    return false
  }

  checkItem(item){
    const stateStr = this.store["state"];
    if(stateStr === undefined){return false}
    if(stateStr.indexOf(item) > 0){
      return true
    } else {
      return false
    }
    return false
  }

  //get state item
  getStateItem(item){
    const currentState = this.getState("state");
    if(this.checkItem(item)){
      const stateItem = currentState[item];
      return stateItem;
    }

    return {};

  }

  //return current state
  getState(){
    if (this.storageAvailable()) {
      if(this.isStateExists()){
        const currentStateStr = this.store["state"];
        const currentState = JSON.parse(currentStateStr);
        return currentState;
      }
      return {};
    }
    return {};
  }

  addStateItem(key, value){
    var currentState = this.getState();
    currentState[key] = value;
    const newStateObj = JSON.parse(JSON.stringify(currentState ));
    this.saveNewState(newStateObj);
  }

  removeStateItem(key){
    var currentState = this.getState();
    currentState[key] = undefined;
    const newStateObj = JSON.parse(JSON.stringify(currentState ));
    this.saveNewState(newStateObj);
  }

  setStoreItem(key, value){
    const storeObj = {[key]: value};
    const newStateObj = {...this.getState(), ...storeObj};
    this.saveState(newStateObj)
  }

  saveNewState(state) {
    if (this.storageAvailable){
      const newStateStr = JSON.stringify(state);
      this.store.setItem("state", newStateStr);
    }
  }

  /*
  *  set state from saved object
  *
  *  const ele.addEventListener('click', (e) => {
  *      this.setStateFromObject();
  *   })
  *
  */
  setStateFromObject(StateObject){
    this.saveNewState(StateObject)

  }

  // We will look at static and subclassed methods shortly
}
