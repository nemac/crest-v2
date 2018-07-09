(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["download~index"],{

/***/ "./src/config/navConfig.js":
/*!*********************************!*\
  !*** ./src/config/navConfig.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar navConfig = exports.navConfig = {\n  navs: [{\n    name: \"home\",\n    ref: \"main-nav-map\",\n    text: \"Home\",\n    id: \"main-nav-map\",\n    href: \"./#Home\"\n  }, {\n    name: \"download\",\n    ref: \"main-nav-download\",\n    text: \"Download Data\",\n    id: \"main-nav-download\",\n    href: \"./#Download\"\n  }, {\n    name: \"about\",\n    ref: \"main-nav-about\",\n    text: \"About\",\n    id: \"main-nav-about\",\n    href: \"./#About\"\n  }]\n};\n\n//# sourceURL=webpack:///./src/config/navConfig.js?");

/***/ }),

/***/ "./src/scripts/components.js":
/*!***********************************!*\
  !*** ./src/scripts/components.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Base component class to provide view ref binding, template insertion, and event listener setup\n */\nvar Component = exports.Component = function () {\n  /**\n   * Component Constructor\n   * @param { String } placeholderId - Element ID to inflate the component into\n   * @param { Object } props - Component properties\n   * @param { Object } props.events - Component event listeners\n   * @param { Object } props.data - Component data properties\n   * @param { String } template - HTML template to inflate into placeholder id\n   */\n  function Component(placeholderId) {\n    var _this = this;\n\n    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n    var template = arguments[2];\n\n    _classCallCheck(this, Component);\n\n    this.componentElem = document.getElementById(placeholderId);\n\n    if (template) {\n      this.componentElem.addEventListener('load', function () {\n        console.log('hi');\n      });\n\n      // Load template into placeholder element\n      this.componentElem.innerHTML = template;\n      this.componentElem.addEventListener('unload', function () {\n        console.log('bye bye');\n      });\n      // Find all refs in component\n      this.refs = {};\n      var refElems = this.componentElem.querySelectorAll('[ref]');\n      refElems.forEach(function (elem) {\n        _this.refs[elem.getAttribute('ref')] = elem;\n      });\n    }\n\n    if (props.events) {\n      this.createEvents(props.events);\n    }\n  }\n\n  /** Read \"event\" component parameters, and attach event listeners for each */\n\n\n  _createClass(Component, [{\n    key: 'createEvents',\n    value: function createEvents(events) {\n      var _this2 = this;\n\n      Object.keys(events).forEach(function (eventName) {\n        _this2.componentElem.addEventListener(eventName, events[eventName], false);\n      });\n    }\n\n    /** Trigger a component event with the provided \"detail\" payload */\n\n  }, {\n    key: 'triggerEvent',\n    value: function triggerEvent(eventName, detail) {\n      var event = new window.CustomEvent(eventName, { detail: detail });\n      this.componentElem.dispatchEvent(event);\n    }\n  }]);\n\n  return Component;\n}();\n\n//# sourceURL=webpack:///./src/scripts/components.js?");

/***/ }),

/***/ "./src/scripts/domUtils.js":
/*!*********************************!*\
  !*** ./src/scripts/domUtils.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.toggleElementDisplay = toggleElementDisplay;\n/**\n * update the display of element\n *  @param { Object } element - Element object from click event, used to toggle\n *                   display state\n */\nfunction toggleElementDisplay(thisEle, elements) {\n  /**\n   * TODO: Replace map with forEach or equivalent function. The purpose of map\n   * is to iterate over each element in an array to create a new array. This is\n   * only iterating over each element in an array.\n   */\n  elements.map(function (ele) {\n    var name = ele.replace('main_nav_', '');\n    var tabEle = document.querySelector('[ref=\"tab-' + name + '\"]');\n    var mapClass = tabEle.className;\n    var newMapClass = mapClass + (mapClass.indexOf(' d-none') > 0) ? ' ' : 'd-none';\n    console.log(name, newMapClass);\n\n    tabEle.className = newMapClass;\n  });\n\n  // let element = document.querySelector(`[ref=\"tab-${elementName}\"]`);\n  // console.log(`[ref=\"tab_${elementName}\"]`)\n  // const mapClass = thisEle.componentElem.className;\n  // console.log(thisEle)\n  // if(mapClass.indexOf(' d-none') > 0){\n  //   console.log('here')\n  //   element.className = mapClass.replace(' d-none','');\n  // } else {\n  //   console.log('not here')\n  //\n  //   element.className = mapClass + ' d-none';\n  // }\n\n  // return element\n}\n\n//# sourceURL=webpack:///./src/scripts/domUtils.js?");

/***/ }),

