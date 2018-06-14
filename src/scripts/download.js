import { nav_bar } from './nav_bar'
console.log(count)
class ViewController {

  /** Initialize Application */
  constructor () {
    this.initializeComponents()
  }

  initializeComponents () {
    // Initialize Nav Var
    this.navComponent = new nav_bar('nav-holder');

  }
}


window.ctrl = new ViewController()
