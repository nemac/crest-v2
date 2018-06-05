/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/scripts/index.js","vendors~bootstrap~index","vendors~index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/lib/index.js??ref--7-2!./node_modules/sass-loader/lib/loader.js!./src/css/_custom_leaflet.scss":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/postcss-loader/lib??ref--7-2!./node_modules/sass-loader/lib/loader.js!./src/css/_custom_leaflet.scss ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"#map {\\n  height: 400px;\\n  width: 600px;\\n  position: relative;\\n  top: 0;\\n  left: 0; }\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/css/_custom_leaflet.scss?./node_modules/css-loader!./node_modules/postcss-loader/lib??ref--7-2!./node_modules/sass-loader/lib/loader.js");

/***/ }),

/***/ "./src/css/_custom_leaflet.scss":
/*!**************************************!*\
  !*** ./src/css/_custom_leaflet.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/postcss-loader/lib??ref--7-2!../../node_modules/sass-loader/lib/loader.js!./_custom_leaflet.scss */ \"./node_modules/css-loader/index.js!./node_modules/postcss-loader/lib/index.js??ref--7-2!./node_modules/sass-loader/lib/loader.js!./src/css/_custom_leaflet.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/css/_custom_leaflet.scss?");

/***/ }),

/***/ "./src/scripts/components.js":
/*!***********************************!*\
  !*** ./src/scripts/components.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Base component class to provide view ref binding, template insertion, and event listener setup\n */\nvar Component = exports.Component = function () {\n  /** SearchPanel Component Constructor\n   * @param { String } placeholderId - Element ID to inflate the component into\n   * @param { Object } props - Component properties\n   * @param { Object } props.events - Component event listeners\n   * @param { Object } props.data - Component data properties\n   * @param { String } template - HTML template to inflate into placeholder id\n   */\n  function Component(placeholderId) {\n    var _this = this;\n\n    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n    var template = arguments[2];\n\n    _classCallCheck(this, Component);\n\n    this.componentElem = document.getElementById(placeholderId);\n\n    if (template) {\n      // Load template into placeholder element\n      this.componentElem.innerHTML = template;\n\n      // Find all refs in component\n      this.refs = {};\n      var refElems = this.componentElem.querySelectorAll('[ref]');\n      refElems.forEach(function (elem) {\n        _this.refs[elem.getAttribute('ref')] = elem;\n      });\n    }\n\n    if (props.events) {\n      this.createEvents(props.events);\n    }\n  }\n\n  /** Read \"event\" component parameters, and attach event listeners for each */\n\n\n  _createClass(Component, [{\n    key: 'createEvents',\n    value: function createEvents(events) {\n      var _this2 = this;\n\n      Object.keys(events).forEach(function (eventName) {\n        _this2.componentElem.addEventListener(eventName, events[eventName], false);\n      });\n    }\n\n    /** Trigger a component event with the provided \"detail\" payload */\n\n  }, {\n    key: 'triggerEvent',\n    value: function triggerEvent(eventName, detail) {\n      var event = new window.CustomEvent(eventName, { detail: detail });\n      this.componentElem.dispatchEvent(event);\n    }\n  }]);\n\n  return Component;\n}();\n\n//# sourceURL=webpack:///./src/scripts/components.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //\n\n\nvar _map = __webpack_require__(/*! ./map */ \"./src/scripts/map.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ViewController = function () {\n\n  /** Initialize Application */\n  function ViewController() {\n    _classCallCheck(this, ViewController);\n\n    this.initializeComponents();\n  }\n\n  _createClass(ViewController, [{\n    key: 'initializeComponents',\n    value: function initializeComponents() {\n      // Initialize Map\n      this.mapComponent = new _map.Map('map-placeholder');\n    }\n  }]);\n\n  return ViewController;\n}();\n\nwindow.ctrl = new ViewController();\n\n//# sourceURL=webpack:///./src/scripts/index.js?");

/***/ }),

/***/ "./src/scripts/map.js":
/*!****************************!*\
  !*** ./src/scripts/map.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Map = undefined;\n\n__webpack_require__(/*! ../css/_custom_leaflet.scss */ \"./src/css/_custom_leaflet.scss\");\n\nvar _leaflet = __webpack_require__(/*! leaflet */ \"./node_modules/leaflet/dist/leaflet-src.js\");\n\nvar _leaflet2 = _interopRequireDefault(_leaflet);\n\nvar _esriLeaflet = __webpack_require__(/*! esri-leaflet */ \"./node_modules/esri-leaflet/dist/esri-leaflet-debug.js\");\n\nvar _components = __webpack_require__(/*! ./components.js */ \"./src/scripts/components.js\");\n\nvar _EsriLeafletVector = __webpack_require__(/*! ./utils/esri-leaflet-vector/EsriLeafletVector */ \"./src/scripts/utils/esri-leaflet-vector/EsriLeafletVector.js\");\n\nvar vector = _interopRequireWildcard(_EsriLeafletVector);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n//downloaded esri-leaflet-vector to utuls directory so the package worked with webpack es6\n//run updates will have to be manually!\n//see github issue https://github.com/Esri/esri-leaflet-vector/issues/31  from tgirgin23\n\n\nvar template = '<div id=\"map\" ref=\"mapContainer\" class=\"map\"></div>';\n\n/**\n * Leaflet Map Component\n * Render map items, and provide user interactivity.\n * @extends Component\n */\n\nvar Map = exports.Map = function (_Component) {\n  _inherits(Map, _Component);\n\n  /** Map Component Constructor\n   * @param { String } placeholderId Element ID to inflate the map into\n   * @param { Object } props.events.click Map item click listener\n   */\n  function Map(mapPlaceholderId, props) {\n    _classCallCheck(this, Map);\n\n    // Initialize Leaflet map\n    var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this, mapPlaceholderId, props, template));\n\n    _this.map = _leaflet2.default.map(_this.refs.mapContainer, {\n      center: [35.5951, -82.5515],\n      zoom: 13,\n      maxZoom: 18,\n      minZoom: 4\n    });\n\n    _this.map.zoomControl.setPosition('topleft'); // Position zoom control\n    _this.layers = {}; // Map layer dict (key/value = title/layer)\n    _this.selectedRegion = null; // Store currently selected region\n\n    // Render default baselayer\n    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n    //     attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    // }).addTo(this.map);\n\n    // add ESRI vector map\n    var vectorTiles = vector.basemap('DarkGray');\n    vectorTiles.addTo(_this.map);\n\n    return _this;\n  }\n\n  return Map;\n}(_components.Component);\n\n//# sourceURL=webpack:///./src/scripts/map.js?");

