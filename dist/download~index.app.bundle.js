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
    store.setStoreItem('mapCenter', { lat: 36.27970720524017, lng: -95.05371093750001 });
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

  // check for maplayerlist default is open
  if (!checkValidObject(store.getStateItem('maplayerlist'))) {
    store.setStoreItem('maplayerlist', 'open');
  }

  // check for userareacount default is 0
  if (!checkValidObject(store.getStateItem('userareacount'))) {
    store.setStoreItem('userareacount', 0);
  }

  // check for mapCenter default is {lat: 32.7765, lng: -79.9311} (charleston for now)
  if (!checkValidObject(store.getStateItem('mapZoom'))) {
    store.setStoreItem('mapZoom', 4);
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

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-dark bg-dark main-navbar-toggle\">\n   <a class=\"navbar-brand\" href=\"#\">NFWF Coastal Resilience Assessment</a>\n  <button class=\"navbar-toggler bnt-main-navbar-toggle\" type=\"button\" data-toggle=\"collapse\" data-target=\"#mainNavToggle\" aria-controls=\"mainNavToggle\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <div class=\"collapse navbar-collapse\" id=\"mainNavToggle\">\n    <nav class=\"navbar-nav mr-auto mt-2 mt-lg-0\"\"  id=\"main-nav\" >\n    </nav>\n  </div>\n</nav>\n";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL25hdkNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL25hdkJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlsaXR5cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXJfbmF2Lmh0bWwiXSwibmFtZXMiOlsibmF2Q29uZmlnIiwibmF2cyIsIm5hbWUiLCJyZWYiLCJ0ZXh0IiwiaWQiLCJocmVmIiwiQ29tcG9uZW50IiwicGxhY2Vob2xkZXJJZCIsInByb3BzIiwidGVtcGxhdGUiLCJjb21wb25lbnRFbGVtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlZnMiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5uZXJIVE1MIiwicmVmRWxlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW0iLCJnZXRBdHRyaWJ1dGUiLCJldmVudHMiLCJjcmVhdGVFdmVudHMiLCJPYmplY3QiLCJrZXlzIiwiZXZlbnROYW1lIiwiZGV0YWlsIiwiZXZlbnQiLCJ3aW5kb3ciLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJzdG9yZSIsIlN0b3JlIiwiTmF2QmFyIiwibmF2VGVtcGxhdGUiLCJhY3RpdmVOYXYiLCJuYXZIZWFkZXJFbGVtZW50IiwiY250IiwibmF2IiwibmF2SW5uZXJIVE1MIiwibmF2QmFyc1RlbXBsYXRlIiwibmF2RWxlbWVudCIsImNsYXNzTmFtZSIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiZ2V0U3RhdGVJdGVtIiwiZGVhY3RpdmF0ZUFsbE5hdnMiLCJ0b2dnbGVUYWJDb250ZW50IiwiZWwiLCJhZGRUYWJDbGljayIsImUiLCJ0YXJnZXQiLCJ0YWJVcGRhdGUiLCJzZXRTdG9yZUl0ZW0iLCJuYXZDaGFuZ2VFdmVudCIsImZ1bGx1cmwiLCJsb2NhdGlvbiIsInVybFBhcmFtcyIsInNlYXJjaCIsImhhc2giLCJzdWJzdHIiLCJ1cmx3aXRob3V0cXVlcnkiLCJyZXBsYWNlIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsIlVwZGF0ZVJvdXRlVVJMIiwicmVzZXRUYWJDb250ZW50IiwidG9nZ2xlRWxlbWVudERpc3BsYXkiLCJjaGVja1ZhbGlkT2JqZWN0Iiwic3Bpbm5lck9uIiwiY2hlY2t3b3JraW5nIiwic3Bpbm5lck9mZiIsImFkZFN0eWxlIiwicmVwbGFjZU1hcEluZm9WYWx1ZSIsIlBhcmVudENvbnRhaW5zIiwiZmxhdHRlbiIsImdvb2dsZUFuYWx5dGljc0V2ZW50IiwiYWRkRG93bmxvYWRHb29nbGVFdmVudHMiLCJhZGRNaXNzaW5nU3RhdGVJdGVtcyIsInRoaXNFbGUiLCJlbGVtZW50cyIsImVsZSIsInRhYkVsZSIsInF1ZXJ5U2VsZWN0b3IiLCJtYXBDbGFzcyIsIm5ld01hcENsYXNzIiwiaW5kZXhPZiIsIm9iaiIsInVuZGVmaW5lZCIsImxlbmd0aCIsImVsSG9sZGVyIiwiYmFzZVZhbCIsImVsQ2xhc3NOYW1lIiwid29ya2luZ0RyYXdsYXllcnMiLCJ3b3JraW5nQmFzZW1hcCIsIndvcmtpbmdNYXBpbmZvIiwid29ya2luZ1pvbmFsc3RhdHMiLCJ3b3JraW5nU2VhcmNoIiwid29ya2luZ1MzUmV0cmVpdmUiLCJ3b3JraW5nUzNTYXZlIiwic291cmNlIiwiZG9jIiwidHlwZSIsInZhbHVlcyIsImVsZW1lbnQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsImxhYmVsIiwicCIsInBhcmVudEVsZW1lbnQiLCJhcnIiLCJmbGF0IiwiZCIsIkFycmF5IiwiaXNBcnJheSIsInB1c2giLCJhY3Rpb24iLCJjYXRlZ29yeSIsInZhbHVlIiwiZ3RhZyIsImV2ZW50X2NhdGVnb3J5IiwiZXZlbnRfbGFiZWwiLCJkb3dubG9hZElkcyIsImV2IiwibGF0IiwibG5nIiwiSHVic1RNUyIsIkV4cG9zdXJlVE1TIiwiQXNzZXRzVE1TIiwiVGhyZWF0c1RNUyIsIkFxdWF0aWNUTVMiLCJUZXJyZXN0cmlhbFRNUyIsIlBvcERlbnNpdHlUTVMiLCJTb2NWdWxuVE1TIiwiQ3JpdGljYWxGYWNpbGl0aWVzVE1TIiwiQ3JpdGljYWxJbmZyYXN0cnVjdHVyZVRNUyIsIkRyYWluZ2VUTVMiLCJFcm9zaW9uVE1TIiwiU0xSVE1TIiwiU3Rvcm1TdXJnZVRNUyIsIkdlb1N0cmVzc1RNUyIsIlNsb3BlVE1TIiwiRmxvb2RQcm9uZUFyZWFzVE1TIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTyxJQUFJQSxnQ0FBWTtBQUNyQkMsUUFBSyxDQUFDO0FBQ0pDLFVBQU0sTUFERjtBQUVKQyxTQUFLLGNBRkQ7QUFHSkMsVUFBTSx3QkFIRjtBQUlKQyxRQUFJLGNBSkE7QUFLSkMsVUFBTTtBQUxGLEdBQUQsRUFPTDtBQUNFSixVQUFNLFlBRFI7QUFFRUMsU0FBSyx5QkFGUDtBQUdFQyxVQUFNLHlDQUhSO0FBSUVDLFFBQUkseUJBSk47QUFLRUMsVUFBTTtBQUxSLEdBUEssRUFjTDtBQUNFSixVQUFNLFVBRFI7QUFFRUMsU0FBSyxtQkFGUDtBQUdFQyxVQUFNLGVBSFI7QUFJRUMsUUFBSSxtQkFKTjtBQUtFQyxVQUFNO0FBTFIsR0FkSyxFQXFCTDtBQUNFSixVQUFNLE9BRFI7QUFFRUMsU0FBSyxnQkFGUDtBQUdFQyxVQUFNLE9BSFI7QUFJRUMsUUFBSSxnQkFKTjtBQUtFQyxVQUFNO0FBTFIsR0FyQks7QUFEZ0IsQ0FBaEIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FQOzs7SUFHYUMsUyxXQUFBQSxTO0FBQ1g7Ozs7Ozs7O0FBUUEscUJBQVlDLGFBQVosRUFBaUQ7QUFBQTs7QUFBQSxRQUF0QkMsS0FBc0IsdUVBQWQsRUFBYztBQUFBLFFBQVZDLFFBQVU7O0FBQUE7O0FBQy9DLFNBQUtDLGFBQUwsR0FBcUJDLFNBQVNDLGNBQVQsQ0FBd0JMLGFBQXhCLENBQXJCOztBQUdBLFNBQUtNLElB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QUF6QztBQUNEOztBQUVEO0FBQ0EsTUFBSSxDQUFDZSxpQkFBaUJyQyxNQUFNYyxZQUFOLENBQW1CLGFBQW5CLENBQWpCLENBQUwsRUFBMEQ7QUFDeERkLFVBQU1zQixZQUFOLENBQW1CLGFBQW5CLEVBQWtDLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FBbEM7QUFDRDtBQUNGLEM7Ozs7Ozs7Ozs7O0FDL1VELHVuQjs7Ozs7Ozs7Ozs7QUNBQSw4RyIsImZpbGUiOiJkb3dubG9hZH5pbmRleC5hcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHZhciBuYXZDb25maWcgPSB7XG4gIG5hdnM6W3tcbiAgICBuYW1lOiBcImhvbWVcIixcbiAgICByZWY6IFwibWFpbi1uYXYtbWFwXCIsXG4gICAgdGV4dDogXCJFeGxwb3JlIHRoZSBBc3Nlc3NtZW50XCIsXG4gICAgaWQ6IFwibWFpbi1uYXYtbWFwXCIsXG4gICAgaHJlZjogXCIuLyNIb21lXCJcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwic2VhcmNoSHVic1wiLFxuICAgIHJlZjogXCJtYWluLW5hdi1tYXAtc2VhcmNoaHVic1wiLFxuICAgIHRleHQ6IFwiV2hlcmUgc2hvdWxkIEkgZG8gYSByZXNpbGllbmNlIHByb2plY3Q/XCIsXG4gICAgaWQ6IFwibWFpbi1uYXYtbWFwLXNlYXJjaGh1YnNcIixcbiAgICBocmVmOiBcIi4vI1NlYXJjaEh1YnNcIlxuICB9LFxuICB7XG4gICAgbmFtZTogXCJkb3dubG9hZFwiLFxuICAgIHJlZjogXCJtYWluLW5hdi1kb3dubG9hZFwiLFxuICAgIHRleHQ6IFwiRG93bmxvYWQgRGF0YVwiLFxuICAgIGlkOiBcIm1haW4tbmF2LWRvd25sb2FkXCIsXG4gICAgaHJlZjogXCIuLyNEb3dubG9hZFwiXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImFib3V0XCIsXG4gICAgcmVmOiBcIm1haW4tbmF2LWFib3V0XCIsXG4gICAgdGV4dDogXCJBYm91dFwiLFxuICAgIGlkOiBcIm1haW4tbmF2LWFib3V0XCIsXG4gICAgaHJlZjogXCIuLyNBYm91dFwiXG4gIH1dXG59XG4iLCIvKipcbiAqIEJhc2UgY29tcG9uZW50IGNsYXNzIHRvIHByb3ZpZGUgdmlldyByZWYgYmluZGluZywgdGVtcGxhdGUgaW5zZXJ0aW9uLCBhbmQgZXZlbnQgbGlzdGVuZXIgc2V0dXBcbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBDb21wb25lbnQgQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gcGxhY2Vob2xkZXJJZCAtIEVsZW1lbnQgSUQgdG8gaW5mbGF0ZSB0aGUgY29tcG9uZW50IGludG9cbiAgICogQHBhcmFtIHsgT2JqZWN0IH0gcHJvcHMgLSBDb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0geyBPYmplY3QgfSBwcm9wcy5ldmVudHMgLSBDb21wb25lbnQgZXZlbnQgbGlzdGVuZXJzXG4gICAqIEBwYXJhbSB7IE9iamVjdCB9IHByb3BzLmRhdGEgLSBDb21wb25lbnQgZGF0YSBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHRlbXBsYXRlIC0gSFRNTCB0ZW1wbGF0ZSB0byBpbmZsYXRlIGludG8gcGxhY2Vob2xkZXIgaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBsYWNlaG9sZGVySWQsIHByb3BzID0ge30sIHRlbXBsYXRlKSB7XG4gICAgdGhpcy5jb21wb25lbnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGxhY2Vob2xkZXJJZCk7XG5cblxuICAgIHRoaXMucmVmcyA9IHt9O1xuXG4gICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICBpZiAodGhpcy5jb21wb25lbnRFbGVtICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgLy8gcGxhY2Vob2xkZXIgZm9yIGZ1dHVyZSB1c2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3VubG9hZCcsICgpID0+IHtcbiAgICAgICAgICAvLyBwbGFjZWhvbGRlciBmb3IgZnV0dXJlIHVzZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMb2FkIHRlbXBsYXRlIGludG8gcGxhY2Vob2xkZXIgZWxlbWVudFxuICAgICAgICB0aGlzLmNvbXBvbmVudEVsZW0uaW5uZXJIVE1MID0gdGVtcGxhdGU7XG5cbiAgICAgICAgLy8gRmluZCBhbGwgcmVmcyBpbiBjb21wb25lbnRcbiAgICAgICAgY29uc3QgcmVmRWxlbXMgPSB0aGlzLmNvbXBvbmVudEVsZW0ucXVlcnlTZWxlY3RvckFsbCgnW3JlZl0nKTtcbiAgICAgICAgcmVmRWxlbXMuZm9yRWFjaCgoZWxlbSkgPT4geyB0aGlzLnJlZnNbZWxlbS5nZXRBdHRyaWJ1dGUoJ3JlZicpXSA9IGVsZW07IH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5ldmVudHMpIHsgdGhpcy5jcmVhdGVFdmVudHMocHJvcHMuZXZlbnRzKTsgfVxuICB9XG5cbiAgLyoqIFJlYWQgXCJldmVudFwiIGNvbXBvbmVudCBwYXJhbWV0ZXJzLCBhbmQgYXR0YWNoIGV2ZW50IGxpc3RlbmVycyBmb3IgZWFjaCAqL1xuICBjcmVhdGVFdmVudHMoZXZlbnRzKSB7XG4gICAgT2JqZWN0LmtleXMoZXZlbnRzKS5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcbiAgICAgIHRoaXMuY29tcG9uZW50RWxlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRzW2V2ZW50TmFtZV0sIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBUcmlnZ2VyIGEgY29tcG9uZW50IGV2ZW50IHdpdGggdGhlIHByb3ZpZGVkIFwiZGV0YWlsXCIgcGF5bG9hZCAqL1xuICB0cmlnZ2VyRXZlbnQoZXZlbnROYW1lLCBkZXRhaWwpIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7IGRldGFpbCB9KTtcbiAgICB0aGlzLmNvbXBvbmVudEVsZW0uZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cbn1cbiIsIi8vIGRlZmF1bHQgbWFwIHRlbXBsYXRlXG5pbXBvcnQgbmF2VGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL25hdl9iYXIuaHRtbCc7XG5pbXBvcnQgbmF2QmFyc1RlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9uYXZfYmFyX25hdi5odG1sJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cyc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuXG5pbXBvcnQgeyBuYXZDb25maWcgfSBmcm9tICcuLi9jb25maWcvbmF2Q29uZmlnJztcblxuaW1wb3J0IHtcbiAgZ29vZ2xlQW5hbHl0aWNzRXZlbnRcbn0gZnJvbSAnLi91dGlsaXR5cyc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcblxuLyoqXG4gKiBOYXZCYXIgQ29tcG9uZW50XG4gKiBSZW5kZXIgYW5kIGNvbnRyb2wgbWFwIGxheWVyIGNvbnRyb2xcbiAqL1xuZXhwb3J0IGNsYXNzIE5hdkJhciBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHBsYWNlaG9sZGVySWQsIHByb3BzKSB7XG4gICAgc3VwZXIocGxhY2Vob2xkZXJJZCwgcHJvcHMsIG5hdlRlbXBsYXRlKTtcblxuICAgIC8qKlxuICAgICAqIGdldCBuYXYgY29uZmlndXJhdGlvblxuICAgICAqL1xuICAgIHRoaXMubmF2Q29uZmlnID0gbmF2Q29uZmlnO1xuXG4gICAgdGhpcy5hY3RpdmVOYXYgPSAnJztcblxuICAgIC8vIGdldCB0aGUgbWFpbiBuYXYgZWxlbWVudFxuICAgIGNvbnN0IG5hdkhlYWRlckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbi1uYXYnKTtcblxuICAgIC8qKlxuICAgICAqICBpdGVyYXRlIGVhY2ggbmF2IGFuZCBhZGQgaXQgdG8gdGhlIHVpXG4gICAgICovXG4gICAgbGV0IGNudCA9IDE7XG4gICAgbmF2Q29uZmlnLm5hdnMuZm9yRWFjaCgobmF2KSA9PiB7XG4gICAgICBjb25zdCBuYXZJbm5lckhUTUwgPSBuYXZIZWFkZXJFbGVtZW50LmlubmVySFRNTDtcbiAgICAgIG5hdkhlYWRlckVsZW1lbnQuaW5uZXJIVE1MID0gbmF2SW5uZXJIVE1MICsgbmF2QmFyc1RlbXBsYXRlO1xuXG4gICAgICBjb25zdCBuYXZFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tbmF2LXBhZ2UnKTtcblxuICAgICAgLy8gZmlyc3QgdGFiIGlzIGFsd2F5cyBhY3RpdmVcbiAgICAgIGlmIChjbnQgPT09IDEpIHtcbiAgICAgICAgbmF2RWxlbWVudC5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgICAgfVxuXG4gICAgICBuYXZFbGVtZW50LnNldEF0dHJpYnV0ZSgncmVmJywgbmF2LnJlZik7IC8vIG5hdiByZWZcbiAgICAgIG5hdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgbmF2LmhyZWYpOyAvLyBuYXYgaHJlZlxuICAgICAgbmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgbmF2LmlkKTsgLy8gbmF2IGlkXG4gICAgICBuYXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIG5hdi50ZXh0KTsgLy8gYXJpYS1sYWJlbFxuICAgICAgbmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgbmF2LnRleHQpOyAvLyB0aXRsZVxuICAgICAgbmF2RWxlbWVudC50ZXh0Q29udGVudCA9IG5hdi50ZXh0OyAvLyBuYXYgdGV4dFxuXG4gICAgICBjbnQgKz0gMTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGFjdGl2ZU5hdiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnYWN0aXZlTmF2Jyk7XG5cbiAgICBpZiAoYWN0aXZlTmF2KSB7XG4gICAgICBOYXZCYXIuZGVhY3RpdmF0ZUFsbE5hdnMoKTtcbiAgICAgIE5hdkJhci50b2dnbGVUYWJDb250ZW50KGFjdGl2ZU5hdik7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFjdGl2ZU5hdik7XG4gICAgICBpZiAoZWwpIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhZGQgY2xpY2sgZXZlbnQgZm9yIGFjdGl2ZSB0b2dnbGVcbiAgICB0aGlzLmFkZFRhYkNsaWNrKCk7XG4gIH1cblxuICBhZGRUYWJDbGljaygpIHtcbiAgICBuYXZDb25maWcubmF2cy5mb3JFYWNoKChuYXYpID0+IHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmF2LmlkKTtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgTmF2QmFyLmRlYWN0aXZhdGVBbGxOYXZzKCk7XG5cbiAgICAgICAgLy8gdGhpcyB2ZXJ5IGhhY2t5IG5lZWQgYmV0dGVyIHdheSB0byBoYW5kbGVcbiAgICAgICAgaWYgKG5hdi5pZCA9PT0gJ21haW4tbmF2LW1hcC1zZWFyY2hodWJzJykge1xuICAgICAgICAgIE5hdkJhci50b2dnbGVUYWJDb250ZW50KCdtYWluLW5hdi1tYXAnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBOYXZCYXIudG9nZ2xlVGFiQ29udGVudChlLnRhcmdldC5pZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICAgICAgICBnb29nbGVBbmFseXRpY3NFdmVudCgnY2xpY2snLCAnbmF2YmFyJywgZS50YXJnZXQuaWQpO1xuXG4gICAgICAgIC8vIG1ha2UgdGFiIHN0eWxlIGFjdGl2ZVxuICAgICAgICBOYXZCYXIudGFiVXBkYXRlKGUudGFyZ2V0LmlkKTtcblxuICAgICAgICB0aGlzLmFjdGl2ZU5hdiA9IG5hdi5pZDtcbiAgICAgICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdhY3RpdmVOYXYnLCBuYXYuaWQpO1xuXG4gICAgICAgIGNvbnN0IG5hdkNoYW5nZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdhYm91dE5hdkNoYW5nZScpO1xuXG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5hdkNoYW5nZUV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gY2xlYXIgdGhlIHVybCBhZnRlciBhIHRhYiBuYXYgd2hlbiBub3QgZnJvbSBVSVxuICAvLyBmb3IgZXhhbXBsZSBzaGFyZSB1cmwgb3IgYnJvd3NlciByZWZyZXNoXG4gIHN0YXRpYyBVcGRhdGVSb3V0ZVVSTChpZCkge1xuICAgIGNvbnN0IGZ1bGx1cmwgPSB3aW5kb3cubG9jYXRpb247XG4gICAgY29uc3QgdXJsUGFyYW1zID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICBjb25zdCBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpO1xuICAgIGNvbnN0IHVybHdpdGhvdXRxdWVyeSA9IGZ1bGx1cmwuaHJlZi5yZXBsYWNlKHVybFBhcmFtcywgJycpO1xuXG4gICAgLy8gdGhpcyB2ZXJ5IGhhY2t5IG5lZWQgYmV0dGVyIHdheSB0byBoYW5kbGVcbiAgICBpZiAoaWQgPT09ICdtYWluLW5hdi1tYXAtc2VhcmNoaHVicycpIHtcbiAgICAgIGlmICh3aW5kb3cuaGlzdG9yeSAmJiB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgaWYgKCFoYXNoKSB7XG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCAnJywgYCR7dXJsd2l0aG91dHF1ZXJ5fVNlYXJjaEh1YnNgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWhhc2gpIHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgJycsIGAke3VybHdpdGhvdXRxdWVyeX1Ib21lYCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHRhYlVwZGF0ZShpZCkge1xuICAgIE5hdkJhci5kZWFjdGl2YXRlQWxsTmF2cygpO1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGVsLmNsYXNzTmFtZSA9IGAke2VsLmNsYXNzTmFtZX0gYWN0aXZlYDtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ2FjdGl2ZU5hdicsIGlkKTtcblxuICAgIE5hdkJhci5VcGRhdGVSb3V0ZVVSTChpZCk7XG4gIH1cblxuICBzdGF0aWMgZGVhY3RpdmF0ZUFsbE5hdnMoKSB7XG4gICAgbmF2Q29uZmlnLm5hdnMuZm9yRWFjaCgobmF2KSA9PiB7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5hdi5pZCk7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgnIGFjdGl2ZScsICcnKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgc3RhdGljIHRvZ2dsZVRhYkNvbnRlbnQoaWQpIHtcbiAgICBOYXZCYXIucmVzZXRUYWJDb250ZW50KCk7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGFiLSR7aWR9YCk7XG4gICAgaWYgKGVsKSB7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVzZXRUYWJDb250ZW50KCkge1xuICAgIG5hdkNvbmZpZy5uYXZzLmZvckVhY2goKG5hdikgPT4ge1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGFiLSR7bmF2LmlkfWApO1xuICAgICAgaWYgKGVsKSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKCcgZC1ub25lJywgJycpO1xuICAgICAgICBlbC5jbGFzc05hbWUgKz0gJyBkLW5vbmUnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gbm90IGZvdW5kIGluIGNhc2UgaXQgd2FzIHJldmVhbGVkLlxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYi1tYWluLW5hdi1ub3Rmb3VuZCcpO1xuICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKCcgZC1ub25lJywgJycpO1xuICAgIGVsLmNsYXNzTmFtZSArPSAnIGQtbm9uZSc7XG4gIH1cbn1cbiIsImltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcbi8qKlxuICogdXBkYXRlIHRoZSBkaXNwbGF5IG9mIGVsZW1lbnRcbiAqICBAcGFyYW0geyBPYmplY3QgfSBlbGVtZW50IC0gRWxlbWVudCBvYmplY3QgZnJvbSBjbGljayBldmVudCwgdXNlZCB0byB0b2dnbGVcbiAqICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgc3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUVsZW1lbnREaXNwbGF5KHRoaXNFbGUsIGVsZW1lbnRzKSB7XG4gIGVsZW1lbnRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBlbGUucmVwbGFjZSgnbWFpbl9uYXZfJywgJycpO1xuICAgIGNvbnN0IHRhYkVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtyZWY9XCJ0YWItJHtuYW1lfVwiXWApO1xuICAgIGNvbnN0IG1hcENsYXNzID0gdGFiRWxlLmNsYXNzTmFtZTtcbiAgICBjb25zdCBuZXdNYXBDbGFzcyA9IG1hcENsYXNzICsgKG1hcENsYXNzLmluZGV4T2YoJyBkLW5vbmUnKSA+IDApID8gJyAnIDogJ2Qtbm9uZSc7XG5cbiAgICB0YWJFbGUuY2xhc3NOYW1lID0gbmV3TWFwQ2xhc3M7XG4gIH0pO1xufVxuXG4vLyBlbnN1cmUgdGhlIG9iamVjdCBvciB2YXJpYWJsZSBpcyB2YWxpZC4uLlxuLy8gVE9ETzogVGhpcyBzaG91bGQgcHJvYmFibHkgYmUgbG9va2luZyBmb3IgcG9zaXRpdmVzIHJhdGhlciB0aGFuIGNoZWNraW5nIGl0XG4vLyBpc24ndCBvbmUgb2YgYSBmZXcgbmVnYXRpdmVzLiBGb3IgZXhhbXBsZSB0aGlzIHdpbGwgbGV0IGJvb2xlYW5zLCBtYWxmb3JtZWRcbi8vIGxhdC9sb25nIG9iamVjdHMsIGFycmF5cyBhbmQgZmxvYXRzIHRocm91Z2ggd2hlbiBpdCBwcm9iYWJseSBzaG91bGRuJ3QuIFRoZVxuLy8gY29kZSBkb2Vzbid0IHJlYWxseSBzYXkgd2hhdCBhIHZhbGlkIG9iamVjdCBpcyBvdGhlciB0aGFuIG5vdCB1bmRlZmluZWQsXG4vLyBudWxsLCBlbXB0eSBhcnJheXMsIGVtcHR5IG9iamVjdHMgYW5kIGVtcHR5IHN0cmluZ3MuXG4vL1xuLy8gQHBhcmFtIG9iaiAtIHR5cGVsZXNzXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tWYWxpZE9iamVjdChvYmopIHtcbiAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgJiYgb2JqLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gdG9nZ2xlIHNwaW5uZXIgdmlzaWJpbGl0eSBvblxuZXhwb3J0IGZ1bmN0aW9uIHNwaW5uZXJPbigpIHtcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLXdvcmtpbmcnKTtcbiAgY29uc3QgZWxIb2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVhZmxldC13b3JraW5nJyk7XG5cbiAgLy8gZW5zdXJlIGVsZW1lbnRzIGFuZCBjbGFzcyBuYW1lcyBleGlzdHNcbiAgaWYgKGVsID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChlbC5jbGFzc05hbWUuYmFzZVZhbCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoZWxIb2xkZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGVsSG9sZGVyLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIC8vIHVwZGF0ZSBjbGFzcyBmb3Igc3ZnIHNwaW5uZXJcbiAgY29uc3QgZWxDbGFzc05hbWUgPSBlbC5jbGFzc05hbWUuYmFzZVZhbDtcbiAgZWwuY2xhc3NOYW1lLmJhc2VWYWwgPSBlbENsYXNzTmFtZS5yZXBsYWNlKCcgZC1ub25lJywgJycpO1xuXG4gIC8vIHVwZGF0ZSBjbGFzcyBmb3IgZGl2IGVsZW1lbnQgdGhhdCBob2xkcyBzdmcuICBEbyB0aGlzIHNvIGl0IGRvc2Ugbm90IGNvdmVyXG4gIC8vIGNvdmVyIG90aGVyIG1hcCBlbGVtZW50cyBhbmQgcGFuZXNcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gIGVsSG9sZGVyLmNsYXNzTmFtZSA9IGVsSG9sZGVyLmNsYXNzTmFtZS5yZXBsYWNlKCdoLTEwMCcsICcnKTtcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJ3ctMTAwJywgJycpO1xuICBlbEhvbGRlci5jbGFzc05hbWUgKz0gJyBoLTEwMCc7XG4gIGVsSG9sZGVyLmNsYXNzTmFtZSArPSAnIHctMTAwJztcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gY2hlY2sgaWYgb25lIG9mIG91ciBhamF4IGNhbGxzIGlzIHdvcmtpbmdcbi8vIGlmIHdlIGFkZCBhbnltb3JlIHdlIHdpbGwgbmVlZCB0byBhZGQgaXQgaGVyZVxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrd29ya2luZygpIHtcbiAgY29uc3Qgd29ya2luZ0RyYXdsYXllcnMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfZHJhd2xheWVycycpO1xuICBpZiAod29ya2luZ0RyYXdsYXllcnMpIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfZHJhd2xheWVycycpO1xuXG4gIGNvbnN0IHdvcmtpbmdCYXNlbWFwID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX2Jhc2VtYXAnKTtcbiAgaWYgKHdvcmtpbmdCYXNlbWFwKSB7IHJldHVybiB0cnVlOyB9XG4gIC8vIGNvbnNvbGUubG9nKCd3b3JraW5nX2Jhc2VtYXAnKTtcblxuICBjb25zdCB3b3JraW5nTWFwaW5mbyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19tYXBpbmZvJyk7XG4gIGlmICh3b3JraW5nTWFwaW5mbykgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ19tYXBpbmZvJyk7XG5cbiAgY29uc3Qgd29ya2luZ1pvbmFsc3RhdHMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfem9uYWxzdGF0cycpO1xuICBpZiAod29ya2luZ1pvbmFsc3RhdHMpIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfem9uYWxzdGF0cycpO1xuXG4gIGNvbnN0IHdvcmtpbmdTZWFyY2ggPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfc2VhcmNoJyk7XG4gIGlmICh3b3JraW5nU2VhcmNoKSB7IHJldHVybiB0cnVlOyB9XG4gIC8vIGNvbnNvbGUubG9nKCd3b3JraW5nX3NlYXJjaCcpO1xuXG4gIGNvbnN0IHdvcmtpbmdTM1JldHJlaXZlID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3MzcmV0cmVpdmUnKTtcbiAgaWYgKHdvcmtpbmdTM1JldHJlaXZlKSB7IHJldHVybiB0cnVlOyB9XG4gIC8vIGNvbnNvbGUubG9nKCd3b3JraW5nX3MzcmV0cmVpdmUnKTtcblxuICBjb25zdCB3b3JraW5nUzNTYXZlID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3Mzc2F2ZScpO1xuICBpZiAod29ya2luZ1MzU2F2ZSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ19zM3NhdmUnKTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5cblxuLy8gdG9nZ2xlIHNwaW5uZXIgdmlzaWJpbGl0eSBvZmZcbmV4cG9ydCBmdW5jdGlvbiBzcGlubmVyT2ZmKHNvdXJjZSA9ICcnKSB7XG4gIGlmIChjaGVja3dvcmtpbmcoKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtd29ya2luZycpO1xuICBjb25zdCBlbEhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWFmbGV0LXdvcmtpbmcnKTtcblxuICAvLyBlbnN1cmUgZWxlbWVudHMgYW5kIGNsYXNzIG5hbWVzIGV4aXN0c1xuICBpZiAoZWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGVsLmNsYXNzTmFtZS5iYXNlVmFsID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChlbEhvbGRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoZWxIb2xkZXIuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgLy8gdXBkYXRlIGNsYXNzIGZvciBzdmcgc3Bpbm5lclxuICBjb25zdCBlbENsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5iYXNlVmFsO1xuICBlbC5jbGFzc05hbWUuYmFzZVZhbCA9IGVsQ2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gIGVsLmNsYXNzTmFtZS5iYXNlVmFsICs9ICcgZC1ub25lJztcblxuICAvLyB1cGRhdGUgY2xhc3MgZm9yIGRpdiBlbGVtZW50IHRoYXQgaG9sZHMgc3ZnLiAgRG8gdGhpcyBzbyBpdCBkb3NlIG5vdCBjb3ZlclxuICAvLyBjb3ZlciBvdGhlciBtYXAgZWxlbWVudHMgYW5kIHBhbmVzXG4gIGVsSG9sZGVyLmNsYXNzTmFtZSA9IGVsSG9sZGVyLmNsYXNzTmFtZS5yZXBsYWNlKCcgZC1ub25lJywgJycpO1xuICBlbEhvbGRlci5jbGFzc05hbWUgPSBlbEhvbGRlci5jbGFzc05hbWUucmVwbGFjZSgnaC0xMDAnLCAnJyk7XG4gIGVsSG9sZGVyLmNsYXNzTmFtZSA9IGVsSG9sZGVyLmNsYXNzTmFtZS5yZXBsYWNlKCd3LTEwMCcsICcnKTtcbiAgZWxIb2xkZXIuY2xhc3NOYW1lICs9ICcgZC1ub25lJztcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gVE9ETzogRWl0aGVyIGdlbmVyYWxpemUgdGhpcyBzbyBpdCBpc24ndCBhbHdheXMgYmFja2dyb3VuZCBjb2xvciBhbmQgY29sb3IgYnV0IGluc3RlYWRcbi8vIGFuIGF0dHJpYnV0ZS92YWx1ZSBwYWlyLiBPciBwcmVmZXJhYmx5IG1ha2UgdGhpcyB1c2UgY2xhc3NlcyBzbyB3ZSBjYW4gaGF2ZSB0aGUgY29sb3JzXG4vLyBiZSBpbiBjc3MuXG5leHBvcnQgZnVuY3Rpb24gYWRkU3R5bGUoZG9jLCB0eXBlLCB2YWx1ZXMpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvYy5nZXRFbGVtZW50QnlJZChgJHt0eXBlfS1zY29yZWApO1xuICBpZiAoZWxlbWVudCAhPT0gdW5kZWZpbmVkICYmIGVsZW1lbnQgIT09IG51bGwpIHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgYmFja2dyb3VuZC1jb2xvcjogJHt2YWx1ZXMuYmFja2dyb3VuZENvbG9yfTsgY29sb3I6ICR7dmFsdWVzLmNvbG9yfTtgKTtcbiAgfVxufVxuXG4vLyBOb3RlIHRoYXQgdGhlIGJhY2stdGlja3MgYXJlIGludGVudGlvbmFsLiBUaGV5IHVzZSB0aGUgbmV3IEVTNiBUZW1wbGF0ZVxuLy8gTGl0ZXJhbHMgcGF0dGVybi5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL1RlbXBsYXRlX2xpdGVyYWxzXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZU1hcEluZm9WYWx1ZShkb2MsIHR5cGUsIHZhbHVlcykge1xuICBjb25zdCBlbGVtZW50ID0gZG9jLmdldEVsZW1lbnRCeUlkKGAke3R5cGV9LXNjb3JlYCk7XG4gIGlmIChlbGVtZW50ICE9PSB1bmRlZmluZWQgJiYgZWxlbWVudCAhPT0gbnVsbCkge1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZXMubGFiZWw7XG4gIH1cbn1cblxuLy8gY2hlY2sgaWYgYSBwYXJlbnRlbGVtZXQgY29udGFpbnMgYSBkb20gaWRcbi8vIGRlYWxzIHdpdGggZXZlbnQgYnViYmxpbmcgc28gd2UgY2FuIGNoZWNrXG4vLyBpZiB0aGUgY2hpbGQgaXMgaW4gYSBzcGVjaWZjIHBhcmVudFxuZXhwb3J0IGZ1bmN0aW9uIFBhcmVudENvbnRhaW5zKHRhcmdldCwgaWQpIHtcbiAgZm9yIChsZXQgcCA9IHRhcmdldCAmJiB0YXJnZXQucGFyZW50RWxlbWVudDsgcDsgcCA9IHAucGFyZW50RWxlbWVudCkge1xuICAgIGlmIChwLmlkID09PSBpZCkgeyByZXR1cm4gdHJ1ZTsgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyKSB7XG4gIGNvbnN0IGZsYXQgPSBbXTtcbiAgYXJyLmZvckVhY2goKGQpID0+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkKSkge1xuICAgICAgZmxhdC5wdXNoKC4uLmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmbGF0LnB1c2goZCk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGZsYXQ7XG59XG5cbi8vIGFkZHMgYSBjdXN0b20gZ29vZ2xlIGV2ZW50c1xuZXhwb3J0IGZ1bmN0aW9uIGdvb2dsZUFuYWx5dGljc0V2ZW50KGFjdGlvbiA9ICcnLCBjYXRlZ29yeSA9ICcnLCBsYWJlbCA9ICcnLCB2YWx1ZSA9IDApIHtcbiAgZ3RhZygnZXZlbnQnLCBhY3Rpb24sIHtcbiAgICBldmVudF9jYXRlZ29yeTogY2F0ZWdvcnksXG4gICAgZXZlbnRfbGFiZWw6IGxhYmVsLFxuICAgIHZhbHVlOiBgJHt2YWx1ZX1gXG4gIH0pO1xufVxuXG4vLyBhZGQgZ29vZ2xlIGV2ZW50IHRhZ3MgZm9yIGRvd25sb2Fkcy5cbmV4cG9ydCBmdW5jdGlvbiBhZGREb3dubG9hZEdvb2dsZUV2ZW50cygpIHtcbiAgY29uc3QgZG93bmxvYWRJZHMgPSBbXG4gICAgJ2Rvd25sb2FkLWh1YnMnLFxuICAgICdkb3dubG9hZC1leHBvc3VyZScsXG4gICAgJ2Rvd25sb2FkLWFzc2V0cycsXG4gICAgJ2Rvd25sb2FkLXRocmVhdHMnLFxuICAgICdkb3dubG9hZC1hcXVhdGljJyxcbiAgICAnZG93bmxvYWQtdGVycmVzdHJpYWwnLFxuICAgICdkb3dubG9hZC1wb3B1bGF0aW9uZGVuc2l0eScsXG4gICAgJ2Rvd25sb2FkLXNvY2lhbHZ1bG5lcmFiaWxpdHknLFxuICAgICdkb3dubG9hZC1jcml0aWNhbGZhY2lsaXRpZXMnLFxuICAgICdkb3dubG9hZC1jcml0aWNhbGluZnJhc3RydWN0dXJlJyxcbiAgICAnZG93bmxvYWQtZHJhaW5hZ2UnLFxuICAgICdkb3dubG9hZC1lcm9zaW9uJyxcbiAgICAnZG93bmxvYWQtZmxvb2Rwcm9uZWFyZWFzJyxcbiAgICAnZG93bmxvYWQtc2VhbGV2ZWxyaXNlJyxcbiAgICAnZG93bmxvYWQtc3Ryb21zdXJnZScsXG4gICAgJ2Rvd25sb2FkLWdlb3N0cmVzc29yJyxcbiAgICAnZG93bmxvYWQtc2xvcGUnXG4gIF07XG5cbiAgZG93bmxvYWRJZHMuZm9yRWFjaCgoaWQpID0+IHtcbiAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmIChlbGVtKSB7XG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICAgIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gICAgICAgIGdvb2dsZUFuYWx5dGljc0V2ZW50KCdjbGljaycsICdkb3dubG9hZHMnLCBpZCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBzZXQgc3RhdGVpdGVtcyBpZiB0aGV5IGRvIG5vdCBleGlzdFxuLy8gd2Ugd2lsbCBoYXZlIHRvIGFueSBuZXcgb25lcyBpZiBhZGRlZC5cbi8vIHRoaXMgd2lsbCBoZWxwIHdoZW4gd2UgYWRkaW5nIG5ldyBzdGF0aXRlbXMgXCJicmVha3NcIiB0aGUgd2VicGFnZVxuZXhwb3J0IGZ1bmN0aW9uIGFkZE1pc3NpbmdTdGF0ZUl0ZW1zKCkge1xuICAvLyBjaGVjayBmb3IgYmFzZSBtYXAgZGVmYXVsdCBpcyBEYXJrR3JheVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdiYXNlbWFwJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdiYXNlbWFwJywgJ0RhcmtHcmF5Jyk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgbGFzdGFjdGlvbiBkZWZhdWx0IGlzIG1vdmVlbmRcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnbGFzdGFjdGlvbicpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnbGFzdGFjdGlvbicsICdtb3ZlZW5kJyk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgbWFwQ2VudGVyIGRlZmF1bHQgaXMge2xhdDogMzIuNzc2NSwgbG5nOiAtNzkuOTMxMX0gKGNoYXJsZXN0b24gZm9yIG5vdylcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwQ2VudGVyJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdtYXBDZW50ZXInLCB7IGxhdDogMzYuMjc5NzA3MjA1MjQwMTcsIGxuZzogLTk1LjA1MzcxMDkzNzUwMDAxIH0pO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIG1hcExheWVyRGlzcGxheVN0YXR1cyBkZWZhdWx0IGlzIGxpc3RlZCBiZWxvd1xuICAvLyB0byBsb25nIHRvIGxpc3QgYWdhaW5cbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwTGF5ZXJEaXNwbGF5U3RhdHVzJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdtYXBMYXllckRpc3BsYXlTdGF0dXMnLCB7XG4gICAgICBIdWJzVE1TOiBmYWxzZSxcbiAgICAgIEV4cG9zdXJlVE1TOiBmYWxzZSxcbiAgICAgIEFzc2V0c1RNUzogZmFsc2UsXG4gICAgICBUaHJlYXRzVE1TOiBmYWxzZSxcbiAgICAgIEFxdWF0aWNUTVM6IGZhbHNlLFxuICAgICAgVGVycmVzdHJpYWxUTVM6IGZhbHNlLFxuICAgICAgUG9wRGVuc2l0eVRNUzogZmFsc2UsXG4gICAgICBTb2NWdWxuVE1TOiBmYWxzZSxcbiAgICAgIENyaXRpY2FsRmFjaWxpdGllc1RNUzogZmFsc2UsXG4gICAgICBDcml0aWNhbEluZnJhc3RydWN0dXJlVE1TOiBmYWxzZSxcbiAgICAgIERyYWluZ2VUTVM6IGZhbHNlLFxuICAgICAgRXJvc2lvblRNUzogZmFsc2UsXG4gICAgICBTTFJUTVM6IGZhbHNlLFxuICAgICAgU3Rvcm1TdXJnZVRNUzogZmFsc2UsXG4gICAgICBHZW9TdHJlc3NUTVM6IGZhbHNlLFxuICAgICAgU2xvcGVUTVM6IGZhbHNlLFxuICAgICAgRmxvb2RQcm9uZUFyZWFzVE1TOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIG1hcGxheWVybGlzdCBkZWZhdWx0IGlzIG9wZW5cbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwbGF5ZXJsaXN0JykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdtYXBsYXllcmxpc3QnLCAnb3BlbicpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHVzZXJhcmVhY291bnQgZGVmYXVsdCBpcyAwXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3VzZXJhcmVhY291bnQnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3VzZXJhcmVhY291bnQnLCAwKTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciBtYXBDZW50ZXIgZGVmYXVsdCBpcyB7bGF0OiAzMi43NzY1LCBsbmc6IC03OS45MzExfSAoY2hhcmxlc3RvbiBmb3Igbm93KVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXBab29tJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdtYXBab29tJywgNCk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgYWN0aXZlTmF2IGRlZmF1bHQgaXMgbWFpbi1uYXYtbWFwXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2FjdGl2ZU5hdicpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnYWN0aXZlTmF2JywgJ21haW4tbmF2LW1hcCcpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHNhdmVkc2hhcGVzIGRlZmF1bHQgaXMge30gTlVMTCBvYmplY3RcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnc2F2ZWRzaGFwZXMnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3NhdmVkc2hhcGVzJywge30pO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHVzZXJhcmVhIGRlZmF1bHQgaXMge30gTlVMTCBvYmplY3RcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXNlcmFyZWEnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3VzZXJhcmVhJywge30pO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHVzZXJhcmVhcyBkZWZhdWx0IGlzIHt9IE5VTEwgb2JqZWN0XG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3VzZXJhcmVhcycpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgndXNlcmFyZWFzJywge30pO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHVzZXJhcmVhX2J1ZmZlcmVkIGRlZmF1bHQgaXMge30gTlVMTCBvYmplY3RcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXNlcmFyZWFfYnVmZmVyZWQnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3VzZXJhcmVhX2J1ZmZlcmVkJywge30pO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHpvbmFsc3RhdHNqc29uIGRlZmF1bHQgaXMge30gTlVMTCBvYmplY3RcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnem9uYWxzdGF0c2pzb24nKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3pvbmFsc3RhdHNqc29uJywge30pO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHdvcmtpbmdfYmFzZW1hcCBkZWZhdWx0IGlzIGZhbHNlXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfYmFzZW1hcCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19iYXNlbWFwJywgZmFsc2UpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHdvcmtpbmdfbWFwaW5mbyBkZWZhdWx0IGlzIGZhbHNlXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfbWFwaW5mbycpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19tYXBpbmZvJywgZmFsc2UpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHdvcmtpbmdfbWFwaW5mbyBkZWZhdWx0IGlzIGZhbHNlXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfem9uYWxzdGF0cycpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ196b25hbHN0YXRzJywgZmFsc2UpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHdvcmtpbmdfczNyZXRyZWl2ZSBkZWZhdWx0IGlzIGZhbHNlXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfczNyZXRyZWl2ZScpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19zM3JldHJlaXZlJywgZmFsc2UpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHdvcmtpbmdfc2VhcmNoIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zZWFyY2gnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3dvcmtpbmdfc2VhcmNoJywgZmFsc2UpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHdvcmtpbmdfczNzYXZlIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zM3NhdmUnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3dvcmtpbmdfczNzYXZlJywgZmFsc2UpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHdvcmtpbmdfZHJhd2xheWVycyBkZWZhdWx0IGlzIGZhbHNlXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfZHJhd2xheWVycycpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19kcmF3bGF5ZXJzJywgZmFsc2UpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHpvbmFsYWN0aXZlIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnem9uYWxhY3RpdmUnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ3pvbmFsYWN0aXZlJywgWydub25lJywgJ25vbmUnXSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2IGNsYXNzPVxcXCJuYXZiYXIgbmF2YmFyLWV4cGFuZC1sZyBuYXZiYXItZGFyayBiZy1kYXJrIG1haW4tbmF2YmFyLXRvZ2dsZVxcXCI+XFxuICAgPGEgY2xhc3M9XFxcIm5hdmJhci1icmFuZFxcXCIgaHJlZj1cXFwiI1xcXCI+TkZXRiBDb2FzdGFsIFJlc2lsaWVuY2UgQXNzZXNzbWVudDwvYT5cXG4gIDxidXR0b24gY2xhc3M9XFxcIm5hdmJhci10b2dnbGVyIGJudC1tYWluLW5hdmJhci10b2dnbGVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS10b2dnbGU9XFxcImNvbGxhcHNlXFxcIiBkYXRhLXRhcmdldD1cXFwiI21haW5OYXZUb2dnbGVcXFwiIGFyaWEtY29udHJvbHM9XFxcIm1haW5OYXZUb2dnbGVcXFwiIGFyaWEtZXhwYW5kZWQ9XFxcImZhbHNlXFxcIiBhcmlhLWxhYmVsPVxcXCJUb2dnbGUgbmF2aWdhdGlvblxcXCI+XFxuICAgIDxzcGFuIGNsYXNzPVxcXCJuYXZiYXItdG9nZ2xlci1pY29uXFxcIj48L3NwYW4+XFxuICA8L2J1dHRvbj5cXG4gIDxkaXYgY2xhc3M9XFxcImNvbGxhcHNlIG5hdmJhci1jb2xsYXBzZVxcXCIgaWQ9XFxcIm1haW5OYXZUb2dnbGVcXFwiPlxcbiAgICA8bmF2IGNsYXNzPVxcXCJuYXZiYXItbmF2IG1yLWF1dG8gbXQtMiBtdC1sZy0wXFxcIlxcXCIgIGlkPVxcXCJtYWluLW5hdlxcXCIgPlxcbiAgICA8L25hdj5cXG4gIDwvZGl2PlxcbjwvbmF2PlxcblwiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8YSByZWY9XFxcIm1haW4tbmF2LXBhZ2VcXFwiIGlkPVxcXCJtYWluLW5hdi1wYWdlXFxcIiBjbGFzcz1cXFwibmF2LWxpbmsgbWFpbi1uYXZcXFwiIGhyZWY9XFxcIlxcXCI+PC9hPlxcblwiOyJdLCJzb3VyY2VSb290IjoiIn0=