(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["download~index"],{

/***/ "./src/config/navConfig.js":
/*!*********************************!*\
  !*** ./src/config/navConfig.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var navConfig = exports.navConfig = {
  navs: [{
    name: "home",
    ref: "main-nav-map",
    text: "Exlpore the Assessment",
    id: "main-nav-map",
    href: "./#Home"
  }, {
    name: "searchHubs",
    ref: "main-nav-map-searchhubs",
    text: "Where should I do a resilience project?",
    id: "main-nav-map-searchhubs",
    href: "./#SearchHubs"
  }, {
    name: "download",
    ref: "main-nav-download",
    text: "Download Data",
    id: "main-nav-download",
    href: "./#Download"
  }, {
    name: "about",
    ref: "main-nav-about",
    text: "About",
    id: "main-nav-about",
    href: "./#About"
  }]
};

/***/ }),

/***/ "./src/scripts/components.js":
/*!***********************************!*\
  !*** ./src/scripts/components.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base component class to provide view ref binding, template insertion, and event listener setup
 */
var Component = exports.Component = function () {
  /**
   * Component Constructor
   * @param { String } placeholderId - Element ID to inflate the component into
   * @param { Object } props - Component properties
   * @param { Object } props.events - Component event listeners
   * @param { Object } props.data - Component data properties
   * @param { String } template - HTML template to inflate into placeholder id
   */
  function Component(placeholderId) {
    var _this = this;

    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var template = arguments[2];

    _classCallCheck(this, Component);

    this.componentElem = document.getElementById(placeholderId);

    this.refs = {};

    if (template) {
      if (this.componentElem != null) {
        this.componentElem.addEventListener('load', function () {
          // placeholder for future use
        });

        this.componentElem.addEventListener('unload', function () {
          // placeholder for future use
        });

        // Load template into placeholder element
        this.componentElem.innerHTML = template;

        // Find all refs in component
        var refElems = this.componentElem.querySelectorAll('[ref]');
        refElems.forEach(function (elem) {
          _this.refs[elem.getAttribute('ref')] = elem;
        });
      }
    }

    if (props.events) {
      this.createEvents(props.events);
    }
  }

  /** Read "event" component parameters, and attach event listeners for each */


  _createClass(Component, [{
    key: 'createEvents',
    value: function createEvents(events) {
      var _this2 = this;

      Object.keys(events).forEach(function (eventName) {
        _this2.componentElem.addEventListener(eventName, events[eventName], false);
      });
    }

    /** Trigger a component event with the provided "detail" payload */

  }, {
    key: 'triggerEvent',
    value: function triggerEvent(eventName, detail) {
      var event = new window.CustomEvent(eventName, { detail: detail });
      this.componentElem.dispatchEvent(event);
    }
  }]);

  return Component;
}();

/***/ }),

/***/ "./src/scripts/navBar.js":
/*!*******************************!*\
  !*** ./src/scripts/navBar.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavBar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nav_bar = __webpack_require__(/*! ../templates/nav_bar.html */ "./src/templates/nav_bar.html");

var _nav_bar2 = _interopRequireDefault(_nav_bar);

var _nav_bar_nav = __webpack_require__(/*! ../templates/nav_bar_nav.html */ "./src/templates/nav_bar_nav.html");

var _nav_bar_nav2 = _interopRequireDefault(_nav_bar_nav);

var _components = __webpack_require__(/*! ./components */ "./src/scripts/components.js");

var _store = __webpack_require__(/*! ./store */ "./src/scripts/store.js");

var _navConfig = __webpack_require__(/*! ../config/navConfig */ "./src/config/navConfig.js");

var _utilitys = __webpack_require__(/*! ./utilitys */ "./src/scripts/utilitys.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // default map template


var store = new _store.Store({});

/**
 * NavBar Component
 * Render and control map layer control
 */

var NavBar = exports.NavBar = function (_Component) {
  _inherits(NavBar, _Component);

  function NavBar(placeholderId, props) {
    _classCallCheck(this, NavBar);

    /**
     * get nav configuration
     */
    var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, placeholderId, props, _nav_bar2.default));

    _this.navConfig = _navConfig.navConfig;

    _this.activeNav = '';

    // get the main nav element
    var navHeaderElement = document.getElementById('main-nav');

    /**
     *  iterate each nav and add it to the ui
     */
    var cnt = 1;
    _navConfig.navConfig.navs.forEach(function (nav) {
      var navInnerHTML = navHeaderElement.innerHTML;
      navHeaderElement.innerHTML = navInnerHTML + _nav_bar_nav2.default;

      var navElement = document.getElementById('main-nav-page');

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

    var activeNav = store.getStateItem('activeNav');

    if (activeNav) {
      NavBar.deactivateAllNavs();
      NavBar.toggleTabContent(activeNav);
      var el = document.getElementById(activeNav);
      if (el) {
        el.className += ' active';
      }
    }

    // add click event for active toggle
    _this.addTabClick();
    return _this;
  }

  _createClass(NavBar, [{
    key: 'addTabClick',
    value: function addTabClick() {
      var _this2 = this;

      _navConfig.navConfig.navs.forEach(function (nav) {
        var el = document.getElementById(nav.id);
        el.addEventListener('click', function (e) {
          NavBar.deactivateAllNavs();

          // this very hacky need better way to handle
          if (nav.id === 'main-nav-map-searchhubs') {
            NavBar.toggleTabContent('main-nav-map');
          } else {
            NavBar.toggleTabContent(e.target.id);
          }

          // ga event action, category, label
          (0, _utilitys.googleAnalyticsEvent)('click', 'navbar', e.target.id);

          // make tab style active
          NavBar.tabUpdate(e.target.id);

          _this2.activeNav = nav.id;
          store.setStoreItem('activeNav', nav.id);

          var navChangeEvent = new CustomEvent('aboutNavChange');

          window.dispatchEvent(navChangeEvent);
        });
      });
    }

    // clear the url after a tab nav when not from UI
    // for example share url or browser refresh

  }], [{
    key: 'UpdateRouteURL',
    value: function UpdateRouteURL(id) {
      var fullurl = window.location;
      var urlParams = window.location.search;
      var hash = window.location.hash.substr(1);
      var urlwithoutquery = fullurl.href.replace(urlParams, '');

      // this very hacky need better way to handle
      if (id === 'main-nav-map-searchhubs') {
        if (window.history && window.history.replaceState) {
          if (!hash) {
            window.history.replaceState({}, '', urlwithoutquery + 'SearchHubs');
          }
        }
      } else if (!hash) {
        window.history.replaceState({}, '', urlwithoutquery + 'Home');
      }
    }
  }, {
    key: 'tabUpdate',
    value: function tabUpdate(id) {
      NavBar.deactivateAllNavs();
      var el = document.getElementById(id);
      el.className = el.className + ' active';
      store.setStoreItem('activeNav', id);

      NavBar.UpdateRouteURL(id);
    }
  }, {
    key: 'deactivateAllNavs',
    value: function deactivateAllNavs() {
      _navConfig.navConfig.navs.forEach(function (nav) {
        var el = document.getElementById(nav.id);
        el.className = el.className.replace(' active', '');
      });
    }
  }, {
    key: 'toggleTabContent',
    value: function toggleTabContent(id) {
      NavBar.resetTabContent();
      var el = document.getElementById('tab-' + id);
      if (el) {
        el.className = el.className.replace(' d-none', '');
      }
    }
  }, {
    key: 'resetTabContent',
    value: function resetTabContent() {
      _navConfig.navConfig.navs.forEach(function (nav) {
        var el = document.getElementById('tab-' + nav.id);
        if (el) {
          el.className = el.className.replace(' d-none', '');
          el.className += ' d-none';
        }
      });

      // not found in case it was revealed.
      var el = document.getElementById('tab-main-nav-notfound');
      el.className = el.className.replace(' d-none', '');
      el.className += ' d-none';
    }
  }]);

  return NavBar;
}(_components.Component);

/***/ }),