/***/ }),

/***/ "./src/scripts/utils/esri-leaflet-vector/Basemap.js":
/*!**********************************************************!*\
  !*** ./src/scripts/utils/esri-leaflet-vector/Basemap.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Basemap = undefined;\nexports.basemap = basemap;\n\nvar _leaflet = __webpack_require__(/*! leaflet */ \"./node_modules/leaflet/dist/leaflet-src.js\");\n\nvar _leaflet2 = _interopRequireDefault(_leaflet);\n\nvar _esriLeaflet = __webpack_require__(/*! esri-leaflet */ \"./node_modules/esri-leaflet/dist/esri-leaflet-debug.js\");\n\nvar _Util = __webpack_require__(/*! ./Util */ \"./src/scripts/utils/esri-leaflet-vector/Util.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Basemap = exports.Basemap = _leaflet2.default.Layer.extend({\n  statics: {\n    URLPREFIX: 'https://www.arcgis.com/sharing/rest/content/items/',\n    URLSUFFIX: '/resources/styles/root.json',\n    STYLES: {\n      'DarkGray': '5e9b3685f4c24d8781073dd928ebda50',\n      'Gray': '291da5eab3a0412593b66d384379f89f',\n      // 'Hybrid': '30d6b8271e1849cd9c3042060001f425', only loads labels\n      'Navigation': '63c47b7177f946b49902c24129b87252',\n      'Streets': 'de26a3cf4cc9451298ea173c4b324736',\n      // 'StreetsNight': '86f556a2d1fd468181855a35e344567f', fails to load\n      'StreetsRelief': 'b266e6d17fc345b498345613930fbd76',\n      'Topographic': '7dc6cea0b1764a1f9af2e679f642f0f5',\n      'Spring': '267f44f08a844c7abee2b62b00600540',\n      'Newspaper': 'dfb04de5f3144a80bc3f9f336228d24a',\n      'MidCentury': '7675d44bb1e4428aa2c30a9b68f97822',\n      'ModernAntique': 'effe3475f05a4d608e66fd6eeb2113c0',\n      'BlackAndWhite': '3161443179244702a5e0449010013b54',\n      'ColoredPencil': '4cf7e1fb9f254dcda9c8fbadb15cf0f8',\n      // 'HumanGeography': '97fa1365da1e43eabb90d0364326bc2d', doesn't load\n      // 'DarkHumanGeography': 'd7397603e9274052808839b70812be50', // loads, but not much\n      'Nova': '75f4dfdff19e445395653121a95a85db'\n    }\n  },\n\n  initialize: function initialize(options) {\n    // L.Layer expects a JSON object literal to be passed in constructor\n    options = {\n      key: options\n    };\n\n    if (typeof options.key === 'string' && Basemap.STYLES[options.key]) {\n      var url = Basemap.URLPREFIX + Basemap.STYLES[options.key] + Basemap.URLSUFFIX;\n      (0, _Util.fetchMetadata)(url, this);\n    } else {\n      throw new Error('L.esri.Vector.Basemap: Invalid parameter. Use one of \"DarkGray\", \"Gray\", \"Hybrid\", \"Navigation\", \"Streets\", \"StreetsNight\", \"StreetsRelief\", \"Topographic\"');\n    }\n  },\n\n  onAdd: function onAdd(map) {\n    this._map = map;\n    _esriLeaflet.Util.setEsriAttribution(map);\n\n    if (map.attributionControl) {\n      // 95% sure this is the right static attribution url\n      _esriLeaflet.Util._getAttributionData('https://static.arcgis.com/attribution/World_Street_Map', map);\n      map.attributionControl.addAttribution('<span class=\"esri-dynamic-attribution\">USGS, NOAA</span>');\n    }\n\n    if (this._ready) {\n      this._asyncAdd();\n    } else {\n      this.once('ready', function () {\n        this._asyncAdd();\n      }, this);\n    }\n  },\n\n  onRemove: function onRemove(map) {\n    map.off('moveend', _esriLeaflet.Util._updateMapAttribution);\n    map.removeLayer(this._mapboxGL);\n\n    if (map.attributionControl) {\n      var vectorAttribution = document.getElementsByClassName('esri-dynamic-attribution')[0].outerHTML;\n      // this doesn't work, not sure why.\n      map.attributionControl.removeAttribution(vectorAttribution);\n    }\n  },\n\n  _asyncAdd: function _asyncAdd() {\n    var map = this._map;\n    // thought it was just me, but apparently its not easy to mixin two different styles\n    // https://github.com/mapbox/mapbox-gl-js/issues/4000\n\n    // set the background color of the map to the background color of the tiles\n    map.getContainer().style.background = this._mapboxGL.options.style.layers[0].paint['background-color'];\n\n    map.on('moveend', _esriLeaflet.Util._updateMapAttribution);\n    this._mapboxGL.addTo(map, this);\n    // map._gl = this._mapboxGL;\n  }\n});\n\nfunction basemap(key) {\n  return new Basemap(key);\n}\n\nexports.default = Basemap;\n\n//# sourceURL=webpack:///./src/scripts/utils/esri-leaflet-vector/Basemap.js?");

