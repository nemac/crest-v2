import { NavBar } from './nav_bar';

class ViewController {
  /** Initialize Application */
  constructor() {
    this.initializeComponents();
  }

  initializeComponents() {
    // Initialize Nav Var
    this.navComponent = new NavBar('nav-holder', { activeNav: 'about' });
    console.log(this.navComponent.activeNav);
  }
}

window.ctrl = new ViewController();
