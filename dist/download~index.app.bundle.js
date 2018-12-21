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
    name: "examples",
    ref: "main-nav-map-examples",
    text: "Case Studies",
    id: "main-nav-map-examples",
    href: "./#Examples"
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
          if (nav.id === 'main-nav-map-searchhubs' || nav.id === 'main-nav-map-examples') {
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
    if (window.screen.availWidth < 769) {
      store.setStoreItem('maplayerlist', 'close');
    } else {
      store.setStoreItem('maplayerlist', 'open');
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL25hdkNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL25hdkJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlsaXR5cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXJfbmF2Lmh0bWwiXSwibmFtZXMiOlsibmF2Q29uZmlnIiwibmF2cyIsIm5hbWUiLCJyZWYiLCJ0ZXh0IiwiaWQiLCJocmVmIiwiQ29tcG9uZW50IiwicGxhY2Vob2xkZXJJZCIsInByb3BzIiwidGVtcGxhdGUiLCJjb21wb25lbnRFbGVtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlZnMiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5uZXJIVE1MIiwicmVmRWxlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW0iLCJnZXRBdHRyaWJ1dGUiLCJldmVudHMiLCJjcmVhdGVFdmVudHMiLCJPYmplY3QiLCJrZXlzIiwiZXZlbnROYW1lIiwiZGV0YWlsIiwiZXZlbnQiLCJ3aW5kb3ciLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJzdG9yZSIsIlN0b3JlIiwiTmF2QmFyIiwibmF2VGVtcGxhdGUiLCJhY3RpdmVOYXYiLCJuYXZIZWFkZXJFbGVtZW50IiwiY250IiwibmF2IiwibmF2SW5uZXJIVE1MIiwibmF2QmFyc1RlbXBsYXRlIiwibmF2RWxlbWVudCIsImNsYXNzTmFtZSIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiZ2V0U3RhdGVJdGVtIiwiZGVhY3RpdmF0ZUFsbE5hdnMiLCJ0b2dnbGVUYWJDb250ZW50IiwiZWwiLCJhZGRUYWJDbGljayIsImUiLCJ0YXJnZXQiLCJ0YWJVcGRhdGUiLCJzZXRTdG9yZUl0ZW0iLCJuYXZDaGFuZ2VFdmVudCIsImZ1bGx1cmwiLCJsb2NhdGlvbiIsInVybFBhcmFtcyIsInNlYXJjaCIsImhhc2giLCJzdWJzdHIiLCJ1cmx3aXRob3V0cXVlcnkiLCJyZXBsYWNlIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsIlVwZGF0ZVJvdXRlVVJMIiwicmVzZXRUYWJDb250ZW50IiwidG9nZ2xlRWxlbWVudERpc3BsYXkiLCJjaGVja1ZhbGlkT2JqZWN0Iiwic3Bpbm5lck9uIiwiY2hlY2t3b3JraW5nIiwic3Bpbm5lck9mZiIsImFkZFN0eWxlIiwicmVwbGFjZU1hcEluZm9WYWx1ZSIsIlBhcmVudENvbnRhaW5zIiwiZmxhdHRlbiIsImdvb2dsZUFuYWx5dGljc0V2ZW50IiwiYWRkRG93bmxvYWRHb29nbGVFdmVudHMiLCJhZGRNaXNzaW5nU3RhdGVJdGVtcyIsInRoaXNFbGUiLCJlbGVtZW50cyIsImVsZSIsInRhYkVsZSIsInF1ZXJ5U2VsZWN0b3IiLCJtYXBDbGFzcyIsIm5ld01hcENsYXNzIiwiaW5kZXhPZiIsIm9iaiIsInVuZGVmaW5lZCIsImxlbmd0aCIsImVsSG9sZGVyIiwiYmFzZVZhbCIsImVsQ2xhc3NOYW1lIiwid29ya2luZ0RyYXdsYXllcnMiLCJ3b3JraW5nQmFzZW1hcCIsIndvcmtpbmdNYXBpbmZvIiwid29ya2luZ1pvbmFsc3RhdHMiLCJ3b3JraW5nU2VhcmNoIiwid29ya2luZ1MzUmV0cmVpdmUiLCJ3b3JraW5nUzNTYXZlIiwic291cmNlIiwiZG9jIiwidHlwZSIsInZhbHVlcyIsImVsZW1lbnQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsImxhYmVsIiwicCIsInBhcmVudEVsZW1lbnQiLCJhcnIiLCJmbGF0IiwiZCIsIkFycmF5IiwiaXNBcnJheSIsInB1c2giLCJhY3Rpb24iLCJjYXRlZ29yeSIsInZhbHVlIiwiZ3RhZyIsImV2ZW50X2NhdGVnb3J5IiwiZXZlbnRfbGFiZWwiLCJkb3dubG9hZElkcyIsImV2IiwibGF0IiwibG5nIiwiSHVic1RNUyIsIkV4cG9zdXJlVE1TIiwiQXNzZXRzVE1TIiwiVGhyZWF0c1RNUyIsIkFxdWF0aWNUTVMiLCJUZXJyZXN0cmlhbFRNUyIsIlBvcERlbnNpdHlUTVMiLCJTb2NWdWxuVE1TIiwiQ3JpdGljYWxGYWNpbGl0aWVzVE1TIiwiQ3JpdGljYWxJbmZyYXN0cnVjdHVyZVRNUyIsIkRyYWluZ2VUTVMiLCJFcm9zaW9uVE1TIiwiU0xSVE1TIiwiU3Rvcm1TdXJnZVRNUyIsIkdlb1N0cmVzc1RNUyIsIlNsb3BlVE1TIiwiRmxvb2RQcm9uZUFyZWFzVE1TIiwic2NyZWVuIiwiYXZhaWxXaWR0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQU8sSUFBSUEsZ0NBQVk7QUFDckJDLFFBQUssQ0FBQztBQUNKQyxVQUFNLE1BREY7QUFFSkMsU0FBSyxjQUZEO0FBR0pDLFVBQU0sd0JBSEY7QUFJSkMsUUFBSSxjQUpBO0FBS0pDLFVBQU07QUFMRixHQUFELEVBT0w7QUFDRUosVUFBTSxZQURSO0FBRUVDLFNBQUsseUJBRlA7QUFHRUMsVUFBTSx5Q0FIUjtBQUlFQyxRQUFJLHlCQUpOO0FBS0VDLFVBQU07QUFMUixHQVBLLEVBY0w7QUFDRUosVUFBTSxVQURSO0FBRUVDLFNBQUssdUJBRlA7QUFHRUMsVUFBTSxjQUhSO0FBSUVDLFFBQUksdUJBSk47QUFLRUMsVUFBTTtBQUxSLEdBZEssRUFxQkw7QUFDRUosVUFBTSxVQURSO0FBRUVDLFNBQUssbUJBRlA7QUFHRUMsVUFBTSxlQUhSO0FBSUVDLFFBQUksbUJBSk47QUFLRUMsVUFBTTtBQUxSLEdBckJLLEVBNEJMO0FBQ0VKLFVBQU0sT0FEUjtBQUVFQyxTQUFLLGdCQUZQO0FBR0VDLFVBQU0sT0FIUjtBQUlFQyxRQUFJLGdCQUpOO0FBS0VDLFVBQU07QUFMUixHQTVCSztBQURnQixDQUFoQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQVA7OztJQUdhQyxTLFdBQUFBLFM7QUFDWDs7Ozs7Ozs7QUFRQSxxQkFBWUMsYUFBWixFQUFpRDtBQUFBOztBQUFB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QUFOLENBQW1CLGdCQUFuQixFQUFxQyxLQUFyQztBQUNEOztBQUVEO0FBQ0EsTUFBSSxDQUFDZSxpQkFBaUJyQyxNQUFNYyxZQUFOLENBQW1CLGdCQUFuQixDQUFqQixDQUFMLEVBQTZEO0FBQzNEZCxVQUFNc0IsWUFBTixDQUFtQixnQkFBbkIsRUFBcUMsS0FBckM7QUFDRDs7QUFFRDtBQUNBLE1BQUksQ0FBQ2UsaUJBQWlCckMsTUFBTWMsWUFBTixDQUFtQixvQkFBbkIsQ0FBakIsQ0FBTCxFQUFpRTtBQUMvRGQsVUFBTXNCLFlBQU4sQ0FBbUIsb0JBQW5CLEVBQXlDLEtBQXpDO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFJLENBQUNlLGlCQUFpQnJDLE1BQU1jLFlBQU4sQ0FBbUIsYUFBbkIsQ0FBakIsQ0FBTCxFQUEwRDtBQUN4RGQsVUFBTXNCLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0MsQ0FBQyxNQUFELEVBQVMsTUFBVCxDQUFsQztBQUNEO0FBQ0YsQzs7Ozs7Ozs7Ozs7QUNuVkQsdW5COzs7Ozs7Ozs7OztBQ0FBLDhHIiwiZmlsZSI6ImRvd25sb2FkfmluZGV4LmFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIG5hdkNvbmZpZyA9IHtcbiAgbmF2czpbe1xuICAgIG5hbWU6IFwiaG9tZVwiLFxuICAgIHJlZjogXCJtYWluLW5hdi1tYXBcIixcbiAgICB0ZXh0OiBcIkV4bHBvcmUgdGhlIEFzc2Vzc21lbnRcIixcbiAgICBpZDogXCJtYWluLW5hdi1tYXBcIixcbiAgICBocmVmOiBcIi4vI0hvbWVcIlxuICB9LFxuICB7XG4gICAgbmFtZTogXCJzZWFyY2hIdWJzXCIsXG4gICAgcmVmOiBcIm1haW4tbmF2LW1hcC1zZWFyY2hodWJzXCIsXG4gICAgdGV4dDogXCJXaGVyZSBzaG91bGQgSSBkbyBhIHJlc2lsaWVuY2UgcHJvamVjdD9cIixcbiAgICBpZDogXCJtYWluLW5hdi1tYXAtc2VhcmNoaHVic1wiLFxuICAgIGhyZWY6IFwiLi8jU2VhcmNoSHVic1wiXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImV4YW1wbGVzXCIsXG4gICAgcmVmOiBcIm1haW4tbmF2LW1hcC1leGFtcGxlc1wiLFxuICAgIHRleHQ6IFwiQ2FzZSBTdHVkaWVzXCIsXG4gICAgaWQ6IFwibWFpbi1uYXYtbWFwLWV4YW1wbGVzXCIsXG4gICAgaHJlZjogXCIuLyNFeGFtcGxlc1wiXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImRvd25sb2FkXCIsXG4gICAgcmVmOiBcIm1haW4tbmF2LWRvd25sb2FkXCIsXG4gICAgdGV4dDogXCJEb3dubG9hZCBEYXRhXCIsXG4gICAgaWQ6IFwibWFpbi1uYXYtZG93bmxvYWRcIixcbiAgICBocmVmOiBcIi4vI0Rvd25sb2FkXCJcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYWJvdXRcIixcbiAgICByZWY6IFwibWFpbi1uYXYtYWJvdXRcIixcbiAgICB0ZXh0OiBcIkFib3V0XCIsXG4gICAgaWQ6IFwibWFpbi1uYXYtYWJvdXRcIixcbiAgICBocmVmOiBcIi4vI0Fib3V0XCJcbiAgfV1cbn1cbiIsIi8qKlxuICogQmFzZSBjb21wb25lbnQgY2xhc3MgdG8gcHJvdmlkZSB2aWV3IHJlZiBiaW5kaW5nLCB0ZW1wbGF0ZSBpbnNlcnRpb24sIGFuZCBldmVudCBsaXN0ZW5lciBzZXR1cFxuICovXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIENvbXBvbmVudCBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBwbGFjZWhvbGRlcklkIC0gRWxlbWVudCBJRCB0byBpbmZsYXRlIHRoZSBjb21wb25lbnQgaW50b1xuICAgKiBAcGFyYW0geyBPYmplY3QgfSBwcm9wcyAtIENvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7IE9iamVjdCB9IHByb3BzLmV2ZW50cyAtIENvbXBvbmVudCBldmVudCBsaXN0ZW5lcnNcbiAgICogQHBhcmFtIHsgT2JqZWN0IH0gcHJvcHMuZGF0YSAtIENvbXBvbmVudCBkYXRhIHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gdGVtcGxhdGUgLSBIVE1MIHRlbXBsYXRlIHRvIGluZmxhdGUgaW50byBwbGFjZWhvbGRlciBpZFxuICAgKi9cbiAgY29uc3RydWN0b3IocGxhY2Vob2xkZXJJZCwgcHJvcHMgPSB7fSwgdGVtcGxhdGUpIHtcbiAgICB0aGlzLmNvbXBvbmVudEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGFjZWhvbGRlcklkKTtcblxuXG4gICAgdGhpcy5yZWZzID0ge307XG5cbiAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgIGlmICh0aGlzLmNvbXBvbmVudEVsZW0gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAvLyBwbGFjZWhvbGRlciBmb3IgZnV0dXJlIHVzZVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndW5sb2FkJywgKCkgPT4ge1xuICAgICAgICAgIC8vIHBsYWNlaG9sZGVyIGZvciBmdXR1cmUgdXNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExvYWQgdGVtcGxhdGUgaW50byBwbGFjZWhvbGRlciBlbGVtZW50XG4gICAgICAgIHRoaXMuY29tcG9uZW50RWxlbS5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcblxuICAgICAgICAvLyBGaW5kIGFsbCByZWZzIGluIGNvbXBvbmVudFxuICAgICAgICBjb25zdCByZWZFbGVtcyA9IHRoaXMuY29tcG9uZW50RWxlbS5xdWVyeVNlbGVjdG9yQWxsKCdbcmVmXScpO1xuICAgICAgICByZWZFbGVtcy5mb3JFYWNoKChlbGVtKSA9PiB7IHRoaXMucmVmc1tlbGVtLmdldEF0dHJpYnV0ZSgncmVmJyldID0gZWxlbTsgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmV2ZW50cykgeyB0aGlzLmNyZWF0ZUV2ZW50cyhwcm9wcy5ldmVudHMpOyB9XG4gIH1cblxuICAvKiogUmVhZCBcImV2ZW50XCIgY29tcG9uZW50IHBhcmFtZXRlcnMsIGFuZCBhdHRhY2ggZXZlbnQgbGlzdGVuZXJzIGZvciBlYWNoICovXG4gIGNyZWF0ZUV2ZW50cyhldmVudHMpIHtcbiAgICBPYmplY3Qua2V5cyhldmVudHMpLmZvckVhY2goKGV2ZW50TmFtZSkgPT4ge1xuICAgICAgdGhpcy5jb21wb25lbnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudHNbZXZlbnROYW1lXSwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFRyaWdnZXIgYSBjb21wb25lbnQgZXZlbnQgd2l0aCB0aGUgcHJvdmlkZWQgXCJkZXRhaWxcIiBwYXlsb2FkICovXG4gIHRyaWdnZXJFdmVudChldmVudE5hbWUsIGRldGFpbCkge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChldmVudE5hbWUsIHsgZGV0YWlsIH0pO1xuICAgIHRoaXMuY29tcG9uZW50RWxlbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxufVxuIiwiLy8gZGVmYXVsdCBtYXAgdGVtcGxhdGVcbmltcG9ydCBuYXZUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvbmF2X2Jhci5odG1sJztcbmltcG9ydCBuYXZCYXJzVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL25hdl9iYXJfbmF2Lmh0bWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5cbmltcG9ydCB7IG5hdkNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9uYXZDb25maWcnO1xuXG5pbXBvcnQge1xuICBnb29nbGVBbmFseXRpY3NFdmVudFxufSBmcm9tICcuL3V0aWxpdHlzJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuXG4vKipcbiAqIE5hdkJhciBDb21wb25lbnRcbiAqIFJlbmRlciBhbmQgY29udHJvbCBtYXAgbGF5ZXIgY29udHJvbFxuICovXG5leHBvcnQgY2xhc3MgTmF2QmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocGxhY2Vob2xkZXJJZCwgcHJvcHMpIHtcbiAgICBzdXBlcihwbGFjZWhvbGRlcklkLCBwcm9wcywgbmF2VGVtcGxhdGUpO1xuXG4gICAgLyoqXG4gICAgICogZ2V0IG5hdiBjb25maWd1cmF0aW9uXG4gICAgICovXG4gICAgdGhpcy5uYXZDb25maWcgPSBuYXZDb25maWc7XG5cbiAgICB0aGlzLmFjdGl2ZU5hdiA9ICcnO1xuXG4gICAgLy8gZ2V0IHRoZSBtYWluIG5hdiBlbGVtZW50XG4gICAgY29uc3QgbmF2SGVhZGVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluLW5hdicpO1xuXG4gICAgLyoqXG4gICAgICogIGl0ZXJhdGUgZWFjaCBuYXYgYW5kIGFkZCBpdCB0byB0aGUgdWlcbiAgICAgKi9cbiAgICBsZXQgY250ID0gMTtcbiAgICBuYXZDb25maWcubmF2cy5mb3JFYWNoKChuYXYpID0+IHtcbiAgICAgIGNvbnN0IG5hdklubmVySFRNTCA9IG5hdkhlYWRlckVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgbmF2SGVhZGVyRWxlbWVudC5pbm5lckhUTUwgPSBuYXZJbm5lckhUTUwgKyBuYXZCYXJzVGVtcGxhdGU7XG5cbiAgICAgIGNvbnN0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbi1uYXYtcGFnZScpO1xuXG4gICAgICAvLyBmaXJzdCB0YWIgaXMgYWx3YXlzIGFjdGl2ZVxuICAgICAgaWYgKGNudCA9PT0gMSkge1xuICAgICAgICBuYXZFbGVtZW50LmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICB9XG5cbiAgICAgIG5hdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdyZWYnLCBuYXYucmVmKTsgLy8gbmF2IHJlZlxuICAgICAgbmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBuYXYuaHJlZik7IC8vIG5hdiBocmVmXG4gICAgICBuYXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBuYXYuaWQpOyAvLyBuYXYgaWRcbiAgICAgIG5hdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgbmF2LnRleHQpOyAvLyBhcmlhLWxhYmVsXG4gICAgICBuYXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCBuYXYudGV4dCk7IC8vIHRpdGxlXG4gICAgICBuYXZFbGVtZW50LnRleHRDb250ZW50ID0gbmF2LnRleHQ7IC8vIG5hdiB0ZXh0XG5cbiAgICAgIGNudCArPSAxO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYWN0aXZlTmF2ID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdhY3RpdmVOYXYnKTtcblxuICAgIGlmIChhY3RpdmVOYXYpIHtcbiAgICAgIE5hdkJhci5kZWFjdGl2YXRlQWxsTmF2cygpO1xuICAgICAgTmF2QmFyLnRvZ2dsZVRhYkNvbnRlbnQoYWN0aXZlTmF2KTtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYWN0aXZlTmF2KTtcbiAgICAgIGlmIChlbCkge1xuICAgICAgICBlbC5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCBjbGljayBldmVudCBmb3IgYWN0aXZlIHRvZ2dsZVxuICAgIHRoaXMuYWRkVGFiQ2xpY2soKTtcbiAgfVxuXG4gIGFkZFRhYkNsaWNrKCkge1xuICAgIG5hdkNvbmZpZy5uYXZzLmZvckVhY2goKG5hdikgPT4ge1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYXYuaWQpO1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBOYXZCYXIuZGVhY3RpdmF0ZUFsbE5hdnMoKTtcblxuICAgICAgICAvLyB0aGlzIHZlcnkgaGFja3kgbmVlZCBiZXR0ZXIgd2F5IHRvIGhhbmRsZVxuICAgICAgICBpZiAobmF2LmlkID09PSAnbWFpbi1uYXYtbWFwLXNlYXJjaGh1YnMnIHx8IG5hdi5pZCA9PT0gJ21haW4tbmF2LW1hcC1leGFtcGxlcycpIHtcbiAgICAgICAgICBOYXZCYXIudG9nZ2xlVGFiQ29udGVudCgnbWFpbi1uYXYtbWFwJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgTmF2QmFyLnRvZ2dsZVRhYkNvbnRlbnQoZS50YXJnZXQuaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbiAgICAgICAgZ29vZ2xlQW5hbHl0aWNzRXZlbnQoJ2NsaWNrJywgJ25hdmJhcicsIGUudGFyZ2V0LmlkKTtcblxuICAgICAgICAvLyBtYWtlIHRhYiBzdHlsZSBhY3RpdmVcbiAgICAgICAgTmF2QmFyLnRhYlVwZGF0ZShlLnRhcmdldC5pZCk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmVOYXYgPSBuYXYuaWQ7XG4gICAgICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnYWN0aXZlTmF2JywgbmF2LmlkKTtcblxuICAgICAgICBjb25zdCBuYXZDaGFuZ2VFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnYWJvdXROYXZDaGFuZ2UnKTtcblxuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuYXZDaGFuZ2VFdmVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGNsZWFyIHRoZSB1cmwgYWZ0ZXIgYSB0YWIgbmF2IHdoZW4gbm90IGZyb20gVUlcbiAgLy8gZm9yIGV4YW1wbGUgc2hhcmUgdXJsIG9yIGJyb3dzZXIgcmVmcmVzaFxuICBzdGF0aWMgVXBkYXRlUm91dGVVUkwoaWQpIHtcbiAgICBjb25zdCBmdWxsdXJsID0gd2luZG93LmxvY2F0aW9uO1xuICAgIGNvbnN0IHVybFBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgY29uc3QgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcbiAgICBjb25zdCB1cmx3aXRob3V0cXVlcnkgPSBmdWxsdXJsLmhyZWYucmVwbGFjZSh1cmxQYXJhbXMsICcnKTtcblxuICAgIC8vIHRoaXMgdmVyeSBoYWNreSBuZWVkIGJldHRlciB3YXkgdG8gaGFuZGxlXG4gICAgaWYgKGlkID09PSAnbWFpbi1uYXYtbWFwLXNlYXJjaGh1YnMnKSB7XG4gICAgICBpZiAod2luZG93Lmhpc3RvcnkgJiYgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKSB7XG4gICAgICAgIGlmICghaGFzaCkge1xuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgJycsIGAke3VybHdpdGhvdXRxdWVyeX1TZWFyY2hIdWJzYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFoYXNoKSB7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sICcnLCBgJHt1cmx3aXRob3V0cXVlcnl9SG9tZWApO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB0YWJVcGRhdGUoaWQpIHtcbiAgICBOYXZCYXIuZGVhY3RpdmF0ZUFsbE5hdnMoKTtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBlbC5jbGFzc05hbWUgPSBgJHtlbC5jbGFzc05hbWV9IGFjdGl2ZWA7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdhY3RpdmVOYXYnLCBpZCk7XG5cbiAgICBOYXZCYXIuVXBkYXRlUm91dGVVUkwoaWQpO1xuICB9XG5cbiAgc3RhdGljIGRlYWN0aXZhdGVBbGxOYXZzKCkge1xuICAgIG5hdkNvbmZpZy5uYXZzLmZvckVhY2goKG5hdikgPT4ge1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYXYuaWQpO1xuICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJyBhY3RpdmUnLCAnJyk7XG4gICAgfSk7XG4gIH1cblxuXG4gIHN0YXRpYyB0b2dnbGVUYWJDb250ZW50KGlkKSB7XG4gICAgTmF2QmFyLnJlc2V0VGFiQ29udGVudCgpO1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRhYi0ke2lkfWApO1xuICAgIGlmIChlbCkge1xuICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlc2V0VGFiQ29udGVudCgpIHtcbiAgICBuYXZDb25maWcubmF2cy5mb3JFYWNoKChuYXYpID0+IHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRhYi0ke25hdi5pZH1gKTtcbiAgICAgIGlmIChlbCkge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgICAgICAgZWwuY2xhc3NOYW1lICs9ICcgZC1ub25lJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIG5vdCBmb3VuZCBpbiBjYXNlIGl0IHdhcyByZXZlYWxlZC5cbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWItbWFpbi1uYXYtbm90Zm91bmQnKTtcbiAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgICBlbC5jbGFzc05hbWUgKz0gJyBkLW5vbmUnO1xuICB9XG59XG4iLCJpbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG4vKipcbiAqIHVwZGF0ZSB0aGUgZGlzcGxheSBvZiBlbGVtZW50XG4gKiAgQHBhcmFtIHsgT2JqZWN0IH0gZWxlbWVudCAtIEVsZW1lbnQgb2JqZWN0IGZyb20gY2xpY2sgZXZlbnQsIHVzZWQgdG8gdG9nZ2xlXG4gKiAgICAgICAgICAgICAgICAgICBkaXNwbGF5IHN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVFbGVtZW50RGlzcGxheSh0aGlzRWxlLCBlbGVtZW50cykge1xuICBlbGVtZW50cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICBjb25zdCBuYW1lID0gZWxlLnJlcGxhY2UoJ21haW5fbmF2XycsICcnKTtcbiAgICBjb25zdCB0YWJFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbcmVmPVwidGFiLSR7bmFtZX1cIl1gKTtcbiAgICBjb25zdCBtYXBDbGFzcyA9IHRhYkVsZS5jbGFzc05hbWU7XG4gICAgY29uc3QgbmV3TWFwQ2xhc3MgPSBtYXBDbGFzcyArIChtYXBDbGFzcy5pbmRleE9mKCcgZC1ub25lJykgPiAwKSA/ICcgJyA6ICdkLW5vbmUnO1xuXG4gICAgdGFiRWxlLmNsYXNzTmFtZSA9IG5ld01hcENsYXNzO1xuICB9KTtcbn1cblxuLy8gZW5zdXJlIHRoZSBvYmplY3Qgb3IgdmFyaWFibGUgaXMgdmFsaWQuLi5cbi8vIFRPRE86IFRoaXMgc2hvdWxkIHByb2JhYmx5IGJlIGxvb2tpbmcgZm9yIHBvc2l0aXZlcyByYXRoZXIgdGhhbiBjaGVja2luZyBpdFxuLy8gaXNuJ3Qgb25lIG9mIGEgZmV3IG5lZ2F0aXZlcy4gRm9yIGV4YW1wbGUgdGhpcyB3aWxsIGxldCBib29sZWFucywgbWFsZm9ybWVkXG4vLyBsYXQvbG9uZyBvYmplY3RzLCBhcnJheXMgYW5kIGZsb2F0cyB0aHJvdWdoIHdoZW4gaXQgcHJvYmFibHkgc2hvdWxkbid0LiBUaGVcbi8vIGNvZGUgZG9lc24ndCByZWFsbHkgc2F5IHdoYXQgYSB2YWxpZCBvYmplY3QgaXMgb3RoZXIgdGhhbiBub3QgdW5kZWZpbmVkLFxuLy8gbnVsbCwgZW1wdHkgYXJyYXlzLCBlbXB0eSBvYmplY3RzIGFuZCBlbXB0eSBzdHJpbmdzLlxuLy9cbi8vIEBwYXJhbSBvYmogLSB0eXBlbGVzc1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrVmFsaWRPYmplY3Qob2JqKSB7XG4gIGlmIChvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnICYmIG9iai5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIHRvZ2dsZSBzcGlubmVyIHZpc2liaWxpdHkgb25cbmV4cG9ydCBmdW5jdGlvbiBzcGlubmVyT24oKSB7XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC13b3JraW5nJyk7XG4gIGNvbnN0IGVsSG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlYWZsZXQtd29ya2luZycpO1xuXG4gIC8vIGVuc3VyZSBlbGVtZW50cyBhbmQgY2xhc3MgbmFtZXMgZXhpc3RzXG4gIGlmIChlbCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoZWwuY2xhc3NOYW1lLmJhc2VWYWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGVsSG9sZGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChlbEhvbGRlci5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAvLyB1cGRhdGUgY2xhc3MgZm9yIHN2ZyBzcGlubmVyXG4gIGNvbnN0IGVsQ2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLmJhc2VWYWw7XG4gIGVsLmNsYXNzTmFtZS5iYXNlVmFsID0gZWxDbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcblxuICAvLyB1cGRhdGUgY2xhc3MgZm9yIGRpdiBlbGVtZW50IHRoYXQgaG9sZHMgc3ZnLiAgRG8gdGhpcyBzbyBpdCBkb3NlIG5vdCBjb3ZlclxuICAvLyBjb3ZlciBvdGhlciBtYXAgZWxlbWVudHMgYW5kIHBhbmVzXG4gIGVsSG9sZGVyLmNsYXNzTmFtZSA9IGVsSG9sZGVyLmNsYXNzTmFtZS5yZXBsYWNlKCcgZC1ub25lJywgJycpO1xuICBlbEhvbGRlci5jbGFzc05hbWUgPSBlbEhvbGRlci5jbGFzc05hbWUucmVwbGFjZSgnaC0xMDAnLCAnJyk7XG4gIGVsSG9sZGVyLmNsYXNzTmFtZSA9IGVsSG9sZGVyLmNsYXNzTmFtZS5yZXBsYWNlKCd3LTEwMCcsICcnKTtcbiAgZWxIb2xkZXIuY2xhc3NOYW1lICs9ICcgaC0xMDAnO1xuICBlbEhvbGRlci5jbGFzc05hbWUgKz0gJyB3LTEwMCc7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIGNoZWNrIGlmIG9uZSBvZiBvdXIgYWpheCBjYWxscyBpcyB3b3JraW5nXG4vLyBpZiB3ZSBhZGQgYW55bW9yZSB3ZSB3aWxsIG5lZWQgdG8gYWRkIGl0IGhlcmVcbmV4cG9ydCBmdW5jdGlvbiBjaGVja3dvcmtpbmcoKSB7XG4gIGNvbnN0IHdvcmtpbmdEcmF3bGF5ZXJzID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX2RyYXdsYXllcnMnKTtcbiAgaWYgKHdvcmtpbmdEcmF3bGF5ZXJzKSB7IHJldHVybiB0cnVlOyB9XG4gIC8vIGNvbnNvbGUubG9nKCd3b3JraW5nX2RyYXdsYXllcnMnKTtcblxuICBjb25zdCB3b3JraW5nQmFzZW1hcCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19iYXNlbWFwJyk7XG4gIGlmICh3b3JraW5nQmFzZW1hcCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ19iYXNlbWFwJyk7XG5cbiAgY29uc3Qgd29ya2luZ01hcGluZm8gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfbWFwaW5mbycpO1xuICBpZiAod29ya2luZ01hcGluZm8pIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfbWFwaW5mbycpO1xuXG4gIGNvbnN0IHdvcmtpbmdab25hbHN0YXRzID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3pvbmFsc3RhdHMnKTtcbiAgaWYgKHdvcmtpbmdab25hbHN0YXRzKSB7IHJldHVybiB0cnVlOyB9XG4gIC8vIGNvbnNvbGUubG9nKCd3b3JraW5nX3pvbmFsc3RhdHMnKTtcblxuICBjb25zdCB3b3JraW5nU2VhcmNoID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3NlYXJjaCcpO1xuICBpZiAod29ya2luZ1NlYXJjaCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ19zZWFyY2gnKTtcblxuICBjb25zdCB3b3JraW5nUzNSZXRyZWl2ZSA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zM3JldHJlaXZlJyk7XG4gIGlmICh3b3JraW5nUzNSZXRyZWl2ZSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ19zM3JldHJlaXZlJyk7XG5cbiAgY29uc3Qgd29ya2luZ1MzU2F2ZSA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zM3NhdmUnKTtcbiAgaWYgKHdvcmtpbmdTM1NhdmUpIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfczNzYXZlJyk7XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5cbi8vIHRvZ2dsZSBzcGlubmVyIHZpc2liaWxpdHkgb2ZmXG5leHBvcnQgZnVuY3Rpb24gc3Bpbm5lck9mZihzb3VyY2UgPSAnJykge1xuICBpZiAoY2hlY2t3b3JraW5nKCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLXdvcmtpbmcnKTtcbiAgY29uc3QgZWxIb2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVhZmxldC13b3JraW5nJyk7XG5cbiAgLy8gZW5zdXJlIGVsZW1lbnRzIGFuZCBjbGFzcyBuYW1lcyBleGlzdHNcbiAgaWYgKGVsID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChlbC5jbGFzc05hbWUuYmFzZVZhbCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoZWxIb2xkZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGVsSG9sZGVyLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIC8vIHVwZGF0ZSBjbGFzcyBmb3Igc3ZnIHNwaW5uZXJcbiAgY29uc3QgZWxDbGFzc05hbWUgPSBlbC5jbGFzc05hbWUuYmFzZVZhbDtcbiAgZWwuY2xhc3NOYW1lLmJhc2VWYWwgPSBlbENsYXNzTmFtZS5yZXBsYWNlKCcgZC1ub25lJywgJycpO1xuICBlbC5jbGFzc05hbWUuYmFzZVZhbCArPSAnIGQtbm9uZSc7XG5cbiAgLy8gdXBkYXRlIGNsYXNzIGZvciBkaXYgZWxlbWVudCB0aGF0IGhvbGRzIHN2Zy4gIERvIHRoaXMgc28gaXQgZG9zZSBub3QgY292ZXJcbiAgLy8gY292ZXIgb3RoZXIgbWFwIGVsZW1lbnRzIGFuZCBwYW5lc1xuICBlbEhvbGRlci5jbGFzc05hbWUgPSBlbEhvbGRlci5jbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJ2gtMTAwJywgJycpO1xuICBlbEhvbGRlci5jbGFzc05hbWUgPSBlbEhvbGRlci5jbGFzc05hbWUucmVwbGFjZSgndy0xMDAnLCAnJyk7XG4gIGVsSG9sZGVyLmNsYXNzTmFtZSArPSAnIGQtbm9uZSc7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIFRPRE86IEVpdGhlciBnZW5lcmFsaXplIHRoaXMgc28gaXQgaXNuJ3QgYWx3YXlzIGJhY2tncm91bmQgY29sb3IgYW5kIGNvbG9yIGJ1dCBpbnN0ZWFkXG4vLyBhbiBhdHRyaWJ1dGUvdmFsdWUgcGFpci4gT3IgcHJlZmVyYWJseSBtYWtlIHRoaXMgdXNlIGNsYXNzZXMgc28gd2UgY2FuIGhhdmUgdGhlIGNvbG9yc1xuLy8gYmUgaW4gY3NzLlxuZXhwb3J0IGZ1bmN0aW9uIGFkZFN0eWxlKGRvYywgdHlwZSwgdmFsdWVzKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoYCR7dHlwZX0tc2NvcmVgKTtcbiAgaWYgKGVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJiBlbGVtZW50ICE9PSBudWxsKSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGJhY2tncm91bmQtY29sb3I6ICR7dmFsdWVzLmJhY2tncm91bmRDb2xvcn07IGNvbG9yOiAke3ZhbHVlcy5jb2xvcn07YCk7XG4gIH1cbn1cblxuLy8gTm90ZSB0aGF0IHRoZSBiYWNrLXRpY2tzIGFyZSBpbnRlbnRpb25hbC4gVGhleSB1c2UgdGhlIG5ldyBFUzYgVGVtcGxhdGVcbi8vIExpdGVyYWxzIHBhdHRlcm4uXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9UZW1wbGF0ZV9saXRlcmFsc1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VNYXBJbmZvVmFsdWUoZG9jLCB0eXBlLCB2YWx1ZXMpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvYy5nZXRFbGVtZW50QnlJZChgJHt0eXBlfS1zY29yZWApO1xuICBpZiAoZWxlbWVudCAhPT0gdW5kZWZpbmVkICYmIGVsZW1lbnQgIT09IG51bGwpIHtcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWVzLmxhYmVsO1xuICB9XG59XG5cbi8vIGNoZWNrIGlmIGEgcGFyZW50ZWxlbWV0IGNvbnRhaW5zIGEgZG9tIGlkXG4vLyBkZWFscyB3aXRoIGV2ZW50IGJ1YmJsaW5nIHNvIHdlIGNhbiBjaGVja1xuLy8gaWYgdGhlIGNoaWxkIGlzIGluIGEgc3BlY2lmYyBwYXJlbnRcbmV4cG9ydCBmdW5jdGlvbiBQYXJlbnRDb250YWlucyh0YXJnZXQsIGlkKSB7XG4gIGZvciAobGV0IHAgPSB0YXJnZXQgJiYgdGFyZ2V0LnBhcmVudEVsZW1lbnQ7IHA7IHAgPSBwLnBhcmVudEVsZW1lbnQpIHtcbiAgICBpZiAocC5pZCA9PT0gaWQpIHsgcmV0dXJuIHRydWU7IH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGFycikge1xuICBjb25zdCBmbGF0ID0gW107XG4gIGFyci5mb3JFYWNoKChkKSA9PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZCkpIHtcbiAgICAgIGZsYXQucHVzaCguLi5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmxhdC5wdXNoKGQpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmbGF0O1xufVxuXG4vLyBhZGRzIGEgY3VzdG9tIGdvb2dsZSBldmVudHNcbmV4cG9ydCBmdW5jdGlvbiBnb29nbGVBbmFseXRpY3NFdmVudChhY3Rpb24gPSAnJywgY2F0ZWdvcnkgPSAnJywgbGFiZWwgPSAnJywgdmFsdWUgPSAwKSB7XG4gIGd0YWcoJ2V2ZW50JywgYWN0aW9uLCB7XG4gICAgZXZlbnRfY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgIGV2ZW50X2xhYmVsOiBsYWJlbCxcbiAgICB2YWx1ZTogYCR7dmFsdWV9YFxuICB9KTtcbn1cblxuLy8gYWRkIGdvb2dsZSBldmVudCB0YWdzIGZvciBkb3dubG9hZHMuXG5leHBvcnQgZnVuY3Rpb24gYWRkRG93bmxvYWRHb29nbGVFdmVudHMoKSB7XG4gIGNvbnN0IGRvd25sb2FkSWRzID0gW1xuICAgICdkb3dubG9hZC1odWJzJyxcbiAgICAnZG93bmxvYWQtZXhwb3N1cmUnLFxuICAgICdkb3dubG9hZC1hc3NldHMnLFxuICAgICdkb3dubG9hZC10aHJlYXRzJyxcbiAgICAnZG93bmxvYWQtYXF1YXRpYycsXG4gICAgJ2Rvd25sb2FkLXRlcnJlc3RyaWFsJyxcbiAgICAnZG93bmxvYWQtcG9wdWxhdGlvbmRlbnNpdHknLFxuICAgICdkb3dubG9hZC1zb2NpYWx2dWxuZXJhYmlsaXR5JyxcbiAgICAnZG93bmxvYWQtY3JpdGljYWxmYWNpbGl0aWVzJyxcbiAgICAnZG93bmxvYWQtY3JpdGljYWxpbmZyYXN0cnVjdHVyZScsXG4gICAgJ2Rvd25sb2FkLWRyYWluYWdlJyxcbiAgICAnZG93bmxvYWQtZXJvc2lvbicsXG4gICAgJ2Rvd25sb2FkLWZsb29kcHJvbmVhcmVhcycsXG4gICAgJ2Rvd25sb2FkLXNlYWxldmVscmlzZScsXG4gICAgJ2Rvd25sb2FkLXN0cm9tc3VyZ2UnLFxuICAgICdkb3dubG9hZC1nZW9zdHJlc3NvcicsXG4gICAgJ2Rvd25sb2FkLXNsb3BlJ1xuICBdO1xuXG4gIGRvd25sb2FkSWRzLmZvckVhY2goKGlkKSA9PiB7XG4gICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAoZWxlbSkge1xuICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xuICAgICAgICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICAgICAgICBnb29nbGVBbmFseXRpY3NFdmVudCgnY2xpY2snLCAnZG93bmxvYWRzJywgaWQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gc2V0IHN0YXRlaXRlbXMgaWYgdGhleSBkbyBub3QgZXhpc3Rcbi8vIHdlIHdpbGwgaGF2ZSB0byBhbnkgbmV3IG9uZXMgaWYgYWRkZWQuXG4vLyB0aGlzIHdpbGwgaGVscCB3aGVuIHdlIGFkZGluZyBuZXcgc3RhdGl0ZW1zIFwiYnJlYWtzXCIgdGhlIHdlYnBhZ2VcbmV4cG9ydCBmdW5jdGlvbiBhZGRNaXNzaW5nU3RhdGVJdGVtcygpIHtcbiAgLy8gY2hlY2sgZm9yIGJhc2UgbWFwIGRlZmF1bHQgaXMgRGFya0dyYXlcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnYmFzZW1hcCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnYmFzZW1hcCcsICdEYXJrR3JheScpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIGxhc3RhY3Rpb24gZGVmYXVsdCBpcyBtb3ZlZW5kXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2xhc3RhY3Rpb24nKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ2xhc3RhY3Rpb24nLCAnbW92ZWVuZCcpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIG1hcENlbnRlciBkZWZhdWx0IGlzIHtsYXQ6IDMyLjc3NjUsIGxuZzogLTc5LjkzMTF9IChjaGFybGVzdG9uIGZvciBub3cpXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcENlbnRlcicpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnbWFwQ2VudGVyJywgeyBsYXQ6IDM2LjI3OTcwNzIwNTI0MDE3LCBsbmc6IC05NS4wNTM3MTA5Mzc1MDAwMSB9KTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciBtYXBMYXllckRpc3BsYXlTdGF0dXMgZGVmYXVsdCBpcyBsaXN0ZWQgYmVsb3dcbiAgLy8gdG8gbG9uZyB0byBsaXN0IGFnYWluXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcExheWVyRGlzcGxheVN0YXR1cycpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnbWFwTGF5ZXJEaXNwbGF5U3RhdHVzJywge1xuICAgICAgSHVic1RNUzogZmFsc2UsXG4gICAgICBFeHBvc3VyZVRNUzogZmFsc2UsXG4gICAgICBBc3NldHNUTVM6IGZhbHNlLFxuICAgICAgVGhyZWF0c1RNUzogZmFsc2UsXG4gICAgICBBcXVhdGljVE1TOiBmYWxzZSxcbiAgICAgIFRlcnJlc3RyaWFsVE1TOiBmYWxzZSxcbiAgICAgIFBvcERlbnNpdHlUTVM6IGZhbHNlLFxuICAgICAgU29jVnVsblRNUzogZmFsc2UsXG4gICAgICBDcml0aWNhbEZhY2lsaXRpZXNUTVM6IGZhbHNlLFxuICAgICAgQ3JpdGljYWxJbmZyYXN0cnVjdHVyZVRNUzogZmFsc2UsXG4gICAgICBEcmFpbmdlVE1TOiBmYWxzZSxcbiAgICAgIEVyb3Npb25UTVM6IGZhbHNlLFxuICAgICAgU0xSVE1TOiBmYWxzZSxcbiAgICAgIFN0b3JtU3VyZ2VUTVM6IGZhbHNlLFxuICAgICAgR2VvU3RyZXNzVE1TOiBmYWxzZSxcbiAgICAgIFNsb3BlVE1TOiBmYWxzZSxcbiAgICAgIEZsb29kUHJvbmVBcmVhc1RNUzogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciBtYXBsYXllcmxpc3QgZGVmYXVsdCBpcyBvcGVuXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcGxheWVybGlzdCcpKSkge1xuICAgIGlmICh3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGggPCA3NjkpIHtcbiAgICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnbWFwbGF5ZXJsaXN0JywgJ2Nsb3NlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnbWFwbGF5ZXJsaXN0JywgJ29wZW4nKTtcbiAgICB9XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWFjb3VudCBkZWZhdWx0IGlzIDBcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXNlcmFyZWFjb3VudCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgndXNlcmFyZWFjb3VudCcsIDApO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIG1hcENlbnRlciBkZWZhdWx0IGlzIHtsYXQ6IDMyLjc3NjUsIGxuZzogLTc5LjkzMTF9IChjaGFybGVzdG9uIGZvciBub3cpXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcFpvb20nKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ21hcFpvb20nLCA0KTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciBhY3RpdmVOYXYgZGVmYXVsdCBpcyBtYWluLW5hdi1tYXBcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnYWN0aXZlTmF2JykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdhY3RpdmVOYXYnLCAnbWFpbi1uYXYtbWFwJyk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igc2F2ZWRzaGFwZXMgZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdzYXZlZHNoYXBlcycpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnc2F2ZWRzaGFwZXMnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWEgZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd1c2VyYXJlYScpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgndXNlcmFyZWEnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWFzIGRlZmF1bHQgaXMge30gTlVMTCBvYmplY3RcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXNlcmFyZWFzJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd1c2VyYXJlYXMnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWFfYnVmZmVyZWQgZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd1c2VyYXJlYV9idWZmZXJlZCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgndXNlcmFyZWFfYnVmZmVyZWQnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igem9uYWxzdGF0c2pzb24gZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd6b25hbHN0YXRzanNvbicpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnem9uYWxzdGF0c2pzb24nLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19iYXNlbWFwIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19iYXNlbWFwJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX2Jhc2VtYXAnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19tYXBpbmZvIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19tYXBpbmZvJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX21hcGluZm8nLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19tYXBpbmZvIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ196b25hbHN0YXRzJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX3pvbmFsc3RhdHMnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19zM3JldHJlaXZlIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zM3JldHJlaXZlJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX3MzcmV0cmVpdmUnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19zZWFyY2ggZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3NlYXJjaCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19zZWFyY2gnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19zM3NhdmUgZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3Mzc2F2ZScpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19zM3NhdmUnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19kcmF3bGF5ZXJzIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19kcmF3bGF5ZXJzJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX2RyYXdsYXllcnMnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igem9uYWxhY3RpdmUgZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd6b25hbGFjdGl2ZScpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnem9uYWxhY3RpdmUnLCBbJ25vbmUnLCAnbm9uZSddKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuYXYgY2xhc3M9XFxcIm5hdmJhciBuYXZiYXItZXhwYW5kLWxnIG5hdmJhci1kYXJrIGJnLWRhcmsgbWFpbi1uYXZiYXItdG9nZ2xlXFxcIj5cXG4gICA8YSBjbGFzcz1cXFwibmF2YmFyLWJyYW5kXFxcIiBocmVmPVxcXCIjXFxcIj5ORldGIENvYXN0YWwgUmVzaWxpZW5jZSBBc3Nlc3NtZW50PC9hPlxcbiAgPGJ1dHRvbiBjbGFzcz1cXFwibmF2YmFyLXRvZ2dsZXIgYm50LW1haW4tbmF2YmFyLXRvZ2dsZVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLXRvZ2dsZT1cXFwiY29sbGFwc2VcXFwiIGRhdGEtdGFyZ2V0PVxcXCIjbWFpbk5hdlRvZ2dsZVxcXCIgYXJpYS1jb250cm9scz1cXFwibWFpbk5hdlRvZ2dsZVxcXCIgYXJpYS1leHBhbmRlZD1cXFwiZmFsc2VcXFwiIGFyaWEtbGFiZWw9XFxcIlRvZ2dsZSBuYXZpZ2F0aW9uXFxcIj5cXG4gICAgPHNwYW4gY2xhc3M9XFxcIm5hdmJhci10b2dnbGVyLWljb25cXFwiPjwvc3Bhbj5cXG4gIDwvYnV0dG9uPlxcbiAgPGRpdiBjbGFzcz1cXFwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXFxcIiBpZD1cXFwibWFpbk5hdlRvZ2dsZVxcXCI+XFxuICAgIDxuYXYgY2xhc3M9XFxcIm5hdmJhci1uYXYgbXItYXV0byBtdC0yIG10LWxnLTBcXFwiXFxcIiAgaWQ9XFxcIm1haW4tbmF2XFxcIiA+XFxuICAgIDwvbmF2PlxcbiAgPC9kaXY+XFxuPC9uYXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxhIHJlZj1cXFwibWFpbi1uYXYtcGFnZVxcXCIgaWQ9XFxcIm1haW4tbmF2LXBhZ2VcXFwiIGNsYXNzPVxcXCJuYXYtbGluayBtYWluLW5hdlxcXCIgaHJlZj1cXFwiXFxcIj48L2E+XFxuXCI7Il0sInNvdXJjZVJvb3QiOiIifQ==