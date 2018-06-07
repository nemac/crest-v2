import { nav_bar } from './nav_bar'

class ViewController {

  /** Initialize Application */
  constructor () {
    this.initializeComponents()
  }

  initializeComponents () {
    // Initialize Nav Var
    this.navComponent = new nav_bar('nav-holder',{activeNav: 'about'});

  }
}


window.ctrl = new ViewController()
