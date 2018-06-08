/**
* Initialize global store for state maintenance
*/

export class Store {
  // ..and an (optional) custom class constructor. If one is
  // not supplied, a default constructor is used instead:
  // constructor() { }
  constructor (obj) {
    this.state = {obj};
  }

  getState() {
    return this.state
  }

  setState(obj){
    return {...this.state, obj}
  }
  // Getter/setter methods are supported in classes,
  // similar to their ES5 equivalents
  // get state() {
  //   return this.state;
  // }

  // set state(obj) {
  //   this.state = {...this.state,obj };
  // }
}
