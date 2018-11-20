// default map template
import navTemplate from '../templates/nav_bar.html';
import navBarsTemplate from '../templates/nav_bar_nav.html';
import { Component } from './components';
import { Store } from './store';

import { navConfig } from '../config/navConfig';
import {
  checkValidObject
} from './utilitys';

const store = new Store({});

/**
 * NavBar Component
 * Render and control map layer control
 */
export class NavBar extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, navTemplate);

    /**
     * get nav configuration
     */
    this.navConfig = navConfig;

    this.activeNav = '';

    // get the main nav element
    const navHeaderElement = document.getElementById('main-nav');

    /**
     *  iterate each nav and add it to the ui
     */
    let cnt = 1;
    navConfig.navs.forEach((nav) => {
      const navInnerHTML = navHeaderElement.innerHTML;
      navHeaderElement.innerHTML = navInnerHTML + navBarsTemplate;

      const navElement = document.getElementById('main-nav-page');

      // first tab is always active
      if (cnt === 1) {
        navElement.className += ' active';
      }

      navElement.setAttribute('ref', nav.ref); // nav ref
      navElement.setAttribute('href', nav.href); // nav href
      navElement.setAttribute('id', nav.id); // nav id
      navElement.setAttribute('aria-label', nav.text); // aria-label
      navElement.setAttribute('title', nav.text); // title
      navElement.textContent = nav.text; // nav text

      cnt += 1;
    });

    const activeNav = store.getStateItem('activeNav');

    if (activeNav) {
      NavBar.deactivateAllNavs();
      NavBar.toggleTabContent(activeNav);
      const el = document.getElementById(activeNav);
      el.className += ' active';
    }

    // add click event for active toggle
    this.addTabClick();
  }

  addTabClick() {
    navConfig.navs.forEach((nav) => {
      const el = document.getElementById(nav.id);
      el.addEventListener('click', (e) => {
        NavBar.deactivateAllNavs();

        // this very hacky need better way to handle
        if (nav.id === 'main-nav-map-searchhubs') {
          NavBar.toggleTabContent('main-nav-map');
        } else {
          NavBar.toggleTabContent(e.target.id);
        }

        // make tab style active
        NavBar.tabUpdate(e.target.id);

        this.activeNav = nav.id;
        store.setStoreItem('activeNav', nav.id);

        const navChangeEvent = new CustomEvent('aboutNavChange');
        window.dispatchEvent(navChangeEvent);
      });
    });
  }

  static tabUpdate(id) {
    NavBar.deactivateAllNavs();
    const el = document.getElementById(id);
    el.className = `${el.className} active`;
  }

  static deactivateAllNavs() {
    navConfig.navs.forEach((nav) => {
      const el = document.getElementById(nav.id);
      el.className = el.className.replace(' active', '');
    });
  }


  static toggleTabContent(id) {
    NavBar.resetTabContent();
    const el = document.getElementById(`tab-${id}`);
    if (el){
      el.className = el.className.replace(' d-none', '');
    }
  }

  static resetTabContent() {
    navConfig.navs.forEach((nav) => {
      const el = document.getElementById(`tab-${nav.id}`);
      if (el) {
        el.className = el.className.replace(' d-none', '');
        el.className += ' d-none';
      }
    });

    // not found in case it was revealed.
    const el = document.getElementById('tab-main-nav-notfound');
    el.className = el.className.replace(' d-none', '');
    el.className += ' d-none';
  }
}