/***/ "./src/scripts/nav_bar.js":
/*!********************************!*\
  !*** ./src/scripts/nav_bar.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.nav_bar = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _nav_bar = __webpack_require__(/*! ../templates/nav_bar.html */ \"./src/templates/nav_bar.html\");\n\nvar _nav_bar2 = _interopRequireDefault(_nav_bar);\n\nvar _nav_bar_nav = __webpack_require__(/*! ../templates/nav_bar_nav.html */ \"./src/templates/nav_bar_nav.html\");\n\nvar _nav_bar_nav2 = _interopRequireDefault(_nav_bar_nav);\n\nvar _components = __webpack_require__(/*! ./components */ \"./src/scripts/components.js\");\n\nvar _navConfig = __webpack_require__(/*! ../config/navConfig */ \"./src/config/navConfig.js\");\n\nvar _domUtils = __webpack_require__(/*! ./domUtils */ \"./src/scripts/domUtils.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // default map template\n\n\n/**\n * nav_bar Component\n * Render and control map layer control\n */\nvar nav_bar = exports.nav_bar = function (_Component) {\n  _inherits(nav_bar, _Component);\n\n  function nav_bar(placeholderId, props) {\n    _classCallCheck(this, nav_bar);\n\n    /**\n     * get nav configuration\n     */\n    var _this = _possibleConstructorReturn(this, (nav_bar.__proto__ || Object.getPrototypeOf(nav_bar)).call(this, placeholderId, props, _nav_bar2.default));\n\n    _this.navConfig = _navConfig.navConfig;\n\n    _this.activeNav = '';\n\n    // get the main nav element\n    var navHeaderElement = document.getElementById('main-nav');\n\n    /**\n     *  iterate each nav and add it to the ui\n     */\n    var cnt = 1;\n    _navConfig.navConfig.navs.map(function (nav) {\n      var navInnerHTML = navHeaderElement.innerHTML;\n      navHeaderElement.innerHTML = navInnerHTML + _nav_bar_nav2.default;\n\n      var navElement = document.getElementById('main-nav-page');\n\n      // first tab is always active\n      if (cnt === 1) {\n        navElement.className += ' active';\n      }\n\n      navElement.setAttribute('ref', nav.ref); // nav ref\n      navElement.setAttribute('href', nav.href); // nav href\n      navElement.setAttribute('id', nav.id); // nav id\n      navElement.textContent = nav.text; // nav text\n\n      cnt += 1;\n    });\n\n    // add click event for active toggle\n    _this.addTabClick();\n    return _this;\n  }\n\n  _createClass(nav_bar, [{\n    key: 'addTabClick',\n    value: function addTabClick() {\n      var _this2 = this;\n\n      _navConfig.navConfig.navs.map(function (nav) {\n        var el = document.getElementById(nav.id);\n        el.addEventListener('click', function (e) {\n          _this2.deactivateAllNavs();\n          _this2.toggleTabContent(e.target.id);\n          var ele = e.target;\n          ele.className += ' active';\n\n          // add to store later\n          _this2.activeNav = nav.id;\n        });\n      });\n    }\n  }, {\n    key: 'tabUpdate',\n    value: function tabUpdate(id) {\n      this.deactivateAllNavs();\n      var el = document.getElementById(id);\n      el.className = el.className + ' active';\n    }\n  }, {\n    key: 'deactivateAllNavs',\n    value: function deactivateAllNavs() {\n      _navConfig.navConfig.navs.map(function (nav) {\n        var el = document.getElementById(nav.id);\n        el.className = el.className.replace(' active', '');\n      });\n    }\n  }, {\n    key: 'toggleTabContent',\n    value: function toggleTabContent(id) {\n      this.resetTabContent();\n      var el = document.getElementById('tab-' + id);\n      el.className = el.className.replace(' d-none', '');\n    }\n  }, {\n    key: 'resetTabContent',\n    value: function resetTabContent() {\n      _navConfig.navConfig.navs.map(function (nav) {\n        var el = document.getElementById('tab-' + nav.id);\n        el.className = el.className.replace(' d-none', '');\n        el.className += ' d-none';\n      });\n\n      // not found in case it was revealed.\n      var el = document.getElementById('tab-main-nav-notfound');\n      el.className = el.className.replace(' d-none', '');\n      el.className += ' d-none';\n    }\n  }]);\n\n  return nav_bar;\n}(_components.Component);\n\n//# sourceURL=webpack:///./src/scripts/nav_bar.js?");

/***/ }),

/***/ "./src/templates/nav_bar.html":
/*!************************************!*\
  !*** ./src/templates/nav_bar.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<nav class=\\\"nav flex-column flex-sm-row\\\" id=\\\"main-nav\\\" >\\n</nav>\\n\";\n\n//# sourceURL=webpack:///./src/templates/nav_bar.html?");

/***/ }),

/***/ "./src/templates/nav_bar_nav.html":
/*!****************************************!*\
  !*** ./src/templates/nav_bar_nav.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<a ref=\\\"main-nav-page\\\" id=\\\"main-nav-page\\\" class=\\\"nav-link main-nav\\\" href=\\\"\\\"></a>\\n\";\n\n//# sourceURL=webpack:///./src/templates/nav_bar_nav.html?");

/***/ })

}]);