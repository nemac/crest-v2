// default map template
import nav_template from '../templates/nav_bar.html';
import nav_bars_template from '../templates/nav_bar_nav.html';
import { Component } from './components';

import { navConfig } from '../config/navConfig';

import { toggleElementDisplay } from './domUtils';

/**
 * nav_bar Component
 * Render and control map layer control
 */
export class nav_bar extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, nav_template);

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
    navConfig.navs.map((nav) => {
      const navInnerHTML = navHeaderElement.innerHTML;
      navHeaderElement.innerHTML = navInnerHTML + nav_bars_template;

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
    navConfig.navs.map((nav) => {
      const el = document.getElementById(nav.id);
      el.addEventListener('click', (e) => {
        this.deactivateAllNavs();
        this.toggleTabContent(e.target.id);
        const ele = e.target;
        ele.className += ' active';

        // add to store later
        this.activeNav = nav.id;
      });
    });
  }

  tabUpdate(id) {
    this.deactivateAllNavs();
    const el = document.getElementById(id);
    el.className = `${el.className} active`;
  }

  deactivateAllNavs() {
    navConfig.navs.map((nav) => {
      const el = document.getElementById(nav.id);
      el.className = el.className.replace(' active', '');
    });
  }

  toggleTabContent(id) {
    this.resetTabContent();
    const el = document.getElementById(`tab-${id}`);
    el.className = el.className.replace(' d-none', '');
  }

  resetTabContent() {
    navConfig.navs.map((nav) => {
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
