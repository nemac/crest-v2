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
  }], [{
    key: 'tabUpdate',
    value: function tabUpdate(id) {
      NavBar.deactivateAllNavs();
      var el = document.getElementById(id);
      el.className = el.className + ' active';
      store.setStoreItem('activeNav', id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL25hdkNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL25hdkJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlsaXR5cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXJfbmF2Lmh0bWwiXSwibmFtZXMiOlsibmF2Q29uZmlnIiwibmF2cyIsIm5hbWUiLCJyZWYiLCJ0ZXh0IiwiaWQiLCJocmVmIiwiQ29tcG9uZW50IiwicGxhY2Vob2xkZXJJZCIsInByb3BzIiwidGVtcGxhdGUiLCJjb21wb25lbnRFbGVtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlZnMiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5uZXJIVE1MIiwicmVmRWxlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW0iLCJnZXRBdHRyaWJ1dGUiLCJldmVudHMiLCJjcmVhdGVFdmVudHMiLCJPYmplY3QiLCJrZXlzIiwiZXZlbnROYW1lIiwiZGV0YWlsIiwiZXZlbnQiLCJ3aW5kb3ciLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJzdG9yZSIsIlN0b3JlIiwiTmF2QmFyIiwibmF2VGVtcGxhdGUiLCJhY3RpdmVOYXYiLCJuYXZIZWFkZXJFbGVtZW50IiwiY250IiwibmF2IiwibmF2SW5uZXJIVE1MIiwibmF2QmFyc1RlbXBsYXRlIiwibmF2RWxlbWVudCIsImNsYXNzTmFtZSIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiZ2V0U3RhdGVJdGVtIiwiZGVhY3RpdmF0ZUFsbE5hdnMiLCJ0b2dnbGVUYWJDb250ZW50IiwiZWwiLCJhZGRUYWJDbGljayIsImUiLCJ0YXJnZXQiLCJ0YWJVcGRhdGUiLCJzZXRTdG9yZUl0ZW0iLCJuYXZDaGFuZ2VFdmVudCIsInJlcGxhY2UiLCJyZXNldFRhYkNvbnRlbnQiLCJ0b2dnbGVFbGVtZW50RGlzcGxheSIsImNoZWNrVmFsaWRPYmplY3QiLCJzcGlubmVyT24iLCJjaGVja3dvcmtpbmciLCJzcGlubmVyT2ZmIiwiYWRkU3R5bGUiLCJyZXBsYWNlTWFwSW5mb1ZhbHVlIiwiUGFyZW50Q29udGFpbnMiLCJmbGF0dGVuIiwiZ29vZ2xlQW5hbHl0aWNzRXZlbnQiLCJhZGREb3dubG9hZEdvb2dsZUV2ZW50cyIsImFkZE1pc3NpbmdTdGF0ZUl0ZW1zIiwidGhpc0VsZSIsImVsZW1lbnRzIiwiZWxlIiwidGFiRWxlIiwicXVlcnlTZWxlY3RvciIsIm1hcENsYXNzIiwibmV3TWFwQ2xhc3MiLCJpbmRleE9mIiwib2JqIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwiZWxIb2xkZXIiLCJiYXNlVmFsIiwiZWxDbGFzc05hbWUiLCJ3b3JraW5nRHJhd2xheWVycyIsIndvcmtpbmdCYXNlbWFwIiwid29ya2luZ01hcGluZm8iLCJ3b3JraW5nWm9uYWxzdGF0cyIsIndvcmtpbmdTZWFyY2giLCJ3b3JraW5nUzNSZXRyZWl2ZSIsIndvcmtpbmdTM1NhdmUiLCJzb3VyY2UiLCJkb2MiLCJ0eXBlIiwidmFsdWVzIiwiZWxlbWVudCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwibGFiZWwiLCJwIiwicGFyZW50RWxlbWVudCIsImFyciIsImZsYXQiLCJkIiwiQXJyYXkiLCJpc0FycmF5IiwicHVzaCIsImFjdGlvbiIsImNhdGVnb3J5IiwidmFsdWUiLCJndGFnIiwiZXZlbnRfY2F0ZWdvcnkiLCJldmVudF9sYWJlbCIsImRvd25sb2FkSWRzIiwiZXYiLCJsYXQiLCJsbmciLCJIdWJzVE1TIiwiRXhwb3N1cmVUTVMiLCJBc3NldHNUTVMiLCJUaHJlYXRzVE1TIiwiQXF1YXRpY1RNUyIsIlRlcnJlc3RyaWFsVE1TIiwiUG9wRGVuc2l0eVRNUyIsIlNvY1Z1bG5UTVMiLCJDcml0aWNhbEZhY2lsaXRpZXNUTVMiLCJDcml0aWNhbEluZnJhc3RydWN0dXJlVE1TIiwiRHJhaW5nZVRNUyIsIkVyb3Npb25UTVMiLCJTTFJUTVMiLCJTdG9ybVN1cmdlVE1TIiwiR2VvU3RyZXNzVE1TIiwiU2xvcGVUTVMiLCJGbG9vZFByb25lQXJlYXNUTVMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFPLElBQUlBLGdDQUFZO0FBQ3JCQyxRQUFLLENBQUM7QUFDSkMsVUFBTSxNQURGO0FBRUpDLFNBQUssY0FGRDtBQUdKQyxVQUFNLHdCQUhGO0FBSUpDLFFBQUksY0FKQTtBQUtKQyxVQUFNO0FBTEYsR0FBRCxFQU9MO0FBQ0VKLFVBQU0sWUFEUjtBQUVFQyxTQUFLLHlCQUZQO0FBR0VDLFVBQU0seUNBSFI7QUFJRUMsUUFBSSx5QkFKTjtBQUtFQyxVQUFNO0FBTFIsR0FQSyxFQWNMO0FBQ0VKLFVBQU0sVUFEUjtBQUVFQyxTQUFLLG1CQUZQO0FBR0VDLFVBQU0sZUFIUjtBQUlFQyxRQUFJLG1CQUpOO0FBS0VDLFVBQU07QUFMUixHQWRLLEVBcUJMO0FBQ0VKLFVBQU0sT0FEUjtBQUVFQyxTQUFLLGdCQUZQO0FBR0VDLFVBQU0sT0FIUjtBQUlFQyxRQUFJLGdCQUpOO0FBS0VDLFVBQU07QUFMUixHQXJCSztBQURnQixDQUFoQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQVA7OztJQUdhQyxTLFdBQUFBLFM7QUFDWDs7Ozs7Ozs7QUFRQSxxQkFBWUMsYUFBWixFQUFpRDtBQUFBOztBQUFBLFFBQXRCQyxLQUFzQix1RUFBZCxFQUFjO0FBQUEsUUFBVkMsUUFBVTs7QUFBQTs7QUFDL0MsU0FBS0MsYUFBTCxHQUFxQkMsU0FBU0MsY0FBVCxDQUF3QkwsYUFBeEIsQ0FBckI7O0FBR0EsU0FBS00sSUFBTCxHQUFZLEVBQVo7O0FBRUEsUUFBSUosUUFBSixFQUFjO0FBQ1osVUFBSSxLQUFLQyxhQUFMLElBQXNCLElBQTFCLEVBQWdDO0FBQzlCLGFBQUtBLGFBQUwsQ0FBbUJJLGdCQUFuQixDQUFvQyxNQUFwQyxF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aUU7QUFDL0RkLFVBQU1zQixZQUFOLENBQW1CLG9CQUFuQixFQUF5QyxLQUF6QztBQUNEOztBQUVEO0FBQ0EsTUFBSSxDQUFDSyxpQkFBaUIzQixNQUFNYyxZQUFOLENBQW1CLGFBQW5CLENBQWpCLENBQUwsRUFBMEQ7QUFDeERkLFVBQU1zQixZQUFOLENBQW1CLGFBQW5CLEVBQWtDLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FBbEM7QUFDRDtBQUNGLEM7Ozs7Ozs7Ozs7O0FDMVVELCtGOzs7Ozs7Ozs7OztBQ0FBLDhHIiwiZmlsZSI6ImRvd25sb2FkfmluZGV4LmFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIG5hdkNvbmZpZyA9IHtcbiAgbmF2czpbe1xuICAgIG5hbWU6IFwiaG9tZVwiLFxuICAgIHJlZjogXCJtYWluLW5hdi1tYXBcIixcbiAgICB0ZXh0OiBcIkV4bHBvcmUgdGhlIEFzc2Vzc21lbnRcIixcbiAgICBpZDogXCJtYWluLW5hdi1tYXBcIixcbiAgICBocmVmOiBcIi4vI0hvbWVcIlxuICB9LFxuICB7XG4gICAgbmFtZTogXCJzZWFyY2hIdWJzXCIsXG4gICAgcmVmOiBcIm1haW4tbmF2LW1hcC1zZWFyY2hodWJzXCIsXG4gICAgdGV4dDogXCJXaGVyZSBzaG91bGQgSSBkbyBhIHJlc2lsaWVuY2UgcHJvamVjdD9cIixcbiAgICBpZDogXCJtYWluLW5hdi1tYXAtc2VhcmNoaHVic1wiLFxuICAgIGhyZWY6IFwiLi8jU2VhcmNoSHVic1wiXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImRvd25sb2FkXCIsXG4gICAgcmVmOiBcIm1haW4tbmF2LWRvd25sb2FkXCIsXG4gICAgdGV4dDogXCJEb3dubG9hZCBEYXRhXCIsXG4gICAgaWQ6IFwibWFpbi1uYXYtZG93bmxvYWRcIixcbiAgICBocmVmOiBcIi4vI0Rvd25sb2FkXCJcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYWJvdXRcIixcbiAgICByZWY6IFwibWFpbi1uYXYtYWJvdXRcIixcbiAgICB0ZXh0OiBcIkFib3V0XCIsXG4gICAgaWQ6IFwibWFpbi1uYXYtYWJvdXRcIixcbiAgICBocmVmOiBcIi4vI0Fib3V0XCJcbiAgfV1cbn1cbiIsIi8qKlxuICogQmFzZSBjb21wb25lbnQgY2xhc3MgdG8gcHJvdmlkZSB2aWV3IHJlZiBiaW5kaW5nLCB0ZW1wbGF0ZSBpbnNlcnRpb24sIGFuZCBldmVudCBsaXN0ZW5lciBzZXR1cFxuICovXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIENvbXBvbmVudCBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBwbGFjZWhvbGRlcklkIC0gRWxlbWVudCBJRCB0byBpbmZsYXRlIHRoZSBjb21wb25lbnQgaW50b1xuICAgKiBAcGFyYW0geyBPYmplY3QgfSBwcm9wcyAtIENvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7IE9iamVjdCB9IHByb3BzLmV2ZW50cyAtIENvbXBvbmVudCBldmVudCBsaXN0ZW5lcnNcbiAgICogQHBhcmFtIHsgT2JqZWN0IH0gcHJvcHMuZGF0YSAtIENvbXBvbmVudCBkYXRhIHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gdGVtcGxhdGUgLSBIVE1MIHRlbXBsYXRlIHRvIGluZmxhdGUgaW50byBwbGFjZWhvbGRlciBpZFxuICAgKi9cbiAgY29uc3RydWN0b3IocGxhY2Vob2xkZXJJZCwgcHJvcHMgPSB7fSwgdGVtcGxhdGUpIHtcbiAgICB0aGlzLmNvbXBvbmVudEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGFjZWhvbGRlcklkKTtcblxuXG4gICAgdGhpcy5yZWZzID0ge307XG5cbiAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgIGlmICh0aGlzLmNvbXBvbmVudEVsZW0gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAvLyBwbGFjZWhvbGRlciBmb3IgZnV0dXJlIHVzZVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndW5sb2FkJywgKCkgPT4ge1xuICAgICAgICAgIC8vIHBsYWNlaG9sZGVyIGZvciBmdXR1cmUgdXNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExvYWQgdGVtcGxhdGUgaW50byBwbGFjZWhvbGRlciBlbGVtZW50XG4gICAgICAgIHRoaXMuY29tcG9uZW50RWxlbS5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcblxuICAgICAgICAvLyBGaW5kIGFsbCByZWZzIGluIGNvbXBvbmVudFxuICAgICAgICBjb25zdCByZWZFbGVtcyA9IHRoaXMuY29tcG9uZW50RWxlbS5xdWVyeVNlbGVjdG9yQWxsKCdbcmVmXScpO1xuICAgICAgICByZWZFbGVtcy5mb3JFYWNoKChlbGVtKSA9PiB7IHRoaXMucmVmc1tlbGVtLmdldEF0dHJpYnV0ZSgncmVmJyldID0gZWxlbTsgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmV2ZW50cykgeyB0aGlzLmNyZWF0ZUV2ZW50cyhwcm9wcy5ldmVudHMpOyB9XG4gIH1cblxuICAvKiogUmVhZCBcImV2ZW50XCIgY29tcG9uZW50IHBhcmFtZXRlcnMsIGFuZCBhdHRhY2ggZXZlbnQgbGlzdGVuZXJzIGZvciBlYWNoICovXG4gIGNyZWF0ZUV2ZW50cyhldmVudHMpIHtcbiAgICBPYmplY3Qua2V5cyhldmVudHMpLmZvckVhY2goKGV2ZW50TmFtZSkgPT4ge1xuICAgICAgdGhpcy5jb21wb25lbnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudHNbZXZlbnROYW1lXSwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFRyaWdnZXIgYSBjb21wb25lbnQgZXZlbnQgd2l0aCB0aGUgcHJvdmlkZWQgXCJkZXRhaWxcIiBwYXlsb2FkICovXG4gIHRyaWdnZXJFdmVudChldmVudE5hbWUsIGRldGFpbCkge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChldmVudE5hbWUsIHsgZGV0YWlsIH0pO1xuICAgIHRoaXMuY29tcG9uZW50RWxlbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxufVxuIiwiLy8gZGVmYXVsdCBtYXAgdGVtcGxhdGVcbmltcG9ydCBuYXZUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvbmF2X2Jhci5odG1sJztcbmltcG9ydCBuYXZCYXJzVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL25hdl9iYXJfbmF2Lmh0bWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5cbmltcG9ydCB7IG5hdkNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9uYXZDb25maWcnO1xuXG5pbXBvcnQge1xuICBnb29nbGVBbmFseXRpY3NFdmVudFxufSBmcm9tICcuL3V0aWxpdHlzJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuXG4vKipcbiAqIE5hdkJhciBDb21wb25lbnRcbiAqIFJlbmRlciBhbmQgY29udHJvbCBtYXAgbGF5ZXIgY29udHJvbFxuICovXG5leHBvcnQgY2xhc3MgTmF2QmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocGxhY2Vob2xkZXJJZCwgcHJvcHMpIHtcbiAgICBzdXBlcihwbGFjZWhvbGRlcklkLCBwcm9wcywgbmF2VGVtcGxhdGUpO1xuXG4gICAgLyoqXG4gICAgICogZ2V0IG5hdiBjb25maWd1cmF0aW9uXG4gICAgICovXG4gICAgdGhpcy5uYXZDb25maWcgPSBuYXZDb25maWc7XG5cbiAgICB0aGlzLmFjdGl2ZU5hdiA9ICcnO1xuXG4gICAgLy8gZ2V0IHRoZSBtYWluIG5hdiBlbGVtZW50XG4gICAgY29uc3QgbmF2SGVhZGVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluLW5hdicpO1xuXG4gICAgLyoqXG4gICAgICogIGl0ZXJhdGUgZWFjaCBuYXYgYW5kIGFkZCBpdCB0byB0aGUgdWlcbiAgICAgKi9cbiAgICBsZXQgY250ID0gMTtcbiAgICBuYXZDb25maWcubmF2cy5mb3JFYWNoKChuYXYpID0+IHtcbiAgICAgIGNvbnN0IG5hdklubmVySFRNTCA9IG5hdkhlYWRlckVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgbmF2SGVhZGVyRWxlbWVudC5pbm5lckhUTUwgPSBuYXZJbm5lckhUTUwgKyBuYXZCYXJzVGVtcGxhdGU7XG5cbiAgICAgIGNvbnN0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbi1uYXYtcGFnZScpO1xuXG4gICAgICAvLyBmaXJzdCB0YWIgaXMgYWx3YXlzIGFjdGl2ZVxuICAgICAgaWYgKGNudCA9PT0gMSkge1xuICAgICAgICBuYXZFbGVtZW50LmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICB9XG5cbiAgICAgIG5hdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdyZWYnLCBuYXYucmVmKTsgLy8gbmF2IHJlZlxuICAgICAgbmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBuYXYuaHJlZik7IC8vIG5hdiBocmVmXG4gICAgICBuYXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBuYXYuaWQpOyAvLyBuYXYgaWRcbiAgICAgIG5hdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgbmF2LnRleHQpOyAvLyBhcmlhLWxhYmVsXG4gICAgICBuYXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCBuYXYudGV4dCk7IC8vIHRpdGxlXG4gICAgICBuYXZFbGVtZW50LnRleHRDb250ZW50ID0gbmF2LnRleHQ7IC8vIG5hdiB0ZXh0XG5cbiAgICAgIGNudCArPSAxO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYWN0aXZlTmF2ID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdhY3RpdmVOYXYnKTtcblxuICAgIGlmIChhY3RpdmVOYXYpIHtcbiAgICAgIE5hdkJhci5kZWFjdGl2YXRlQWxsTmF2cygpO1xuICAgICAgTmF2QmFyLnRvZ2dsZVRhYkNvbnRlbnQoYWN0aXZlTmF2KTtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYWN0aXZlTmF2KTtcbiAgICAgIGlmIChlbCkge1xuICAgICAgICBlbC5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCBjbGljayBldmVudCBmb3IgYWN0aXZlIHRvZ2dsZVxuICAgIHRoaXMuYWRkVGFiQ2xpY2soKTtcbiAgfVxuXG4gIGFkZFRhYkNsaWNrKCkge1xuICAgIG5hdkNvbmZpZy5uYXZzLmZvckVhY2goKG5hdikgPT4ge1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYXYuaWQpO1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBOYXZCYXIuZGVhY3RpdmF0ZUFsbE5hdnMoKTtcblxuICAgICAgICAvLyB0aGlzIHZlcnkgaGFja3kgbmVlZCBiZXR0ZXIgd2F5IHRvIGhhbmRsZVxuICAgICAgICBpZiAobmF2LmlkID09PSAnbWFpbi1uYXYtbWFwLXNlYXJjaGh1YnMnKSB7XG4gICAgICAgICAgTmF2QmFyLnRvZ2dsZVRhYkNvbnRlbnQoJ21haW4tbmF2LW1hcCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIE5hdkJhci50b2dnbGVUYWJDb250ZW50KGUudGFyZ2V0LmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gICAgICAgIGdvb2dsZUFuYWx5dGljc0V2ZW50KCdjbGljaycsICduYXZiYXInLCBlLnRhcmdldC5pZCk7XG5cbiAgICAgICAgLy8gbWFrZSB0YWIgc3R5bGUgYWN0aXZlXG4gICAgICAgIE5hdkJhci50YWJVcGRhdGUoZS50YXJnZXQuaWQpO1xuXG4gICAgICAgIHRoaXMuYWN0aXZlTmF2ID0gbmF2LmlkO1xuICAgICAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ2FjdGl2ZU5hdicsIG5hdi5pZCk7XG5cbiAgICAgICAgY29uc3QgbmF2Q2hhbmdlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2Fib3V0TmF2Q2hhbmdlJyk7XG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5hdkNoYW5nZUV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHRhYlVwZGF0ZShpZCkge1xuICAgIE5hdkJhci5kZWFjdGl2YXRlQWxsTmF2cygpO1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGVsLmNsYXNzTmFtZSA9IGAke2VsLmNsYXNzTmFtZX0gYWN0aXZlYDtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ2FjdGl2ZU5hdicsIGlkKTtcbiAgfVxuXG4gIHN0YXRpYyBkZWFjdGl2YXRlQWxsTmF2cygpIHtcbiAgICBuYXZDb25maWcubmF2cy5mb3JFYWNoKChuYXYpID0+IHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmF2LmlkKTtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKCcgYWN0aXZlJywgJycpO1xuICAgIH0pO1xuICB9XG5cblxuICBzdGF0aWMgdG9nZ2xlVGFiQ29udGVudChpZCkge1xuICAgIE5hdkJhci5yZXNldFRhYkNvbnRlbnQoKTtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0YWItJHtpZH1gKTtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKCcgZC1ub25lJywgJycpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZXNldFRhYkNvbnRlbnQoKSB7XG4gICAgbmF2Q29uZmlnLm5hdnMuZm9yRWFjaCgobmF2KSA9PiB7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0YWItJHtuYXYuaWR9YCk7XG4gICAgICBpZiAoZWwpIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gICAgICAgIGVsLmNsYXNzTmFtZSArPSAnIGQtbm9uZSc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBub3QgZm91bmQgaW4gY2FzZSBpdCB3YXMgcmV2ZWFsZWQuXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFiLW1haW4tbmF2LW5vdGZvdW5kJyk7XG4gICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gICAgZWwuY2xhc3NOYW1lICs9ICcgZC1ub25lJztcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuLyoqXG4gKiB1cGRhdGUgdGhlIGRpc3BsYXkgb2YgZWxlbWVudFxuICogIEBwYXJhbSB7IE9iamVjdCB9IGVsZW1lbnQgLSBFbGVtZW50IG9iamVjdCBmcm9tIGNsaWNrIGV2ZW50LCB1c2VkIHRvIHRvZ2dsZVxuICogICAgICAgICAgICAgICAgICAgZGlzcGxheSBzdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRWxlbWVudERpc3BsYXkodGhpc0VsZSwgZWxlbWVudHMpIHtcbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IGVsZS5yZXBsYWNlKCdtYWluX25hdl8nLCAnJyk7XG4gICAgY29uc3QgdGFiRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW3JlZj1cInRhYi0ke25hbWV9XCJdYCk7XG4gICAgY29uc3QgbWFwQ2xhc3MgPSB0YWJFbGUuY2xhc3NOYW1lO1xuICAgIGNvbnN0IG5ld01hcENsYXNzID0gbWFwQ2xhc3MgKyAobWFwQ2xhc3MuaW5kZXhPZignIGQtbm9uZScpID4gMCkgPyAnICcgOiAnZC1ub25lJztcblxuICAgIHRhYkVsZS5jbGFzc05hbWUgPSBuZXdNYXBDbGFzcztcbiAgfSk7XG59XG5cbi8vIGVuc3VyZSB0aGUgb2JqZWN0IG9yIHZhcmlhYmxlIGlzIHZhbGlkLi4uXG4vLyBUT0RPOiBUaGlzIHNob3VsZCBwcm9iYWJseSBiZSBsb29raW5nIGZvciBwb3NpdGl2ZXMgcmF0aGVyIHRoYW4gY2hlY2tpbmcgaXRcbi8vIGlzbid0IG9uZSBvZiBhIGZldyBuZWdhdGl2ZXMuIEZvciBleGFtcGxlIHRoaXMgd2lsbCBsZXQgYm9vbGVhbnMsIG1hbGZvcm1lZFxuLy8gbGF0L2xvbmcgb2JqZWN0cywgYXJyYXlzIGFuZCBmbG9hdHMgdGhyb3VnaCB3aGVuIGl0IHByb2JhYmx5IHNob3VsZG4ndC4gVGhlXG4vLyBjb2RlIGRvZXNuJ3QgcmVhbGx5IHNheSB3aGF0IGEgdmFsaWQgb2JqZWN0IGlzIG90aGVyIHRoYW4gbm90IHVuZGVmaW5lZCxcbi8vIG51bGwsIGVtcHR5IGFycmF5cywgZW1wdHkgb2JqZWN0cyBhbmQgZW1wdHkgc3RyaW5ncy5cbi8vXG4vLyBAcGFyYW0gb2JqIC0gdHlwZWxlc3NcbmV4cG9ydCBmdW5jdGlvbiBjaGVja1ZhbGlkT2JqZWN0KG9iaikge1xuICBpZiAob2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyAmJiBvYmoubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyB0b2dnbGUgc3Bpbm5lciB2aXNpYmlsaXR5IG9uXG5leHBvcnQgZnVuY3Rpb24gc3Bpbm5lck9uKCkge1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtd29ya2luZycpO1xuICBjb25zdCBlbEhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWFmbGV0LXdvcmtpbmcnKTtcblxuICAvLyBlbnN1cmUgZWxlbWVudHMgYW5kIGNsYXNzIG5hbWVzIGV4aXN0c1xuICBpZiAoZWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGVsLmNsYXNzTmFtZS5iYXNlVmFsID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChlbEhvbGRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoZWxIb2xkZXIuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgLy8gdXBkYXRlIGNsYXNzIGZvciBzdmcgc3Bpbm5lclxuICBjb25zdCBlbENsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5iYXNlVmFsO1xuICBlbC5jbGFzc05hbWUuYmFzZVZhbCA9IGVsQ2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG5cbiAgLy8gdXBkYXRlIGNsYXNzIGZvciBkaXYgZWxlbWVudCB0aGF0IGhvbGRzIHN2Zy4gIERvIHRoaXMgc28gaXQgZG9zZSBub3QgY292ZXJcbiAgLy8gY292ZXIgb3RoZXIgbWFwIGVsZW1lbnRzIGFuZCBwYW5lc1xuICBlbEhvbGRlci5jbGFzc05hbWUgPSBlbEhvbGRlci5jbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJ2gtMTAwJywgJycpO1xuICBlbEhvbGRlci5jbGFzc05hbWUgPSBlbEhvbGRlci5jbGFzc05hbWUucmVwbGFjZSgndy0xMDAnLCAnJyk7XG4gIGVsSG9sZGVyLmNsYXNzTmFtZSArPSAnIGgtMTAwJztcbiAgZWxIb2xkZXIuY2xhc3NOYW1lICs9ICcgdy0xMDAnO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBjaGVjayBpZiBvbmUgb2Ygb3VyIGFqYXggY2FsbHMgaXMgd29ya2luZ1xuLy8gaWYgd2UgYWRkIGFueW1vcmUgd2Ugd2lsbCBuZWVkIHRvIGFkZCBpdCBoZXJlXG5leHBvcnQgZnVuY3Rpb24gY2hlY2t3b3JraW5nKCkge1xuICBjb25zdCB3b3JraW5nRHJhd2xheWVycyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19kcmF3bGF5ZXJzJyk7XG4gIGlmICh3b3JraW5nRHJhd2xheWVycykgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ19kcmF3bGF5ZXJzJyk7XG5cbiAgY29uc3Qgd29ya2luZ0Jhc2VtYXAgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfYmFzZW1hcCcpO1xuICBpZiAod29ya2luZ0Jhc2VtYXApIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfYmFzZW1hcCcpO1xuXG4gIGNvbnN0IHdvcmtpbmdNYXBpbmZvID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX21hcGluZm8nKTtcbiAgaWYgKHdvcmtpbmdNYXBpbmZvKSB7IHJldHVybiB0cnVlOyB9XG4gIC8vIGNvbnNvbGUubG9nKCd3b3JraW5nX21hcGluZm8nKTtcblxuICBjb25zdCB3b3JraW5nWm9uYWxzdGF0cyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ196b25hbHN0YXRzJyk7XG4gIGlmICh3b3JraW5nWm9uYWxzdGF0cykgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ196b25hbHN0YXRzJyk7XG5cbiAgY29uc3Qgd29ya2luZ1NlYXJjaCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zZWFyY2gnKTtcbiAgaWYgKHdvcmtpbmdTZWFyY2gpIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfc2VhcmNoJyk7XG5cbiAgY29uc3Qgd29ya2luZ1MzUmV0cmVpdmUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfczNyZXRyZWl2ZScpO1xuICBpZiAod29ya2luZ1MzUmV0cmVpdmUpIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfczNyZXRyZWl2ZScpO1xuXG4gIGNvbnN0IHdvcmtpbmdTM1NhdmUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfczNzYXZlJyk7XG4gIGlmICh3b3JraW5nUzNTYXZlKSB7IHJldHVybiB0cnVlOyB9XG4gIC8vIGNvbnNvbGUubG9nKCd3b3JraW5nX3Mzc2F2ZScpO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuXG4vLyB0b2dnbGUgc3Bpbm5lciB2aXNpYmlsaXR5IG9mZlxuZXhwb3J0IGZ1bmN0aW9uIHNwaW5uZXJPZmYoc291cmNlID0gJycpIHtcbiAgaWYgKGNoZWNrd29ya2luZygpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC13b3JraW5nJyk7XG4gIGNvbnN0IGVsSG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlYWZsZXQtd29ya2luZycpO1xuXG4gIC8vIGVuc3VyZSBlbGVtZW50cyBhbmQgY2xhc3MgbmFtZXMgZXhpc3RzXG4gIGlmIChlbCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoZWwuY2xhc3NOYW1lLmJhc2VWYWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGVsSG9sZGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChlbEhvbGRlci5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAvLyB1cGRhdGUgY2xhc3MgZm9yIHN2ZyBzcGlubmVyXG4gIGNvbnN0IGVsQ2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLmJhc2VWYWw7XG4gIGVsLmNsYXNzTmFtZS5iYXNlVmFsID0gZWxDbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgZWwuY2xhc3NOYW1lLmJhc2VWYWwgKz0gJyBkLW5vbmUnO1xuXG4gIC8vIHVwZGF0ZSBjbGFzcyBmb3IgZGl2IGVsZW1lbnQgdGhhdCBob2xkcyBzdmcuICBEbyB0aGlzIHNvIGl0IGRvc2Ugbm90IGNvdmVyXG4gIC8vIGNvdmVyIG90aGVyIG1hcCBlbGVtZW50cyBhbmQgcGFuZXNcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gIGVsSG9sZGVyLmNsYXNzTmFtZSA9IGVsSG9sZGVyLmNsYXNzTmFtZS5yZXBsYWNlKCdoLTEwMCcsICcnKTtcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJ3ctMTAwJywgJycpO1xuICBlbEhvbGRlci5jbGFzc05hbWUgKz0gJyBkLW5vbmUnO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBUT0RPOiBFaXRoZXIgZ2VuZXJhbGl6ZSB0aGlzIHNvIGl0IGlzbid0IGFsd2F5cyBiYWNrZ3JvdW5kIGNvbG9yIGFuZCBjb2xvciBidXQgaW5zdGVhZFxuLy8gYW4gYXR0cmlidXRlL3ZhbHVlIHBhaXIuIE9yIHByZWZlcmFibHkgbWFrZSB0aGlzIHVzZSBjbGFzc2VzIHNvIHdlIGNhbiBoYXZlIHRoZSBjb2xvcnNcbi8vIGJlIGluIGNzcy5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTdHlsZShkb2MsIHR5cGUsIHZhbHVlcykge1xuICBjb25zdCBlbGVtZW50ID0gZG9jLmdldEVsZW1lbnRCeUlkKGAke3R5cGV9LXNjb3JlYCk7XG4gIGlmIChlbGVtZW50ICE9PSB1bmRlZmluZWQgJiYgZWxlbWVudCAhPT0gbnVsbCkge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBiYWNrZ3JvdW5kLWNvbG9yOiAke3ZhbHVlcy5iYWNrZ3JvdW5kQ29sb3J9OyBjb2xvcjogJHt2YWx1ZXMuY29sb3J9O2ApO1xuICB9XG59XG5cbi8vIE5vdGUgdGhhdCB0aGUgYmFjay10aWNrcyBhcmUgaW50ZW50aW9uYWwuIFRoZXkgdXNlIHRoZSBuZXcgRVM2IFRlbXBsYXRlXG4vLyBMaXRlcmFscyBwYXR0ZXJuLlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvVGVtcGxhdGVfbGl0ZXJhbHNcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTWFwSW5mb1ZhbHVlKGRvYywgdHlwZSwgdmFsdWVzKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoYCR7dHlwZX0tc2NvcmVgKTtcbiAgaWYgKGVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJiBlbGVtZW50ICE9PSBudWxsKSB7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlcy5sYWJlbDtcbiAgfVxufVxuXG4vLyBjaGVjayBpZiBhIHBhcmVudGVsZW1ldCBjb250YWlucyBhIGRvbSBpZFxuLy8gZGVhbHMgd2l0aCBldmVudCBidWJibGluZyBzbyB3ZSBjYW4gY2hlY2tcbi8vIGlmIHRoZSBjaGlsZCBpcyBpbiBhIHNwZWNpZmMgcGFyZW50XG5leHBvcnQgZnVuY3Rpb24gUGFyZW50Q29udGFpbnModGFyZ2V0LCBpZCkge1xuICBmb3IgKGxldCBwID0gdGFyZ2V0ICYmIHRhcmdldC5wYXJlbnRFbGVtZW50OyBwOyBwID0gcC5wYXJlbnRFbGVtZW50KSB7XG4gICAgaWYgKHAuaWQgPT09IGlkKSB7IHJldHVybiB0cnVlOyB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgY29uc3QgZmxhdCA9IFtdO1xuICBhcnIuZm9yRWFjaCgoZCkgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGQpKSB7XG4gICAgICBmbGF0LnB1c2goLi4uZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsYXQucHVzaChkKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZmxhdDtcbn1cblxuLy8gYWRkcyBhIGN1c3RvbSBnb29nbGUgZXZlbnRzXG5leHBvcnQgZnVuY3Rpb24gZ29vZ2xlQW5hbHl0aWNzRXZlbnQoYWN0aW9uID0gJycsIGNhdGVnb3J5ID0gJycsIGxhYmVsID0gJycsIHZhbHVlID0gMCkge1xuICBndGFnKCdldmVudCcsIGFjdGlvbiwge1xuICAgIGV2ZW50X2NhdGVnb3J5OiBjYXRlZ29yeSxcbiAgICBldmVudF9sYWJlbDogbGFiZWwsXG4gICAgdmFsdWU6IGAke3ZhbHVlfWBcbiAgfSk7XG59XG5cbi8vIGFkZCBnb29nbGUgZXZlbnQgdGFncyBmb3IgZG93bmxvYWRzLlxuZXhwb3J0IGZ1bmN0aW9uIGFkZERvd25sb2FkR29vZ2xlRXZlbnRzKCkge1xuICBjb25zdCBkb3dubG9hZElkcyA9IFtcbiAgICAnZG93bmxvYWQtaHVicycsXG4gICAgJ2Rvd25sb2FkLWV4cG9zdXJlJyxcbiAgICAnZG93bmxvYWQtYXNzZXRzJyxcbiAgICAnZG93bmxvYWQtdGhyZWF0cycsXG4gICAgJ2Rvd25sb2FkLWFxdWF0aWMnLFxuICAgICdkb3dubG9hZC10ZXJyZXN0cmlhbCcsXG4gICAgJ2Rvd25sb2FkLXBvcHVsYXRpb25kZW5zaXR5JyxcbiAgICAnZG93bmxvYWQtc29jaWFsdnVsbmVyYWJpbGl0eScsXG4gICAgJ2Rvd25sb2FkLWNyaXRpY2FsZmFjaWxpdGllcycsXG4gICAgJ2Rvd25sb2FkLWNyaXRpY2FsaW5mcmFzdHJ1Y3R1cmUnLFxuICAgICdkb3dubG9hZC1kcmFpbmFnZScsXG4gICAgJ2Rvd25sb2FkLWVyb3Npb24nLFxuICAgICdkb3dubG9hZC1mbG9vZHByb25lYXJlYXMnLFxuICAgICdkb3dubG9hZC1zZWFsZXZlbHJpc2UnLFxuICAgICdkb3dubG9hZC1zdHJvbXN1cmdlJyxcbiAgICAnZG93bmxvYWQtZ2Vvc3RyZXNzb3InLFxuICAgICdkb3dubG9hZC1zbG9wZSdcbiAgXTtcblxuICBkb3dubG9hZElkcy5mb3JFYWNoKChpZCkgPT4ge1xuICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgaWYgKGVsZW0pIHtcbiAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgICAgLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbiAgICAgICAgZ29vZ2xlQW5hbHl0aWNzRXZlbnQoJ2NsaWNrJywgJ2Rvd25sb2FkcycsIGlkKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIHNldCBzdGF0ZWl0ZW1zIGlmIHRoZXkgZG8gbm90IGV4aXN0XG4vLyB3ZSB3aWxsIGhhdmUgdG8gYW55IG5ldyBvbmVzIGlmIGFkZGVkLlxuLy8gdGhpcyB3aWxsIGhlbHAgd2hlbiB3ZSBhZGRpbmcgbmV3IHN0YXRpdGVtcyBcImJyZWFrc1wiIHRoZSB3ZWJwYWdlXG5leHBvcnQgZnVuY3Rpb24gYWRkTWlzc2luZ1N0YXRlSXRlbXMoKSB7XG4gIC8vIGNoZWNrIGZvciBiYXNlIG1hcCBkZWZhdWx0IGlzIERhcmtHcmF5XG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2Jhc2VtYXAnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ2Jhc2VtYXAnLCAnRGFya0dyYXknKTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciBsYXN0YWN0aW9uIGRlZmF1bHQgaXMgbW92ZWVuZFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdsYXN0YWN0aW9uJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdsYXN0YWN0aW9uJywgJ21vdmVlbmQnKTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciBtYXBDZW50ZXIgZGVmYXVsdCBpcyB7bGF0OiAzMi43NzY1LCBsbmc6IC03OS45MzExfSAoY2hhcmxlc3RvbiBmb3Igbm93KVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXBDZW50ZXInKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ21hcENlbnRlcicsIHsgbGF0OiAzMi43NzY1LCBsbmc6IC03OS45MzExIH0pO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIG1hcExheWVyRGlzcGxheVN0YXR1cyBkZWZhdWx0IGlzIGxpc3RlZCBiZWxvd1xuICAvLyB0byBsb25nIHRvIGxpc3QgYWdhaW5cbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwTGF5ZXJEaXNwbGF5U3RhdHVzJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdtYXBMYXllckRpc3BsYXlTdGF0dXMnLCB7XG4gICAgICBIdWJzVE1TOiBmYWxzZSxcbiAgICAgIEV4cG9zdXJlVE1TOiBmYWxzZSxcbiAgICAgIEFzc2V0c1RNUzogZmFsc2UsXG4gICAgICBUaHJlYXRzVE1TOiBmYWxzZSxcbiAgICAgIEFxdWF0aWNUTVM6IGZhbHNlLFxuICAgICAgVGVycmVzdHJpYWxUTVM6IGZhbHNlLFxuICAgICAgUG9wRGVuc2l0eVRNUzogZmFsc2UsXG4gICAgICBTb2NWdWxuVE1TOiBmYWxzZSxcbiAgICAgIENyaXRpY2FsRmFjaWxpdGllc1RNUzogZmFsc2UsXG4gICAgICBDcml0aWNhbEluZnJhc3RydWN0dXJlVE1TOiBmYWxzZSxcbiAgICAgIERyYWluZ2VUTVM6IGZhbHNlLFxuICAgICAgRXJvc2lvblRNUzogZmFsc2UsXG4gICAgICBTTFJUTVM6IGZhbHNlLFxuICAgICAgU3Rvcm1TdXJnZVRNUzogZmFsc2UsXG4gICAgICBHZW9TdHJlc3NUTVM6IGZhbHNlLFxuICAgICAgU2xvcGVUTVM6IGZhbHNlLFxuICAgICAgRmxvb2RQcm9uZUFyZWFzVE1TOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHVzZXJhcmVhY291bnQgZGVmYXVsdCBpcyAwXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3VzZXJhcmVhY291bnQnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3VzZXJhcmVhY291bnQnLCAwKTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciBtYXBDZW50ZXIgZGVmYXVsdCBpcyB7bGF0OiAzMi43NzY1LCBsbmc6IC03OS45MzExfSAoY2hhcmxlc3RvbiBmb3Igbm93KVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXBab29tJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdtYXBab29tJywgMTIpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIGFjdGl2ZU5hdiBkZWZhdWx0IGlzIG1haW4tbmF2LW1hcFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdhY3RpdmVOYXYnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ2FjdGl2ZU5hdicsICdtYWluLW5hdi1tYXAnKTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciBzYXZlZHNoYXBlcyBkZWZhdWx0IGlzIHt9IE5VTEwgb2JqZWN0XG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NhdmVkc2hhcGVzJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdzYXZlZHNoYXBlcycsIHt9KTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciB1c2VyYXJlYSBkZWZhdWx0IGlzIHt9IE5VTEwgb2JqZWN0XG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3VzZXJhcmVhJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd1c2VyYXJlYScsIHt9KTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciB1c2VyYXJlYXMgZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd1c2VyYXJlYXMnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3VzZXJhcmVhcycsIHt9KTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciB1c2VyYXJlYV9idWZmZXJlZCBkZWZhdWx0IGlzIHt9IE5VTEwgb2JqZWN0XG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3VzZXJhcmVhX2J1ZmZlcmVkJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd1c2VyYXJlYV9idWZmZXJlZCcsIHt9KTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciB6b25hbHN0YXRzanNvbiBkZWZhdWx0IGlzIHt9IE5VTEwgb2JqZWN0XG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3pvbmFsc3RhdHNqc29uJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd6b25hbHN0YXRzanNvbicsIHt9KTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciB3b3JraW5nX2Jhc2VtYXAgZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX2Jhc2VtYXAnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3dvcmtpbmdfYmFzZW1hcCcsIGZhbHNlKTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciB3b3JraW5nX21hcGluZm8gZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX21hcGluZm8nKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3dvcmtpbmdfbWFwaW5mbycsIGZhbHNlKTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciB3b3JraW5nX21hcGluZm8gZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3pvbmFsc3RhdHMnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3dvcmtpbmdfem9uYWxzdGF0cycsIGZhbHNlKTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciB3b3JraW5nX3MzcmV0cmVpdmUgZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3MzcmV0cmVpdmUnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3dvcmtpbmdfczNyZXRyZWl2ZScsIGZhbHNlKTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciB3b3JraW5nX3NlYXJjaCBkZWZhdWx0IGlzIGZhbHNlXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfc2VhcmNoJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX3NlYXJjaCcsIGZhbHNlKTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciB3b3JraW5nX3Mzc2F2ZSBkZWZhdWx0IGlzIGZhbHNlXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfczNzYXZlJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX3Mzc2F2ZScsIGZhbHNlKTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciB3b3JraW5nX2RyYXdsYXllcnMgZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX2RyYXdsYXllcnMnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3dvcmtpbmdfZHJhd2xheWVycycsIGZhbHNlKTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciB6b25hbGFjdGl2ZSBkZWZhdWx0IGlzIGZhbHNlXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3pvbmFsYWN0aXZlJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd6b25hbGFjdGl2ZScsIFsnbm9uZScsICdub25lJ10pO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiICA8bmF2IGNsYXNzPVxcXCJuYXYgZmxleC1jb2x1bW4gZmxleC1zbS1yb3dcXFwiICBpZD1cXFwibWFpbi1uYXZcXFwiID5cXG4gIDwvbmF2PlxcblwiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8YSByZWY9XFxcIm1haW4tbmF2LXBhZ2VcXFwiIGlkPVxcXCJtYWluLW5hdi1wYWdlXFxcIiBjbGFzcz1cXFwibmF2LWxpbmsgbWFpbi1uYXZcXFwiIGhyZWY9XFxcIlxcXCI+PC9hPlxcblwiOyJdLCJzb3VyY2VSb290IjoiIn0=