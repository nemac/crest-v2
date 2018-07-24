import { NavBar } from './navBar';
import { AboutNavBar } from './aboutNav';
import { Component } from './components';
import aboutTemplate from '../templates/about.html';

export class About extends Component {
  /** Initialize Application */
    constructor(aboutPlaceholderId, props) {
      super(aboutPlaceholderId, props, aboutTemplate);
    this.initializeComponents();
  }

  initializeComponents() {
    // Initialize Nav Var
    // this.navComponent = new NavBar('nav-holder', { activeNav: 'about' });
    // console.log(hi i work);
    this.aboutNavComponent = new AboutNavBar('about-nav-holder');
  }
}
