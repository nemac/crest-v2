export class Store {
  // ..and an (optional) custom class constructor. If one is
  // not supplied, a default constructor is used instead:
  // constructor() { }
  constructor(state) {
    this.state = state;
  }

  get Store() {
     return this._state
  }

  get Store() {
     return this._state
  }
  // Simple class instance methods using short-hand method
  // declaration
  setName(state) {
    this.state =  {...this.state, ...state} //Object.assign(this.state, state)
    return this.state;
  }

  getName() {
    return this.state;
  }

  // We will look at static and subclassed methods shortly
}