/***/ "./src/scripts/utilitys.js":
/*!*********************************!*\
  !*** ./src/scripts/utilitys.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.toggleElementDisplay = toggleElementDisplay;
exports.checkValidObject = checkValidObject;
exports.spinnerOn = spinnerOn;
exports.checkworking = checkworking;
exports.spinnerOff = spinnerOff;
exports.addStyle = addStyle;
exports.replaceMapInfoValue = replaceMapInfoValue;
exports.ParentContains = ParentContains;
exports.flatten = flatten;
exports.googleAnalyticsEvent = googleAnalyticsEvent;
exports.addDownloadGoogleEvents = addDownloadGoogleEvents;
exports.addMissingStateItems = addMissingStateItems;

var _store = __webpack_require__(/*! ./store */ "./src/scripts/store.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var store = new _store.Store({});
/**
 * update the display of element
 *  @param { Object } element - Element object from click event, used to toggle
 *                   display state
 */
function toggleElementDisplay(thisEle, elements) {
  elements.forEach(function (ele) {
    var name = ele.replace('main_nav_', '');
    var tabEle = document.querySelector('[ref="tab-' + name + '"]');
    var mapClass = tabEle.className;
    var newMapClass = mapClass + (mapClass.indexOf(' d-none') > 0) ? ' ' : 'd-none';

    tabEle.className = newMapClass;
  });
}

// ensure the object or variable is valid...
// TODO: This should probably be looking for positives rather than checking it
// isn't one of a few negatives. For example this will let booleans, malformed
// lat/long objects, arrays and floats through when it probably shouldn't. The
// code doesn't really say what a valid object is other than not undefined,
// null, empty arrays, empty objects and empty strings.
//
// @param obj - typeless
function checkValidObject(obj) {
  if (obj === undefined || obj === null) {
    return false;
  }
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && Object.keys(obj).length === 0) {
    return false;
  }
  if (typeof obj === 'string' && obj.length === 0) {
    return false;
  }

  return true;
}

// toggle spinner visibility on
function spinnerOn() {
  var el = document.getElementById('map-working');
  var elHolder = document.querySelector('.leaflet-working');

  // ensure elements and class names exists
  if (el === undefined) {
    return false;
  }
  if (el.className.baseVal === undefined) {
    return false;
  }
  if (elHolder === undefined) {
    return false;
  }
  if (elHolder.className === undefined) {
    return false;
  }

  // update class for svg spinner
  var elClassName = el.className.baseVal;
  el.className.baseVal = elClassName.replace(' d-none', '');

  // update class for div element that holds svg.  Do this so it dose not cover
  // cover other map elements and panes
  elHolder.className = elHolder.className.replace(' d-none', '');
  elHolder.className = elHolder.className.replace('h-100', '');
  elHolder.className = elHolder.className.replace('w-100', '');
  elHolder.className += ' h-100';
  elHolder.className += ' w-100';

  return true;
}

// check if one of our ajax calls is working
// if we add anymore we will need to add it here
function checkworking() {
  var workingDrawlayers = store.getStateItem('working_drawlayers');
  if (workingDrawlayers) {
    return true;
  }
  // console.log('working_drawlayers');

  var workingBasemap = store.getStateItem('working_basemap');
  if (workingBasemap) {
    return true;
  }
  // console.log('working_basemap');

  var workingMapinfo = store.getStateItem('working_mapinfo');
  if (workingMapinfo) {
    return true;
  }
  // console.log('working_mapinfo');

  var workingZonalstats = store.getStateItem('working_zonalstats');
  if (workingZonalstats) {
    return true;
  }
  // console.log('working_zonalstats');

  var workingSearch = store.getStateItem('working_search');
  if (workingSearch) {
    return true;
  }
  // console.log('working_search');

  var workingS3Retreive = store.getStateItem('working_s3retreive');
  if (workingS3Retreive) {
    return true;
  }
  // console.log('working_s3retreive');

  var workingS3Save = store.getStateItem('working_s3save');
  if (workingS3Save) {
    return true;
  }
  // console.log('working_s3save');

  return false;
}

// toggle spinner visibility off
function spinnerOff() {
  var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (checkworking()) {
    return false;
  }

  var el = document.getElementById('map-working');
  var elHolder = document.querySelector('.leaflet-working');

  // ensure elements and class names exists
  if (el === undefined) {
    return false;
  }
  if (el.className.baseVal === undefined) {
    return false;
  }
  if (elHolder === undefined) {
    return false;
  }
  if (elHolder.className === undefined) {
    return false;
  }

  // update class for svg spinner
  var elClassName = el.className.baseVal;
  el.className.baseVal = elClassName.replace(' d-none', '');
  el.className.baseVal += ' d-none';

  // update class for div element that holds svg.  Do this so it dose not cover
  // cover other map elements and panes
  elHolder.className = elHolder.className.replace(' d-none', '');
  elHolder.className = elHolder.className.replace('h-100', '');
  elHolder.className = elHolder.className.replace('w-100', '');
  elHolder.className += ' d-none';

  return true;
}

// TODO: Either generalize this so it isn't always background color and color but instead
// an attribute/value pair. Or preferably make this use classes so we can have the colors
// be in css.
function addStyle(doc, type, values) {
  var element = doc.getElementById(type + '-score');
  if (element !== undefined && element !== null) {
    element.setAttribute('style', 'background-color: ' + values.backgroundColor + '; color: ' + values.color + ';');
  }
}

// Note that the back-ticks are intentional. They use the new ES6 Template
// Literals pattern.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
function replaceMapInfoValue(doc, type, values) {
  var element = doc.getElementById(type + '-score');
  if (element !== undefined && element !== null) {
    element.textContent = values.label;
  }
}

// check if a parentelemet contains a dom id
// deals with event bubbling so we can check
// if the child is in a specifc parent
function ParentContains(target, id) {
  for (var p = target && target.parentElement; p; p = p.parentElement) {
    if (p.id === id) {
      return true;
    }
  }
  return false;
}

function flatten(arr) {
  var flat = [];
  arr.forEach(function (d) {
    if (Array.isArray(d)) {
      flat.push.apply(flat, _toConsumableArray(d));
    } else {
      flat.push(d);
    }
  });
  return flat;
}

// adds a custom google events
function googleAnalyticsEvent() {
  var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var category = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: '' + value
  });
}

// add google event tags for downloads.
function addDownloadGoogleEvents() {
  var downloadIds = ['download-hubs', 'download-exposure', 'download-assets', 'download-threats', 'download-aquatic', 'download-terrestrial', 'download-populationdensity', 'download-socialvulnerability', 'download-criticalfacilities', 'download-criticalinfrastructure', 'download-drainage', 'download-erosion', 'download-floodproneareas', 'download-sealevelrise', 'download-stromsurge', 'download-geostressor', 'download-slope'];

  downloadIds.forEach(function (id) {
    var elem = document.getElementById(id);
    if (elem) {
      elem.addEventListener('click', function (ev) {
        // ga event action, category, label
        googleAnalyticsEvent('click', 'downloads', id);
      });
    }
  });
}

