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
      el.className += ' active';
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

module.exports = "<nav class=\"nav flex-column flex-sm-row\" id=\"main-nav\" >\n</nav>\n";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL25hdkNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL25hdkJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlsaXR5cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXJfbmF2Lmh0bWwiXSwibmFtZXMiOlsibmF2Q29uZmlnIiwibmF2cyIsIm5hbWUiLCJyZWYiLCJ0ZXh0IiwiaWQiLCJocmVmIiwiQ29tcG9uZW50IiwicGxhY2Vob2xkZXJJZCIsInByb3BzIiwidGVtcGxhdGUiLCJjb21wb25lbnRFbGVtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlZnMiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5uZXJIVE1MIiwicmVmRWxlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW0iLCJnZXRBdHRyaWJ1dGUiLCJldmVudHMiLCJjcmVhdGVFdmVudHMiLCJPYmplY3QiLCJrZXlzIiwiZXZlbnROYW1lIiwiZGV0YWlsIiwiZXZlbnQiLCJ3aW5kb3ciLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJzdG9yZSIsIlN0b3JlIiwiTmF2QmFyIiwibmF2VGVtcGxhdGUiLCJhY3RpdmVOYXYiLCJuYXZIZWFkZXJFbGVtZW50IiwiY250IiwibmF2IiwibmF2SW5uZXJIVE1MIiwibmF2QmFyc1RlbXBsYXRlIiwibmF2RWxlbWVudCIsImNsYXNzTmFtZSIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiZ2V0U3RhdGVJdGVtIiwiZGVhY3RpdmF0ZUFsbE5hdnMiLCJ0b2dnbGVUYWJDb250ZW50IiwiZWwiLCJhZGRUYWJDbGljayIsImUiLCJ0YXJnZXQiLCJ0YWJVcGRhdGUiLCJzZXRTdG9yZUl0ZW0iLCJuYXZDaGFuZ2VFdmVudCIsInJlcGxhY2UiLCJyZXNldFRhYkNvbnRlbnQiLCJ0b2dnbGVFbGVtZW50RGlzcGxheSIsImNoZWNrVmFsaWRPYmplY3QiLCJzcGlubmVyT24iLCJjaGVja3dvcmtpbmciLCJzcGlubmVyT2ZmIiwiYWRkU3R5bGUiLCJyZXBsYWNlTWFwSW5mb1ZhbHVlIiwiUGFyZW50Q29udGFpbnMiLCJmbGF0dGVuIiwiYWRkTWlzc2luZ1N0YXRlSXRlbXMiLCJ0aGlzRWxlIiwiZWxlbWVudHMiLCJlbGUiLCJ0YWJFbGUiLCJxdWVyeVNlbGVjdG9yIiwibWFwQ2xhc3MiLCJuZXdNYXBDbGFzcyIsImluZGV4T2YiLCJvYmoiLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJlbEhvbGRlciIsImJhc2VWYWwiLCJlbENsYXNzTmFtZSIsIndvcmtpbmdEcmF3bGF5ZXJzIiwid29ya2luZ0Jhc2VtYXAiLCJ3b3JraW5nTWFwaW5mbyIsIndvcmtpbmdab25hbHN0YXRzIiwid29ya2luZ1NlYXJjaCIsIndvcmtpbmdTM1JldHJlaXZlIiwid29ya2luZ1MzU2F2ZSIsInNvdXJjZSIsImRvYyIsInR5cGUiLCJ2YWx1ZXMiLCJlbGVtZW50IiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJsYWJlbCIsInAiLCJwYXJlbnRFbGVtZW50IiwiYXJyIiwiZmxhdCIsImQiLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwibGF0IiwibG5nIiwiSHVic1RNUyIsIkV4cG9zdXJlVE1TIiwiQXNzZXRzVE1TIiwiVGhyZWF0c1RNUyIsIkFxdWF0aWNUTVMiLCJUZXJyZXN0cmlhbFRNUyIsIlBvcERlbnNpdHlUTVMiLCJTb2NWdWxuVE1TIiwiQ3JpdGljYWxGYWNpbGl0aWVzVE1TIiwiQ3JpdGljYWxJbmZyYXN0cnVjdHVyZVRNUyIsIkRyYWluZ2VUTVMiLCJFcm9zaW9uVE1TIiwiU0xSVE1TIiwiU3Rvcm1TdXJnZVRNUyIsIkdlb1N0cmVzc1RNUyIsIlNsb3BlVE1TIiwiRmxvb2RQcm9uZUFyZWFzVE1T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dkNvbmZpZyA9IHtcbiAgbmF2czpbe1xuICAgIG5hbWU6IFwiaG9tZVwiLFxuICAgIHJlZjogXCJtYWluLW5hdi1tYXBcIixcbiAgICB0ZXh0OiBcIkV4bHBvcmUgdGhlIEFzc2Vzc21lbnRcIixcbiAgICBpZDogXCJtYWluLW5hdi1tYXBcIixcbiAgICBocmVmOiBcIi4vI0hvbWVcIlxuICB9LFxuICB7XG4gICAgbmFtZTogXCJzZWFyY2hIdWJzXCIsXG4gICAgcmVmOiBcIm1haW4tbmF2LW1hcC1zZWFyY2hodWJzXCIsXG4gICAgdGV4dDogXCJXaGVyZSBzaG91bGQgSSBkbyBhIHJlc2lsaWVuY2UgcHJvamVjdD9cIixcbiAgICBpZDogXCJtYWluLW5hdi1tYXAtc2VhcmNoaHVic1wiLFxuICAgIGhyZWY6IFwiLi8jU2VhcmNoSHVic1wiXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImRvd25sb2FkXCIsXG4gICAgcmVmOiBcIm1haW4tbmF2LWRvd25sb2FkXCIsXG4gICAgdGV4dDogXCJEb3dubG9hZCBEYXRhXCIsXG4gICAgaWQ6IFwibWFpbi1uYXYtZG93bmxvYWRcIixcbiAgICBocmVmOiBcIi4vI0Rvd25sb2FkXCJcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYWJvdXRcIixcbiAgICByZWY6IFwibWFpbi1uYXYtYWJvdXRcIixcbiAgICB0ZXh0OiBcIkFib3V0XCIsXG4gICAgaWQ6IFwibWFpbi1uYXYtYWJvdXRcIixcbiAgICBocmVmOiBcIi4vI0Fib3V0XCJcbiAgfV1cbn1cbiIsIi8qKlxuICogQmFzZSBjb21wb25lbnQgY2xhc3MgdG8gcHJvdmlkZSB2aWV3IHJlZiBiaW5kaW5nLCB0ZW1wbGF0ZSBpbnNlcnRpb24sIGFuZCBldmVudCBsaXN0ZW5lciBzZXR1cFxuICovXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIENvbXBvbmVudCBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBwbGFjZWhvbGRlcklkIC0gRWxlbWVudCBJRCB0byBpbmZsYXRlIHRoZSBjb21wb25lbnQgaW50b1xuICAgKiBAcGFyYW0geyBPYmplY3QgfSBwcm9wcyAtIENvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7IE9iamVjdCB9IHByb3BzLmV2ZW50cyAtIENvbXBvbmVudCBldmVudCBsaXN0ZW5lcnNcbiAgICogQHBhcmFtIHsgT2JqZWN0IH0gcHJvcHMuZGF0YSAtIENvbXBvbmVudCBkYXRhIHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gdGVtcGxhdGUgLSBIVE1MIHRlbXBsYXRlIHRvIGluZmxhdGUgaW50byBwbGFjZWhvbGRlciBpZFxuICAgKi9cbiAgY29uc3RydWN0b3IocGxhY2Vob2xkZXJJZCwgcHJvcHMgPSB7fSwgdGVtcGxhdGUpIHtcbiAgICB0aGlzLmNvbXBvbmVudEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGFjZWhvbGRlcklkKTtcblxuXG4gICAgdGhpcy5yZWZzID0ge307XG5cbiAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgIGlmICh0aGlzLmNvbXBvbmVudEVsZW0gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAvLyBwbGFjZWhvbGRlciBmb3IgZnV0dXJlIHVzZVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndW5sb2FkJywgKCkgPT4ge1xuICAgICAgICAgIC8vIHBsYWNlaG9sZGVyIGZvciBmdXR1cmUgdXNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExvYWQgdGVtcGxhdGUgaW50byBwbGFjZWhvbGRlciBlbGVtZW50XG4gICAgICAgIHRoaXMuY29tcG9uZW50RWxlbS5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcblxuICAgICAgICAvLyBGaW5kIGFsbCByZWZzIGluIGNvbXBvbmVudFxuICAgICAgICBjb25zdCByZWZFbGVtcyA9IHRoaXMuY29tcG9uZW50RWxlbS5xdWVyeVNlbGVjdG9yQWxsKCdbcmVmXScpO1xuICAgICAgICByZWZFbGVtcy5mb3JFYWNoKChlbGVtKSA9PiB7IHRoaXMucmVmc1tlbGVtLmdldEF0dHJpYnV0ZSgncmVmJyldID0gZWxlbTsgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmV2ZW50cykgeyB0aGlzLmNyZWF0ZUV2ZW50cyhwcm9wcy5ldmVudHMpOyB9XG4gIH1cblxuICAvKiogUmVhZCBcImV2ZW50XCIgY29tcG9uZW50IHBhcmFtZXRlcnMsIGFuZCBhdHRhY2ggZXZlbnQgbGlzdGVuZXJzIGZvciBlYWNoICovXG4gIGNyZWF0ZUV2ZW50cyhldmVudHMpIHtcbiAgICBPYmplY3Qua2V5cyhldmVudHMpLmZvckVhY2goKGV2ZW50TmFtZSkgPT4ge1xuICAgICAgdGhpcy5jb21wb25lbnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudHNbZXZlbnROYW1lXSwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFRyaWdnZXIgYSBjb21wb25lbnQgZXZlbnQgd2l0aCB0aGUgcHJvdmlkZWQgXCJkZXRhaWxcIiBwYXlsb2FkICovXG4gIHRyaWdnZXJFdmVudChldmVudE5hbWUsIGRldGFpbCkge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChldmVudE5hbWUsIHsgZGV0YWlsIH0pO1xuICAgIHRoaXMuY29tcG9uZW50RWxlbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxufVxuIiwiLy8gZGVmYXVsdCBtYXAgdGVtcGxhdGVcbmltcG9ydCBuYXZUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvbmF2X2Jhci5odG1sJztcbmltcG9ydCBuYXZCYXJzVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL25hdl9iYXJfbmF2Lmh0bWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5cbmltcG9ydCB7IG5hdkNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9uYXZDb25maWcnO1xuaW1wb3J0IHtcbiAgY2hlY2tWYWxpZE9iamVjdFxufSBmcm9tICcuL3V0aWxpdHlzJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuXG4vKipcbiAqIE5hdkJhciBDb21wb25lbnRcbiAqIFJlbmRlciBhbmQgY29udHJvbCBtYXAgbGF5ZXIgY29udHJvbFxuICovXG5leHBvcnQgY2xhc3MgTmF2QmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocGxhY2Vob2xkZXJJZCwgcHJvcHMpIHtcbiAgICBzdXBlcihwbGFjZWhvbGRlcklkLCBwcm9wcywgbmF2VGVtcGxhdGUpO1xuXG4gICAgLyoqXG4gICAgICogZ2V0IG5hdiBjb25maWd1cmF0aW9uXG4gICAgICovXG4gICAgdGhpcy5uYXZDb25maWcgPSBuYXZDb25maWc7XG5cbiAgICB0aGlzLmFjdGl2ZU5hdiA9ICcnO1xuXG4gICAgLy8gZ2V0IHRoZSBtYWluIG5hdiBlbGVtZW50XG4gICAgY29uc3QgbmF2SGVhZGVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluLW5hdicpO1xuXG4gICAgLyoqXG4gICAgICogIGl0ZXJhdGUgZWFjaCBuYXYgYW5kIGFkZCBpdCB0byB0aGUgdWlcbiAgICAgKi9cbiAgICBsZXQgY250ID0gMTtcbiAgICBuYXZDb25maWcubmF2cy5mb3JFYWNoKChuYXYpID0+IHtcbiAgICAgIGNvbnN0IG5hdklubmVySFRNTCA9IG5hdkhlYWRlckVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgbmF2SGVhZGVyRWxlbWVudC5pbm5lckhUTUwgPSBuYXZJbm5lckhUTUwgKyBuYXZCYXJzVGVtcGxhdGU7XG5cbiAgICAgIGNvbnN0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbi1uYXYtcGFnZScpO1xuXG4gICAgICAvLyBmaXJzdCB0YWIgaXMgYWx3YXlzIGFjdGl2ZVxuICAgICAgaWYgKGNudCA9PT0gMSkge1xuICAgICAgICBuYXZFbGVtZW50LmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICB9XG5cbiAgICAgIG5hdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdyZWYnLCBuYXYucmVmKTsgLy8gbmF2IHJlZlxuICAgICAgbmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBuYXYuaHJlZik7IC8vIG5hdiBocmVmXG4gICAgICBuYXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBuYXYuaWQpOyAvLyBuYXYgaWRcbiAgICAgIG5hdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgbmF2LnRleHQpOyAvLyBhcmlhLWxhYmVsXG4gICAgICBuYXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCBuYXYudGV4dCk7IC8vIHRpdGxlXG4gICAgICBuYXZFbGVtZW50LnRleHRDb250ZW50ID0gbmF2LnRleHQ7IC8vIG5hdiB0ZXh0XG5cbiAgICAgIGNudCArPSAxO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYWN0aXZlTmF2ID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdhY3RpdmVOYXYnKTtcblxuICAgIGlmIChhY3RpdmVOYXYpIHtcbiAgICAgIE5hdkJhci5kZWFjdGl2YXRlQWxsTmF2cygpO1xuICAgICAgTmF2QmFyLnRvZ2dsZVRhYkNvbnRlbnQoYWN0aXZlTmF2KTtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYWN0aXZlTmF2KTtcbiAgICAgIGVsLmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgfVxuXG4gICAgLy8gYWRkIGNsaWNrIGV2ZW50IGZvciBhY3RpdmUgdG9nZ2xlXG4gICAgdGhpcy5hZGRUYWJDbGljaygpO1xuICB9XG5cbiAgYWRkVGFiQ2xpY2soKSB7XG4gICAgbmF2Q29uZmlnLm5hdnMuZm9yRWFjaCgobmF2KSA9PiB7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5hdi5pZCk7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIE5hdkJhci5kZWFjdGl2YXRlQWxsTmF2cygpO1xuXG4gICAgICAgIC8vIHRoaXMgdmVyeSBoYWNreSBuZWVkIGJldHRlciB3YXkgdG8gaGFuZGxlXG4gICAgICAgIGlmIChuYXYuaWQgPT09ICdtYWluLW5hdi1tYXAtc2VhcmNoaHVicycpIHtcbiAgICAgICAgICBOYXZCYXIudG9nZ2xlVGFiQ29udGVudCgnbWFpbi1uYXYtbWFwJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgTmF2QmFyLnRvZ2dsZVRhYkNvbnRlbnQoZS50YXJnZXQuaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWFrZSB0YWIgc3R5bGUgYWN0aXZlXG4gICAgICAgIE5hdkJhci50YWJVcGRhdGUoZS50YXJnZXQuaWQpO1xuXG4gICAgICAgIHRoaXMuYWN0aXZlTmF2ID0gbmF2LmlkO1xuICAgICAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ2FjdGl2ZU5hdicsIG5hdi5pZCk7XG5cbiAgICAgICAgY29uc3QgbmF2Q2hhbmdlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2Fib3V0TmF2Q2hhbmdlJyk7XG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5hdkNoYW5nZUV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHRhYlVwZGF0ZShpZCkge1xuICAgIE5hdkJhci5kZWFjdGl2YXRlQWxsTmF2cygpO1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGVsLmNsYXNzTmFtZSA9IGAke2VsLmNsYXNzTmFtZX0gYWN0aXZlYDtcbiAgfVxuXG4gIHN0YXRpYyBkZWFjdGl2YXRlQWxsTmF2cygpIHtcbiAgICBuYXZDb25maWcubmF2cy5mb3JFYWNoKChuYXYpID0+IHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmF2LmlkKTtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKCcgYWN0aXZlJywgJycpO1xuICAgIH0pO1xuICB9XG5cblxuICBzdGF0aWMgdG9nZ2xlVGFiQ29udGVudChpZCkge1xuICAgIE5hdkJhci5yZXNldFRhYkNvbnRlbnQoKTtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0YWItJHtpZH1gKTtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKCcgZC1ub25lJywgJycpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZXNldFRhYkNvbnRlbnQoKSB7XG4gICAgbmF2Q29uZmlnLm5hdnMuZm9yRWFjaCgobmF2KSA9PiB7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0YWItJHtuYXYuaWR9YCk7XG4gICAgICBpZiAoZWwpIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gICAgICAgIGVsLmNsYXNzTmFtZSArPSAnIGQtbm9uZSc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBub3QgZm91bmQgaW4gY2FzZSBpdCB3YXMgcmV2ZWFsZWQuXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFiLW1haW4tbmF2LW5vdGZvdW5kJyk7XG4gICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gICAgZWwuY2xhc3NOYW1lICs9ICcgZC1ub25lJztcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuLyoqXG4gKiB1cGRhdGUgdGhlIGRpc3BsYXkgb2YgZWxlbWVudFxuICogIEBwYXJhbSB7IE9iamVjdCB9IGVsZW1lbnQgLSBFbGVtZW50IG9iamVjdCBmcm9tIGNsaWNrIGV2ZW50LCB1c2VkIHRvIHRvZ2dsZVxuICogICAgICAgICAgICAgICAgICAgZGlzcGxheSBzdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRWxlbWVudERpc3BsYXkodGhpc0VsZSwgZWxlbWVudHMpIHtcbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IGVsZS5yZXBsYWNlKCdtYWluX25hdl8nLCAnJyk7XG4gICAgY29uc3QgdGFiRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW3JlZj1cInRhYi0ke25hbWV9XCJdYCk7XG4gICAgY29uc3QgbWFwQ2xhc3MgPSB0YWJFbGUuY2xhc3NOYW1lO1xuICAgIGNvbnN0IG5ld01hcENsYXNzID0gbWFwQ2xhc3MgKyAobWFwQ2xhc3MuaW5kZXhPZignIGQtbm9uZScpID4gMCkgPyAnICcgOiAnZC1ub25lJztcblxuICAgIHRhYkVsZS5jbGFzc05hbWUgPSBuZXdNYXBDbGFzcztcbiAgfSk7XG59XG5cbi8vIGVuc3VyZSB0aGUgb2JqZWN0IG9yIHZhcmlhYmxlIGlzIHZhbGlkLi4uXG4vLyBUT0RPOiBUaGlzIHNob3VsZCBwcm9iYWJseSBiZSBsb29raW5nIGZvciBwb3NpdGl2ZXMgcmF0aGVyIHRoYW4gY2hlY2tpbmcgaXRcbi8vIGlzbid0IG9uZSBvZiBhIGZldyBuZWdhdGl2ZXMuIEZvciBleGFtcGxlIHRoaXMgd2lsbCBsZXQgYm9vbGVhbnMsIG1hbGZvcm1lZFxuLy8gbGF0L2xvbmcgb2JqZWN0cywgYXJyYXlzIGFuZCBmbG9hdHMgdGhyb3VnaCB3aGVuIGl0IHByb2JhYmx5IHNob3VsZG4ndC4gVGhlXG4vLyBjb2RlIGRvZXNuJ3QgcmVhbGx5IHNheSB3aGF0IGEgdmFsaWQgb2JqZWN0IGlzIG90aGVyIHRoYW4gbm90IHVuZGVmaW5lZCxcbi8vIG51bGwsIGVtcHR5IGFycmF5cywgZW1wdHkgb2JqZWN0cyBhbmQgZW1wdHkgc3RyaW5ncy5cbi8vXG4vLyBAcGFyYW0gb2JqIC0gdHlwZWxlc3NcbmV4cG9ydCBmdW5jdGlvbiBjaGVja1ZhbGlkT2JqZWN0KG9iaikge1xuICBpZiAob2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyAmJiBvYmoubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyB0b2dnbGUgc3Bpbm5lciB2aXNpYmlsaXR5IG9uXG5leHBvcnQgZnVuY3Rpb24gc3Bpbm5lck9uKCkge1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtd29ya2luZycpO1xuICBjb25zdCBlbEhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWFmbGV0LXdvcmtpbmcnKTtcblxuICAvLyBlbnN1cmUgZWxlbWVudHMgYW5kIGNsYXNzIG5hbWVzIGV4aXN0c1xuICBpZiAoZWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGVsLmNsYXNzTmFtZS5iYXNlVmFsID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChlbEhvbGRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoZWxIb2xkZXIuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgLy8gdXBkYXRlIGNsYXNzIGZvciBzdmcgc3Bpbm5lclxuICBjb25zdCBlbENsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5iYXNlVmFsO1xuICBlbC5jbGFzc05hbWUuYmFzZVZhbCA9IGVsQ2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG5cbiAgLy8gdXBkYXRlIGNsYXNzIGZvciBkaXYgZWxlbWVudCB0aGF0IGhvbGRzIHN2Zy4gIERvIHRoaXMgc28gaXQgZG9zZSBub3QgY292ZXJcbiAgLy8gY292ZXIgb3RoZXIgbWFwIGVsZW1lbnRzIGFuZCBwYW5lc1xuICBlbEhvbGRlci5jbGFzc05hbWUgPSBlbEhvbGRlci5jbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJ2gtMTAwJywgJycpO1xuICBlbEhvbGRlci5jbGFzc05hbWUgPSBlbEhvbGRlci5jbGFzc05hbWUucmVwbGFjZSgndy0xMDAnLCAnJyk7XG4gIGVsSG9sZGVyLmNsYXNzTmFtZSArPSAnIGgtMTAwJztcbiAgZWxIb2xkZXIuY2xhc3NOYW1lICs9ICcgdy0xMDAnO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBjaGVjayBpZiBvbmUgb2Ygb3VyIGFqYXggY2FsbHMgaXMgd29ya2luZ1xuLy8gaWYgd2UgYWRkIGFueW1vcmUgd2Ugd2lsbCBuZWVkIHRvIGFkZCBpdCBoZXJlXG5leHBvcnQgZnVuY3Rpb24gY2hlY2t3b3JraW5nKCkge1xuICBjb25zdCB3b3JraW5nRHJhd2xheWVycyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19kcmF3bGF5ZXJzJyk7XG4gIGlmICh3b3JraW5nRHJhd2xheWVycykgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ19kcmF3bGF5ZXJzJyk7XG5cbiAgY29uc3Qgd29ya2luZ0Jhc2VtYXAgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfYmFzZW1hcCcpO1xuICBpZiAod29ya2luZ0Jhc2VtYXApIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfYmFzZW1hcCcpO1xuXG4gIGNvbnN0IHdvcmtpbmdNYXBpbmZvID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX21hcGluZm8nKTtcbiAgaWYgKHdvcmtpbmdNYXBpbmZvKSB7IHJldHVybiB0cnVlOyB9XG4gIC8vIGNvbnNvbGUubG9nKCd3b3JraW5nX21hcGluZm8nKTtcblxuICBjb25zdCB3b3JraW5nWm9uYWxzdGF0cyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ196b25hbHN0YXRzJyk7XG4gIGlmICh3b3JraW5nWm9uYWxzdGF0cykgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ196b25hbHN0YXRzJyk7XG5cbiAgY29uc3Qgd29ya2luZ1NlYXJjaCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zZWFyY2gnKTtcbiAgaWYgKHdvcmtpbmdTZWFyY2gpIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfc2VhcmNoJyk7XG5cbiAgY29uc3Qgd29ya2luZ1MzUmV0cmVpdmUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfczNyZXRyZWl2ZScpO1xuICBpZiAod29ya2luZ1MzUmV0cmVpdmUpIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfczNyZXRyZWl2ZScpO1xuXG4gIGNvbnN0IHdvcmtpbmdTM1NhdmUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfczNzYXZlJyk7XG4gIGlmICh3b3JraW5nUzNTYXZlKSB7IHJldHVybiB0cnVlOyB9XG4gIC8vIGNvbnNvbGUubG9nKCd3b3JraW5nX3Mzc2F2ZScpO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuXG4vLyB0b2dnbGUgc3Bpbm5lciB2aXNpYmlsaXR5IG9mZlxuZXhwb3J0IGZ1bmN0aW9uIHNwaW5uZXJPZmYoc291cmNlID0gJycpIHtcbiAgaWYgKGNoZWNrd29ya2luZygpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC13b3JraW5nJyk7XG4gIGNvbnN0IGVsSG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlYWZsZXQtd29ya2luZycpO1xuXG4gIC8vIGVuc3VyZSBlbGVtZW50cyBhbmQgY2xhc3MgbmFtZXMgZXhpc3RzXG4gIGlmIChlbCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoZWwuY2xhc3NOYW1lLmJhc2VWYWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGVsSG9sZGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChlbEhvbGRlci5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAvLyB1cGRhdGUgY2xhc3MgZm9yIHN2ZyBzcGlubmVyXG4gIGNvbnN0IGVsQ2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLmJhc2VWYWw7XG4gIGVsLmNsYXNzTmFtZS5iYXNlVmFsID0gZWxDbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgZWwuY2xhc3NOYW1lLmJhc2VWYWwgKz0gJyBkLW5vbmUnO1xuXG4gIC8vIHVwZGF0ZSBjbGFzcyBmb3IgZGl2IGVsZW1lbnQgdGhhdCBob2xkcyBzdmcuICBEbyB0aGlzIHNvIGl0IGRvc2Ugbm90IGNvdmVyXG4gIC8vIGNvdmVyIG90aGVyIG1hcCBlbGVtZW50cyBhbmQgcGFuZXNcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gIGVsSG9sZGVyLmNsYXNzTmFtZSA9IGVsSG9sZGVyLmNsYXNzTmFtZS5yZXBsYWNlKCdoLTEwMCcsICcnKTtcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJ3ctMTAwJywgJycpO1xuICBlbEhvbGRlci5jbGFzc05hbWUgKz0gJyBkLW5vbmUnO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBUT0RPOiBFaXRoZXIgZ2VuZXJhbGl6ZSB0aGlzIHNvIGl0IGlzbid0IGFsd2F5cyBiYWNrZ3JvdW5kIGNvbG9yIGFuZCBjb2xvciBidXQgaW5zdGVhZFxuLy8gYW4gYXR0cmlidXRlL3ZhbHVlIHBhaXIuIE9yIHByZWZlcmFibHkgbWFrZSB0aGlzIHVzZSBjbGFzc2VzIHNvIHdlIGNhbiBoYXZlIHRoZSBjb2xvcnNcbi8vIGJlIGluIGNzcy5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTdHlsZShkb2MsIHR5cGUsIHZhbHVlcykge1xuICBjb25zdCBlbGVtZW50ID0gZG9jLmdldEVsZW1lbnRCeUlkKGAke3R5cGV9LXNjb3JlYCk7XG4gIGlmIChlbGVtZW50ICE9PSB1bmRlZmluZWQgJiYgZWxlbWVudCAhPT0gbnVsbCkge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBiYWNrZ3JvdW5kLWNvbG9yOiAke3ZhbHVlcy5iYWNrZ3JvdW5kQ29sb3J9OyBjb2xvcjogJHt2YWx1ZXMuY29sb3J9O2ApO1xuICB9XG59XG5cbi8vIE5vdGUgdGhhdCB0aGUgYmFjay10aWNrcyBhcmUgaW50ZW50aW9uYWwuIFRoZXkgdXNlIHRoZSBuZXcgRVM2IFRlbXBsYXRlXG4vLyBMaXRlcmFscyBwYXR0ZXJuLlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvVGVtcGxhdGVfbGl0ZXJhbHNcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTWFwSW5mb1ZhbHVlKGRvYywgdHlwZSwgdmFsdWVzKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoYCR7dHlwZX0tc2NvcmVgKTtcbiAgaWYgKGVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJiBlbGVtZW50ICE9PSBudWxsKSB7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlcy5sYWJlbDtcbiAgfVxufVxuXG4vLyBjaGVjayBpZiBhIHBhcmVudGVsZW1ldCBjb250YWlucyBhIGRvbSBpZFxuLy8gZGVhbHMgd2l0aCBldmVudCBidWJibGluZyBzbyB3ZSBjYW4gY2hlY2tcbi8vIGlmIHRoZSBjaGlsZCBpcyBpbiBhIHNwZWNpZmMgcGFyZW50XG5leHBvcnQgZnVuY3Rpb24gUGFyZW50Q29udGFpbnModGFyZ2V0LCBpZCkge1xuICBmb3IgKGxldCBwID0gdGFyZ2V0ICYmIHRhcmdldC5wYXJlbnRFbGVtZW50OyBwOyBwID0gcC5wYXJlbnRFbGVtZW50KSB7XG4gICAgaWYgKHAuaWQgPT09IGlkKSB7IHJldHVybiB0cnVlOyB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgY29uc3QgZmxhdCA9IFtdO1xuICBhcnIuZm9yRWFjaCgoZCkgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGQpKSB7XG4gICAgICBmbGF0LnB1c2goLi4uZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsYXQucHVzaChkKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZmxhdDtcbn1cblxuLy8gc2V0IHN0YXRlaXRlbXMgaWYgdGhleSBkbyBub3QgZXhpc3Rcbi8vIHdlIHdpbGwgaGF2ZSB0byBhbnkgbmV3IG9uZXMgaWYgYWRkZWQuXG4vLyB0aGlzIHdpbGwgaGVscCB3aGVuIHdlIGFkZGluZyBuZXcgc3RhdGl0ZW1zIFwiYnJlYWtzXCIgdGhlIHdlYnBhZ2VcbmV4cG9ydCBmdW5jdGlvbiBhZGRNaXNzaW5nU3RhdGVJdGVtcygpIHtcbiAgLy8gY2hlY2sgZm9yIGJhc2UgbWFwIGRlZmF1bHQgaXMgRGFya0dyYXlcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnYmFzZW1hcCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnYmFzZW1hcCcsICdEYXJrR3JheScpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIGxhc3RhY3Rpb24gZGVmYXVsdCBpcyBtb3ZlZW5kXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2xhc3RhY3Rpb24nKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ2xhc3RhY3Rpb24nLCAnbW92ZWVuZCcpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIG1hcENlbnRlciBkZWZhdWx0IGlzIHtsYXQ6IDMyLjc3NjUsIGxuZzogLTc5LjkzMTF9IChjaGFybGVzdG9uIGZvciBub3cpXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcENlbnRlcicpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnbWFwQ2VudGVyJywgeyBsYXQ6IDMyLjc3NjUsIGxuZzogLTc5LjkzMTEgfSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgbWFwTGF5ZXJEaXNwbGF5U3RhdHVzIGRlZmF1bHQgaXMgbGlzdGVkIGJlbG93XG4gIC8vIHRvIGxvbmcgdG8gbGlzdCBhZ2FpblxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXBMYXllckRpc3BsYXlTdGF0dXMnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ21hcExheWVyRGlzcGxheVN0YXR1cycsIHtcbiAgICAgIEh1YnNUTVM6IGZhbHNlLFxuICAgICAgRXhwb3N1cmVUTVM6IGZhbHNlLFxuICAgICAgQXNzZXRzVE1TOiBmYWxzZSxcbiAgICAgIFRocmVhdHNUTVM6IGZhbHNlLFxuICAgICAgQXF1YXRpY1RNUzogZmFsc2UsXG4gICAgICBUZXJyZXN0cmlhbFRNUzogZmFsc2UsXG4gICAgICBQb3BEZW5zaXR5VE1TOiBmYWxzZSxcbiAgICAgIFNvY1Z1bG5UTVM6IGZhbHNlLFxuICAgICAgQ3JpdGljYWxGYWNpbGl0aWVzVE1TOiBmYWxzZSxcbiAgICAgIENyaXRpY2FsSW5mcmFzdHJ1Y3R1cmVUTVM6IGZhbHNlLFxuICAgICAgRHJhaW5nZVRNUzogZmFsc2UsXG4gICAgICBFcm9zaW9uVE1TOiBmYWxzZSxcbiAgICAgIFNMUlRNUzogZmFsc2UsXG4gICAgICBTdG9ybVN1cmdlVE1TOiBmYWxzZSxcbiAgICAgIEdlb1N0cmVzc1RNUzogZmFsc2UsXG4gICAgICBTbG9wZVRNUzogZmFsc2UsXG4gICAgICBGbG9vZFByb25lQXJlYXNUTVM6IGZhbHNlXG4gICAgfSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWFjb3VudCBkZWZhdWx0IGlzIDBcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXNlcmFyZWFjb3VudCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgndXNlcmFyZWFjb3VudCcsIDApO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIG1hcENlbnRlciBkZWZhdWx0IGlzIHtsYXQ6IDMyLjc3NjUsIGxuZzogLTc5LjkzMTF9IChjaGFybGVzdG9uIGZvciBub3cpXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcFpvb20nKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ21hcFpvb20nLCAxMik7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igc2F2ZWRzaGFwZXMgZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdzYXZlZHNoYXBlcycpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnc2F2ZWRzaGFwZXMnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWEgZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd1c2VyYXJlYScpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgndXNlcmFyZWEnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWFzIGRlZmF1bHQgaXMge30gTlVMTCBvYmplY3RcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXNlcmFyZWFzJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd1c2VyYXJlYXMnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWFfYnVmZmVyZWQgZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd1c2VyYXJlYV9idWZmZXJlZCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgndXNlcmFyZWFfYnVmZmVyZWQnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igem9uYWxzdGF0c2pzb24gZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd6b25hbHN0YXRzanNvbicpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnem9uYWxzdGF0c2pzb24nLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19iYXNlbWFwIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19iYXNlbWFwJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX2Jhc2VtYXAnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19tYXBpbmZvIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19tYXBpbmZvJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX21hcGluZm8nLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19tYXBpbmZvIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ196b25hbHN0YXRzJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX3pvbmFsc3RhdHMnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19zM3JldHJlaXZlIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zM3JldHJlaXZlJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX3MzcmV0cmVpdmUnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19zZWFyY2ggZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3NlYXJjaCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19zZWFyY2gnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19zM3NhdmUgZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3Mzc2F2ZScpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19zM3NhdmUnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19kcmF3bGF5ZXJzIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19kcmF3bGF5ZXJzJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX2RyYXdsYXllcnMnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igem9uYWxhY3RpdmUgZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd6b25hbGFjdGl2ZScpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnem9uYWxhY3RpdmUnLCBbJ25vbmUnLCAnbm9uZSddKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuYXYgY2xhc3M9XFxcIm5hdiBmbGV4LWNvbHVtbiBmbGV4LXNtLXJvd1xcXCIgaWQ9XFxcIm1haW4tbmF2XFxcIiA+XFxuPC9uYXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxhIHJlZj1cXFwibWFpbi1uYXYtcGFnZVxcXCIgaWQ9XFxcIm1haW4tbmF2LXBhZ2VcXFwiIGNsYXNzPVxcXCJuYXYtbGluayBtYWluLW5hdlxcXCIgaHJlZj1cXFwiXFxcIj48L2E+XFxuXCI7Il0sInNvdXJjZVJvb3QiOiIifQ==