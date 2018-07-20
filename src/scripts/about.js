import { NavBar } from './navBar';
// import { AboutNavBar } from './aboutNav';
class ViewController {
  /** Initialize Application */
  constructor() {
    this.initializeComponents();
  }

  initializeComponents() {
    // Initialize Nav Var
    this.navComponent = new NavBar('nav-holder', { activeNav: 'about' });
    // this.navComponent = new AboutNavBar('nav-holder');
  }
}

window.ctrl = new ViewController();