// set stateitems if they do not exist
// we will have to any new ones if added.
// this will help when we adding new statitems "breaks" the webpage
function addMissingStateItems() {
  // check for base map default is DarkGray
  if (!checkValidObject(store.getStateItem('basemap'))) {
    store.setStoreItem('basemap', 'DarkGray');
  }

  // check for lastaction default is moveend
  if (!checkValidObject(store.getStateItem('lastaction'))) {
    store.setStoreItem('lastaction', 'moveend');
  }

  // check for mapCenter default is {lat: 32.7765, lng: -79.9311} (charleston for now)
  if (!checkValidObject(store.getStateItem('mapCenter'))) {
    store.setStoreItem('mapCenter', { lat: 32.7765, lng: -79.9311 });
  }

  // check for mapLayerDisplayStatus default is listed below
  // to long to list again
  if (!checkValidObject(store.getStateItem('mapLayerDisplayStatus'))) {
    store.setStoreItem('mapLayerDisplayStatus', {
      HubsTMS: false,
      ExposureTMS: false,
      AssetsTMS: false,
      ThreatsTMS: false,
      AquaticTMS: false,
      TerrestrialTMS: false,
      PopDensityTMS: false,
      SocVulnTMS: false,
      CriticalFacilitiesTMS: false,
      CriticalInfrastructureTMS: false,
      DraingeTMS: false,
      ErosionTMS: false,
      SLRTMS: false,
      StormSurgeTMS: false,
      GeoStressTMS: false,
      SlopeTMS: false,
      FloodProneAreasTMS: false
    });
  }

  // check for userareacount default is 0
  if (!checkValidObject(store.getStateItem('userareacount'))) {
    store.setStoreItem('userareacount', 0);
  }

  // check for mapCenter default is {lat: 32.7765, lng: -79.9311} (charleston for now)
  if (!checkValidObject(store.getStateItem('mapZoom'))) {
    store.setStoreItem('mapZoom', 12);
  }

  // check for activeNav default is main-nav-map
  if (!checkValidObject(store.getStateItem('activeNav'))) {
    store.setStoreItem('activeNav', 'main-nav-map');
  }

  // check for savedshapes default is {} NULL object
  if (!checkValidObject(store.getStateItem('savedshapes'))) {
    store.setStoreItem('savedshapes', {});
  }

  // check for userarea default is {} NULL object
  if (!checkValidObject(store.getStateItem('userarea'))) {
    store.setStoreItem('userarea', {});
  }

  // check for userareas default is {} NULL object
  if (!checkValidObject(store.getStateItem('userareas'))) {
    store.setStoreItem('userareas', {});
  }

  // check for userarea_buffered default is {} NULL object
  if (!checkValidObject(store.getStateItem('userarea_buffered'))) {
    store.setStoreItem('userarea_buffered', {});
  }

  // check for zonalstatsjson default is {} NULL object
  if (!checkValidObject(store.getStateItem('zonalstatsjson'))) {
    store.setStoreItem('zonalstatsjson', {});
  }

  // check for working_basemap default is false
  if (!checkValidObject(store.getStateItem('working_basemap'))) {
    store.setStoreItem('working_basemap', false);
  }

  // check for working_mapinfo default is false
  if (!checkValidObject(store.getStateItem('working_mapinfo'))) {
    store.setStoreItem('working_mapinfo', false);
  }

  // check for working_mapinfo default is false
  if (!checkValidObject(store.getStateItem('working_zonalstats'))) {
    store.setStoreItem('working_zonalstats', false);
  }

  // check for working_s3retreive default is false
  if (!checkValidObject(store.getStateItem('working_s3retreive'))) {
    store.setStoreItem('working_s3retreive', false);
  }

  // check for working_search default is false
  if (!checkValidObject(store.getStateItem('working_search'))) {
    store.setStoreItem('working_search', false);
  }

  // check for working_s3save default is false
  if (!checkValidObject(store.getStateItem('working_s3save'))) {
    store.setStoreItem('working_s3save', false);
  }

  // check for working_drawlayers default is false
  if (!checkValidObject(store.getStateItem('working_drawlayers'))) {
    store.setStoreItem('working_drawlayers', false);
  }

  // check for zonalactive default is false
  if (!checkValidObject(store.getStateItem('zonalactive'))) {
    store.setStoreItem('zonalactive', ['none', 'none']);
  }
}

/***/ }),

/***/ "./src/templates/nav_bar.html":
/*!************************************!*\
  !*** ./src/templates/nav_bar.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "  <nav class=\"nav flex-column flex-sm-row\"  id=\"main-nav\" >\n  </nav>\n";

/***/ }),

