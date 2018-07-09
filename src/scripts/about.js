import { NavBar } from './navBar';

class ViewController {
  /** Initialize Application */
  constructor() {
    this.initializeComponents();
  }

  initializeComponents() {
    // Initialize Nav Var
    this.navComponent = new NavBar('nav-holder', { activeNav: 'about' });
  }
}

window.ctrl = new ViewController();