/***/ }),

/***/ "./src/scripts/utils/esri-leaflet-vector/EsriLeafletVector.js":
/*!********************************************************************!*\
  !*** ./src/scripts/utils/esri-leaflet-vector/EsriLeafletVector.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Basemap = __webpack_require__(/*! ./Basemap */ \"./src/scripts/utils/esri-leaflet-vector/Basemap.js\");\n\nObject.defineProperty(exports, 'Basemap', {\n  enumerable: true,\n  get: function get() {\n    return _Basemap.Basemap;\n  }\n});\nObject.defineProperty(exports, 'basemap', {\n  enumerable: true,\n  get: function get() {\n    return _Basemap.basemap;\n  }\n});\n\nvar _Layer = __webpack_require__(/*! ./Layer */ \"./src/scripts/utils/esri-leaflet-vector/Layer.js\");\n\nObject.defineProperty(exports, 'Layer', {\n  enumerable: true,\n  get: function get() {\n    return _Layer.Layer;\n  }\n});\nObject.defineProperty(exports, 'layer', {\n  enumerable: true,\n  get: function get() {\n    return _Layer.layer;\n  }\n});\n\n//# sourceURL=webpack:///./src/scripts/utils/esri-leaflet-vector/EsriLeafletVector.js?");

/***/ }),