/***/ "./src/templates/nav_bar_nav.html":
/*!****************************************!*\
  !*** ./src/templates/nav_bar_nav.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<a ref=\"main-nav-page\" id=\"main-nav-page\" class=\"nav-link main-nav\" href=\"\"></a>\n";

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL25hdkNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL25hdkJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlsaXR5cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXJfbmF2Lmh0bWwiXSwibmFtZXMiOlsibmF2Q29uZmlnIiwibmF2cyIsIm5hbWUiLCJyZWYiLCJ0ZXh0IiwiaWQiLCJocmVmIiwiQ29tcG9uZW50IiwicGxhY2Vob2xkZXJJZCIsInByb3BzIiwidGVtcGxhdGUiLCJjb21wb25lbnRFbGVtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlZnMiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5uZXJIVE1MIiwicmVmRWxlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW0iLCJnZXRBdHRyaWJ1dGUiLCJldmVudHMiLCJjcmVhdGVFdmVudHMiLCJPYmplY3QiLCJrZXlzIiwiZXZlbnROYW1lIiwiZGV0YWlsIiwiZXZlbnQiLCJ3aW5kb3ciLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJzdG9yZSIsIlN0b3JlIiwiTmF2QmFyIiwibmF2VGVtcGxhdGUiLCJhY3RpdmVOYXYiLCJuYXZIZWFkZXJFbGVtZW50IiwiY250IiwibmF2IiwibmF2SW5uZXJIVE1MIiwibmF2QmFyc1RlbXBsYXRlIiwibmF2RWxlbWVudCIsImNsYXNzTmFtZSIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiZ2V0U3RhdGVJdGVtIiwiZGVhY3RpdmF0ZUFsbE5hdnMiLCJ0b2dnbGVUYWJDb250ZW50IiwiZWwiLCJhZGRUYWJDbGljayIsImUiLCJ0YXJnZXQiLCJ0YWJVcGRhdGUiLCJzZXRTdG9yZUl0ZW0iLCJuYXZDaGFuZ2VFdmVudCIsImZ1bGx1cmwiLCJsb2NhdGlvbiIsInVybFBhcmFtcyIsInNlYXJjaCIsImhhc2giLCJzdWJzdHIiLCJ1cmx3aXRob3V0cXVlcnkiLCJyZXBsYWNlIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsIlVwZGF0ZVJvdXRlVVJMIiwicmVzZXRUYWJDb250ZW50IiwidG9nZ2xlRWxlbWVudERpc3BsYXkiLCJjaGVja1ZhbGlkT2JqZWN0Iiwic3Bpbm5lck9uIiwiY2hlY2t3b3JraW5nIiwic3Bpbm5lck9mZiIsImFkZFN0eWxlIiwicmVwbGFjZU1hcEluZm9WYWx1ZSIsIlBhcmVudENvbnRhaW5zIiwiZmxhdHRlbiIsImdvb2dsZUFuYWx5dGljc0V2ZW50IiwiYWRkRG93bmxvYWRHb29nbGVFdmVudHMiLCJhZGRNaXNzaW5nU3RhdGVJdGVtcyIsInRoaXNFbGUiLCJlbGVtZW50cyIsImVsZSIsInRhYkVsZSIsInF1ZXJ5U2VsZWN0b3IiLCJtYXBDbGFzcyIsIm5ld01hcENsYXNzIiwiaW5kZXhPZiIsIm9iaiIsInVuZGVmaW5lZCIsImxlbmd0aCIsImVsSG9sZGVyIiwiYmFzZVZhbCIsImVsQ2xhc3NOYW1lIiwid29ya2luZ0RyYXdsYXllcnMiLCJ3b3JraW5nQmFzZW1hcCIsIndvcmtpbmdNYXBpbmZvIiwid29ya2luZ1pvbmFsc3RhdHMiLCJ3b3JraW5nU2VhcmNoIiwid29ya2luZ1MzUmV0cmVpdmUiLCJ3b3JraW5nUzNTYXZlIiwic291cmNlIiwiZG9jIiwidHlwZSIsInZhbHVlcyIsImVsZW1lbnQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsImxhYmVsIiwicCIsInBhcmVudEVsZW1lbnQiLCJhcnIiLCJmbGF0IiwiZCIsIkFycmF5IiwiaXNBcnJheSIsInB1c2giLCJhY3Rpb24iLCJjYXRlZ29yeSIsInZhbHVlIiwiZ3RhZyIsImV2ZW50X2NhdGVnb3J5IiwiZXZlbnRfbGFiZWwiLCJkb3dubG9hZElkcyIsImV2IiwibGF0IiwibG5nIiwiSHVic1RNUyIsIkV4cG9zdXJlVE1TIiwiQXNzZXRzVE1TIiwiVGhyZWF0c1RNUyIsIkFxdWF0aWNUTVMiLCJUZXJyZXN0cmlhbFRNUyIsIlBvcERlbnNpdHlUTVMiLCJTb2NWdWxuVE1TIiwiQ3JpdGljYWxGYWNpbGl0aWVzVE1TIiwiQ3JpdGljYWxJbmZyYXN0cnVjdHVyZVRNUyIsIkRyYWluZ2VUTVMiLCJFcm9zaW9uVE1TIiwiU0xSVE1TIiwiU3Rvcm1TdXJnZVRNUyIsIkdlb1N0cmVzc1RNUyIsIlNsb3BlVE1TIiwiRmxvb2RQcm9uZUFyZWFzVE1TIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTyxJQUFJQSxnQ0FBWTtBQUNyQkMsUUFBSyxDQUFDO0FBQ0pDLFVBQU0sTUFERjtBQUVKQyxTQUFLLGNBRkQ7QUFHSkMsVUFBTSx3QkFIRjtBQUlKQyxRQUFJLGNBSkE7QUFLSkMsVUFBTTtBQUxGLEdBQUQsRUFPTDtBQUNFSixVQUFNLFlBRFI7QUFFRUMsU0FBSyx5QkFGUDtBQUdFQyxVQUFNLHlDQUhSO0FBSUVDLFFBQUkseUJBSk47QUFLRUMsVUFBTTtBQUxSLEdBUEssRUFjTDtBQUNFSixVQUFNLFVBRFI7QUFFRUMsU0FBSyxtQkFGUDtBQUdFQyxVQUFNLGVBSFI7QUFJRUMsUUFBSSxtQkFKTjtBQUtFQyxVQUFNO0FBTFIsR0FkSyxFQXFCTDtBQUNFSixVQUFNLE9BRFI7QUFFRUMsU0FBSyxnQkFGUDtBQUdFQyxVQUFNLE9BSFI7QUFJRUMsUUFBSSxnQkFKTjtBQUtFQyxVQUFNO0FBTFIsR0FyQks7QUFEZ0IsQ0FBaEIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FQOzs7SUFHYUMsUyxXQUFBQSxTO0FBQ1g7Ozs7Ozs7O0FBUUEscUJBQVlDLGFBQVosRUFBaUQ7QUFBQTs7QUFBQSxRQUF0QkMsS0FBc0IsdUVBQWQsRUFBYztBQUFBLFFBQVZDLFFBQVU7O0FBQUE7O0FBQy9DLFNBQUtDLGFBQUwsR0FBcUJDLFNBQVNDLGNBQVQsQ0FBd0JMLGFBQXhCLENBQXJCOztBQUdBLFNBQUtNLElB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QyxNQUFELEVBQVMsTUFBVCxDQUFsQztBQUNEO0FBQ0YsQzs7Ozs7Ozs7Ozs7QUMxVUQsK0Y7Ozs7Ozs7Ozs7O0FDQUEsOEciLCJmaWxlIjoiZG93bmxvYWR+aW5kZXguYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgbmF2Q29uZmlnID0ge1xuICBuYXZzOlt7XG4gICAgbmFtZTogXCJob21lXCIsXG4gICAgcmVmOiBcIm1haW4tbmF2LW1hcFwiLFxuICAgIHRleHQ6IFwiRXhscG9yZSB0aGUgQXNzZXNzbWVudFwiLFxuICAgIGlkOiBcIm1haW4tbmF2LW1hcFwiLFxuICAgIGhyZWY6IFwiLi8jSG9tZVwiXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInNlYXJjaEh1YnNcIixcbiAgICByZWY6IFwibWFpbi1uYXYtbWFwLXNlYXJjaGh1YnNcIixcbiAgICB0ZXh0OiBcIldoZXJlIHNob3VsZCBJIGRvIGEgcmVzaWxpZW5jZSBwcm9qZWN0P1wiLFxuICAgIGlkOiBcIm1haW4tbmF2LW1hcC1zZWFyY2hodWJzXCIsXG4gICAgaHJlZjogXCIuLyNTZWFyY2hIdWJzXCJcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZG93bmxvYWRcIixcbiAgICByZWY6IFwibWFpbi1uYXYtZG93bmxvYWRcIixcbiAgICB0ZXh0OiBcIkRvd25sb2FkIERhdGFcIixcbiAgICBpZDogXCJtYWluLW5hdi1kb3dubG9hZFwiLFxuICAgIGhyZWY6IFwiLi8jRG93bmxvYWRcIlxuICB9LFxuICB7XG4gICAgbmFtZTogXCJhYm91dFwiLFxuICAgIHJlZjogXCJtYWluLW5hdi1hYm91dFwiLFxuICAgIHRleHQ6IFwiQWJvdXRcIixcbiAgICBpZDogXCJtYWluLW5hdi1hYm91dFwiLFxuICAgIGhyZWY6IFwiLi8jQWJvdXRcIlxuICB9XVxufVxuIiwiLyoqXG4gKiBCYXNlIGNvbXBvbmVudCBjbGFzcyB0byBwcm92aWRlIHZpZXcgcmVmIGJpbmRpbmcsIHRlbXBsYXRlIGluc2VydGlvbiwgYW5kIGV2ZW50IGxpc3RlbmVyIHNldHVwXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wb25lbnQge1xuICAvKipcbiAgICogQ29tcG9uZW50IENvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHBsYWNlaG9sZGVySWQgLSBFbGVtZW50IElEIHRvIGluZmxhdGUgdGhlIGNvbXBvbmVudCBpbnRvXG4gICAqIEBwYXJhbSB7IE9iamVjdCB9IHByb3BzIC0gQ29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHsgT2JqZWN0IH0gcHJvcHMuZXZlbnRzIC0gQ29tcG9uZW50IGV2ZW50IGxpc3RlbmVyc1xuICAgKiBAcGFyYW0geyBPYmplY3QgfSBwcm9wcy5kYXRhIC0gQ29tcG9uZW50IGRhdGEgcHJvcGVydGllc1xuICAgKiBAcGFyYW0geyBTdHJpbmcgfSB0ZW1wbGF0ZSAtIEhUTUwgdGVtcGxhdGUgdG8gaW5mbGF0ZSBpbnRvIHBsYWNlaG9sZGVyIGlkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwbGFjZWhvbGRlcklkLCBwcm9wcyA9IHt9LCB0ZW1wbGF0ZSkge1xuICAgIHRoaXMuY29tcG9uZW50RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYWNlaG9sZGVySWQpO1xuXG5cbiAgICB0aGlzLnJlZnMgPSB7fTtcblxuICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgaWYgKHRoaXMuY29tcG9uZW50RWxlbSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50RWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgIC8vIHBsYWNlaG9sZGVyIGZvciBmdXR1cmUgdXNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50RWxlbS5hZGRFdmVudExpc3RlbmVyKCd1bmxvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgLy8gcGxhY2Vob2xkZXIgZm9yIGZ1dHVyZSB1c2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTG9hZCB0ZW1wbGF0ZSBpbnRvIHBsYWNlaG9sZGVyIGVsZW1lbnRcbiAgICAgICAgdGhpcy5jb21wb25lbnRFbGVtLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuXG4gICAgICAgIC8vIEZpbmQgYWxsIHJlZnMgaW4gY29tcG9uZW50XG4gICAgICAgIGNvbnN0IHJlZkVsZW1zID0gdGhpcy5jb21wb25lbnRFbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyZWZdJyk7XG4gICAgICAgIHJlZkVsZW1zLmZvckVhY2goKGVsZW0pID0+IHsgdGhpcy5yZWZzW2VsZW0uZ2V0QXR0cmlidXRlKCdyZWYnKV0gPSBlbGVtOyB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZXZlbnRzKSB7IHRoaXMuY3JlYXRlRXZlbnRzKHByb3BzLmV2ZW50cyk7IH1cbiAgfVxuXG4gIC8qKiBSZWFkIFwiZXZlbnRcIiBjb21wb25lbnQgcGFyYW1ldGVycywgYW5kIGF0dGFjaCBldmVudCBsaXN0ZW5lcnMgZm9yIGVhY2ggKi9cbiAgY3JlYXRlRXZlbnRzKGV2ZW50cykge1xuICAgIE9iamVjdC5rZXlzKGV2ZW50cykuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICB0aGlzLmNvbXBvbmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50c1tldmVudE5hbWVdLCBmYWxzZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogVHJpZ2dlciBhIGNvbXBvbmVudCBldmVudCB3aXRoIHRoZSBwcm92aWRlZCBcImRldGFpbFwiIHBheWxvYWQgKi9cbiAgdHJpZ2dlckV2ZW50KGV2ZW50TmFtZSwgZGV0YWlsKSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgeyBkZXRhaWwgfSk7XG4gICAgdGhpcy5jb21wb25lbnRFbGVtLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG59XG4iLCIvLyBkZWZhdWx0IG1hcCB0ZW1wbGF0ZVxuaW1wb3J0IG5hdlRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9uYXZfYmFyLmh0bWwnO1xuaW1wb3J0IG5hdkJhcnNUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvbmF2X2Jhcl9uYXYuaHRtbCc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuaW1wb3J0IHsgbmF2Q29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL25hdkNvbmZpZyc7XG5cbmltcG9ydCB7XG4gIGdvb2dsZUFuYWx5dGljc0V2ZW50XG59IGZyb20gJy4vdXRpbGl0eXMnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5cbi8qKlxuICogTmF2QmFyIENvbXBvbmVudFxuICogUmVuZGVyIGFuZCBjb250cm9sIG1hcCBsYXllciBjb250cm9sXG4gKi9cbmV4cG9ydCBjbGFzcyBOYXZCYXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihwbGFjZWhvbGRlcklkLCBwcm9wcykge1xuICAgIHN1cGVyKHBsYWNlaG9sZGVySWQsIHByb3BzLCBuYXZUZW1wbGF0ZSk7XG5cbiAgICAvKipcbiAgICAgKiBnZXQgbmF2IGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICB0aGlzLm5hdkNvbmZpZyA9IG5hdkNvbmZpZztcblxuICAgIHRoaXMuYWN0aXZlTmF2ID0gJyc7XG5cbiAgICAvLyBnZXQgdGhlIG1haW4gbmF2IGVsZW1lbnRcbiAgICBjb25zdCBuYXZIZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tbmF2Jyk7XG5cbiAgICAvKipcbiAgICAgKiAgaXRlcmF0ZSBlYWNoIG5hdiBhbmQgYWRkIGl0IHRvIHRoZSB1aVxuICAgICAqL1xuICAgIGxldCBjbnQgPSAxO1xuICAgIG5hdkNvbmZpZy5uYXZzLmZvckVhY2goKG5hdikgPT4ge1xuICAgICAgY29uc3QgbmF2SW5uZXJIVE1MID0gbmF2SGVhZGVyRWxlbWVudC5pbm5lckhUTUw7XG4gICAgICBuYXZIZWFkZXJFbGVtZW50LmlubmVySFRNTCA9IG5hdklubmVySFRNTCArIG5hdkJhcnNUZW1wbGF0ZTtcblxuICAgICAgY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluLW5hdi1wYWdlJyk7XG5cbiAgICAgIC8vIGZpcnN0IHRhYiBpcyBhbHdheXMgYWN0aXZlXG4gICAgICBpZiAoY250ID09PSAxKSB7XG4gICAgICAgIG5hdkVsZW1lbnQuY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICAgIH1cblxuICAgICAgbmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JlZicsIG5hdi5yZWYpOyAvLyBuYXYgcmVmXG4gICAgICBuYXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsIG5hdi5ocmVmKTsgLy8gbmF2IGhyZWZcbiAgICAgIG5hdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIG5hdi5pZCk7IC8vIG5hdiBpZFxuICAgICAgbmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBuYXYudGV4dCk7IC8vIGFyaWEtbGFiZWxcbiAgICAgIG5hdkVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIG5hdi50ZXh0KTsgLy8gdGl0bGVcbiAgICAgIG5hdkVsZW1lbnQudGV4dENvbnRlbnQgPSBuYXYudGV4dDsgLy8gbmF2IHRleHRcblxuICAgICAgY250ICs9IDE7XG4gICAgfSk7XG5cbiAgICBjb25zdCBhY3RpdmVOYXYgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2FjdGl2ZU5hdicpO1xuXG4gICAgaWYgKGFjdGl2ZU5hdikge1xuICAgICAgTmF2QmFyLmRlYWN0aXZhdGVBbGxOYXZzKCk7XG4gICAgICBOYXZCYXIudG9nZ2xlVGFiQ29udGVudChhY3RpdmVOYXYpO1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhY3RpdmVOYXYpO1xuICAgICAgaWYgKGVsKSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkIGNsaWNrIGV2ZW50IGZvciBhY3RpdmUgdG9nZ2xlXG4gICAgdGhpcy5hZGRUYWJDbGljaygpO1xuICB9XG5cbiAgYWRkVGFiQ2xpY2soKSB7XG4gICAgbmF2Q29uZmlnLm5hdnMuZm9yRWFjaCgobmF2KSA9PiB7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5hdi5pZCk7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIE5hdkJhci5kZWFjdGl2YXRlQWxsTmF2cygpO1xuXG4gICAgICAgIC8vIHRoaXMgdmVyeSBoYWNreSBuZWVkIGJldHRlciB3YXkgdG8gaGFuZGxlXG4gICAgICAgIGlmIChuYXYuaWQgPT09ICdtYWluLW5hdi1tYXAtc2VhcmNoaHVicycpIHtcbiAgICAgICAgICBOYXZCYXIudG9nZ2xlVGFiQ29udGVudCgnbWFpbi1uYXYtbWFwJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgTmF2QmFyLnRvZ2dsZVRhYkNvbnRlbnQoZS50YXJnZXQuaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbiAgICAgICAgZ29vZ2xlQW5hbHl0aWNzRXZlbnQoJ2NsaWNrJywgJ25hdmJhcicsIGUudGFyZ2V0LmlkKTtcblxuICAgICAgICAvLyBtYWtlIHRhYiBzdHlsZSBhY3RpdmVcbiAgICAgICAgTmF2QmFyLnRhYlVwZGF0ZShlLnRhcmdldC5pZCk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmVOYXYgPSBuYXYuaWQ7XG4gICAgICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnYWN0aXZlTmF2JywgbmF2LmlkKTtcblxuICAgICAgICBjb25zdCBuYXZDaGFuZ2VFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnYWJvdXROYXZDaGFuZ2UnKTtcblxuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuYXZDaGFuZ2VFdmVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGNsZWFyIHRoZSB1cmwgYWZ0ZXIgYSB0YWIgbmF2IHdoZW4gbm90IGZyb20gVUlcbiAgLy8gZm9yIGV4YW1wbGUgc2hhcmUgdXJsIG9yIGJyb3dzZXIgcmVmcmVzaFxuICBzdGF0aWMgVXBkYXRlUm91dGVVUkwoaWQpIHtcbiAgICBjb25zdCBmdWxsdXJsID0gd2luZG93LmxvY2F0aW9uO1xuICAgIGNvbnN0IHVybFBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgY29uc3QgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcbiAgICBjb25zdCB1cmx3aXRob3V0cXVlcnkgPSBmdWxsdXJsLmhyZWYucmVwbGFjZSh1cmxQYXJhbXMsICcnKTtcblxuICAgIC8vIHRoaXMgdmVyeSBoYWNreSBuZWVkIGJldHRlciB3YXkgdG8gaGFuZGxlXG4gICAgaWYgKGlkID09PSAnbWFpbi1uYXYtbWFwLXNlYXJjaGh1YnMnKSB7XG4gICAgICBpZiAod2luZG93Lmhpc3RvcnkgJiYgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKSB7XG4gICAgICAgIGlmICghaGFzaCkge1xuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgJycsIGAke3VybHdpdGhvdXRxdWVyeX1TZWFyY2hIdWJzYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFoYXNoKSB7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sICcnLCBgJHt1cmx3aXRob3V0cXVlcnl9SG9tZWApO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB0YWJVcGRhdGUoaWQpIHtcbiAgICBOYXZCYXIuZGVhY3RpdmF0ZUFsbE5hdnMoKTtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBlbC5jbGFzc05hbWUgPSBgJHtlbC5jbGFzc05hbWV9IGFjdGl2ZWA7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdhY3RpdmVOYXYnLCBpZCk7XG5cbiAgICBOYXZCYXIuVXBkYXRlUm91dGVVUkwoaWQpO1xuICB9XG5cbiAgc3RhdGljIGRlYWN0aXZhdGVBbGxOYXZzKCkge1xuICAgIG5hdkNvbmZpZy5uYXZzLmZvckVhY2goKG5hdikgPT4ge1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYXYuaWQpO1xuICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJyBhY3RpdmUnLCAnJyk7XG4gICAgfSk7XG4gIH1cblxuXG4gIHN0YXRpYyB0b2dnbGVUYWJDb250ZW50KGlkKSB7XG4gICAgTmF2QmFyLnJlc2V0VGFiQ29udGVudCgpO1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRhYi0ke2lkfWApO1xuICAgIGlmIChlbCkge1xuICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlc2V0VGFiQ29udGVudCgpIHtcbiAgICBuYXZDb25maWcubmF2cy5mb3JFYWNoKChuYXYpID0+IHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRhYi0ke25hdi5pZH1gKTtcbiAgICAgIGlmIChlbCkge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgICAgICAgZWwuY2xhc3NOYW1lICs9ICcgZC1ub25lJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIG5vdCBmb3VuZCBpbiBjYXNlIGl0IHdhcyByZXZlYWxlZC5cbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWItbWFpbi1uYXYtbm90Zm91bmQnKTtcbiAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgICBlbC5jbGFzc05hbWUgKz0gJyBkLW5vbmUnO1xuICB9XG59XG4iLCJpbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG4vKipcbiAqIHVwZGF0ZSB0aGUgZGlzcGxheSBvZiBlbGVtZW50XG4gKiAgQHBhcmFtIHsgT2JqZWN0IH0gZWxlbWVudCAtIEVsZW1lbnQgb2JqZWN0IGZyb20gY2xpY2sgZXZlbnQsIHVzZWQgdG8gdG9nZ2xlXG4gKiAgICAgICAgICAgICAgICAgICBkaXNwbGF5IHN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVFbGVtZW50RGlzcGxheSh0aGlzRWxlLCBlbGVtZW50cykge1xuICBlbGVtZW50cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICBjb25zdCBuYW1lID0gZWxlLnJlcGxhY2UoJ21haW5fbmF2XycsICcnKTtcbiAgICBjb25zdCB0YWJFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbcmVmPVwidGFiLSR7bmFtZX1cIl1gKTtcbiAgICBjb25zdCBtYXBDbGFzcyA9IHRhYkVsZS5jbGFzc05hbWU7XG4gICAgY29uc3QgbmV3TWFwQ2xhc3MgPSBtYXBDbGFzcyArIChtYXBDbGFzcy5pbmRleE9mKCcgZC1ub25lJykgPiAwKSA/ICcgJyA6ICdkLW5vbmUnO1xuXG4gICAgdGFiRWxlLmNsYXNzTmFtZSA9IG5ld01hcENsYXNzO1xuICB9KTtcbn1cblxuLy8gZW5zdXJlIHRoZSBvYmplY3Qgb3IgdmFyaWFibGUgaXMgdmFsaWQuLi5cbi8vIFRPRE86IFRoaXMgc2hvdWxkIHByb2JhYmx5IGJlIGxvb2tpbmcgZm9yIHBvc2l0aXZlcyByYXRoZXIgdGhhbiBjaGVja2luZyBpdFxuLy8gaXNuJ3Qgb25lIG9mIGEgZmV3IG5lZ2F0aXZlcy4gRm9yIGV4YW1wbGUgdGhpcyB3aWxsIGxldCBib29sZWFucywgbWFsZm9ybWVkXG4vLyBsYXQvbG9uZyBvYmplY3RzLCBhcnJheXMgYW5kIGZsb2F0cyB0aHJvdWdoIHdoZW4gaXQgcHJvYmFibHkgc2hvdWxkbid0LiBUaGVcbi8vIGNvZGUgZG9lc24ndCByZWFsbHkgc2F5IHdoYXQgYSB2YWxpZCBvYmplY3QgaXMgb3RoZXIgdGhhbiBub3QgdW5kZWZpbmVkLFxuLy8gbnVsbCwgZW1wdHkgYXJyYXlzLCBlbXB0eSBvYmplY3RzIGFuZCBlbXB0eSBzdHJpbmdzLlxuLy9cbi8vIEBwYXJhbSBvYmogLSB0eXBlbGVzc1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrVmFsaWRPYmplY3Qob2JqKSB7XG4gIGlmIChvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnICYmIG9iai5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIHRvZ2dsZSBzcGlubmVyIHZpc2liaWxpdHkgb25cbmV4cG9ydCBmdW5jdGlvbiBzcGlubmVyT24oKSB7XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC13b3JraW5nJyk7XG4gIGNvbnN0IGVsSG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlYWZsZXQtd29ya2luZycpO1xuXG4gIC8vIGVuc3VyZSBlbGVtZW50cyBhbmQgY2xhc3MgbmFtZXMgZXhpc3RzXG4gIGlmIChlbCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoZWwuY2xhc3NOYW1lLmJhc2VWYWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGVsSG9sZGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChlbEhvbGRlci5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAvLyB1cGRhdGUgY2xhc3MgZm9yIHN2ZyBzcGlubmVyXG4gIGNvbnN0IGVsQ2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLmJhc2VWYWw7XG4gIGVsLmNsYXNzTmFtZS5iYXNlVmFsID0gZWxDbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcblxuICAvLyB1cGRhdGUgY2xhc3MgZm9yIGRpdiBlbGVtZW50IHRoYXQgaG9sZHMgc3ZnLiAgRG8gdGhpcyBzbyBpdCBkb3NlIG5vdCBjb3ZlclxuICAvLyBjb3ZlciBvdGhlciBtYXAgZWxlbWVudHMgYW5kIHBhbmVzXG4gIGVsSG9sZGVyLmNsYXNzTmFtZSA9IGVsSG9sZGVyLmNsYXNzTmFtZS5yZXBsYWNlKCcgZC1ub25lJywgJycpO1xuICBlbEhvbGRlci5jbGFzc05hbWUgPSBlbEhvbGRlci5jbGFzc05hbWUucmVwbGFjZSgnaC0xMDAnLCAnJyk7XG4gIGVsSG9sZGVyLmNsYXNzTmFtZSA9IGVsSG9sZGVyLmNsYXNzTmFtZS5yZXBsYWNlKCd3LTEwMCcsICcnKTtcbiAgZWxIb2xkZXIuY2xhc3NOYW1lICs9ICcgaC0xMDAnO1xuICBlbEhvbGRlci5jbGFzc05hbWUgKz0gJyB3LTEwMCc7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIGNoZWNrIGlmIG9uZSBvZiBvdXIgYWpheCBjYWxscyBpcyB3b3JraW5nXG4vLyBpZiB3ZSBhZGQgYW55bW9yZSB3ZSB3aWxsIG5lZWQgdG8gYWRkIGl0IGhlcmVcbmV4cG9ydCBmdW5jdGlvbiBjaGVja3dvcmtpbmcoKSB7XG4gIGNvbnN0IHdvcmtpbmdEcmF3bGF5ZXJzID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX2RyYXdsYXllcnMnKTtcbiAgaWYgKHdvcmtpbmdEcmF3bGF5ZXJzKSB7IHJldHVybiB0cnVlOyB9XG4gIC8vIGNvbnNvbGUubG9nKCd3b3JraW5nX2RyYXdsYXllcnMnKTtcblxuICBjb25zdCB3b3JraW5nQmFzZW1hcCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19iYXNlbWFwJyk7XG4gIGlmICh3b3JraW5nQmFzZW1hcCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ19iYXNlbWFwJyk7XG5cbiAgY29uc3Qgd29ya2luZ01hcGluZm8gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfbWFwaW5mbycpO1xuICBpZiAod29ya2luZ01hcGluZm8pIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfbWFwaW5mbycpO1xuXG4gIGNvbnN0IHdvcmtpbmdab25hbHN0YXRzID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3pvbmFsc3RhdHMnKTtcbiAgaWYgKHdvcmtpbmdab25hbHN0YXRzKSB7IHJldHVybiB0cnVlOyB9XG4gIC8vIGNvbnNvbGUubG9nKCd3b3JraW5nX3pvbmFsc3RhdHMnKTtcblxuICBjb25zdCB3b3JraW5nU2VhcmNoID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3NlYXJjaCcpO1xuICBpZiAod29ya2luZ1NlYXJjaCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ19zZWFyY2gnKTtcblxuICBjb25zdCB3b3JraW5nUzNSZXRyZWl2ZSA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zM3JldHJlaXZlJyk7XG4gIGlmICh3b3JraW5nUzNSZXRyZWl2ZSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ19zM3JldHJlaXZlJyk7XG5cbiAgY29uc3Qgd29ya2luZ1MzU2F2ZSA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zM3NhdmUnKTtcbiAgaWYgKHdvcmtpbmdTM1NhdmUpIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfczNzYXZlJyk7XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5cbi8vIHRvZ2dsZSBzcGlubmVyIHZpc2liaWxpdHkgb2ZmXG5leHBvcnQgZnVuY3Rpb24gc3Bpbm5lck9mZihzb3VyY2UgPSAnJykge1xuICBpZiAoY2hlY2t3b3JraW5nKCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLXdvcmtpbmcnKTtcbiAgY29uc3QgZWxIb2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVhZmxldC13b3JraW5nJyk7XG5cbiAgLy8gZW5zdXJlIGVsZW1lbnRzIGFuZCBjbGFzcyBuYW1lcyBleGlzdHNcbiAgaWYgKGVsID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChlbC5jbGFzc05hbWUuYmFzZVZhbCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoZWxIb2xkZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGVsSG9sZGVyLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIC8vIHVwZGF0ZSBjbGFzcyBmb3Igc3ZnIHNwaW5uZXJcbiAgY29uc3QgZWxDbGFzc05hbWUgPSBlbC5jbGFzc05hbWUuYmFzZVZhbDtcbiAgZWwuY2xhc3NOYW1lLmJhc2VWYWwgPSBlbENsYXNzTmFtZS5yZXBsYWNlKCcgZC1ub25lJywgJycpO1xuICBlbC5jbGFzc05hbWUuYmFzZVZhbCArPSAnIGQtbm9uZSc7XG5cbiAgLy8gdXBkYXRlIGNsYXNzIGZvciBkaXYgZWxlbWVudCB0aGF0IGhvbGRzIHN2Zy4gIERvIHRoaXMgc28gaXQgZG9zZSBub3QgY292ZXJcbiAgLy8gY292ZXIgb3RoZXIgbWFwIGVsZW1lbnRzIGFuZCBwYW5lc1xuICBlbEhvbGRlci5jbGFzc05hbWUgPSBlbEhvbGRlci5jbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJ2gtMTAwJywgJycpO1xuICBlbEhvbGRlci5jbGFzc05hbWUgPSBlbEhvbGRlci5jbGFzc05hbWUucmVwbGFjZSgndy0xMDAnLCAnJyk7XG4gIGVsSG9sZGVyLmNsYXNzTmFtZSArPSAnIGQtbm9uZSc7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIFRPRE86IEVpdGhlciBnZW5lcmFsaXplIHRoaXMgc28gaXQgaXNuJ3QgYWx3YXlzIGJhY2tncm91bmQgY29sb3IgYW5kIGNvbG9yIGJ1dCBpbnN0ZWFkXG4vLyBhbiBhdHRyaWJ1dGUvdmFsdWUgcGFpci4gT3IgcHJlZmVyYWJseSBtYWtlIHRoaXMgdXNlIGNsYXNzZXMgc28gd2UgY2FuIGhhdmUgdGhlIGNvbG9yc1xuLy8gYmUgaW4gY3NzLlxuZXhwb3J0IGZ1bmN0aW9uIGFkZFN0eWxlKGRvYywgdHlwZSwgdmFsdWVzKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoYCR7dHlwZX0tc2NvcmVgKTtcbiAgaWYgKGVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJiBlbGVtZW50ICE9PSBudWxsKSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGJhY2tncm91bmQtY29sb3I6ICR7dmFsdWVzLmJhY2tncm91bmRDb2xvcn07IGNvbG9yOiAke3ZhbHVlcy5jb2xvcn07YCk7XG4gIH1cbn1cblxuLy8gTm90ZSB0aGF0IHRoZSBiYWNrLXRpY2tzIGFyZSBpbnRlbnRpb25hbC4gVGhleSB1c2UgdGhlIG5ldyBFUzYgVGVtcGxhdGVcbi8vIExpdGVyYWxzIHBhdHRlcm4uXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9UZW1wbGF0ZV9saXRlcmFsc1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VNYXBJbmZvVmFsdWUoZG9jLCB0eXBlLCB2YWx1ZXMpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvYy5nZXRFbGVtZW50QnlJZChgJHt0eXBlfS1zY29yZWApO1xuICBpZiAoZWxlbWVudCAhPT0gdW5kZWZpbmVkICYmIGVsZW1lbnQgIT09IG51bGwpIHtcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWVzLmxhYmVsO1xuICB9XG59XG5cbi8vIGNoZWNrIGlmIGEgcGFyZW50ZWxlbWV0IGNvbnRhaW5zIGEgZG9tIGlkXG4vLyBkZWFscyB3aXRoIGV2ZW50IGJ1YmJsaW5nIHNvIHdlIGNhbiBjaGVja1xuLy8gaWYgdGhlIGNoaWxkIGlzIGluIGEgc3BlY2lmYyBwYXJlbnRcbmV4cG9ydCBmdW5jdGlvbiBQYXJlbnRDb250YWlucyh0YXJnZXQsIGlkKSB7XG4gIGZvciAobGV0IHAgPSB0YXJnZXQgJiYgdGFyZ2V0LnBhcmVudEVsZW1lbnQ7IHA7IHAgPSBwLnBhcmVudEVsZW1lbnQpIHtcbiAgICBpZiAocC5pZCA9PT0gaWQpIHsgcmV0dXJuIHRydWU7IH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGFycikge1xuICBjb25zdCBmbGF0ID0gW107XG4gIGFyci5mb3JFYWNoKChkKSA9PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZCkpIHtcbiAgICAgIGZsYXQucHVzaCguLi5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmxhdC5wdXNoKGQpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmbGF0O1xufVxuXG4vLyBhZGRzIGEgY3VzdG9tIGdvb2dsZSBldmVudHNcbmV4cG9ydCBmdW5jdGlvbiBnb29nbGVBbmFseXRpY3NFdmVudChhY3Rpb24gPSAnJywgY2F0ZWdvcnkgPSAnJywgbGFiZWwgPSAnJywgdmFsdWUgPSAwKSB7XG4gIGd0YWcoJ2V2ZW50JywgYWN0aW9uLCB7XG4gICAgZXZlbnRfY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgIGV2ZW50X2xhYmVsOiBsYWJlbCxcbiAgICB2YWx1ZTogYCR7dmFsdWV9YFxuICB9KTtcbn1cblxuLy8gYWRkIGdvb2dsZSBldmVudCB0YWdzIGZvciBkb3dubG9hZHMuXG5leHBvcnQgZnVuY3Rpb24gYWRkRG93bmxvYWRHb29nbGVFdmVudHMoKSB7XG4gIGNvbnN0IGRvd25sb2FkSWRzID0gW1xuICAgICdkb3dubG9hZC1odWJzJyxcbiAgICAnZG93bmxvYWQtZXhwb3N1cmUnLFxuICAgICdkb3dubG9hZC1hc3NldHMnLFxuICAgICdkb3dubG9hZC10aHJlYXRzJyxcbiAgICAnZG93bmxvYWQtYXF1YXRpYycsXG4gICAgJ2Rvd25sb2FkLXRlcnJlc3RyaWFsJyxcbiAgICAnZG93bmxvYWQtcG9wdWxhdGlvbmRlbnNpdHknLFxuICAgICdkb3dubG9hZC1zb2NpYWx2dWxuZXJhYmlsaXR5JyxcbiAgICAnZG93bmxvYWQtY3JpdGljYWxmYWNpbGl0aWVzJyxcbiAgICAnZG93bmxvYWQtY3JpdGljYWxpbmZyYXN0cnVjdHVyZScsXG4gICAgJ2Rvd25sb2FkLWRyYWluYWdlJyxcbiAgICAnZG93bmxvYWQtZXJvc2lvbicsXG4gICAgJ2Rvd25sb2FkLWZsb29kcHJvbmVhcmVhcycsXG4gICAgJ2Rvd25sb2FkLXNlYWxldmVscmlzZScsXG4gICAgJ2Rvd25sb2FkLXN0cm9tc3VyZ2UnLFxuICAgICdkb3dubG9hZC1nZW9zdHJlc3NvcicsXG4gICAgJ2Rvd25sb2FkLXNsb3BlJ1xuICBdO1xuXG4gIGRvd25sb2FkSWRzLmZvckVhY2goKGlkKSA9PiB7XG4gICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAoZWxlbSkge1xuICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xuICAgICAgICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICAgICAgICBnb29nbGVBbmFseXRpY3NFdmVudCgnY2xpY2snLCAnZG93bmxvYWRzJywgaWQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gc2V0IHN0YXRlaXRlbXMgaWYgdGhleSBkbyBub3QgZXhpc3Rcbi8vIHdlIHdpbGwgaGF2ZSB0byBhbnkgbmV3IG9uZXMgaWYgYWRkZWQuXG4vLyB0aGlzIHdpbGwgaGVscCB3aGVuIHdlIGFkZGluZyBuZXcgc3RhdGl0ZW1zIFwiYnJlYWtzXCIgdGhlIHdlYnBhZ2VcbmV4cG9ydCBmdW5jdGlvbiBhZGRNaXNzaW5nU3RhdGVJdGVtcygpIHtcbiAgLy8gY2hlY2sgZm9yIGJhc2UgbWFwIGRlZmF1bHQgaXMgRGFya0dyYXlcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnYmFzZW1hcCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnYmFzZW1hcCcsICdEYXJrR3JheScpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIGxhc3RhY3Rpb24gZGVmYXVsdCBpcyBtb3ZlZW5kXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2xhc3RhY3Rpb24nKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ2xhc3RhY3Rpb24nLCAnbW92ZWVuZCcpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIG1hcENlbnRlciBkZWZhdWx0IGlzIHtsYXQ6IDMyLjc3NjUsIGxuZzogLTc5LjkzMTF9IChjaGFybGVzdG9uIGZvciBub3cpXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcENlbnRlcicpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnbWFwQ2VudGVyJywgeyBsYXQ6IDMyLjc3NjUsIGxuZzogLTc5LjkzMTEgfSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgbWFwTGF5ZXJEaXNwbGF5U3RhdHVzIGRlZmF1bHQgaXMgbGlzdGVkIGJlbG93XG4gIC8vIHRvIGxvbmcgdG8gbGlzdCBhZ2FpblxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXBMYXllckRpc3BsYXlTdGF0dXMnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ21hcExheWVyRGlzcGxheVN0YXR1cycsIHtcbiAgICAgIEh1YnNUTVM6IGZhbHNlLFxuICAgICAgRXhwb3N1cmVUTVM6IGZhbHNlLFxuICAgICAgQXNzZXRzVE1TOiBmYWxzZSxcbiAgICAgIFRocmVhdHNUTVM6IGZhbHNlLFxuICAgICAgQXF1YXRpY1RNUzogZmFsc2UsXG4gICAgICBUZXJyZXN0cmlhbFRNUzogZmFsc2UsXG4gICAgICBQb3BEZW5zaXR5VE1TOiBmYWxzZSxcbiAgICAgIFNvY1Z1bG5UTVM6IGZhbHNlLFxuICAgICAgQ3JpdGljYWxGYWNpbGl0aWVzVE1TOiBmYWxzZSxcbiAgICAgIENyaXRpY2FsSW5mcmFzdHJ1Y3R1cmVUTVM6IGZhbHNlLFxuICAgICAgRHJhaW5nZVRNUzogZmFsc2UsXG4gICAgICBFcm9zaW9uVE1TOiBmYWxzZSxcbiAgICAgIFNMUlRNUzogZmFsc2UsXG4gICAgICBTdG9ybVN1cmdlVE1TOiBmYWxzZSxcbiAgICAgIEdlb1N0cmVzc1RNUzogZmFsc2UsXG4gICAgICBTbG9wZVRNUzogZmFsc2UsXG4gICAgICBGbG9vZFByb25lQXJlYXNUTVM6IGZhbHNlXG4gICAgfSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWFjb3VudCBkZWZhdWx0IGlzIDBcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXNlcmFyZWFjb3VudCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgndXNlcmFyZWFjb3VudCcsIDApO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIG1hcENlbnRlciBkZWZhdWx0IGlzIHtsYXQ6IDMyLjc3NjUsIGxuZzogLTc5LjkzMTF9IChjaGFybGVzdG9uIGZvciBub3cpXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcFpvb20nKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ21hcFpvb20nLCAxMik7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgYWN0aXZlTmF2IGRlZmF1bHQgaXMgbWFpbi1uYXYtbWFwXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2FjdGl2ZU5hdicpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnYWN0aXZlTmF2JywgJ21haW4tbmF2LW1hcCcpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHNhdmVkc2hhcGVzIGRlZmF1bHQgaXMge30gTlVMTCBvYmplY3RcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnc2F2ZWRzaGFwZXMnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3NhdmVkc2hhcGVzJywge30pO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHVzZXJhcmVhIGRlZmF1bHQgaXMge30gTlVMTCBvYmplY3RcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXNlcmFyZWEnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3VzZXJhcmVhJywge30pO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHVzZXJhcmVhcyBkZWZhdWx0IGlzIHt9IE5VTEwgb2JqZWN0XG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3VzZXJhcmVhcycpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgndXNlcmFyZWFzJywge30pO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHVzZXJhcmVhX2J1ZmZlcmVkIGRlZmF1bHQgaXMge30gTlVMTCBvYmplY3RcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXNlcmFyZWFfYnVmZmVyZWQnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3VzZXJhcmVhX2J1ZmZlcmVkJywge30pO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHpvbmFsc3RhdHNqc29uIGRlZmF1bHQgaXMge30gTlVMTCBvYmplY3RcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnem9uYWxzdGF0c2pzb24nKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3pvbmFsc3RhdHNqc29uJywge30pO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHdvcmtpbmdfYmFzZW1hcCBkZWZhdWx0IGlzIGZhbHNlXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfYmFzZW1hcCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19iYXNlbWFwJywgZmFsc2UpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHdvcmtpbmdfbWFwaW5mbyBkZWZhdWx0IGlzIGZhbHNlXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfbWFwaW5mbycpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19tYXBpbmZvJywgZmFsc2UpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHdvcmtpbmdfbWFwaW5mbyBkZWZhdWx0IGlzIGZhbHNlXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfem9uYWxzdGF0cycpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ196b25hbHN0YXRzJywgZmFsc2UpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHdvcmtpbmdfczNyZXRyZWl2ZSBkZWZhdWx0IGlzIGZhbHNlXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfczNyZXRyZWl2ZScpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19zM3JldHJlaXZlJywgZmFsc2UpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHdvcmtpbmdfc2VhcmNoIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zZWFyY2gnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3dvcmtpbmdfc2VhcmNoJywgZmFsc2UpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHdvcmtpbmdfczNzYXZlIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zM3NhdmUnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3dvcmtpbmdfczNzYXZlJywgZmFsc2UpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHdvcmtpbmdfZHJhd2xheWVycyBkZWZhdWx0IGlzIGZhbHNlXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfZHJhd2xheWVycycpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19kcmF3bGF5ZXJzJywgZmFsc2UpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHpvbmFsYWN0aXZlIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnem9uYWxhY3RpdmUnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3pvbmFsYWN0aXZlJywgWydub25lJywgJ25vbmUnXSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gXCIgIDxuYXYgY2xhc3M9XFxcIm5hdiBmbGV4LWNvbHVtbiBmbGV4LXNtLXJvd1xcXCIgIGlkPVxcXCJtYWluLW5hdlxcXCIgPlxcbiAgPC9uYXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxhIHJlZj1cXFwibWFpbi1uYXYtcGFnZVxcXCIgaWQ9XFxcIm1haW4tbmF2LXBhZ2VcXFwiIGNsYXNzPVxcXCJuYXYtbGluayBtYWluLW5hdlxcXCIgaHJlZj1cXFwiXFxcIj48L2E+XFxuXCI7Il0sInNvdXJjZVJvb3QiOiIifQ==