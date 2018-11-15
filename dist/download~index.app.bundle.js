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
    text: "Home",
    id: "main-nav-map",
    href: "./#Home"
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

    if ((0, _utilitys.checkValidObject)(activeNav)) {
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
          NavBar.toggleTabContent(e.target.id);
          var ele = e.target;
          ele.className += ' active';

          // add to store later
          _this2.activeNav = nav.id;
          store.setStoreItem('activeNav', nav.id);
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
      el.className = el.className.replace(' d-none', '');
    }
  }, {
    key: 'resetTabContent',
    value: function resetTabContent() {
      _navConfig.navConfig.navs.forEach(function (nav) {
        var el = document.getElementById('tab-' + nav.id);
        el.className = el.className.replace(' d-none', '');
        el.className += ' d-none';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL25hdkNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL25hdkJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlsaXR5cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXJfbmF2Lmh0bWwiXSwibmFtZXMiOlsibmF2Q29uZmlnIiwibmF2cyIsIm5hbWUiLCJyZWYiLCJ0ZXh0IiwiaWQiLCJocmVmIiwiQ29tcG9uZW50IiwicGxhY2Vob2xkZXJJZCIsInByb3BzIiwidGVtcGxhdGUiLCJjb21wb25lbnRFbGVtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlZnMiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5uZXJIVE1MIiwicmVmRWxlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW0iLCJnZXRBdHRyaWJ1dGUiLCJldmVudHMiLCJjcmVhdGVFdmVudHMiLCJPYmplY3QiLCJrZXlzIiwiZXZlbnROYW1lIiwiZGV0YWlsIiwiZXZlbnQiLCJ3aW5kb3ciLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJzdG9yZSIsIlN0b3JlIiwiTmF2QmFyIiwibmF2VGVtcGxhdGUiLCJhY3RpdmVOYXYiLCJuYXZIZWFkZXJFbGVtZW50IiwiY250IiwibmF2IiwibmF2SW5uZXJIVE1MIiwibmF2QmFyc1RlbXBsYXRlIiwibmF2RWxlbWVudCIsImNsYXNzTmFtZSIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiZ2V0U3RhdGVJdGVtIiwiZGVhY3RpdmF0ZUFsbE5hdnMiLCJ0b2dnbGVUYWJDb250ZW50IiwiZWwiLCJhZGRUYWJDbGljayIsImUiLCJ0YXJnZXQiLCJlbGUiLCJzZXRTdG9yZUl0ZW0iLCJyZXBsYWNlIiwicmVzZXRUYWJDb250ZW50IiwidG9nZ2xlRWxlbWVudERpc3BsYXkiLCJjaGVja1ZhbGlkT2JqZWN0Iiwic3Bpbm5lck9uIiwiY2hlY2t3b3JraW5nIiwic3Bpbm5lck9mZiIsImFkZFN0eWxlIiwicmVwbGFjZU1hcEluZm9WYWx1ZSIsIlBhcmVudENvbnRhaW5zIiwiZmxhdHRlbiIsImFkZE1pc3NpbmdTdGF0ZUl0ZW1zIiwidGhpc0VsZSIsImVsZW1lbnRzIiwidGFiRWxlIiwicXVlcnlTZWxlY3RvciIsIm1hcENsYXNzIiwibmV3TWFwQ2xhc3MiLCJpbmRleE9mIiwib2JqIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwiZWxIb2xkZXIiLCJiYXNlVmFsIiwiZWxDbGFzc05hbWUiLCJ3b3JraW5nRHJhd2xheWVycyIsIndvcmtpbmdCYXNlbWFwIiwid29ya2luZ01hcGluZm8iLCJ3b3JraW5nWm9uYWxzdGF0cyIsIndvcmtpbmdTZWFyY2giLCJ3b3JraW5nUzNSZXRyZWl2ZSIsIndvcmtpbmdTM1NhdmUiLCJzb3VyY2UiLCJkb2MiLCJ0eXBlIiwidmFsdWVzIiwiZWxlbWVudCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwibGFiZWwiLCJwIiwicGFyZW50RWxlbWVudCIsImFyciIsImZsYXQiLCJkIiwiQXJyYXkiLCJpc0FycmF5IiwicHVzaCIsImxhdCIsImxuZyIsIkh1YnNUTVMiLCJFeHBvc3VyZVRNUyIsIkFzc2V0c1RNUyIsIlRocmVhdHNUTVMiLCJBcXVhdGljVE1TIiwiVGVycmVzdHJpYWxUTVMiLCJQb3BEZW5zaXR5VE1TIiwiU29jVnVsblRNUyIsIkNyaXRpY2FsRmFjaWxpdGllc1RNUyIsIkNyaXRpY2FsSW5mcmFzdHJ1Y3R1cmVUTVMiLCJEcmFpbmdlVE1TIiwiRXJvc2lvblRNUyIsIlNMUlRNUyIsIlN0b3JtU3VyZ2VUTVMiLCJHZW9TdHJlc3NUTVMiLCJTbG9wZVRNUyIsIkZsb29kUHJvbmVBcmVhc1RNUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7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Q0FBTCxFQUE2RDtBQUMzRGQsVUFBTXNCLFlBQU4sQ0FBbUIsZ0JBQW5CLEVBQXFDLEtBQXJDO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFJLENBQUNJLGlCQUFpQjFCLE1BQU1jLFlBQU4sQ0FBbUIsZ0JBQW5CLENBQWpCLENBQUwsRUFBNkQ7QUFDM0RkLFVBQU1zQixZQUFOLENBQW1CLGdCQUFuQixFQUFxQyxLQUFyQztBQUNEOztBQUVEO0FBQ0EsTUFBSSxDQUFDSSxpQkFBaUIxQixNQUFNYyxZQUFOLENBQW1CLG9CQUFuQixDQUFqQixDQUFMLEVBQWlFO0FBQy9EZCxVQUFNc0IsWUFBTixDQUFtQixvQkFBbkIsRUFBeUMsS0FBekM7QUFDRDs7QUFFRDtBQUNBLE1BQUksQ0FBQ0ksaUJBQWlCMUIsTUFBTWMsWUFBTixDQUFtQixhQUFuQixDQUFqQixDQUFMLEVBQTBEO0FBQ3hEZCxVQUFNc0IsWUFBTixDQUFtQixhQUFuQixFQUFrQyxDQUFDLE1BQUQsRUFBUyxNQUFULENBQWxDO0FBQ0Q7QUFDRixDOzs7Ozs7Ozs7OztBQzNSRCwwRjs7Ozs7Ozs7Ozs7QUNBQSw4RyIsImZpbGUiOiJkb3dubG9hZH5pbmRleC5hcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHZhciBuYXZDb25maWcgPSB7XG4gIG5hdnM6W3tcbiAgICBuYW1lOiBcImhvbWVcIixcbiAgICByZWY6IFwibWFpbi1uYXYtbWFwXCIsXG4gICAgdGV4dDogXCJIb21lXCIsXG4gICAgaWQ6IFwibWFpbi1uYXYtbWFwXCIsXG4gICAgaHJlZjogXCIuLyNIb21lXCJcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZG93bmxvYWRcIixcbiAgICByZWY6IFwibWFpbi1uYXYtZG93bmxvYWRcIixcbiAgICB0ZXh0OiBcIkRvd25sb2FkIERhdGFcIixcbiAgICBpZDogXCJtYWluLW5hdi1kb3dubG9hZFwiLFxuICAgIGhyZWY6IFwiLi8jRG93bmxvYWRcIlxuICB9LFxuICB7XG4gICAgbmFtZTogXCJhYm91dFwiLFxuICAgIHJlZjogXCJtYWluLW5hdi1hYm91dFwiLFxuICAgIHRleHQ6IFwiQWJvdXRcIixcbiAgICBpZDogXCJtYWluLW5hdi1hYm91dFwiLFxuICAgIGhyZWY6IFwiLi8jQWJvdXRcIlxuICB9XVxufVxuIiwiLyoqXG4gKiBCYXNlIGNvbXBvbmVudCBjbGFzcyB0byBwcm92aWRlIHZpZXcgcmVmIGJpbmRpbmcsIHRlbXBsYXRlIGluc2VydGlvbiwgYW5kIGV2ZW50IGxpc3RlbmVyIHNldHVwXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wb25lbnQge1xuICAvKipcbiAgICogQ29tcG9uZW50IENvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHBsYWNlaG9sZGVySWQgLSBFbGVtZW50IElEIHRvIGluZmxhdGUgdGhlIGNvbXBvbmVudCBpbnRvXG4gICAqIEBwYXJhbSB7IE9iamVjdCB9IHByb3BzIC0gQ29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHsgT2JqZWN0IH0gcHJvcHMuZXZlbnRzIC0gQ29tcG9uZW50IGV2ZW50IGxpc3RlbmVyc1xuICAgKiBAcGFyYW0geyBPYmplY3QgfSBwcm9wcy5kYXRhIC0gQ29tcG9uZW50IGRhdGEgcHJvcGVydGllc1xuICAgKiBAcGFyYW0geyBTdHJpbmcgfSB0ZW1wbGF0ZSAtIEhUTUwgdGVtcGxhdGUgdG8gaW5mbGF0ZSBpbnRvIHBsYWNlaG9sZGVyIGlkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwbGFjZWhvbGRlcklkLCBwcm9wcyA9IHt9LCB0ZW1wbGF0ZSkge1xuICAgIHRoaXMuY29tcG9uZW50RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYWNlaG9sZGVySWQpO1xuXG5cbiAgICB0aGlzLnJlZnMgPSB7fTtcblxuICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgaWYgKHRoaXMuY29tcG9uZW50RWxlbSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50RWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgIC8vIHBsYWNlaG9sZGVyIGZvciBmdXR1cmUgdXNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50RWxlbS5hZGRFdmVudExpc3RlbmVyKCd1bmxvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgLy8gcGxhY2Vob2xkZXIgZm9yIGZ1dHVyZSB1c2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTG9hZCB0ZW1wbGF0ZSBpbnRvIHBsYWNlaG9sZGVyIGVsZW1lbnRcbiAgICAgICAgdGhpcy5jb21wb25lbnRFbGVtLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuXG4gICAgICAgIC8vIEZpbmQgYWxsIHJlZnMgaW4gY29tcG9uZW50XG4gICAgICAgIGNvbnN0IHJlZkVsZW1zID0gdGhpcy5jb21wb25lbnRFbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyZWZdJyk7XG4gICAgICAgIHJlZkVsZW1zLmZvckVhY2goKGVsZW0pID0+IHsgdGhpcy5yZWZzW2VsZW0uZ2V0QXR0cmlidXRlKCdyZWYnKV0gPSBlbGVtOyB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZXZlbnRzKSB7IHRoaXMuY3JlYXRlRXZlbnRzKHByb3BzLmV2ZW50cyk7IH1cbiAgfVxuXG4gIC8qKiBSZWFkIFwiZXZlbnRcIiBjb21wb25lbnQgcGFyYW1ldGVycywgYW5kIGF0dGFjaCBldmVudCBsaXN0ZW5lcnMgZm9yIGVhY2ggKi9cbiAgY3JlYXRlRXZlbnRzKGV2ZW50cykge1xuICAgIE9iamVjdC5rZXlzKGV2ZW50cykuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICB0aGlzLmNvbXBvbmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50c1tldmVudE5hbWVdLCBmYWxzZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogVHJpZ2dlciBhIGNvbXBvbmVudCBldmVudCB3aXRoIHRoZSBwcm92aWRlZCBcImRldGFpbFwiIHBheWxvYWQgKi9cbiAgdHJpZ2dlckV2ZW50KGV2ZW50TmFtZSwgZGV0YWlsKSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgeyBkZXRhaWwgfSk7XG4gICAgdGhpcy5jb21wb25lbnRFbGVtLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG59XG4iLCIvLyBkZWZhdWx0IG1hcCB0ZW1wbGF0ZVxuaW1wb3J0IG5hdlRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9uYXZfYmFyLmh0bWwnO1xuaW1wb3J0IG5hdkJhcnNUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvbmF2X2Jhcl9uYXYuaHRtbCc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuaW1wb3J0IHsgbmF2Q29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL25hdkNvbmZpZyc7XG5pbXBvcnQge1xuICBjaGVja1ZhbGlkT2JqZWN0XG59IGZyb20gJy4vdXRpbGl0eXMnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5cbi8qKlxuICogTmF2QmFyIENvbXBvbmVudFxuICogUmVuZGVyIGFuZCBjb250cm9sIG1hcCBsYXllciBjb250cm9sXG4gKi9cbmV4cG9ydCBjbGFzcyBOYXZCYXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihwbGFjZWhvbGRlcklkLCBwcm9wcykge1xuICAgIHN1cGVyKHBsYWNlaG9sZGVySWQsIHByb3BzLCBuYXZUZW1wbGF0ZSk7XG5cbiAgICAvKipcbiAgICAgKiBnZXQgbmF2IGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICB0aGlzLm5hdkNvbmZpZyA9IG5hdkNvbmZpZztcblxuICAgIHRoaXMuYWN0aXZlTmF2ID0gJyc7XG5cbiAgICAvLyBnZXQgdGhlIG1haW4gbmF2IGVsZW1lbnRcbiAgICBjb25zdCBuYXZIZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tbmF2Jyk7XG5cbiAgICAvKipcbiAgICAgKiAgaXRlcmF0ZSBlYWNoIG5hdiBhbmQgYWRkIGl0IHRvIHRoZSB1aVxuICAgICAqL1xuICAgIGxldCBjbnQgPSAxO1xuICAgIG5hdkNvbmZpZy5uYXZzLmZvckVhY2goKG5hdikgPT4ge1xuICAgICAgY29uc3QgbmF2SW5uZXJIVE1MID0gbmF2SGVhZGVyRWxlbWVudC5pbm5lckhUTUw7XG4gICAgICBuYXZIZWFkZXJFbGVtZW50LmlubmVySFRNTCA9IG5hdklubmVySFRNTCArIG5hdkJhcnNUZW1wbGF0ZTtcblxuICAgICAgY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluLW5hdi1wYWdlJyk7XG5cbiAgICAgIC8vIGZpcnN0IHRhYiBpcyBhbHdheXMgYWN0aXZlXG4gICAgICBpZiAoY250ID09PSAxKSB7XG4gICAgICAgIG5hdkVsZW1lbnQuY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICAgIH1cblxuICAgICAgbmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JlZicsIG5hdi5yZWYpOyAvLyBuYXYgcmVmXG4gICAgICBuYXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsIG5hdi5ocmVmKTsgLy8gbmF2IGhyZWZcbiAgICAgIG5hdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIG5hdi5pZCk7IC8vIG5hdiBpZFxuICAgICAgbmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBuYXYudGV4dCk7IC8vIGFyaWEtbGFiZWxcbiAgICAgIG5hdkVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIG5hdi50ZXh0KTsgLy8gdGl0bGVcbiAgICAgIG5hdkVsZW1lbnQudGV4dENvbnRlbnQgPSBuYXYudGV4dDsgLy8gbmF2IHRleHRcblxuICAgICAgY250ICs9IDE7XG4gICAgfSk7XG5cbiAgICBjb25zdCBhY3RpdmVOYXYgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2FjdGl2ZU5hdicpO1xuXG4gICAgaWYgKGNoZWNrVmFsaWRPYmplY3QoYWN0aXZlTmF2KSkge1xuICAgICAgTmF2QmFyLmRlYWN0aXZhdGVBbGxOYXZzKCk7XG4gICAgICBOYXZCYXIudG9nZ2xlVGFiQ29udGVudChhY3RpdmVOYXYpO1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhY3RpdmVOYXYpO1xuICAgICAgZWwuY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICB9XG5cbiAgICAvLyBhZGQgY2xpY2sgZXZlbnQgZm9yIGFjdGl2ZSB0b2dnbGVcbiAgICB0aGlzLmFkZFRhYkNsaWNrKCk7XG4gIH1cblxuICBhZGRUYWJDbGljaygpIHtcbiAgICBuYXZDb25maWcubmF2cy5mb3JFYWNoKChuYXYpID0+IHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmF2LmlkKTtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgTmF2QmFyLmRlYWN0aXZhdGVBbGxOYXZzKCk7XG4gICAgICAgIE5hdkJhci50b2dnbGVUYWJDb250ZW50KGUudGFyZ2V0LmlkKTtcbiAgICAgICAgY29uc3QgZWxlID0gZS50YXJnZXQ7XG4gICAgICAgIGVsZS5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuXG4gICAgICAgIC8vIGFkZCB0byBzdG9yZSBsYXRlclxuICAgICAgICB0aGlzLmFjdGl2ZU5hdiA9IG5hdi5pZDtcbiAgICAgICAgc3RvcmUuc2V0U3RvcmVJdGVtKCdhY3RpdmVOYXYnLCBuYXYuaWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgdGFiVXBkYXRlKGlkKSB7XG4gICAgTmF2QmFyLmRlYWN0aXZhdGVBbGxOYXZzKCk7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgZWwuY2xhc3NOYW1lID0gYCR7ZWwuY2xhc3NOYW1lfSBhY3RpdmVgO1xuICB9XG5cbiAgc3RhdGljIGRlYWN0aXZhdGVBbGxOYXZzKCkge1xuICAgIG5hdkNvbmZpZy5uYXZzLmZvckVhY2goKG5hdikgPT4ge1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYXYuaWQpO1xuICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJyBhY3RpdmUnLCAnJyk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgdG9nZ2xlVGFiQ29udGVudChpZCkge1xuICAgIE5hdkJhci5yZXNldFRhYkNvbnRlbnQoKTtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0YWItJHtpZH1gKTtcbiAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgfVxuXG4gIHN0YXRpYyByZXNldFRhYkNvbnRlbnQoKSB7XG4gICAgbmF2Q29uZmlnLm5hdnMuZm9yRWFjaCgobmF2KSA9PiB7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0YWItJHtuYXYuaWR9YCk7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgICAgIGVsLmNsYXNzTmFtZSArPSAnIGQtbm9uZSc7XG4gICAgfSk7XG5cbiAgICAvLyBub3QgZm91bmQgaW4gY2FzZSBpdCB3YXMgcmV2ZWFsZWQuXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFiLW1haW4tbmF2LW5vdGZvdW5kJyk7XG4gICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gICAgZWwuY2xhc3NOYW1lICs9ICcgZC1ub25lJztcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuLyoqXG4gKiB1cGRhdGUgdGhlIGRpc3BsYXkgb2YgZWxlbWVudFxuICogIEBwYXJhbSB7IE9iamVjdCB9IGVsZW1lbnQgLSBFbGVtZW50IG9iamVjdCBmcm9tIGNsaWNrIGV2ZW50LCB1c2VkIHRvIHRvZ2dsZVxuICogICAgICAgICAgICAgICAgICAgZGlzcGxheSBzdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRWxlbWVudERpc3BsYXkodGhpc0VsZSwgZWxlbWVudHMpIHtcbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IGVsZS5yZXBsYWNlKCdtYWluX25hdl8nLCAnJyk7XG4gICAgY29uc3QgdGFiRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW3JlZj1cInRhYi0ke25hbWV9XCJdYCk7XG4gICAgY29uc3QgbWFwQ2xhc3MgPSB0YWJFbGUuY2xhc3NOYW1lO1xuICAgIGNvbnN0IG5ld01hcENsYXNzID0gbWFwQ2xhc3MgKyAobWFwQ2xhc3MuaW5kZXhPZignIGQtbm9uZScpID4gMCkgPyAnICcgOiAnZC1ub25lJztcblxuICAgIHRhYkVsZS5jbGFzc05hbWUgPSBuZXdNYXBDbGFzcztcbiAgfSk7XG59XG5cbi8vIGVuc3VyZSB0aGUgb2JqZWN0IG9yIHZhcmlhYmxlIGlzIHZhbGlkLi4uXG4vLyBUT0RPOiBUaGlzIHNob3VsZCBwcm9iYWJseSBiZSBsb29raW5nIGZvciBwb3NpdGl2ZXMgcmF0aGVyIHRoYW4gY2hlY2tpbmcgaXRcbi8vIGlzbid0IG9uZSBvZiBhIGZldyBuZWdhdGl2ZXMuIEZvciBleGFtcGxlIHRoaXMgd2lsbCBsZXQgYm9vbGVhbnMsIG1hbGZvcm1lZFxuLy8gbGF0L2xvbmcgb2JqZWN0cywgYXJyYXlzIGFuZCBmbG9hdHMgdGhyb3VnaCB3aGVuIGl0IHByb2JhYmx5IHNob3VsZG4ndC4gVGhlXG4vLyBjb2RlIGRvZXNuJ3QgcmVhbGx5IHNheSB3aGF0IGEgdmFsaWQgb2JqZWN0IGlzIG90aGVyIHRoYW4gbm90IHVuZGVmaW5lZCxcbi8vIG51bGwsIGVtcHR5IGFycmF5cywgZW1wdHkgb2JqZWN0cyBhbmQgZW1wdHkgc3RyaW5ncy5cbi8vXG4vLyBAcGFyYW0gb2JqIC0gdHlwZWxlc3NcbmV4cG9ydCBmdW5jdGlvbiBjaGVja1ZhbGlkT2JqZWN0KG9iaikge1xuICBpZiAob2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyAmJiBvYmoubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyB0b2dnbGUgc3Bpbm5lciB2aXNpYmlsaXR5IG9uXG5leHBvcnQgZnVuY3Rpb24gc3Bpbm5lck9uKCkge1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtd29ya2luZycpO1xuICBjb25zdCBlbEhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWFmbGV0LXdvcmtpbmcnKTtcblxuICAvLyBlbnN1cmUgZWxlbWVudHMgYW5kIGNsYXNzIG5hbWVzIGV4aXN0c1xuICBpZiAoZWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGVsLmNsYXNzTmFtZS5iYXNlVmFsID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChlbEhvbGRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoZWxIb2xkZXIuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgLy8gdXBkYXRlIGNsYXNzIGZvciBzdmcgc3Bpbm5lclxuICBjb25zdCBlbENsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5iYXNlVmFsO1xuICBlbC5jbGFzc05hbWUuYmFzZVZhbCA9IGVsQ2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG5cbiAgLy8gdXBkYXRlIGNsYXNzIGZvciBkaXYgZWxlbWVudCB0aGF0IGhvbGRzIHN2Zy4gIERvIHRoaXMgc28gaXQgZG9zZSBub3QgY292ZXJcbiAgLy8gY292ZXIgb3RoZXIgbWFwIGVsZW1lbnRzIGFuZCBwYW5lc1xuICBlbEhvbGRlci5jbGFzc05hbWUgPSBlbEhvbGRlci5jbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJ2gtMTAwJywgJycpO1xuICBlbEhvbGRlci5jbGFzc05hbWUgPSBlbEhvbGRlci5jbGFzc05hbWUucmVwbGFjZSgndy0xMDAnLCAnJyk7XG4gIGVsSG9sZGVyLmNsYXNzTmFtZSArPSAnIGgtMTAwJztcbiAgZWxIb2xkZXIuY2xhc3NOYW1lICs9ICcgdy0xMDAnO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBjaGVjayBpZiBvbmUgb2Ygb3VyIGFqYXggY2FsbHMgaXMgd29ya2luZ1xuLy8gaWYgd2UgYWRkIGFueW1vcmUgd2Ugd2lsbCBuZWVkIHRvIGFkZCBpdCBoZXJlXG5leHBvcnQgZnVuY3Rpb24gY2hlY2t3b3JraW5nKCkge1xuICBjb25zdCB3b3JraW5nRHJhd2xheWVycyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19kcmF3bGF5ZXJzJyk7XG4gIGlmICh3b3JraW5nRHJhd2xheWVycykgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ19kcmF3bGF5ZXJzJyk7XG5cbiAgY29uc3Qgd29ya2luZ0Jhc2VtYXAgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfYmFzZW1hcCcpO1xuICBpZiAod29ya2luZ0Jhc2VtYXApIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfYmFzZW1hcCcpO1xuXG4gIGNvbnN0IHdvcmtpbmdNYXBpbmZvID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX21hcGluZm8nKTtcbiAgaWYgKHdvcmtpbmdNYXBpbmZvKSB7IHJldHVybiB0cnVlOyB9XG4gIC8vIGNvbnNvbGUubG9nKCd3b3JraW5nX21hcGluZm8nKTtcblxuICBjb25zdCB3b3JraW5nWm9uYWxzdGF0cyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ196b25hbHN0YXRzJyk7XG4gIGlmICh3b3JraW5nWm9uYWxzdGF0cykgeyByZXR1cm4gdHJ1ZTsgfVxuICAvLyBjb25zb2xlLmxvZygnd29ya2luZ196b25hbHN0YXRzJyk7XG5cbiAgY29uc3Qgd29ya2luZ1NlYXJjaCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zZWFyY2gnKTtcbiAgaWYgKHdvcmtpbmdTZWFyY2gpIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfc2VhcmNoJyk7XG5cbiAgY29uc3Qgd29ya2luZ1MzUmV0cmVpdmUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfczNyZXRyZWl2ZScpO1xuICBpZiAod29ya2luZ1MzUmV0cmVpdmUpIHsgcmV0dXJuIHRydWU7IH1cbiAgLy8gY29uc29sZS5sb2coJ3dvcmtpbmdfczNyZXRyZWl2ZScpO1xuXG4gIGNvbnN0IHdvcmtpbmdTM1NhdmUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3dvcmtpbmdfczNzYXZlJyk7XG4gIGlmICh3b3JraW5nUzNTYXZlKSB7IHJldHVybiB0cnVlOyB9XG4gIC8vIGNvbnNvbGUubG9nKCd3b3JraW5nX3Mzc2F2ZScpO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuXG4vLyB0b2dnbGUgc3Bpbm5lciB2aXNpYmlsaXR5IG9mZlxuZXhwb3J0IGZ1bmN0aW9uIHNwaW5uZXJPZmYoc291cmNlID0gJycpIHtcbiAgaWYgKGNoZWNrd29ya2luZygpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC13b3JraW5nJyk7XG4gIGNvbnN0IGVsSG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlYWZsZXQtd29ya2luZycpO1xuXG4gIC8vIGVuc3VyZSBlbGVtZW50cyBhbmQgY2xhc3MgbmFtZXMgZXhpc3RzXG4gIGlmIChlbCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoZWwuY2xhc3NOYW1lLmJhc2VWYWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGVsSG9sZGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChlbEhvbGRlci5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAvLyB1cGRhdGUgY2xhc3MgZm9yIHN2ZyBzcGlubmVyXG4gIGNvbnN0IGVsQ2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLmJhc2VWYWw7XG4gIGVsLmNsYXNzTmFtZS5iYXNlVmFsID0gZWxDbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgZWwuY2xhc3NOYW1lLmJhc2VWYWwgKz0gJyBkLW5vbmUnO1xuXG4gIC8vIHVwZGF0ZSBjbGFzcyBmb3IgZGl2IGVsZW1lbnQgdGhhdCBob2xkcyBzdmcuICBEbyB0aGlzIHNvIGl0IGRvc2Ugbm90IGNvdmVyXG4gIC8vIGNvdmVyIG90aGVyIG1hcCBlbGVtZW50cyBhbmQgcGFuZXNcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gIGVsSG9sZGVyLmNsYXNzTmFtZSA9IGVsSG9sZGVyLmNsYXNzTmFtZS5yZXBsYWNlKCdoLTEwMCcsICcnKTtcbiAgZWxIb2xkZXIuY2xhc3NOYW1lID0gZWxIb2xkZXIuY2xhc3NOYW1lLnJlcGxhY2UoJ3ctMTAwJywgJycpO1xuICBlbEhvbGRlci5jbGFzc05hbWUgKz0gJyBkLW5vbmUnO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBUT0RPOiBFaXRoZXIgZ2VuZXJhbGl6ZSB0aGlzIHNvIGl0IGlzbid0IGFsd2F5cyBiYWNrZ3JvdW5kIGNvbG9yIGFuZCBjb2xvciBidXQgaW5zdGVhZFxuLy8gYW4gYXR0cmlidXRlL3ZhbHVlIHBhaXIuIE9yIHByZWZlcmFibHkgbWFrZSB0aGlzIHVzZSBjbGFzc2VzIHNvIHdlIGNhbiBoYXZlIHRoZSBjb2xvcnNcbi8vIGJlIGluIGNzcy5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTdHlsZShkb2MsIHR5cGUsIHZhbHVlcykge1xuICBjb25zdCBlbGVtZW50ID0gZG9jLmdldEVsZW1lbnRCeUlkKGAke3R5cGV9LXNjb3JlYCk7XG4gIGlmIChlbGVtZW50ICE9PSB1bmRlZmluZWQgJiYgZWxlbWVudCAhPT0gbnVsbCkge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBiYWNrZ3JvdW5kLWNvbG9yOiAke3ZhbHVlcy5iYWNrZ3JvdW5kQ29sb3J9OyBjb2xvcjogJHt2YWx1ZXMuY29sb3J9O2ApO1xuICB9XG59XG5cbi8vIE5vdGUgdGhhdCB0aGUgYmFjay10aWNrcyBhcmUgaW50ZW50aW9uYWwuIFRoZXkgdXNlIHRoZSBuZXcgRVM2IFRlbXBsYXRlXG4vLyBMaXRlcmFscyBwYXR0ZXJuLlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvVGVtcGxhdGVfbGl0ZXJhbHNcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTWFwSW5mb1ZhbHVlKGRvYywgdHlwZSwgdmFsdWVzKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoYCR7dHlwZX0tc2NvcmVgKTtcbiAgaWYgKGVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJiBlbGVtZW50ICE9PSBudWxsKSB7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlcy5sYWJlbDtcbiAgfVxufVxuXG4vLyBjaGVjayBpZiBhIHBhcmVudGVsZW1ldCBjb250YWlucyBhIGRvbSBpZFxuLy8gZGVhbHMgd2l0aCBldmVudCBidWJibGluZyBzbyB3ZSBjYW4gY2hlY2tcbi8vIGlmIHRoZSBjaGlsZCBpcyBpbiBhIHNwZWNpZmMgcGFyZW50XG5leHBvcnQgZnVuY3Rpb24gUGFyZW50Q29udGFpbnModGFyZ2V0LCBpZCkge1xuICBmb3IgKGxldCBwID0gdGFyZ2V0ICYmIHRhcmdldC5wYXJlbnRFbGVtZW50OyBwOyBwID0gcC5wYXJlbnRFbGVtZW50KSB7XG4gICAgaWYgKHAuaWQgPT09IGlkKSB7IHJldHVybiB0cnVlOyB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgY29uc3QgZmxhdCA9IFtdO1xuICBhcnIuZm9yRWFjaCgoZCkgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGQpKSB7XG4gICAgICBmbGF0LnB1c2goLi4uZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsYXQucHVzaChkKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZmxhdDtcbn1cblxuLy8gc2V0IHN0YXRlaXRlbXMgaWYgdGhleSBkbyBub3QgZXhpc3Rcbi8vIHdlIHdpbGwgaGF2ZSB0byBhbnkgbmV3IG9uZXMgaWYgYWRkZWQuXG4vLyB0aGlzIHdpbGwgaGVscCB3aGVuIHdlIGFkZGluZyBuZXcgc3RhdGl0ZW1zIFwiYnJlYWtzXCIgdGhlIHdlYnBhZ2VcbmV4cG9ydCBmdW5jdGlvbiBhZGRNaXNzaW5nU3RhdGVJdGVtcygpIHtcbiAgLy8gY2hlY2sgZm9yIGJhc2UgbWFwIGRlZmF1bHQgaXMgRGFya0dyYXlcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnYmFzZW1hcCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnYmFzZW1hcCcsICdEYXJrR3JheScpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIGxhc3RhY3Rpb24gZGVmYXVsdCBpcyBtb3ZlZW5kXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2xhc3RhY3Rpb24nKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ2xhc3RhY3Rpb24nLCAnbW92ZWVuZCcpO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIG1hcENlbnRlciBkZWZhdWx0IGlzIHtsYXQ6IDMyLjc3NjUsIGxuZzogLTc5LjkzMTF9IChjaGFybGVzdG9uIGZvciBub3cpXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcENlbnRlcicpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnbWFwQ2VudGVyJywgeyBsYXQ6IDMyLjc3NjUsIGxuZzogLTc5LjkzMTEgfSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgbWFwTGF5ZXJEaXNwbGF5U3RhdHVzIGRlZmF1bHQgaXMgbGlzdGVkIGJlbG93XG4gIC8vIHRvIGxvbmcgdG8gbGlzdCBhZ2FpblxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXBMYXllckRpc3BsYXlTdGF0dXMnKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ21hcExheWVyRGlzcGxheVN0YXR1cycsIHtcbiAgICAgIEh1YnNUTVM6IGZhbHNlLFxuICAgICAgRXhwb3N1cmVUTVM6IGZhbHNlLFxuICAgICAgQXNzZXRzVE1TOiBmYWxzZSxcbiAgICAgIFRocmVhdHNUTVM6IGZhbHNlLFxuICAgICAgQXF1YXRpY1RNUzogZmFsc2UsXG4gICAgICBUZXJyZXN0cmlhbFRNUzogZmFsc2UsXG4gICAgICBQb3BEZW5zaXR5VE1TOiBmYWxzZSxcbiAgICAgIFNvY1Z1bG5UTVM6IGZhbHNlLFxuICAgICAgQ3JpdGljYWxGYWNpbGl0aWVzVE1TOiBmYWxzZSxcbiAgICAgIENyaXRpY2FsSW5mcmFzdHJ1Y3R1cmVUTVM6IGZhbHNlLFxuICAgICAgRHJhaW5nZVRNUzogZmFsc2UsXG4gICAgICBFcm9zaW9uVE1TOiBmYWxzZSxcbiAgICAgIFNMUlRNUzogZmFsc2UsXG4gICAgICBTdG9ybVN1cmdlVE1TOiBmYWxzZSxcbiAgICAgIEdlb1N0cmVzc1RNUzogZmFsc2UsXG4gICAgICBTbG9wZVRNUzogZmFsc2UsXG4gICAgICBGbG9vZFByb25lQXJlYXNUTVM6IGZhbHNlXG4gICAgfSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWFjb3VudCBkZWZhdWx0IGlzIDBcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXNlcmFyZWFjb3VudCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgndXNlcmFyZWFjb3VudCcsIDApO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIG1hcENlbnRlciBkZWZhdWx0IGlzIHtsYXQ6IDMyLjc3NjUsIGxuZzogLTc5LjkzMTF9IChjaGFybGVzdG9uIGZvciBub3cpXG4gIGlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcFpvb20nKSkpIHtcbiAgICBzdG9yZS5zZXRTdG9yZUl0ZW0oJ21hcFpvb20nLCAxMik7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igc2F2ZWRzaGFwZXMgZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdzYXZlZHNoYXBlcycpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnc2F2ZWRzaGFwZXMnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWEgZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd1c2VyYXJlYScpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgndXNlcmFyZWEnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWFzIGRlZmF1bHQgaXMge30gTlVMTCBvYmplY3RcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXNlcmFyZWFzJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd1c2VyYXJlYXMnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdXNlcmFyZWFfYnVmZmVyZWQgZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd1c2VyYXJlYV9idWZmZXJlZCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgndXNlcmFyZWFfYnVmZmVyZWQnLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igem9uYWxzdGF0c2pzb24gZGVmYXVsdCBpcyB7fSBOVUxMIG9iamVjdFxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd6b25hbHN0YXRzanNvbicpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnem9uYWxzdGF0c2pzb24nLCB7fSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19iYXNlbWFwIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19iYXNlbWFwJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX2Jhc2VtYXAnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19tYXBpbmZvIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19tYXBpbmZvJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX21hcGluZm8nLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19tYXBpbmZvIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ196b25hbHN0YXRzJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX3pvbmFsc3RhdHMnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19zM3JldHJlaXZlIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19zM3JldHJlaXZlJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX3MzcmV0cmVpdmUnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19zZWFyY2ggZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3NlYXJjaCcpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19zZWFyY2gnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19zM3NhdmUgZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd3b3JraW5nX3Mzc2F2ZScpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnd29ya2luZ19zM3NhdmUnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igd29ya2luZ19kcmF3bGF5ZXJzIGRlZmF1bHQgaXMgZmFsc2VcbiAgaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnd29ya2luZ19kcmF3bGF5ZXJzJykpKSB7XG4gICAgc3RvcmUuc2V0U3RvcmVJdGVtKCd3b3JraW5nX2RyYXdsYXllcnMnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBjaGVjayBmb3Igem9uYWxhY3RpdmUgZGVmYXVsdCBpcyBmYWxzZVxuICBpZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd6b25hbGFjdGl2ZScpKSkge1xuICAgIHN0b3JlLnNldFN0b3JlSXRlbSgnem9uYWxhY3RpdmUnLCBbJ25vbmUnLCAnbm9uZSddKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuYXYgY2xhc3M9XFxcIm5hdiBmbGV4LWNvbHVtbiBmbGV4LXNtLXJvd1xcXCIgaWQ9XFxcIm1haW4tbmF2XFxcIiA+XFxuPC9uYXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxhIHJlZj1cXFwibWFpbi1uYXYtcGFnZVxcXCIgaWQ9XFxcIm1haW4tbmF2LXBhZ2VcXFwiIGNsYXNzPVxcXCJuYXYtbGluayBtYWluLW5hdlxcXCIgaHJlZj1cXFwiXFxcIj48L2E+XFxuXCI7Il0sInNvdXJjZVJvb3QiOiIifQ==