/***/ "./src/scripts/utils/esri-leaflet-vector/Layer.js":
/*!********************************************************!*\
  !*** ./src/scripts/utils/esri-leaflet-vector/Layer.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Layer = undefined;\nexports.layer = layer;\n\nvar _leaflet = __webpack_require__(/*! leaflet */ \"./node_modules/leaflet/dist/leaflet-src.js\");\n\nvar _leaflet2 = _interopRequireDefault(_leaflet);\n\nvar _esriLeaflet = __webpack_require__(/*! esri-leaflet */ \"./node_modules/esri-leaflet/dist/esri-leaflet-debug.js\");\n\nvar _Util = __webpack_require__(/*! ./Util */ \"./src/scripts/utils/esri-leaflet-vector/Util.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Layer = exports.Layer = _leaflet2.default.Layer.extend({\n  statics: {\n    URLPREFIX: 'https://www.arcgis.com/sharing/rest/content/items/'\n  },\n\n  initialize: function initialize(options) {\n    // L.Layer expects a JSON object literal to be passed in constructor\n    options = {\n      id: options\n    };\n\n    if (typeof options.id === 'string') {\n      var itemMetadataUrl = Layer.URLPREFIX + options.id;\n      var tileUrl;\n      var styleUrl;\n\n      (0, _esriLeaflet.request)(itemMetadataUrl, {}, function (error, metadata) {\n        if (!error) {\n          tileUrl = metadata.url;\n\n          // custom tileset published using ArcGIS Pro\n          if (tileUrl.indexOf('basemaps.arcgis.com') === -1) {\n            this._customTileset = true;\n            // if copyright info was published, display it.\n            if (metadata.accessInformation) {\n              this._copyrightText = metadata.accessInformation;\n            }\n            (0, _esriLeaflet.request)(tileUrl, {}, function (error, tileMetadata) {\n              if (!error) {\n                // right now ArcGIS Pro published vector services have a slightly different signature\n                if (tileMetadata.defaultStyles.charAt(0) !== '/') {\n                  tileMetadata.defaultStyles = '/' + tileMetadata.defaultStyles;\n                }\n\n                styleUrl = tileUrl + tileMetadata.defaultStyles + '/root.json';\n                (0, _esriLeaflet.request)(styleUrl, {}, function (error, style) {\n                  if (!error) {\n                    (0, _Util.formatStyle)(style, tileMetadata, styleUrl);\n\n                    this._mapboxGL = _leaflet2.default.mapboxGL({\n                      accessToken: 'ezree',\n                      style: style\n                    });\n\n                    this._ready = true;\n                    this.fire('ready', {}, true);\n                  }\n                }, this);\n              }\n            }, this);\n          } else {\n            // custom symbology applied to hosted basemap tiles\n            (0, _Util.fetchMetadata)(itemMetadataUrl + '/resources/styles/root.json', this);\n          }\n        }\n      }, this);\n    } else {\n      throw new Error('L.esri.Vector.Layer: Invalid parameter. Use the id of an ArcGIS Online vector tile item');\n    }\n  },\n\n  onAdd: function onAdd(map) {\n    this._map = map;\n    _esriLeaflet.Util.setEsriAttribution(map);\n\n    if (this._ready) {\n      this._asyncAdd();\n    } else {\n      this.once('ready', function () {\n        this._asyncAdd();\n      }, this);\n    }\n  },\n\n  onRemove: function onRemove(map) {\n    map.off('moveend', _esriLeaflet.Util._updateMapAttribution);\n    map.removeLayer(this._mapboxGL);\n\n    if (map.attributionControl) {\n      var vectorAttribution = document.getElementsByClassName('esri-dynamic-attribution')[0].outerHTML;\n      // this doesn't work, not sure why.\n      map.attributionControl.removeAttribution(vectorAttribution);\n    }\n  },\n\n  _asyncAdd: function _asyncAdd() {\n    var map = this._map;\n    if (map.attributionControl) {\n      if (this._customTileset) {\n        if (this._copyrightText) {\n          // pull static copyright text for services published with Pro\n          map.attributionControl.addAttribution('<span class=\"esri-dynamic-attribution\">' + this._copyrightText + '</span>');\n        }\n      } else {\n        // provide dynamic attribution for Esri basemaps\n        _esriLeaflet.Util._getAttributionData('https://static.arcgis.com/attribution/World_Street_Map', map);\n        map.attributionControl.addAttribution('<span class=\"esri-dynamic-attribution\">USGS, NOAA</span>');\n        map.on('moveend', _esriLeaflet.Util._updateMapAttribution);\n      }\n    }\n\n    // set the background color of the map to the background color of the tiles\n    map.getContainer().style.background = this._mapboxGL.options.style.layers[0].paint['background-color'];\n    this._mapboxGL.addTo(map, this);\n  }\n});\n\nfunction layer(id) {\n  return new Layer(id);\n}\n\nexports.default = Layer;\n\n//# sourceURL=webpack:///./src/scripts/utils/esri-leaflet-vector/Layer.js?");

