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
exports.uuid = uuid;
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

function uuid() {
  return crypto.getRandomValues(new Uint32Array(4)).join('-');
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
    value: '' + value,
    uuid: store.getStateItem('uuid')
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

  if (!checkValidObject(store.getStateItem('uuid'))) {
    store.setStoreItem('uuid', uuid());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL25hdkNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL25hdkJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlsaXR5cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXJfbmF2Lmh0bWwiXSwibmFtZXMiOlsibmF2Q29uZmlnIiwibmF2cyIsIm5hbWUiLCJyZWYiLCJ0ZXh0IiwiaWQiLCJocmVmIiwiQ29tcG9uZW50IiwicGxhY2Vob2xkZXJJZCIsInByb3BzIiwidGVtcGxhdGUiLCJjb21wb25lbnRFbGVtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlZnMiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5uZXJIVE1MIiwicmVmRWxlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW0iLCJnZXRBdHRyaWJ1dGUiLCJldmVudHMiLCJjcmVhdGVFdmVudHMiLCJPYmplY3QiLCJrZXlzIiwiZXZlbnROYW1lIiwiZGV0YWlsIiwiZXZlbnQiLCJ3aW5kb3ciLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJzdG9yZSIsIlN0b3JlIiwiTmF2QmFyIiwibmF2VGVtcGxhdGUiLCJhY3RpdmVOYXYiLCJuYXZIZWFkZXJFbGVtZW50IiwiY250IiwibmF2IiwibmF2SW5uZXJIVE1MIiwibmF2QmFyc1RlbXBsYXRlIiwibmF2RWxlbWVudCIsImNsYXNzTmFtZSIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiZ2V0U3RhdGVJdGVtIiwiZGVhY3RpdmF0ZUFsbE5hdnMiLCJ0b2dnbGVUYWJDb250ZW50IiwiZWwiLCJhZGRUYWJDbGljayIsImUiLCJ0YXJnZXQiLCJ0YWJVcGRhdGUiLCJzZXRTdG9yZUl0ZW0iLCJuYXZDaGFuZ2VFdmVudCIsImZ1bGx1cmwiLCJsb2NhdGlvbiIsInVybFBhcmFtcyIsInNlYXJjaCIsImhhc2giLCJzdWJzdHIiLCJ1cmx3aXRob3V0cXVlcnkiLCJyZXBsYWNlIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsIlVwZGF0ZVJvdXRlVVJMIiwicmVzZXRUYWJDb250ZW50IiwidG9nZ2xlRWxlbWVudERpc3BsYXkiLCJjaGVja1ZhbGlkT2JqZWN0Iiwic3Bpbm5lck9uIiwiY2hlY2t3b3JraW5nIiwic3Bpbm5lck9mZiIsImFkZFN0eWxlIiwicmVwbGFjZU1hcEluZm9WYWx1ZSIsIlBhcmVudENvbnRhaW5zIiwiZmxhdHRlbiIsInV1aWQiLCJnb29nbGVBbmFseXRpY3NFdmVudCIsImFkZERvd25sb2FkR29vZ2xlRXZlbnRzIiwiYWRkTWlzc2luZ1N0YXRlSXRlbXMiLCJ0aGlzRWxlIiwiZWxlbWVudHMiLCJlbGUiLCJ0YWJFbGUiLCJxdWVyeVNlbGVjdG9yIiwibWFwQ2xhc3MiLCJuZXdNYXBDbGFzcyIsImluZGV4T2YiLCJvYmoiLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJlbEhvbGRlciIsImJhc2VWYWwiLCJlbENsYXNzTmFtZSIsIndvcmtpbmdEcmF3bGF5ZXJzIiwid29ya2luZ0Jhc2VtYXAiLCJ3b3JraW5nTWFwaW5mbyIsIndvcmtpbmdab25hbHN0YXRzIiwid29ya2luZ1NlYXJjaCIsIndvcmtpbmdTM1JldHJlaXZlIiwid29ya2luZ1MzU2F2ZSIsInNvdXJjZSIsImRvYyIsInR5cGUiLCJ2YWx1ZXMiLCJlbGVtZW50IiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJsYWJlbCIsInAiLCJwYXJlbnRFbGVtZW50IiwiYXJyIiwiZmxhdCIsImQiLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwiY3J5cHRvIiwiZ2V0UmFuZG9tVmFsdWVzIiwiVWludDMyQXJyYXkiLCJqb2luIiwiYWN0aW9uIiwiY2F0ZWdvcnkiLCJ2YWx1ZSIsImd0YWciLCJldmVudF9jYXRlZ29yeSIsImV2ZW50X2xhYmVsIiwiZG93bmxvYWRJZHMiLCJldiIsImxhdCIsImxuZyIsIkh1YnNUTVMiLCJFeHBvc3VyZVRNUyIsIkFzc2V0c1RNUyIsIlRocmVhdHNUTVMiLCJBcXVhdGljVE1TIiwiVGVycmVzdHJpYWxUTVMiLCJQb3BEZW5zaXR5VE1TIiwiU29jVnVsblRNUyIsIkNyaXRpY2FsRmFjaWxpdGllc1RNUyIsIkNyaXRpY2FsSW5mcmFzdHJ1Y3R1cmVUTVMiLCJEcmFpbmdlVE1TIiwiRXJvc2lvblRNUyIsIlNMUlRNUyIsIlN0b3JtU3VyZ2VUTVMiLCJHZW9TdHJlc3NUTVMiLCJTbG9wZVRNUyIsIkZsb29kUHJvbmVBcmVhc1RNUyIsInNjcmVlbiIsImF2YWlsV2lkdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFPLElBQUlBLGdDQUFZO0FBQ3JCQyxRQUFLLENBQUM7QUFDSkMsVUFBTSxNQURGO0FBRUpDLFNBQUssY0FGRDtBQUdKQyxVQUFNLHdCQUhGO0FBSUpDLFFBQUksY0FKQTtBQUtKQyxVQUFNO0FBTEYsR0FBRCxFQU9MO0FBQ0VKLFVBQU0sWUFEUjtBQUVFQyxTQUFLLHlCQUZQO0FBR0VDLFVBQU0seUNBSFI7QUFJRUMsUUFBSSx5QkFKTjtBQUtFQyxVQUFNO0FBTFIsR0FQSyxFQWNMO0FBQ0VKLFVBQU0sVUFEUjtBQUVFQyxTQUFLLHVCQUZQO0FBR0VDLFVBQU0sY0FIUjtBQUlFQyxRQUFJLHVCQUpOO0FBS0VDLFVBQU07QUFMUixHQWRLLEVBcUJMO0FBQ0VKLFVBQU0sVUFEUjtBQUVFQyxTQUFLLG1CQUZQO0FBR0VDLFVBQU0sZUFIUjtBQUlFQyxRQUFJLG1CQUpOO0FBS0VDLFVBQU07QUFMUixHQXJCSyxFQTRCTDtBQUNFSixVQUFNLE9BRFI7QUFFRUMsU0FBSyxnQkFGUDtBQUdFQyxVQUFNLE9BSFI7QUFJRUMsUUFBSSxnQkFKTjtBQUtFQyxVQUFNO0FBTFIsR0E1Qks7QUFEZ0IsQ0FBaEIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FQOzs7SUFHYUMs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bkIsRUFBc0MsS0FBdEM7QUFDRDs7QUFFRDtBQUNBLE1BQUksQ0FBQ2UsaUJBQWlCckMsTUFBTWMsWUFBTixDQUFtQixvQkFBbkIsQ0FBakIsQ0FBTCxFQUFpRTtBQUMvRGQsVUFBTXNCLFlBQU4sQ0FBbUIsb0JBQW5CLEVBQXlDLEtBQXpDO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFJLENBQUNlLGlCQUFpQnJDLE1BQU1jLFlBQU4sQ0FBbUIsb0JBQW5CLENBQWpCLENBQUwsRUFBaUU7QUFDL0RkLFVBQU1zQixZQUFOLENBQW1CLG9CQUFuQixFQUF5QyxLQUF6QztBQUNEOztBQUVEO0FBQ0EsTUFBSSxDQUFDZSxpQkFBaUJyQyxNQUFNYyxZQUFOLENBQW1CLGdCQUFuQixDQUFqQixDQUFMLEVBQTZEO0FBQzNEZCxVQUFNc0IsWUFBTixDQUFtQixnQkFBbkIsRUFBcUMsS0FBckM7QUFDRDs7QUFFRDtBQUNBLE1BQUksQ0FBQ2UsaUJBQWlCckMsTUFBTWMsWUFBTixDQUFtQixnQkFBbkIsQ0FBakIsQ0FBTCxFQUE2RDtBQUMzRGQsVUFBTXNCLFlBQU4sQ0FBbUIsZ0JBQW5CLEVBQXFDLEtBQXJDO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFJLENBQUNlLGlCQUFpQnJDLE1BQU1jLFlBQU4sQ0FBbUIsb0JBQW5CLENBQWpCLENBQUwsRUFBaUU7QUFDL0RkLFVBQU1zQixZQUFOLENBQW1CLG9CQUFuQixFQUF5QyxLQUF6QztBQUNEOztBQUVEO0FBQ0EsTUFBSSxDQUFDZSxpQkFBaUJyQyxNQUFNYyxZQUFOLENBQW1CLGFBQW5CLENBQWpCLENBQUwsRUFBMEQ7QUFDeERkLFVBQU1zQixZQUFOLENBQW1CLGFBQW5CLEVBQWtDLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FBbEM7QUFDRDtBQUNGLEM7Ozs7Ozs7Ozs7O0FDOVZELHVuQjs7Ozs7Ozs7Ozs7QUNBQSw4RyIsImZpbGUiOiJkb3dubG9hZH5pbmRleC5hcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHZhciBuYXZDb25maWcgPSB7XG4gIG5hdnM6W3tcbiAgICBuYW1lOiBcImhvbWVcIixcbiAgICByZWY6IFwibWFpbi1uYXYtbWFwXCIsXG4gICAgdGV4dDogXCJFeGxwb3JlIHRoZSBBc3Nlc3NtZW50XCIsXG4gICAgaWQ6IFwibWFpbi1uYXYtbWFwXCIsXG4gICAgaHJlZjogXCIuLyNIb21lXCJcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwic2VhcmNoSHVic1wiLFxuICAgIHJlZjogXCJtYWluLW5hdi1tYXAtc2VhcmNoaHVic1wiLFxuICAgIHRleHQ6IFwiV2hlcmUgc2hvdWxkIEkgZG8gYSByZXNpbGllbmNlIHByb2plY3Q/XCIsXG4gICAgaWQ6IFwibWFpbi1uYXYtbWFwLXNlYXJjaGh1YnNcIixcbiAgICBocmVmOiBcIi4vI1NlYXJjaEh1YnNcIlxuICB9LFxuICB7XG4gICAgbmFtZTogXCJleGFtcGxlc1wiLFxuICAgIHJlZjogXCJtYWluLW5hdi1tYXAtZXhhbXBsZXNcIixcbiAgICB0ZXh0OiBcIkNhc2UgU3R1ZGllc1wiLFxuICAgIGlkOiBcIm1haW4tbmF2LW1hcC1leGFtcGxlc1wiLFxuICAgIGhyZWY6IFwiLi8jRXhhbXBsZXNcIlxuICB9LFxuICB7XG4gICAgbmFtZTogXCJkb3dubG9hZFwiLFxuICAgIHJlZjogXCJtYWluLW5hdi1kb3dubG9hZFwiLFxuICAgIHRleHQ6IFwiRG93bmxvYWQgRGF0YVwiLFxuICAgIGlkOiBcIm1haW4tbmF2LWRvd25sb2FkXCIsXG4gICAgaHJlZjogXCIuLyNEb3dubG9hZFwiXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImFib3V0XCIsXG4gICAgcmVmOiBcIm1haW4tbmF2LWFib3V0XCIsXG4gICAgdGV4dDogXCJBYm91dFwiLFxuICAgIGlkOiBcIm1haW4tbmF2LWFib3V0XCIsXG4gICAgaHJlZjogXCIuLyNBYm91dFwiXG4gIH1dXG59XG4iLCIvKipcbiAqIEJhc2UgY29tcG9uZW50IGNsYXNzIHRvIHByb3ZpZGUgdmlldyByZWYgYmluZGluZywgdGVtcGxhdGUgaW5zZXJ0aW9uLCBhbmQgZXZlbnQgbGlzdGVuZXIgc2V0dXBcbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBDb21wb25lbnQgQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gcGxhY2Vob2xkZXJJZCAtIEVsZW1lbnQgSUQgdG8gaW5mbGF0ZSB0aGUgY29tcG9uZW50IGludG9cbiAgICogQHBhcmFtIHsgT2JqZWN0IH0gcHJvcHMgLSBDb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0geyBPYmplY3QgfSBwcm9wcy5ldmVudHMgLSBDb21wb25lbnQgZXZlbnQgbGlzdGVuZXJzXG4gICAqIEBwYXJhbSB7IE9iamVjdCB9IHByb3BzLmRhdGEgLSBDb21wb25lbnQgZGF0YSBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHRlbXBsYXRlIC0gSFRNTCB0ZW1wbGF0ZSB0byBpbmZsYXRlIGludG8gcGxhY2Vob2xkZXIgaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBsYWNlaG9sZGVySWQsIHByb3BzID0ge30sIHRlbXBsYXRlKSB7XG4gICAgdGhpcy5jb21wb25lbnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGxhY2Vob2xkZXJJZCk7XG5cblxuICAgIHRoaXMucmVmcyA9IHt9O1xuXG4gICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICBpZiAodGhpcy5jb21wb25lbnRFbGVtICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgLy8gcGxhY2Vob2xkZXIgZm9yIGZ1dHVyZSB1c2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3VubG9hZCcsICgpID0+IHtcbiAgICAgICAgICAvLyBwbGFjZWhvbGRlciBmb3IgZnV0dXJlIHVzZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMb2FkIHRlbXBsYXRlIGludG8gcGxhY2Vob2xkZXIgZWxlbWVudFxuICAgICAgICB0aGlzLmNvbXBvbmVudEVsZW0uaW5uZXJIVE1MID0gdGVtcGxhdGU7XG5cbiAgICAgICAgLy8gRmluZCBhbGwgcmVmcyBpbiBjb21wb25lbnRcbiAgICAgICAgY29uc3QgcmVmRWxlbXMgPSB0aGlzLmNvbXBvbmVudEVsZW0ucXVlcnlTZWxlY3RvckFsbCgnW3JlZl0nKTtcbiAgICAgICAgcmVmRWxlbXMuZm9yRWFjaCgoZWxlbSkgPT4geyB0aGlzLnJlZnNbZWxlbS5nZXRBdHRyaWJ1dGUoJ3JlZicpXSA9IGVsZW07IH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5ldmVudHMpIHsgdGhpcy5jcmVhdGVFdmVudHMocHJvcHMuZXZlbnRzKTsgfVxuICB9XG5cbiAgLyoqIFJlYWQgXCJldmVudFwiIGNvbXBvbmVudCBwYXJhbWV0ZXJzLCBhbmQgYXR0YWNoIGV2ZW50IGxpc3RlbmVycyBmb3IgZWFjaCAqL1xuICBjcmVhdGVFdmVudHMoZXZlbnRzKSB7XG4gICAgT2JqZWN0LmtleXMoZXZlbnRzKS5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcbiAgICAgIHRoaXMuY29tcG9uZW50RWxlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRzW2V2ZW50TmFtZV0sIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBUcmlnZ2VyIGEgY29tcG9uZW50IGV2ZW50IHdpdGggdGhlIHByb3ZpZGVkIFwiZGV0YWlsXCIgcGF5bG9hZCAqL1xuICB0cmlnZ2VyRXZlbnQoZXZlbnROYW1lLCBkZXRhaWwpIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7IGRldGFpbCB9KTtcbiAgICB0aGlzLmNvbXBvbmVudEVsZW0uZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cbn1cbiIsIi8vIGRlZmF1bHQgbWFwIHRlbXBsYXRlXG5pbXBvcnQgbmF2VGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL25hdl9iYXIuaHRtbCc7XG5pbXBvcnQgbmF2QmFyc1RlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9uYXZfYmFyX25hdi5odG1sJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cyc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuXG5pbXBvcnQgeyBuYXZDb25maWcgfSBmcm9tICcuLi9jb25maWcvbmF2Q29uZmlnJztcblxuaW1wb3J0IHtcbiAgZ29vZ2xlQW5hbHl0aWNzRXZlbnRcbn0gZnJvbSAnLi91dGlsaXR5cyc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcblxuLyoqXG4gKiBOYXZCYXIgQ29tcG9uZW50XG4gKiBSZW5kZXIgYW5kIGNvbnRyb2wgbWFwIGxheWVyIGNvbnRyb2xcbiAqL1xuZXhwb3J0IGNsYXNzIE5hdkJhciBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHBsYWNlaG9sZGVySWQsIHByb3BzKSB7XG4gICAgc3VwZXIocGxhY2Vob2xkZXJJZCwgcHJvcHMsIG5hdlRlbXBsYXRlKTtcblxuICAgIC8qKlxuICAgICAqIGdldCBuYXYgY29uZmlndXJhdGlvblxuICAgICAqL1xuICAgIHRoaXMubmF2Q29uZmlnID0gbmF2Q29uZmlnO1xuXG4gICAgdGhpcy5hY3RpdmVOYXYgPSAnJztcblxuICAgIC8vIGdldCB0aGUgbWFpbiBuYXYgZWxlbWVudFxuICAgIGNvbnN0IG5hdkhlYWRlckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbi1uYXYnKTtcblxuICAgIC8qKlxuICAgICAqICBpdGVyYXRlIGVhY2ggbmF2IGFuZCBhZGQgaXQgdG8gdGhlIHVpXG4gICAgICovXG4gICAgbGV0IGNudCA9IDE7XG4gICAgbmF2Q29uZmlnLm5hdnMuZm9yRWFjaCgobmF2KSA9PiB7XG4gICAgICBjb25zdCBuYXZJbm5lckhUTUwgPSBuYXZIZWFkZXJFbGVtZW50LmlubmVySFRNTDtcbiAgICAgIG5hdkhlYWRlckVsZW1lbnQuaW5uZXJIVE1MID0gbmF2SW5uZXJIVE1MICsgbmF2QmFyc1RlbXBsYXRlO1xuXG4gICAgICBjb25zdCBuYXZFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tbmF2LXBhZ2UnKTtcblxuICAgICAgLy8gZmlyc3QgdGFiIGlzIGFsd2F5cyBhY3RpdmVcbiAgICAgIGlmIChjbnQgPT09IDEpIHtcbiAgICAgICAgbmF2RWxlbWVudC5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgICAgfVxuXG4gICAgICBuYXZFbGVtZW50LnNldEF0dHJpYnV0ZSgncmVmJywgbmF2LnJlZik7IC8vIG5hdiByZWZcbiAgICAgIG5hdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgbmF2LmhyZWYpOyAvLyBuYXYgaHJlZlxuICAgICAgbmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgbmF2LmlkKTsgLy8gbmF2IGlkXG4gICAgICBuYXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIG5hdi50ZXh0KTsgLy8gYXJpYS1sYWJlbFxuICAgICAgbmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgbmF2LnRleHQpOyAvLyB0aXRsZVxuICAgICAgbmF2RWxlbWVudC50ZXh0Q29udGVudCA9IG5hdi50ZXh0OyAvLyBuYXYgdGV4dFxuXG4gICAgICBjbnQgKz0gMTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGFjdGl2ZU5hdiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnYWN0aXZlTmF2Jyk7XG5cbiAgICBpZiAoYWN0aXZlTmF2KSB7XG4gICAgICBOYXZCYXIuZGVhY3RpdmF0ZUFsbE5hdnMoKTtcbiAgICAgIE5hdkJhci50b2dnbGVUYWJDb250ZW50KGFjdGl2ZU5hdik7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFjdGl2ZU5hdik7XG4gICAgICBpZiAoZWwpIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhZGQgY2xpY2sgZXZlbnQgZm9yIGFjdGl2ZSB0b2dnbGVcbiAgICB0aGlzLmFkZFRhYkNsaWNrKCk7XG4gIH1cblxuICBhZGRUYWJDbGljaygpIHtcbiAgICBuYXZDb25maWcubmF2cy5mb3JFYWNoKChuYXYpID0+IHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmF2LmlkKTtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgTmF2QmFyLmRlYWN0aXZhdGVBbGxOYXZzKCk7XG5cbiAgICAgICAgLy8gdGhpcyB2ZXJ5IGhhY2t5IG5lZWQgYmV0dGVyIHdheSB0byBoYW5kbGVcbiAgICAgICAgaWYgKG5hdi5pZCA9PT0gJ21haW4tbmF2LW1hcC1zZWFyY2hodWJzJyB8fCBuYXYuaWQgPT09ICdtYWluLW5hdi1tYXAtZXhhbXBsZXMnKSB7XG4gICAgICAgICAgTmF2QmFyLnRvZ2dsZVRhYkNvbnRlbnQoJ21haW4tbmF2LW1hcCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIE5hdkJhci50b2dnbGVUYWJDb250ZW50KGUudGFyZ2V0LmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gICAgICAgIGdvb2dsZUFuYWx5dGljc0V2ZW50KCdjbGljaycsICduYXZiYXInLCBlLnRhcmdldC5pZCk7XG5cbiAgICAgICAgLy8gbWFrZSB0YWIgc3R5bGUgYWN0aXZlXG4gICAgICAgIE5hdkJhci50YWJVcGRhdGUoZS50YXJnZXQuaWQpO1xuXG4gICAgICAgIHRoaXMuYWN0aXZlTmF2ID0gbmF2LmlkO1xuICAgICAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ2FjdGl2ZU5hdicsIG5hdi5pZCk7XG5cbiAgICAgICAgY29uc3QgbmF2Q2hhbmdlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2Fib3V0TmF2Q2hhbmdlJyk7XG5cbiAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmF2Q2hhbmdlRXZlbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBjbGVhciB0aGUgdXJsIGFmdGVyIGEgdGFiIG5hdiB3aGVuIG5vdCBmcm9tIFVJXG4gIC8vIGZvciBleGFtcGxlIHNoYXJlIHVybCBvciBicm93c2VyIHJlZnJlc2hcbiAgc3RhdGljIFVwZGF0ZVJvdXRlVVJMKGlkKSB7XG4gICAgY29uc3QgZnVsbHVybCA9IHdpbmRvdy5sb2NhdGlvbjtcbiAgICBjb25zdCB1cmxQYXJhbXMgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgIGNvbnN0IGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHIoMSk7XG4gICAgY29uc3QgdXJsd2l0aG91dHF1ZXJ5ID0gZnVsbHVybC5ocmVmLnJlcGxhY2UodXJsUGFyYW1zLCAnJyk7XG5cbiAgICAvLyB0aGlzIHZlcnkgaGFja3kgbmVlZCBiZXR0ZXIgd2F5IHRvIGhhbmRsZVxuICAgIGlmIChpZCA9PT0gJ21haW4tbmF2LW1hcC1zZWFyY2hodWJzJykge1xuICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgICAgICBpZiAoIWhhc2gpIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sICcnLCBgJHt1cmx3aXRob3V0cXVlcnl9U2VhcmNoSHVic2ApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghaGFzaCkge1xuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCAnJywgYCR7dXJsd2l0aG91dHF1ZXJ5fUhvbWVgKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdGFiVXBkYXRlKGlkKSB7XG4gICAgTmF2QmFyLmRlYWN0aXZhdGVBbGxOYXZzKCk7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgZWwuY2xhc3NOYW1lID0gYCR7ZWwuY2xhc3NOYW1lfSBhY3RpdmVgO1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnYWN0aXZlTmF2JywgaWQpO1xuXG4gICAgTmF2QmFyLlVwZGF0ZVJvdXRlVVJMKGlkKTtcbiAgfVxuXG4gIHN0YXRpYyBkZWFjdGl2YXRlQWxsTmF2cygpIHtcbiAgICBuYXZDb25maWcubmF2cy5mb3JFYWNoKChuYXYpID0+IHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmF2LmlkKTtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKCcgYWN0aXZlJywgJycpO1xuICAgIH0pO1xuICB9XG5cblxuICBzdGF0aWMgdG9nZ2xlVGFiQ29udGVudChpZCkge1xuICAgIE5hdkJhci5yZXNldFRhYkNvbnRlbnQoKTtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0YWItJHtpZH1gKTtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKCcgZC1ub25lJywgJycpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZXNldFRhYkNvbnRlbnQoKSB7XG4gICAgbmF2Q29uZmlnLm5hdnMuZm9yRWFjaCgobmF2KSA9PiB7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0YWItJHtuYXYuaWR9YCk7XG4gICAgICBpZiAoZWwpIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gICAgICAgIGVsLmNsYXNzTmFtZSArPSAnIGQtbm9uZSc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBub3QgZm91bmQgaW4gY2FzZSBpdCB3YXMgcmV2ZWFsZWQuXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFiLW1haW4tbmF2LW5vdGZvdW5kJyk7XG4gICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gICAgZWwuY2xhc3NOYW1lICs9ICcgZC1ub25lJztcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuLyoqXG4gKiB1cGRhdGUgdGhlIGRpc3BsYXkgb2YgZWxlbWVudFxuICogIEBwYXJhbSB7IE9iamVjdCB9IGVsZW1lbnQgLSBFbGVtZW50IG9iamVjdCBmcm9tIGNsaWNrIGV2ZW50LCB1c2VkIHRvIHRvZ2dsZVxuICogICAgICAgICAgICAgICAgICAgZGlzcGxheSBzdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRWxlbWVudERpc3BsYXkodGhpc0VsZSwgZWxlbWVudHMpIHtcbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IGVsZS5yZXBsYWNlKCdtYWluX25hdl8nLCAnJyk7XG4gICAgY29uc3QgdGFiRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW3JlZj1cInRhYi0ke25hbWV9XCJdYCk7XG4gICAgY29uc3QgbWFwQ2xhc3MgPSB0YWJFbGUuY2xhc3NOYW1lO1xuICAgIGNvbnN0IG5ld01hcENsYXNzID0gbWFwQ2xhc3MgKyAobWFwQ2xhc3MuaW5kZXhPZignIGQtbm9uZScpID4gMCkgPyAnICcgOiAnZC1ub25lJztcblxuICAgIHRhYkVsZS5jbGFzc05hbWUgPSBuZXdNYXBDbGFzcztcbiAgfSk7XG59XG5cbi8vIGVuc3VyZSB0aGUgb2JqZWN0IG9yIHZhcmlhYmxlIGlzIHZhbGlkLi4uXG4vLyBUT0RPOiBUaGlzIHNob3VsZCBwcm9iYWJseSBiZSBsb29raW5nIGZvciBwb3NpdGl2ZXMgcmF0aGVyIHRoYW4gY2hlY2tpbmcgaXRcbi8vIGlzbid0IG9uZSBvZiBhIGZldyBuZWdhdGl2ZXMuIEZvciBleGFtcGxlIHRoaXMgd2lsbCBsZXQgYm9vbGVhbnMsIG1hbGZvcm1lZFxuLy8gbGF0L2xvbmcgb2JqZWN0cywgYXJyYXlzIGFuZCBmbG9hdHMgdGhyb3VnaCB3aGVuIGl0IHByb2JhYmx5IHNob3VsZG4ndC4gVGhlXG4vLyBjb2RlIGRvZXNuJ3QgcmVhbGx5IHNheSB3aGF0IGEgdmFsaWQgb2JqZWN0IGlzIG90aGVyIHRoYW4gbm90IHVuZGVmaW5lZCxcbi8vIG51bGwsIGVtcHR5IGFycmF5cywgZW1wdHkgb2JqZWN0cyBhbmQgZW1wdHkgc3RyaW5ncy5cbi8vXG4vLyBAcGFyYW0gb2JqIC0gdHlwZWxlc3NcbmV4cG9ydCBmdW5jdGlvbiBjaGVja1ZhbGlkT2JqZWN0KG9iaikge1xuICBpZiAob2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyAmJiBvYmoubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyB0b2dnbGUgc3Bpbm5lciB2aXNpYmlsaXR5IG9uXG5leHBvcnQgZnVuY3Rpb24gc3Bpbm5lck9uKCkge1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtd29ya2luZycpO1xuICBjb25zdCBlbEhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWFmbGV0LXdvcmtpbmcnKTtcblxuICAvLyBlbnN1cmUgZWxlbWVudHMgYW5kIGNsYXNzIG5hbWVzIGV4aXN0c1xuICBpZiAoZWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGVsLmNsYXNzTmFtZS5iYXNlVmFsID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChlbEhvbGRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoZWxIb2xkZXIuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgLy8gdXBkYXRlIGNsYXNzIGZvciBzdmcgc3Bpbm5lclxuICBjb25zdCBlbENsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5iYXNlVmFsO1xuICBlbC5jbGFzc05hbWUuYmFzZVZhbCA9IGVsQ2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG5cbiAgLy8gdXBkYXRlIGNsYXNzIGZvciBkaXYgZWxlbWVudCB0aGF0IGhvbGRzIHN2Zy4gIERvIHRoaXMgc28gaXQgZG9zZSBub3QgY292ZXJcbiAgLy8gY292ZXIgb3RoZXIgbWFwIGVsZW1lbnRzIGFuZCBwYW5lc1xuICBlbEhvbGRlci5jbGFzc05hbWUgPSBlbEhvbGRlci5jbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJ2gtMTAwJywgJycpO1xuICBlbEhvbGRlci5jbGFzc05hbWUgPSBlbEhvbGRlci5jbGFzc05hbWUucmVwbGFjZSgndy0xMDAnLCAnJyk7XG4gIGVsSG9sZGVyLmNsYXNzTmFtZSArPSAnIGgtMTAwJztcbiAgZWxIb2xkZXIuY2xhc3NOYW1lICs9ICcgdy0xMDAnO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBjaGVjayBpZiBvbmUgb2Ygb3VyIGFqYXggY2FsbHMgaXMgd29ya2luZ1xuLy8gaWYgd2UgYWRkIGFueW1vcmUgd2Ugd2lsbCBuZWVkIHRvIGFkZCBpdCBoZXJlXG5leHBvcnQgZnVuY3Rpb24gY2hlY2t3b3JraW5nKCkge1xuICBjb25zdCB3b3JraW5nRHJhd2xheWVycyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19kcmF3bGF5ZXJzJyk7XG4gIGlmICh3b3JraW5nRHJhd2xheWVycykgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ19kcmF3bGF5ZXJzJyk7XG5cbiAgY29uc3Qgd29ya2luZ0Jhc2VtYXAgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfYmFzZW1hcCcpO1xuICBpZiAod29ya2luZ0Jhc2VtYXApIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfYmFzZW1hcCcpO1xuXG4gIGNvbnN0IHdvcmtpbmdNYXBpbmZvID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX21hcGluZm8nKTtcbiAgaWYgKHdvcmtpbmdNYXBpbmZvKSB7IHJldHVybiB0cnVlOyB9XG4gIC8vIGNvbnNvbGUubG9nKCd3b3JraW5nX21hcGluZm8nKTtcblxuICBjb25zdCB3b3JraW5nWm9uYWxzdGF0cyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ196b25hbHN0YXRzJyk7XG4gIGlmICh3b3JraW5nWm9uYWxzdGF0cykgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ196b25hbHN0YXRzJyk7XG5cbiAgY29uc3Qgd29ya2luZ1NlYXJjaCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zZWFyY2gnKTtcbiAgaWYgKHdvcmtpbmdTZWFyY2gpIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfc2VhcmNoJyk7XG5cbiAgY29uc3Qgd29ya2luZ1MzUmV0cmVpdmUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfczNyZXRyZWl2ZScpO1xuICBpZiAod29ya2luZ1MzUmV0cmVpdmUpIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfczNyZXRyZWl2ZScpO1xuXG4gIGNvbnN0IHdvcmtpbmdTM1NhdmUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfczNzYXZlJyk7XG4gIGlmICh3b3JraW5nUzNTYXZlKSB7IHJldHVybiB0cnVlOyB9XG4gIC8vIGNvbnNvbGUubG9nKCd3b3JraW5nX3Mzc2F2ZScpO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuXG4vLyB0b2dnbGUgc3Bpbm5lciB2aXNpYmlsaXR5IG9mZlxuZXhwb3J0IGZ1bmN0aW9uIHNwaW5uZXJPZmYoc291cmNlID0gJycpIHtcbiAgaWYgKGNoZWNrd29ya2luZygpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC13b3JraW5nJyk7XG4gIGNvbnN0IGVsSG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlYWZsZXQtd29ya2luZycpO1xuXG4gIC8vIGVuc3VyZSBlbGVtZW50cyBhbmQgY2xhc3MgbmFtZXMgZXhpc3RzXG4gIGlmIChlbCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoZWwuY2xhc3NOYW1lLmJhc2VWYWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGVsSG9sZGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChlbEhvbGRlci5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAvLyB1cGRhdGUgY2xhc3MgZm9yIHN2ZyBzcGlubmVyXG4gIGNvbnN0IGVsQ2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLmJhc2VWYWw7XG4gIGVsLmNsYXNzTmFtZS5iYXNlVmFsID0gZWxDbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgZWwuY2xhc3NOYW1lLmJhc2VWYWwgKz0gJyBkLW5vbmUnO1xuXG4gIC8vIHVwZGF0ZSBjbGFzcyBmb3IgZGl2IGVsZW1lbnQgdGhhdCBob2xkcyBzdmcuICBEbyB0aGlzIHNvIGl0IGRvc2Ugbm90IGNvdmVyXG4gIC8vIGNvdmVyIG90aGVyIG1hcCBlbGVtZW50cyBhbmQgcGFuZXNcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gIGVsSG9sZGVyLmNsYXNzTmFtZSA9IGVsSG9sZGVyLmNsYXNzTmFtZS5yZXBsYWNlKCdoLTEwMCcsICcnKTtcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJ3ctMTAwJywgJycpO1xuICBlbEhvbGRlci5jbGFzc05hbWUgKz0gJyBkLW5vbmUnO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBUT0RPOiBFaXRoZXIgZ2VuZXJhbGl6ZSB0aGlzIHNvIGl0IGlzbid0IGFsd2F5cyBiYWNrZ3JvdW5kIGNvbG9yIGFuZCBjb2xvciBidXQgaW5zdGVhZFxuLy8gYW4gYXR0cmlidXRlL3ZhbHVlIHBhaXIuIE9yIHByZWZlcmFibHkgbWFrZSB0aGlzIHVzZSBjbGFzc2VzIHNvIHdlIGNhbiBoYXZlIHRoZSBjb2xvcnNcbi8vIGJlIGluIGNzcy5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTdHlsZShkb2MsIHR5cGUsIHZhbHVlcykge1xuICBjb25zdCBlbGVtZW50ID0gZG9jLmdldEVsZW1lbnRCeUlkKGAke3R5cGV9LXNjb3JlYCk7XG4gIGlmIChlbGVtZW50ICE9PSB1bmRlZmluZWQgJiYgZWxlbWVudCAhPT0gbnVsbCkge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBiYWNrZ3JvdW5kLWNvbG9yOiAke3ZhbHVlcy5iYWNrZ3JvdW5kQ29sb3J9OyBjb2xvcjogJHt2YWx1ZXMuY29sb3J9O2ApO1xuICB9XG59XG5cbi8vIE5vdGUgdGhhdCB0aGUgYmFjay10aWNrcyBhcmUgaW50ZW50aW9uYWwuIFRoZXkgdXNlIHRoZSBuZXcgRVM2IFRlbXBsYXRlXG4vLyBMaXRlcmFscyBwYXR0ZXJuLlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvVGVtcGxhdGVfbGl0ZXJhbHNcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTWFwSW5mb1ZhbHVlKGRvYywgdHlwZSwgdmFsdWVzKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoYCR7dHlwZX0tc2NvcmVgKTtcbiAgaWYgKGVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJiBlbGVtZW50ICE9PSBudWxsKSB7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlcy5sYWJlbDtcbiAgfVxufVxuXG4vLyBjaGVjayBpZiBhIHBhcmVudGVsZW1ldCBjb250YWlucyBhIGRvbSBpZFxuLy8gZGVhbHMgd2l0aCBldmVudCBidWJibGluZyBzbyB3ZSBjYW4gY2hlY2tcbi8vIGlmIHRoZSBjaGlsZCBpcyBpbiBhIHNwZWNpZmMgcGFyZW50XG5leHBvcnQgZnVuY3Rpb24gUGFyZW50Q29udGFpbnModGFyZ2V0LCBpZCkge1xuICBmb3IgKGxldCBwID0gdGFyZ2V0ICYmIHRhcmdldC5wYXJlbnRFbGVtZW50OyBwOyBwID0gcC5wYXJlbnRFbGVtZW50KSB7XG4gICAgaWYgKHAuaWQgPT09IGlkKSB7IHJldHVybiB0cnVlOyB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgY29uc3QgZmxhdCA9IFtdO1xuICBhcnIuZm9yRWFjaCgoZCkgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGQpKSB7XG4gICAgICBmbGF0LnB1c2goLi4uZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsYXQucHVzaChkKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZmxhdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHV1aWQoKSB7XG4gIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSg0KSkuam9pbignLScpO1xufVxuXG4vLyBhZGRzIGEgY3VzdG9tIGdvb2dsZSBldmVudHNcbmV4cG9ydCBmdW5jdGlvbiBnb29nbGVBbmFseXRpY3NFdmVudChhY3Rpb24gPSAnJywgY2F0ZWdvcnkgPSAnJywgbGFiZWwgPSAnJywgdmFsdWUgPSAwKSB7XG4gIGd0YWcoJ2V2ZW50JywgYWN0aW9uLCB7XG4gICAgZXZlbnRfY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgIGV2ZW50X2xhYmVsOiBsYWJlbCxcbiAgICB2YWx1ZTogYCR7dmFsdWV9YCxcbiAgICB1dWlkOiBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKVxuICB9KTtcbn1cblxuLy8gYWRkIGdvb2dsZSBldmVudCB0YWdzIGZvciBkb3dubG9hZHMuXG5leHBvcnQgZnVuY3Rpb24gYWRkRG93bmxvYWRHb29nbGVFdmVudHMoKSB7XG4gIGNvbnN0IGRvd25sb2FkSWRzID0gW1xuICAgICdkb3dubG9hZC1odWJzJyxcbiAgICAnZG93bmxvYWQtZXhwb3N1cmUnLFxuICAgICdkb3dubG9hZC1hc3NldHMnLFxuICAgICdkb3dubG9hZC10aHJlYXRzJyxcbiAgICAnZG93bmxvYWQtYXF1YXRpYycsXG4gICAgJ2Rvd25sb2FkLXRlcnJlc3RyaWFsJyxcbiAgICAnZG93bmxvYWQtcG9wdWxhdGlvbmRlbnNpdHknLFxuICAgICdkb3dubG9hZC1zb2NpYWx2dWxuZXJhYmlsaXR5JyxcbiAgICAnZG93bmxvYWQtY3JpdGljYWxmYWNpbGl0aWVzJyxcbiAgICAnZG93bmxvYWQtY3JpdGljYWxpbmZyYXN0cnVjdHVyZScsXG4gICAgJ2Rvd25sb2FkLWRyYWluYWdlJyxcbiAgICAnZG93bmxvYWQtZXJvc2lvbicsXG4gICAgJ2Rvd25sb2FkLWZsb29kcHJvbmVhcmVhcycsXG4gICAgJ2Rvd25sb2FkLXNlYWxldmVscmlzZScsXG4gICAgJ2Rvd25sb2FkLXN0cm9tc3VyZ2UnLFxuICAgICdkb3dubG9hZC1nZW9zdHJlc3NvcicsXG4gICAgJ2Rvd25sb2FkLXNsb3BlJ1xuICBdO1xuXG4gIGRvd25sb2FkSWRzLmZvckVhY2goKGlkKSA9PiB7XG4gICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAoZWxlbSkge1xuICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xuICAgICAgICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICAgICAgICBnb29nbGVBbmFseXRpY3NFdmVudCgnY2xpY2snLCAnZG93bmxvYWRzJywgaWQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuXG4vLyBzZXQgc3RhdGVpdGVtcyBpZiB0aGV5IGRvIG5vdCBleGlzdFxuLy8gd2Ugd2lsbCBoYXZlIHRvIGFueSBuZXcgb25lcyBpZiBhZGRlZC5cbi8vIHRoaXMgd2lsbCBoZWxwIHdoZW4gd2UgYWRkaW5nIG5ldyBzdGF0aXRlbXMgXCJicmVha3NcIiB0aGUgd2VicGFnZVxuZXhwb3J0IGZ1bmN0aW9uIGFkZE1pc3NpbmdTdGF0ZUl0ZW1zKCkge1xuICAvLyBjaGVjayBmb3IgYmFzZSBtYXAgZGVmYXVsdCBpcyBEYXJrR3JheVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdiYXNlbWFwJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdiYXNlbWFwJywgJ0RhcmtHcmF5Jyk7XG4gIH1cblxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd1dWlkJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd1dWlkJywgdXVpZCgpKTtcbiAgfVxuXG5cbiAgLy8gY2hlY2sgZm9yIGxhc3RhY3Rpb24gZGVmYXVsdCBpcyBtb3ZlZW5kXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2xhc3RhY3Rpb24nKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ2xhc3RhY3Rpb24nLCAnbW92ZWVuZCcpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIG1hcENlbnRlciBkZWZhdWx0IGlzIHtsYXQ6IDMyLjc3NjUsIGxuZzogLTc5LjkzMTF9IChjaGFybGVzdG9uIGZvciBub3cpXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcENlbnRlcicpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnbWFwQ2VudGVyJywgeyBsYXQ6IDM2LjI3OTcwNzIwNTI0MDE3LCBsbmc6IC05NS4wNTM3MTA5Mzc1MDAwMSB9KTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciBtYXBMYXllckRpc3BsYXlTdGF0dXMgZGVmYXVsdCBpcyBsaXN0ZWQgYmVsb3dcbiAgLy8gdG8gbG9uZyB0byBsaXN0IGFnYWluXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcExheWVyRGlzcGxheVN0YXR1cycpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnbWFwTGF5ZXJEaXNwbGF5U3RhdHVzJywge1xuICAgICAgSHVic1RNUzogZmFsc2UsXG4gICAgICBFeHBvc3VyZVRNUzogZmFsc2UsXG4gICAgICBBc3NldHNUTVM6IGZhbHNlLFxuICAgICAgVGhyZWF0c1RNUzogZmFsc2UsXG4gICAgICBBcXVhdGljVE1TOiBmYWxzZSxcbiAgICAgIFRlcnJlc3RyaWFsVE1TOiBmYWxzZSxcbiAgICAgIFBvcERlbnNpdHlUTVM6IGZhbHNlLFxuICAgICAgU29jVnVsblRNUzogZmFsc2UsXG4gICAgICBDcml0aWNhbEZhY2lsaXRpZXNUTVM6IGZhbHNlLFxuICAgICAgQ3JpdGljYWxJbmZyYXN0cnVjdHVyZVRNUzogZmFsc2UsXG4gICAgICBEcmFpbmdlVE1TOiBmYWxzZSxcbiAgICAgIEVyb3Npb25UTVM6IGZhbHNlLFxuICAgICAgU0xSVE1TOiBmYWxzZSxcbiAgICAgIFN0b3JtU3VyZ2VUTVM6IGZhbHNlLFxuICAgICAgR2VvU3RyZXNzVE1TOiBmYWxzZSxcbiAgICAgIFNsb3BlVE1TOiBmYWxzZSxcbiAgICAgIEZsb29kUHJvbmVBcmVhc1RNUzogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciBtYXBsYXllcmxpc3QgZGVmYXVsdCBpcyBvcGVuXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcGxheWVybGlzdCcpKSkge1xuICAgIGlmICh3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGggPCA3NjkpIHtcbiAgICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnbWFwbGF5ZXJsaXN0JywgJ2Nsb3NlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnbWFwbGF5ZXJsaXN0JywgJ29wZW4nKTtcbiAgICB9XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWFjb3VudCBkZWZhdWx0IGlzIDBcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXNlcmFyZWFjb3VudCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgndXNlcmFyZWFjb3VudCcsIDApO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIG1hcENlbnRlciBkZWZhdWx0IGlzIHtsYXQ6IDMyLjc3NjUsIGxuZzogLTc5LjkzMTF9IChjaGFybGVzdG9uIGZvciBub3cpXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcFpvb20nKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ21hcFpvb20nLCA0KTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciBhY3RpdmVOYXYgZGVmYXVsdCBpcyBtYWluLW5hdi1tYXBcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnYWN0aXZlTmF2JykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdhY3RpdmVOYXYnLCAnbWFpbi1uYXYtbWFwJyk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igc2F2ZWRzaGFwZXMgZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdzYXZlZHNoYXBlcycpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnc2F2ZWRzaGFwZXMnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWEgZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd1c2VyYXJlYScpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgndXNlcmFyZWEnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWFzIGRlZmF1bHQgaXMge30gTlVMTCBvYmplY3RcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXNlcmFyZWFzJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd1c2VyYXJlYXMnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWFfYnVmZmVyZWQgZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd1c2VyYXJlYV9idWZmZXJlZCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgndXNlcmFyZWFfYnVmZmVyZWQnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igem9uYWxzdGF0c2pzb24gZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd6b25hbHN0YXRzanNvbicpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnem9uYWxzdGF0c2pzb24nLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19iYXNlbWFwIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19iYXNlbWFwJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX2Jhc2VtYXAnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19tYXBpbmZvIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19tYXBpbmZvJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX21hcGluZm8nLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19tYXBpbmZvIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ196b25hbHN0YXRzJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX3pvbmFsc3RhdHMnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19zM3JldHJlaXZlIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zM3JldHJlaXZlJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX3MzcmV0cmVpdmUnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19zZWFyY2ggZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3NlYXJjaCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19zZWFyY2gnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19zM3NhdmUgZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3Mzc2F2ZScpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19zM3NhdmUnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19kcmF3bGF5ZXJzIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19kcmF3bGF5ZXJzJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX2RyYXdsYXllcnMnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igem9uYWxhY3RpdmUgZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd6b25hbGFjdGl2ZScpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnem9uYWxhY3RpdmUnLCBbJ25vbmUnLCAnbm9uZSddKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuYXYgY2xhc3M9XFxcIm5hdmJhciBuYXZiYXItZXhwYW5kLWxnIG5hdmJhci1kYXJrIGJnLWRhcmsgbWFpbi1uYXZiYXItdG9nZ2xlXFxcIj5cXG4gICA8YSBjbGFzcz1cXFwibmF2YmFyLWJyYW5kXFxcIiBocmVmPVxcXCIjXFxcIj5ORldGIENvYXN0YWwgUmVzaWxpZW5jZSBBc3Nlc3NtZW50PC9hPlxcbiAgPGJ1dHRvbiBjbGFzcz1cXFwibmF2YmFyLXRvZ2dsZXIgYm50LW1haW4tbmF2YmFyLXRvZ2dsZVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLXRvZ2dsZT1cXFwiY29sbGFwc2VcXFwiIGRhdGEtdGFyZ2V0PVxcXCIjbWFpbk5hdlRvZ2dsZVxcXCIgYXJpYS1jb250cm9scz1cXFwibWFpbk5hdlRvZ2dsZVxcXCIgYXJpYS1leHBhbmRlZD1cXFwiZmFsc2VcXFwiIGFyaWEtbGFiZWw9XFxcIlRvZ2dsZSBuYXZpZ2F0aW9uXFxcIj5cXG4gICAgPHNwYW4gY2xhc3M9XFxcIm5hdmJhci10b2dnbGVyLWljb25cXFwiPjwvc3Bhbj5cXG4gIDwvYnV0dG9uPlxcbiAgPGRpdiBjbGFzcz1cXFwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXFxcIiBpZD1cXFwibWFpbk5hdlRvZ2dsZVxcXCI+XFxuICAgIDxuYXYgY2xhc3M9XFxcIm5hdmJhci1uYXYgbXItYXV0byBtdC0yIG10LWxnLTBcXFwiXFxcIiAgaWQ9XFxcIm1haW4tbmF2XFxcIiA+XFxuICAgIDwvbmF2PlxcbiAgPC9kaXY+XFxuPC9uYXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxhIHJlZj1cXFwibWFpbi1uYXYtcGFnZVxcXCIgaWQ9XFxcIm1haW4tbmF2LXBhZ2VcXFwiIGNsYXNzPVxcXCJuYXYtbGluayBtYWluLW5hdlxcXCIgaHJlZj1cXFwiXFxcIj48L2E+XFxuXCI7Il0sInNvdXJjZVJvb3QiOiIifQ==