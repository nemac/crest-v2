// default map template
import navTemplate from '../templates/nav_bar.html';
import navBarsTemplate from '../templates/nav_bar_nav.html';
import { Component } from './components';

import { navConfig } from '../config/navConfig';

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
      navElement.textContent = nav.text; // nav text

      cnt += 1;
    });

    // add click event for active toggle
    this.addTabClick();
  }

  addTabClick() {
    navConfig.navs.forEach((nav) => {
      const el = document.getElementById(nav.id);
      el.addEventListener('click', (e) => {
        NavBar.deactivateAllNavs();
        NavBar.toggleTabContent(e.target.id);
        const ele = e.target;
        ele.className += ' active';

        // add to store later
        this.activeNav = nav.id;
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
    el.className = el.className.replace(' d-none', '');
  }

  static resetTabContent() {
    navConfig.navs.forEach((nav) => {
      const el = document.getElementById(`tab-${nav.id}`);
      el.className = el.className.replace(' d-none', '');
      el.className += ' d-none';
    });

    // not found in case it was revealed.
    const el = document.getElementById('tab-main-nav-notfound');
    el.className = el.className.replace(' d-none', '');
    el.className += ' d-none';
  }
}