/***/ }),

/***/ "./src/scripts/utils/esri-leaflet-vector/Util.js":
/*!*******************************************************!*\
  !*** ./src/scripts/utils/esri-leaflet-vector/Util.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Util = undefined;\nexports.fetchMetadata = fetchMetadata;\nexports.formatStyle = formatStyle;\n\nvar _leaflet = __webpack_require__(/*! leaflet */ \"./node_modules/leaflet/dist/leaflet-src.js\");\n\nvar _leaflet2 = _interopRequireDefault(_leaflet);\n\n__webpack_require__(/*! mapbox-gl */ \"./node_modules/mapbox-gl/dist/mapbox-gl.js\");\n\n__webpack_require__(/*! ./leaflet-mapbox-gl */ \"./src/scripts/utils/esri-leaflet-vector/leaflet-mapbox-gl.js\");\n\nvar _esriLeaflet = __webpack_require__(/*! esri-leaflet */ \"./node_modules/esri-leaflet/dist/esri-leaflet-debug.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//import downloaded mapbox-gl leaflet (this is for esri vector maps)\nfunction fetchMetadata(url, context) {\n  (0, _esriLeaflet.request)(url, {}, function (error, style) {\n    if (!error) {\n      (0, _esriLeaflet.request)(style.sources.esri.url, {}, function (error, tileMetadata) {\n        if (!error) {\n          formatStyle(style, tileMetadata, url);\n          context._mapboxGL = _leaflet2.default.mapboxGL({\n            accessToken: 'ezree',\n            style: style\n          });\n\n          context._ready = true;\n          context.fire('ready', {}, true);\n        }\n      }, context);\n    } else {\n      throw new Error('Unable to fetch vector tile style metadata');\n    }\n  }, context);\n}\n\nfunction formatStyle(style, metadata, styleUrl) {\n  // if a relative path is referenced, the default style can be found in a standard location\n  if (style.sources.esri.url && style.sources.esri.url.indexOf('http') === -1) {\n    style.sources.esri.url = styleUrl.replace('/resources/styles/root.json', '');\n  }\n\n  // right now ArcGIS Pro published vector services have a slightly different signature\n  if (metadata.tiles && metadata.tiles[0].charAt(0) !== '/') {\n    metadata.tiles[0] = '/' + metadata.tiles[0];\n  }\n\n  if (metadata.tileMap && metadata.tileMap.charAt(0) !== '/') {\n    metadata.tileMap = '/' + metadata.tileMap;\n  }\n\n  style.sources.esri = {\n    type: 'vector',\n    scheme: 'xyz',\n    tilejson: metadata.tilejson || '2.0.0',\n    format: metadata.tileInfo && metadata.tileInfo.format || 'pbf',\n    index: metadata.tileMap ? style.sources.esri.url + metadata.tileMap : null,\n    tiles: [style.sources.esri.url + metadata.tiles[0]],\n    description: metadata.description,\n    name: metadata.name\n  };\n\n  if (style.glyphs.indexOf('http') === -1) {\n    // set paths to sprite and glyphs\n    style.glyphs = styleUrl.replace('styles/root.json', style.glyphs.replace('../', ''));\n    style.sprite = styleUrl.replace('styles/root.json', style.sprite.replace('../', ''));\n  }\n}\n\nvar Util = exports.Util = {\n  fetchMetadata: fetchMetadata,\n  formatStyle: formatStyle\n};\n\nexports.default = Util;\n\n//# sourceURL=webpack:///./src/scripts/utils/esri-leaflet-vector/Util.js?");

/***/ }),

/***/ "./src/scripts/utils/esri-leaflet-vector/leaflet-mapbox-gl.js":
/*!********************************************************************!*\
  !*** ./src/scripts/utils/esri-leaflet-vector/leaflet-mapbox-gl.js ***!
  \********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mapbox-gl */ \"./node_modules/mapbox-gl/dist/mapbox-gl.js\");\n/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet */ \"./node_modules/leaflet/dist/leaflet-src.js\");\n/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);\n//import mapbox-gl\n\n\n\nleaflet__WEBPACK_IMPORTED_MODULE_1___default.a.MapboxGL = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Layer.extend({\n    options: {\n      updateInterval: 32\n    },\n\n    initialize: function (options) {\n        leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.setOptions(this, options);\n\n        if (options.accessToken) {\n            mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default.a.accessToken = options.accessToken;\n        } else {\n            throw new Error('You should provide a Mapbox GL access token as a token option.');\n        }\n\n         /**\n         * Create a version of `fn` that only fires once every `time` millseconds.\n         *\n         * @param {Function} fn the function to be throttled\n         * @param {number} time millseconds required between function calls\n         * @param {*} context the value of `this` with which the function is called\n         * @returns {Function} debounced function\n         * @private\n         */\n        var throttle = function (fn, time, context) {\n            var lock, args, wrapperFn, later;\n\n            later = function () {\n                // reset lock and call if queued\n                lock = false;\n                if (args) {\n                    wrapperFn.apply(context, args);\n                    args = false;\n                }\n            };\n\n            wrapperFn = function () {\n                if (lock) {\n                    // called too soon, queue to call later\n                    args = arguments;\n\n                } else {\n                    // call and lock until later\n                    fn.apply(context, arguments);\n                    setTimeout(later, time);\n                    lock = true;\n                }\n            };\n\n            return wrapperFn;\n        };\n\n        // setup throttling the update event when panning\n        this._throttledUpdate = throttle(leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.bind(this._update, this), this.options.updateInterval);\n    },\n\n    onAdd: function (map) {\n        if (!this._glContainer) {\n            this._initContainer();\n        }\n\n        map._panes.tilePane.appendChild(this._glContainer);\n\n        this._initGL();\n\n        this._offset = this._map.containerPointToLayerPoint([0, 0]);\n\n        // work around https://github.com/mapbox/mapbox-gl-leaflet/issues/47\n        if (map.options.zoomAnimation) {\n            leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomEvent.on(map._proxy, leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.TRANSITION_END, this._transitionEnd, this);\n        }\n    },\n\n    onRemove: function (map) {\n        if (this._map.options.zoomAnimation) {\n            leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomEvent.off(this._map._proxy, leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.TRANSITION_END, this._transitionEnd, this);\n        }\n\n        map.getPanes().tilePane.removeChild(this._glContainer);\n        this._glMap.remove();\n        this._glMap = null;\n    },\n\n    getEvents: function () {\n        return {\n            move: this._throttledUpdate, // sensibly throttle updating while panning\n            zoomanim: this._animateZoom, // applys the zoom animation to the <canvas>\n            zoom: this._pinchZoom, // animate every zoom event for smoother pinch-zooming\n            zoomstart: this._zoomStart, // flag starting a zoom to disable panning\n            zoomend: this._zoomEnd\n        };\n    },\n\n    _initContainer: function () {\n        var container = this._glContainer = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.create('div', 'leaflet-gl-layer');\n\n        var size = this._map.getSize();\n        container.style.width  = size.x + 'px';\n        container.style.height = size.y + 'px';\n    },\n\n    _initGL: function () {\n        var center = this._map.getCenter();\n\n        var options = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.extend({}, this.options, {\n            container: this._glContainer,\n            interactive: false,\n            center: [center.lng, center.lat],\n            zoom: this._map.getZoom() - 1,\n            attributionControl: false\n        });\n\n        this._glMap = new mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default.a.Map(options);\n\n        // allow GL base map to pan beyond min/max latitudes\n        this._glMap.transform.latRange = null;\n\n        if (this._glMap._canvas.canvas) {\n            // older versions of mapbox-gl surfaced the canvas differently\n            this._glMap._actualCanvas = this._glMap._canvas.canvas;\n        } else {\n            this._glMap._actualCanvas = this._glMap._canvas;\n        }\n\n        // treat child <canvas> element like L.ImageOverlay\n        leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.addClass(this._glMap._actualCanvas, 'leaflet-image-layer');\n        leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.addClass(this._glMap._actualCanvas, 'leaflet-zoom-animated');\n\n    },\n\n    _update: function (e) {\n        // update the offset so we can correct for it later when we zoom\n        this._offset = this._map.containerPointToLayerPoint([0, 0]);\n\n        if (this._zooming) {\n          return;\n        }\n\n        var size = this._map.getSize(),\n            container = this._glContainer,\n            gl = this._glMap,\n            topLeft = this._map.containerPointToLayerPoint([0, 0]);\n\n        leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.setPosition(container, topLeft);\n\n        var center = this._map.getCenter();\n\n        // gl.setView([center.lat, center.lng], this._map.getZoom() - 1, 0);\n        // calling setView directly causes sync issues because it uses requestAnimFrame\n\n        var tr = gl.transform;\n        tr.center = mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default.a.LngLat.convert([center.lng, center.lat]);\n        tr.zoom = this._map.getZoom() - 1;\n\n        if (gl.transform.width !== size.x || gl.transform.height !== size.y) {\n            container.style.width  = size.x + 'px';\n            container.style.height = size.y + 'px';\n            if (gl._resize !== null && gl._resize !== undefined){\n                gl._resize();\n            } else {\n                gl.resize();\n            }\n        } else {\n            // older versions of mapbox-gl surfaced update publicly\n            if (gl._update !== null && gl._update !== undefined){\n                gl._update();\n            } else {\n                gl.update();\n            }\n        }\n    },\n\n    // update the map constantly during a pinch zoom\n    _pinchZoom: function (e) {\n      this._glMap.jumpTo({\n        zoom: this._map.getZoom() - 1,\n        center: this._map.getCenter()\n      });\n    },\n\n    // borrowed from L.ImageOverlay https://github.com/Leaflet/Leaflet/blob/master/src/layer/ImageOverlay.js#L139-L144\n    _animateZoom: function (e) {\n      var scale = this._map.getZoomScale(e.zoom),\n          offset = this._map._latLngToNewLayerPoint(this._map.getBounds().getNorthWest(), e.zoom, e.center);\n\n      leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.setTransform(this._glMap._actualCanvas, offset.subtract(this._offset), scale);\n    },\n\n    _zoomStart: function (e) {\n      this._zooming = true;\n    },\n\n    _zoomEnd: function () {\n      var scale = this._map.getZoomScale(this._map.getZoom()),\n          offset = this._map._latLngToNewLayerPoint(this._map.getBounds().getNorthWest(), this._map.getZoom(), this._map.getCenter());\n\n      leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.setTransform(this._glMap._actualCanvas, offset.subtract(this._offset), scale);\n\n      this._zooming = false;\n    },\n\n    _transitionEnd: function (e) {\n      leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.requestAnimFrame(function () {\n          var zoom = this._map.getZoom(),\n          center = this._map.getCenter(),\n          offset = this._map.latLngToContainerPoint(this._map.getBounds().getNorthWest());\n\n          // reset the scale and offset\n          leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.setTransform(this._glMap._actualCanvas, offset, 1);\n\n          // enable panning once the gl map is ready again\n          this._glMap.once('moveend', leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.bind(function () {\n              this._zoomEnd();\n          }, this));\n\n          // update the map position\n          this._glMap.jumpTo({\n              center: center,\n              zoom: zoom - 1\n          });\n      }, this);\n    }\n});\n\nleaflet__WEBPACK_IMPORTED_MODULE_1___default.a.mapboxGL = function (options) {\n    return new leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.MapboxGL(options);\n};\n\n\n//# sourceURL=webpack:///./src/scripts/utils/esri-leaflet-vector/leaflet-mapbox-gl.js?");

/***/ })

/******/ });