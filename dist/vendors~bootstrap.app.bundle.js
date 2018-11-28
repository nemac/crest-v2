(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~bootstrap"],{

/***/ "./node_modules/bootstrap/dist/js/bootstrap.js":
/*!*****************************************************!*\
  !*** ./node_modules/bootstrap/dist/js/bootstrap.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
  * Bootstrap v4.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
   true ? factory(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js")) :
  undefined;
}(this, (function (exports,$,Popper) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Util = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($$$1(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined; // eslint-disable-line no-undefined
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $$$1(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }

    function setTransitionEndSupport() {
      $$$1.fn.emulateTransitionEnd = transitionEndEmulator;
      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));

        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector || selector === '#') {
          selector = element.getAttribute('href') || '';
        }

        try {
          return document.querySelector(selector) ? selector : null;
        } catch (err) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element


        var transitionDuration = $$$1(element).css('transition-duration');
        var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found

        if (!floatTransitionDuration) {
          return 0;
        } // If multiple durations are defined, take the first


        transitionDuration = transitionDuration.split(',')[0];
        return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $$$1(element).trigger(TRANSITION_END);
      },
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
            }
          }
        }
      }
    };
    setTransitionEndSupport();
    return Util;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Alert = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'alert';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
      CLOSE: "close" + EVENT_KEY,
      CLOSED: "closed" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Alert =
    /*#__PURE__*/
    function () {
      function Alert(element) {
        this._element = element;
      } // Getters


      var _proto = Alert.prototype;

      // Public
      _proto.close = function close(element) {
        var rootElement = this._element;

        if (element) {
          rootElement = this._getRootElement(element);
        }

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = document.querySelector(selector);
        }

        if (!parent) {
          parent = $$$1(element).closest("." + ClassName.ALERT)[0];
        }

        return parent;
      };

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $$$1.Event(Event.CLOSE);
        $$$1(element).trigger(closeEvent);
        return closeEvent;
      };

      _proto._removeElement = function _removeElement(element) {
        var _this = this;

        $$$1(element).removeClass(ClassName.SHOW);

        if (!$$$1(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);

          return;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $$$1(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };

      _proto._destroyElement = function _destroyElement(element) {
        $$$1(element).detach().trigger(Event.CLOSED).remove();
      }; // Static


      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $$$1(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Alert._jQueryInterface;
    $$$1.fn[NAME].Constructor = Alert;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Button = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'button';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };
    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };
    var Event = {
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters


      var _proto = Button.prototype;

      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = this._element.querySelector(Selector.INPUT);

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(Selector.ACTIVE);

                if (activeElement) {
                  $$$1(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }

              input.checked = !this._element.classList.contains(ClassName.ACTIVE);
              $$$1(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $$$1(this._element).toggleClass(ClassName.ACTIVE);
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Static


      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $$$1(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Button;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();
      var button = event.target;

      if (!$$$1(button).hasClass(ClassName.BUTTON)) {
        button = $$$1(button).closest(Selector.BUTTON);
      }

      Button._jQueryInterface.call($$$1(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $$$1(event.target).closest(Selector.BUTTON)[0];
      $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Button._jQueryInterface;
    $$$1.fn[NAME].Constructor = Button;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Carousel = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'carousel';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };
    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };
    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };
    var Event = {
      SLIDE: "slide" + EVENT_KEY,
      SLID: "slid" + EVENT_KEY,
      KEYDOWN: "keydown" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY,
      TOUCHEND: "touchend" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item'
    };
    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this._config = this._getConfig(config);
        this._element = $$$1(element)[0];
        this._indicatorsElement = this._element.querySelector(Selector.INDICATORS);

        this._addEventListeners();
      } // Getters


      var _proto = Carousel.prototype;

      // Public
      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };

      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };

      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (this._element.querySelector(Selector.NEXT_PREV)) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      _proto.to = function to(index) {
        var _this = this;

        this._activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $$$1(this._element).one(Event.SLID, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      };

      _proto.dispose = function dispose() {
        $$$1(this._element).off(EVENT_KEY);
        $$$1.removeData(this._element, DATA_KEY);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;

        if (this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          $$$1(this._element).on(Event.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });

          if ('ontouchstart' in document.documentElement) {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $$$1(this._element).on(Event.TOUCHEND, function () {
              _this2.pause();

              if (_this2.touchTimeout) {
                clearTimeout(_this2.touchTimeout);
              }

              _this2.touchTimeout = setTimeout(function (event) {
                return _this2.cycle(event);
              }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
            });
          }
        }
      };

      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;

          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;

          default:
        }
      };

      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector.ITEM)) : [];
        return this._items.indexOf(element);
      };

      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;

        var activeIndex = this._getItemIndex(activeElement);

        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(this._element.querySelector(Selector.ACTIVE_ITEM));

        var slideEvent = $$$1.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        $$$1(this._element).trigger(slideEvent);
        return slideEvent;
      };

      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector.ACTIVE));
          $$$1(indicators).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $$$1(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      };

      _proto._slide = function _slide(direction, element) {
        var _this3 = this;

        var activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $$$1.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });

        if ($$$1(this._element).hasClass(ClassName.SLIDE)) {
          $$$1(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          $$$1(activeElement).addClass(directionalClassName);
          $$$1(nextElement).addClass(directionalClassName);
          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          $$$1(activeElement).one(Util.TRANSITION_END, function () {
            $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
            $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this3._isSliding = false;
            setTimeout(function () {
              return $$$1(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          $$$1(activeElement).removeClass(ClassName.ACTIVE);
          $$$1(nextElement).addClass(ClassName.ACTIVE);
          this._isSliding = false;
          $$$1(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }; // Static


      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data());

          if (typeof config === 'object') {
            _config = _objectSpread({}, _config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }

            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $$$1(selector)[0];

        if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = _objectSpread({}, $$$1(target).data(), $$$1(this).data());

        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($$$1(target), config);

        if (slideIndex) {
          $$$1(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var carousels = [].slice.call(document.querySelectorAll(Selector.DATA_RIDE));

      for (var i = 0, len = carousels.length; i < len; i++) {
        var $carousel = $$$1(carousels[i]);

        Carousel._jQueryInterface.call($carousel, $carousel.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Carousel._jQueryInterface;
    $$$1.fn[NAME].Constructor = Carousel;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Collapse = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapse';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      toggle: true,
      parent: ''
    };
    var DefaultType = {
      toggle: 'boolean',
      parent: '(string|element)'
    };
    var Event = {
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };
    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };
    var Selector = {
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $$$1.makeArray(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggleList.length; i < len; i++) {
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
            return foundElem === element;
          });

          if (selector !== null && filterElement.length > 0) {
            this._selector = selector;

            this._triggerArray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters


      var _proto = Collapse.prototype;

      // Public
      _proto.toggle = function toggle() {
        if ($$$1(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(Selector.ACTIVES)).filter(function (elem) {
            return elem.getAttribute('data-parent') === _this._config.parent;
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $$$1.Event(Event.SHOW);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

          if (!activesData) {
            $$$1(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          $$$1(_this._element).trigger(Event.SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var startEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) {
              var $elem = $$$1([].slice.call(document.querySelectorAll(selector)));

              if (!$elem.hasClass(ClassName.SHOW)) {
                $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);

          $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getDimension = function _getDimension() {
        var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      _proto._getParent = function _getParent() {
        var _this3 = this;

        var parent = null;

        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object

          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.querySelector(this._config.parent);
        }

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        $$$1(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $$$1(element).hasClass(ClassName.SHOW);

          if (triggerArray.length) {
            $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }; // Static


      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          var _config = _objectSpread({}, Default, $this.data(), typeof config === 'object' && config ? config : {});

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Collapse;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }

      var $trigger = $$$1(this);
      var selector = Util.getSelectorFromElement(this);
      var selectors = [].slice.call(document.querySelectorAll(selector));
      $$$1(selectors).each(function () {
        var $target = $$$1(this);
        var data = $target.data(DATA_KEY);
        var config = data ? 'toggle' : $trigger.data();

        Collapse._jQueryInterface.call($target, config);
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Collapse._jQueryInterface;
    $$$1.fn[NAME].Constructor = Collapse;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Dropdown = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'dropdown';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DISABLED: 'disabled',
      SHOW: 'show',
      DROPUP: 'dropup',
      DROPRIGHT: 'dropright',
      DROPLEFT: 'dropleft',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      POSITION_STATIC: 'position-static'
    };
    var Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var AttachmentMap = {
      TOP: 'top-start',
      TOPEND: 'top-end',
      BOTTOM: 'bottom-start',
      BOTTOMEND: 'bottom-end',
      RIGHT: 'right-start',
      RIGHTEND: 'right-end',
      LEFT: 'left-start',
      LEFTEND: 'left-end'
    };
    var Default = {
      offset: 0,
      flip: true,
      boundary: 'scrollParent',
      reference: 'toggle',
      display: 'dynamic'
    };
    var DefaultType = {
      offset: '(number|string|function)',
      flip: 'boolean',
      boundary: '(string|element)',
      reference: '(string|element)',
      display: 'string'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      } // Getters


      var _proto = Dropdown.prototype;

      // Public
      _proto.toggle = function toggle() {
        if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
        $$$1(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (Util.isElement(this._config.reference)) {
            referenceElement = this._config.reference; // Check if it's jQuery element

            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceElement = this._config.reference[0];
            }
          } // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollParent') {
            $$$1(parent).addClass(ClassName.POSITION_STATIC);
          }

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) {
          $$$1(document.body).children().on('mouseover', null, $$$1.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        $$$1(this._menu).toggleClass(ClassName.SHOW);
        $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._element).off(EVENT_KEY);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();

          this._popper = null;
        }
      };

      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Private


      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        $$$1(this._element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this._element).data(), config);
        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);

          if (parent) {
            this._menu = parent.querySelector(Selector.MENU);
          }
        }

        return this._menu;
      };

      _proto._getPlacement = function _getPlacement() {
        var $parentDropdown = $$$1(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if ($parentDropdown.hasClass(ClassName.DROPUP)) {
          placement = AttachmentMap.TOP;

          if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return $$$1(this._element).closest('.navbar').length > 0;
      };

      _proto._getPopperConfig = function _getPopperConfig() {
        var _this2 = this;

        var offsetConf = {};

        if (typeof this._config.offset === 'function') {
          offsetConf.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets) || {});
            return data;
          };
        } else {
          offsetConf.offset = this._config.offset;
        }

        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: offsetConf,
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          } // Disable Popper.js if we have a static display

        };

        if (this._config.display === 'static') {
          popperConfig.modifiers.applyStyle = {
            enabled: false
          };
        }

        return popperConfig;
      }; // Static


      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }

        var toggles = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggles.length; i < len; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);

          var context = $$$1(toggles[i]).data(DATA_KEY);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }

          if (!context) {
            continue;
          }

          var dropdownMenu = context._menu;

          if (!$$$1(parent).hasClass(ClassName.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
          $$$1(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().off('mouseover', null, $$$1.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');
          $$$1(dropdownMenu).removeClass(ClassName.SHOW);
          $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = document.querySelector(selector);
        }

        return parent || element.parentNode;
      }; // eslint-disable-next-line complexity


      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = $$$1(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector.DATA_TOGGLE);
            $$$1(toggle).trigger('focus');
          }

          $$$1(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Dropdown;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($$$1(this), 'toggle');
    }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Dropdown._jQueryInterface;
    $$$1.fn[NAME].Constructor = Dropdown;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Modal = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'modal';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };
    var DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      RESIZE: "resize" + EVENT_KEY,
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
      KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
      MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      STICKY_CONTENT: '.sticky-top'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Modal =
    /*#__PURE__*/
    function () {
      function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(Selector.DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._scrollbarWidth = 0;
      } // Getters


      var _proto = Modal.prototype;

      // Public
      _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      _proto.show = function show(relatedTarget) {
        var _this = this;

        if (this._isTransitioning || this._isShown) {
          return;
        }

        if ($$$1(this._element).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
        }

        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });
        $$$1(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        $$$1(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });
        $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($$$1(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      };

      _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        if (this._isTransitioning || !this._isShown) {
          return;
        }

        var hideEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;
        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(document).off(Event.FOCUSIN);
        $$$1(this._element).removeClass(ClassName.SHOW);
        $$$1(this._element).off(Event.CLICK_DISMISS);
        $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          this._hideModal();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._scrollbarWidth = null;
      };

      _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._showElement = function _showElement(relatedTarget) {
        var _this3 = this;

        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $$$1(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $$$1.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }

          _this3._isTransitioning = false;
          $$$1(_this3._element).trigger(shownEvent);
        };

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
          transitionComplete();
        }
      };

      _proto._enforceFocus = function _enforceFocus() {
        var _this4 = this;

        $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
            _this4._element.focus();
          }
        });
      };

      _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this5 = this;

        if (this._isShown && this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              event.preventDefault();

              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          $$$1(this._element).off(Event.KEYDOWN_DISMISS);
        }
      };

      _proto._setResizeEvent = function _setResizeEvent() {
        var _this6 = this;

        if (this._isShown) {
          $$$1(window).on(Event.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          $$$1(window).off(Event.RESIZE);
        }
      };

      _proto._hideModal = function _hideModal() {
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._isTransitioning = false;

        this._showBackdrop(function () {
          $$$1(document.body).removeClass(ClassName.OPEN);

          _this7._resetAdjustments();

          _this7._resetScrollbar();

          $$$1(_this7._element).trigger(Event.HIDDEN);
        });
      };

      _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $$$1(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      _proto._showBackdrop = function _showBackdrop(callback) {
        var _this8 = this;

        var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            this._backdrop.classList.add(animate);
          }

          $$$1(this._backdrop).appendTo(document.body);
          $$$1(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }

            if (event.target !== event.currentTarget) {
              return;
            }

            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (animate) {
            Util.reflow(this._backdrop);
          }

          $$$1(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) {
            return;
          }

          if (!animate) {
            callback();
            return;
          }

          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
          $$$1(this._backdrop).removeClass(ClassName.SHOW);

          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();

            if (callback) {
              callback();
            }
          };

          if ($$$1(this._element).hasClass(ClassName.FADE)) {
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

            $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }; // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------


      _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
      };

      _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      _proto._setScrollbar = function _setScrollbar() {
        var _this9 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
          var stickyContent = [].slice.call(document.querySelectorAll(Selector.STICKY_CONTENT)); // Adjust fixed content padding

          $$$1(fixedContent).each(function (index, element) {
            var actualPadding = element.style.paddingRight;
            var calculatedPadding = $$$1(element).css('padding-right');
            $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
          }); // Adjust sticky content margin

          $$$1(stickyContent).each(function (index, element) {
            var actualMargin = element.style.marginRight;
            var calculatedMargin = $$$1(element).css('margin-right');
            $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
          }); // Adjust body padding

          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = $$$1(document.body).css('padding-right');
          $$$1(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }
      };

      _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
        $$$1(fixedContent).each(function (index, element) {
          var padding = $$$1(element).data('padding-right');
          $$$1(element).removeData('padding-right');
          element.style.paddingRight = padding ? padding : '';
        }); // Restore sticky content

        var elements = [].slice.call(document.querySelectorAll("" + Selector.STICKY_CONTENT));
        $$$1(elements).each(function (index, element) {
          var margin = $$$1(element).data('margin-right');

          if (typeof margin !== 'undefined') {
            $$$1(element).css('margin-right', margin).removeData('margin-right');
          }
        }); // Restore body padding

        var padding = $$$1(document.body).data('padding-right');
        $$$1(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
      };

      _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }; // Static


      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data(), typeof config === 'object' && config ? config : {});

          if (!data) {
            data = new Modal(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Modal;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      var _this10 = this;

      var target;
      var selector = Util.getSelectorFromElement(this);

      if (selector) {
        target = document.querySelector(selector);
      }

      var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _objectSpread({}, $$$1(target).data(), $$$1(this).data());

      if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
      }

      var $target = $$$1(target).one(Event.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // Only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event.HIDDEN, function () {
          if ($$$1(_this10).is(':visible')) {
            _this10.focus();
          }
        });
      });

      Modal._jQueryInterface.call($$$1(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Modal._jQueryInterface;
    $$$1.fn[NAME].Constructor = Modal;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tooltip = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tooltip';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string)',
      container: '(string|element|boolean)',
      fallbackPlacement: '(string|array)',
      boundary: '(string|element)'
    };
    var AttachmentMap = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left'
    };
    var Default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackPlacement: 'flip',
      boundary: 'scrollParent'
    };
    var HoverState = {
      SHOW: 'show',
      OUT: 'out'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
    };
    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner',
      ARROW: '.arrow'
    };
    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tooltip =
    /*#__PURE__*/
    function () {
      function Tooltip(element, config) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
        } // private


        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null; // Protected

        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      } // Getters


      var _proto = Tooltip.prototype;

      // Public
      _proto.enable = function enable() {
        this._isEnabled = true;
      };

      _proto.disable = function disable() {
        this._isEnabled = false;
      };

      _proto.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      _proto.toggle = function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $$$1(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $$$1(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        $$$1.removeData(this.element, this.constructor.DATA_KEY);
        $$$1(this.element).off(this.constructor.EVENT_KEY);
        $$$1(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $$$1(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };

      _proto.show = function show() {
        var _this = this;

        if ($$$1(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = $$$1.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $$$1(this.element).trigger(showEvent);
          var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();

          if (this.config.animation) {
            $$$1(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          this.addAttachmentClass(attachment);
          var container = this.config.container === false ? document.body : $$$1(document).find(this.config.container);
          $$$1(tip).data(this.constructor.DATA_KEY, this);

          if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) {
            $$$1(tip).appendTo(container);
          }

          $$$1(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: {
                offset: this.config.offset
              },
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: Selector.ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              _this._handlePopperPlacementChange(data);
            }
          });
          $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().on('mouseover', null, $$$1.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }

            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };

          if ($$$1(this.tip).hasClass(ClassName.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        }
      };

      _proto.hide = function hide(callback) {
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = $$$1.Event(this.constructor.Event.HIDE);

        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this2._cleanTipClass();

          _this2.element.removeAttribute('aria-describedby');

          $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        $$$1(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          $$$1(document.body).children().off('mouseover', null, $$$1.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if ($$$1(this.tip).hasClass(ClassName.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Protected


      _proto.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var tip = this.getTipElement();
        this.setElementContent($$$1(tip.querySelectorAll(Selector.TOOLTIP_INNER)), this.getTitle());
        $$$1(tip).removeClass(ClassName.FADE + " " + ClassName.SHOW);
      };

      _proto.setElementContent = function setElementContent($element, content) {
        var html = this.config.html;

        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // Content is a DOM node or a jQuery
          if (html) {
            if (!$$$1(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($$$1(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      _proto.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }; // Private


      _proto._getAttachment = function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      };

      _proto._setListeners = function _setListeners() {
        var _this3 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
              return _this3.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
            $$$1(_this3.element).on(eventIn, _this3.config.selector, function (event) {
              return _this3._enter(event);
            }).on(eventOut, _this3.config.selector, function (event) {
              return _this3._leave(event);
            });
          }

          $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () {
            return _this3.hide();
          });
        });

        if (this.config.selector) {
          this.config = _objectSpread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      _proto._fixTitle = function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');

        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      _proto._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      _proto._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this.element).data(), typeof config === 'object' && config ? config : {});

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length) {
          $tip.removeClass(tabClass.join(''));
        }
      };

      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
        var popperInstance = popperData.instance;
        this.tip = popperInstance.popper;

        this._cleanTipClass();

        this.addAttachmentClass(this._getAttachment(popperData.placement));
      };

      _proto._fixTransition = function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;

        if (tip.getAttribute('x-placement') !== null) {
          return;
        }

        $$$1(tip).removeClass(ClassName.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      }; // Static


      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Tooltip;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Tooltip._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tooltip;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'popover';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-popover';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');

    var Default = _objectSpread({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });

    var DefaultType = _objectSpread({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TITLE: '.popover-header',
      CONTENT: '.popover-body'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Popover =
    /*#__PURE__*/
    function (_Tooltip) {
      _inheritsLoose(Popover, _Tooltip);

      function Popover() {
        return _Tooltip.apply(this, arguments) || this;
      }

      var _proto = Popover.prototype;

      // Overrides
      _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this.element);
        }

        this.setElementContent($tip.find(Selector.CONTENT), content);
        $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
      }; // Private


      _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      }; // Static


      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    }(Tooltip);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Popover._jQueryInterface;
    $$$1.fn[NAME].Constructor = Popover;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ScrollSpy = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'scrollspy';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      offset: 10,
      method: 'auto',
      target: ''
    };
    var DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };
    var Event = {
      ACTIVATE: "activate" + EVENT_KEY,
      SCROLL: "scroll" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active'
    };
    var Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      NAV_LIST_GROUP: '.nav, .list-group',
      NAV_LINKS: '.nav-link',
      NAV_ITEMS: '.nav-item',
      LIST_ITEMS: '.list-group-item',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var ScrollSpy =
    /*#__PURE__*/
    function () {
      function ScrollSpy(element, config) {
        var _this = this;

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        $$$1(this._scrollElement).on(Event.SCROLL, function (event) {
          return _this._process(event);
        });
        this.refresh();

        this._process();
      } // Getters


      var _proto = ScrollSpy.prototype;

      // Public
      _proto.refresh = function refresh() {
        var _this2 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = [].slice.call(document.querySelectorAll(this._selector));
        targets.map(function (element) {
          var target;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
        });
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._scrollElement).off(EVENT_KEY);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, typeof config === 'object' && config ? config : {});

        if (typeof config.target !== 'string') {
          var id = $$$1(config.target).attr('id');

          if (!id) {
            id = Util.getUID(NAME);
            $$$1(config.target).attr('id', id);
          }

          config.target = "#" + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      _proto._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      _proto._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      };

      _proto._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        var offsetLength = this._offsets.length;

        for (var i = offsetLength; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      _proto._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


        queries = queries.map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
        });
        var $link = $$$1([].slice.call(document.querySelectorAll(queries.join(','))));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // Set triggered link as active
          $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $$$1(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      };

      _proto._clear = function _clear() {
        var nodes = [].slice.call(document.querySelectorAll(this._selector));
        $$$1(nodes).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }; // Static


      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return ScrollSpy;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var scrollSpys = [].slice.call(document.querySelectorAll(Selector.DATA_SPY));
      var scrollSpysLength = scrollSpys.length;

      for (var i = scrollSpysLength; i--;) {
        var $spy = $$$1(scrollSpys[i]);

        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
    $$$1.fn[NAME].Constructor = ScrollSpy;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tab = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tab';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DROPDOWN: '.dropdown',
      NAV_LIST_GROUP: '.nav, .list-group',
      ACTIVE: '.active',
      ACTIVE_UL: '> li > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tab =
    /*#__PURE__*/
    function () {
      function Tab(element) {
        this._element = element;
      } // Getters


      var _proto = Tab.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var target;
        var previous;
        var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
          previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $$$1.Event(Event.HIDE, {
          relatedTarget: this._element
        });
        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $$$1(previous).trigger(hideEvent);
        }

        $$$1(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = document.querySelector(selector);
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = $$$1.Event(Event.HIDDEN, {
            relatedTarget: _this._element
          });
          var shownEvent = $$$1.Event(Event.SHOWN, {
            relatedTarget: previous
          });
          $$$1(previous).trigger(hiddenEvent);
          $$$1(_this._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeElements;

        if (container.nodeName === 'UL') {
          activeElements = $$$1(container).find(Selector.ACTIVE_UL);
        } else {
          activeElements = $$$1(container).children(Selector.ACTIVE);
        }

        var active = activeElements[0];
        var isTransitioning = callback && active && $$$1(active).hasClass(ClassName.FADE);

        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
          $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
          var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        $$$1(element).addClass(ClassName.ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        Util.reflow(element);
        $$$1(element).addClass(ClassName.SHOW);

        if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
          var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

          if (dropdownElement) {
            var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector.DROPDOWN_TOGGLE));
            $$$1(dropdownToggleList).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }; // Static


      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Tab;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      Tab._jQueryInterface.call($$$1(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Tab._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tab;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function ($$$1) {
    if (typeof $$$1 === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $$$1.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })($);

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bootstrap.js.map


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".geocoder-control-input{position:absolute;left:0;top:0;background-color:white;background-repeat:no-repeat;background-image:url(" + escape(__webpack_require__(/*! ./img/search.png */ "./node_modules/esri-leaflet-geocoder/dist/img/search.png")) + ");background-size:26px;border:none;padding:0;text-indent:6px;font-size:13px;line-height:normal;height:auto;padding-top:5px;padding-bottom:5px;width:100%;background-position:right center;cursor:pointer;box-sizing:border-box}.geocoder-control-input-disabled{background-color:#f4f4f4;background-image:url(" + escape(__webpack_require__(/*! ./img/search-disabled.png */ "./node_modules/esri-leaflet-geocoder/dist/img/search-disabled.png")) + ")}.geocoder-control{width:26px;height:26px;-webkit-transition:width .175s ease-in;-moz-transition:width .175s ease-in;-ms-transition:width .175s ease-in;-o-transition:width .175s ease-in;transition:width .175s ease-in}.geocoder-control-expanded,.leaflet-touch .geocoder-control-expanded{width:275px}.geocoder-control-input.geocoder-control-loading{background-image:url(" + escape(__webpack_require__(/*! ./img/loading.gif */ "./node_modules/esri-leaflet-geocoder/dist/img/loading.gif")) + ");background-size:26px}@media only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2 / 1), only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2){.geocoder-control-input{background-image:url(" + escape(__webpack_require__(/*! ./img/search@2x.png */ "./node_modules/esri-leaflet-geocoder/dist/img/search@2x.png")) + ")}.geocoder-control-input-disabled{background-image:url(" + escape(__webpack_require__(/*! ./img/search@2x-disabled.png */ "./node_modules/esri-leaflet-geocoder/dist/img/search@2x-disabled.png")) + ")}.geocoder-control-input.geocoder-control-loading{background-image:url(" + escape(__webpack_require__(/*! ./img/loading@2x.gif */ "./node_modules/esri-leaflet-geocoder/dist/img/loading@2x.gif")) + ")}}.geocoder-control-input:focus{outline:none;cursor:text}.geocoder-control-input::-ms-clear{display:none}.geocoder-control-suggestions{width:100%;position:absolute;top:26px;left:0;margin-top:10px;overflow:auto;display:none}.geocoder-control-list+.geocoder-control-header{border-top:1px solid #d5d5d5}.geocoder-control-header{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#444;background:#F2F2F2;border-bottom:1px solid #d5d5d5;display:block;padding:.5em}.geocoder-control-list{list-style:none;margin:0;padding:0}.geocoder-control-suggestions .geocoder-control-suggestion{font-size:13px;padding:7px;background:white;border-top:1px solid #f1f1f1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer}.geocoder-control-suggestions .geocoder-control-suggestion:first-child{border:none}.geocoder-control-suggestions .geocoder-control-suggestion.geocoder-control-selected,.geocoder-control-suggestions .geocoder-control-suggestion:hover{background:#7FDFFF;border-color:#7FDFFF}.leaflet-right .geocoder-control-suggestions{left:auto;right:0}.leaflet-right .geocoder-control-input{left:auto;right:0}.leaflet-touch .geocoder-control{width:34px}.leaflet-touch .geocoder-control.geocoder-control-expanded{width:275px}.leaflet-touch .geocoder-control-input{height:34px;line-height:30px;background-size:30px}.leaflet-touch .geocoder-control-suggestions{top:30px;width:271px}.leaflet-oldie .geocoder-control-input{width:28px;height:28px}.leaflet-oldie .geocoder-control-expanded .geocoder-control-input{width:auto}.leaflet-oldie .geocoder-control-input,.leaflet-oldie .geocoder-control-suggestions{border:1px solid #999}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/leaflet-draw/dist/leaflet.draw.css":
/*!***********************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/leaflet-draw/dist/leaflet.draw.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".leaflet-draw-section{position:relative}.leaflet-draw-toolbar{margin-top:12px}.leaflet-draw-toolbar-top{margin-top:0}.leaflet-draw-toolbar-notop a:first-child{border-top-right-radius:0}.leaflet-draw-toolbar-nobottom a:last-child{border-bottom-right-radius:0}.leaflet-draw-toolbar a{background-image:url(" + escape(__webpack_require__(/*! ./images/spritesheet.png */ "./node_modules/leaflet-draw/dist/images/spritesheet.png")) + ");background-image:linear-gradient(transparent,transparent),url(" + escape(__webpack_require__(/*! ./images/spritesheet.svg */ "./node_modules/leaflet-draw/dist/images/spritesheet.svg")) + ");background-repeat:no-repeat;background-size:300px 30px;background-clip:padding-box}.leaflet-retina .leaflet-draw-toolbar a{background-image:url(" + escape(__webpack_require__(/*! ./images/spritesheet-2x.png */ "./node_modules/leaflet-draw/dist/images/spritesheet-2x.png")) + ");background-image:linear-gradient(transparent,transparent),url(" + escape(__webpack_require__(/*! ./images/spritesheet.svg */ "./node_modules/leaflet-draw/dist/images/spritesheet.svg")) + ")}\n.leaflet-draw a{display:block;text-align:center;text-decoration:none}.leaflet-draw a .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.leaflet-draw-actions{display:none;list-style:none;margin:0;padding:0;position:absolute;left:26px;top:0;white-space:nowrap}.leaflet-touch .leaflet-draw-actions{left:32px}.leaflet-right .leaflet-draw-actions{right:26px;left:auto}.leaflet-touch .leaflet-right .leaflet-draw-actions{right:32px;left:auto}.leaflet-draw-actions li{display:inline-block}\n.leaflet-draw-actions li:first-child a{border-left:0}.leaflet-draw-actions li:last-child a{-webkit-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0}.leaflet-right .leaflet-draw-actions li:last-child a{-webkit-border-radius:0;border-radius:0}.leaflet-right .leaflet-draw-actions li:first-child a{-webkit-border-radius:4px 0 0 4px;border-radius:4px 0 0 4px}.leaflet-draw-actions a{background-color:#919187;border-left:1px solid #AAA;color:#FFF;font:11px/19px \"Helvetica Neue\",Arial,Helvetica,sans-serif;line-height:28px;text-decoration:none;padding-left:10px;padding-right:10px;height:28px}\n.leaflet-touch .leaflet-draw-actions a{font-size:12px;line-height:30px;height:30px}.leaflet-draw-actions-bottom{margin-top:0}.leaflet-draw-actions-top{margin-top:1px}.leaflet-draw-actions-top a,.leaflet-draw-actions-bottom a{height:27px;line-height:27px}.leaflet-draw-actions a:hover{background-color:#a0a098}.leaflet-draw-actions-top.leaflet-draw-actions-bottom a{height:26px;line-height:26px}.leaflet-draw-toolbar .leaflet-draw-draw-polyline{background-position:-2px -2px}.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-draw-polyline{background-position:0 -1px}\n.leaflet-draw-toolbar .leaflet-draw-draw-polygon{background-position:-31px -2px}.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-draw-polygon{background-position:-29px -1px}.leaflet-draw-toolbar .leaflet-draw-draw-rectangle{background-position:-62px -2px}.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-draw-rectangle{background-position:-60px -1px}.leaflet-draw-toolbar .leaflet-draw-draw-circle{background-position:-92px -2px}.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-draw-circle{background-position:-90px -1px}\n.leaflet-draw-toolbar .leaflet-draw-draw-marker{background-position:-122px -2px}.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-draw-marker{background-position:-120px -1px}.leaflet-draw-toolbar .leaflet-draw-draw-circlemarker{background-position:-273px -2px}.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-draw-circlemarker{background-position:-271px -1px}.leaflet-draw-toolbar .leaflet-draw-edit-edit{background-position:-152px -2px}.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-edit-edit{background-position:-150px -1px}\n.leaflet-draw-toolbar .leaflet-draw-edit-remove{background-position:-182px -2px}.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-edit-remove{background-position:-180px -1px}.leaflet-draw-toolbar .leaflet-draw-edit-edit.leaflet-disabled{background-position:-212px -2px}.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-edit-edit.leaflet-disabled{background-position:-210px -1px}.leaflet-draw-toolbar .leaflet-draw-edit-remove.leaflet-disabled{background-position:-242px -2px}.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-edit-remove.leaflet-disabled{background-position:-240px -2px}\n.leaflet-mouse-marker{background-color:#fff;cursor:crosshair}.leaflet-draw-tooltip{background:#363636;background:rgba(0,0,0,0.5);border:1px solid transparent;-webkit-border-radius:4px;border-radius:4px;color:#fff;font:12px/18px \"Helvetica Neue\",Arial,Helvetica,sans-serif;margin-left:20px;margin-top:-21px;padding:4px 8px;position:absolute;visibility:hidden;white-space:nowrap;z-index:6}.leaflet-draw-tooltip:before{border-right:6px solid black;border-right-color:rgba(0,0,0,0.5);border-top:6px solid transparent;border-bottom:6px solid transparent;content:\"\";position:absolute;top:7px;left:-7px}\n.leaflet-error-draw-tooltip{background-color:#f2dede;border:1px solid #e6b6bd;color:#b94a48}.leaflet-error-draw-tooltip:before{border-right-color:#e6b6bd}.leaflet-draw-tooltip-single{margin-top:-12px}.leaflet-draw-tooltip-subtext{color:#f8d5e4}.leaflet-draw-guide-dash{font-size:1%;opacity:.6;position:absolute;width:5px;height:5px}.leaflet-edit-marker-selected{background-color:rgba(254,87,161,0.1);border:4px dashed rgba(254,87,161,0.6);-webkit-border-radius:4px;border-radius:4px;box-sizing:content-box}\n.leaflet-edit-move{cursor:move}.leaflet-edit-resize{cursor:pointer}.leaflet-oldie .leaflet-draw-toolbar{border:1px solid #999}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/leaflet/dist/leaflet.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/leaflet/dist/leaflet.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* required styles */\r\n\r\n.leaflet-pane,\r\n.leaflet-tile,\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow,\r\n.leaflet-tile-container,\r\n.leaflet-pane > svg,\r\n.leaflet-pane > canvas,\r\n.leaflet-zoom-box,\r\n.leaflet-image-layer,\r\n.leaflet-layer {\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\t}\r\n.leaflet-container {\r\n\toverflow: hidden;\r\n\t}\r\n.leaflet-tile,\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow {\r\n\t-webkit-user-select: none;\r\n\t   -moz-user-select: none;\r\n\t        user-select: none;\r\n\t  -webkit-user-drag: none;\r\n\t}\r\n/* Safari renders non-retina tile on retina better with this, but Chrome is worse */\r\n.leaflet-safari .leaflet-tile {\r\n\timage-rendering: -webkit-optimize-contrast;\r\n\t}\r\n/* hack that prevents hw layers \"stretching\" when loading new tiles */\r\n.leaflet-safari .leaflet-tile-container {\r\n\twidth: 1600px;\r\n\theight: 1600px;\r\n\t-webkit-transform-origin: 0 0;\r\n\t}\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow {\r\n\tdisplay: block;\r\n\t}\r\n/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */\r\n/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */\r\n.leaflet-container .leaflet-overlay-pane svg,\r\n.leaflet-container .leaflet-marker-pane img,\r\n.leaflet-container .leaflet-shadow-pane img,\r\n.leaflet-container .leaflet-tile-pane img,\r\n.leaflet-container img.leaflet-image-layer,\r\n.leaflet-container .leaflet-tile {\r\n\tmax-width: none !important;\r\n\tmax-height: none !important;\r\n\t}\r\n\r\n.leaflet-container.leaflet-touch-zoom {\r\n\t-ms-touch-action: pan-x pan-y;\r\n\ttouch-action: pan-x pan-y;\r\n\t}\r\n.leaflet-container.leaflet-touch-drag {\r\n\t-ms-touch-action: pinch-zoom;\r\n\t/* Fallback for FF which doesn't support pinch-zoom */\r\n\ttouch-action: none;\r\n\ttouch-action: pinch-zoom;\r\n}\r\n.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {\r\n\t-ms-touch-action: none;\r\n\ttouch-action: none;\r\n}\r\n.leaflet-container {\r\n\t-webkit-tap-highlight-color: transparent;\r\n}\r\n.leaflet-container a {\r\n\t-webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);\r\n}\r\n.leaflet-tile {\r\n\tfilter: inherit;\r\n\tvisibility: hidden;\r\n\t}\r\n.leaflet-tile-loaded {\r\n\tvisibility: inherit;\r\n\t}\r\n.leaflet-zoom-box {\r\n\twidth: 0;\r\n\theight: 0;\r\n\t-moz-box-sizing: border-box;\r\n\t     box-sizing: border-box;\r\n\tz-index: 800;\r\n\t}\r\n/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */\r\n.leaflet-overlay-pane svg {\r\n\t-moz-user-select: none;\r\n\t}\r\n\r\n.leaflet-pane         { z-index: 400; }\r\n\r\n.leaflet-tile-pane    { z-index: 200; }\r\n.leaflet-overlay-pane { z-index: 400; }\r\n.leaflet-shadow-pane  { z-index: 500; }\r\n.leaflet-marker-pane  { z-index: 600; }\r\n.leaflet-tooltip-pane   { z-index: 650; }\r\n.leaflet-popup-pane   { z-index: 700; }\r\n\r\n.leaflet-map-pane canvas { z-index: 100; }\r\n.leaflet-map-pane svg    { z-index: 200; }\r\n\r\n.leaflet-vml-shape {\r\n\twidth: 1px;\r\n\theight: 1px;\r\n\t}\r\n.lvml {\r\n\tbehavior: url(#default#VML);\r\n\tdisplay: inline-block;\r\n\tposition: absolute;\r\n\t}\r\n\r\n\r\n/* control positioning */\r\n\r\n.leaflet-control {\r\n\tposition: relative;\r\n\tz-index: 800;\r\n\tpointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\r\n\tpointer-events: auto;\r\n\t}\r\n.leaflet-top,\r\n.leaflet-bottom {\r\n\tposition: absolute;\r\n\tz-index: 1000;\r\n\tpointer-events: none;\r\n\t}\r\n.leaflet-top {\r\n\ttop: 0;\r\n\t}\r\n.leaflet-right {\r\n\tright: 0;\r\n\t}\r\n.leaflet-bottom {\r\n\tbottom: 0;\r\n\t}\r\n.leaflet-left {\r\n\tleft: 0;\r\n\t}\r\n.leaflet-control {\r\n\tfloat: left;\r\n\tclear: both;\r\n\t}\r\n.leaflet-right .leaflet-control {\r\n\tfloat: right;\r\n\t}\r\n.leaflet-top .leaflet-control {\r\n\tmargin-top: 10px;\r\n\t}\r\n.leaflet-bottom .leaflet-control {\r\n\tmargin-bottom: 10px;\r\n\t}\r\n.leaflet-left .leaflet-control {\r\n\tmargin-left: 10px;\r\n\t}\r\n.leaflet-right .leaflet-control {\r\n\tmargin-right: 10px;\r\n\t}\r\n\r\n\r\n/* zoom and fade animations */\r\n\r\n.leaflet-fade-anim .leaflet-tile {\r\n\twill-change: opacity;\r\n\t}\r\n.leaflet-fade-anim .leaflet-popup {\r\n\topacity: 0;\r\n\t-webkit-transition: opacity 0.2s linear;\r\n\t   -moz-transition: opacity 0.2s linear;\r\n\t        transition: opacity 0.2s linear;\r\n\t}\r\n.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\r\n\topacity: 1;\r\n\t}\r\n.leaflet-zoom-animated {\r\n\t-webkit-transform-origin: 0 0;\r\n\t    -ms-transform-origin: 0 0;\r\n\t        transform-origin: 0 0;\r\n\t}\r\n.leaflet-zoom-anim .leaflet-zoom-animated {\r\n\twill-change: transform;\r\n\t}\r\n.leaflet-zoom-anim .leaflet-zoom-animated {\r\n\t-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t}\r\n.leaflet-zoom-anim .leaflet-tile,\r\n.leaflet-pan-anim .leaflet-tile {\r\n\t-webkit-transition: none;\r\n\t   -moz-transition: none;\r\n\t        transition: none;\r\n\t}\r\n\r\n.leaflet-zoom-anim .leaflet-zoom-hide {\r\n\tvisibility: hidden;\r\n\t}\r\n\r\n\r\n/* cursors */\r\n\r\n.leaflet-interactive {\r\n\tcursor: pointer;\r\n\t}\r\n.leaflet-grab {\r\n\tcursor: -webkit-grab;\r\n\tcursor:    -moz-grab;\r\n\tcursor:         grab;\r\n\t}\r\n.leaflet-crosshair,\r\n.leaflet-crosshair .leaflet-interactive {\r\n\tcursor: crosshair;\r\n\t}\r\n.leaflet-popup-pane,\r\n.leaflet-control {\r\n\tcursor: auto;\r\n\t}\r\n.leaflet-dragging .leaflet-grab,\r\n.leaflet-dragging .leaflet-grab .leaflet-interactive,\r\n.leaflet-dragging .leaflet-marker-draggable {\r\n\tcursor: move;\r\n\tcursor: -webkit-grabbing;\r\n\tcursor:    -moz-grabbing;\r\n\tcursor:         grabbing;\r\n\t}\r\n\r\n/* marker & overlays interactivity */\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow,\r\n.leaflet-image-layer,\r\n.leaflet-pane > svg path,\r\n.leaflet-tile-container {\r\n\tpointer-events: none;\r\n\t}\r\n\r\n.leaflet-marker-icon.leaflet-interactive,\r\n.leaflet-image-layer.leaflet-interactive,\r\n.leaflet-pane > svg path.leaflet-interactive {\r\n\tpointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\r\n\tpointer-events: auto;\r\n\t}\r\n\r\n/* visual tweaks */\r\n\r\n.leaflet-container {\r\n\tbackground: #ddd;\r\n\toutline: 0;\r\n\t}\r\n.leaflet-container a {\r\n\tcolor: #0078A8;\r\n\t}\r\n.leaflet-container a.leaflet-active {\r\n\toutline: 2px solid orange;\r\n\t}\r\n.leaflet-zoom-box {\r\n\tborder: 2px dotted #38f;\r\n\tbackground: rgba(255,255,255,0.5);\r\n\t}\r\n\r\n\r\n/* general typography */\r\n.leaflet-container {\r\n\tfont: 12px/1.5 \"Helvetica Neue\", Arial, Helvetica, sans-serif;\r\n\t}\r\n\r\n\r\n/* general toolbar styles */\r\n\r\n.leaflet-bar {\r\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.65);\r\n\tborder-radius: 4px;\r\n\t}\r\n.leaflet-bar a,\r\n.leaflet-bar a:hover {\r\n\tbackground-color: #fff;\r\n\tborder-bottom: 1px solid #ccc;\r\n\twidth: 26px;\r\n\theight: 26px;\r\n\tline-height: 26px;\r\n\tdisplay: block;\r\n\ttext-align: center;\r\n\ttext-decoration: none;\r\n\tcolor: black;\r\n\t}\r\n.leaflet-bar a,\r\n.leaflet-control-layers-toggle {\r\n\tbackground-position: 50% 50%;\r\n\tbackground-repeat: no-repeat;\r\n\tdisplay: block;\r\n\t}\r\n.leaflet-bar a:hover {\r\n\tbackground-color: #f4f4f4;\r\n\t}\r\n.leaflet-bar a:first-child {\r\n\tborder-top-left-radius: 4px;\r\n\tborder-top-right-radius: 4px;\r\n\t}\r\n.leaflet-bar a:last-child {\r\n\tborder-bottom-left-radius: 4px;\r\n\tborder-bottom-right-radius: 4px;\r\n\tborder-bottom: none;\r\n\t}\r\n.leaflet-bar a.leaflet-disabled {\r\n\tcursor: default;\r\n\tbackground-color: #f4f4f4;\r\n\tcolor: #bbb;\r\n\t}\r\n\r\n.leaflet-touch .leaflet-bar a {\r\n\twidth: 30px;\r\n\theight: 30px;\r\n\tline-height: 30px;\r\n\t}\r\n.leaflet-touch .leaflet-bar a:first-child {\r\n\tborder-top-left-radius: 2px;\r\n\tborder-top-right-radius: 2px;\r\n\t}\r\n.leaflet-touch .leaflet-bar a:last-child {\r\n\tborder-bottom-left-radius: 2px;\r\n\tborder-bottom-right-radius: 2px;\r\n\t}\r\n\r\n/* zoom control */\r\n\r\n.leaflet-control-zoom-in,\r\n.leaflet-control-zoom-out {\r\n\tfont: bold 18px 'Lucida Console', Monaco, monospace;\r\n\ttext-indent: 1px;\r\n\t}\r\n\r\n.leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out  {\r\n\tfont-size: 22px;\r\n\t}\r\n\r\n\r\n/* layers control */\r\n\r\n.leaflet-control-layers {\r\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.4);\r\n\tbackground: #fff;\r\n\tborder-radius: 5px;\r\n\t}\r\n.leaflet-control-layers-toggle {\r\n\tbackground-image: url(" + escape(__webpack_require__(/*! ./images/layers.png */ "./node_modules/leaflet/dist/images/layers.png")) + ");\r\n\twidth: 36px;\r\n\theight: 36px;\r\n\t}\r\n.leaflet-retina .leaflet-control-layers-toggle {\r\n\tbackground-image: url(" + escape(__webpack_require__(/*! ./images/layers-2x.png */ "./node_modules/leaflet/dist/images/layers-2x.png")) + ");\r\n\tbackground-size: 26px 26px;\r\n\t}\r\n.leaflet-touch .leaflet-control-layers-toggle {\r\n\twidth: 44px;\r\n\theight: 44px;\r\n\t}\r\n.leaflet-control-layers .leaflet-control-layers-list,\r\n.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\r\n\tdisplay: none;\r\n\t}\r\n.leaflet-control-layers-expanded .leaflet-control-layers-list {\r\n\tdisplay: block;\r\n\tposition: relative;\r\n\t}\r\n.leaflet-control-layers-expanded {\r\n\tpadding: 6px 10px 6px 6px;\r\n\tcolor: #333;\r\n\tbackground: #fff;\r\n\t}\r\n.leaflet-control-layers-scrollbar {\r\n\toverflow-y: scroll;\r\n\toverflow-x: hidden;\r\n\tpadding-right: 5px;\r\n\t}\r\n.leaflet-control-layers-selector {\r\n\tmargin-top: 2px;\r\n\tposition: relative;\r\n\ttop: 1px;\r\n\t}\r\n.leaflet-control-layers label {\r\n\tdisplay: block;\r\n\t}\r\n.leaflet-control-layers-separator {\r\n\theight: 0;\r\n\tborder-top: 1px solid #ddd;\r\n\tmargin: 5px -10px 5px -6px;\r\n\t}\r\n\r\n/* Default icon URLs */\r\n.leaflet-default-icon-path {\r\n\tbackground-image: url(" + escape(__webpack_require__(/*! ./images/marker-icon.png */ "./node_modules/leaflet/dist/images/marker-icon.png")) + ");\r\n\t}\r\n\r\n\r\n/* attribution and scale controls */\r\n\r\n.leaflet-container .leaflet-control-attribution {\r\n\tbackground: #fff;\r\n\tbackground: rgba(255, 255, 255, 0.7);\r\n\tmargin: 0;\r\n\t}\r\n.leaflet-control-attribution,\r\n.leaflet-control-scale-line {\r\n\tpadding: 0 5px;\r\n\tcolor: #333;\r\n\t}\r\n.leaflet-control-attribution a {\r\n\ttext-decoration: none;\r\n\t}\r\n.leaflet-control-attribution a:hover {\r\n\ttext-decoration: underline;\r\n\t}\r\n.leaflet-container .leaflet-control-attribution,\r\n.leaflet-container .leaflet-control-scale {\r\n\tfont-size: 11px;\r\n\t}\r\n.leaflet-left .leaflet-control-scale {\r\n\tmargin-left: 5px;\r\n\t}\r\n.leaflet-bottom .leaflet-control-scale {\r\n\tmargin-bottom: 5px;\r\n\t}\r\n.leaflet-control-scale-line {\r\n\tborder: 2px solid #777;\r\n\tborder-top: none;\r\n\tline-height: 1.1;\r\n\tpadding: 2px 5px 1px;\r\n\tfont-size: 11px;\r\n\twhite-space: nowrap;\r\n\toverflow: hidden;\r\n\t-moz-box-sizing: border-box;\r\n\t     box-sizing: border-box;\r\n\r\n\tbackground: #fff;\r\n\tbackground: rgba(255, 255, 255, 0.5);\r\n\t}\r\n.leaflet-control-scale-line:not(:first-child) {\r\n\tborder-top: 2px solid #777;\r\n\tborder-bottom: none;\r\n\tmargin-top: -2px;\r\n\t}\r\n.leaflet-control-scale-line:not(:first-child):not(:last-child) {\r\n\tborder-bottom: 2px solid #777;\r\n\t}\r\n\r\n.leaflet-touch .leaflet-control-attribution,\r\n.leaflet-touch .leaflet-control-layers,\r\n.leaflet-touch .leaflet-bar {\r\n\tbox-shadow: none;\r\n\t}\r\n.leaflet-touch .leaflet-control-layers,\r\n.leaflet-touch .leaflet-bar {\r\n\tborder: 2px solid rgba(0,0,0,0.2);\r\n\tbackground-clip: padding-box;\r\n\t}\r\n\r\n\r\n/* popup */\r\n\r\n.leaflet-popup {\r\n\tposition: absolute;\r\n\ttext-align: center;\r\n\tmargin-bottom: 20px;\r\n\t}\r\n.leaflet-popup-content-wrapper {\r\n\tpadding: 1px;\r\n\ttext-align: left;\r\n\tborder-radius: 12px;\r\n\t}\r\n.leaflet-popup-content {\r\n\tmargin: 13px 19px;\r\n\tline-height: 1.4;\r\n\t}\r\n.leaflet-popup-content p {\r\n\tmargin: 18px 0;\r\n\t}\r\n.leaflet-popup-tip-container {\r\n\twidth: 40px;\r\n\theight: 20px;\r\n\tposition: absolute;\r\n\tleft: 50%;\r\n\tmargin-left: -20px;\r\n\toverflow: hidden;\r\n\tpointer-events: none;\r\n\t}\r\n.leaflet-popup-tip {\r\n\twidth: 17px;\r\n\theight: 17px;\r\n\tpadding: 1px;\r\n\r\n\tmargin: -10px auto 0;\r\n\r\n\t-webkit-transform: rotate(45deg);\r\n\t   -moz-transform: rotate(45deg);\r\n\t    -ms-transform: rotate(45deg);\r\n\t        transform: rotate(45deg);\r\n\t}\r\n.leaflet-popup-content-wrapper,\r\n.leaflet-popup-tip {\r\n\tbackground: white;\r\n\tcolor: #333;\r\n\tbox-shadow: 0 3px 14px rgba(0,0,0,0.4);\r\n\t}\r\n.leaflet-container a.leaflet-popup-close-button {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tpadding: 4px 4px 0 0;\r\n\tborder: none;\r\n\ttext-align: center;\r\n\twidth: 18px;\r\n\theight: 14px;\r\n\tfont: 16px/14px Tahoma, Verdana, sans-serif;\r\n\tcolor: #c3c3c3;\r\n\ttext-decoration: none;\r\n\tfont-weight: bold;\r\n\tbackground: transparent;\r\n\t}\r\n.leaflet-container a.leaflet-popup-close-button:hover {\r\n\tcolor: #999;\r\n\t}\r\n.leaflet-popup-scrolled {\r\n\toverflow: auto;\r\n\tborder-bottom: 1px solid #ddd;\r\n\tborder-top: 1px solid #ddd;\r\n\t}\r\n\r\n.leaflet-oldie .leaflet-popup-content-wrapper {\r\n\tzoom: 1;\r\n\t}\r\n.leaflet-oldie .leaflet-popup-tip {\r\n\twidth: 24px;\r\n\tmargin: 0 auto;\r\n\r\n\t-ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";\r\n\tfilter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\r\n\t}\r\n.leaflet-oldie .leaflet-popup-tip-container {\r\n\tmargin-top: -1px;\r\n\t}\r\n\r\n.leaflet-oldie .leaflet-control-zoom,\r\n.leaflet-oldie .leaflet-control-layers,\r\n.leaflet-oldie .leaflet-popup-content-wrapper,\r\n.leaflet-oldie .leaflet-popup-tip {\r\n\tborder: 1px solid #999;\r\n\t}\r\n\r\n\r\n/* div icon */\r\n\r\n.leaflet-div-icon {\r\n\tbackground: #fff;\r\n\tborder: 1px solid #666;\r\n\t}\r\n\r\n\r\n/* Tooltip */\r\n/* Base styles for the element that has a tooltip */\r\n.leaflet-tooltip {\r\n\tposition: absolute;\r\n\tpadding: 6px;\r\n\tbackground-color: #fff;\r\n\tborder: 1px solid #fff;\r\n\tborder-radius: 3px;\r\n\tcolor: #222;\r\n\twhite-space: nowrap;\r\n\t-webkit-user-select: none;\r\n\t-moz-user-select: none;\r\n\t-ms-user-select: none;\r\n\tuser-select: none;\r\n\tpointer-events: none;\r\n\tbox-shadow: 0 1px 3px rgba(0,0,0,0.4);\r\n\t}\r\n.leaflet-tooltip.leaflet-clickable {\r\n\tcursor: pointer;\r\n\tpointer-events: auto;\r\n\t}\r\n.leaflet-tooltip-top:before,\r\n.leaflet-tooltip-bottom:before,\r\n.leaflet-tooltip-left:before,\r\n.leaflet-tooltip-right:before {\r\n\tposition: absolute;\r\n\tpointer-events: none;\r\n\tborder: 6px solid transparent;\r\n\tbackground: transparent;\r\n\tcontent: \"\";\r\n\t}\r\n\r\n/* Directions */\r\n\r\n.leaflet-tooltip-bottom {\r\n\tmargin-top: 6px;\r\n}\r\n.leaflet-tooltip-top {\r\n\tmargin-top: -6px;\r\n}\r\n.leaflet-tooltip-bottom:before,\r\n.leaflet-tooltip-top:before {\r\n\tleft: 50%;\r\n\tmargin-left: -6px;\r\n\t}\r\n.leaflet-tooltip-top:before {\r\n\tbottom: 0;\r\n\tmargin-bottom: -12px;\r\n\tborder-top-color: #fff;\r\n\t}\r\n.leaflet-tooltip-bottom:before {\r\n\ttop: 0;\r\n\tmargin-top: -12px;\r\n\tmargin-left: -6px;\r\n\tborder-bottom-color: #fff;\r\n\t}\r\n.leaflet-tooltip-left {\r\n\tmargin-left: -6px;\r\n}\r\n.leaflet-tooltip-right {\r\n\tmargin-left: 6px;\r\n}\r\n.leaflet-tooltip-left:before,\r\n.leaflet-tooltip-right:before {\r\n\ttop: 50%;\r\n\tmargin-top: -6px;\r\n\t}\r\n.leaflet-tooltip-left:before {\r\n\tright: 0;\r\n\tmargin-right: -12px;\r\n\tborder-left-color: #fff;\r\n\t}\r\n.leaflet-tooltip-right:before {\r\n\tleft: 0;\r\n\tmargin-left: -12px;\r\n\tborder-right-color: #fff;\r\n\t}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/url/escape.js":
/*!***************************************************!*\
  !*** ./node_modules/css-loader/lib/url/escape.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ "./node_modules/esri-leaflet-geocoder/dist/img/loading.gif":
/*!*****************************************************************!*\
  !*** ./node_modules/esri-leaflet-geocoder/dist/img/loading.gif ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhGgAaANU/AP///4WFhfX19T09Pf39/SUlJQ8PD5ubm0dHR/Ly8lxcXHBwcImJifDw8Pz8/O/v72JiYk1NTaWlpYaGhqenp/b29vPz83t7e4qKiv7+/l1dXe3t7XR0dHl5eWdnZ0tLSzk5OV9fX/n5+e7u7uvr65ycnObm5m9vb5WVlVNTU5iYmOjo6Orq6nd3d/T09PHx8ezs7OPj42pqauDg4BUVFUlJSXJycj8/P/v7+/f39+fn50RERCwsLPj4+Pr6+v///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgA/ACwAAAAAGgAaAAAGqMCfcEgsGo/IpHLJbDqfT4B0Sq0ClFZAJJLFSlcOqcEgzSSm3lghsgGMAYLD5CH1Cj6FjyOVyhwCByJ1SVMbETxtcAwlAmiEVA1UFVVYJwMDJ1YSAQESV4QclxxWFJwUn0hVZ1ONVF4ADTIRI1IJHBgWjqkAFR4IHgQTEwQMCww9g7s6NR6RCgoAFgw2MMlHUys4Us9SDrTWRlkYGF2PWeVQ6err7O3uQQAh+QQFCgA/ACwGAAYADQAOAAAGa8CfcKjRDI8sgrBQEDpMQtMN8vgxfySQYfarhAYhAgTi0IJcwgdkV8XSBqTj73UcDVsIREt+vOQvfIEWRxVyCRcQDUIuDCUCQjkdCh0/KCgZBwEHIj8sGh0JPwsLPwIHE20wQ6NDdHwqKnJBACH5BAUKAD8ALAYABgAOAA4AAAZhwJ9weDoNjz/YcDAYroa6mqzxY/42n0Js6EF4fhzOL/sRDBuyCPXKi2yQv8RxLZwoFBN4xGCIYO4YcCl8KUdmcEcWGBxyiD89DAsMPxISiDA2DBY/AQGOIw5CnY5HFBRwQQAh+QQFCgA/ACwGAAYADgANAAAGacCfcNhqDY+/0RCBEBJYQ5bmkvgxf4/QzSTMdRSd3+VCCA1ClWHiAqlid5AH8mc5vo6oxQI11xQKGip6KnMQfxBHaUNKSAIlDC5CKzQDJEMiBwEHGUIOIAYgkVgTBwJHJJ8zQ3dzIjFCQQAh+QQFCgA/ACwGAAYADgAOAAAGXsCfcDiZDI+/xlChGMKcNozlx0x6ajphj7Fg/DCYnwfhOVownGkyIlMiBcfEURIISJC/02BwotQpeBx7HHhDboVDLDwRG4gRET8fBR9weAYGPxuSMYWXQj4miCkpeEEAIfkEBQoAPwAsBwAGAA0ADgAABmvAn1CIQg2PiYxwsRiOhI9JSfBj/hIdDesnOgQOGZXq11F0ckJBiUG9Qi6J469ytMjvwhYC0cILL3sXTkcvciQDNCtCGzsQD0IuIAYgDhoaBCEDIXQzkyQ/BQU/DyE3JkIxIkKhQ4p3EBB3QQAh+QQFCgA/ACwGAAYADgAOAAAGYsCfcCiRDI/IQGDYQA6VPwvDBnP+KJQfY8HoWYUWDsbyHQqOEYMh4pwoFJOUOuXEvDHH5jDh3ER4LEIjETJ6PwIfBR8/Jyc/HggeQzGKGz8DAz8NHjU6QyY+QphCOGUcHE5BACH5BAUKAD8ALAYABwAOAA0AAAZrwN/P5BAaf5mEcWYYkI6Cw+QhdIEMoCLyEDiIjKQB7fkTMEqCo3B0rBw1hYJG/UMtFihIHEJX3VVHL0cWdA8QOxtCDRAXSkIVIQMhBC0tPx0KHTlCJjchVAgIPwkdGixGK0ahRjB0QhcXdEEAOw=="

/***/ }),

/***/ "./node_modules/esri-leaflet-geocoder/dist/img/loading@2x.gif":
/*!********************************************************************!*\
  !*** ./node_modules/esri-leaflet-geocoder/dist/img/loading@2x.gif ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,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"

/***/ }),

/***/ "./node_modules/esri-leaflet-geocoder/dist/img/search-disabled.png":
/*!*************************************************************************!*\
  !*** ./node_modules/esri-leaflet-geocoder/dist/img/search-disabled.png ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIJFgsTornqHwAAAQ9JREFUaN7tmk0OhSAMhOWFu3A4zuPhOA2u3sZQkP5QosMSMfZjpoUmhlrr8abxO142AAQgAAEIQAACkOKI3BdTSs358zzJu1TOOcx+p5QytT5w73J3oB6IBGwWSMVyMzCc9UuBuMFZQYks9zRfJHk1a7movUOtAP9zllYTW64V3Gi3W8+1IXGwSksx5yyCQgD6AtDTamVdulUVGgW79TlEVSsqaGpeu+pFi11aoYSJ5azPFJcckkJpq6nW4EmDozbGrWPtwUlaCff2wTu/tropaOTTcqCRclIoF4UsodwsZ5VjrjnUg+KqtHX7wIFyB9K23hYKUVAc2G0sdw+eq1zAjxcAAhCAAAQgAAHoO0AXbOONWZ1W+2oAAAAASUVORK5CYII="

/***/ }),

/***/ "./node_modules/esri-leaflet-geocoder/dist/img/search.png":
/*!****************************************************************!*\
  !*** ./node_modules/esri-leaflet-geocoder/dist/img/search.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUtJREFUeNrs1U0oBGEcx3Err0VicSc1OSqJcraKiwMXB0lSbjjszYWUm6S0e8FellyUKKWUHKQ4uGhSXnIgR2FLMb5P/Q9P2+gZ69ktNf/6NLPP0+xvn31eJuJ5XlEhKhIG/e8gx3H0j/VoxSsu8en3jOu6vt9VHODHVGMNTzjGBe4x+JsRlRj6S3GALuxhH1GMY0ueT9sIGpGQOcxq7QmcYhk7yJiCTH/dAF4wn9X+jEWZt+4gIzIFNeIBHz59N3JtsBF0hxbU+vS1y/XWRlAK5VhFmdbehjiucWZjMexiQxZFJw5Rhz4JHv5pP+Wyj0YxhS+MoR9HeMc2hmwFqaNjCc2oQgV6cYVKJNFkI0ivNxmZqgnZPzXYzJrDPwfpdY5Jue/AQr6CVK1jRe6n0ZOvIFUzOJFTPeflHaTUqRGTuXoM37BhkLG+BRgAwGBahbN+tUYAAAAASUVORK5CYII="

/***/ }),

/***/ "./node_modules/esri-leaflet-geocoder/dist/img/search@2x-disabled.png":
/*!****************************************************************************!*\
  !*** ./node_modules/esri-leaflet-geocoder/dist/img/search@2x-disabled.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIJFgoMNqrWqwAAAQ9JREFUaN7tmk0OhSAMhOWFu3A4zuPhOA2u3sZQkP5QosMSMfZjpoUmhlrr8abxO142AAQgAAEIQAACkOKI3BdTSs358zzJu1TOOcx+p5QytT5w73J3oB6IBGwWSMVyMzCc9UuBuMFZQYks9zRfJHk1a7movUOtAP9zllYTW64V3Gi3W8+1IXGwSksx5yyCQgD6AtDTamVdulUVGgW79TlEVSsqaGpeu+pFi11aoYSJ5azPFJcckkJpq6nW4EmDozbGrWPtwUlaCff2wTu/tropaOTTcqCRclIoF4UsodwsZ5VjrjnUg+KqtHX7wIFyB9K23hYKUVAc2G0sdw+eq1zAjxcAAhCAAAQgAAHoO0AXbOONWZ1W+2oAAAAASUVORK5CYII="

/***/ }),

/***/ "./node_modules/esri-leaflet-geocoder/dist/img/search@2x.png":
/*!*******************************************************************!*\
  !*** ./node_modules/esri-leaflet-geocoder/dist/img/search@2x.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAqZJREFUeNrsmV1IFFEUx3etyIoyqUyKqIdks5fQHsS0DyoKgkgTxHqtQPp4kBAFP6Ke8kGUvigQArOMgt6iRAgJEhQherE2QqGISLMo1ASr7X/gDBwuM7qzLu4ZuQd+cO+ZubP8Z+6955y74VgsFlpIlhZaYGYFWUFWkBVkBVlBVlASbXGiAyORiNelpWA/yAOrwFcwDLrBhN/fiUaj8yPIxVaDenCGhZg2Be6DBvBF+5TbDd6Cix5iyNLBKfAOlGoWVAC6QLbh/wj6wQfDT4IfgxKNgtaCJ2CZ8D0EuWAzi83h9i3wj+9ZBNr5mipBdWCD6FeBEzytzK91DlSAv+xbCZo0CcoElaLfBlpnGUNT7bLo07TbpkXQYV7oIX7rjXGOawbfuR0Gx7QIyhftPh9b8STHJMfytAjKEu0hn2OHRXu9FkG/RHu5z7Hpov1Ti6DPHtMvHtvp8ZyUCuoV7S3gQJzjaFfbJfovtAh6ZWQB10DGLGOWgNscWJ3p1qVFEEX9S6K/HTydYZE7Kc9e4WsB4yrKB7ZOUAaOc7+Iv9od8IzXRxZPx7OcKjn2GlxNdqYQTvQoWNRDKziuFPp8BL2El2AsmfVQMrJtKtoOghvgj49x1/kLHtVYD1H0vwB2gJvgk3H9G+gAR8RGspGr27tgk5Y1ZNogOM+s44yaFv2IuIdqpK2ivwY8APtEJq7ykGSUU6KRGdIex4qNLDxQpz601T938dfyWgycIJpWJ10SWgq29+aarKbqXO4Hb9uThj+bS/O0oAkiewNOu/gPgZogCnIyjRYX/xUjgQ2MILJq0OMSTtq5RA+cINokyl2CcWYicVLLYf0obxJT3H/PgXY61ZnCXGwA7OEy5BH4Pa/Ztlazf3hZQVaQFWQFWUFWkBXkbf8FGABdAnx0Z6IKoQAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./node_modules/leaflet-draw/dist/images/spritesheet-2x.png":
/*!******************************************************************!*\
  !*** ./node_modules/leaflet-draw/dist/images/spritesheet-2x.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./node_modules/leaflet-draw/dist/images/spritesheet.png":
/*!***************************************************************!*\
  !*** ./node_modules/leaflet-draw/dist/images/spritesheet.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./node_modules/leaflet-draw/dist/images/spritesheet.svg":
/*!***************************************************************!*\
  !*** ./node_modules/leaflet-draw/dist/images/spritesheet.svg ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHZpZXdCb3g9IjAgMCA2MDAgNjAiCiAgIGhlaWdodD0iNjAiCiAgIHdpZHRoPSI2MDAiCiAgIGlkPSJzdmc0MjI1IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTEgcjEzNzI1IgogICBzb2RpcG9kaTpkb2NuYW1lPSJzcHJpdGVzaGVldC5zdmciCiAgIGlua3NjYXBlOmV4cG9ydC1maWxlbmFtZT0iL2hvbWUvZnB1Z2EvZGV2ZWxvcG1lbnQvdXBzdHJlYW0vaWNhcnRvLkxlYWZsZXQuZHJhdy9zcmMvaW1hZ2VzL3Nwcml0ZXNoZWV0LTJ4LnBuZyIKICAgaW5rc2NhcGU6ZXhwb3J0LXhkcGk9IjkwIgogICBpbmtzY2FwZTpleHBvcnQteWRwaT0iOTAiPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTQyNTgiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM0MjU2IiAvPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDU2IgogICAgIGlkPSJuYW1lZHZpZXc0MjU0IgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIxLjMxMDE4NTIiCiAgICAgaW5rc2NhcGU6Y3g9IjIzNy41NjkyOCIKICAgICBpbmtzY2FwZTpjeT0iNy4yNDE5NjIxIgogICAgIGlua3NjYXBlOndpbmRvdy14PSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIyNCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzQyMjUiIC8+CiAgPGcKICAgICBpZD0iZW5hYmxlZCIKICAgICBzdHlsZT0iZmlsbDojNDY0NjQ2O2ZpbGwtb3BhY2l0eToxIj4KICAgIDxnCiAgICAgICBpZD0icG9seWxpbmUiCiAgICAgICBzdHlsZT0iZmlsbDojNDY0NjQ2O2ZpbGwtb3BhY2l0eToxIj4KICAgICAgPHBhdGgKICAgICAgICAgZD0ibSAxOCwzNiAwLDYgNiwwIDAsLTYgLTYsMCB6IG0gNCw0IC0yLDAgMCwtMiAyLDAgMCwyIHoiCiAgICAgICAgIGlkPSJwYXRoNDIyOSIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgc3R5bGU9ImZpbGw6IzQ2NDY0NjtmaWxsLW9wYWNpdHk6MSIgLz4KICAgICAgPHBhdGgKICAgICAgICAgZD0ibSAzNiwxOCAwLDYgNiwwIDAsLTYgLTYsMCB6IG0gNCw0IC0yLDAgMCwtMiAyLDAgMCwyIHoiCiAgICAgICAgIGlkPSJwYXRoNDIzMSIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgc3R5bGU9ImZpbGw6IzQ2NDY0NjtmaWxsLW9wYWNpdHk6MSIgLz4KICAgICAgPHBhdGgKICAgICAgICAgZD0ibSAyMy4xNDIsMzkuMTQ1IC0yLjI4NSwtMi4yOSAxNiwtMTUuOTk4IDIuMjg1LDIuMjg1IHoiCiAgICAgICAgIGlkPSJwYXRoNDIzMyIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgc3R5bGU9ImZpbGw6IzQ2NDY0NjtmaWxsLW9wYWNpdHk6MSIgLz4KICAgIDwvZz4KICAgIDxwYXRoCiAgICAgICBpZD0icG9seWdvbiIKICAgICAgIGQ9Ik0gMTAwLDI0LjU2NSA5Ny45MDQsMzkuMzk1IDgzLjA3LDQyIDc2LDI4Ljc3MyA4Ni40NjMsMTggWiIKICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICBzdHlsZT0iZmlsbDojNDY0NjQ2O2ZpbGwtb3BhY2l0eToxIiAvPgogICAgPHBhdGgKICAgICAgIGlkPSJyZWN0YW5nbGUiCiAgICAgICBkPSJtIDE0MCwyMCAyMCwwIDAsMjAgLTIwLDAgeiIKICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICBzdHlsZT0iZmlsbDojNDY0NjQ2O2ZpbGwtb3BhY2l0eToxIiAvPgogICAgPHBhdGgKICAgICAgIGlkPSJjaXJjbGUiCiAgICAgICBkPSJtIDIyMSwzMCBjIDAsNi4wNzggLTQuOTI2LDExIC0xMSwxMSAtNi4wNzQsMCAtMTEsLTQuOTIyIC0xMSwtMTEgMCwtNi4wNzQgNC45MjYsLTExIDExLC0xMSA2LjA3NCwwIDExLDQuOTI2IDExLDExIHoiCiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgc3R5bGU9ImZpbGw6IzQ2NDY0NjtmaWxsLW9wYWNpdHk6MSIgLz4KICAgIDxwYXRoCiAgICAgICBpZD0ibWFya2VyIgogICAgICAgZD0ibSAyNzAsMTkgYyAtNC45NzEsMCAtOSw0LjAyOSAtOSw5IDAsNC45NzEgNS4wMDEsMTIgOSwxNCA0LjAwMSwtMiA5LC05LjAyOSA5LC0xNCAwLC00Ljk3MSAtNC4wMjksLTkgLTksLTkgeiBtIDAsMTIuNSBjIC0yLjQ4NCwwIC00LjUsLTIuMDE0IC00LjUsLTQuNSAwLC0yLjQ4NCAyLjAxNiwtNC41IDQuNSwtNC41IDIuNDg1LDAgNC41LDIuMDE2IDQuNSw0LjUgMCwyLjQ4NiAtMi4wMTUsNC41IC00LjUsNC41IHoiCiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgc3R5bGU9ImZpbGw6IzQ2NDY0NjtmaWxsLW9wYWNpdHk6MSIgLz4KICAgIDxnCiAgICAgICBpZD0iZWRpdCIKICAgICAgIHN0eWxlPSJmaWxsOiM0NjQ2NDY7ZmlsbC1vcGFjaXR5OjEiPgogICAgICA8cGF0aAogICAgICAgICBkPSJtIDMzNywzMC4xNTYgMCwwLjQwNyAwLDUuNjA0IGMgMCwxLjY1OCAtMS4zNDQsMyAtMywzIGwgLTEwLDAgYyAtMS42NTUsMCAtMywtMS4zNDIgLTMsLTMgbCAwLC0xMCBjIDAsLTEuNjU3IDEuMzQ1LC0zIDMsLTMgbCA2LjM0NSwwIDMuMTksLTMuMTcgLTkuNTM1LDAgYyAtMy4zMTMsMCAtNiwyLjY4NyAtNiw2IGwgMCwxMCBjIDAsMy4zMTMgMi42ODcsNiA2LDYgbCAxMCwwIGMgMy4zMTQsMCA2LC0yLjY4NyA2LC02IGwgMCwtOC44MDkgLTMsMi45NjgiCiAgICAgICAgIGlkPSJwYXRoNDI0MCIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgc3R5bGU9ImZpbGw6IzQ2NDY0NjtmaWxsLW9wYWNpdHk6MSIgLz4KICAgICAgPHBhdGgKICAgICAgICAgZD0ibSAzMzguNzIsMjQuNjM3IC04Ljg5Miw4Ljg5MiAtMi44MjgsMCAwLC0yLjgyOSA4Ljg5LC04Ljg5IHoiCiAgICAgICAgIGlkPSJwYXRoNDI0MiIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgc3R5bGU9ImZpbGw6IzQ2NDY0NjtmaWxsLW9wYWNpdHk6MSIgLz4KICAgICAgPHBhdGgKICAgICAgICAgZD0ibSAzMzguNjk3LDE3LjgyNiA0LDAgMCw0IC00LDAgeiIKICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLTAuNzA2OTgzMzYsLTAuNzA3MjMwMTgsMC43MDcyMzAxOCwtMC43MDY5ODMzNiw1NjcuNTU5MTcsMjc0Ljc4MjczKSIKICAgICAgICAgaWQ9InBhdGg0MjQ0IgogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgICBzdHlsZT0iZmlsbDojNDY0NjQ2O2ZpbGwtb3BhY2l0eToxIiAvPgogICAgPC9nPgogICAgPGcKICAgICAgIGlkPSJyZW1vdmUiCiAgICAgICBzdHlsZT0iZmlsbDojNDY0NjQ2O2ZpbGwtb3BhY2l0eToxIj4KICAgICAgPHBhdGgKICAgICAgICAgZD0ibSAzODEsNDIgMTgsMCAwLC0xOCAtMTgsMCAwLDE4IHogbSAxNCwtMTYgMiwwIDAsMTQgLTIsMCAwLC0xNCB6IG0gLTQsMCAyLDAgMCwxNCAtMiwwIDAsLTE0IHogbSAtNCwwIDIsMCAwLDE0IC0yLDAgMCwtMTQgeiBtIC00LDAgMiwwIDAsMTQgLTIsMCAwLC0xNCB6IgogICAgICAgICBpZD0icGF0aDQyNDciCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICAgIHN0eWxlPSJmaWxsOiM0NjQ2NDY7ZmlsbC1vcGFjaXR5OjEiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIGQ9Im0gMzk1LDIwIDAsLTQgLTEwLDAgMCw0IC02LDAgMCwyIDIyLDAgMCwtMiAtNiwwIHogbSAtMiwwIC02LDAgMCwtMiA2LDAgMCwyIHoiCiAgICAgICAgIGlkPSJwYXRoNDI0OSIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgc3R5bGU9ImZpbGw6IzQ2NDY0NjtmaWxsLW9wYWNpdHk6MSIgLz4KICAgIDwvZz4KICA8L2c+CiAgPGcKICAgICBpZD0iZGlzYWJsZWQiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIwLDApIgogICAgIHN0eWxlPSJmaWxsOiNiYmJiYmIiPgogICAgPHVzZQogICAgICAgeGxpbms6aHJlZj0iI2VkaXQiCiAgICAgICBpZD0iZWRpdC1kaXNhYmxlZCIKICAgICAgIHg9IjAiCiAgICAgICB5PSIwIgogICAgICAgd2lkdGg9IjEwMCUiCiAgICAgICBoZWlnaHQ9IjEwMCUiIC8+CiAgICA8dXNlCiAgICAgICB4bGluazpocmVmPSIjcmVtb3ZlIgogICAgICAgaWQ9InJlbW92ZS1kaXNhYmxlZCIKICAgICAgIHg9IjAiCiAgICAgICB5PSIwIgogICAgICAgd2lkdGg9IjEwMCUiCiAgICAgICBoZWlnaHQ9IjEwMCUiIC8+CiAgPC9nPgogIDxwYXRoCiAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzQ2NDY0NjtzdHJva2Utd2lkdGg6MjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgIGlkPSJjaXJjbGUtMyIKICAgICBkPSJtIDU4MS42NTcyNSwzMCBjIDAsNi4wNzggLTQuOTI2LDExIC0xMSwxMSAtNi4wNzQsMCAtMTEsLTQuOTIyIC0xMSwtMTEgMCwtNi4wNzQgNC45MjYsLTExIDExLC0xMSA2LjA3NCwwIDExLDQuOTI2IDExLDExIHoiCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgLz4KPC9zdmc+Cg=="

/***/ }),

/***/ "./node_modules/leaflet/dist/images/layers-2x.png":
/*!********************************************************!*\
  !*** ./node_modules/leaflet/dist/images/layers-2x.png ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII="

/***/ }),

/***/ "./node_modules/leaflet/dist/images/layers.png":
/*!*****************************************************!*\
  !*** ./node_modules/leaflet/dist/images/layers.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAACf0lEQVR4AY1UM3gkARTePdvdoTxXKc+qTl3aU5U6b2Kbkz3Gtq3Zw6ziLGNPzrYx7946Tr6/ee/XeCQ4D3ykPtL5tHno4n0d/h3+xfuWHGLX81cn7r0iTNzjr7LrlxCqPtkbTQEHeqOrTy4Yyt3VCi/IOB0v7rVC7q45Q3Gr5K6jt+3Gl5nCoDD4MtO+j96Wu8atmhGqcNGHObuf8OM/x3AMx38+4Z2sPqzCxRFK2aF2e5Jol56XTLyggAMTL56XOMoS1W4pOyjUcGGQdZxU6qRh7B9Zp+PfpOFlqt0zyDZckPi1ttmIp03jX8gyJ8a/PG2yutpS/Vol7peZIbZcKBAEEheEIAgFbDkz5H6Zrkm2hVWGiXKiF4Ycw0RWKdtC16Q7qe3X4iOMxruonzegJzWaXFrU9utOSsLUmrc0YjeWYjCW4PDMADElpJSSQ0vQvA1Tm6/JlKnqFs1EGyZiFCqnRZTEJJJiKRYzVYzJck2Rm6P4iH+cmSY0YzimYa8l0EtTODFWhcMIMVqdsI2uiTvKmTisIDHJ3od5GILVhBCarCfVRmo4uTjkhrhzkiBV7SsaqS+TzrzM1qpGGUFt28pIySQHR6h7F6KSwGWm97ay+Z+ZqMcEjEWebE7wxCSQwpkhJqoZA5ivCdZDjJepuJ9IQjGGUmuXJdBFUygxVqVsxFsLMbDe8ZbDYVCGKxs+W080max1hFCarCfV+C1KATwcnvE9gRRuMP2prdbWGowm1KB1y+zwMMENkM755cJ2yPDtqhTI6ED1M/82yIDtC/4j4BijjeObflpO9I9MwXTCsSX8jWAFeHr05WoLTJ5G8IQVS/7vwR6ohirYM7f6HzYpogfS3R2OAAAAAElFTkSuQmCC"

/***/ }),

/***/ "./node_modules/leaflet/dist/images/marker-icon.png":
/*!**********************************************************!*\
  !*** ./node_modules/leaflet/dist/images/marker-icon.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII="

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL2Rpc3QvanMvYm9vdHN0cmFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lc3JpLWxlYWZsZXQtZ2VvY29kZXIvZGlzdC9lc3JpLWxlYWZsZXQtZ2VvY29kZXIuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sZWFmbGV0LWRyYXcvZGlzdC9sZWFmbGV0LmRyYXcuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sZWFmbGV0L2Rpc3QvbGVhZmxldC5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzcmktbGVhZmxldC1nZW9jb2Rlci9kaXN0L2ltZy9sb2FkaW5nLmdpZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXNyaS1sZWFmbGV0LWdlb2NvZGVyL2Rpc3QvaW1nL2xvYWRpbmdAMnguZ2lmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lc3JpLWxlYWZsZXQtZ2VvY29kZXIvZGlzdC9pbWcvc2VhcmNoLWRpc2FibGVkLnBuZyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXNyaS1sZWFmbGV0LWdlb2NvZGVyL2Rpc3QvaW1nL3NlYXJjaC5wbmciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzcmktbGVhZmxldC1nZW9jb2Rlci9kaXN0L2ltZy9zZWFyY2hAMngtZGlzYWJsZWQucG5nIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lc3JpLWxlYWZsZXQtZ2VvY29kZXIvZGlzdC9pbWcvc2VhcmNoQDJ4LnBuZyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGVhZmxldC1kcmF3L2Rpc3QvaW1hZ2VzL3Nwcml0ZXNoZWV0LTJ4LnBuZyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGVhZmxldC1kcmF3L2Rpc3QvaW1hZ2VzL3Nwcml0ZXNoZWV0LnBuZyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGVhZmxldC1kcmF3L2Rpc3QvaW1hZ2VzL3Nwcml0ZXNoZWV0LnN2ZyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGVhZmxldC9kaXN0L2ltYWdlcy9sYXllcnMtMngucG5nIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sZWFmbGV0L2Rpc3QvaW1hZ2VzL2xheWVycy5wbmciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLWljb24ucG5nIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsS0FBNEQsb0JBQW9CLG1CQUFPLENBQUMsb0RBQVEsR0FBRyxtQkFBTyxDQUFDLDhEQUFXO0FBQ3hILEVBQUUsU0FDOEQ7QUFDaEUsQ0FBQyxxQ0FBcUM7O0FBRXRDO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7O0FBRXZDO0FBQ0EsZUFBZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRTtBQUNsRTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hELFNBQVM7O0FBRVQ7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7OztBQUdUO0FBQ0EscUVBQXFFOztBQUVyRTtBQUNBO0FBQ0EsU0FBUzs7O0FBR1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87OztBQUdQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7O0FBR1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsUUFBUTs7O0FBR1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7O0FBR1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFROzs7QUFHUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7O0FBRWhDLGlDQUFpQzs7QUFFakMscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTzs7O0FBR1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7O0FBR1I7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7OztBQUdSO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0M7O0FBRXhDO0FBQ0Esc0NBQXNDO0FBQ3RDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBLDZDQUE2QyxTQUFTO0FBQ3REOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnREFBZ0QsU0FBUztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87OztBQUdQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5Qix3QkFBd0I7QUFDakQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7O0FBR1I7QUFDQSxpQ0FBaUM7QUFDakMsK0NBQStDOztBQUUvQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHVDQUF1Qzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFROzs7QUFHUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsMkVBQTJFOztBQUVuSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7O0FBRTVCLDJCQUEyQjs7QUFFM0Isd0JBQXdCOztBQUV4Qiw4QkFBOEI7O0FBRTlCLGdDQUFnQzs7QUFFaEMscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87OztBQUdQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7OztBQUdUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWCxzREFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFROzs7QUFHUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZDQUE2Qzs7QUFFN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwyQ0FBMkMseURBQXlEO0FBQ3BHO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUTs7O0FBR1I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsNkNBQTZDLFNBQVM7QUFDdEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVE7OztBQUdSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87OztBQUdQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTs7O0FBR1I7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnR0FBZ0c7O0FBRWhHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLEVBQUU7O0FBRVg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsRUFBRTs7QUFFWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7O0FBR1I7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnRkFBZ0Y7O0FBRXhIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0RUFBNEU7O0FBRTVFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7OztBQUdUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCOztBQUU1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPOzs7QUFHUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsOENBQThDO0FBQzlDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7OztBQUdSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVE7OztBQUdSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUzs7QUFFVDtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDLHlHQUF5Rzs7QUFFMUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7O0FBR1I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLHNDQUFzQztBQUN0QztBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEM7O0FBRTlDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTs7O0FBR1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFROzs7QUFHUjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQSxPQUFPOzs7QUFHUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7O0FBR1I7QUFDQSxpQ0FBaUMsNkRBQTZEOztBQUU5RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLGtDQUFrQyxLQUFLO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxnREFBZ0Q7OztBQUdoRDtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLDJDQUEyQztBQUMzQzs7QUFFQSxrSUFBa0k7O0FBRWxJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFROzs7QUFHUjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUEsb0NBQW9DLEtBQUs7QUFDekM7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87OztBQUdQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFROzs7QUFHUjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNB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QUF1SSx5QkFBeUIsMkJBQTJCLG9DQUFvQyw4QkFBOEIsb0JBQW9CLE9BQU8seURBQXlELHNCQUFzQixLQUFLLDBCQUEwQix1QkFBdUIsS0FBSyxvRUFBb0UsZ0JBQWdCLHdCQUF3QixPQUFPLGlDQUFpQyxnQkFBZ0IsMkJBQTJCLDZCQUE2QixPQUFPLG9DQUFvQyxhQUFhLHdCQUF3Qix3QkFBd0IsZ0NBQWdDLE9BQU8sMkJBQTJCLHdCQUF3QixLQUFLLDRCQUE0Qix1QkFBdUIsS0FBSyxvRUFBb0UsZUFBZSx1QkFBdUIsT0FBTyxrQ0FBa0MsZUFBZSwwQkFBMEIsOEJBQThCLE9BQU8sbUNBQW1DLGNBQWMseUJBQXlCLCtCQUErQixPQUFPOztBQUVuZ2Y7Ozs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2ZBLGlDQUFpQyxnckQ7Ozs7Ozs7Ozs7O0FDQWpDLGlDQUFpQyw0cks7Ozs7Ozs7Ozs7O0FDQWpDLGlDQUFpQyw0Z0I7Ozs7Ozs7Ozs7O0FDQWpDLGlDQUFpQyxna0I7Ozs7Ozs7Ozs7O0FDQWpDLGlDQUFpQyw0Z0I7Ozs7Ozs7Ozs7O0FDQWpDLGlDQUFpQyxnaEM7Ozs7Ozs7Ozs7O0FDQWpDLGlDQUFpQyxncko7Ozs7Ozs7Ozs7O0FDQWpDLGlDQUFpQyx3L0U7Ozs7Ozs7Ozs7O0FDQWpDLHFDQUFxQyxvdk87Ozs7Ozs7Ozs7O0FDQXJDLGlDQUFpQyx3cEQ7Ozs7Ozs7Ozs7O0FDQWpDLGlDQUFpQyx3NkI7Ozs7Ozs7Ozs7O0FDQWpDLGlDQUFpQyw0NkQiLCJmaWxlIjoidmVuZG9yc35ib290c3RyYXAuYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICAqIEJvb3RzdHJhcCB2NC4xLjMgKGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS8pXG4gICogQ29weXJpZ2h0IDIwMTEtMjAxOCBUaGUgQm9vdHN0cmFwIEF1dGhvcnMgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ncmFwaHMvY29udHJpYnV0b3JzKVxuICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMsIHJlcXVpcmUoJ2pxdWVyeScpLCByZXF1aXJlKCdwb3BwZXIuanMnKSkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJywgJ2pxdWVyeScsICdwb3BwZXIuanMnXSwgZmFjdG9yeSkgOlxuICAoZmFjdG9yeSgoZ2xvYmFsLmJvb3RzdHJhcCA9IHt9KSxnbG9iYWwualF1ZXJ5LGdsb2JhbC5Qb3BwZXIpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChleHBvcnRzLCQsUG9wcGVyKSB7ICd1c2Ugc3RyaWN0JztcblxuICAkID0gJCAmJiAkLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykgPyAkWydkZWZhdWx0J10gOiAkO1xuICBQb3BwZXIgPSBQb3BwZXIgJiYgUG9wcGVyLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykgPyBQb3BwZXJbJ2RlZmF1bHQnXSA6IFBvcHBlcjtcblxuICBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH1cblxuICBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcbiAgICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICAgIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICAgIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICAgIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG4gIH1cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NC4xLjMpOiB1dGlsLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIHZhciBVdGlsID0gZnVuY3Rpb24gKCQkJDEpIHtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBQcml2YXRlIFRyYW5zaXRpb25FbmQgSGVscGVyc1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuICAgIHZhciBUUkFOU0lUSU9OX0VORCA9ICd0cmFuc2l0aW9uZW5kJztcbiAgICB2YXIgTUFYX1VJRCA9IDEwMDAwMDA7XG4gICAgdmFyIE1JTExJU0VDT05EU19NVUxUSVBMSUVSID0gMTAwMDsgLy8gU2hvdXRvdXQgQW5ndXNDcm9sbCAoaHR0cHM6Ly9nb28uZ2wvcHh3UUdwKVxuXG4gICAgZnVuY3Rpb24gdG9UeXBlKG9iaikge1xuICAgICAgcmV0dXJuIHt9LnRvU3RyaW5nLmNhbGwob2JqKS5tYXRjaCgvXFxzKFthLXpdKykvaSlbMV0udG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTcGVjaWFsVHJhbnNpdGlvbkVuZEV2ZW50KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYmluZFR5cGU6IFRSQU5TSVRJT05fRU5ELFxuICAgICAgICBkZWxlZ2F0ZVR5cGU6IFRSQU5TSVRJT05fRU5ELFxuICAgICAgICBoYW5kbGU6IGZ1bmN0aW9uIGhhbmRsZShldmVudCkge1xuICAgICAgICAgIGlmICgkJCQxKGV2ZW50LnRhcmdldCkuaXModGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudC5oYW5kbGVPYmouaGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHByZWZlci1yZXN0LXBhcmFtc1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNpdGlvbkVuZEVtdWxhdG9yKGR1cmF0aW9uKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gICAgICAkJCQxKHRoaXMpLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICB9KTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICAgIFV0aWwudHJpZ2dlclRyYW5zaXRpb25FbmQoX3RoaXMpO1xuICAgICAgICB9XG4gICAgICB9LCBkdXJhdGlvbik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uRW5kU3VwcG9ydCgpIHtcbiAgICAgICQkJDEuZm4uZW11bGF0ZVRyYW5zaXRpb25FbmQgPSB0cmFuc2l0aW9uRW5kRW11bGF0b3I7XG4gICAgICAkJCQxLmV2ZW50LnNwZWNpYWxbVXRpbC5UUkFOU0lUSU9OX0VORF0gPSBnZXRTcGVjaWFsVHJhbnNpdGlvbkVuZEV2ZW50KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogUHVibGljIFV0aWwgQXBpXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuXG4gICAgdmFyIFV0aWwgPSB7XG4gICAgICBUUkFOU0lUSU9OX0VORDogJ2JzVHJhbnNpdGlvbkVuZCcsXG4gICAgICBnZXRVSUQ6IGZ1bmN0aW9uIGdldFVJRChwcmVmaXgpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgICAgICAgcHJlZml4ICs9IH5+KE1hdGgucmFuZG9tKCkgKiBNQVhfVUlEKTsgLy8gXCJ+flwiIGFjdHMgbGlrZSBhIGZhc3RlciBNYXRoLmZsb29yKCkgaGVyZVxuICAgICAgICB9IHdoaWxlIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmVmaXgpKTtcblxuICAgICAgICByZXR1cm4gcHJlZml4O1xuICAgICAgfSxcbiAgICAgIGdldFNlbGVjdG9yRnJvbUVsZW1lbnQ6IGZ1bmN0aW9uIGdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZWN0b3IgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKTtcblxuICAgICAgICBpZiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSAnIycpIHtcbiAgICAgICAgICBzZWxlY3RvciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogbnVsbDtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudDogZnVuY3Rpb24gZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSAvLyBHZXQgdHJhbnNpdGlvbi1kdXJhdGlvbiBvZiB0aGUgZWxlbWVudFxuXG5cbiAgICAgICAgdmFyIHRyYW5zaXRpb25EdXJhdGlvbiA9ICQkJDEoZWxlbWVudCkuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJyk7XG4gICAgICAgIHZhciBmbG9hdFRyYW5zaXRpb25EdXJhdGlvbiA9IHBhcnNlRmxvYXQodHJhbnNpdGlvbkR1cmF0aW9uKTsgLy8gUmV0dXJuIDAgaWYgZWxlbWVudCBvciB0cmFuc2l0aW9uIGR1cmF0aW9uIGlzIG5vdCBmb3VuZFxuXG4gICAgICAgIGlmICghZmxvYXRUcmFuc2l0aW9uRHVyYXRpb24pIHtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSAvLyBJZiBtdWx0aXBsZSBkdXJhdGlvbnMgYXJlIGRlZmluZWQsIHRha2UgdGhlIGZpcnN0XG5cblxuICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb24gPSB0cmFuc2l0aW9uRHVyYXRpb24uc3BsaXQoJywnKVswXTtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodHJhbnNpdGlvbkR1cmF0aW9uKSAqIE1JTExJU0VDT05EU19NVUxUSVBMSUVSO1xuICAgICAgfSxcbiAgICAgIHJlZmxvdzogZnVuY3Rpb24gcmVmbG93KGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgfSxcbiAgICAgIHRyaWdnZXJUcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiB0cmlnZ2VyVHJhbnNpdGlvbkVuZChlbGVtZW50KSB7XG4gICAgICAgICQkJDEoZWxlbWVudCkudHJpZ2dlcihUUkFOU0lUSU9OX0VORCk7XG4gICAgICB9LFxuICAgICAgLy8gVE9ETzogUmVtb3ZlIGluIHY1XG4gICAgICBzdXBwb3J0c1RyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIHN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oVFJBTlNJVElPTl9FTkQpO1xuICAgICAgfSxcbiAgICAgIGlzRWxlbWVudDogZnVuY3Rpb24gaXNFbGVtZW50KG9iaikge1xuICAgICAgICByZXR1cm4gKG9ialswXSB8fCBvYmopLm5vZGVUeXBlO1xuICAgICAgfSxcbiAgICAgIHR5cGVDaGVja0NvbmZpZzogZnVuY3Rpb24gdHlwZUNoZWNrQ29uZmlnKGNvbXBvbmVudE5hbWUsIGNvbmZpZywgY29uZmlnVHlwZXMpIHtcbiAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gY29uZmlnVHlwZXMpIHtcbiAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZ1R5cGVzLCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgIHZhciBleHBlY3RlZFR5cGVzID0gY29uZmlnVHlwZXNbcHJvcGVydHldO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gY29uZmlnW3Byb3BlcnR5XTtcbiAgICAgICAgICAgIHZhciB2YWx1ZVR5cGUgPSB2YWx1ZSAmJiBVdGlsLmlzRWxlbWVudCh2YWx1ZSkgPyAnZWxlbWVudCcgOiB0b1R5cGUodmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAoIW5ldyBSZWdFeHAoZXhwZWN0ZWRUeXBlcykudGVzdCh2YWx1ZVR5cGUpKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihjb21wb25lbnROYW1lLnRvVXBwZXJDYXNlKCkgKyBcIjogXCIgKyAoXCJPcHRpb24gXFxcIlwiICsgcHJvcGVydHkgKyBcIlxcXCIgcHJvdmlkZWQgdHlwZSBcXFwiXCIgKyB2YWx1ZVR5cGUgKyBcIlxcXCIgXCIpICsgKFwiYnV0IGV4cGVjdGVkIHR5cGUgXFxcIlwiICsgZXhwZWN0ZWRUeXBlcyArIFwiXFxcIi5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgc2V0VHJhbnNpdGlvbkVuZFN1cHBvcnQoKTtcbiAgICByZXR1cm4gVXRpbDtcbiAgfSgkKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NC4xLjMpOiBhbGVydC5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgQWxlcnQgPSBmdW5jdGlvbiAoJCQkMSkge1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENvbnN0YW50c1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuICAgIHZhciBOQU1FID0gJ2FsZXJ0JztcbiAgICB2YXIgVkVSU0lPTiA9ICc0LjEuMyc7XG4gICAgdmFyIERBVEFfS0VZID0gJ2JzLmFsZXJ0JztcbiAgICB2YXIgRVZFTlRfS0VZID0gXCIuXCIgKyBEQVRBX0tFWTtcbiAgICB2YXIgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSc7XG4gICAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQkJDEuZm5bTkFNRV07XG4gICAgdmFyIFNlbGVjdG9yID0ge1xuICAgICAgRElTTUlTUzogJ1tkYXRhLWRpc21pc3M9XCJhbGVydFwiXSdcbiAgICB9O1xuICAgIHZhciBFdmVudCA9IHtcbiAgICAgIENMT1NFOiBcImNsb3NlXCIgKyBFVkVOVF9LRVksXG4gICAgICBDTE9TRUQ6IFwiY2xvc2VkXCIgKyBFVkVOVF9LRVksXG4gICAgICBDTElDS19EQVRBX0FQSTogXCJjbGlja1wiICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZXG4gICAgfTtcbiAgICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgICAgQUxFUlQ6ICdhbGVydCcsXG4gICAgICBGQURFOiAnZmFkZScsXG4gICAgICBTSE9XOiAnc2hvdydcbiAgICAgIC8qKlxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqL1xuXG4gICAgfTtcblxuICAgIHZhciBBbGVydCA9XG4gICAgLyojX19QVVJFX18qL1xuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIEFsZXJ0KGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICB9IC8vIEdldHRlcnNcblxuXG4gICAgICB2YXIgX3Byb3RvID0gQWxlcnQucHJvdG90eXBlO1xuXG4gICAgICAvLyBQdWJsaWNcbiAgICAgIF9wcm90by5jbG9zZSA9IGZ1bmN0aW9uIGNsb3NlKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHJvb3RFbGVtZW50ID0gdGhpcy5fZWxlbWVudDtcblxuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgIHJvb3RFbGVtZW50ID0gdGhpcy5fZ2V0Um9vdEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY3VzdG9tRXZlbnQgPSB0aGlzLl90cmlnZ2VyQ2xvc2VFdmVudChyb290RWxlbWVudCk7XG5cbiAgICAgICAgaWYgKGN1c3RvbUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVtb3ZlRWxlbWVudChyb290RWxlbWVudCk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAgICQkJDEucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgfTsgLy8gUHJpdmF0ZVxuXG5cbiAgICAgIF9wcm90by5fZ2V0Um9vdEVsZW1lbnQgPSBmdW5jdGlvbiBfZ2V0Um9vdEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIHZhciBwYXJlbnQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgICAgcGFyZW50ID0gJCQkMShlbGVtZW50KS5jbG9zZXN0KFwiLlwiICsgQ2xhc3NOYW1lLkFMRVJUKVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX3RyaWdnZXJDbG9zZUV2ZW50ID0gZnVuY3Rpb24gX3RyaWdnZXJDbG9zZUV2ZW50KGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGNsb3NlRXZlbnQgPSAkJCQxLkV2ZW50KEV2ZW50LkNMT1NFKTtcbiAgICAgICAgJCQkMShlbGVtZW50KS50cmlnZ2VyKGNsb3NlRXZlbnQpO1xuICAgICAgICByZXR1cm4gY2xvc2VFdmVudDtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fcmVtb3ZlRWxlbWVudCA9IGZ1bmN0aW9uIF9yZW1vdmVFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAkJCQxKGVsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKTtcblxuICAgICAgICBpZiAoISQkJDEoZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpKSB7XG4gICAgICAgICAgdGhpcy5fZGVzdHJveUVsZW1lbnQoZWxlbWVudCk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgJCQkMShlbGVtZW50KS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLl9kZXN0cm95RWxlbWVudChlbGVtZW50LCBldmVudCk7XG4gICAgICAgIH0pLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbik7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2Rlc3Ryb3lFbGVtZW50ID0gZnVuY3Rpb24gX2Rlc3Ryb3lFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgJCQkMShlbGVtZW50KS5kZXRhY2goKS50cmlnZ2VyKEV2ZW50LkNMT1NFRCkucmVtb3ZlKCk7XG4gICAgICB9OyAvLyBTdGF0aWNcblxuXG4gICAgICBBbGVydC5falF1ZXJ5SW50ZXJmYWNlID0gZnVuY3Rpb24gX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyICRlbGVtZW50ID0gJCQkMSh0aGlzKTtcbiAgICAgICAgICB2YXIgZGF0YSA9ICRlbGVtZW50LmRhdGEoREFUQV9LRVkpO1xuXG4gICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICBkYXRhID0gbmV3IEFsZXJ0KHRoaXMpO1xuICAgICAgICAgICAgJGVsZW1lbnQuZGF0YShEQVRBX0tFWSwgZGF0YSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvbmZpZyA9PT0gJ2Nsb3NlJykge1xuICAgICAgICAgICAgZGF0YVtjb25maWddKHRoaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBBbGVydC5faGFuZGxlRGlzbWlzcyA9IGZ1bmN0aW9uIF9oYW5kbGVEaXNtaXNzKGFsZXJ0SW5zdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhbGVydEluc3RhbmNlLmNsb3NlKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgX2NyZWF0ZUNsYXNzKEFsZXJ0LCBudWxsLCBbe1xuICAgICAgICBrZXk6IFwiVkVSU0lPTlwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgICAgfVxuICAgICAgfV0pO1xuXG4gICAgICByZXR1cm4gQWxlcnQ7XG4gICAgfSgpO1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cblxuICAgICQkJDEoZG9jdW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5ESVNNSVNTLCBBbGVydC5faGFuZGxlRGlzbWlzcyhuZXcgQWxlcnQoKSkpO1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIGpRdWVyeVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgJCQkMS5mbltOQU1FXSA9IEFsZXJ0Ll9qUXVlcnlJbnRlcmZhY2U7XG4gICAgJCQkMS5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IEFsZXJ0O1xuXG4gICAgJCQkMS5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgJCQkMS5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICAgIHJldHVybiBBbGVydC5falF1ZXJ5SW50ZXJmYWNlO1xuICAgIH07XG5cbiAgICByZXR1cm4gQWxlcnQ7XG4gIH0oJCk7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCAodjQuMS4zKTogYnV0dG9uLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIHZhciBCdXR0b24gPSBmdW5jdGlvbiAoJCQkMSkge1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENvbnN0YW50c1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuICAgIHZhciBOQU1FID0gJ2J1dHRvbic7XG4gICAgdmFyIFZFUlNJT04gPSAnNC4xLjMnO1xuICAgIHZhciBEQVRBX0tFWSA9ICdicy5idXR0b24nO1xuICAgIHZhciBFVkVOVF9LRVkgPSBcIi5cIiArIERBVEFfS0VZO1xuICAgIHZhciBEQVRBX0FQSV9LRVkgPSAnLmRhdGEtYXBpJztcbiAgICB2YXIgSlFVRVJZX05PX0NPTkZMSUNUID0gJCQkMS5mbltOQU1FXTtcbiAgICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgICAgQUNUSVZFOiAnYWN0aXZlJyxcbiAgICAgIEJVVFRPTjogJ2J0bicsXG4gICAgICBGT0NVUzogJ2ZvY3VzJ1xuICAgIH07XG4gICAgdmFyIFNlbGVjdG9yID0ge1xuICAgICAgREFUQV9UT0dHTEVfQ0FSUk9UOiAnW2RhdGEtdG9nZ2xlXj1cImJ1dHRvblwiXScsXG4gICAgICBEQVRBX1RPR0dMRTogJ1tkYXRhLXRvZ2dsZT1cImJ1dHRvbnNcIl0nLFxuICAgICAgSU5QVVQ6ICdpbnB1dCcsXG4gICAgICBBQ1RJVkU6ICcuYWN0aXZlJyxcbiAgICAgIEJVVFRPTjogJy5idG4nXG4gICAgfTtcbiAgICB2YXIgRXZlbnQgPSB7XG4gICAgICBDTElDS19EQVRBX0FQSTogXCJjbGlja1wiICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZLFxuICAgICAgRk9DVVNfQkxVUl9EQVRBX0FQSTogXCJmb2N1c1wiICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZICsgXCIgXCIgKyAoXCJibHVyXCIgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVkpXG4gICAgICAvKipcbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKi9cblxuICAgIH07XG5cbiAgICB2YXIgQnV0dG9uID1cbiAgICAvKiNfX1BVUkVfXyovXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gQnV0dG9uKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICB9IC8vIEdldHRlcnNcblxuXG4gICAgICB2YXIgX3Byb3RvID0gQnV0dG9uLnByb3RvdHlwZTtcblxuICAgICAgLy8gUHVibGljXG4gICAgICBfcHJvdG8udG9nZ2xlID0gZnVuY3Rpb24gdG9nZ2xlKCkge1xuICAgICAgICB2YXIgdHJpZ2dlckNoYW5nZUV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgdmFyIGFkZEFyaWFQcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgdmFyIHJvb3RFbGVtZW50ID0gJCQkMSh0aGlzLl9lbGVtZW50KS5jbG9zZXN0KFNlbGVjdG9yLkRBVEFfVE9HR0xFKVswXTtcblxuICAgICAgICBpZiAocm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuSU5QVVQpO1xuXG4gICAgICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICBpZiAoaW5wdXQuY2hlY2tlZCAmJiB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDbGFzc05hbWUuQUNUSVZFKSkge1xuICAgICAgICAgICAgICAgIHRyaWdnZXJDaGFuZ2VFdmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVFbGVtZW50ID0gcm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5BQ1RJVkUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICQkJDEoYWN0aXZlRWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0cmlnZ2VyQ2hhbmdlRXZlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKGlucHV0Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSB8fCByb290RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgfHwgaW5wdXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpIHx8IHJvb3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSAhdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgICAgICAgICQkJDEoaW5wdXQpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgYWRkQXJpYVByZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWRkQXJpYVByZXNzZWQpIHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgIXRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENsYXNzTmFtZS5BQ1RJVkUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0cmlnZ2VyQ2hhbmdlRXZlbnQpIHtcbiAgICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAgICQkJDEucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgfTsgLy8gU3RhdGljXG5cblxuICAgICAgQnV0dG9uLl9qUXVlcnlJbnRlcmZhY2UgPSBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9ICQkJDEodGhpcykuZGF0YShEQVRBX0tFWSk7XG5cbiAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgQnV0dG9uKHRoaXMpO1xuICAgICAgICAgICAgJCQkMSh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29uZmlnID09PSAndG9nZ2xlJykge1xuICAgICAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIF9jcmVhdGVDbGFzcyhCdXR0b24sIG51bGwsIFt7XG4gICAgICAgIGtleTogXCJWRVJTSU9OXCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgICAgICB9XG4gICAgICB9XSk7XG5cbiAgICAgIHJldHVybiBCdXR0b247XG4gICAgfSgpO1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cblxuICAgICQkJDEoZG9jdW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRV9DQVJST1QsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBidXR0b24gPSBldmVudC50YXJnZXQ7XG5cbiAgICAgIGlmICghJCQkMShidXR0b24pLmhhc0NsYXNzKENsYXNzTmFtZS5CVVRUT04pKSB7XG4gICAgICAgIGJ1dHRvbiA9ICQkJDEoYnV0dG9uKS5jbG9zZXN0KFNlbGVjdG9yLkJVVFRPTik7XG4gICAgICB9XG5cbiAgICAgIEJ1dHRvbi5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJCQkMShidXR0b24pLCAndG9nZ2xlJyk7XG4gICAgfSkub24oRXZlbnQuRk9DVVNfQkxVUl9EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEVfQ0FSUk9ULCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciBidXR0b24gPSAkJCQxKGV2ZW50LnRhcmdldCkuY2xvc2VzdChTZWxlY3Rvci5CVVRUT04pWzBdO1xuICAgICAgJCQkMShidXR0b24pLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5GT0NVUywgL15mb2N1cyhpbik/JC8udGVzdChldmVudC50eXBlKSk7XG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogalF1ZXJ5XG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICAkJCQxLmZuW05BTUVdID0gQnV0dG9uLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgJCQkMS5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IEJ1dHRvbjtcblxuICAgICQkJDEuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICQkJDEuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgICByZXR1cm4gQnV0dG9uLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgfTtcblxuICAgIHJldHVybiBCdXR0b247XG4gIH0oJCk7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCAodjQuMS4zKTogY2Fyb3VzZWwuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIENhcm91c2VsID0gZnVuY3Rpb24gKCQkJDEpIHtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBDb25zdGFudHNcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cbiAgICB2YXIgTkFNRSA9ICdjYXJvdXNlbCc7XG4gICAgdmFyIFZFUlNJT04gPSAnNC4xLjMnO1xuICAgIHZhciBEQVRBX0tFWSA9ICdicy5jYXJvdXNlbCc7XG4gICAgdmFyIEVWRU5UX0tFWSA9IFwiLlwiICsgREFUQV9LRVk7XG4gICAgdmFyIERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknO1xuICAgIHZhciBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkJCQxLmZuW05BTUVdO1xuICAgIHZhciBBUlJPV19MRUZUX0tFWUNPREUgPSAzNzsgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgbGVmdCBhcnJvdyBrZXlcblxuICAgIHZhciBBUlJPV19SSUdIVF9LRVlDT0RFID0gMzk7IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIHJpZ2h0IGFycm93IGtleVxuXG4gICAgdmFyIFRPVUNIRVZFTlRfQ09NUEFUX1dBSVQgPSA1MDA7IC8vIFRpbWUgZm9yIG1vdXNlIGNvbXBhdCBldmVudHMgdG8gZmlyZSBhZnRlciB0b3VjaFxuXG4gICAgdmFyIERlZmF1bHQgPSB7XG4gICAgICBpbnRlcnZhbDogNTAwMCxcbiAgICAgIGtleWJvYXJkOiB0cnVlLFxuICAgICAgc2xpZGU6IGZhbHNlLFxuICAgICAgcGF1c2U6ICdob3ZlcicsXG4gICAgICB3cmFwOiB0cnVlXG4gICAgfTtcbiAgICB2YXIgRGVmYXVsdFR5cGUgPSB7XG4gICAgICBpbnRlcnZhbDogJyhudW1iZXJ8Ym9vbGVhbiknLFxuICAgICAga2V5Ym9hcmQ6ICdib29sZWFuJyxcbiAgICAgIHNsaWRlOiAnKGJvb2xlYW58c3RyaW5nKScsXG4gICAgICBwYXVzZTogJyhzdHJpbmd8Ym9vbGVhbiknLFxuICAgICAgd3JhcDogJ2Jvb2xlYW4nXG4gICAgfTtcbiAgICB2YXIgRGlyZWN0aW9uID0ge1xuICAgICAgTkVYVDogJ25leHQnLFxuICAgICAgUFJFVjogJ3ByZXYnLFxuICAgICAgTEVGVDogJ2xlZnQnLFxuICAgICAgUklHSFQ6ICdyaWdodCdcbiAgICB9O1xuICAgIHZhciBFdmVudCA9IHtcbiAgICAgIFNMSURFOiBcInNsaWRlXCIgKyBFVkVOVF9LRVksXG4gICAgICBTTElEOiBcInNsaWRcIiArIEVWRU5UX0tFWSxcbiAgICAgIEtFWURPV046IFwia2V5ZG93blwiICsgRVZFTlRfS0VZLFxuICAgICAgTU9VU0VFTlRFUjogXCJtb3VzZWVudGVyXCIgKyBFVkVOVF9LRVksXG4gICAgICBNT1VTRUxFQVZFOiBcIm1vdXNlbGVhdmVcIiArIEVWRU5UX0tFWSxcbiAgICAgIFRPVUNIRU5EOiBcInRvdWNoZW5kXCIgKyBFVkVOVF9LRVksXG4gICAgICBMT0FEX0RBVEFfQVBJOiBcImxvYWRcIiArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWSxcbiAgICAgIENMSUNLX0RBVEFfQVBJOiBcImNsaWNrXCIgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVlcbiAgICB9O1xuICAgIHZhciBDbGFzc05hbWUgPSB7XG4gICAgICBDQVJPVVNFTDogJ2Nhcm91c2VsJyxcbiAgICAgIEFDVElWRTogJ2FjdGl2ZScsXG4gICAgICBTTElERTogJ3NsaWRlJyxcbiAgICAgIFJJR0hUOiAnY2Fyb3VzZWwtaXRlbS1yaWdodCcsXG4gICAgICBMRUZUOiAnY2Fyb3VzZWwtaXRlbS1sZWZ0JyxcbiAgICAgIE5FWFQ6ICdjYXJvdXNlbC1pdGVtLW5leHQnLFxuICAgICAgUFJFVjogJ2Nhcm91c2VsLWl0ZW0tcHJldicsXG4gICAgICBJVEVNOiAnY2Fyb3VzZWwtaXRlbSdcbiAgICB9O1xuICAgIHZhciBTZWxlY3RvciA9IHtcbiAgICAgIEFDVElWRTogJy5hY3RpdmUnLFxuICAgICAgQUNUSVZFX0lURU06ICcuYWN0aXZlLmNhcm91c2VsLWl0ZW0nLFxuICAgICAgSVRFTTogJy5jYXJvdXNlbC1pdGVtJyxcbiAgICAgIE5FWFRfUFJFVjogJy5jYXJvdXNlbC1pdGVtLW5leHQsIC5jYXJvdXNlbC1pdGVtLXByZXYnLFxuICAgICAgSU5ESUNBVE9SUzogJy5jYXJvdXNlbC1pbmRpY2F0b3JzJyxcbiAgICAgIERBVEFfU0xJREU6ICdbZGF0YS1zbGlkZV0sIFtkYXRhLXNsaWRlLXRvXScsXG4gICAgICBEQVRBX1JJREU6ICdbZGF0YS1yaWRlPVwiY2Fyb3VzZWxcIl0nXG4gICAgICAvKipcbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKi9cblxuICAgIH07XG5cbiAgICB2YXIgQ2Fyb3VzZWwgPVxuICAgIC8qI19fUFVSRV9fKi9cbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBDYXJvdXNlbChlbGVtZW50LCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5faXRlbXMgPSBudWxsO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1NsaWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50b3VjaFRpbWVvdXQgPSBudWxsO1xuICAgICAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9ICQkJDEoZWxlbWVudClbMF07XG4gICAgICAgIHRoaXMuX2luZGljYXRvcnNFbGVtZW50ID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLklORElDQVRPUlMpO1xuXG4gICAgICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICB9IC8vIEdldHRlcnNcblxuXG4gICAgICB2YXIgX3Byb3RvID0gQ2Fyb3VzZWwucHJvdG90eXBlO1xuXG4gICAgICAvLyBQdWJsaWNcbiAgICAgIF9wcm90by5uZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgICAgICB0aGlzLl9zbGlkZShEaXJlY3Rpb24uTkVYVCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5uZXh0V2hlblZpc2libGUgPSBmdW5jdGlvbiBuZXh0V2hlblZpc2libGUoKSB7XG4gICAgICAgIC8vIERvbid0IGNhbGwgbmV4dCB3aGVuIHRoZSBwYWdlIGlzbid0IHZpc2libGVcbiAgICAgICAgLy8gb3IgdGhlIGNhcm91c2VsIG9yIGl0cyBwYXJlbnQgaXNuJ3QgdmlzaWJsZVxuICAgICAgICBpZiAoIWRvY3VtZW50LmhpZGRlbiAmJiAkJCQxKHRoaXMuX2VsZW1lbnQpLmlzKCc6dmlzaWJsZScpICYmICQkJDEodGhpcy5fZWxlbWVudCkuY3NzKCd2aXNpYmlsaXR5JykgIT09ICdoaWRkZW4nKSB7XG4gICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5wcmV2ID0gZnVuY3Rpb24gcHJldigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgICAgICB0aGlzLl9zbGlkZShEaXJlY3Rpb24uUFJFVik7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5wYXVzZSA9IGZ1bmN0aW9uIHBhdXNlKGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQpIHtcbiAgICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLk5FWFRfUFJFVikpIHtcbiAgICAgICAgICBVdGlsLnRyaWdnZXJUcmFuc2l0aW9uRW5kKHRoaXMuX2VsZW1lbnQpO1xuICAgICAgICAgIHRoaXMuY3ljbGUodHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsKTtcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLmN5Y2xlID0gZnVuY3Rpb24gY3ljbGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudCkge1xuICAgICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faW50ZXJ2YWwpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsKTtcbiAgICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmludGVydmFsICYmICF0aGlzLl9pc1BhdXNlZCkge1xuICAgICAgICAgIHRoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA/IHRoaXMubmV4dFdoZW5WaXNpYmxlIDogdGhpcy5uZXh0KS5iaW5kKHRoaXMpLCB0aGlzLl9jb25maWcuaW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8udG8gPSBmdW5jdGlvbiB0byhpbmRleCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuX2FjdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuQUNUSVZFX0lURU0pO1xuXG4gICAgICAgIHZhciBhY3RpdmVJbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleCh0aGlzLl9hY3RpdmVFbGVtZW50KTtcblxuICAgICAgICBpZiAoaW5kZXggPiB0aGlzLl9pdGVtcy5sZW5ndGggLSAxIHx8IGluZGV4IDwgMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLm9uZShFdmVudC5TTElELCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMudG8oaW5kZXgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhY3RpdmVJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgdGhpcy5jeWNsZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBpbmRleCA+IGFjdGl2ZUluZGV4ID8gRGlyZWN0aW9uLk5FWFQgOiBEaXJlY3Rpb24uUFJFVjtcblxuICAgICAgICB0aGlzLl9zbGlkZShkaXJlY3Rpb24sIHRoaXMuX2l0ZW1zW2luZGV4XSk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkub2ZmKEVWRU5UX0tFWSk7XG4gICAgICAgICQkJDEucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbDtcbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9pc1NsaWRpbmcgPSBudWxsO1xuICAgICAgICB0aGlzLl9hY3RpdmVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5faW5kaWNhdG9yc0VsZW1lbnQgPSBudWxsO1xuICAgICAgfTsgLy8gUHJpdmF0ZVxuXG5cbiAgICAgIF9wcm90by5fZ2V0Q29uZmlnID0gZnVuY3Rpb24gX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgICAgY29uZmlnID0gX29iamVjdFNwcmVhZCh7fSwgRGVmYXVsdCwgY29uZmlnKTtcbiAgICAgICAgVXRpbC50eXBlQ2hlY2tDb25maWcoTkFNRSwgY29uZmlnLCBEZWZhdWx0VHlwZSk7XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2FkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5LRVlET1dOLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpczIuX2tleWRvd24oZXZlbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5wYXVzZSA9PT0gJ2hvdmVyJykge1xuICAgICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkub24oRXZlbnQuTU9VU0VFTlRFUiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMyLnBhdXNlKGV2ZW50KTtcbiAgICAgICAgICB9KS5vbihFdmVudC5NT1VTRUxFQVZFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpczIuY3ljbGUoZXZlbnQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gSWYgaXQncyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlLCBtb3VzZWVudGVyL2xlYXZlIGFyZSBmaXJlZCBhc1xuICAgICAgICAgICAgLy8gcGFydCBvZiB0aGUgbW91c2UgY29tcGF0aWJpbGl0eSBldmVudHMgb24gZmlyc3QgdGFwIC0gdGhlIGNhcm91c2VsXG4gICAgICAgICAgICAvLyB3b3VsZCBzdG9wIGN5Y2xpbmcgdW50aWwgdXNlciB0YXBwZWQgb3V0IG9mIGl0O1xuICAgICAgICAgICAgLy8gaGVyZSwgd2UgbGlzdGVuIGZvciB0b3VjaGVuZCwgZXhwbGljaXRseSBwYXVzZSB0aGUgY2Fyb3VzZWxcbiAgICAgICAgICAgIC8vIChhcyBpZiBpdCdzIHRoZSBzZWNvbmQgdGltZSB3ZSB0YXAgb24gaXQsIG1vdXNlZW50ZXIgY29tcGF0IGV2ZW50XG4gICAgICAgICAgICAvLyBpcyBOT1QgZmlyZWQpIGFuZCBhZnRlciBhIHRpbWVvdXQgKHRvIGFsbG93IGZvciBtb3VzZSBjb21wYXRpYmlsaXR5XG4gICAgICAgICAgICAvLyBldmVudHMgdG8gZmlyZSkgd2UgZXhwbGljaXRseSByZXN0YXJ0IGN5Y2xpbmdcbiAgICAgICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkub24oRXZlbnQuVE9VQ0hFTkQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgX3RoaXMyLnBhdXNlKCk7XG5cbiAgICAgICAgICAgICAgaWYgKF90aGlzMi50b3VjaFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMyLnRvdWNoVGltZW91dCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBfdGhpczIudG91Y2hUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLmN5Y2xlKGV2ZW50KTtcbiAgICAgICAgICAgICAgfSwgVE9VQ0hFVkVOVF9DT01QQVRfV0FJVCArIF90aGlzMi5fY29uZmlnLmludGVydmFsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9rZXlkb3duID0gZnVuY3Rpb24gX2tleWRvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICAgIGNhc2UgQVJST1dfTEVGVF9LRVlDT0RFOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMucHJldigpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIEFSUk9XX1JJR0hUX0tFWUNPREU6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZ2V0SXRlbUluZGV4ID0gZnVuY3Rpb24gX2dldEl0ZW1JbmRleChlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gZWxlbWVudCAmJiBlbGVtZW50LnBhcmVudE5vZGUgPyBbXS5zbGljZS5jYWxsKGVsZW1lbnQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLklURU0pKSA6IFtdO1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuaW5kZXhPZihlbGVtZW50KTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZ2V0SXRlbUJ5RGlyZWN0aW9uID0gZnVuY3Rpb24gX2dldEl0ZW1CeURpcmVjdGlvbihkaXJlY3Rpb24sIGFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGlzTmV4dERpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLk5FWFQ7XG4gICAgICAgIHZhciBpc1ByZXZEaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWO1xuXG4gICAgICAgIHZhciBhY3RpdmVJbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleChhY3RpdmVFbGVtZW50KTtcblxuICAgICAgICB2YXIgbGFzdEl0ZW1JbmRleCA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBpc0dvaW5nVG9XcmFwID0gaXNQcmV2RGlyZWN0aW9uICYmIGFjdGl2ZUluZGV4ID09PSAwIHx8IGlzTmV4dERpcmVjdGlvbiAmJiBhY3RpdmVJbmRleCA9PT0gbGFzdEl0ZW1JbmRleDtcblxuICAgICAgICBpZiAoaXNHb2luZ1RvV3JhcCAmJiAhdGhpcy5fY29uZmlnLndyYXApIHtcbiAgICAgICAgICByZXR1cm4gYWN0aXZlRWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkZWx0YSA9IGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlBSRVYgPyAtMSA6IDE7XG4gICAgICAgIHZhciBpdGVtSW5kZXggPSAoYWN0aXZlSW5kZXggKyBkZWx0YSkgJSB0aGlzLl9pdGVtcy5sZW5ndGg7XG4gICAgICAgIHJldHVybiBpdGVtSW5kZXggPT09IC0xID8gdGhpcy5faXRlbXNbdGhpcy5faXRlbXMubGVuZ3RoIC0gMV0gOiB0aGlzLl9pdGVtc1tpdGVtSW5kZXhdO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl90cmlnZ2VyU2xpZGVFdmVudCA9IGZ1bmN0aW9uIF90cmlnZ2VyU2xpZGVFdmVudChyZWxhdGVkVGFyZ2V0LCBldmVudERpcmVjdGlvbk5hbWUpIHtcbiAgICAgICAgdmFyIHRhcmdldEluZGV4ID0gdGhpcy5fZ2V0SXRlbUluZGV4KHJlbGF0ZWRUYXJnZXQpO1xuXG4gICAgICAgIHZhciBmcm9tSW5kZXggPSB0aGlzLl9nZXRJdGVtSW5kZXgodGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLkFDVElWRV9JVEVNKSk7XG5cbiAgICAgICAgdmFyIHNsaWRlRXZlbnQgPSAkJCQxLkV2ZW50KEV2ZW50LlNMSURFLCB7XG4gICAgICAgICAgcmVsYXRlZFRhcmdldDogcmVsYXRlZFRhcmdldCxcbiAgICAgICAgICBkaXJlY3Rpb246IGV2ZW50RGlyZWN0aW9uTmFtZSxcbiAgICAgICAgICBmcm9tOiBmcm9tSW5kZXgsXG4gICAgICAgICAgdG86IHRhcmdldEluZGV4XG4gICAgICAgIH0pO1xuICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2xpZGVFdmVudCk7XG4gICAgICAgIHJldHVybiBzbGlkZUV2ZW50O1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9zZXRBY3RpdmVJbmRpY2F0b3JFbGVtZW50ID0gZnVuY3Rpb24gX3NldEFjdGl2ZUluZGljYXRvckVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy5faW5kaWNhdG9yc0VsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgaW5kaWNhdG9ycyA9IFtdLnNsaWNlLmNhbGwodGhpcy5faW5kaWNhdG9yc0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5BQ1RJVkUpKTtcbiAgICAgICAgICAkJCQxKGluZGljYXRvcnMpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuXG4gICAgICAgICAgdmFyIG5leHRJbmRpY2F0b3IgPSB0aGlzLl9pbmRpY2F0b3JzRWxlbWVudC5jaGlsZHJlblt0aGlzLl9nZXRJdGVtSW5kZXgoZWxlbWVudCldO1xuXG4gICAgICAgICAgaWYgKG5leHRJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgICQkJDEobmV4dEluZGljYXRvcikuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX3NsaWRlID0gZnVuY3Rpb24gX3NsaWRlKGRpcmVjdGlvbiwgZWxlbWVudCkge1xuICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICB2YXIgYWN0aXZlRWxlbWVudCA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5BQ1RJVkVfSVRFTSk7XG5cbiAgICAgICAgdmFyIGFjdGl2ZUVsZW1lbnRJbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleChhY3RpdmVFbGVtZW50KTtcblxuICAgICAgICB2YXIgbmV4dEVsZW1lbnQgPSBlbGVtZW50IHx8IGFjdGl2ZUVsZW1lbnQgJiYgdGhpcy5fZ2V0SXRlbUJ5RGlyZWN0aW9uKGRpcmVjdGlvbiwgYWN0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgdmFyIG5leHRFbGVtZW50SW5kZXggPSB0aGlzLl9nZXRJdGVtSW5kZXgobmV4dEVsZW1lbnQpO1xuXG4gICAgICAgIHZhciBpc0N5Y2xpbmcgPSBCb29sZWFuKHRoaXMuX2ludGVydmFsKTtcbiAgICAgICAgdmFyIGRpcmVjdGlvbmFsQ2xhc3NOYW1lO1xuICAgICAgICB2YXIgb3JkZXJDbGFzc05hbWU7XG4gICAgICAgIHZhciBldmVudERpcmVjdGlvbk5hbWU7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLk5FWFQpIHtcbiAgICAgICAgICBkaXJlY3Rpb25hbENsYXNzTmFtZSA9IENsYXNzTmFtZS5MRUZUO1xuICAgICAgICAgIG9yZGVyQ2xhc3NOYW1lID0gQ2xhc3NOYW1lLk5FWFQ7XG4gICAgICAgICAgZXZlbnREaXJlY3Rpb25OYW1lID0gRGlyZWN0aW9uLkxFRlQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGlyZWN0aW9uYWxDbGFzc05hbWUgPSBDbGFzc05hbWUuUklHSFQ7XG4gICAgICAgICAgb3JkZXJDbGFzc05hbWUgPSBDbGFzc05hbWUuUFJFVjtcbiAgICAgICAgICBldmVudERpcmVjdGlvbk5hbWUgPSBEaXJlY3Rpb24uUklHSFQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dEVsZW1lbnQgJiYgJCQkMShuZXh0RWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSkpIHtcbiAgICAgICAgICB0aGlzLl9pc1NsaWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2xpZGVFdmVudCA9IHRoaXMuX3RyaWdnZXJTbGlkZUV2ZW50KG5leHRFbGVtZW50LCBldmVudERpcmVjdGlvbk5hbWUpO1xuXG4gICAgICAgIGlmIChzbGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFhY3RpdmVFbGVtZW50IHx8ICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgIC8vIFNvbWUgd2VpcmRuZXNzIGlzIGhhcHBlbmluZywgc28gd2UgYmFpbFxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lzU2xpZGluZyA9IHRydWU7XG5cbiAgICAgICAgaWYgKGlzQ3ljbGluZykge1xuICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldEFjdGl2ZUluZGljYXRvckVsZW1lbnQobmV4dEVsZW1lbnQpO1xuXG4gICAgICAgIHZhciBzbGlkRXZlbnQgPSAkJCQxLkV2ZW50KEV2ZW50LlNMSUQsIHtcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0OiBuZXh0RWxlbWVudCxcbiAgICAgICAgICBkaXJlY3Rpb246IGV2ZW50RGlyZWN0aW9uTmFtZSxcbiAgICAgICAgICBmcm9tOiBhY3RpdmVFbGVtZW50SW5kZXgsXG4gICAgICAgICAgdG86IG5leHRFbGVtZW50SW5kZXhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCQkJDEodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNMSURFKSkge1xuICAgICAgICAgICQkJDEobmV4dEVsZW1lbnQpLmFkZENsYXNzKG9yZGVyQ2xhc3NOYW1lKTtcbiAgICAgICAgICBVdGlsLnJlZmxvdyhuZXh0RWxlbWVudCk7XG4gICAgICAgICAgJCQkMShhY3RpdmVFbGVtZW50KS5hZGRDbGFzcyhkaXJlY3Rpb25hbENsYXNzTmFtZSk7XG4gICAgICAgICAgJCQkMShuZXh0RWxlbWVudCkuYWRkQ2xhc3MoZGlyZWN0aW9uYWxDbGFzc05hbWUpO1xuICAgICAgICAgIHZhciB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGFjdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICQkJDEoYWN0aXZlRWxlbWVudCkub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQkJDEobmV4dEVsZW1lbnQpLnJlbW92ZUNsYXNzKGRpcmVjdGlvbmFsQ2xhc3NOYW1lICsgXCIgXCIgKyBvcmRlckNsYXNzTmFtZSkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgICAgICAkJCQxKGFjdGl2ZUVsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUgKyBcIiBcIiArIG9yZGVyQ2xhc3NOYW1lICsgXCIgXCIgKyBkaXJlY3Rpb25hbENsYXNzTmFtZSk7XG4gICAgICAgICAgICBfdGhpczMuX2lzU2xpZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiAkJCQxKF90aGlzMy5fZWxlbWVudCkudHJpZ2dlcihzbGlkRXZlbnQpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgfSkuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkJCQxKGFjdGl2ZUVsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgICAgICAgICQkJDEobmV4dEVsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgICAgICAgIHRoaXMuX2lzU2xpZGluZyA9IGZhbHNlO1xuICAgICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzbGlkRXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQ3ljbGluZykge1xuICAgICAgICAgIHRoaXMuY3ljbGUoKTtcbiAgICAgICAgfVxuICAgICAgfTsgLy8gU3RhdGljXG5cblxuICAgICAgQ2Fyb3VzZWwuX2pRdWVyeUludGVyZmFjZSA9IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBkYXRhID0gJCQkMSh0aGlzKS5kYXRhKERBVEFfS0VZKTtcblxuICAgICAgICAgIHZhciBfY29uZmlnID0gX29iamVjdFNwcmVhZCh7fSwgRGVmYXVsdCwgJCQkMSh0aGlzKS5kYXRhKCkpO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBfY29uZmlnID0gX29iamVjdFNwcmVhZCh7fSwgX2NvbmZpZywgY29uZmlnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgYWN0aW9uID0gdHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycgPyBjb25maWcgOiBfY29uZmlnLnNsaWRlO1xuXG4gICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICBkYXRhID0gbmV3IENhcm91c2VsKHRoaXMsIF9jb25maWcpO1xuICAgICAgICAgICAgJCQkMSh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGRhdGEudG8oY29uZmlnKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbYWN0aW9uXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk5vIG1ldGhvZCBuYW1lZCBcXFwiXCIgKyBhY3Rpb24gKyBcIlxcXCJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGFbYWN0aW9uXSgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoX2NvbmZpZy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgZGF0YS5wYXVzZSgpO1xuICAgICAgICAgICAgZGF0YS5jeWNsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBDYXJvdXNlbC5fZGF0YUFwaUNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uIF9kYXRhQXBpQ2xpY2tIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIHZhciBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudCh0aGlzKTtcblxuICAgICAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRhcmdldCA9ICQkJDEoc2VsZWN0b3IpWzBdO1xuXG4gICAgICAgIGlmICghdGFyZ2V0IHx8ICEkJCQxKHRhcmdldCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkNBUk9VU0VMKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb25maWcgPSBfb2JqZWN0U3ByZWFkKHt9LCAkJCQxKHRhcmdldCkuZGF0YSgpLCAkJCQxKHRoaXMpLmRhdGEoKSk7XG5cbiAgICAgICAgdmFyIHNsaWRlSW5kZXggPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1zbGlkZS10bycpO1xuXG4gICAgICAgIGlmIChzbGlkZUluZGV4KSB7XG4gICAgICAgICAgY29uZmlnLmludGVydmFsID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBDYXJvdXNlbC5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJCQkMSh0YXJnZXQpLCBjb25maWcpO1xuXG4gICAgICAgIGlmIChzbGlkZUluZGV4KSB7XG4gICAgICAgICAgJCQkMSh0YXJnZXQpLmRhdGEoREFUQV9LRVkpLnRvKHNsaWRlSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH07XG5cbiAgICAgIF9jcmVhdGVDbGFzcyhDYXJvdXNlbCwgbnVsbCwgW3tcbiAgICAgICAga2V5OiBcIlZFUlNJT05cIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIFZFUlNJT047XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiBcIkRlZmF1bHRcIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIERlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1dKTtcblxuICAgICAgcmV0dXJuIENhcm91c2VsO1xuICAgIH0oKTtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG5cbiAgICAkJCQxKGRvY3VtZW50KS5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9TTElERSwgQ2Fyb3VzZWwuX2RhdGFBcGlDbGlja0hhbmRsZXIpO1xuICAgICQkJDEod2luZG93KS5vbihFdmVudC5MT0FEX0RBVEFfQVBJLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY2Fyb3VzZWxzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkRBVEFfUklERSkpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2Fyb3VzZWxzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciAkY2Fyb3VzZWwgPSAkJCQxKGNhcm91c2Vsc1tpXSk7XG5cbiAgICAgICAgQ2Fyb3VzZWwuX2pRdWVyeUludGVyZmFjZS5jYWxsKCRjYXJvdXNlbCwgJGNhcm91c2VsLmRhdGEoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogalF1ZXJ5XG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICAkJCQxLmZuW05BTUVdID0gQ2Fyb3VzZWwuX2pRdWVyeUludGVyZmFjZTtcbiAgICAkJCQxLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQ2Fyb3VzZWw7XG5cbiAgICAkJCQxLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkJCQxLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUO1xuICAgICAgcmV0dXJuIENhcm91c2VsLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgfTtcblxuICAgIHJldHVybiBDYXJvdXNlbDtcbiAgfSgkKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NC4xLjMpOiBjb2xsYXBzZS5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgQ29sbGFwc2UgPSBmdW5jdGlvbiAoJCQkMSkge1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENvbnN0YW50c1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuICAgIHZhciBOQU1FID0gJ2NvbGxhcHNlJztcbiAgICB2YXIgVkVSU0lPTiA9ICc0LjEuMyc7XG4gICAgdmFyIERBVEFfS0VZID0gJ2JzLmNvbGxhcHNlJztcbiAgICB2YXIgRVZFTlRfS0VZID0gXCIuXCIgKyBEQVRBX0tFWTtcbiAgICB2YXIgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSc7XG4gICAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQkJDEuZm5bTkFNRV07XG4gICAgdmFyIERlZmF1bHQgPSB7XG4gICAgICB0b2dnbGU6IHRydWUsXG4gICAgICBwYXJlbnQ6ICcnXG4gICAgfTtcbiAgICB2YXIgRGVmYXVsdFR5cGUgPSB7XG4gICAgICB0b2dnbGU6ICdib29sZWFuJyxcbiAgICAgIHBhcmVudDogJyhzdHJpbmd8ZWxlbWVudCknXG4gICAgfTtcbiAgICB2YXIgRXZlbnQgPSB7XG4gICAgICBTSE9XOiBcInNob3dcIiArIEVWRU5UX0tFWSxcbiAgICAgIFNIT1dOOiBcInNob3duXCIgKyBFVkVOVF9LRVksXG4gICAgICBISURFOiBcImhpZGVcIiArIEVWRU5UX0tFWSxcbiAgICAgIEhJRERFTjogXCJoaWRkZW5cIiArIEVWRU5UX0tFWSxcbiAgICAgIENMSUNLX0RBVEFfQVBJOiBcImNsaWNrXCIgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVlcbiAgICB9O1xuICAgIHZhciBDbGFzc05hbWUgPSB7XG4gICAgICBTSE9XOiAnc2hvdycsXG4gICAgICBDT0xMQVBTRTogJ2NvbGxhcHNlJyxcbiAgICAgIENPTExBUFNJTkc6ICdjb2xsYXBzaW5nJyxcbiAgICAgIENPTExBUFNFRDogJ2NvbGxhcHNlZCdcbiAgICB9O1xuICAgIHZhciBEaW1lbnNpb24gPSB7XG4gICAgICBXSURUSDogJ3dpZHRoJyxcbiAgICAgIEhFSUdIVDogJ2hlaWdodCdcbiAgICB9O1xuICAgIHZhciBTZWxlY3RvciA9IHtcbiAgICAgIEFDVElWRVM6ICcuc2hvdywgLmNvbGxhcHNpbmcnLFxuICAgICAgREFUQV9UT0dHTEU6ICdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXSdcbiAgICAgIC8qKlxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqL1xuXG4gICAgfTtcblxuICAgIHZhciBDb2xsYXBzZSA9XG4gICAgLyojX19QVVJFX18qL1xuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIENvbGxhcHNlKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpO1xuICAgICAgICB0aGlzLl90cmlnZ2VyQXJyYXkgPSAkJCQxLm1ha2VBcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtdG9nZ2xlPVxcXCJjb2xsYXBzZVxcXCJdW2hyZWY9XFxcIiNcIiArIGVsZW1lbnQuaWQgKyBcIlxcXCJdLFwiICsgKFwiW2RhdGEtdG9nZ2xlPVxcXCJjb2xsYXBzZVxcXCJdW2RhdGEtdGFyZ2V0PVxcXCIjXCIgKyBlbGVtZW50LmlkICsgXCJcXFwiXVwiKSkpO1xuICAgICAgICB2YXIgdG9nZ2xlTGlzdCA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5EQVRBX1RPR0dMRSkpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0b2dnbGVMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZW0gPSB0b2dnbGVMaXN0W2ldO1xuICAgICAgICAgIHZhciBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtKTtcbiAgICAgICAgICB2YXIgZmlsdGVyRWxlbWVudCA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpLmZpbHRlcihmdW5jdGlvbiAoZm91bmRFbGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gZm91bmRFbGVtID09PSBlbGVtZW50O1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBudWxsICYmIGZpbHRlckVsZW1lbnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3IgPSBzZWxlY3RvcjtcblxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckFycmF5LnB1c2goZWxlbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcGFyZW50ID0gdGhpcy5fY29uZmlnLnBhcmVudCA/IHRoaXMuX2dldFBhcmVudCgpIDogbnVsbDtcblxuICAgICAgICBpZiAoIXRoaXMuX2NvbmZpZy5wYXJlbnQpIHtcbiAgICAgICAgICB0aGlzLl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3ModGhpcy5fZWxlbWVudCwgdGhpcy5fdHJpZ2dlckFycmF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcudG9nZ2xlKSB7XG4gICAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgfVxuICAgICAgfSAvLyBHZXR0ZXJzXG5cblxuICAgICAgdmFyIF9wcm90byA9IENvbGxhcHNlLnByb3RvdHlwZTtcblxuICAgICAgLy8gUHVibGljXG4gICAgICBfcHJvdG8udG9nZ2xlID0gZnVuY3Rpb24gdG9nZ2xlKCkge1xuICAgICAgICBpZiAoJCQkMSh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLnNob3cgPSBmdW5jdGlvbiBzaG93KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1RyYW5zaXRpb25pbmcgfHwgJCQkMSh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWN0aXZlcztcbiAgICAgICAgdmFyIGFjdGl2ZXNEYXRhO1xuXG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICBhY3RpdmVzID0gW10uc2xpY2UuY2FsbCh0aGlzLl9wYXJlbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5BQ1RJVkVTKSkuZmlsdGVyKGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JykgPT09IF90aGlzLl9jb25maWcucGFyZW50O1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKGFjdGl2ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBhY3RpdmVzID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWN0aXZlcykge1xuICAgICAgICAgIGFjdGl2ZXNEYXRhID0gJCQkMShhY3RpdmVzKS5ub3QodGhpcy5fc2VsZWN0b3IpLmRhdGEoREFUQV9LRVkpO1xuXG4gICAgICAgICAgaWYgKGFjdGl2ZXNEYXRhICYmIGFjdGl2ZXNEYXRhLl9pc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhcnRFdmVudCA9ICQkJDEuRXZlbnQoRXZlbnQuU0hPVyk7XG4gICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzdGFydEV2ZW50KTtcblxuICAgICAgICBpZiAoc3RhcnRFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhY3RpdmVzKSB7XG4gICAgICAgICAgQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQkJDEoYWN0aXZlcykubm90KHRoaXMuX3NlbGVjdG9yKSwgJ2hpZGUnKTtcblxuICAgICAgICAgIGlmICghYWN0aXZlc0RhdGEpIHtcbiAgICAgICAgICAgICQkJDEoYWN0aXZlcykuZGF0YShEQVRBX0tFWSwgbnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRpbWVuc2lvbiA9IHRoaXMuX2dldERpbWVuc2lvbigpO1xuXG4gICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFKS5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0lORyk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAkJCQxKHRoaXMuX3RyaWdnZXJBcnJheSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFRCkuYXR0cignYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2l0aW9uaW5nKHRydWUpO1xuXG4gICAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAgICQkJDEoX3RoaXMuX2VsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKS5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0UpLmFkZENsYXNzKENsYXNzTmFtZS5TSE9XKTtcbiAgICAgICAgICBfdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gJyc7XG5cbiAgICAgICAgICBfdGhpcy5zZXRUcmFuc2l0aW9uaW5nKGZhbHNlKTtcblxuICAgICAgICAgICQkJDEoX3RoaXMuX2VsZW1lbnQpLnRyaWdnZXIoRXZlbnQuU0hPV04pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBjYXBpdGFsaXplZERpbWVuc2lvbiA9IGRpbWVuc2lvblswXS50b1VwcGVyQ2FzZSgpICsgZGltZW5zaW9uLnNsaWNlKDEpO1xuICAgICAgICB2YXIgc2Nyb2xsU2l6ZSA9IFwic2Nyb2xsXCIgKyBjYXBpdGFsaXplZERpbWVuc2lvbjtcbiAgICAgICAgdmFyIHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudCk7XG4gICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKS5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSB0aGlzLl9lbGVtZW50W3Njcm9sbFNpemVdICsgXCJweFwiO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLmhpZGUgPSBmdW5jdGlvbiBoaWRlKCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8ICEkJCQxKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGFydEV2ZW50ID0gJCQkMS5FdmVudChFdmVudC5ISURFKTtcbiAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHN0YXJ0RXZlbnQpO1xuXG4gICAgICAgIGlmIChzdGFydEV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRpbWVuc2lvbiA9IHRoaXMuX2dldERpbWVuc2lvbigpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IHRoaXMuX2VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClbZGltZW5zaW9uXSArIFwicHhcIjtcbiAgICAgICAgVXRpbC5yZWZsb3codGhpcy5fZWxlbWVudCk7XG4gICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpO1xuICAgICAgICB2YXIgdHJpZ2dlckFycmF5TGVuZ3RoID0gdGhpcy5fdHJpZ2dlckFycmF5Lmxlbmd0aDtcblxuICAgICAgICBpZiAodHJpZ2dlckFycmF5TGVuZ3RoID4gMCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJpZ2dlckFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0cmlnZ2VyID0gdGhpcy5fdHJpZ2dlckFycmF5W2ldO1xuICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRyaWdnZXIpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0b3IgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdmFyICRlbGVtID0gJCQkMShbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKSk7XG5cbiAgICAgICAgICAgICAgaWYgKCEkZWxlbS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgICAgICAgICAgICAkJCQxKHRyaWdnZXIpLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTRUQpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFRyYW5zaXRpb25pbmcodHJ1ZSk7XG5cbiAgICAgICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgX3RoaXMyLnNldFRyYW5zaXRpb25pbmcoZmFsc2UpO1xuXG4gICAgICAgICAgJCQkMShfdGhpczIuX2VsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKS5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0UpLnRyaWdnZXIoRXZlbnQuSElEREVOKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAnJztcbiAgICAgICAgdmFyIHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudCk7XG4gICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKS5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLnNldFRyYW5zaXRpb25pbmcgPSBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uaW5nKGlzVHJhbnNpdGlvbmluZykge1xuICAgICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBpc1RyYW5zaXRpb25pbmc7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAgICQkJDEucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl90cmlnZ2VyQXJyYXkgPSBudWxsO1xuICAgICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBudWxsO1xuICAgICAgfTsgLy8gUHJpdmF0ZVxuXG5cbiAgICAgIF9wcm90by5fZ2V0Q29uZmlnID0gZnVuY3Rpb24gX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgICAgY29uZmlnID0gX29iamVjdFNwcmVhZCh7fSwgRGVmYXVsdCwgY29uZmlnKTtcbiAgICAgICAgY29uZmlnLnRvZ2dsZSA9IEJvb2xlYW4oY29uZmlnLnRvZ2dsZSk7IC8vIENvZXJjZSBzdHJpbmcgdmFsdWVzXG5cbiAgICAgICAgVXRpbC50eXBlQ2hlY2tDb25maWcoTkFNRSwgY29uZmlnLCBEZWZhdWx0VHlwZSk7XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2dldERpbWVuc2lvbiA9IGZ1bmN0aW9uIF9nZXREaW1lbnNpb24oKSB7XG4gICAgICAgIHZhciBoYXNXaWR0aCA9ICQkJDEodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoRGltZW5zaW9uLldJRFRIKTtcbiAgICAgICAgcmV0dXJuIGhhc1dpZHRoID8gRGltZW5zaW9uLldJRFRIIDogRGltZW5zaW9uLkhFSUdIVDtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZ2V0UGFyZW50ID0gZnVuY3Rpb24gX2dldFBhcmVudCgpIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHBhcmVudCA9IG51bGw7XG5cbiAgICAgICAgaWYgKFV0aWwuaXNFbGVtZW50KHRoaXMuX2NvbmZpZy5wYXJlbnQpKSB7XG4gICAgICAgICAgcGFyZW50ID0gdGhpcy5fY29uZmlnLnBhcmVudDsgLy8gSXQncyBhIGpRdWVyeSBvYmplY3RcblxuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fY29uZmlnLnBhcmVudC5qcXVlcnkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSB0aGlzLl9jb25maWcucGFyZW50WzBdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NvbmZpZy5wYXJlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNlbGVjdG9yID0gXCJbZGF0YS10b2dnbGU9XFxcImNvbGxhcHNlXFxcIl1bZGF0YS1wYXJlbnQ9XFxcIlwiICsgdGhpcy5fY29uZmlnLnBhcmVudCArIFwiXFxcIl1cIjtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gW10uc2xpY2UuY2FsbChwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgICAgICAkJCQxKGNoaWxkcmVuKS5lYWNoKGZ1bmN0aW9uIChpLCBlbGVtZW50KSB7XG4gICAgICAgICAgX3RoaXMzLl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MoQ29sbGFwc2UuX2dldFRhcmdldEZyb21FbGVtZW50KGVsZW1lbnQpLCBbZWxlbWVudF0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzID0gZnVuY3Rpb24gX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyhlbGVtZW50LCB0cmlnZ2VyQXJyYXkpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgaXNPcGVuID0gJCQkMShlbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG5cbiAgICAgICAgICBpZiAodHJpZ2dlckFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgJCQkMSh0cmlnZ2VyQXJyYXkpLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRUQsICFpc09wZW4pLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBpc09wZW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTsgLy8gU3RhdGljXG5cblxuICAgICAgQ29sbGFwc2UuX2dldFRhcmdldEZyb21FbGVtZW50ID0gZnVuY3Rpb24gX2dldFRhcmdldEZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gc2VsZWN0b3IgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA6IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBDb2xsYXBzZS5falF1ZXJ5SW50ZXJmYWNlID0gZnVuY3Rpb24gX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyICR0aGlzID0gJCQkMSh0aGlzKTtcbiAgICAgICAgICB2YXIgZGF0YSA9ICR0aGlzLmRhdGEoREFUQV9LRVkpO1xuXG4gICAgICAgICAgdmFyIF9jb25maWcgPSBfb2JqZWN0U3ByZWFkKHt9LCBEZWZhdWx0LCAkdGhpcy5kYXRhKCksIHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnICYmIGNvbmZpZyA/IGNvbmZpZyA6IHt9KTtcblxuICAgICAgICAgIGlmICghZGF0YSAmJiBfY29uZmlnLnRvZ2dsZSAmJiAvc2hvd3xoaWRlLy50ZXN0KGNvbmZpZykpIHtcbiAgICAgICAgICAgIF9jb25maWcudG9nZ2xlID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICBkYXRhID0gbmV3IENvbGxhcHNlKHRoaXMsIF9jb25maWcpO1xuICAgICAgICAgICAgJHRoaXMuZGF0YShEQVRBX0tFWSwgZGF0YSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk5vIG1ldGhvZCBuYW1lZCBcXFwiXCIgKyBjb25maWcgKyBcIlxcXCJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBfY3JlYXRlQ2xhc3MoQ29sbGFwc2UsIG51bGwsIFt7XG4gICAgICAgIGtleTogXCJWRVJTSU9OXCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogXCJEZWZhdWx0XCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgICAgICB9XG4gICAgICB9XSk7XG5cbiAgICAgIHJldHVybiBDb2xsYXBzZTtcbiAgICB9KCk7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuXG4gICAgJCQkMShkb2N1bWVudCkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIC8vIHByZXZlbnREZWZhdWx0IG9ubHkgZm9yIDxhPiBlbGVtZW50cyAod2hpY2ggY2hhbmdlIHRoZSBVUkwpIG5vdCBpbnNpZGUgdGhlIGNvbGxhcHNpYmxlIGVsZW1lbnRcbiAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LnRhZ05hbWUgPT09ICdBJykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgJHRyaWdnZXIgPSAkJCQxKHRoaXMpO1xuICAgICAgdmFyIHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRoaXMpO1xuICAgICAgdmFyIHNlbGVjdG9ycyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgICAgJCQkMShzZWxlY3RvcnMpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRhcmdldCA9ICQkJDEodGhpcyk7XG4gICAgICAgIHZhciBkYXRhID0gJHRhcmdldC5kYXRhKERBVEFfS0VZKTtcbiAgICAgICAgdmFyIGNvbmZpZyA9IGRhdGEgPyAndG9nZ2xlJyA6ICR0cmlnZ2VyLmRhdGEoKTtcblxuICAgICAgICBDb2xsYXBzZS5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJHRhcmdldCwgY29uZmlnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIGpRdWVyeVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgJCQkMS5mbltOQU1FXSA9IENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgJCQkMS5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IENvbGxhcHNlO1xuXG4gICAgJCQkMS5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgJCQkMS5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICAgIHJldHVybiBDb2xsYXBzZS5falF1ZXJ5SW50ZXJmYWNlO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ29sbGFwc2U7XG4gIH0oJCk7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCAodjQuMS4zKTogZHJvcGRvd24uanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIERyb3Bkb3duID0gZnVuY3Rpb24gKCQkJDEpIHtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBDb25zdGFudHNcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cbiAgICB2YXIgTkFNRSA9ICdkcm9wZG93bic7XG4gICAgdmFyIFZFUlNJT04gPSAnNC4xLjMnO1xuICAgIHZhciBEQVRBX0tFWSA9ICdicy5kcm9wZG93bic7XG4gICAgdmFyIEVWRU5UX0tFWSA9IFwiLlwiICsgREFUQV9LRVk7XG4gICAgdmFyIERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknO1xuICAgIHZhciBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkJCQxLmZuW05BTUVdO1xuICAgIHZhciBFU0NBUEVfS0VZQ09ERSA9IDI3OyAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBFc2NhcGUgKEVzYykga2V5XG5cbiAgICB2YXIgU1BBQ0VfS0VZQ09ERSA9IDMyOyAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBzcGFjZSBrZXlcblxuICAgIHZhciBUQUJfS0VZQ09ERSA9IDk7IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIHRhYiBrZXlcblxuICAgIHZhciBBUlJPV19VUF9LRVlDT0RFID0gMzg7IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIHVwIGFycm93IGtleVxuXG4gICAgdmFyIEFSUk9XX0RPV05fS0VZQ09ERSA9IDQwOyAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBkb3duIGFycm93IGtleVxuXG4gICAgdmFyIFJJR0hUX01PVVNFX0JVVFRPTl9XSElDSCA9IDM7IC8vIE1vdXNlRXZlbnQud2hpY2ggdmFsdWUgZm9yIHRoZSByaWdodCBidXR0b24gKGFzc3VtaW5nIGEgcmlnaHQtaGFuZGVkIG1vdXNlKVxuXG4gICAgdmFyIFJFR0VYUF9LRVlET1dOID0gbmV3IFJlZ0V4cChBUlJPV19VUF9LRVlDT0RFICsgXCJ8XCIgKyBBUlJPV19ET1dOX0tFWUNPREUgKyBcInxcIiArIEVTQ0FQRV9LRVlDT0RFKTtcbiAgICB2YXIgRXZlbnQgPSB7XG4gICAgICBISURFOiBcImhpZGVcIiArIEVWRU5UX0tFWSxcbiAgICAgIEhJRERFTjogXCJoaWRkZW5cIiArIEVWRU5UX0tFWSxcbiAgICAgIFNIT1c6IFwic2hvd1wiICsgRVZFTlRfS0VZLFxuICAgICAgU0hPV046IFwic2hvd25cIiArIEVWRU5UX0tFWSxcbiAgICAgIENMSUNLOiBcImNsaWNrXCIgKyBFVkVOVF9LRVksXG4gICAgICBDTElDS19EQVRBX0FQSTogXCJjbGlja1wiICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZLFxuICAgICAgS0VZRE9XTl9EQVRBX0FQSTogXCJrZXlkb3duXCIgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVksXG4gICAgICBLRVlVUF9EQVRBX0FQSTogXCJrZXl1cFwiICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZXG4gICAgfTtcbiAgICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgICAgRElTQUJMRUQ6ICdkaXNhYmxlZCcsXG4gICAgICBTSE9XOiAnc2hvdycsXG4gICAgICBEUk9QVVA6ICdkcm9wdXAnLFxuICAgICAgRFJPUFJJR0hUOiAnZHJvcHJpZ2h0JyxcbiAgICAgIERST1BMRUZUOiAnZHJvcGxlZnQnLFxuICAgICAgTUVOVVJJR0hUOiAnZHJvcGRvd24tbWVudS1yaWdodCcsXG4gICAgICBNRU5VTEVGVDogJ2Ryb3Bkb3duLW1lbnUtbGVmdCcsXG4gICAgICBQT1NJVElPTl9TVEFUSUM6ICdwb3NpdGlvbi1zdGF0aWMnXG4gICAgfTtcbiAgICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgICBEQVRBX1RPR0dMRTogJ1tkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJyxcbiAgICAgIEZPUk1fQ0hJTEQ6ICcuZHJvcGRvd24gZm9ybScsXG4gICAgICBNRU5VOiAnLmRyb3Bkb3duLW1lbnUnLFxuICAgICAgTkFWQkFSX05BVjogJy5uYXZiYXItbmF2JyxcbiAgICAgIFZJU0lCTEVfSVRFTVM6ICcuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbTpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSdcbiAgICB9O1xuICAgIHZhciBBdHRhY2htZW50TWFwID0ge1xuICAgICAgVE9QOiAndG9wLXN0YXJ0JyxcbiAgICAgIFRPUEVORDogJ3RvcC1lbmQnLFxuICAgICAgQk9UVE9NOiAnYm90dG9tLXN0YXJ0JyxcbiAgICAgIEJPVFRPTUVORDogJ2JvdHRvbS1lbmQnLFxuICAgICAgUklHSFQ6ICdyaWdodC1zdGFydCcsXG4gICAgICBSSUdIVEVORDogJ3JpZ2h0LWVuZCcsXG4gICAgICBMRUZUOiAnbGVmdC1zdGFydCcsXG4gICAgICBMRUZURU5EOiAnbGVmdC1lbmQnXG4gICAgfTtcbiAgICB2YXIgRGVmYXVsdCA9IHtcbiAgICAgIG9mZnNldDogMCxcbiAgICAgIGZsaXA6IHRydWUsXG4gICAgICBib3VuZGFyeTogJ3Njcm9sbFBhcmVudCcsXG4gICAgICByZWZlcmVuY2U6ICd0b2dnbGUnLFxuICAgICAgZGlzcGxheTogJ2R5bmFtaWMnXG4gICAgfTtcbiAgICB2YXIgRGVmYXVsdFR5cGUgPSB7XG4gICAgICBvZmZzZXQ6ICcobnVtYmVyfHN0cmluZ3xmdW5jdGlvbiknLFxuICAgICAgZmxpcDogJ2Jvb2xlYW4nLFxuICAgICAgYm91bmRhcnk6ICcoc3RyaW5nfGVsZW1lbnQpJyxcbiAgICAgIHJlZmVyZW5jZTogJyhzdHJpbmd8ZWxlbWVudCknLFxuICAgICAgZGlzcGxheTogJ3N0cmluZydcbiAgICAgIC8qKlxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqL1xuXG4gICAgfTtcblxuICAgIHZhciBEcm9wZG93biA9XG4gICAgLyojX19QVVJFX18qL1xuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIERyb3Bkb3duKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fcG9wcGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuX21lbnUgPSB0aGlzLl9nZXRNZW51RWxlbWVudCgpO1xuICAgICAgICB0aGlzLl9pbk5hdmJhciA9IHRoaXMuX2RldGVjdE5hdmJhcigpO1xuXG4gICAgICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICB9IC8vIEdldHRlcnNcblxuXG4gICAgICB2YXIgX3Byb3RvID0gRHJvcGRvd24ucHJvdG90eXBlO1xuXG4gICAgICAvLyBQdWJsaWNcbiAgICAgIF9wcm90by50b2dnbGUgPSBmdW5jdGlvbiB0b2dnbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9lbGVtZW50LmRpc2FibGVkIHx8ICQkJDEodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkRJU0FCTEVEKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwYXJlbnQgPSBEcm9wZG93bi5fZ2V0UGFyZW50RnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudCk7XG5cbiAgICAgICAgdmFyIGlzQWN0aXZlID0gJCQkMSh0aGlzLl9tZW51KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG5cbiAgICAgICAgRHJvcGRvd24uX2NsZWFyTWVudXMoKTtcblxuICAgICAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzLl9lbGVtZW50XG4gICAgICAgIH07XG4gICAgICAgIHZhciBzaG93RXZlbnQgPSAkJCQxLkV2ZW50KEV2ZW50LlNIT1csIHJlbGF0ZWRUYXJnZXQpO1xuICAgICAgICAkJCQxKHBhcmVudCkudHJpZ2dlcihzaG93RXZlbnQpO1xuXG4gICAgICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gRGlzYWJsZSB0b3RhbGx5IFBvcHBlci5qcyBmb3IgRHJvcGRvd24gaW4gTmF2YmFyXG5cblxuICAgICAgICBpZiAoIXRoaXMuX2luTmF2YmFyKSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQ2hlY2sgZm9yIFBvcHBlciBkZXBlbmRlbmN5XG4gICAgICAgICAgICogUG9wcGVyIC0gaHR0cHM6Ly9wb3BwZXIuanMub3JnXG4gICAgICAgICAgICovXG4gICAgICAgICAgaWYgKHR5cGVvZiBQb3BwZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb290c3RyYXAgZHJvcGRvd24gcmVxdWlyZSBQb3BwZXIuanMgKGh0dHBzOi8vcG9wcGVyLmpzLm9yZyknKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2VsZW1lbnQ7XG5cbiAgICAgICAgICBpZiAodGhpcy5fY29uZmlnLnJlZmVyZW5jZSA9PT0gJ3BhcmVudCcpIHtcbiAgICAgICAgICAgIHJlZmVyZW5jZUVsZW1lbnQgPSBwYXJlbnQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChVdGlsLmlzRWxlbWVudCh0aGlzLl9jb25maWcucmVmZXJlbmNlKSkge1xuICAgICAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2NvbmZpZy5yZWZlcmVuY2U7IC8vIENoZWNrIGlmIGl0J3MgalF1ZXJ5IGVsZW1lbnRcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9jb25maWcucmVmZXJlbmNlLmpxdWVyeSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2NvbmZpZy5yZWZlcmVuY2VbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSAvLyBJZiBib3VuZGFyeSBpcyBub3QgYHNjcm9sbFBhcmVudGAsIHRoZW4gc2V0IHBvc2l0aW9uIHRvIGBzdGF0aWNgXG4gICAgICAgICAgLy8gdG8gYWxsb3cgdGhlIG1lbnUgdG8gXCJlc2NhcGVcIiB0aGUgc2Nyb2xsIHBhcmVudCdzIGJvdW5kYXJpZXNcbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvaXNzdWVzLzI0MjUxXG5cblxuICAgICAgICAgIGlmICh0aGlzLl9jb25maWcuYm91bmRhcnkgIT09ICdzY3JvbGxQYXJlbnQnKSB7XG4gICAgICAgICAgICAkJCQxKHBhcmVudCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLlBPU0lUSU9OX1NUQVRJQyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fcG9wcGVyID0gbmV3IFBvcHBlcihyZWZlcmVuY2VFbGVtZW50LCB0aGlzLl9tZW51LCB0aGlzLl9nZXRQb3BwZXJDb25maWcoKSk7XG4gICAgICAgIH0gLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIGFkZCBleHRyYVxuICAgICAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHRvIHRoZSBib2R5J3MgaW1tZWRpYXRlIGNoaWxkcmVuO1xuICAgICAgICAvLyBvbmx5IG5lZWRlZCBiZWNhdXNlIG9mIGJyb2tlbiBldmVudCBkZWxlZ2F0aW9uIG9uIGlPU1xuICAgICAgICAvLyBodHRwczovL3d3dy5xdWlya3Ntb2RlLm9yZy9ibG9nL2FyY2hpdmVzLzIwMTQvMDIvbW91c2VfZXZlbnRfYnViLmh0bWxcblxuXG4gICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgJCQkMShwYXJlbnQpLmNsb3Nlc3QoU2VsZWN0b3IuTkFWQkFSX05BVikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgJCQkMShkb2N1bWVudC5ib2R5KS5jaGlsZHJlbigpLm9uKCdtb3VzZW92ZXInLCBudWxsLCAkJCQxLm5vb3ApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG5cbiAgICAgICAgJCQkMSh0aGlzLl9tZW51KS50b2dnbGVDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG4gICAgICAgICQkJDEocGFyZW50KS50b2dnbGVDbGFzcyhDbGFzc05hbWUuU0hPVykudHJpZ2dlcigkJCQxLkV2ZW50KEV2ZW50LlNIT1dOLCByZWxhdGVkVGFyZ2V0KSk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAgICQkJDEucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG4gICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkub2ZmKEVWRU5UX0tFWSk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9tZW51ID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5fcG9wcGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fcG9wcGVyLmRlc3Ryb3koKTtcblxuICAgICAgICAgIHRoaXMuX3BvcHBlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuX2luTmF2YmFyID0gdGhpcy5fZGV0ZWN0TmF2YmFyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3BvcHBlciAhPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX3BvcHBlci5zY2hlZHVsZVVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9OyAvLyBQcml2YXRlXG5cblxuICAgICAgX3Byb3RvLl9hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uIF9hZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LkNMSUNLLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgX3RoaXMudG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9nZXRDb25maWcgPSBmdW5jdGlvbiBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgICBjb25maWcgPSBfb2JqZWN0U3ByZWFkKHt9LCB0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHQsICQkJDEodGhpcy5fZWxlbWVudCkuZGF0YSgpLCBjb25maWcpO1xuICAgICAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhOQU1FLCBjb25maWcsIHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFR5cGUpO1xuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9nZXRNZW51RWxlbWVudCA9IGZ1bmN0aW9uIF9nZXRNZW51RWxlbWVudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9tZW51KSB7XG4gICAgICAgICAgdmFyIHBhcmVudCA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KTtcblxuICAgICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX21lbnUgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5NRU5VKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbWVudTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZ2V0UGxhY2VtZW50ID0gZnVuY3Rpb24gX2dldFBsYWNlbWVudCgpIHtcbiAgICAgICAgdmFyICRwYXJlbnREcm9wZG93biA9ICQkJDEodGhpcy5fZWxlbWVudC5wYXJlbnROb2RlKTtcbiAgICAgICAgdmFyIHBsYWNlbWVudCA9IEF0dGFjaG1lbnRNYXAuQk9UVE9NOyAvLyBIYW5kbGUgZHJvcHVwXG5cbiAgICAgICAgaWYgKCRwYXJlbnREcm9wZG93bi5oYXNDbGFzcyhDbGFzc05hbWUuRFJPUFVQKSkge1xuICAgICAgICAgIHBsYWNlbWVudCA9IEF0dGFjaG1lbnRNYXAuVE9QO1xuXG4gICAgICAgICAgaWYgKCQkJDEodGhpcy5fbWVudSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLk1FTlVSSUdIVCkpIHtcbiAgICAgICAgICAgIHBsYWNlbWVudCA9IEF0dGFjaG1lbnRNYXAuVE9QRU5EO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgkcGFyZW50RHJvcGRvd24uaGFzQ2xhc3MoQ2xhc3NOYW1lLkRST1BSSUdIVCkpIHtcbiAgICAgICAgICBwbGFjZW1lbnQgPSBBdHRhY2htZW50TWFwLlJJR0hUO1xuICAgICAgICB9IGVsc2UgaWYgKCRwYXJlbnREcm9wZG93bi5oYXNDbGFzcyhDbGFzc05hbWUuRFJPUExFRlQpKSB7XG4gICAgICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5MRUZUO1xuICAgICAgICB9IGVsc2UgaWYgKCQkJDEodGhpcy5fbWVudSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLk1FTlVSSUdIVCkpIHtcbiAgICAgICAgICBwbGFjZW1lbnQgPSBBdHRhY2htZW50TWFwLkJPVFRPTUVORDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwbGFjZW1lbnQ7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2RldGVjdE5hdmJhciA9IGZ1bmN0aW9uIF9kZXRlY3ROYXZiYXIoKSB7XG4gICAgICAgIHJldHVybiAkJCQxKHRoaXMuX2VsZW1lbnQpLmNsb3Nlc3QoJy5uYXZiYXInKS5sZW5ndGggPiAwO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9nZXRQb3BwZXJDb25maWcgPSBmdW5jdGlvbiBfZ2V0UG9wcGVyQ29uZmlnKCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICB2YXIgb2Zmc2V0Q29uZiA9IHt9O1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fY29uZmlnLm9mZnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG9mZnNldENvbmYuZm4gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgZGF0YS5vZmZzZXRzID0gX29iamVjdFNwcmVhZCh7fSwgZGF0YS5vZmZzZXRzLCBfdGhpczIuX2NvbmZpZy5vZmZzZXQoZGF0YS5vZmZzZXRzKSB8fCB7fSk7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9mZnNldENvbmYub2Zmc2V0ID0gdGhpcy5fY29uZmlnLm9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwb3BwZXJDb25maWcgPSB7XG4gICAgICAgICAgcGxhY2VtZW50OiB0aGlzLl9nZXRQbGFjZW1lbnQoKSxcbiAgICAgICAgICBtb2RpZmllcnM6IHtcbiAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0Q29uZixcbiAgICAgICAgICAgIGZsaXA6IHtcbiAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5fY29uZmlnLmZsaXBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmV2ZW50T3ZlcmZsb3c6IHtcbiAgICAgICAgICAgICAgYm91bmRhcmllc0VsZW1lbnQ6IHRoaXMuX2NvbmZpZy5ib3VuZGFyeVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gLy8gRGlzYWJsZSBQb3BwZXIuanMgaWYgd2UgaGF2ZSBhIHN0YXRpYyBkaXNwbGF5XG5cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmRpc3BsYXkgPT09ICdzdGF0aWMnKSB7XG4gICAgICAgICAgcG9wcGVyQ29uZmlnLm1vZGlmaWVycy5hcHBseVN0eWxlID0ge1xuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBvcHBlckNvbmZpZztcbiAgICAgIH07IC8vIFN0YXRpY1xuXG5cbiAgICAgIERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2UgPSBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9ICQkJDEodGhpcykuZGF0YShEQVRBX0tFWSk7XG5cbiAgICAgICAgICB2YXIgX2NvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnID8gY29uZmlnIDogbnVsbDtcblxuICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgZGF0YSA9IG5ldyBEcm9wZG93bih0aGlzLCBfY29uZmlnKTtcbiAgICAgICAgICAgICQkJDEodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk5vIG1ldGhvZCBuYW1lZCBcXFwiXCIgKyBjb25maWcgKyBcIlxcXCJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBEcm9wZG93bi5fY2xlYXJNZW51cyA9IGZ1bmN0aW9uIF9jbGVhck1lbnVzKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudCAmJiAoZXZlbnQud2hpY2ggPT09IFJJR0hUX01PVVNFX0JVVFRPTl9XSElDSCB8fCBldmVudC50eXBlID09PSAna2V5dXAnICYmIGV2ZW50LndoaWNoICE9PSBUQUJfS0VZQ09ERSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG9nZ2xlcyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5EQVRBX1RPR0dMRSkpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0b2dnbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgdmFyIHBhcmVudCA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0b2dnbGVzW2ldKTtcblxuICAgICAgICAgIHZhciBjb250ZXh0ID0gJCQkMSh0b2dnbGVzW2ldKS5kYXRhKERBVEFfS0VZKTtcbiAgICAgICAgICB2YXIgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRvZ2dsZXNbaV1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQuY2xpY2tFdmVudCA9IGV2ZW50O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGRyb3Bkb3duTWVudSA9IGNvbnRleHQuX21lbnU7XG5cbiAgICAgICAgICBpZiAoISQkJDEocGFyZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2NsaWNrJyAmJiAvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGV2ZW50LnRhcmdldC50YWdOYW1lKSB8fCBldmVudC50eXBlID09PSAna2V5dXAnICYmIGV2ZW50LndoaWNoID09PSBUQUJfS0VZQ09ERSkgJiYgJCQkMS5jb250YWlucyhwYXJlbnQsIGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBoaWRlRXZlbnQgPSAkJCQxLkV2ZW50KEV2ZW50LkhJREUsIHJlbGF0ZWRUYXJnZXQpO1xuICAgICAgICAgICQkJDEocGFyZW50KS50cmlnZ2VyKGhpZGVFdmVudCk7XG5cbiAgICAgICAgICBpZiAoaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSByZW1vdmUgdGhlIGV4dHJhXG4gICAgICAgICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB3ZSBhZGRlZCBmb3IgaU9TIHN1cHBvcnRcblxuXG4gICAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAgICAgJCQkMShkb2N1bWVudC5ib2R5KS5jaGlsZHJlbigpLm9mZignbW91c2VvdmVyJywgbnVsbCwgJCQkMS5ub29wKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b2dnbGVzW2ldLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICAgICQkJDEoZHJvcGRvd25NZW51KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG4gICAgICAgICAgJCQkMShwYXJlbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKS50cmlnZ2VyKCQkJDEuRXZlbnQoRXZlbnQuSElEREVOLCByZWxhdGVkVGFyZ2V0KSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCA9IGZ1bmN0aW9uIF9nZXRQYXJlbnRGcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIHZhciBwYXJlbnQ7XG4gICAgICAgIHZhciBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KTtcblxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJlbnQgfHwgZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgfTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcblxuXG4gICAgICBEcm9wZG93bi5fZGF0YUFwaUtleWRvd25IYW5kbGVyID0gZnVuY3Rpb24gX2RhdGFBcGlLZXlkb3duSGFuZGxlcihldmVudCkge1xuICAgICAgICAvLyBJZiBub3QgaW5wdXQvdGV4dGFyZWE6XG4gICAgICAgIC8vICAtIEFuZCBub3QgYSBrZXkgaW4gUkVHRVhQX0tFWURPV04gPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgICAgICAvLyBJZiBpbnB1dC90ZXh0YXJlYTpcbiAgICAgICAgLy8gIC0gSWYgc3BhY2Uga2V5ID0+IG5vdCBhIGRyb3Bkb3duIGNvbW1hbmRcbiAgICAgICAgLy8gIC0gSWYga2V5IGlzIG90aGVyIHRoYW4gZXNjYXBlXG4gICAgICAgIC8vICAgIC0gSWYga2V5IGlzIG5vdCB1cCBvciBkb3duID0+IG5vdCBhIGRyb3Bkb3duIGNvbW1hbmRcbiAgICAgICAgLy8gICAgLSBJZiB0cmlnZ2VyIGluc2lkZSB0aGUgbWVudSA9PiBub3QgYSBkcm9wZG93biBjb21tYW5kXG4gICAgICAgIGlmICgvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGV2ZW50LnRhcmdldC50YWdOYW1lKSA/IGV2ZW50LndoaWNoID09PSBTUEFDRV9LRVlDT0RFIHx8IGV2ZW50LndoaWNoICE9PSBFU0NBUEVfS0VZQ09ERSAmJiAoZXZlbnQud2hpY2ggIT09IEFSUk9XX0RPV05fS0VZQ09ERSAmJiBldmVudC53aGljaCAhPT0gQVJST1dfVVBfS0VZQ09ERSB8fCAkJCQxKGV2ZW50LnRhcmdldCkuY2xvc2VzdChTZWxlY3Rvci5NRU5VKS5sZW5ndGgpIDogIVJFR0VYUF9LRVlET1dOLnRlc3QoZXZlbnQud2hpY2gpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgJCQkMSh0aGlzKS5oYXNDbGFzcyhDbGFzc05hbWUuRElTQUJMRUQpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBhcmVudCA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzKTtcblxuICAgICAgICB2YXIgaXNBY3RpdmUgPSAkJCQxKHBhcmVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpO1xuXG4gICAgICAgIGlmICghaXNBY3RpdmUgJiYgKGV2ZW50LndoaWNoICE9PSBFU0NBUEVfS0VZQ09ERSB8fCBldmVudC53aGljaCAhPT0gU1BBQ0VfS0VZQ09ERSkgfHwgaXNBY3RpdmUgJiYgKGV2ZW50LndoaWNoID09PSBFU0NBUEVfS0VZQ09ERSB8fCBldmVudC53aGljaCA9PT0gU1BBQ0VfS0VZQ09ERSkpIHtcbiAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG4gICAgICAgICAgICB2YXIgdG9nZ2xlID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuREFUQV9UT0dHTEUpO1xuICAgICAgICAgICAgJCQkMSh0b2dnbGUpLnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJCQkMSh0aGlzKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVtcyA9IFtdLnNsaWNlLmNhbGwocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuVklTSUJMRV9JVEVNUykpO1xuXG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5kZXggPSBpdGVtcy5pbmRleE9mKGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSBBUlJPV19VUF9LRVlDT0RFICYmIGluZGV4ID4gMCkge1xuICAgICAgICAgIC8vIFVwXG4gICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gQVJST1dfRE9XTl9LRVlDT0RFICYmIGluZGV4IDwgaXRlbXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIC8vIERvd25cbiAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW1zW2luZGV4XS5mb2N1cygpO1xuICAgICAgfTtcblxuICAgICAgX2NyZWF0ZUNsYXNzKERyb3Bkb3duLCBudWxsLCBbe1xuICAgICAgICBrZXk6IFwiVkVSU0lPTlwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6IFwiRGVmYXVsdFwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRGVmYXVsdDtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6IFwiRGVmYXVsdFR5cGVcIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIERlZmF1bHRUeXBlO1xuICAgICAgICB9XG4gICAgICB9XSk7XG5cbiAgICAgIHJldHVybiBEcm9wZG93bjtcbiAgICB9KCk7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuXG4gICAgJCQkMShkb2N1bWVudCkub24oRXZlbnQuS0VZRE9XTl9EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEUsIERyb3Bkb3duLl9kYXRhQXBpS2V5ZG93bkhhbmRsZXIpLm9uKEV2ZW50LktFWURPV05fREFUQV9BUEksIFNlbGVjdG9yLk1FTlUsIERyb3Bkb3duLl9kYXRhQXBpS2V5ZG93bkhhbmRsZXIpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJICsgXCIgXCIgKyBFdmVudC5LRVlVUF9EQVRBX0FQSSwgRHJvcGRvd24uX2NsZWFyTWVudXMpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkJCQxKHRoaXMpLCAndG9nZ2xlJyk7XG4gICAgfSkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkZPUk1fQ0hJTEQsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIGpRdWVyeVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgJCQkMS5mbltOQU1FXSA9IERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgJCQkMS5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IERyb3Bkb3duO1xuXG4gICAgJCQkMS5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgJCQkMS5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICAgIHJldHVybiBEcm9wZG93bi5falF1ZXJ5SW50ZXJmYWNlO1xuICAgIH07XG5cbiAgICByZXR1cm4gRHJvcGRvd247XG4gIH0oJCwgUG9wcGVyKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NC4xLjMpOiBtb2RhbC5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgTW9kYWwgPSBmdW5jdGlvbiAoJCQkMSkge1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENvbnN0YW50c1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuICAgIHZhciBOQU1FID0gJ21vZGFsJztcbiAgICB2YXIgVkVSU0lPTiA9ICc0LjEuMyc7XG4gICAgdmFyIERBVEFfS0VZID0gJ2JzLm1vZGFsJztcbiAgICB2YXIgRVZFTlRfS0VZID0gXCIuXCIgKyBEQVRBX0tFWTtcbiAgICB2YXIgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSc7XG4gICAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQkJDEuZm5bTkFNRV07XG4gICAgdmFyIEVTQ0FQRV9LRVlDT0RFID0gMjc7IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIEVzY2FwZSAoRXNjKSBrZXlcblxuICAgIHZhciBEZWZhdWx0ID0ge1xuICAgICAgYmFja2Ryb3A6IHRydWUsXG4gICAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICAgIGZvY3VzOiB0cnVlLFxuICAgICAgc2hvdzogdHJ1ZVxuICAgIH07XG4gICAgdmFyIERlZmF1bHRUeXBlID0ge1xuICAgICAgYmFja2Ryb3A6ICcoYm9vbGVhbnxzdHJpbmcpJyxcbiAgICAgIGtleWJvYXJkOiAnYm9vbGVhbicsXG4gICAgICBmb2N1czogJ2Jvb2xlYW4nLFxuICAgICAgc2hvdzogJ2Jvb2xlYW4nXG4gICAgfTtcbiAgICB2YXIgRXZlbnQgPSB7XG4gICAgICBISURFOiBcImhpZGVcIiArIEVWRU5UX0tFWSxcbiAgICAgIEhJRERFTjogXCJoaWRkZW5cIiArIEVWRU5UX0tFWSxcbiAgICAgIFNIT1c6IFwic2hvd1wiICsgRVZFTlRfS0VZLFxuICAgICAgU0hPV046IFwic2hvd25cIiArIEVWRU5UX0tFWSxcbiAgICAgIEZPQ1VTSU46IFwiZm9jdXNpblwiICsgRVZFTlRfS0VZLFxuICAgICAgUkVTSVpFOiBcInJlc2l6ZVwiICsgRVZFTlRfS0VZLFxuICAgICAgQ0xJQ0tfRElTTUlTUzogXCJjbGljay5kaXNtaXNzXCIgKyBFVkVOVF9LRVksXG4gICAgICBLRVlET1dOX0RJU01JU1M6IFwia2V5ZG93bi5kaXNtaXNzXCIgKyBFVkVOVF9LRVksXG4gICAgICBNT1VTRVVQX0RJU01JU1M6IFwibW91c2V1cC5kaXNtaXNzXCIgKyBFVkVOVF9LRVksXG4gICAgICBNT1VTRURPV05fRElTTUlTUzogXCJtb3VzZWRvd24uZGlzbWlzc1wiICsgRVZFTlRfS0VZLFxuICAgICAgQ0xJQ0tfREFUQV9BUEk6IFwiY2xpY2tcIiArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWVxuICAgIH07XG4gICAgdmFyIENsYXNzTmFtZSA9IHtcbiAgICAgIFNDUk9MTEJBUl9NRUFTVVJFUjogJ21vZGFsLXNjcm9sbGJhci1tZWFzdXJlJyxcbiAgICAgIEJBQ0tEUk9QOiAnbW9kYWwtYmFja2Ryb3AnLFxuICAgICAgT1BFTjogJ21vZGFsLW9wZW4nLFxuICAgICAgRkFERTogJ2ZhZGUnLFxuICAgICAgU0hPVzogJ3Nob3cnXG4gICAgfTtcbiAgICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgICBESUFMT0c6ICcubW9kYWwtZGlhbG9nJyxcbiAgICAgIERBVEFfVE9HR0xFOiAnW2RhdGEtdG9nZ2xlPVwibW9kYWxcIl0nLFxuICAgICAgREFUQV9ESVNNSVNTOiAnW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJyxcbiAgICAgIEZJWEVEX0NPTlRFTlQ6ICcuZml4ZWQtdG9wLCAuZml4ZWQtYm90dG9tLCAuaXMtZml4ZWQsIC5zdGlja3ktdG9wJyxcbiAgICAgIFNUSUNLWV9DT05URU5UOiAnLnN0aWNreS10b3AnXG4gICAgICAvKipcbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKi9cblxuICAgIH07XG5cbiAgICB2YXIgTW9kYWwgPVxuICAgIC8qI19fUFVSRV9fKi9cbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBNb2RhbChlbGVtZW50LCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9kaWFsb2cgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuRElBTE9HKTtcbiAgICAgICAgdGhpcy5fYmFja2Ryb3AgPSBudWxsO1xuICAgICAgICB0aGlzLl9pc1Nob3duID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzQm9keU92ZXJmbG93aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lnbm9yZUJhY2tkcm9wQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsYmFyV2lkdGggPSAwO1xuICAgICAgfSAvLyBHZXR0ZXJzXG5cblxuICAgICAgdmFyIF9wcm90byA9IE1vZGFsLnByb3RvdHlwZTtcblxuICAgICAgLy8gUHVibGljXG4gICAgICBfcHJvdG8udG9nZ2xlID0gZnVuY3Rpb24gdG9nZ2xlKHJlbGF0ZWRUYXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdyhyZWxhdGVkVGFyZ2V0KTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5zaG93ID0gZnVuY3Rpb24gc2hvdyhyZWxhdGVkVGFyZ2V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbmluZyB8fCB0aGlzLl9pc1Nob3duKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCQkJDEodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpKSB7XG4gICAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzaG93RXZlbnQgPSAkJCQxLkV2ZW50KEV2ZW50LlNIT1csIHtcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0OiByZWxhdGVkVGFyZ2V0XG4gICAgICAgIH0pO1xuICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2hvd0V2ZW50KTtcblxuICAgICAgICBpZiAodGhpcy5faXNTaG93biB8fCBzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pc1Nob3duID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9jaGVja1Njcm9sbGJhcigpO1xuXG4gICAgICAgIHRoaXMuX3NldFNjcm9sbGJhcigpO1xuXG4gICAgICAgIHRoaXMuX2FkanVzdERpYWxvZygpO1xuXG4gICAgICAgICQkJDEoZG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoQ2xhc3NOYW1lLk9QRU4pO1xuXG4gICAgICAgIHRoaXMuX3NldEVzY2FwZUV2ZW50KCk7XG5cbiAgICAgICAgdGhpcy5fc2V0UmVzaXplRXZlbnQoKTtcblxuICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RJU01JU1MsIFNlbGVjdG9yLkRBVEFfRElTTUlTUywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLmhpZGUoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgJCQkMSh0aGlzLl9kaWFsb2cpLm9uKEV2ZW50Lk1PVVNFRE9XTl9ESVNNSVNTLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCQkMShfdGhpcy5fZWxlbWVudCkub25lKEV2ZW50Lk1PVVNFVVBfRElTTUlTUywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoJCQkMShldmVudC50YXJnZXQpLmlzKF90aGlzLl9lbGVtZW50KSkge1xuICAgICAgICAgICAgICBfdGhpcy5faWdub3JlQmFja2Ryb3BDbGljayA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX3Nob3dCYWNrZHJvcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLl9zaG93RWxlbWVudChyZWxhdGVkVGFyZ2V0KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uaGlkZSA9IGZ1bmN0aW9uIGhpZGUoZXZlbnQpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pc1RyYW5zaXRpb25pbmcgfHwgIXRoaXMuX2lzU2hvd24pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGlkZUV2ZW50ID0gJCQkMS5FdmVudChFdmVudC5ISURFKTtcbiAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKGhpZGVFdmVudCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1Nob3duIHx8IGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lzU2hvd24gPSBmYWxzZTtcbiAgICAgICAgdmFyIHRyYW5zaXRpb24gPSAkJCQxKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKTtcblxuICAgICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZXRFc2NhcGVFdmVudCgpO1xuXG4gICAgICAgIHRoaXMuX3NldFJlc2l6ZUV2ZW50KCk7XG5cbiAgICAgICAgJCQkMShkb2N1bWVudCkub2ZmKEV2ZW50LkZPQ1VTSU4pO1xuICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKTtcbiAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS5vZmYoRXZlbnQuQ0xJQ0tfRElTTUlTUyk7XG4gICAgICAgICQkJDEodGhpcy5fZGlhbG9nKS5vZmYoRXZlbnQuTU9VU0VET1dOX0RJU01JU1MpO1xuXG4gICAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgICAgdmFyIHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudCk7XG4gICAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMyLl9oaWRlTW9kYWwoZXZlbnQpO1xuICAgICAgICAgIH0pLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5faGlkZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICAgJCQkMS5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKTtcbiAgICAgICAgJCQkMSh3aW5kb3csIGRvY3VtZW50LCB0aGlzLl9lbGVtZW50LCB0aGlzLl9iYWNrZHJvcCkub2ZmKEVWRU5UX0tFWSk7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9kaWFsb2cgPSBudWxsO1xuICAgICAgICB0aGlzLl9iYWNrZHJvcCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lzU2hvd24gPSBudWxsO1xuICAgICAgICB0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lnbm9yZUJhY2tkcm9wQ2xpY2sgPSBudWxsO1xuICAgICAgICB0aGlzLl9zY3JvbGxiYXJXaWR0aCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uaGFuZGxlVXBkYXRlID0gZnVuY3Rpb24gaGFuZGxlVXBkYXRlKCkge1xuICAgICAgICB0aGlzLl9hZGp1c3REaWFsb2coKTtcbiAgICAgIH07IC8vIFByaXZhdGVcblxuXG4gICAgICBfcHJvdG8uX2dldENvbmZpZyA9IGZ1bmN0aW9uIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZyA9IF9vYmplY3RTcHJlYWQoe30sIERlZmF1bHQsIGNvbmZpZyk7XG4gICAgICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgRGVmYXVsdFR5cGUpO1xuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9zaG93RWxlbWVudCA9IGZ1bmN0aW9uIF9zaG93RWxlbWVudChyZWxhdGVkVGFyZ2V0KSB7XG4gICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgIHZhciB0cmFuc2l0aW9uID0gJCQkMSh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUgfHwgdGhpcy5fZWxlbWVudC5wYXJlbnROb2RlLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgIC8vIERvbid0IG1vdmUgbW9kYWwncyBET00gcG9zaXRpb25cbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LnNjcm9sbFRvcCA9IDA7XG5cbiAgICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgICBVdGlsLnJlZmxvdyh0aGlzLl9lbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpO1xuXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcuZm9jdXMpIHtcbiAgICAgICAgICB0aGlzLl9lbmZvcmNlRm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzaG93bkV2ZW50ID0gJCQkMS5FdmVudChFdmVudC5TSE9XTiwge1xuICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHRyYW5zaXRpb25Db21wbGV0ZSA9IGZ1bmN0aW9uIHRyYW5zaXRpb25Db21wbGV0ZSgpIHtcbiAgICAgICAgICBpZiAoX3RoaXMzLl9jb25maWcuZm9jdXMpIHtcbiAgICAgICAgICAgIF90aGlzMy5fZWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIF90aGlzMy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG4gICAgICAgICAgJCQkMShfdGhpczMuX2VsZW1lbnQpLnRyaWdnZXIoc2hvd25FdmVudCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgICB2YXIgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KTtcbiAgICAgICAgICAkJCQxKHRoaXMuX2RpYWxvZykub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIHRyYW5zaXRpb25Db21wbGV0ZSkuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cmFuc2l0aW9uQ29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9lbmZvcmNlRm9jdXMgPSBmdW5jdGlvbiBfZW5mb3JjZUZvY3VzKCkge1xuICAgICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgICAkJCQxKGRvY3VtZW50KS5vZmYoRXZlbnQuRk9DVVNJTikgLy8gR3VhcmQgYWdhaW5zdCBpbmZpbml0ZSBmb2N1cyBsb29wXG4gICAgICAgIC5vbihFdmVudC5GT0NVU0lOLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZG9jdW1lbnQgIT09IGV2ZW50LnRhcmdldCAmJiBfdGhpczQuX2VsZW1lbnQgIT09IGV2ZW50LnRhcmdldCAmJiAkJCQxKF90aGlzNC5fZWxlbWVudCkuaGFzKGV2ZW50LnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpczQuX2VsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9zZXRFc2NhcGVFdmVudCA9IGZ1bmN0aW9uIF9zZXRFc2NhcGVFdmVudCgpIHtcbiAgICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzU2hvd24gJiYgdGhpcy5fY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5LRVlET1dOX0RJU01JU1MsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSBFU0NBUEVfS0VZQ09ERSkge1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgIF90aGlzNS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2lzU2hvd24pIHtcbiAgICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLm9mZihFdmVudC5LRVlET1dOX0RJU01JU1MpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX3NldFJlc2l6ZUV2ZW50ID0gZnVuY3Rpb24gX3NldFJlc2l6ZUV2ZW50KCkge1xuICAgICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgICBpZiAodGhpcy5faXNTaG93bikge1xuICAgICAgICAgICQkJDEod2luZG93KS5vbihFdmVudC5SRVNJWkUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzNi5oYW5kbGVVcGRhdGUoZXZlbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQkJDEod2luZG93KS5vZmYoRXZlbnQuUkVTSVpFKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9oaWRlTW9kYWwgPSBmdW5jdGlvbiBfaGlkZU1vZGFsKCkge1xuICAgICAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fc2hvd0JhY2tkcm9wKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkJCQxKGRvY3VtZW50LmJvZHkpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5PUEVOKTtcblxuICAgICAgICAgIF90aGlzNy5fcmVzZXRBZGp1c3RtZW50cygpO1xuXG4gICAgICAgICAgX3RoaXM3Ll9yZXNldFNjcm9sbGJhcigpO1xuXG4gICAgICAgICAgJCQkMShfdGhpczcuX2VsZW1lbnQpLnRyaWdnZXIoRXZlbnQuSElEREVOKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX3JlbW92ZUJhY2tkcm9wID0gZnVuY3Rpb24gX3JlbW92ZUJhY2tkcm9wKCkge1xuICAgICAgICBpZiAodGhpcy5fYmFja2Ryb3ApIHtcbiAgICAgICAgICAkJCQxKHRoaXMuX2JhY2tkcm9wKS5yZW1vdmUoKTtcbiAgICAgICAgICB0aGlzLl9iYWNrZHJvcCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fc2hvd0JhY2tkcm9wID0gZnVuY3Rpb24gX3Nob3dCYWNrZHJvcChjYWxsYmFjaykge1xuICAgICAgICB2YXIgX3RoaXM4ID0gdGhpcztcblxuICAgICAgICB2YXIgYW5pbWF0ZSA9ICQkJDEodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpID8gQ2xhc3NOYW1lLkZBREUgOiAnJztcblxuICAgICAgICBpZiAodGhpcy5faXNTaG93biAmJiB0aGlzLl9jb25maWcuYmFja2Ryb3ApIHtcbiAgICAgICAgICB0aGlzLl9iYWNrZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHRoaXMuX2JhY2tkcm9wLmNsYXNzTmFtZSA9IENsYXNzTmFtZS5CQUNLRFJPUDtcblxuICAgICAgICAgIGlmIChhbmltYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZHJvcC5jbGFzc0xpc3QuYWRkKGFuaW1hdGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQkJDEodGhpcy5fYmFja2Ryb3ApLmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpO1xuICAgICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkub24oRXZlbnQuQ0xJQ0tfRElTTUlTUywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoX3RoaXM4Ll9pZ25vcmVCYWNrZHJvcENsaWNrKSB7XG4gICAgICAgICAgICAgIF90aGlzOC5faWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgIT09IGV2ZW50LmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoX3RoaXM4Ll9jb25maWcuYmFja2Ryb3AgPT09ICdzdGF0aWMnKSB7XG4gICAgICAgICAgICAgIF90aGlzOC5fZWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX3RoaXM4LmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChhbmltYXRlKSB7XG4gICAgICAgICAgICBVdGlsLnJlZmxvdyh0aGlzLl9iYWNrZHJvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJCQkMSh0aGlzLl9iYWNrZHJvcCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpO1xuXG4gICAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghYW5pbWF0ZSkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgYmFja2Ryb3BUcmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMuX2JhY2tkcm9wKTtcbiAgICAgICAgICAkJCQxKHRoaXMuX2JhY2tkcm9wKS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY2FsbGJhY2spLmVtdWxhdGVUcmFuc2l0aW9uRW5kKGJhY2tkcm9wVHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5faXNTaG93biAmJiB0aGlzLl9iYWNrZHJvcCkge1xuICAgICAgICAgICQkJDEodGhpcy5fYmFja2Ryb3ApLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKTtcblxuICAgICAgICAgIHZhciBjYWxsYmFja1JlbW92ZSA9IGZ1bmN0aW9uIGNhbGxiYWNrUmVtb3ZlKCkge1xuICAgICAgICAgICAgX3RoaXM4Ll9yZW1vdmVCYWNrZHJvcCgpO1xuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKCQkJDEodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpKSB7XG4gICAgICAgICAgICB2YXIgX2JhY2tkcm9wVHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aGlzLl9iYWNrZHJvcCk7XG5cbiAgICAgICAgICAgICQkJDEodGhpcy5fYmFja2Ryb3ApLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjYWxsYmFja1JlbW92ZSkuZW11bGF0ZVRyYW5zaXRpb25FbmQoX2JhY2tkcm9wVHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2tSZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9OyAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAvLyB0aGUgZm9sbG93aW5nIG1ldGhvZHMgYXJlIHVzZWQgdG8gaGFuZGxlIG92ZXJmbG93aW5nIG1vZGFsc1xuICAgICAgLy8gdG9kbyAoZmF0KTogdGhlc2Ugc2hvdWxkIHByb2JhYmx5IGJlIHJlZmFjdG9yZWQgb3V0IG9mIG1vZGFsLmpzXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgX3Byb3RvLl9hZGp1c3REaWFsb2cgPSBmdW5jdGlvbiBfYWRqdXN0RGlhbG9nKCkge1xuICAgICAgICB2YXIgaXNNb2RhbE92ZXJmbG93aW5nID0gdGhpcy5fZWxlbWVudC5zY3JvbGxIZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgIGlmICghdGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcgJiYgaXNNb2RhbE92ZXJmbG93aW5nKSB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5wYWRkaW5nTGVmdCA9IHRoaXMuX3Njcm9sbGJhcldpZHRoICsgXCJweFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzQm9keU92ZXJmbG93aW5nICYmICFpc01vZGFsT3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnBhZGRpbmdSaWdodCA9IHRoaXMuX3Njcm9sbGJhcldpZHRoICsgXCJweFwiO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX3Jlc2V0QWRqdXN0bWVudHMgPSBmdW5jdGlvbiBfcmVzZXRBZGp1c3RtZW50cygpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5wYWRkaW5nTGVmdCA9ICcnO1xuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnBhZGRpbmdSaWdodCA9ICcnO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9jaGVja1Njcm9sbGJhciA9IGZ1bmN0aW9uIF9jaGVja1Njcm9sbGJhcigpIHtcbiAgICAgICAgdmFyIHJlY3QgPSBkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyA9IHJlY3QubGVmdCArIHJlY3QucmlnaHQgPCB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdGhpcy5fc2Nyb2xsYmFyV2lkdGggPSB0aGlzLl9nZXRTY3JvbGxiYXJXaWR0aCgpO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9zZXRTY3JvbGxiYXIgPSBmdW5jdGlvbiBfc2V0U2Nyb2xsYmFyKCkge1xuICAgICAgICB2YXIgX3RoaXM5ID0gdGhpcztcblxuICAgICAgICBpZiAodGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgICAvLyBOb3RlOiBET01Ob2RlLnN0eWxlLnBhZGRpbmdSaWdodCByZXR1cm5zIHRoZSBhY3R1YWwgdmFsdWUgb3IgJycgaWYgbm90IHNldFxuICAgICAgICAgIC8vICAgd2hpbGUgJChET01Ob2RlKS5jc3MoJ3BhZGRpbmctcmlnaHQnKSByZXR1cm5zIHRoZSBjYWxjdWxhdGVkIHZhbHVlIG9yIDAgaWYgbm90IHNldFxuICAgICAgICAgIHZhciBmaXhlZENvbnRlbnQgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuRklYRURfQ09OVEVOVCkpO1xuICAgICAgICAgIHZhciBzdGlja3lDb250ZW50ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLlNUSUNLWV9DT05URU5UKSk7IC8vIEFkanVzdCBmaXhlZCBjb250ZW50IHBhZGRpbmdcblxuICAgICAgICAgICQkJDEoZml4ZWRDb250ZW50KS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIGFjdHVhbFBhZGRpbmcgPSBlbGVtZW50LnN0eWxlLnBhZGRpbmdSaWdodDtcbiAgICAgICAgICAgIHZhciBjYWxjdWxhdGVkUGFkZGluZyA9ICQkJDEoZWxlbWVudCkuY3NzKCdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICAgICAgICAkJCQxKGVsZW1lbnQpLmRhdGEoJ3BhZGRpbmctcmlnaHQnLCBhY3R1YWxQYWRkaW5nKS5jc3MoJ3BhZGRpbmctcmlnaHQnLCBwYXJzZUZsb2F0KGNhbGN1bGF0ZWRQYWRkaW5nKSArIF90aGlzOS5fc2Nyb2xsYmFyV2lkdGggKyBcInB4XCIpO1xuICAgICAgICAgIH0pOyAvLyBBZGp1c3Qgc3RpY2t5IGNvbnRlbnQgbWFyZ2luXG5cbiAgICAgICAgICAkJCQxKHN0aWNreUNvbnRlbnQpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgYWN0dWFsTWFyZ2luID0gZWxlbWVudC5zdHlsZS5tYXJnaW5SaWdodDtcbiAgICAgICAgICAgIHZhciBjYWxjdWxhdGVkTWFyZ2luID0gJCQkMShlbGVtZW50KS5jc3MoJ21hcmdpbi1yaWdodCcpO1xuICAgICAgICAgICAgJCQkMShlbGVtZW50KS5kYXRhKCdtYXJnaW4tcmlnaHQnLCBhY3R1YWxNYXJnaW4pLmNzcygnbWFyZ2luLXJpZ2h0JywgcGFyc2VGbG9hdChjYWxjdWxhdGVkTWFyZ2luKSAtIF90aGlzOS5fc2Nyb2xsYmFyV2lkdGggKyBcInB4XCIpO1xuICAgICAgICAgIH0pOyAvLyBBZGp1c3QgYm9keSBwYWRkaW5nXG5cbiAgICAgICAgICB2YXIgYWN0dWFsUGFkZGluZyA9IGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0O1xuICAgICAgICAgIHZhciBjYWxjdWxhdGVkUGFkZGluZyA9ICQkJDEoZG9jdW1lbnQuYm9keSkuY3NzKCdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICAgICAgJCQkMShkb2N1bWVudC5ib2R5KS5kYXRhKCdwYWRkaW5nLXJpZ2h0JywgYWN0dWFsUGFkZGluZykuY3NzKCdwYWRkaW5nLXJpZ2h0JywgcGFyc2VGbG9hdChjYWxjdWxhdGVkUGFkZGluZykgKyB0aGlzLl9zY3JvbGxiYXJXaWR0aCArIFwicHhcIik7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fcmVzZXRTY3JvbGxiYXIgPSBmdW5jdGlvbiBfcmVzZXRTY3JvbGxiYXIoKSB7XG4gICAgICAgIC8vIFJlc3RvcmUgZml4ZWQgY29udGVudCBwYWRkaW5nXG4gICAgICAgIHZhciBmaXhlZENvbnRlbnQgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuRklYRURfQ09OVEVOVCkpO1xuICAgICAgICAkJCQxKGZpeGVkQ29udGVudCkuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgcGFkZGluZyA9ICQkJDEoZWxlbWVudCkuZGF0YSgncGFkZGluZy1yaWdodCcpO1xuICAgICAgICAgICQkJDEoZWxlbWVudCkucmVtb3ZlRGF0YSgncGFkZGluZy1yaWdodCcpO1xuICAgICAgICAgIGVsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gcGFkZGluZyA/IHBhZGRpbmcgOiAnJztcbiAgICAgICAgfSk7IC8vIFJlc3RvcmUgc3RpY2t5IGNvbnRlbnRcblxuICAgICAgICB2YXIgZWxlbWVudHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJcIiArIFNlbGVjdG9yLlNUSUNLWV9DT05URU5UKSk7XG4gICAgICAgICQkJDEoZWxlbWVudHMpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIG1hcmdpbiA9ICQkJDEoZWxlbWVudCkuZGF0YSgnbWFyZ2luLXJpZ2h0Jyk7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG1hcmdpbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICQkJDEoZWxlbWVudCkuY3NzKCdtYXJnaW4tcmlnaHQnLCBtYXJnaW4pLnJlbW92ZURhdGEoJ21hcmdpbi1yaWdodCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7IC8vIFJlc3RvcmUgYm9keSBwYWRkaW5nXG5cbiAgICAgICAgdmFyIHBhZGRpbmcgPSAkJCQxKGRvY3VtZW50LmJvZHkpLmRhdGEoJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgICAgJCQkMShkb2N1bWVudC5ib2R5KS5yZW1vdmVEYXRhKCdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gcGFkZGluZyA/IHBhZGRpbmcgOiAnJztcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZ2V0U2Nyb2xsYmFyV2lkdGggPSBmdW5jdGlvbiBfZ2V0U2Nyb2xsYmFyV2lkdGgoKSB7XG4gICAgICAgIC8vIHRoeCBkLndhbHNoXG4gICAgICAgIHZhciBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2Nyb2xsRGl2LmNsYXNzTmFtZSA9IENsYXNzTmFtZS5TQ1JPTExCQVJfTUVBU1VSRVI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KTtcbiAgICAgICAgdmFyIHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcm9sbERpdik7XG4gICAgICAgIHJldHVybiBzY3JvbGxiYXJXaWR0aDtcbiAgICAgIH07IC8vIFN0YXRpY1xuXG5cbiAgICAgIE1vZGFsLl9qUXVlcnlJbnRlcmZhY2UgPSBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZywgcmVsYXRlZFRhcmdldCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9ICQkJDEodGhpcykuZGF0YShEQVRBX0tFWSk7XG5cbiAgICAgICAgICB2YXIgX2NvbmZpZyA9IF9vYmplY3RTcHJlYWQoe30sIERlZmF1bHQsICQkJDEodGhpcykuZGF0YSgpLCB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWcgPyBjb25maWcgOiB7fSk7XG5cbiAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgTW9kYWwodGhpcywgX2NvbmZpZyk7XG4gICAgICAgICAgICAkJCQxKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJObyBtZXRob2QgbmFtZWQgXFxcIlwiICsgY29uZmlnICsgXCJcXFwiXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhW2NvbmZpZ10ocmVsYXRlZFRhcmdldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChfY29uZmlnLnNob3cpIHtcbiAgICAgICAgICAgIGRhdGEuc2hvdyhyZWxhdGVkVGFyZ2V0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgX2NyZWF0ZUNsYXNzKE1vZGFsLCBudWxsLCBbe1xuICAgICAgICBrZXk6IFwiVkVSU0lPTlwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6IFwiRGVmYXVsdFwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRGVmYXVsdDtcbiAgICAgICAgfVxuICAgICAgfV0pO1xuXG4gICAgICByZXR1cm4gTW9kYWw7XG4gICAgfSgpO1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cblxuICAgICQkJDEoZG9jdW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgX3RoaXMxMCA9IHRoaXM7XG5cbiAgICAgIHZhciB0YXJnZXQ7XG4gICAgICB2YXIgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQodGhpcyk7XG5cbiAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbmZpZyA9ICQkJDEodGFyZ2V0KS5kYXRhKERBVEFfS0VZKSA/ICd0b2dnbGUnIDogX29iamVjdFNwcmVhZCh7fSwgJCQkMSh0YXJnZXQpLmRhdGEoKSwgJCQkMSh0aGlzKS5kYXRhKCkpO1xuXG4gICAgICBpZiAodGhpcy50YWdOYW1lID09PSAnQScgfHwgdGhpcy50YWdOYW1lID09PSAnQVJFQScpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgdmFyICR0YXJnZXQgPSAkJCQxKHRhcmdldCkub25lKEV2ZW50LlNIT1csIGZ1bmN0aW9uIChzaG93RXZlbnQpIHtcbiAgICAgICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgIC8vIE9ubHkgcmVnaXN0ZXIgZm9jdXMgcmVzdG9yZXIgaWYgbW9kYWwgd2lsbCBhY3R1YWxseSBnZXQgc2hvd25cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkdGFyZ2V0Lm9uZShFdmVudC5ISURERU4sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoJCQkMShfdGhpczEwKS5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAgICAgX3RoaXMxMC5mb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgTW9kYWwuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQkJDEodGFyZ2V0KSwgY29uZmlnLCB0aGlzKTtcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBqUXVlcnlcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgICQkJDEuZm5bTkFNRV0gPSBNb2RhbC5falF1ZXJ5SW50ZXJmYWNlO1xuICAgICQkJDEuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBNb2RhbDtcblxuICAgICQkJDEuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICQkJDEuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgICByZXR1cm4gTW9kYWwuX2pRdWVyeUludGVyZmFjZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE1vZGFsO1xuICB9KCQpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY0LjEuMyk6IHRvb2x0aXAuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIFRvb2x0aXAgPSBmdW5jdGlvbiAoJCQkMSkge1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENvbnN0YW50c1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuICAgIHZhciBOQU1FID0gJ3Rvb2x0aXAnO1xuICAgIHZhciBWRVJTSU9OID0gJzQuMS4zJztcbiAgICB2YXIgREFUQV9LRVkgPSAnYnMudG9vbHRpcCc7XG4gICAgdmFyIEVWRU5UX0tFWSA9IFwiLlwiICsgREFUQV9LRVk7XG4gICAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQkJDEuZm5bTkFNRV07XG4gICAgdmFyIENMQVNTX1BSRUZJWCA9ICdicy10b29sdGlwJztcbiAgICB2YXIgQlNDTFNfUFJFRklYX1JFR0VYID0gbmV3IFJlZ0V4cChcIihefFxcXFxzKVwiICsgQ0xBU1NfUFJFRklYICsgXCJcXFxcUytcIiwgJ2cnKTtcbiAgICB2YXIgRGVmYXVsdFR5cGUgPSB7XG4gICAgICBhbmltYXRpb246ICdib29sZWFuJyxcbiAgICAgIHRlbXBsYXRlOiAnc3RyaW5nJyxcbiAgICAgIHRpdGxlOiAnKHN0cmluZ3xlbGVtZW50fGZ1bmN0aW9uKScsXG4gICAgICB0cmlnZ2VyOiAnc3RyaW5nJyxcbiAgICAgIGRlbGF5OiAnKG51bWJlcnxvYmplY3QpJyxcbiAgICAgIGh0bWw6ICdib29sZWFuJyxcbiAgICAgIHNlbGVjdG9yOiAnKHN0cmluZ3xib29sZWFuKScsXG4gICAgICBwbGFjZW1lbnQ6ICcoc3RyaW5nfGZ1bmN0aW9uKScsXG4gICAgICBvZmZzZXQ6ICcobnVtYmVyfHN0cmluZyknLFxuICAgICAgY29udGFpbmVyOiAnKHN0cmluZ3xlbGVtZW50fGJvb2xlYW4pJyxcbiAgICAgIGZhbGxiYWNrUGxhY2VtZW50OiAnKHN0cmluZ3xhcnJheSknLFxuICAgICAgYm91bmRhcnk6ICcoc3RyaW5nfGVsZW1lbnQpJ1xuICAgIH07XG4gICAgdmFyIEF0dGFjaG1lbnRNYXAgPSB7XG4gICAgICBBVVRPOiAnYXV0bycsXG4gICAgICBUT1A6ICd0b3AnLFxuICAgICAgUklHSFQ6ICdyaWdodCcsXG4gICAgICBCT1RUT006ICdib3R0b20nLFxuICAgICAgTEVGVDogJ2xlZnQnXG4gICAgfTtcbiAgICB2YXIgRGVmYXVsdCA9IHtcbiAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcbiAgICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInRvb2x0aXBcIiByb2xlPVwidG9vbHRpcFwiPicgKyAnPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+JyArICc8ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjwvZGl2PjwvZGl2PicsXG4gICAgICB0cmlnZ2VyOiAnaG92ZXIgZm9jdXMnLFxuICAgICAgdGl0bGU6ICcnLFxuICAgICAgZGVsYXk6IDAsXG4gICAgICBodG1sOiBmYWxzZSxcbiAgICAgIHNlbGVjdG9yOiBmYWxzZSxcbiAgICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgICBvZmZzZXQ6IDAsXG4gICAgICBjb250YWluZXI6IGZhbHNlLFxuICAgICAgZmFsbGJhY2tQbGFjZW1lbnQ6ICdmbGlwJyxcbiAgICAgIGJvdW5kYXJ5OiAnc2Nyb2xsUGFyZW50J1xuICAgIH07XG4gICAgdmFyIEhvdmVyU3RhdGUgPSB7XG4gICAgICBTSE9XOiAnc2hvdycsXG4gICAgICBPVVQ6ICdvdXQnXG4gICAgfTtcbiAgICB2YXIgRXZlbnQgPSB7XG4gICAgICBISURFOiBcImhpZGVcIiArIEVWRU5UX0tFWSxcbiAgICAgIEhJRERFTjogXCJoaWRkZW5cIiArIEVWRU5UX0tFWSxcbiAgICAgIFNIT1c6IFwic2hvd1wiICsgRVZFTlRfS0VZLFxuICAgICAgU0hPV046IFwic2hvd25cIiArIEVWRU5UX0tFWSxcbiAgICAgIElOU0VSVEVEOiBcImluc2VydGVkXCIgKyBFVkVOVF9LRVksXG4gICAgICBDTElDSzogXCJjbGlja1wiICsgRVZFTlRfS0VZLFxuICAgICAgRk9DVVNJTjogXCJmb2N1c2luXCIgKyBFVkVOVF9LRVksXG4gICAgICBGT0NVU09VVDogXCJmb2N1c291dFwiICsgRVZFTlRfS0VZLFxuICAgICAgTU9VU0VFTlRFUjogXCJtb3VzZWVudGVyXCIgKyBFVkVOVF9LRVksXG4gICAgICBNT1VTRUxFQVZFOiBcIm1vdXNlbGVhdmVcIiArIEVWRU5UX0tFWVxuICAgIH07XG4gICAgdmFyIENsYXNzTmFtZSA9IHtcbiAgICAgIEZBREU6ICdmYWRlJyxcbiAgICAgIFNIT1c6ICdzaG93J1xuICAgIH07XG4gICAgdmFyIFNlbGVjdG9yID0ge1xuICAgICAgVE9PTFRJUDogJy50b29sdGlwJyxcbiAgICAgIFRPT0xUSVBfSU5ORVI6ICcudG9vbHRpcC1pbm5lcicsXG4gICAgICBBUlJPVzogJy5hcnJvdydcbiAgICB9O1xuICAgIHZhciBUcmlnZ2VyID0ge1xuICAgICAgSE9WRVI6ICdob3ZlcicsXG4gICAgICBGT0NVUzogJ2ZvY3VzJyxcbiAgICAgIENMSUNLOiAnY2xpY2snLFxuICAgICAgTUFOVUFMOiAnbWFudWFsJ1xuICAgICAgLyoqXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqIENsYXNzIERlZmluaXRpb25cbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICovXG5cbiAgICB9O1xuXG4gICAgdmFyIFRvb2x0aXAgPVxuICAgIC8qI19fUFVSRV9fKi9cbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBUb29sdGlwKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgZm9yIFBvcHBlciBkZXBlbmRlbmN5XG4gICAgICAgICAqIFBvcHBlciAtIGh0dHBzOi8vcG9wcGVyLmpzLm9yZ1xuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBQb3BwZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9vdHN0cmFwIHRvb2x0aXBzIHJlcXVpcmUgUG9wcGVyLmpzIChodHRwczovL3BvcHBlci5qcy5vcmcpJyk7XG4gICAgICAgIH0gLy8gcHJpdmF0ZVxuXG5cbiAgICAgICAgdGhpcy5faXNFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fdGltZW91dCA9IDA7XG4gICAgICAgIHRoaXMuX2hvdmVyU3RhdGUgPSAnJztcbiAgICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlciA9IHt9O1xuICAgICAgICB0aGlzLl9wb3BwZXIgPSBudWxsOyAvLyBQcm90ZWN0ZWRcblxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpO1xuICAgICAgICB0aGlzLnRpcCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fc2V0TGlzdGVuZXJzKCk7XG4gICAgICB9IC8vIEdldHRlcnNcblxuXG4gICAgICB2YXIgX3Byb3RvID0gVG9vbHRpcC5wcm90b3R5cGU7XG5cbiAgICAgIC8vIFB1YmxpY1xuICAgICAgX3Byb3RvLmVuYWJsZSA9IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5faXNFbmFibGVkID0gdHJ1ZTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5kaXNhYmxlID0gZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5faXNFbmFibGVkID0gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8udG9nZ2xlRW5hYmxlZCA9IGZ1bmN0aW9uIHRvZ2dsZUVuYWJsZWQoKSB7XG4gICAgICAgIHRoaXMuX2lzRW5hYmxlZCA9ICF0aGlzLl9pc0VuYWJsZWQ7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8udG9nZ2xlID0gZnVuY3Rpb24gdG9nZ2xlKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5faXNFbmFibGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIGRhdGFLZXkgPSB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZO1xuICAgICAgICAgIHZhciBjb250ZXh0ID0gJCQkMShldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXkpO1xuXG4gICAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgICBjb250ZXh0ID0gbmV3IHRoaXMuY29uc3RydWN0b3IoZXZlbnQuY3VycmVudFRhcmdldCwgdGhpcy5fZ2V0RGVsZWdhdGVDb25maWcoKSk7XG4gICAgICAgICAgICAkJCQxKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSwgY29udGV4dCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5fYWN0aXZlVHJpZ2dlci5jbGljayA9ICFjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyLmNsaWNrO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQuX2lzV2l0aEFjdGl2ZVRyaWdnZXIoKSkge1xuICAgICAgICAgICAgY29udGV4dC5fZW50ZXIobnVsbCwgY29udGV4dCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQuX2xlYXZlKG51bGwsIGNvbnRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoJCQkMSh0aGlzLmdldFRpcEVsZW1lbnQoKSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWF2ZShudWxsLCB0aGlzKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2VudGVyKG51bGwsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcbiAgICAgICAgJCQkMS5yZW1vdmVEYXRhKHRoaXMuZWxlbWVudCwgdGhpcy5jb25zdHJ1Y3Rvci5EQVRBX0tFWSk7XG4gICAgICAgICQkJDEodGhpcy5lbGVtZW50KS5vZmYodGhpcy5jb25zdHJ1Y3Rvci5FVkVOVF9LRVkpO1xuICAgICAgICAkJCQxKHRoaXMuZWxlbWVudCkuY2xvc2VzdCgnLm1vZGFsJykub2ZmKCdoaWRlLmJzLm1vZGFsJyk7XG5cbiAgICAgICAgaWYgKHRoaXMudGlwKSB7XG4gICAgICAgICAgJCQkMSh0aGlzLnRpcCkucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pc0VuYWJsZWQgPSBudWxsO1xuICAgICAgICB0aGlzLl90aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5faG92ZXJTdGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXIgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLl9wb3BwZXIgIT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9wb3BwZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcG9wcGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb25maWcgPSBudWxsO1xuICAgICAgICB0aGlzLnRpcCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uc2hvdyA9IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCQkJDEodGhpcy5lbGVtZW50KS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgdXNlIHNob3cgb24gdmlzaWJsZSBlbGVtZW50cycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNob3dFdmVudCA9ICQkJDEuRXZlbnQodGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5TSE9XKTtcblxuICAgICAgICBpZiAodGhpcy5pc1dpdGhDb250ZW50KCkgJiYgdGhpcy5faXNFbmFibGVkKSB7XG4gICAgICAgICAgJCQkMSh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoc2hvd0V2ZW50KTtcbiAgICAgICAgICB2YXIgaXNJblRoZURvbSA9ICQkJDEuY29udGFpbnModGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB0aGlzLmVsZW1lbnQpO1xuXG4gICAgICAgICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCAhaXNJblRoZURvbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciB0aXAgPSB0aGlzLmdldFRpcEVsZW1lbnQoKTtcbiAgICAgICAgICB2YXIgdGlwSWQgPSBVdGlsLmdldFVJRCh0aGlzLmNvbnN0cnVjdG9yLk5BTUUpO1xuICAgICAgICAgIHRpcC5zZXRBdHRyaWJ1dGUoJ2lkJywgdGlwSWQpO1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknLCB0aXBJZCk7XG4gICAgICAgICAgdGhpcy5zZXRDb250ZW50KCk7XG5cbiAgICAgICAgICBpZiAodGhpcy5jb25maWcuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAkJCQxKHRpcCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkZBREUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBwbGFjZW1lbnQgPSB0eXBlb2YgdGhpcy5jb25maWcucGxhY2VtZW50ID09PSAnZnVuY3Rpb24nID8gdGhpcy5jb25maWcucGxhY2VtZW50LmNhbGwodGhpcywgdGlwLCB0aGlzLmVsZW1lbnQpIDogdGhpcy5jb25maWcucGxhY2VtZW50O1xuXG4gICAgICAgICAgdmFyIGF0dGFjaG1lbnQgPSB0aGlzLl9nZXRBdHRhY2htZW50KHBsYWNlbWVudCk7XG5cbiAgICAgICAgICB0aGlzLmFkZEF0dGFjaG1lbnRDbGFzcyhhdHRhY2htZW50KTtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb25maWcuY29udGFpbmVyID09PSBmYWxzZSA/IGRvY3VtZW50LmJvZHkgOiAkJCQxKGRvY3VtZW50KS5maW5kKHRoaXMuY29uZmlnLmNvbnRhaW5lcik7XG4gICAgICAgICAgJCQkMSh0aXApLmRhdGEodGhpcy5jb25zdHJ1Y3Rvci5EQVRBX0tFWSwgdGhpcyk7XG5cbiAgICAgICAgICBpZiAoISQkJDEuY29udGFpbnModGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB0aGlzLnRpcCkpIHtcbiAgICAgICAgICAgICQkJDEodGlwKS5hcHBlbmRUbyhjb250YWluZXIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQkJDEodGhpcy5lbGVtZW50KS50cmlnZ2VyKHRoaXMuY29uc3RydWN0b3IuRXZlbnQuSU5TRVJURUQpO1xuICAgICAgICAgIHRoaXMuX3BvcHBlciA9IG5ldyBQb3BwZXIodGhpcy5lbGVtZW50LCB0aXAsIHtcbiAgICAgICAgICAgIHBsYWNlbWVudDogYXR0YWNobWVudCxcbiAgICAgICAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICAgICAgICBvZmZzZXQ6IHtcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IHRoaXMuY29uZmlnLm9mZnNldFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBmbGlwOiB7XG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IHRoaXMuY29uZmlnLmZhbGxiYWNrUGxhY2VtZW50XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGFycm93OiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogU2VsZWN0b3IuQVJST1dcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgcHJldmVudE92ZXJmbG93OiB7XG4gICAgICAgICAgICAgICAgYm91bmRhcmllc0VsZW1lbnQ6IHRoaXMuY29uZmlnLmJvdW5kYXJ5XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNyZWF0ZTogZnVuY3Rpb24gb25DcmVhdGUoZGF0YSkge1xuICAgICAgICAgICAgICBpZiAoZGF0YS5vcmlnaW5hbFBsYWNlbWVudCAhPT0gZGF0YS5wbGFjZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5faGFuZGxlUG9wcGVyUGxhY2VtZW50Q2hhbmdlKGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKGRhdGEpIHtcbiAgICAgICAgICAgICAgX3RoaXMuX2hhbmRsZVBvcHBlclBsYWNlbWVudENoYW5nZShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkJCQxKHRpcCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpOyAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgYWRkIGV4dHJhXG4gICAgICAgICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB0byB0aGUgYm9keSdzIGltbWVkaWF0ZSBjaGlsZHJlbjtcbiAgICAgICAgICAvLyBvbmx5IG5lZWRlZCBiZWNhdXNlIG9mIGJyb2tlbiBldmVudCBkZWxlZ2F0aW9uIG9uIGlPU1xuICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LnF1aXJrc21vZGUub3JnL2Jsb2cvYXJjaGl2ZXMvMjAxNC8wMi9tb3VzZV9ldmVudF9idWIuaHRtbFxuXG4gICAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAgICAgJCQkMShkb2N1bWVudC5ib2R5KS5jaGlsZHJlbigpLm9uKCdtb3VzZW92ZXInLCBudWxsLCAkJCQxLm5vb3ApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLmNvbmZpZy5hbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgX3RoaXMuX2ZpeFRyYW5zaXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHByZXZIb3ZlclN0YXRlID0gX3RoaXMuX2hvdmVyU3RhdGU7XG4gICAgICAgICAgICBfdGhpcy5faG92ZXJTdGF0ZSA9IG51bGw7XG4gICAgICAgICAgICAkJCQxKF90aGlzLmVsZW1lbnQpLnRyaWdnZXIoX3RoaXMuY29uc3RydWN0b3IuRXZlbnQuU0hPV04pO1xuXG4gICAgICAgICAgICBpZiAocHJldkhvdmVyU3RhdGUgPT09IEhvdmVyU3RhdGUuT1VUKSB7XG4gICAgICAgICAgICAgIF90aGlzLl9sZWF2ZShudWxsLCBfdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmICgkJCQxKHRoaXMudGlwKS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMudGlwKTtcbiAgICAgICAgICAgICQkJDEodGhpcy50aXApLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSkuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcGxldGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5oaWRlID0gZnVuY3Rpb24gaGlkZShjYWxsYmFjaykge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICB2YXIgdGlwID0gdGhpcy5nZXRUaXBFbGVtZW50KCk7XG4gICAgICAgIHZhciBoaWRlRXZlbnQgPSAkJCQxLkV2ZW50KHRoaXMuY29uc3RydWN0b3IuRXZlbnQuSElERSk7XG5cbiAgICAgICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgaWYgKF90aGlzMi5faG92ZXJTdGF0ZSAhPT0gSG92ZXJTdGF0ZS5TSE9XICYmIHRpcC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aXAucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aXApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIF90aGlzMi5fY2xlYW5UaXBDbGFzcygpO1xuXG4gICAgICAgICAgX3RoaXMyLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5Jyk7XG5cbiAgICAgICAgICAkJCQxKF90aGlzMi5lbGVtZW50KS50cmlnZ2VyKF90aGlzMi5jb25zdHJ1Y3Rvci5FdmVudC5ISURERU4pO1xuXG4gICAgICAgICAgaWYgKF90aGlzMi5fcG9wcGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBfdGhpczIuX3BvcHBlci5kZXN0cm95KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkJCQxKHRoaXMuZWxlbWVudCkudHJpZ2dlcihoaWRlRXZlbnQpO1xuXG4gICAgICAgIGlmIChoaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkJCQxKHRpcCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpOyAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgcmVtb3ZlIHRoZSBleHRyYVxuICAgICAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHdlIGFkZGVkIGZvciBpT1Mgc3VwcG9ydFxuXG4gICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgICAkJCQxKGRvY3VtZW50LmJvZHkpLmNoaWxkcmVuKCkub2ZmKCdtb3VzZW92ZXInLCBudWxsLCAkJCQxLm5vb3ApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUcmlnZ2VyLkNMSUNLXSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyW1RyaWdnZXIuRk9DVVNdID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXJbVHJpZ2dlci5IT1ZFUl0gPSBmYWxzZTtcblxuICAgICAgICBpZiAoJCQkMSh0aGlzLnRpcCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpKSB7XG4gICAgICAgICAgdmFyIHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGlwKTtcbiAgICAgICAgICAkJCQxKHRpcCkub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKS5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ob3ZlclN0YXRlID0gJyc7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8udXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5fcG9wcGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fcG9wcGVyLnNjaGVkdWxlVXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH07IC8vIFByb3RlY3RlZFxuXG5cbiAgICAgIF9wcm90by5pc1dpdGhDb250ZW50ID0gZnVuY3Rpb24gaXNXaXRoQ29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5nZXRUaXRsZSgpKTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5hZGRBdHRhY2htZW50Q2xhc3MgPSBmdW5jdGlvbiBhZGRBdHRhY2htZW50Q2xhc3MoYXR0YWNobWVudCkge1xuICAgICAgICAkJCQxKHRoaXMuZ2V0VGlwRWxlbWVudCgpKS5hZGRDbGFzcyhDTEFTU19QUkVGSVggKyBcIi1cIiArIGF0dGFjaG1lbnQpO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLmdldFRpcEVsZW1lbnQgPSBmdW5jdGlvbiBnZXRUaXBFbGVtZW50KCkge1xuICAgICAgICB0aGlzLnRpcCA9IHRoaXMudGlwIHx8ICQkJDEodGhpcy5jb25maWcudGVtcGxhdGUpWzBdO1xuICAgICAgICByZXR1cm4gdGhpcy50aXA7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uc2V0Q29udGVudCA9IGZ1bmN0aW9uIHNldENvbnRlbnQoKSB7XG4gICAgICAgIHZhciB0aXAgPSB0aGlzLmdldFRpcEVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5zZXRFbGVtZW50Q29udGVudCgkJCQxKHRpcC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLlRPT0xUSVBfSU5ORVIpKSwgdGhpcy5nZXRUaXRsZSgpKTtcbiAgICAgICAgJCQkMSh0aXApLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5GQURFICsgXCIgXCIgKyBDbGFzc05hbWUuU0hPVyk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uc2V0RWxlbWVudENvbnRlbnQgPSBmdW5jdGlvbiBzZXRFbGVtZW50Q29udGVudCgkZWxlbWVudCwgY29udGVudCkge1xuICAgICAgICB2YXIgaHRtbCA9IHRoaXMuY29uZmlnLmh0bWw7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnb2JqZWN0JyAmJiAoY29udGVudC5ub2RlVHlwZSB8fCBjb250ZW50LmpxdWVyeSkpIHtcbiAgICAgICAgICAvLyBDb250ZW50IGlzIGEgRE9NIG5vZGUgb3IgYSBqUXVlcnlcbiAgICAgICAgICBpZiAoaHRtbCkge1xuICAgICAgICAgICAgaWYgKCEkJCQxKGNvbnRlbnQpLnBhcmVudCgpLmlzKCRlbGVtZW50KSkge1xuICAgICAgICAgICAgICAkZWxlbWVudC5lbXB0eSgpLmFwcGVuZChjb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGVsZW1lbnQudGV4dCgkJCQxKGNvbnRlbnQpLnRleHQoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRlbGVtZW50W2h0bWwgPyAnaHRtbCcgOiAndGV4dCddKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uZ2V0VGl0bGUgPSBmdW5jdGlvbiBnZXRUaXRsZSgpIHtcbiAgICAgICAgdmFyIHRpdGxlID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1vcmlnaW5hbC10aXRsZScpO1xuXG4gICAgICAgIGlmICghdGl0bGUpIHtcbiAgICAgICAgICB0aXRsZSA9IHR5cGVvZiB0aGlzLmNvbmZpZy50aXRsZSA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuY29uZmlnLnRpdGxlLmNhbGwodGhpcy5lbGVtZW50KSA6IHRoaXMuY29uZmlnLnRpdGxlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRpdGxlO1xuICAgICAgfTsgLy8gUHJpdmF0ZVxuXG5cbiAgICAgIF9wcm90by5fZ2V0QXR0YWNobWVudCA9IGZ1bmN0aW9uIF9nZXRBdHRhY2htZW50KHBsYWNlbWVudCkge1xuICAgICAgICByZXR1cm4gQXR0YWNobWVudE1hcFtwbGFjZW1lbnQudG9VcHBlckNhc2UoKV07XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX3NldExpc3RlbmVycyA9IGZ1bmN0aW9uIF9zZXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgIHZhciB0cmlnZ2VycyA9IHRoaXMuY29uZmlnLnRyaWdnZXIuc3BsaXQoJyAnKTtcbiAgICAgICAgdHJpZ2dlcnMuZm9yRWFjaChmdW5jdGlvbiAodHJpZ2dlcikge1xuICAgICAgICAgIGlmICh0cmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgICAkJCQxKF90aGlzMy5lbGVtZW50KS5vbihfdGhpczMuY29uc3RydWN0b3IuRXZlbnQuQ0xJQ0ssIF90aGlzMy5jb25maWcuc2VsZWN0b3IsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gX3RoaXMzLnRvZ2dsZShldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRyaWdnZXIgIT09IFRyaWdnZXIuTUFOVUFMKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnRJbiA9IHRyaWdnZXIgPT09IFRyaWdnZXIuSE9WRVIgPyBfdGhpczMuY29uc3RydWN0b3IuRXZlbnQuTU9VU0VFTlRFUiA6IF90aGlzMy5jb25zdHJ1Y3Rvci5FdmVudC5GT0NVU0lOO1xuICAgICAgICAgICAgdmFyIGV2ZW50T3V0ID0gdHJpZ2dlciA9PT0gVHJpZ2dlci5IT1ZFUiA/IF90aGlzMy5jb25zdHJ1Y3Rvci5FdmVudC5NT1VTRUxFQVZFIDogX3RoaXMzLmNvbnN0cnVjdG9yLkV2ZW50LkZPQ1VTT1VUO1xuICAgICAgICAgICAgJCQkMShfdGhpczMuZWxlbWVudCkub24oZXZlbnRJbiwgX3RoaXMzLmNvbmZpZy5zZWxlY3RvciwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdGhpczMuX2VudGVyKGV2ZW50KTtcbiAgICAgICAgICAgIH0pLm9uKGV2ZW50T3V0LCBfdGhpczMuY29uZmlnLnNlbGVjdG9yLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMy5fbGVhdmUoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJCQkMShfdGhpczMuZWxlbWVudCkuY2xvc2VzdCgnLm1vZGFsJykub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMzLmhpZGUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNlbGVjdG9yKSB7XG4gICAgICAgICAgdGhpcy5jb25maWcgPSBfb2JqZWN0U3ByZWFkKHt9LCB0aGlzLmNvbmZpZywge1xuICAgICAgICAgICAgdHJpZ2dlcjogJ21hbnVhbCcsXG4gICAgICAgICAgICBzZWxlY3RvcjogJydcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9maXhUaXRsZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2ZpeFRpdGxlID0gZnVuY3Rpb24gX2ZpeFRpdGxlKCkge1xuICAgICAgICB2YXIgdGl0bGVUeXBlID0gdHlwZW9mIHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnKTtcblxuICAgICAgICBpZiAodGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgndGl0bGUnKSB8fCB0aXRsZVR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1vcmlnaW5hbC10aXRsZScsIHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykgfHwgJycpO1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJycpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2VudGVyID0gZnVuY3Rpb24gX2VudGVyKGV2ZW50LCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBkYXRhS2V5ID0gdGhpcy5jb25zdHJ1Y3Rvci5EQVRBX0tFWTtcbiAgICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgJCQkMShldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXkpO1xuXG4gICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgIGNvbnRleHQgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihldmVudC5jdXJyZW50VGFyZ2V0LCB0aGlzLl9nZXREZWxlZ2F0ZUNvbmZpZygpKTtcbiAgICAgICAgICAkJCQxKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSwgY29udGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyW2V2ZW50LnR5cGUgPT09ICdmb2N1c2luJyA/IFRyaWdnZXIuRk9DVVMgOiBUcmlnZ2VyLkhPVkVSXSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJCQkMShjb250ZXh0LmdldFRpcEVsZW1lbnQoKSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpIHx8IGNvbnRleHQuX2hvdmVyU3RhdGUgPT09IEhvdmVyU3RhdGUuU0hPVykge1xuICAgICAgICAgIGNvbnRleHQuX2hvdmVyU3RhdGUgPSBIb3ZlclN0YXRlLlNIT1c7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KGNvbnRleHQuX3RpbWVvdXQpO1xuICAgICAgICBjb250ZXh0Ll9ob3ZlclN0YXRlID0gSG92ZXJTdGF0ZS5TSE9XO1xuXG4gICAgICAgIGlmICghY29udGV4dC5jb25maWcuZGVsYXkgfHwgIWNvbnRleHQuY29uZmlnLmRlbGF5LnNob3cpIHtcbiAgICAgICAgICBjb250ZXh0LnNob3coKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Ll90aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKGNvbnRleHQuX2hvdmVyU3RhdGUgPT09IEhvdmVyU3RhdGUuU0hPVykge1xuICAgICAgICAgICAgY29udGV4dC5zaG93KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBjb250ZXh0LmNvbmZpZy5kZWxheS5zaG93KTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fbGVhdmUgPSBmdW5jdGlvbiBfbGVhdmUoZXZlbnQsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGRhdGFLZXkgPSB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZO1xuICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCAkJCQxKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSk7XG5cbiAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgY29udGV4dCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGV2ZW50LmN1cnJlbnRUYXJnZXQsIHRoaXMuX2dldERlbGVnYXRlQ29uZmlnKCkpO1xuICAgICAgICAgICQkJDEoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YShkYXRhS2V5LCBjb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgIGNvbnRleHQuX2FjdGl2ZVRyaWdnZXJbZXZlbnQudHlwZSA9PT0gJ2ZvY3Vzb3V0JyA/IFRyaWdnZXIuRk9DVVMgOiBUcmlnZ2VyLkhPVkVSXSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQuX2lzV2l0aEFjdGl2ZVRyaWdnZXIoKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyVGltZW91dChjb250ZXh0Ll90aW1lb3V0KTtcbiAgICAgICAgY29udGV4dC5faG92ZXJTdGF0ZSA9IEhvdmVyU3RhdGUuT1VUO1xuXG4gICAgICAgIGlmICghY29udGV4dC5jb25maWcuZGVsYXkgfHwgIWNvbnRleHQuY29uZmlnLmRlbGF5LmhpZGUpIHtcbiAgICAgICAgICBjb250ZXh0LmhpZGUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Ll90aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKGNvbnRleHQuX2hvdmVyU3RhdGUgPT09IEhvdmVyU3RhdGUuT1VUKSB7XG4gICAgICAgICAgICBjb250ZXh0LmhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGNvbnRleHQuY29uZmlnLmRlbGF5LmhpZGUpO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9pc1dpdGhBY3RpdmVUcmlnZ2VyID0gZnVuY3Rpb24gX2lzV2l0aEFjdGl2ZVRyaWdnZXIoKSB7XG4gICAgICAgIGZvciAodmFyIHRyaWdnZXIgaW4gdGhpcy5fYWN0aXZlVHJpZ2dlcikge1xuICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVUcmlnZ2VyW3RyaWdnZXJdKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2dldENvbmZpZyA9IGZ1bmN0aW9uIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZyA9IF9vYmplY3RTcHJlYWQoe30sIHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdCwgJCQkMSh0aGlzLmVsZW1lbnQpLmRhdGEoKSwgdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnID8gY29uZmlnIDoge30pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLmRlbGF5ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGNvbmZpZy5kZWxheSA9IHtcbiAgICAgICAgICAgIHNob3c6IGNvbmZpZy5kZWxheSxcbiAgICAgICAgICAgIGhpZGU6IGNvbmZpZy5kZWxheVxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy50aXRsZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBjb25maWcudGl0bGUgPSBjb25maWcudGl0bGUudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLmNvbnRlbnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgY29uZmlnLmNvbnRlbnQgPSBjb25maWcuY29udGVudC50b1N0cmluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgVXRpbC50eXBlQ2hlY2tDb25maWcoTkFNRSwgY29uZmlnLCB0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHRUeXBlKTtcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZ2V0RGVsZWdhdGVDb25maWcgPSBmdW5jdGlvbiBfZ2V0RGVsZWdhdGVDb25maWcoKSB7XG4gICAgICAgIHZhciBjb25maWcgPSB7fTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcpIHtcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5jb25maWcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHRba2V5XSAhPT0gdGhpcy5jb25maWdba2V5XSkge1xuICAgICAgICAgICAgICBjb25maWdba2V5XSA9IHRoaXMuY29uZmlnW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fY2xlYW5UaXBDbGFzcyA9IGZ1bmN0aW9uIF9jbGVhblRpcENsYXNzKCkge1xuICAgICAgICB2YXIgJHRpcCA9ICQkJDEodGhpcy5nZXRUaXBFbGVtZW50KCkpO1xuICAgICAgICB2YXIgdGFiQ2xhc3MgPSAkdGlwLmF0dHIoJ2NsYXNzJykubWF0Y2goQlNDTFNfUFJFRklYX1JFR0VYKTtcblxuICAgICAgICBpZiAodGFiQ2xhc3MgIT09IG51bGwgJiYgdGFiQ2xhc3MubGVuZ3RoKSB7XG4gICAgICAgICAgJHRpcC5yZW1vdmVDbGFzcyh0YWJDbGFzcy5qb2luKCcnKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5faGFuZGxlUG9wcGVyUGxhY2VtZW50Q2hhbmdlID0gZnVuY3Rpb24gX2hhbmRsZVBvcHBlclBsYWNlbWVudENoYW5nZShwb3BwZXJEYXRhKSB7XG4gICAgICAgIHZhciBwb3BwZXJJbnN0YW5jZSA9IHBvcHBlckRhdGEuaW5zdGFuY2U7XG4gICAgICAgIHRoaXMudGlwID0gcG9wcGVySW5zdGFuY2UucG9wcGVyO1xuXG4gICAgICAgIHRoaXMuX2NsZWFuVGlwQ2xhc3MoKTtcblxuICAgICAgICB0aGlzLmFkZEF0dGFjaG1lbnRDbGFzcyh0aGlzLl9nZXRBdHRhY2htZW50KHBvcHBlckRhdGEucGxhY2VtZW50KSk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2ZpeFRyYW5zaXRpb24gPSBmdW5jdGlvbiBfZml4VHJhbnNpdGlvbigpIHtcbiAgICAgICAgdmFyIHRpcCA9IHRoaXMuZ2V0VGlwRWxlbWVudCgpO1xuICAgICAgICB2YXIgaW5pdENvbmZpZ0FuaW1hdGlvbiA9IHRoaXMuY29uZmlnLmFuaW1hdGlvbjtcblxuICAgICAgICBpZiAodGlwLmdldEF0dHJpYnV0ZSgneC1wbGFjZW1lbnQnKSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICQkJDEodGlwKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuRkFERSk7XG4gICAgICAgIHRoaXMuY29uZmlnLmFuaW1hdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIHRoaXMuY29uZmlnLmFuaW1hdGlvbiA9IGluaXRDb25maWdBbmltYXRpb247XG4gICAgICB9OyAvLyBTdGF0aWNcblxuXG4gICAgICBUb29sdGlwLl9qUXVlcnlJbnRlcmZhY2UgPSBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9ICQkJDEodGhpcykuZGF0YShEQVRBX0tFWSk7XG5cbiAgICAgICAgICB2YXIgX2NvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnICYmIGNvbmZpZztcblxuICAgICAgICAgIGlmICghZGF0YSAmJiAvZGlzcG9zZXxoaWRlLy50ZXN0KGNvbmZpZykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgVG9vbHRpcCh0aGlzLCBfY29uZmlnKTtcbiAgICAgICAgICAgICQkJDEodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk5vIG1ldGhvZCBuYW1lZCBcXFwiXCIgKyBjb25maWcgKyBcIlxcXCJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBfY3JlYXRlQ2xhc3MoVG9vbHRpcCwgbnVsbCwgW3tcbiAgICAgICAga2V5OiBcIlZFUlNJT05cIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIFZFUlNJT047XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiBcIkRlZmF1bHRcIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIERlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiBcIk5BTUVcIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIE5BTUU7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiBcIkRBVEFfS0VZXCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBEQVRBX0tFWTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6IFwiRXZlbnRcIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIEV2ZW50O1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogXCJFVkVOVF9LRVlcIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIEVWRU5UX0tFWTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6IFwiRGVmYXVsdFR5cGVcIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIERlZmF1bHRUeXBlO1xuICAgICAgICB9XG4gICAgICB9XSk7XG5cbiAgICAgIHJldHVybiBUb29sdGlwO1xuICAgIH0oKTtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBqUXVlcnlcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuXG4gICAgJCQkMS5mbltOQU1FXSA9IFRvb2x0aXAuX2pRdWVyeUludGVyZmFjZTtcbiAgICAkJCQxLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gVG9vbHRpcDtcblxuICAgICQkJDEuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICQkJDEuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgICByZXR1cm4gVG9vbHRpcC5falF1ZXJ5SW50ZXJmYWNlO1xuICAgIH07XG5cbiAgICByZXR1cm4gVG9vbHRpcDtcbiAgfSgkLCBQb3BwZXIpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY0LjEuMyk6IHBvcG92ZXIuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIFBvcG92ZXIgPSBmdW5jdGlvbiAoJCQkMSkge1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENvbnN0YW50c1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuICAgIHZhciBOQU1FID0gJ3BvcG92ZXInO1xuICAgIHZhciBWRVJTSU9OID0gJzQuMS4zJztcbiAgICB2YXIgREFUQV9LRVkgPSAnYnMucG9wb3Zlcic7XG4gICAgdmFyIEVWRU5UX0tFWSA9IFwiLlwiICsgREFUQV9LRVk7XG4gICAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQkJDEuZm5bTkFNRV07XG4gICAgdmFyIENMQVNTX1BSRUZJWCA9ICdicy1wb3BvdmVyJztcbiAgICB2YXIgQlNDTFNfUFJFRklYX1JFR0VYID0gbmV3IFJlZ0V4cChcIihefFxcXFxzKVwiICsgQ0xBU1NfUFJFRklYICsgXCJcXFxcUytcIiwgJ2cnKTtcblxuICAgIHZhciBEZWZhdWx0ID0gX29iamVjdFNwcmVhZCh7fSwgVG9vbHRpcC5EZWZhdWx0LCB7XG4gICAgICBwbGFjZW1lbnQ6ICdyaWdodCcsXG4gICAgICB0cmlnZ2VyOiAnY2xpY2snLFxuICAgICAgY29udGVudDogJycsXG4gICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJwb3BvdmVyXCIgcm9sZT1cInRvb2x0aXBcIj4nICsgJzxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PicgKyAnPGgzIGNsYXNzPVwicG9wb3Zlci1oZWFkZXJcIj48L2gzPicgKyAnPGRpdiBjbGFzcz1cInBvcG92ZXItYm9keVwiPjwvZGl2PjwvZGl2PidcbiAgICB9KTtcblxuICAgIHZhciBEZWZhdWx0VHlwZSA9IF9vYmplY3RTcHJlYWQoe30sIFRvb2x0aXAuRGVmYXVsdFR5cGUsIHtcbiAgICAgIGNvbnRlbnQ6ICcoc3RyaW5nfGVsZW1lbnR8ZnVuY3Rpb24pJ1xuICAgIH0pO1xuXG4gICAgdmFyIENsYXNzTmFtZSA9IHtcbiAgICAgIEZBREU6ICdmYWRlJyxcbiAgICAgIFNIT1c6ICdzaG93J1xuICAgIH07XG4gICAgdmFyIFNlbGVjdG9yID0ge1xuICAgICAgVElUTEU6ICcucG9wb3Zlci1oZWFkZXInLFxuICAgICAgQ09OVEVOVDogJy5wb3BvdmVyLWJvZHknXG4gICAgfTtcbiAgICB2YXIgRXZlbnQgPSB7XG4gICAgICBISURFOiBcImhpZGVcIiArIEVWRU5UX0tFWSxcbiAgICAgIEhJRERFTjogXCJoaWRkZW5cIiArIEVWRU5UX0tFWSxcbiAgICAgIFNIT1c6IFwic2hvd1wiICsgRVZFTlRfS0VZLFxuICAgICAgU0hPV046IFwic2hvd25cIiArIEVWRU5UX0tFWSxcbiAgICAgIElOU0VSVEVEOiBcImluc2VydGVkXCIgKyBFVkVOVF9LRVksXG4gICAgICBDTElDSzogXCJjbGlja1wiICsgRVZFTlRfS0VZLFxuICAgICAgRk9DVVNJTjogXCJmb2N1c2luXCIgKyBFVkVOVF9LRVksXG4gICAgICBGT0NVU09VVDogXCJmb2N1c291dFwiICsgRVZFTlRfS0VZLFxuICAgICAgTU9VU0VFTlRFUjogXCJtb3VzZWVudGVyXCIgKyBFVkVOVF9LRVksXG4gICAgICBNT1VTRUxFQVZFOiBcIm1vdXNlbGVhdmVcIiArIEVWRU5UX0tFWVxuICAgICAgLyoqXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqIENsYXNzIERlZmluaXRpb25cbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICovXG5cbiAgICB9O1xuXG4gICAgdmFyIFBvcG92ZXIgPVxuICAgIC8qI19fUFVSRV9fKi9cbiAgICBmdW5jdGlvbiAoX1Rvb2x0aXApIHtcbiAgICAgIF9pbmhlcml0c0xvb3NlKFBvcG92ZXIsIF9Ub29sdGlwKTtcblxuICAgICAgZnVuY3Rpb24gUG9wb3ZlcigpIHtcbiAgICAgICAgcmV0dXJuIF9Ub29sdGlwLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgIH1cblxuICAgICAgdmFyIF9wcm90byA9IFBvcG92ZXIucHJvdG90eXBlO1xuXG4gICAgICAvLyBPdmVycmlkZXNcbiAgICAgIF9wcm90by5pc1dpdGhDb250ZW50ID0gZnVuY3Rpb24gaXNXaXRoQ29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGl0bGUoKSB8fCB0aGlzLl9nZXRDb250ZW50KCk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uYWRkQXR0YWNobWVudENsYXNzID0gZnVuY3Rpb24gYWRkQXR0YWNobWVudENsYXNzKGF0dGFjaG1lbnQpIHtcbiAgICAgICAgJCQkMSh0aGlzLmdldFRpcEVsZW1lbnQoKSkuYWRkQ2xhc3MoQ0xBU1NfUFJFRklYICsgXCItXCIgKyBhdHRhY2htZW50KTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5nZXRUaXBFbGVtZW50ID0gZnVuY3Rpb24gZ2V0VGlwRWxlbWVudCgpIHtcbiAgICAgICAgdGhpcy50aXAgPSB0aGlzLnRpcCB8fCAkJCQxKHRoaXMuY29uZmlnLnRlbXBsYXRlKVswXTtcbiAgICAgICAgcmV0dXJuIHRoaXMudGlwO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLnNldENvbnRlbnQgPSBmdW5jdGlvbiBzZXRDb250ZW50KCkge1xuICAgICAgICB2YXIgJHRpcCA9ICQkJDEodGhpcy5nZXRUaXBFbGVtZW50KCkpOyAvLyBXZSB1c2UgYXBwZW5kIGZvciBodG1sIG9iamVjdHMgdG8gbWFpbnRhaW4ganMgZXZlbnRzXG5cbiAgICAgICAgdGhpcy5zZXRFbGVtZW50Q29udGVudCgkdGlwLmZpbmQoU2VsZWN0b3IuVElUTEUpLCB0aGlzLmdldFRpdGxlKCkpO1xuXG4gICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5fZ2V0Q29udGVudCgpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50LmNhbGwodGhpcy5lbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0RWxlbWVudENvbnRlbnQoJHRpcC5maW5kKFNlbGVjdG9yLkNPTlRFTlQpLCBjb250ZW50KTtcbiAgICAgICAgJHRpcC5yZW1vdmVDbGFzcyhDbGFzc05hbWUuRkFERSArIFwiIFwiICsgQ2xhc3NOYW1lLlNIT1cpO1xuICAgICAgfTsgLy8gUHJpdmF0ZVxuXG5cbiAgICAgIF9wcm90by5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uIF9nZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1jb250ZW50JykgfHwgdGhpcy5jb25maWcuY29udGVudDtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fY2xlYW5UaXBDbGFzcyA9IGZ1bmN0aW9uIF9jbGVhblRpcENsYXNzKCkge1xuICAgICAgICB2YXIgJHRpcCA9ICQkJDEodGhpcy5nZXRUaXBFbGVtZW50KCkpO1xuICAgICAgICB2YXIgdGFiQ2xhc3MgPSAkdGlwLmF0dHIoJ2NsYXNzJykubWF0Y2goQlNDTFNfUFJFRklYX1JFR0VYKTtcblxuICAgICAgICBpZiAodGFiQ2xhc3MgIT09IG51bGwgJiYgdGFiQ2xhc3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICR0aXAucmVtb3ZlQ2xhc3ModGFiQ2xhc3Muam9pbignJykpO1xuICAgICAgICB9XG4gICAgICB9OyAvLyBTdGF0aWNcblxuXG4gICAgICBQb3BvdmVyLl9qUXVlcnlJbnRlcmZhY2UgPSBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9ICQkJDEodGhpcykuZGF0YShEQVRBX0tFWSk7XG5cbiAgICAgICAgICB2YXIgX2NvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnID8gY29uZmlnIDogbnVsbDtcblxuICAgICAgICAgIGlmICghZGF0YSAmJiAvZGVzdHJveXxoaWRlLy50ZXN0KGNvbmZpZykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgUG9wb3Zlcih0aGlzLCBfY29uZmlnKTtcbiAgICAgICAgICAgICQkJDEodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk5vIG1ldGhvZCBuYW1lZCBcXFwiXCIgKyBjb25maWcgKyBcIlxcXCJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBfY3JlYXRlQ2xhc3MoUG9wb3ZlciwgbnVsbCwgW3tcbiAgICAgICAga2V5OiBcIlZFUlNJT05cIixcbiAgICAgICAgLy8gR2V0dGVyc1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6IFwiRGVmYXVsdFwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRGVmYXVsdDtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6IFwiTkFNRVwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gTkFNRTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6IFwiREFUQV9LRVlcIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIERBVEFfS0VZO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogXCJFdmVudFwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRXZlbnQ7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiBcIkVWRU5UX0tFWVwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRVZFTlRfS0VZO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogXCJEZWZhdWx0VHlwZVwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRGVmYXVsdFR5cGU7XG4gICAgICAgIH1cbiAgICAgIH1dKTtcblxuICAgICAgcmV0dXJuIFBvcG92ZXI7XG4gICAgfShUb29sdGlwKTtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBqUXVlcnlcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuXG4gICAgJCQkMS5mbltOQU1FXSA9IFBvcG92ZXIuX2pRdWVyeUludGVyZmFjZTtcbiAgICAkJCQxLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gUG9wb3ZlcjtcblxuICAgICQkJDEuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICQkJDEuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgICByZXR1cm4gUG9wb3Zlci5falF1ZXJ5SW50ZXJmYWNlO1xuICAgIH07XG5cbiAgICByZXR1cm4gUG9wb3ZlcjtcbiAgfSgkKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NC4xLjMpOiBzY3JvbGxzcHkuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIFNjcm9sbFNweSA9IGZ1bmN0aW9uICgkJCQxKSB7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQ29uc3RhbnRzXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG4gICAgdmFyIE5BTUUgPSAnc2Nyb2xsc3B5JztcbiAgICB2YXIgVkVSU0lPTiA9ICc0LjEuMyc7XG4gICAgdmFyIERBVEFfS0VZID0gJ2JzLnNjcm9sbHNweSc7XG4gICAgdmFyIEVWRU5UX0tFWSA9IFwiLlwiICsgREFUQV9LRVk7XG4gICAgdmFyIERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknO1xuICAgIHZhciBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkJCQxLmZuW05BTUVdO1xuICAgIHZhciBEZWZhdWx0ID0ge1xuICAgICAgb2Zmc2V0OiAxMCxcbiAgICAgIG1ldGhvZDogJ2F1dG8nLFxuICAgICAgdGFyZ2V0OiAnJ1xuICAgIH07XG4gICAgdmFyIERlZmF1bHRUeXBlID0ge1xuICAgICAgb2Zmc2V0OiAnbnVtYmVyJyxcbiAgICAgIG1ldGhvZDogJ3N0cmluZycsXG4gICAgICB0YXJnZXQ6ICcoc3RyaW5nfGVsZW1lbnQpJ1xuICAgIH07XG4gICAgdmFyIEV2ZW50ID0ge1xuICAgICAgQUNUSVZBVEU6IFwiYWN0aXZhdGVcIiArIEVWRU5UX0tFWSxcbiAgICAgIFNDUk9MTDogXCJzY3JvbGxcIiArIEVWRU5UX0tFWSxcbiAgICAgIExPQURfREFUQV9BUEk6IFwibG9hZFwiICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZXG4gICAgfTtcbiAgICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgICAgRFJPUERPV05fSVRFTTogJ2Ryb3Bkb3duLWl0ZW0nLFxuICAgICAgRFJPUERPV05fTUVOVTogJ2Ryb3Bkb3duLW1lbnUnLFxuICAgICAgQUNUSVZFOiAnYWN0aXZlJ1xuICAgIH07XG4gICAgdmFyIFNlbGVjdG9yID0ge1xuICAgICAgREFUQV9TUFk6ICdbZGF0YS1zcHk9XCJzY3JvbGxcIl0nLFxuICAgICAgQUNUSVZFOiAnLmFjdGl2ZScsXG4gICAgICBOQVZfTElTVF9HUk9VUDogJy5uYXYsIC5saXN0LWdyb3VwJyxcbiAgICAgIE5BVl9MSU5LUzogJy5uYXYtbGluaycsXG4gICAgICBOQVZfSVRFTVM6ICcubmF2LWl0ZW0nLFxuICAgICAgTElTVF9JVEVNUzogJy5saXN0LWdyb3VwLWl0ZW0nLFxuICAgICAgRFJPUERPV046ICcuZHJvcGRvd24nLFxuICAgICAgRFJPUERPV05fSVRFTVM6ICcuZHJvcGRvd24taXRlbScsXG4gICAgICBEUk9QRE9XTl9UT0dHTEU6ICcuZHJvcGRvd24tdG9nZ2xlJ1xuICAgIH07XG4gICAgdmFyIE9mZnNldE1ldGhvZCA9IHtcbiAgICAgIE9GRlNFVDogJ29mZnNldCcsXG4gICAgICBQT1NJVElPTjogJ3Bvc2l0aW9uJ1xuICAgICAgLyoqXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqIENsYXNzIERlZmluaXRpb25cbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICovXG5cbiAgICB9O1xuXG4gICAgdmFyIFNjcm9sbFNweSA9XG4gICAgLyojX19QVVJFX18qL1xuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIFNjcm9sbFNweShlbGVtZW50LCBjb25maWcpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2Nyb2xsRWxlbWVudCA9IGVsZW1lbnQudGFnTmFtZSA9PT0gJ0JPRFknID8gd2luZG93IDogZWxlbWVudDtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuX3NlbGVjdG9yID0gdGhpcy5fY29uZmlnLnRhcmdldCArIFwiIFwiICsgU2VsZWN0b3IuTkFWX0xJTktTICsgXCIsXCIgKyAodGhpcy5fY29uZmlnLnRhcmdldCArIFwiIFwiICsgU2VsZWN0b3IuTElTVF9JVEVNUyArIFwiLFwiKSArICh0aGlzLl9jb25maWcudGFyZ2V0ICsgXCIgXCIgKyBTZWxlY3Rvci5EUk9QRE9XTl9JVEVNUyk7XG4gICAgICAgIHRoaXMuX29mZnNldHMgPSBbXTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLl9hY3RpdmVUYXJnZXQgPSBudWxsO1xuICAgICAgICB0aGlzLl9zY3JvbGxIZWlnaHQgPSAwO1xuICAgICAgICAkJCQxKHRoaXMuX3Njcm9sbEVsZW1lbnQpLm9uKEV2ZW50LlNDUk9MTCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLl9wcm9jZXNzKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuXG4gICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcbiAgICAgIH0gLy8gR2V0dGVyc1xuXG5cbiAgICAgIHZhciBfcHJvdG8gPSBTY3JvbGxTcHkucHJvdG90eXBlO1xuXG4gICAgICAvLyBQdWJsaWNcbiAgICAgIF9wcm90by5yZWZyZXNoID0gZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGF1dG9NZXRob2QgPSB0aGlzLl9zY3JvbGxFbGVtZW50ID09PSB0aGlzLl9zY3JvbGxFbGVtZW50LndpbmRvdyA/IE9mZnNldE1ldGhvZC5PRkZTRVQgOiBPZmZzZXRNZXRob2QuUE9TSVRJT047XG4gICAgICAgIHZhciBvZmZzZXRNZXRob2QgPSB0aGlzLl9jb25maWcubWV0aG9kID09PSAnYXV0bycgPyBhdXRvTWV0aG9kIDogdGhpcy5fY29uZmlnLm1ldGhvZDtcbiAgICAgICAgdmFyIG9mZnNldEJhc2UgPSBvZmZzZXRNZXRob2QgPT09IE9mZnNldE1ldGhvZC5QT1NJVElPTiA/IHRoaXMuX2dldFNjcm9sbFRvcCgpIDogMDtcbiAgICAgICAgdGhpcy5fb2Zmc2V0cyA9IFtdO1xuICAgICAgICB0aGlzLl90YXJnZXRzID0gW107XG4gICAgICAgIHRoaXMuX3Njcm9sbEhlaWdodCA9IHRoaXMuX2dldFNjcm9sbEhlaWdodCgpO1xuICAgICAgICB2YXIgdGFyZ2V0cyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZWxlY3RvcikpO1xuICAgICAgICB0YXJnZXRzLm1hcChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgIHZhciB0YXJnZXQ7XG4gICAgICAgICAgdmFyIHRhcmdldFNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgICAgICAgaWYgKHRhcmdldFNlbGVjdG9yKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFNlbGVjdG9yKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0QkNSID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0QkNSLndpZHRoIHx8IHRhcmdldEJDUi5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgLy8gVE9ETyAoZmF0KTogcmVtb3ZlIHNrZXRjaCByZWxpYW5jZSBvbiBqUXVlcnkgcG9zaXRpb24vb2Zmc2V0XG4gICAgICAgICAgICAgIHJldHVybiBbJCQkMSh0YXJnZXQpW29mZnNldE1ldGhvZF0oKS50b3AgKyBvZmZzZXRCYXNlLCB0YXJnZXRTZWxlY3Rvcl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIGFbMF0gLSBiWzBdO1xuICAgICAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgX3RoaXMyLl9vZmZzZXRzLnB1c2goaXRlbVswXSk7XG5cbiAgICAgICAgICBfdGhpczIuX3RhcmdldHMucHVzaChpdGVtWzFdKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAgICQkJDEucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG4gICAgICAgICQkJDEodGhpcy5fc2Nyb2xsRWxlbWVudCkub2ZmKEVWRU5UX0tFWSk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9zY3JvbGxFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2VsZWN0b3IgPSBudWxsO1xuICAgICAgICB0aGlzLl9vZmZzZXRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdGFyZ2V0cyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Njcm9sbEhlaWdodCA9IG51bGw7XG4gICAgICB9OyAvLyBQcml2YXRlXG5cblxuICAgICAgX3Byb3RvLl9nZXRDb25maWcgPSBmdW5jdGlvbiBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgICBjb25maWcgPSBfb2JqZWN0U3ByZWFkKHt9LCBEZWZhdWx0LCB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWcgPyBjb25maWcgOiB7fSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcudGFyZ2V0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHZhciBpZCA9ICQkJDEoY29uZmlnLnRhcmdldCkuYXR0cignaWQnKTtcblxuICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgIGlkID0gVXRpbC5nZXRVSUQoTkFNRSk7XG4gICAgICAgICAgICAkJCQxKGNvbmZpZy50YXJnZXQpLmF0dHIoJ2lkJywgaWQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbmZpZy50YXJnZXQgPSBcIiNcIiArIGlkO1xuICAgICAgICB9XG5cbiAgICAgICAgVXRpbC50eXBlQ2hlY2tDb25maWcoTkFNRSwgY29uZmlnLCBEZWZhdWx0VHlwZSk7XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2dldFNjcm9sbFRvcCA9IGZ1bmN0aW9uIF9nZXRTY3JvbGxUb3AoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxFbGVtZW50ID09PSB3aW5kb3cgPyB0aGlzLl9zY3JvbGxFbGVtZW50LnBhZ2VZT2Zmc2V0IDogdGhpcy5fc2Nyb2xsRWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2dldFNjcm9sbEhlaWdodCA9IGZ1bmN0aW9uIF9nZXRTY3JvbGxIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxFbGVtZW50LnNjcm9sbEhlaWdodCB8fCBNYXRoLm1heChkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2dldE9mZnNldEhlaWdodCA9IGZ1bmN0aW9uIF9nZXRPZmZzZXRIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxFbGVtZW50ID09PSB3aW5kb3cgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiB0aGlzLl9zY3JvbGxFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fcHJvY2VzcyA9IGZ1bmN0aW9uIF9wcm9jZXNzKCkge1xuICAgICAgICB2YXIgc2Nyb2xsVG9wID0gdGhpcy5fZ2V0U2Nyb2xsVG9wKCkgKyB0aGlzLl9jb25maWcub2Zmc2V0O1xuXG4gICAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSB0aGlzLl9nZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgICAgICB2YXIgbWF4U2Nyb2xsID0gdGhpcy5fY29uZmlnLm9mZnNldCArIHNjcm9sbEhlaWdodCAtIHRoaXMuX2dldE9mZnNldEhlaWdodCgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9zY3JvbGxIZWlnaHQgIT09IHNjcm9sbEhlaWdodCkge1xuICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjcm9sbFRvcCA+PSBtYXhTY3JvbGwpIHtcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fdGFyZ2V0c1t0aGlzLl90YXJnZXRzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVRhcmdldCAhPT0gdGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9hY3RpdmF0ZSh0YXJnZXQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVUYXJnZXQgJiYgc2Nyb2xsVG9wIDwgdGhpcy5fb2Zmc2V0c1swXSAmJiB0aGlzLl9vZmZzZXRzWzBdID4gMCkge1xuICAgICAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCA9IG51bGw7XG5cbiAgICAgICAgICB0aGlzLl9jbGVhcigpO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9mZnNldExlbmd0aCA9IHRoaXMuX29mZnNldHMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSBvZmZzZXRMZW5ndGg7IGktLTspIHtcbiAgICAgICAgICB2YXIgaXNBY3RpdmVUYXJnZXQgPSB0aGlzLl9hY3RpdmVUYXJnZXQgIT09IHRoaXMuX3RhcmdldHNbaV0gJiYgc2Nyb2xsVG9wID49IHRoaXMuX29mZnNldHNbaV0gJiYgKHR5cGVvZiB0aGlzLl9vZmZzZXRzW2kgKyAxXSA9PT0gJ3VuZGVmaW5lZCcgfHwgc2Nyb2xsVG9wIDwgdGhpcy5fb2Zmc2V0c1tpICsgMV0pO1xuXG4gICAgICAgICAgaWYgKGlzQWN0aXZlVGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9hY3RpdmF0ZSh0aGlzLl90YXJnZXRzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fYWN0aXZhdGUgPSBmdW5jdGlvbiBfYWN0aXZhdGUodGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCA9IHRhcmdldDtcblxuICAgICAgICB0aGlzLl9jbGVhcigpO1xuXG4gICAgICAgIHZhciBxdWVyaWVzID0gdGhpcy5fc2VsZWN0b3Iuc3BsaXQoJywnKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGFycm93LWJvZHktc3R5bGVcblxuXG4gICAgICAgIHF1ZXJpZXMgPSBxdWVyaWVzLm1hcChmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZWN0b3IgKyBcIltkYXRhLXRhcmdldD1cXFwiXCIgKyB0YXJnZXQgKyBcIlxcXCJdLFwiICsgKHNlbGVjdG9yICsgXCJbaHJlZj1cXFwiXCIgKyB0YXJnZXQgKyBcIlxcXCJdXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyICRsaW5rID0gJCQkMShbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcmllcy5qb2luKCcsJykpKSk7XG5cbiAgICAgICAgaWYgKCRsaW5rLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QRE9XTl9JVEVNKSkge1xuICAgICAgICAgICRsaW5rLmNsb3Nlc3QoU2VsZWN0b3IuRFJPUERPV04pLmZpbmQoU2VsZWN0b3IuRFJPUERPV05fVE9HR0xFKS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgICAkbGluay5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTZXQgdHJpZ2dlcmVkIGxpbmsgYXMgYWN0aXZlXG4gICAgICAgICAgJGxpbmsuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7IC8vIFNldCB0cmlnZ2VyZWQgbGlua3MgcGFyZW50cyBhcyBhY3RpdmVcbiAgICAgICAgICAvLyBXaXRoIGJvdGggPHVsPiBhbmQgPG5hdj4gbWFya3VwIGEgcGFyZW50IGlzIHRoZSBwcmV2aW91cyBzaWJsaW5nIG9mIGFueSBuYXYgYW5jZXN0b3JcblxuICAgICAgICAgICRsaW5rLnBhcmVudHMoU2VsZWN0b3IuTkFWX0xJU1RfR1JPVVApLnByZXYoU2VsZWN0b3IuTkFWX0xJTktTICsgXCIsIFwiICsgU2VsZWN0b3IuTElTVF9JVEVNUykuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7IC8vIEhhbmRsZSBzcGVjaWFsIGNhc2Ugd2hlbiAubmF2LWxpbmsgaXMgaW5zaWRlIC5uYXYtaXRlbVxuXG4gICAgICAgICAgJGxpbmsucGFyZW50cyhTZWxlY3Rvci5OQVZfTElTVF9HUk9VUCkucHJldihTZWxlY3Rvci5OQVZfSVRFTVMpLmNoaWxkcmVuKFNlbGVjdG9yLk5BVl9MSU5LUykuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgIH1cblxuICAgICAgICAkJCQxKHRoaXMuX3Njcm9sbEVsZW1lbnQpLnRyaWdnZXIoRXZlbnQuQUNUSVZBVEUsIHtcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0OiB0YXJnZXRcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2NsZWFyID0gZnVuY3Rpb24gX2NsZWFyKCkge1xuICAgICAgICB2YXIgbm9kZXMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fc2VsZWN0b3IpKTtcbiAgICAgICAgJCQkMShub2RlcykuZmlsdGVyKFNlbGVjdG9yLkFDVElWRSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICB9OyAvLyBTdGF0aWNcblxuXG4gICAgICBTY3JvbGxTcHkuX2pRdWVyeUludGVyZmFjZSA9IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBkYXRhID0gJCQkMSh0aGlzKS5kYXRhKERBVEFfS0VZKTtcblxuICAgICAgICAgIHZhciBfY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnO1xuXG4gICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICBkYXRhID0gbmV3IFNjcm9sbFNweSh0aGlzLCBfY29uZmlnKTtcbiAgICAgICAgICAgICQkJDEodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk5vIG1ldGhvZCBuYW1lZCBcXFwiXCIgKyBjb25maWcgKyBcIlxcXCJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBfY3JlYXRlQ2xhc3MoU2Nyb2xsU3B5LCBudWxsLCBbe1xuICAgICAgICBrZXk6IFwiVkVSU0lPTlwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6IFwiRGVmYXVsdFwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRGVmYXVsdDtcbiAgICAgICAgfVxuICAgICAgfV0pO1xuXG4gICAgICByZXR1cm4gU2Nyb2xsU3B5O1xuICAgIH0oKTtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG5cbiAgICAkJCQxKHdpbmRvdykub24oRXZlbnQuTE9BRF9EQVRBX0FQSSwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNjcm9sbFNweXMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuREFUQV9TUFkpKTtcbiAgICAgIHZhciBzY3JvbGxTcHlzTGVuZ3RoID0gc2Nyb2xsU3B5cy5sZW5ndGg7XG5cbiAgICAgIGZvciAodmFyIGkgPSBzY3JvbGxTcHlzTGVuZ3RoOyBpLS07KSB7XG4gICAgICAgIHZhciAkc3B5ID0gJCQkMShzY3JvbGxTcHlzW2ldKTtcblxuICAgICAgICBTY3JvbGxTcHkuX2pRdWVyeUludGVyZmFjZS5jYWxsKCRzcHksICRzcHkuZGF0YSgpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBqUXVlcnlcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgICQkJDEuZm5bTkFNRV0gPSBTY3JvbGxTcHkuX2pRdWVyeUludGVyZmFjZTtcbiAgICAkJCQxLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gU2Nyb2xsU3B5O1xuXG4gICAgJCQkMS5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgJCQkMS5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICAgIHJldHVybiBTY3JvbGxTcHkuX2pRdWVyeUludGVyZmFjZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNjcm9sbFNweTtcbiAgfSgkKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NC4xLjMpOiB0YWIuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIFRhYiA9IGZ1bmN0aW9uICgkJCQxKSB7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQ29uc3RhbnRzXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG4gICAgdmFyIE5BTUUgPSAndGFiJztcbiAgICB2YXIgVkVSU0lPTiA9ICc0LjEuMyc7XG4gICAgdmFyIERBVEFfS0VZID0gJ2JzLnRhYic7XG4gICAgdmFyIEVWRU5UX0tFWSA9IFwiLlwiICsgREFUQV9LRVk7XG4gICAgdmFyIERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknO1xuICAgIHZhciBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkJCQxLmZuW05BTUVdO1xuICAgIHZhciBFdmVudCA9IHtcbiAgICAgIEhJREU6IFwiaGlkZVwiICsgRVZFTlRfS0VZLFxuICAgICAgSElEREVOOiBcImhpZGRlblwiICsgRVZFTlRfS0VZLFxuICAgICAgU0hPVzogXCJzaG93XCIgKyBFVkVOVF9LRVksXG4gICAgICBTSE9XTjogXCJzaG93blwiICsgRVZFTlRfS0VZLFxuICAgICAgQ0xJQ0tfREFUQV9BUEk6IFwiY2xpY2tcIiArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWVxuICAgIH07XG4gICAgdmFyIENsYXNzTmFtZSA9IHtcbiAgICAgIERST1BET1dOX01FTlU6ICdkcm9wZG93bi1tZW51JyxcbiAgICAgIEFDVElWRTogJ2FjdGl2ZScsXG4gICAgICBESVNBQkxFRDogJ2Rpc2FibGVkJyxcbiAgICAgIEZBREU6ICdmYWRlJyxcbiAgICAgIFNIT1c6ICdzaG93J1xuICAgIH07XG4gICAgdmFyIFNlbGVjdG9yID0ge1xuICAgICAgRFJPUERPV046ICcuZHJvcGRvd24nLFxuICAgICAgTkFWX0xJU1RfR1JPVVA6ICcubmF2LCAubGlzdC1ncm91cCcsXG4gICAgICBBQ1RJVkU6ICcuYWN0aXZlJyxcbiAgICAgIEFDVElWRV9VTDogJz4gbGkgPiAuYWN0aXZlJyxcbiAgICAgIERBVEFfVE9HR0xFOiAnW2RhdGEtdG9nZ2xlPVwidGFiXCJdLCBbZGF0YS10b2dnbGU9XCJwaWxsXCJdLCBbZGF0YS10b2dnbGU9XCJsaXN0XCJdJyxcbiAgICAgIERST1BET1dOX1RPR0dMRTogJy5kcm9wZG93bi10b2dnbGUnLFxuICAgICAgRFJPUERPV05fQUNUSVZFX0NISUxEOiAnPiAuZHJvcGRvd24tbWVudSAuYWN0aXZlJ1xuICAgICAgLyoqXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqIENsYXNzIERlZmluaXRpb25cbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICovXG5cbiAgICB9O1xuXG4gICAgdmFyIFRhYiA9XG4gICAgLyojX19QVVJFX18qL1xuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIFRhYihlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgfSAvLyBHZXR0ZXJzXG5cblxuICAgICAgdmFyIF9wcm90byA9IFRhYi5wcm90b3R5cGU7XG5cbiAgICAgIC8vIFB1YmxpY1xuICAgICAgX3Byb3RvLnNob3cgPSBmdW5jdGlvbiBzaG93KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUgJiYgdGhpcy5fZWxlbWVudC5wYXJlbnROb2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiAkJCQxKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5BQ1RJVkUpIHx8ICQkJDEodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkRJU0FCTEVEKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0YXJnZXQ7XG4gICAgICAgIHZhciBwcmV2aW91cztcbiAgICAgICAgdmFyIGxpc3RFbGVtZW50ID0gJCQkMSh0aGlzLl9lbGVtZW50KS5jbG9zZXN0KFNlbGVjdG9yLk5BVl9MSVNUX0dST1VQKVswXTtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpO1xuXG4gICAgICAgIGlmIChsaXN0RWxlbWVudCkge1xuICAgICAgICAgIHZhciBpdGVtU2VsZWN0b3IgPSBsaXN0RWxlbWVudC5ub2RlTmFtZSA9PT0gJ1VMJyA/IFNlbGVjdG9yLkFDVElWRV9VTCA6IFNlbGVjdG9yLkFDVElWRTtcbiAgICAgICAgICBwcmV2aW91cyA9ICQkJDEubWFrZUFycmF5KCQkJDEobGlzdEVsZW1lbnQpLmZpbmQoaXRlbVNlbGVjdG9yKSk7XG4gICAgICAgICAgcHJldmlvdXMgPSBwcmV2aW91c1twcmV2aW91cy5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoaWRlRXZlbnQgPSAkJCQxLkV2ZW50KEV2ZW50LkhJREUsIHtcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzLl9lbGVtZW50XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2hvd0V2ZW50ID0gJCQkMS5FdmVudChFdmVudC5TSE9XLCB7XG4gICAgICAgICAgcmVsYXRlZFRhcmdldDogcHJldmlvdXNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzKSB7XG4gICAgICAgICAgJCQkMShwcmV2aW91cykudHJpZ2dlcihoaWRlRXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNob3dFdmVudCk7XG5cbiAgICAgICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCBoaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2FjdGl2YXRlKHRoaXMuX2VsZW1lbnQsIGxpc3RFbGVtZW50KTtcblxuICAgICAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgICB2YXIgaGlkZGVuRXZlbnQgPSAkJCQxLkV2ZW50KEV2ZW50LkhJRERFTiwge1xuICAgICAgICAgICAgcmVsYXRlZFRhcmdldDogX3RoaXMuX2VsZW1lbnRcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YXIgc2hvd25FdmVudCA9ICQkJDEuRXZlbnQoRXZlbnQuU0hPV04sIHtcbiAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHByZXZpb3VzXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJCQkMShwcmV2aW91cykudHJpZ2dlcihoaWRkZW5FdmVudCk7XG4gICAgICAgICAgJCQkMShfdGhpcy5fZWxlbWVudCkudHJpZ2dlcihzaG93bkV2ZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgdGhpcy5fYWN0aXZhdGUodGFyZ2V0LCB0YXJnZXQucGFyZW50Tm9kZSwgY29tcGxldGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICAgJCQkMS5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICB9OyAvLyBQcml2YXRlXG5cblxuICAgICAgX3Byb3RvLl9hY3RpdmF0ZSA9IGZ1bmN0aW9uIF9hY3RpdmF0ZShlbGVtZW50LCBjb250YWluZXIsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIHZhciBhY3RpdmVFbGVtZW50cztcblxuICAgICAgICBpZiAoY29udGFpbmVyLm5vZGVOYW1lID09PSAnVUwnKSB7XG4gICAgICAgICAgYWN0aXZlRWxlbWVudHMgPSAkJCQxKGNvbnRhaW5lcikuZmluZChTZWxlY3Rvci5BQ1RJVkVfVUwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjdGl2ZUVsZW1lbnRzID0gJCQkMShjb250YWluZXIpLmNoaWxkcmVuKFNlbGVjdG9yLkFDVElWRSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWN0aXZlID0gYWN0aXZlRWxlbWVudHNbMF07XG4gICAgICAgIHZhciBpc1RyYW5zaXRpb25pbmcgPSBjYWxsYmFjayAmJiBhY3RpdmUgJiYgJCQkMShhY3RpdmUpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKTtcblxuICAgICAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMyLl90cmFuc2l0aW9uQ29tcGxldGUoZWxlbWVudCwgYWN0aXZlLCBjYWxsYmFjayk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGFjdGl2ZSAmJiBpc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgICAgICB2YXIgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudChhY3RpdmUpO1xuICAgICAgICAgICQkJDEoYWN0aXZlKS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY29tcGxldGUpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl90cmFuc2l0aW9uQ29tcGxldGUgPSBmdW5jdGlvbiBfdHJhbnNpdGlvbkNvbXBsZXRlKGVsZW1lbnQsIGFjdGl2ZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICQkJDEoYWN0aXZlKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVyArIFwiIFwiICsgQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgICAgdmFyIGRyb3Bkb3duQ2hpbGQgPSAkJCQxKGFjdGl2ZS5wYXJlbnROb2RlKS5maW5kKFNlbGVjdG9yLkRST1BET1dOX0FDVElWRV9DSElMRClbMF07XG5cbiAgICAgICAgICBpZiAoZHJvcGRvd25DaGlsZCkge1xuICAgICAgICAgICAgJCQkMShkcm9wZG93bkNoaWxkKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYWN0aXZlLmdldEF0dHJpYnV0ZSgncm9sZScpID09PSAndGFiJykge1xuICAgICAgICAgICAgYWN0aXZlLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkJCQxKGVsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuXG4gICAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpID09PSAndGFiJykge1xuICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBVdGlsLnJlZmxvdyhlbGVtZW50KTtcbiAgICAgICAgJCQkMShlbGVtZW50KS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQucGFyZW50Tm9kZSAmJiAkJCQxKGVsZW1lbnQucGFyZW50Tm9kZSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkRST1BET1dOX01FTlUpKSB7XG4gICAgICAgICAgdmFyIGRyb3Bkb3duRWxlbWVudCA9ICQkJDEoZWxlbWVudCkuY2xvc2VzdChTZWxlY3Rvci5EUk9QRE9XTilbMF07XG5cbiAgICAgICAgICBpZiAoZHJvcGRvd25FbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgZHJvcGRvd25Ub2dnbGVMaXN0ID0gW10uc2xpY2UuY2FsbChkcm9wZG93bkVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5EUk9QRE9XTl9UT0dHTEUpKTtcbiAgICAgICAgICAgICQkJDEoZHJvcGRvd25Ub2dnbGVMaXN0KS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfTsgLy8gU3RhdGljXG5cblxuICAgICAgVGFiLl9qUXVlcnlJbnRlcmZhY2UgPSBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgJHRoaXMgPSAkJCQxKHRoaXMpO1xuICAgICAgICAgIHZhciBkYXRhID0gJHRoaXMuZGF0YShEQVRBX0tFWSk7XG5cbiAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgVGFiKHRoaXMpO1xuICAgICAgICAgICAgJHRoaXMuZGF0YShEQVRBX0tFWSwgZGF0YSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk5vIG1ldGhvZCBuYW1lZCBcXFwiXCIgKyBjb25maWcgKyBcIlxcXCJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBfY3JlYXRlQ2xhc3MoVGFiLCBudWxsLCBbe1xuICAgICAgICBrZXk6IFwiVkVSU0lPTlwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgICAgfVxuICAgICAgfV0pO1xuXG4gICAgICByZXR1cm4gVGFiO1xuICAgIH0oKTtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG5cbiAgICAkJCQxKGRvY3VtZW50KS5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgVGFiLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkJCQxKHRoaXMpLCAnc2hvdycpO1xuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIGpRdWVyeVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgJCQkMS5mbltOQU1FXSA9IFRhYi5falF1ZXJ5SW50ZXJmYWNlO1xuICAgICQkJDEuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBUYWI7XG5cbiAgICAkJCQxLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkJCQxLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUO1xuICAgICAgcmV0dXJuIFRhYi5falF1ZXJ5SW50ZXJmYWNlO1xuICAgIH07XG5cbiAgICByZXR1cm4gVGFiO1xuICB9KCQpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY0LjEuMyk6IGluZGV4LmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIChmdW5jdGlvbiAoJCQkMSkge1xuICAgIGlmICh0eXBlb2YgJCQkMSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBqUXVlcnkuIGpRdWVyeSBtdXN0IGJlIGluY2x1ZGVkIGJlZm9yZSBCb290c3RyYXBcXCdzIEphdmFTY3JpcHQuJyk7XG4gICAgfVxuXG4gICAgdmFyIHZlcnNpb24gPSAkJCQxLmZuLmpxdWVyeS5zcGxpdCgnICcpWzBdLnNwbGl0KCcuJyk7XG4gICAgdmFyIG1pbk1ham9yID0gMTtcbiAgICB2YXIgbHRNYWpvciA9IDI7XG4gICAgdmFyIG1pbk1pbm9yID0gOTtcbiAgICB2YXIgbWluUGF0Y2ggPSAxO1xuICAgIHZhciBtYXhNYWpvciA9IDQ7XG5cbiAgICBpZiAodmVyc2lvblswXSA8IGx0TWFqb3IgJiYgdmVyc2lvblsxXSA8IG1pbk1pbm9yIHx8IHZlcnNpb25bMF0gPT09IG1pbk1ham9yICYmIHZlcnNpb25bMV0gPT09IG1pbk1pbm9yICYmIHZlcnNpb25bMl0gPCBtaW5QYXRjaCB8fCB2ZXJzaW9uWzBdID49IG1heE1ham9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBhdCBsZWFzdCBqUXVlcnkgdjEuOS4xIGJ1dCBsZXNzIHRoYW4gdjQuMC4wJyk7XG4gICAgfVxuICB9KSgkKTtcblxuICBleHBvcnRzLlV0aWwgPSBVdGlsO1xuICBleHBvcnRzLkFsZXJ0ID0gQWxlcnQ7XG4gIGV4cG9ydHMuQnV0dG9uID0gQnV0dG9uO1xuICBleHBvcnRzLkNhcm91c2VsID0gQ2Fyb3VzZWw7XG4gIGV4cG9ydHMuQ29sbGFwc2UgPSBDb2xsYXBzZTtcbiAgZXhwb3J0cy5Ecm9wZG93biA9IERyb3Bkb3duO1xuICBleHBvcnRzLk1vZGFsID0gTW9kYWw7XG4gIGV4cG9ydHMuUG9wb3ZlciA9IFBvcG92ZXI7XG4gIGV4cG9ydHMuU2Nyb2xsc3B5ID0gU2Nyb2xsU3B5O1xuICBleHBvcnRzLlRhYiA9IFRhYjtcbiAgZXhwb3J0cy5Ub29sdGlwID0gVG9vbHRpcDtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym9vdHN0cmFwLmpzLm1hcFxuIiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi9jc3MtbG9hZGVyL2xpYi91cmwvZXNjYXBlLmpzXCIpO1xuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5nZW9jb2Rlci1jb250cm9sLWlucHV0e3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDtiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLWltYWdlOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9pbWcvc2VhcmNoLnBuZ1wiKSkgKyBcIik7YmFja2dyb3VuZC1zaXplOjI2cHg7Ym9yZGVyOm5vbmU7cGFkZGluZzowO3RleHQtaW5kZW50OjZweDtmb250LXNpemU6MTNweDtsaW5lLWhlaWdodDpub3JtYWw7aGVpZ2h0OmF1dG87cGFkZGluZy10b3A6NXB4O3BhZGRpbmctYm90dG9tOjVweDt3aWR0aDoxMDAlO2JhY2tncm91bmQtcG9zaXRpb246cmlnaHQgY2VudGVyO2N1cnNvcjpwb2ludGVyO2JveC1zaXppbmc6Ym9yZGVyLWJveH0uZ2VvY29kZXItY29udHJvbC1pbnB1dC1kaXNhYmxlZHtiYWNrZ3JvdW5kLWNvbG9yOiNmNGY0ZjQ7YmFja2dyb3VuZC1pbWFnZTp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4vaW1nL3NlYXJjaC1kaXNhYmxlZC5wbmdcIikpICsgXCIpfS5nZW9jb2Rlci1jb250cm9se3dpZHRoOjI2cHg7aGVpZ2h0OjI2cHg7LXdlYmtpdC10cmFuc2l0aW9uOndpZHRoIC4xNzVzIGVhc2UtaW47LW1vei10cmFuc2l0aW9uOndpZHRoIC4xNzVzIGVhc2UtaW47LW1zLXRyYW5zaXRpb246d2lkdGggLjE3NXMgZWFzZS1pbjstby10cmFuc2l0aW9uOndpZHRoIC4xNzVzIGVhc2UtaW47dHJhbnNpdGlvbjp3aWR0aCAuMTc1cyBlYXNlLWlufS5nZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkLC5sZWFmbGV0LXRvdWNoIC5nZW9jb2Rlci1jb250cm9sLWV4cGFuZGVke3dpZHRoOjI3NXB4fS5nZW9jb2Rlci1jb250cm9sLWlucHV0Lmdlb2NvZGVyLWNvbnRyb2wtbG9hZGluZ3tiYWNrZ3JvdW5kLWltYWdlOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9pbWcvbG9hZGluZy5naWZcIikpICsgXCIpO2JhY2tncm91bmQtc2l6ZToyNnB4fUBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpbzogMiksIG9ubHkgc2NyZWVuIGFuZCAoLW8tbWluLWRldmljZS1waXhlbC1yYXRpbzogMiAvIDEpLCBvbmx5IHNjcmVlbiBhbmQgKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMiksIG9ubHkgc2NyZWVuIGFuZCAobWluLWRldmljZS1waXhlbC1yYXRpbzogMil7Lmdlb2NvZGVyLWNvbnRyb2wtaW5wdXR7YmFja2dyb3VuZC1pbWFnZTp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4vaW1nL3NlYXJjaEAyeC5wbmdcIikpICsgXCIpfS5nZW9jb2Rlci1jb250cm9sLWlucHV0LWRpc2FibGVke2JhY2tncm91bmQtaW1hZ2U6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuL2ltZy9zZWFyY2hAMngtZGlzYWJsZWQucG5nXCIpKSArIFwiKX0uZ2VvY29kZXItY29udHJvbC1pbnB1dC5nZW9jb2Rlci1jb250cm9sLWxvYWRpbmd7YmFja2dyb3VuZC1pbWFnZTp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4vaW1nL2xvYWRpbmdAMnguZ2lmXCIpKSArIFwiKX19Lmdlb2NvZGVyLWNvbnRyb2wtaW5wdXQ6Zm9jdXN7b3V0bGluZTpub25lO2N1cnNvcjp0ZXh0fS5nZW9jb2Rlci1jb250cm9sLWlucHV0OjotbXMtY2xlYXJ7ZGlzcGxheTpub25lfS5nZW9jb2Rlci1jb250cm9sLXN1Z2dlc3Rpb25ze3dpZHRoOjEwMCU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjI2cHg7bGVmdDowO21hcmdpbi10b3A6MTBweDtvdmVyZmxvdzphdXRvO2Rpc3BsYXk6bm9uZX0uZ2VvY29kZXItY29udHJvbC1saXN0Ky5nZW9jb2Rlci1jb250cm9sLWhlYWRlcntib3JkZXItdG9wOjFweCBzb2xpZCAjZDVkNWQ1fS5nZW9jb2Rlci1jb250cm9sLWhlYWRlcntmb250LXNpemU6MTBweDtmb250LXdlaWdodDo3MDA7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOjAuMDVlbTtjb2xvcjojNDQ0O2JhY2tncm91bmQ6I0YyRjJGMjtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZDVkNWQ1O2Rpc3BsYXk6YmxvY2s7cGFkZGluZzouNWVtfS5nZW9jb2Rlci1jb250cm9sLWxpc3R7bGlzdC1zdHlsZTpub25lO21hcmdpbjowO3BhZGRpbmc6MH0uZ2VvY29kZXItY29udHJvbC1zdWdnZXN0aW9ucyAuZ2VvY29kZXItY29udHJvbC1zdWdnZXN0aW9ue2ZvbnQtc2l6ZToxM3B4O3BhZGRpbmc6N3B4O2JhY2tncm91bmQ6d2hpdGU7Ym9yZGVyLXRvcDoxcHggc29saWQgI2YxZjFmMTt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7Y3Vyc29yOnBvaW50ZXJ9Lmdlb2NvZGVyLWNvbnRyb2wtc3VnZ2VzdGlvbnMgLmdlb2NvZGVyLWNvbnRyb2wtc3VnZ2VzdGlvbjpmaXJzdC1jaGlsZHtib3JkZXI6bm9uZX0uZ2VvY29kZXItY29udHJvbC1zdWdnZXN0aW9ucyAuZ2VvY29kZXItY29udHJvbC1zdWdnZXN0aW9uLmdlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQsLmdlb2NvZGVyLWNvbnRyb2wtc3VnZ2VzdGlvbnMgLmdlb2NvZGVyLWNvbnRyb2wtc3VnZ2VzdGlvbjpob3ZlcntiYWNrZ3JvdW5kOiM3RkRGRkY7Ym9yZGVyLWNvbG9yOiM3RkRGRkZ9LmxlYWZsZXQtcmlnaHQgLmdlb2NvZGVyLWNvbnRyb2wtc3VnZ2VzdGlvbnN7bGVmdDphdXRvO3JpZ2h0OjB9LmxlYWZsZXQtcmlnaHQgLmdlb2NvZGVyLWNvbnRyb2wtaW5wdXR7bGVmdDphdXRvO3JpZ2h0OjB9LmxlYWZsZXQtdG91Y2ggLmdlb2NvZGVyLWNvbnRyb2x7d2lkdGg6MzRweH0ubGVhZmxldC10b3VjaCAuZ2VvY29kZXItY29udHJvbC5nZW9jb2Rlci1jb250cm9sLWV4cGFuZGVke3dpZHRoOjI3NXB4fS5sZWFmbGV0LXRvdWNoIC5nZW9jb2Rlci1jb250cm9sLWlucHV0e2hlaWdodDozNHB4O2xpbmUtaGVpZ2h0OjMwcHg7YmFja2dyb3VuZC1zaXplOjMwcHh9LmxlYWZsZXQtdG91Y2ggLmdlb2NvZGVyLWNvbnRyb2wtc3VnZ2VzdGlvbnN7dG9wOjMwcHg7d2lkdGg6MjcxcHh9LmxlYWZsZXQtb2xkaWUgLmdlb2NvZGVyLWNvbnRyb2wtaW5wdXR7d2lkdGg6MjhweDtoZWlnaHQ6MjhweH0ubGVhZmxldC1vbGRpZSAuZ2VvY29kZXItY29udHJvbC1leHBhbmRlZCAuZ2VvY29kZXItY29udHJvbC1pbnB1dHt3aWR0aDphdXRvfS5sZWFmbGV0LW9sZGllIC5nZW9jb2Rlci1jb250cm9sLWlucHV0LC5sZWFmbGV0LW9sZGllIC5nZW9jb2Rlci1jb250cm9sLXN1Z2dlc3Rpb25ze2JvcmRlcjoxcHggc29saWQgIzk5OX1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJ2YXIgZXNjYXBlID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanNcIik7XG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmxlYWZsZXQtZHJhdy1zZWN0aW9ue3Bvc2l0aW9uOnJlbGF0aXZlfS5sZWFmbGV0LWRyYXctdG9vbGJhcnttYXJnaW4tdG9wOjEycHh9LmxlYWZsZXQtZHJhdy10b29sYmFyLXRvcHttYXJnaW4tdG9wOjB9LmxlYWZsZXQtZHJhdy10b29sYmFyLW5vdG9wIGE6Zmlyc3QtY2hpbGR7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6MH0ubGVhZmxldC1kcmF3LXRvb2xiYXItbm9ib3R0b20gYTpsYXN0LWNoaWxke2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjB9LmxlYWZsZXQtZHJhdy10b29sYmFyIGF7YmFja2dyb3VuZC1pbWFnZTp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4vaW1hZ2VzL3Nwcml0ZXNoZWV0LnBuZ1wiKSkgKyBcIik7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQodHJhbnNwYXJlbnQsdHJhbnNwYXJlbnQpLHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9pbWFnZXMvc3ByaXRlc2hlZXQuc3ZnXCIpKSArIFwiKTtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1zaXplOjMwMHB4IDMwcHg7YmFja2dyb3VuZC1jbGlwOnBhZGRpbmctYm94fS5sZWFmbGV0LXJldGluYSAubGVhZmxldC1kcmF3LXRvb2xiYXIgYXtiYWNrZ3JvdW5kLWltYWdlOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9pbWFnZXMvc3ByaXRlc2hlZXQtMngucG5nXCIpKSArIFwiKTtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCh0cmFuc3BhcmVudCx0cmFuc3BhcmVudCksdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuL2ltYWdlcy9zcHJpdGVzaGVldC5zdmdcIikpICsgXCIpfVxcbi5sZWFmbGV0LWRyYXcgYXtkaXNwbGF5OmJsb2NrO3RleHQtYWxpZ246Y2VudGVyO3RleHQtZGVjb3JhdGlvbjpub25lfS5sZWFmbGV0LWRyYXcgYSAuc3Itb25seXtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHg7aGVpZ2h0OjFweDtwYWRkaW5nOjA7bWFyZ2luOi0xcHg7b3ZlcmZsb3c6aGlkZGVuO2NsaXA6cmVjdCgwLDAsMCwwKTtib3JkZXI6MH0ubGVhZmxldC1kcmF3LWFjdGlvbnN7ZGlzcGxheTpub25lO2xpc3Qtc3R5bGU6bm9uZTttYXJnaW46MDtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7bGVmdDoyNnB4O3RvcDowO3doaXRlLXNwYWNlOm5vd3JhcH0ubGVhZmxldC10b3VjaCAubGVhZmxldC1kcmF3LWFjdGlvbnN7bGVmdDozMnB4fS5sZWFmbGV0LXJpZ2h0IC5sZWFmbGV0LWRyYXctYWN0aW9uc3tyaWdodDoyNnB4O2xlZnQ6YXV0b30ubGVhZmxldC10b3VjaCAubGVhZmxldC1yaWdodCAubGVhZmxldC1kcmF3LWFjdGlvbnN7cmlnaHQ6MzJweDtsZWZ0OmF1dG99LmxlYWZsZXQtZHJhdy1hY3Rpb25zIGxpe2Rpc3BsYXk6aW5saW5lLWJsb2NrfVxcbi5sZWFmbGV0LWRyYXctYWN0aW9ucyBsaTpmaXJzdC1jaGlsZCBhe2JvcmRlci1sZWZ0OjB9LmxlYWZsZXQtZHJhdy1hY3Rpb25zIGxpOmxhc3QtY2hpbGQgYXstd2Via2l0LWJvcmRlci1yYWRpdXM6MCA0cHggNHB4IDA7Ym9yZGVyLXJhZGl1czowIDRweCA0cHggMH0ubGVhZmxldC1yaWdodCAubGVhZmxldC1kcmF3LWFjdGlvbnMgbGk6bGFzdC1jaGlsZCBhey13ZWJraXQtYm9yZGVyLXJhZGl1czowO2JvcmRlci1yYWRpdXM6MH0ubGVhZmxldC1yaWdodCAubGVhZmxldC1kcmF3LWFjdGlvbnMgbGk6Zmlyc3QtY2hpbGQgYXstd2Via2l0LWJvcmRlci1yYWRpdXM6NHB4IDAgMCA0cHg7Ym9yZGVyLXJhZGl1czo0cHggMCAwIDRweH0ubGVhZmxldC1kcmF3LWFjdGlvbnMgYXtiYWNrZ3JvdW5kLWNvbG9yOiM5MTkxODc7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNBQUE7Y29sb3I6I0ZGRjtmb250OjExcHgvMTlweCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLEFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2xpbmUtaGVpZ2h0OjI4cHg7dGV4dC1kZWNvcmF0aW9uOm5vbmU7cGFkZGluZy1sZWZ0OjEwcHg7cGFkZGluZy1yaWdodDoxMHB4O2hlaWdodDoyOHB4fVxcbi5sZWFmbGV0LXRvdWNoIC5sZWFmbGV0LWRyYXctYWN0aW9ucyBhe2ZvbnQtc2l6ZToxMnB4O2xpbmUtaGVpZ2h0OjMwcHg7aGVpZ2h0OjMwcHh9LmxlYWZsZXQtZHJhdy1hY3Rpb25zLWJvdHRvbXttYXJnaW4tdG9wOjB9LmxlYWZsZXQtZHJhdy1hY3Rpb25zLXRvcHttYXJnaW4tdG9wOjFweH0ubGVhZmxldC1kcmF3LWFjdGlvbnMtdG9wIGEsLmxlYWZsZXQtZHJhdy1hY3Rpb25zLWJvdHRvbSBhe2hlaWdodDoyN3B4O2xpbmUtaGVpZ2h0OjI3cHh9LmxlYWZsZXQtZHJhdy1hY3Rpb25zIGE6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojYTBhMDk4fS5sZWFmbGV0LWRyYXctYWN0aW9ucy10b3AubGVhZmxldC1kcmF3LWFjdGlvbnMtYm90dG9tIGF7aGVpZ2h0OjI2cHg7bGluZS1oZWlnaHQ6MjZweH0ubGVhZmxldC1kcmF3LXRvb2xiYXIgLmxlYWZsZXQtZHJhdy1kcmF3LXBvbHlsaW5le2JhY2tncm91bmQtcG9zaXRpb246LTJweCAtMnB4fS5sZWFmbGV0LXRvdWNoIC5sZWFmbGV0LWRyYXctdG9vbGJhciAubGVhZmxldC1kcmF3LWRyYXctcG9seWxpbmV7YmFja2dyb3VuZC1wb3NpdGlvbjowIC0xcHh9XFxuLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZHJhdy1wb2x5Z29ue2JhY2tncm91bmQtcG9zaXRpb246LTMxcHggLTJweH0ubGVhZmxldC10b3VjaCAubGVhZmxldC1kcmF3LXRvb2xiYXIgLmxlYWZsZXQtZHJhdy1kcmF3LXBvbHlnb257YmFja2dyb3VuZC1wb3NpdGlvbjotMjlweCAtMXB4fS5sZWFmbGV0LWRyYXctdG9vbGJhciAubGVhZmxldC1kcmF3LWRyYXctcmVjdGFuZ2xle2JhY2tncm91bmQtcG9zaXRpb246LTYycHggLTJweH0ubGVhZmxldC10b3VjaCAubGVhZmxldC1kcmF3LXRvb2xiYXIgLmxlYWZsZXQtZHJhdy1kcmF3LXJlY3RhbmdsZXtiYWNrZ3JvdW5kLXBvc2l0aW9uOi02MHB4IC0xcHh9LmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZHJhdy1jaXJjbGV7YmFja2dyb3VuZC1wb3NpdGlvbjotOTJweCAtMnB4fS5sZWFmbGV0LXRvdWNoIC5sZWFmbGV0LWRyYXctdG9vbGJhciAubGVhZmxldC1kcmF3LWRyYXctY2lyY2xle2JhY2tncm91bmQtcG9zaXRpb246LTkwcHggLTFweH1cXG4ubGVhZmxldC1kcmF3LXRvb2xiYXIgLmxlYWZsZXQtZHJhdy1kcmF3LW1hcmtlcntiYWNrZ3JvdW5kLXBvc2l0aW9uOi0xMjJweCAtMnB4fS5sZWFmbGV0LXRvdWNoIC5sZWFmbGV0LWRyYXctdG9vbGJhciAubGVhZmxldC1kcmF3LWRyYXctbWFya2Vye2JhY2tncm91bmQtcG9zaXRpb246LTEyMHB4IC0xcHh9LmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZHJhdy1jaXJjbGVtYXJrZXJ7YmFja2dyb3VuZC1wb3NpdGlvbjotMjczcHggLTJweH0ubGVhZmxldC10b3VjaCAubGVhZmxldC1kcmF3LXRvb2xiYXIgLmxlYWZsZXQtZHJhdy1kcmF3LWNpcmNsZW1hcmtlcntiYWNrZ3JvdW5kLXBvc2l0aW9uOi0yNzFweCAtMXB4fS5sZWFmbGV0LWRyYXctdG9vbGJhciAubGVhZmxldC1kcmF3LWVkaXQtZWRpdHtiYWNrZ3JvdW5kLXBvc2l0aW9uOi0xNTJweCAtMnB4fS5sZWFmbGV0LXRvdWNoIC5sZWFmbGV0LWRyYXctdG9vbGJhciAubGVhZmxldC1kcmF3LWVkaXQtZWRpdHtiYWNrZ3JvdW5kLXBvc2l0aW9uOi0xNTBweCAtMXB4fVxcbi5sZWFmbGV0LWRyYXctdG9vbGJhciAubGVhZmxldC1kcmF3LWVkaXQtcmVtb3Zle2JhY2tncm91bmQtcG9zaXRpb246LTE4MnB4IC0ycHh9LmxlYWZsZXQtdG91Y2ggLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZWRpdC1yZW1vdmV7YmFja2dyb3VuZC1wb3NpdGlvbjotMTgwcHggLTFweH0ubGVhZmxldC1kcmF3LXRvb2xiYXIgLmxlYWZsZXQtZHJhdy1lZGl0LWVkaXQubGVhZmxldC1kaXNhYmxlZHtiYWNrZ3JvdW5kLXBvc2l0aW9uOi0yMTJweCAtMnB4fS5sZWFmbGV0LXRvdWNoIC5sZWFmbGV0LWRyYXctdG9vbGJhciAubGVhZmxldC1kcmF3LWVkaXQtZWRpdC5sZWFmbGV0LWRpc2FibGVke2JhY2tncm91bmQtcG9zaXRpb246LTIxMHB4IC0xcHh9LmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZWRpdC1yZW1vdmUubGVhZmxldC1kaXNhYmxlZHtiYWNrZ3JvdW5kLXBvc2l0aW9uOi0yNDJweCAtMnB4fS5sZWFmbGV0LXRvdWNoIC5sZWFmbGV0LWRyYXctdG9vbGJhciAubGVhZmxldC1kcmF3LWVkaXQtcmVtb3ZlLmxlYWZsZXQtZGlzYWJsZWR7YmFja2dyb3VuZC1wb3NpdGlvbjotMjQwcHggLTJweH1cXG4ubGVhZmxldC1tb3VzZS1tYXJrZXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmO2N1cnNvcjpjcm9zc2hhaXJ9LmxlYWZsZXQtZHJhdy10b29sdGlwe2JhY2tncm91bmQ6IzM2MzYzNjtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsMC41KTtib3JkZXI6MXB4IHNvbGlkIHRyYW5zcGFyZW50Oy13ZWJraXQtYm9yZGVyLXJhZGl1czo0cHg7Ym9yZGVyLXJhZGl1czo0cHg7Y29sb3I6I2ZmZjtmb250OjEycHgvMThweCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLEFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO21hcmdpbi1sZWZ0OjIwcHg7bWFyZ2luLXRvcDotMjFweDtwYWRkaW5nOjRweCA4cHg7cG9zaXRpb246YWJzb2x1dGU7dmlzaWJpbGl0eTpoaWRkZW47d2hpdGUtc3BhY2U6bm93cmFwO3otaW5kZXg6Nn0ubGVhZmxldC1kcmF3LXRvb2x0aXA6YmVmb3Jle2JvcmRlci1yaWdodDo2cHggc29saWQgYmxhY2s7Ym9yZGVyLXJpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMC41KTtib3JkZXItdG9wOjZweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItYm90dG9tOjZweCBzb2xpZCB0cmFuc3BhcmVudDtjb250ZW50OlxcXCJcXFwiO3Bvc2l0aW9uOmFic29sdXRlO3RvcDo3cHg7bGVmdDotN3B4fVxcbi5sZWFmbGV0LWVycm9yLWRyYXctdG9vbHRpcHtiYWNrZ3JvdW5kLWNvbG9yOiNmMmRlZGU7Ym9yZGVyOjFweCBzb2xpZCAjZTZiNmJkO2NvbG9yOiNiOTRhNDh9LmxlYWZsZXQtZXJyb3ItZHJhdy10b29sdGlwOmJlZm9yZXtib3JkZXItcmlnaHQtY29sb3I6I2U2YjZiZH0ubGVhZmxldC1kcmF3LXRvb2x0aXAtc2luZ2xle21hcmdpbi10b3A6LTEycHh9LmxlYWZsZXQtZHJhdy10b29sdGlwLXN1YnRleHR7Y29sb3I6I2Y4ZDVlNH0ubGVhZmxldC1kcmF3LWd1aWRlLWRhc2h7Zm9udC1zaXplOjElO29wYWNpdHk6LjY7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6NXB4O2hlaWdodDo1cHh9LmxlYWZsZXQtZWRpdC1tYXJrZXItc2VsZWN0ZWR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NCw4NywxNjEsMC4xKTtib3JkZXI6NHB4IGRhc2hlZCByZ2JhKDI1NCw4NywxNjEsMC42KTstd2Via2l0LWJvcmRlci1yYWRpdXM6NHB4O2JvcmRlci1yYWRpdXM6NHB4O2JveC1zaXppbmc6Y29udGVudC1ib3h9XFxuLmxlYWZsZXQtZWRpdC1tb3Zle2N1cnNvcjptb3ZlfS5sZWFmbGV0LWVkaXQtcmVzaXple2N1cnNvcjpwb2ludGVyfS5sZWFmbGV0LW9sZGllIC5sZWFmbGV0LWRyYXctdG9vbGJhcntib3JkZXI6MXB4IHNvbGlkICM5OTl9XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi9jc3MtbG9hZGVyL2xpYi91cmwvZXNjYXBlLmpzXCIpO1xuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIHJlcXVpcmVkIHN0eWxlcyAqL1xcclxcblxcclxcbi5sZWFmbGV0LXBhbmUsXFxyXFxuLmxlYWZsZXQtdGlsZSxcXHJcXG4ubGVhZmxldC1tYXJrZXItaWNvbixcXHJcXG4ubGVhZmxldC1tYXJrZXItc2hhZG93LFxcclxcbi5sZWFmbGV0LXRpbGUtY29udGFpbmVyLFxcclxcbi5sZWFmbGV0LXBhbmUgPiBzdmcsXFxyXFxuLmxlYWZsZXQtcGFuZSA+IGNhbnZhcyxcXHJcXG4ubGVhZmxldC16b29tLWJveCxcXHJcXG4ubGVhZmxldC1pbWFnZS1sYXllcixcXHJcXG4ubGVhZmxldC1sYXllciB7XFxyXFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcclxcblxcdGxlZnQ6IDA7XFxyXFxuXFx0dG9wOiAwO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1jb250YWluZXIge1xcclxcblxcdG92ZXJmbG93OiBoaWRkZW47XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LXRpbGUsXFxyXFxuLmxlYWZsZXQtbWFya2VyLWljb24sXFxyXFxuLmxlYWZsZXQtbWFya2VyLXNoYWRvdyB7XFxyXFxuXFx0LXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXHJcXG5cXHQgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcclxcblxcdCAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuXFx0ICAtd2Via2l0LXVzZXItZHJhZzogbm9uZTtcXHJcXG5cXHR9XFxyXFxuLyogU2FmYXJpIHJlbmRlcnMgbm9uLXJldGluYSB0aWxlIG9uIHJldGluYSBiZXR0ZXIgd2l0aCB0aGlzLCBidXQgQ2hyb21lIGlzIHdvcnNlICovXFxyXFxuLmxlYWZsZXQtc2FmYXJpIC5sZWFmbGV0LXRpbGUge1xcclxcblxcdGltYWdlLXJlbmRlcmluZzogLXdlYmtpdC1vcHRpbWl6ZS1jb250cmFzdDtcXHJcXG5cXHR9XFxyXFxuLyogaGFjayB0aGF0IHByZXZlbnRzIGh3IGxheWVycyBcXFwic3RyZXRjaGluZ1xcXCIgd2hlbiBsb2FkaW5nIG5ldyB0aWxlcyAqL1xcclxcbi5sZWFmbGV0LXNhZmFyaSAubGVhZmxldC10aWxlLWNvbnRhaW5lciB7XFxyXFxuXFx0d2lkdGg6IDE2MDBweDtcXHJcXG5cXHRoZWlnaHQ6IDE2MDBweDtcXHJcXG5cXHQtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDAgMDtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtbWFya2VyLWljb24sXFxyXFxuLmxlYWZsZXQtbWFya2VyLXNoYWRvdyB7XFxyXFxuXFx0ZGlzcGxheTogYmxvY2s7XFxyXFxuXFx0fVxcclxcbi8qIC5sZWFmbGV0LWNvbnRhaW5lciBzdmc6IHJlc2V0IHN2ZyBtYXgtd2lkdGggZGVjbGVyYXRpb24gc2hpcHBlZCBpbiBKb29tbGEhIChqb29tbGEub3JnKSAzLnggKi9cXHJcXG4vKiAubGVhZmxldC1jb250YWluZXIgaW1nOiBtYXAgaXMgYnJva2VuIGluIEZGIGlmIHlvdSBoYXZlIG1heC13aWR0aDogMTAwJSBvbiB0aWxlcyAqL1xcclxcbi5sZWFmbGV0LWNvbnRhaW5lciAubGVhZmxldC1vdmVybGF5LXBhbmUgc3ZnLFxcclxcbi5sZWFmbGV0LWNvbnRhaW5lciAubGVhZmxldC1tYXJrZXItcGFuZSBpbWcsXFxyXFxuLmxlYWZsZXQtY29udGFpbmVyIC5sZWFmbGV0LXNoYWRvdy1wYW5lIGltZyxcXHJcXG4ubGVhZmxldC1jb250YWluZXIgLmxlYWZsZXQtdGlsZS1wYW5lIGltZyxcXHJcXG4ubGVhZmxldC1jb250YWluZXIgaW1nLmxlYWZsZXQtaW1hZ2UtbGF5ZXIsXFxyXFxuLmxlYWZsZXQtY29udGFpbmVyIC5sZWFmbGV0LXRpbGUge1xcclxcblxcdG1heC13aWR0aDogbm9uZSAhaW1wb3J0YW50O1xcclxcblxcdG1heC1oZWlnaHQ6IG5vbmUgIWltcG9ydGFudDtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuLmxlYWZsZXQtY29udGFpbmVyLmxlYWZsZXQtdG91Y2gtem9vbSB7XFxyXFxuXFx0LW1zLXRvdWNoLWFjdGlvbjogcGFuLXggcGFuLXk7XFxyXFxuXFx0dG91Y2gtYWN0aW9uOiBwYW4teCBwYW4teTtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtY29udGFpbmVyLmxlYWZsZXQtdG91Y2gtZHJhZyB7XFxyXFxuXFx0LW1zLXRvdWNoLWFjdGlvbjogcGluY2gtem9vbTtcXHJcXG5cXHQvKiBGYWxsYmFjayBmb3IgRkYgd2hpY2ggZG9lc24ndCBzdXBwb3J0IHBpbmNoLXpvb20gKi9cXHJcXG5cXHR0b3VjaC1hY3Rpb246IG5vbmU7XFxyXFxuXFx0dG91Y2gtYWN0aW9uOiBwaW5jaC16b29tO1xcclxcbn1cXHJcXG4ubGVhZmxldC1jb250YWluZXIubGVhZmxldC10b3VjaC1kcmFnLmxlYWZsZXQtdG91Y2gtem9vbSB7XFxyXFxuXFx0LW1zLXRvdWNoLWFjdGlvbjogbm9uZTtcXHJcXG5cXHR0b3VjaC1hY3Rpb246IG5vbmU7XFxyXFxufVxcclxcbi5sZWFmbGV0LWNvbnRhaW5lciB7XFxyXFxuXFx0LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG59XFxyXFxuLmxlYWZsZXQtY29udGFpbmVyIGEge1xcclxcblxcdC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogcmdiYSg1MSwgMTgxLCAyMjksIDAuNCk7XFxyXFxufVxcclxcbi5sZWFmbGV0LXRpbGUge1xcclxcblxcdGZpbHRlcjogaW5oZXJpdDtcXHJcXG5cXHR2aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LXRpbGUtbG9hZGVkIHtcXHJcXG5cXHR2aXNpYmlsaXR5OiBpbmhlcml0O1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC16b29tLWJveCB7XFxyXFxuXFx0d2lkdGg6IDA7XFxyXFxuXFx0aGVpZ2h0OiAwO1xcclxcblxcdC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG5cXHQgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuXFx0ei1pbmRleDogODAwO1xcclxcblxcdH1cXHJcXG4vKiB3b3JrYXJvdW5kIGZvciBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD04ODgzMTkgKi9cXHJcXG4ubGVhZmxldC1vdmVybGF5LXBhbmUgc3ZnIHtcXHJcXG5cXHQtbW96LXVzZXItc2VsZWN0OiBub25lO1xcclxcblxcdH1cXHJcXG5cXHJcXG4ubGVhZmxldC1wYW5lICAgICAgICAgeyB6LWluZGV4OiA0MDA7IH1cXHJcXG5cXHJcXG4ubGVhZmxldC10aWxlLXBhbmUgICAgeyB6LWluZGV4OiAyMDA7IH1cXHJcXG4ubGVhZmxldC1vdmVybGF5LXBhbmUgeyB6LWluZGV4OiA0MDA7IH1cXHJcXG4ubGVhZmxldC1zaGFkb3ctcGFuZSAgeyB6LWluZGV4OiA1MDA7IH1cXHJcXG4ubGVhZmxldC1tYXJrZXItcGFuZSAgeyB6LWluZGV4OiA2MDA7IH1cXHJcXG4ubGVhZmxldC10b29sdGlwLXBhbmUgICB7IHotaW5kZXg6IDY1MDsgfVxcclxcbi5sZWFmbGV0LXBvcHVwLXBhbmUgICB7IHotaW5kZXg6IDcwMDsgfVxcclxcblxcclxcbi5sZWFmbGV0LW1hcC1wYW5lIGNhbnZhcyB7IHotaW5kZXg6IDEwMDsgfVxcclxcbi5sZWFmbGV0LW1hcC1wYW5lIHN2ZyAgICB7IHotaW5kZXg6IDIwMDsgfVxcclxcblxcclxcbi5sZWFmbGV0LXZtbC1zaGFwZSB7XFxyXFxuXFx0d2lkdGg6IDFweDtcXHJcXG5cXHRoZWlnaHQ6IDFweDtcXHJcXG5cXHR9XFxyXFxuLmx2bWwge1xcclxcblxcdGJlaGF2aW9yOiB1cmwoI2RlZmF1bHQjVk1MKTtcXHJcXG5cXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcclxcblxcdH1cXHJcXG5cXHJcXG5cXHJcXG4vKiBjb250cm9sIHBvc2l0aW9uaW5nICovXFxyXFxuXFxyXFxuLmxlYWZsZXQtY29udHJvbCB7XFxyXFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcclxcblxcdHotaW5kZXg6IDgwMDtcXHJcXG5cXHRwb2ludGVyLWV2ZW50czogdmlzaWJsZVBhaW50ZWQ7IC8qIElFIDktMTAgZG9lc24ndCBoYXZlIGF1dG8gKi9cXHJcXG5cXHRwb2ludGVyLWV2ZW50czogYXV0bztcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtdG9wLFxcclxcbi5sZWFmbGV0LWJvdHRvbSB7XFxyXFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcclxcblxcdHotaW5kZXg6IDEwMDA7XFxyXFxuXFx0cG9pbnRlci1ldmVudHM6IG5vbmU7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LXRvcCB7XFxyXFxuXFx0dG9wOiAwO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1yaWdodCB7XFxyXFxuXFx0cmlnaHQ6IDA7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LWJvdHRvbSB7XFxyXFxuXFx0Ym90dG9tOiAwO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1sZWZ0IHtcXHJcXG5cXHRsZWZ0OiAwO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1jb250cm9sIHtcXHJcXG5cXHRmbG9hdDogbGVmdDtcXHJcXG5cXHRjbGVhcjogYm90aDtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtcmlnaHQgLmxlYWZsZXQtY29udHJvbCB7XFxyXFxuXFx0ZmxvYXQ6IHJpZ2h0O1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC10b3AgLmxlYWZsZXQtY29udHJvbCB7XFxyXFxuXFx0bWFyZ2luLXRvcDogMTBweDtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtYm90dG9tIC5sZWFmbGV0LWNvbnRyb2wge1xcclxcblxcdG1hcmdpbi1ib3R0b206IDEwcHg7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LWxlZnQgLmxlYWZsZXQtY29udHJvbCB7XFxyXFxuXFx0bWFyZ2luLWxlZnQ6IDEwcHg7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LXJpZ2h0IC5sZWFmbGV0LWNvbnRyb2wge1xcclxcblxcdG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFxyXFxuLyogem9vbSBhbmQgZmFkZSBhbmltYXRpb25zICovXFxyXFxuXFxyXFxuLmxlYWZsZXQtZmFkZS1hbmltIC5sZWFmbGV0LXRpbGUge1xcclxcblxcdHdpbGwtY2hhbmdlOiBvcGFjaXR5O1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1mYWRlLWFuaW0gLmxlYWZsZXQtcG9wdXAge1xcclxcblxcdG9wYWNpdHk6IDA7XFxyXFxuXFx0LXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgbGluZWFyO1xcclxcblxcdCAgIC1tb3otdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGxpbmVhcjtcXHJcXG5cXHQgICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBsaW5lYXI7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LWZhZGUtYW5pbSAubGVhZmxldC1tYXAtcGFuZSAubGVhZmxldC1wb3B1cCB7XFxyXFxuXFx0b3BhY2l0eTogMTtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtem9vbS1hbmltYXRlZCB7XFxyXFxuXFx0LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XFxyXFxuXFx0ICAgIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XFxyXFxuXFx0ICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LXpvb20tYW5pbSAubGVhZmxldC16b29tLWFuaW1hdGVkIHtcXHJcXG5cXHR3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC16b29tLWFuaW0gLmxlYWZsZXQtem9vbS1hbmltYXRlZCB7XFxyXFxuXFx0LXdlYmtpdC10cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAwLjI1cyBjdWJpYy1iZXppZXIoMCwwLDAuMjUsMSk7XFxyXFxuXFx0ICAgLW1vei10cmFuc2l0aW9uOiAgICAtbW96LXRyYW5zZm9ybSAwLjI1cyBjdWJpYy1iZXppZXIoMCwwLDAuMjUsMSk7XFxyXFxuXFx0ICAgICAgICB0cmFuc2l0aW9uOiAgICAgICAgIHRyYW5zZm9ybSAwLjI1cyBjdWJpYy1iZXppZXIoMCwwLDAuMjUsMSk7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LXpvb20tYW5pbSAubGVhZmxldC10aWxlLFxcclxcbi5sZWFmbGV0LXBhbi1hbmltIC5sZWFmbGV0LXRpbGUge1xcclxcblxcdC13ZWJraXQtdHJhbnNpdGlvbjogbm9uZTtcXHJcXG5cXHQgICAtbW96LXRyYW5zaXRpb246IG5vbmU7XFxyXFxuXFx0ICAgICAgICB0cmFuc2l0aW9uOiBub25lO1xcclxcblxcdH1cXHJcXG5cXHJcXG4ubGVhZmxldC16b29tLWFuaW0gLmxlYWZsZXQtem9vbS1oaWRlIHtcXHJcXG5cXHR2aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxuXFx0fVxcclxcblxcclxcblxcclxcbi8qIGN1cnNvcnMgKi9cXHJcXG5cXHJcXG4ubGVhZmxldC1pbnRlcmFjdGl2ZSB7XFxyXFxuXFx0Y3Vyc29yOiBwb2ludGVyO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1ncmFiIHtcXHJcXG5cXHRjdXJzb3I6IC13ZWJraXQtZ3JhYjtcXHJcXG5cXHRjdXJzb3I6ICAgIC1tb3otZ3JhYjtcXHJcXG5cXHRjdXJzb3I6ICAgICAgICAgZ3JhYjtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtY3Jvc3NoYWlyLFxcclxcbi5sZWFmbGV0LWNyb3NzaGFpciAubGVhZmxldC1pbnRlcmFjdGl2ZSB7XFxyXFxuXFx0Y3Vyc29yOiBjcm9zc2hhaXI7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LXBvcHVwLXBhbmUsXFxyXFxuLmxlYWZsZXQtY29udHJvbCB7XFxyXFxuXFx0Y3Vyc29yOiBhdXRvO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1kcmFnZ2luZyAubGVhZmxldC1ncmFiLFxcclxcbi5sZWFmbGV0LWRyYWdnaW5nIC5sZWFmbGV0LWdyYWIgLmxlYWZsZXQtaW50ZXJhY3RpdmUsXFxyXFxuLmxlYWZsZXQtZHJhZ2dpbmcgLmxlYWZsZXQtbWFya2VyLWRyYWdnYWJsZSB7XFxyXFxuXFx0Y3Vyc29yOiBtb3ZlO1xcclxcblxcdGN1cnNvcjogLXdlYmtpdC1ncmFiYmluZztcXHJcXG5cXHRjdXJzb3I6ICAgIC1tb3otZ3JhYmJpbmc7XFxyXFxuXFx0Y3Vyc29yOiAgICAgICAgIGdyYWJiaW5nO1xcclxcblxcdH1cXHJcXG5cXHJcXG4vKiBtYXJrZXIgJiBvdmVybGF5cyBpbnRlcmFjdGl2aXR5ICovXFxyXFxuLmxlYWZsZXQtbWFya2VyLWljb24sXFxyXFxuLmxlYWZsZXQtbWFya2VyLXNoYWRvdyxcXHJcXG4ubGVhZmxldC1pbWFnZS1sYXllcixcXHJcXG4ubGVhZmxldC1wYW5lID4gc3ZnIHBhdGgsXFxyXFxuLmxlYWZsZXQtdGlsZS1jb250YWluZXIge1xcclxcblxcdHBvaW50ZXItZXZlbnRzOiBub25lO1xcclxcblxcdH1cXHJcXG5cXHJcXG4ubGVhZmxldC1tYXJrZXItaWNvbi5sZWFmbGV0LWludGVyYWN0aXZlLFxcclxcbi5sZWFmbGV0LWltYWdlLWxheWVyLmxlYWZsZXQtaW50ZXJhY3RpdmUsXFxyXFxuLmxlYWZsZXQtcGFuZSA+IHN2ZyBwYXRoLmxlYWZsZXQtaW50ZXJhY3RpdmUge1xcclxcblxcdHBvaW50ZXItZXZlbnRzOiB2aXNpYmxlUGFpbnRlZDsgLyogSUUgOS0xMCBkb2Vzbid0IGhhdmUgYXV0byAqL1xcclxcblxcdHBvaW50ZXItZXZlbnRzOiBhdXRvO1xcclxcblxcdH1cXHJcXG5cXHJcXG4vKiB2aXN1YWwgdHdlYWtzICovXFxyXFxuXFxyXFxuLmxlYWZsZXQtY29udGFpbmVyIHtcXHJcXG5cXHRiYWNrZ3JvdW5kOiAjZGRkO1xcclxcblxcdG91dGxpbmU6IDA7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LWNvbnRhaW5lciBhIHtcXHJcXG5cXHRjb2xvcjogIzAwNzhBODtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtY29udGFpbmVyIGEubGVhZmxldC1hY3RpdmUge1xcclxcblxcdG91dGxpbmU6IDJweCBzb2xpZCBvcmFuZ2U7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LXpvb20tYm94IHtcXHJcXG5cXHRib3JkZXI6IDJweCBkb3R0ZWQgIzM4ZjtcXHJcXG5cXHRiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuNSk7XFxyXFxuXFx0fVxcclxcblxcclxcblxcclxcbi8qIGdlbmVyYWwgdHlwb2dyYXBoeSAqL1xcclxcbi5sZWFmbGV0LWNvbnRhaW5lciB7XFxyXFxuXFx0Zm9udDogMTJweC8xLjUgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFxyXFxuLyogZ2VuZXJhbCB0b29sYmFyIHN0eWxlcyAqL1xcclxcblxcclxcbi5sZWFmbGV0LWJhciB7XFxyXFxuXFx0Ym94LXNoYWRvdzogMCAxcHggNXB4IHJnYmEoMCwwLDAsMC42NSk7XFxyXFxuXFx0Ym9yZGVyLXJhZGl1czogNHB4O1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1iYXIgYSxcXHJcXG4ubGVhZmxldC1iYXIgYTpob3ZlciB7XFxyXFxuXFx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG5cXHRib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcXHJcXG5cXHR3aWR0aDogMjZweDtcXHJcXG5cXHRoZWlnaHQ6IDI2cHg7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDI2cHg7XFxyXFxuXFx0ZGlzcGxheTogYmxvY2s7XFxyXFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcclxcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG5cXHRjb2xvcjogYmxhY2s7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LWJhciBhLFxcclxcbi5sZWFmbGV0LWNvbnRyb2wtbGF5ZXJzLXRvZ2dsZSB7XFxyXFxuXFx0YmFja2dyb3VuZC1wb3NpdGlvbjogNTAlIDUwJTtcXHJcXG5cXHRiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcclxcblxcdGRpc3BsYXk6IGJsb2NrO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1iYXIgYTpob3ZlciB7XFxyXFxuXFx0YmFja2dyb3VuZC1jb2xvcjogI2Y0ZjRmNDtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtYmFyIGE6Zmlyc3QtY2hpbGQge1xcclxcblxcdGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDRweDtcXHJcXG5cXHRib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNHB4O1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1iYXIgYTpsYXN0LWNoaWxkIHtcXHJcXG5cXHRib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA0cHg7XFxyXFxuXFx0Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDRweDtcXHJcXG5cXHRib3JkZXItYm90dG9tOiBub25lO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1iYXIgYS5sZWFmbGV0LWRpc2FibGVkIHtcXHJcXG5cXHRjdXJzb3I6IGRlZmF1bHQ7XFxyXFxuXFx0YmFja2dyb3VuZC1jb2xvcjogI2Y0ZjRmNDtcXHJcXG5cXHRjb2xvcjogI2JiYjtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuLmxlYWZsZXQtdG91Y2ggLmxlYWZsZXQtYmFyIGEge1xcclxcblxcdHdpZHRoOiAzMHB4O1xcclxcblxcdGhlaWdodDogMzBweDtcXHJcXG5cXHRsaW5lLWhlaWdodDogMzBweDtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtdG91Y2ggLmxlYWZsZXQtYmFyIGE6Zmlyc3QtY2hpbGQge1xcclxcblxcdGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDJweDtcXHJcXG5cXHRib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMnB4O1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC10b3VjaCAubGVhZmxldC1iYXIgYTpsYXN0LWNoaWxkIHtcXHJcXG5cXHRib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAycHg7XFxyXFxuXFx0Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDJweDtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuLyogem9vbSBjb250cm9sICovXFxyXFxuXFxyXFxuLmxlYWZsZXQtY29udHJvbC16b29tLWluLFxcclxcbi5sZWFmbGV0LWNvbnRyb2wtem9vbS1vdXQge1xcclxcblxcdGZvbnQ6IGJvbGQgMThweCAnTHVjaWRhIENvbnNvbGUnLCBNb25hY28sIG1vbm9zcGFjZTtcXHJcXG5cXHR0ZXh0LWluZGVudDogMXB4O1xcclxcblxcdH1cXHJcXG5cXHJcXG4ubGVhZmxldC10b3VjaCAubGVhZmxldC1jb250cm9sLXpvb20taW4sIC5sZWFmbGV0LXRvdWNoIC5sZWFmbGV0LWNvbnRyb2wtem9vbS1vdXQgIHtcXHJcXG5cXHRmb250LXNpemU6IDIycHg7XFxyXFxuXFx0fVxcclxcblxcclxcblxcclxcbi8qIGxheWVycyBjb250cm9sICovXFxyXFxuXFxyXFxuLmxlYWZsZXQtY29udHJvbC1sYXllcnMge1xcclxcblxcdGJveC1zaGFkb3c6IDAgMXB4IDVweCByZ2JhKDAsMCwwLDAuNCk7XFxyXFxuXFx0YmFja2dyb3VuZDogI2ZmZjtcXHJcXG5cXHRib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LWNvbnRyb2wtbGF5ZXJzLXRvZ2dsZSB7XFxyXFxuXFx0YmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuL2ltYWdlcy9sYXllcnMucG5nXCIpKSArIFwiKTtcXHJcXG5cXHR3aWR0aDogMzZweDtcXHJcXG5cXHRoZWlnaHQ6IDM2cHg7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LXJldGluYSAubGVhZmxldC1jb250cm9sLWxheWVycy10b2dnbGUge1xcclxcblxcdGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9pbWFnZXMvbGF5ZXJzLTJ4LnBuZ1wiKSkgKyBcIik7XFxyXFxuXFx0YmFja2dyb3VuZC1zaXplOiAyNnB4IDI2cHg7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LXRvdWNoIC5sZWFmbGV0LWNvbnRyb2wtbGF5ZXJzLXRvZ2dsZSB7XFxyXFxuXFx0d2lkdGg6IDQ0cHg7XFxyXFxuXFx0aGVpZ2h0OiA0NHB4O1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1jb250cm9sLWxheWVycyAubGVhZmxldC1jb250cm9sLWxheWVycy1saXN0LFxcclxcbi5sZWFmbGV0LWNvbnRyb2wtbGF5ZXJzLWV4cGFuZGVkIC5sZWFmbGV0LWNvbnRyb2wtbGF5ZXJzLXRvZ2dsZSB7XFxyXFxuXFx0ZGlzcGxheTogbm9uZTtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtY29udHJvbC1sYXllcnMtZXhwYW5kZWQgLmxlYWZsZXQtY29udHJvbC1sYXllcnMtbGlzdCB7XFxyXFxuXFx0ZGlzcGxheTogYmxvY2s7XFxyXFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1jb250cm9sLWxheWVycy1leHBhbmRlZCB7XFxyXFxuXFx0cGFkZGluZzogNnB4IDEwcHggNnB4IDZweDtcXHJcXG5cXHRjb2xvcjogIzMzMztcXHJcXG5cXHRiYWNrZ3JvdW5kOiAjZmZmO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1jb250cm9sLWxheWVycy1zY3JvbGxiYXIge1xcclxcblxcdG92ZXJmbG93LXk6IHNjcm9sbDtcXHJcXG5cXHRvdmVyZmxvdy14OiBoaWRkZW47XFxyXFxuXFx0cGFkZGluZy1yaWdodDogNXB4O1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1jb250cm9sLWxheWVycy1zZWxlY3RvciB7XFxyXFxuXFx0bWFyZ2luLXRvcDogMnB4O1xcclxcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG5cXHR0b3A6IDFweDtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtY29udHJvbC1sYXllcnMgbGFiZWwge1xcclxcblxcdGRpc3BsYXk6IGJsb2NrO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1jb250cm9sLWxheWVycy1zZXBhcmF0b3Ige1xcclxcblxcdGhlaWdodDogMDtcXHJcXG5cXHRib3JkZXItdG9wOiAxcHggc29saWQgI2RkZDtcXHJcXG5cXHRtYXJnaW46IDVweCAtMTBweCA1cHggLTZweDtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuLyogRGVmYXVsdCBpY29uIFVSTHMgKi9cXHJcXG4ubGVhZmxldC1kZWZhdWx0LWljb24tcGF0aCB7XFxyXFxuXFx0YmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuL2ltYWdlcy9tYXJrZXItaWNvbi5wbmdcIikpICsgXCIpO1xcclxcblxcdH1cXHJcXG5cXHJcXG5cXHJcXG4vKiBhdHRyaWJ1dGlvbiBhbmQgc2NhbGUgY29udHJvbHMgKi9cXHJcXG5cXHJcXG4ubGVhZmxldC1jb250YWluZXIgLmxlYWZsZXQtY29udHJvbC1hdHRyaWJ1dGlvbiB7XFxyXFxuXFx0YmFja2dyb3VuZDogI2ZmZjtcXHJcXG5cXHRiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyk7XFxyXFxuXFx0bWFyZ2luOiAwO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1jb250cm9sLWF0dHJpYnV0aW9uLFxcclxcbi5sZWFmbGV0LWNvbnRyb2wtc2NhbGUtbGluZSB7XFxyXFxuXFx0cGFkZGluZzogMCA1cHg7XFxyXFxuXFx0Y29sb3I6ICMzMzM7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LWNvbnRyb2wtYXR0cmlidXRpb24gYSB7XFxyXFxuXFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1jb250cm9sLWF0dHJpYnV0aW9uIGE6aG92ZXIge1xcclxcblxcdHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1jb250YWluZXIgLmxlYWZsZXQtY29udHJvbC1hdHRyaWJ1dGlvbixcXHJcXG4ubGVhZmxldC1jb250YWluZXIgLmxlYWZsZXQtY29udHJvbC1zY2FsZSB7XFxyXFxuXFx0Zm9udC1zaXplOiAxMXB4O1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1sZWZ0IC5sZWFmbGV0LWNvbnRyb2wtc2NhbGUge1xcclxcblxcdG1hcmdpbi1sZWZ0OiA1cHg7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LWJvdHRvbSAubGVhZmxldC1jb250cm9sLXNjYWxlIHtcXHJcXG5cXHRtYXJnaW4tYm90dG9tOiA1cHg7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LWNvbnRyb2wtc2NhbGUtbGluZSB7XFxyXFxuXFx0Ym9yZGVyOiAycHggc29saWQgIzc3NztcXHJcXG5cXHRib3JkZXItdG9wOiBub25lO1xcclxcblxcdGxpbmUtaGVpZ2h0OiAxLjE7XFxyXFxuXFx0cGFkZGluZzogMnB4IDVweCAxcHg7XFxyXFxuXFx0Zm9udC1zaXplOiAxMXB4O1xcclxcblxcdHdoaXRlLXNwYWNlOiBub3dyYXA7XFxyXFxuXFx0b3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG5cXHQtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuXFx0ICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcblxcclxcblxcdGJhY2tncm91bmQ6ICNmZmY7XFxyXFxuXFx0YmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1jb250cm9sLXNjYWxlLWxpbmU6bm90KDpmaXJzdC1jaGlsZCkge1xcclxcblxcdGJvcmRlci10b3A6IDJweCBzb2xpZCAjNzc3O1xcclxcblxcdGJvcmRlci1ib3R0b206IG5vbmU7XFxyXFxuXFx0bWFyZ2luLXRvcDogLTJweDtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtY29udHJvbC1zY2FsZS1saW5lOm5vdCg6Zmlyc3QtY2hpbGQpOm5vdCg6bGFzdC1jaGlsZCkge1xcclxcblxcdGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjNzc3O1xcclxcblxcdH1cXHJcXG5cXHJcXG4ubGVhZmxldC10b3VjaCAubGVhZmxldC1jb250cm9sLWF0dHJpYnV0aW9uLFxcclxcbi5sZWFmbGV0LXRvdWNoIC5sZWFmbGV0LWNvbnRyb2wtbGF5ZXJzLFxcclxcbi5sZWFmbGV0LXRvdWNoIC5sZWFmbGV0LWJhciB7XFxyXFxuXFx0Ym94LXNoYWRvdzogbm9uZTtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtdG91Y2ggLmxlYWZsZXQtY29udHJvbC1sYXllcnMsXFxyXFxuLmxlYWZsZXQtdG91Y2ggLmxlYWZsZXQtYmFyIHtcXHJcXG5cXHRib3JkZXI6IDJweCBzb2xpZCByZ2JhKDAsMCwwLDAuMik7XFxyXFxuXFx0YmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFxyXFxuLyogcG9wdXAgKi9cXHJcXG5cXHJcXG4ubGVhZmxldC1wb3B1cCB7XFxyXFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcclxcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG5cXHRtYXJnaW4tYm90dG9tOiAyMHB4O1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1wb3B1cC1jb250ZW50LXdyYXBwZXIge1xcclxcblxcdHBhZGRpbmc6IDFweDtcXHJcXG5cXHR0ZXh0LWFsaWduOiBsZWZ0O1xcclxcblxcdGJvcmRlci1yYWRpdXM6IDEycHg7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LXBvcHVwLWNvbnRlbnQge1xcclxcblxcdG1hcmdpbjogMTNweCAxOXB4O1xcclxcblxcdGxpbmUtaGVpZ2h0OiAxLjQ7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LXBvcHVwLWNvbnRlbnQgcCB7XFxyXFxuXFx0bWFyZ2luOiAxOHB4IDA7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LXBvcHVwLXRpcC1jb250YWluZXIge1xcclxcblxcdHdpZHRoOiA0MHB4O1xcclxcblxcdGhlaWdodDogMjBweDtcXHJcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuXFx0bGVmdDogNTAlO1xcclxcblxcdG1hcmdpbi1sZWZ0OiAtMjBweDtcXHJcXG5cXHRvdmVyZmxvdzogaGlkZGVuO1xcclxcblxcdHBvaW50ZXItZXZlbnRzOiBub25lO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1wb3B1cC10aXAge1xcclxcblxcdHdpZHRoOiAxN3B4O1xcclxcblxcdGhlaWdodDogMTdweDtcXHJcXG5cXHRwYWRkaW5nOiAxcHg7XFxyXFxuXFxyXFxuXFx0bWFyZ2luOiAtMTBweCBhdXRvIDA7XFxyXFxuXFxyXFxuXFx0LXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XFxyXFxuXFx0ICAgLW1vei10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XFxyXFxuXFx0ICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XFxyXFxuXFx0ICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LXBvcHVwLWNvbnRlbnQtd3JhcHBlcixcXHJcXG4ubGVhZmxldC1wb3B1cC10aXAge1xcclxcblxcdGJhY2tncm91bmQ6IHdoaXRlO1xcclxcblxcdGNvbG9yOiAjMzMzO1xcclxcblxcdGJveC1zaGFkb3c6IDAgM3B4IDE0cHggcmdiYSgwLDAsMCwwLjQpO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1jb250YWluZXIgYS5sZWFmbGV0LXBvcHVwLWNsb3NlLWJ1dHRvbiB7XFxyXFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcclxcblxcdHRvcDogMDtcXHJcXG5cXHRyaWdodDogMDtcXHJcXG5cXHRwYWRkaW5nOiA0cHggNHB4IDAgMDtcXHJcXG5cXHRib3JkZXI6IG5vbmU7XFxyXFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcclxcblxcdHdpZHRoOiAxOHB4O1xcclxcblxcdGhlaWdodDogMTRweDtcXHJcXG5cXHRmb250OiAxNnB4LzE0cHggVGFob21hLCBWZXJkYW5hLCBzYW5zLXNlcmlmO1xcclxcblxcdGNvbG9yOiAjYzNjM2MzO1xcclxcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG5cXHRmb250LXdlaWdodDogYm9sZDtcXHJcXG5cXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtY29udGFpbmVyIGEubGVhZmxldC1wb3B1cC1jbG9zZS1idXR0b246aG92ZXIge1xcclxcblxcdGNvbG9yOiAjOTk5O1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC1wb3B1cC1zY3JvbGxlZCB7XFxyXFxuXFx0b3ZlcmZsb3c6IGF1dG87XFxyXFxuXFx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XFxyXFxuXFx0Ym9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XFxyXFxuXFx0fVxcclxcblxcclxcbi5sZWFmbGV0LW9sZGllIC5sZWFmbGV0LXBvcHVwLWNvbnRlbnQtd3JhcHBlciB7XFxyXFxuXFx0em9vbTogMTtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtb2xkaWUgLmxlYWZsZXQtcG9wdXAtdGlwIHtcXHJcXG5cXHR3aWR0aDogMjRweDtcXHJcXG5cXHRtYXJnaW46IDAgYXV0bztcXHJcXG5cXHJcXG5cXHQtbXMtZmlsdGVyOiBcXFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0Lk1hdHJpeChNMTE9MC43MDcxMDY3OCwgTTEyPTAuNzA3MTA2NzgsIE0yMT0tMC43MDcxMDY3OCwgTTIyPTAuNzA3MTA2NzgpXFxcIjtcXHJcXG5cXHRmaWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5NYXRyaXgoTTExPTAuNzA3MTA2NzgsIE0xMj0wLjcwNzEwNjc4LCBNMjE9LTAuNzA3MTA2NzgsIE0yMj0wLjcwNzEwNjc4KTtcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtb2xkaWUgLmxlYWZsZXQtcG9wdXAtdGlwLWNvbnRhaW5lciB7XFxyXFxuXFx0bWFyZ2luLXRvcDogLTFweDtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuLmxlYWZsZXQtb2xkaWUgLmxlYWZsZXQtY29udHJvbC16b29tLFxcclxcbi5sZWFmbGV0LW9sZGllIC5sZWFmbGV0LWNvbnRyb2wtbGF5ZXJzLFxcclxcbi5sZWFmbGV0LW9sZGllIC5sZWFmbGV0LXBvcHVwLWNvbnRlbnQtd3JhcHBlcixcXHJcXG4ubGVhZmxldC1vbGRpZSAubGVhZmxldC1wb3B1cC10aXAge1xcclxcblxcdGJvcmRlcjogMXB4IHNvbGlkICM5OTk7XFxyXFxuXFx0fVxcclxcblxcclxcblxcclxcbi8qIGRpdiBpY29uICovXFxyXFxuXFxyXFxuLmxlYWZsZXQtZGl2LWljb24ge1xcclxcblxcdGJhY2tncm91bmQ6ICNmZmY7XFxyXFxuXFx0Ym9yZGVyOiAxcHggc29saWQgIzY2NjtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFxyXFxuLyogVG9vbHRpcCAqL1xcclxcbi8qIEJhc2Ugc3R5bGVzIGZvciB0aGUgZWxlbWVudCB0aGF0IGhhcyBhIHRvb2x0aXAgKi9cXHJcXG4ubGVhZmxldC10b29sdGlwIHtcXHJcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuXFx0cGFkZGluZzogNnB4O1xcclxcblxcdGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxyXFxuXFx0Ym9yZGVyOiAxcHggc29saWQgI2ZmZjtcXHJcXG5cXHRib3JkZXItcmFkaXVzOiAzcHg7XFxyXFxuXFx0Y29sb3I6ICMyMjI7XFxyXFxuXFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcXHJcXG5cXHQtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcclxcblxcdC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuXFx0LW1zLXVzZXItc2VsZWN0OiBub25lO1xcclxcblxcdHVzZXItc2VsZWN0OiBub25lO1xcclxcblxcdHBvaW50ZXItZXZlbnRzOiBub25lO1xcclxcblxcdGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsMCwwLDAuNCk7XFxyXFxuXFx0fVxcclxcbi5sZWFmbGV0LXRvb2x0aXAubGVhZmxldC1jbGlja2FibGUge1xcclxcblxcdGN1cnNvcjogcG9pbnRlcjtcXHJcXG5cXHRwb2ludGVyLWV2ZW50czogYXV0bztcXHJcXG5cXHR9XFxyXFxuLmxlYWZsZXQtdG9vbHRpcC10b3A6YmVmb3JlLFxcclxcbi5sZWFmbGV0LXRvb2x0aXAtYm90dG9tOmJlZm9yZSxcXHJcXG4ubGVhZmxldC10b29sdGlwLWxlZnQ6YmVmb3JlLFxcclxcbi5sZWFmbGV0LXRvb2x0aXAtcmlnaHQ6YmVmb3JlIHtcXHJcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuXFx0cG9pbnRlci1ldmVudHM6IG5vbmU7XFxyXFxuXFx0Ym9yZGVyOiA2cHggc29saWQgdHJhbnNwYXJlbnQ7XFxyXFxuXFx0YmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxyXFxuXFx0Y29udGVudDogXFxcIlxcXCI7XFxyXFxuXFx0fVxcclxcblxcclxcbi8qIERpcmVjdGlvbnMgKi9cXHJcXG5cXHJcXG4ubGVhZmxldC10b29sdGlwLWJvdHRvbSB7XFxyXFxuXFx0bWFyZ2luLXRvcDogNnB4O1xcclxcbn1cXHJcXG4ubGVhZmxldC10b29sdGlwLXRvcCB7XFxyXFxuXFx0bWFyZ2luLXRvcDogLTZweDtcXHJcXG59XFxyXFxuLmxlYWZsZXQtdG9vbHRpcC1ib3R0b206YmVmb3JlLFxcclxcbi5sZWFmbGV0LXRvb2x0aXAtdG9wOmJlZm9yZSB7XFxyXFxuXFx0bGVmdDogNTAlO1xcclxcblxcdG1hcmdpbi1sZWZ0OiAtNnB4O1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC10b29sdGlwLXRvcDpiZWZvcmUge1xcclxcblxcdGJvdHRvbTogMDtcXHJcXG5cXHRtYXJnaW4tYm90dG9tOiAtMTJweDtcXHJcXG5cXHRib3JkZXItdG9wLWNvbG9yOiAjZmZmO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC10b29sdGlwLWJvdHRvbTpiZWZvcmUge1xcclxcblxcdHRvcDogMDtcXHJcXG5cXHRtYXJnaW4tdG9wOiAtMTJweDtcXHJcXG5cXHRtYXJnaW4tbGVmdDogLTZweDtcXHJcXG5cXHRib3JkZXItYm90dG9tLWNvbG9yOiAjZmZmO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC10b29sdGlwLWxlZnQge1xcclxcblxcdG1hcmdpbi1sZWZ0OiAtNnB4O1xcclxcbn1cXHJcXG4ubGVhZmxldC10b29sdGlwLXJpZ2h0IHtcXHJcXG5cXHRtYXJnaW4tbGVmdDogNnB4O1xcclxcbn1cXHJcXG4ubGVhZmxldC10b29sdGlwLWxlZnQ6YmVmb3JlLFxcclxcbi5sZWFmbGV0LXRvb2x0aXAtcmlnaHQ6YmVmb3JlIHtcXHJcXG5cXHR0b3A6IDUwJTtcXHJcXG5cXHRtYXJnaW4tdG9wOiAtNnB4O1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC10b29sdGlwLWxlZnQ6YmVmb3JlIHtcXHJcXG5cXHRyaWdodDogMDtcXHJcXG5cXHRtYXJnaW4tcmlnaHQ6IC0xMnB4O1xcclxcblxcdGJvcmRlci1sZWZ0LWNvbG9yOiAjZmZmO1xcclxcblxcdH1cXHJcXG4ubGVhZmxldC10b29sdGlwLXJpZ2h0OmJlZm9yZSB7XFxyXFxuXFx0bGVmdDogMDtcXHJcXG5cXHRtYXJnaW4tbGVmdDogLTEycHg7XFxyXFxuXFx0Ym9yZGVyLXJpZ2h0LWNvbG9yOiAjZmZmO1xcclxcblxcdH1cXHJcXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVzY2FwZSh1cmwpIHtcbiAgICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHVybFxuICAgIH1cbiAgICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICAgICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgICB9XG4gICAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAgIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gICAgaWYgKC9bXCInKCkgXFx0XFxuXS8udGVzdCh1cmwpKSB7XG4gICAgICAgIHJldHVybiAnXCInICsgdXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJykgKyAnXCInXG4gICAgfVxuXG4gICAgcmV0dXJuIHVybFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEdnQWFBTlUvQVAvLy80V0ZoZlgxOVQwOVBmMzkvU1VsSlE4UEQ1dWJtMGRIUi9MeThseGNYSEJ3Y0ltSmlmRHc4UHo4L08vdjcySmlZazFOVGFXbHBZYUdocWVucC9iMjl2UHo4M3Q3ZTRxS2l2NysvbDFkWGUzdDdYUjBkSGw1ZVdkblowdExTems1T1Y5ZlgvbjUrZTd1N3V2cjY1eWNuT2JtNW05dmI1V1ZsVk5UVTVpWW1Pam82T3JxNm5kM2QvVDA5UEh4OGV6czdPUGo0MnBxYXVEZzRCVVZGVWxKU1hKeWNqOC9QL3Y3Ky9mMzkrZm41MFJFUkN3c0xQajQrUHI2K3YvLy95SC9DMDVGVkZORFFWQkZNaTR3QXdFQUFBQWgrUVFGQ2dBL0FDd0FBQUFBR2dBYUFBQUdxTUNmY0Vnc0dvL0lwSExKYkRxZlQ0QjBTcTBDbEZaQUpKTEZTbGNPcWNFZ3pTU20zbGdoc2dHTUFZTEQ1Q0gxQ2o2Rmp5T1Z5aHdDQnlKMVNWTWJFVHh0Y0F3bEFtaUVWQTFVRlZWWUp3TURKMVlTQVFFU1Y0UWNseHhXRkp3VW4waFZaMU9OVkY0QURUSVJJMUlKSEJnV2pxa0FGUjRJSGdRVEV3UU1Dd3c5ZzdzNk5SNlJDZ29BRmd3Mk1NbEhVeXM0VXM5U0RyVFdSbGtZR0YyUFdlVlE2ZXJyN08zdVFRQWgrUVFGQ2dBL0FDd0dBQVlBRFFBT0FBQUdhOENmY0tqUkRJOHNnckJRRURwTVF0TU44dmd4ZnlTUVlmYXJoQVloQWdUaTBJSmN3Z2RrVjhYU0JxVGo3M1VjRFZzSVJFdCt2T1F2ZklFV1J4VnlDUmNRRFVJdURDVUNRamtkQ2gwL0tDZ1pCd0VISWo4c0doMEpQd3NMUHdJSEUyMHdRNk5EZEh3cUtuSkJBQ0g1QkFVS0FEOEFMQVlBQmdBT0FBNEFBQVpod0o5d2VEb05qei9ZY0RBWXJvYTZtcXp4WS80Mm4wSnM2RUY0Zmh6T0wvc1JEQnV5Q1BYS2kyeVF2OFJ4TFp3b0ZCTjR4R0NJWU80WWNDbDhLVWRtY0VjV0dCeHlpRDg5REFzTVB4SVNpREEyREJZL0FRR09JdzVDblk1SEZCUndRUUFoK1FRRkNnQS9BQ3dHQUFZQURnQU5BQUFHYWNDZmNOaHFEWSsvMFJDQkVCSllRNWJta3ZneGY0L1F6U1RNZFJTZDMrVkNDQTFDbFdIaUFxbGlkNUFIOG1jNXZvNm94UUkxMXhRS0dpcDZLbk1RZnhCSGFVTktTQUlsREM1Q0t6UURKRU1pQndFSEdVSU9JQVlna1ZnVEJ3SkhKSjh6UTNkeklqRkNRUUFoK1FRRkNnQS9BQ3dHQUFZQURnQU9BQUFHWHNDZmNEaVpESSsveGxDaEdNS2NOb3pseDB4NmFqcGhqN0ZnL0RDWW53ZmhPVm93bkdreUlsTWlCY2ZFVVJJSVNKQy8wMkJ3b3RRcGVCeDdISGhEYm9WRExEd1JHNGdSRVQ4ZkJSOXdlQVlHUHh1U01ZV1hRajRtaUNrcGVFRUFJZmtFQlFvQVB3QXNCd0FHQUEwQURnQUFCbXZBbjFDSVFnMlBpWXh3c1JpT2hJOUpTZkJqL2hJZERlc25PZ1FPR1pYcTExRjBja0pCaVVHOVFpNko0Njl5dE1qdndoWUMwY0lMTDNzWFRrY3ZjaVFETkN0Q0d6c1FEMEl1SUFZZ0Rob2FCQ0VESVhRemt5US9CUVUvRHlFM0prSXhJa0toUTRwM0VCQjNRUUFoK1FRRkNnQS9BQ3dHQUFZQURnQU9BQUFHWXNDZmNDaVJESS9JUUdEWVFBNlZQd3ZEQm5QK0tKUWZZOEhvV1lVV0RzYnlIUXFPRVlNaDRwd29GSk9VT3VYRXZESEg1akRoM0VSNExFSWpFVEo2UHdJZkJSOC9KeWMvSGdnZVF6R0tHejhEQXo4TkhqVTZReVkrUXBoQ09HVWNIRTVCQUNINUJBVUtBRDhBTEFZQUJ3QU9BQTBBQUFacndOL1A1QkFhZjVtRWNXWVlrSTZDdytRaGRJRU1vQ0x5RURpSWpLUUI3ZmtUTUVxQ28zQjByQncxaFlKRy9VTXRGaWhJSEVKWDNWVkhMMGNXZEE4UU94dENEUkFYU2tJVklRTWhCQzB0UHgwS0hUbENKamNoVkFnSVB3a2RHaXhHSzBhaFJqQjBRaGNYZEVFQU93PT1cIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhOQUEwQVBmZUFQLy8vL241K1lXRmhmdjcrLzcrL2dBQUFKQ1FrUDM5L1h4OGZDUWtKSEJ3Y0Z4Y1hQejgvUHI2K2tkSFIvajQrSVNFaEQwOVBkUFQwL2YzOTVHUmtZYUdocEtTa2hBUUVIMTlmZHJhMm5oNGVOVFUxRmhZV09qbzZPRGc0Q1ltSm10cmF6bzZPdlgxOWNYRnhaU1VsRkJRVUQ4L1AxbFpXZVhsNVU1T1R0N2UzaTh2TC9iMjlsZFhWNEdCZ1pPVGt5VWxKVjVlWHJxNnVyNit2bUZoWVc5dmI0S0NnbHRiV3pjM042dXJxM0p5Y29PRGc3Ky92N2UzdCtQajQ5RFEwTUhCd2VMaTRvQ0FnTTNOelRrNU9hT2pvN0d4c1VORFEyWm1abytQajUrZm54TVRFM0Z4Y2FxcXFqdzhQRGc0T0cxdGJjek16TlhWMVVsSlNjdkx5OUhSMGM3T3pnd01ETWJHeHZQejh5Y25KNWVYbDI1dWJzakl5RkZSVVkyTmpRNE9EaUlpSXRuWjJYVjFkZUhoNGZUMDlGVlZWVXBLU3QvZjM4VEV4SmlZbU5mWDF6SXlNa1pHUm1wcWFteHNiTWZIeDNaMmRsMWRYZkR3OEg1K2ZpZ29LQlVWRmRMUzBpa3BLVTlQVDhEQXdKYVdsalEwTkZSVVZCOGZIeFFVRkNvcUtwNmVuclMwdEY5ZlgrYm01cnU3dTVxYW10emMzTnZiMndnSUNITnpjejQrUHMvUHowQkFRRVJFUkEwTkRTc3JLN096czQ2T2ppMHRMV0JnWUtLaW9xMnRyWXFLaWtoSVNEQXdNTHk4dkwyOXZkYlcxcWlvcUl5TWpOM2QzVXRMU3pzN093b0tDcSt2cndJQ0FrVkZSY3JLeXJXMXRlN3U3bmw1ZVVKQ1FqRXhNVkpTVXB1Ym03Q3dzR2RuWjhMQ3dybTV1YXlzcktlbnB6WTJOc1BEdytmbjV3Y0hCMmxwYVp5Y25Dd3NMQzR1TGt4TVRIUjBkRlpXVmhvYUdzbkp5UXNMQzN0N2UrenM3Q01qSTZXbHBhNnVyaDRlSHAyZG5iaTR1SXVMaTJOalk0ZUhodzhQRHpNek0yUmtaRFUxTmRqWTJDQWdJT3ZyNjFOVFUrcnE2aUVoSVZwYVdwbVptV1ZsWlpXVmxiS3lzcWFtcHFtcHFmLy8vd0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQ0gvQzA1RlZGTkRRVkJGTWk0d0F3RUFBQUFoK1FRRkNnRGVBQ3dBQUFBQU5BQTBBQUFJL3dDOUNSeElzS0RCZ3dnVEtseklzS0hEaHhBalNweElzYUxGaXhnemF0eklzYVBIanlCRFdnUkFzcVRKa3loVGtoeXBzcVhMbFJWZmtoeGl3c1FRbVFCWXZtUno1UW9ibkRwTEJoQnhFc2FGQ3pCT0JoaUFNaWdBRkJRZzNDeXA1YWdXa3o1azZKbHpNdWdFU2FRZW1laFM4c1BSRHlWVldOQ2dZd2JUa2tITENMbnk0VThqc2dBK2dBR0RGb0NIRndncWFPZ1J3S1RUSDA3czFGM0VDWUFOVWFKc0FPaEFJakFDQ3lpNnhqdzVJb0xpUk5xR05ta2lnc0dJTVJVdW8ybTYrU1FjRTRrZXVXSmc4b0NFVkhGSWVFanB0T1NhTGE2eW9IeHdKMDBIbGIxTERpQ2drc0NCbGl6RlFPRlZJc1dKSElWYkRqQzF4UUNGSkVVSXdmK2tTREpGaFBNUm5CQ1I0VktDRFFnQzRndElNbjRpU1M5TzBJY2lVc2psaGgzd3hRY0JCZlZKUkZJVkhLUlFRaDRwWVBPQVN3M3dZSUIzQnV3UlJJRVJ0WFFBY3lvOWgxeHJKNmtneXd4RW5UVEJFRHhreGh1SUpmMHdTQ1o4ek9BaFNRY01RVU1NTmlDeUlua24vUkJEQ0ZQc01zc0FBMWhoeFFBTUZCSURFMGpZa0FGclBKSkV3Qm8zQUJuQ0FvY0FZTWt5eTFnQ2dBOHVJS0VERWtMc1poaUlJcnpBeHhRaHlGRUZTVzZjY0lJYkpHVVFKaE0wNVBBZ1hDQUdFQWdnZkN6QVNFa2dMTEFBQ0NXSklRUU5Kd2pTd0psUmt0U0JFbXBJWWRJYmhyNWhrZ3FqQ0lLS1pwR1NGTUFFSnhWNnFGS1BnbXFmVElyY2NJTWlRTEVrcUZJMElJQVFUYXloNGlSVGNycENKOUt2d0FZcjdMREVGbXZzc2NnbXEreXlEd1VFQUNINUJBVUtBTjRBTEEwQURRQVlBQm9BQUFqL0FMMEpIRWpRMjQ4U0pYNFVYTWhRNEJGcjFvNDBYTWlpSUk0RUNYQVVMUE9nWUFka0ZpUVFKSUtSQ0VGZ0dpcjRHQmpBa0o4NmZhd01mSUx4eVVBZ2dBb1VjREZCb0lndmRVeXNNQ1BUMjVNd1lXeDZnd1dwd0pJQ1RMSUlKTENCVlNhaFpqSjQrM0xzMkJkdkVsWTRMUUNKU3NFb2ZWYVlnRkdwQVFzalJsZ0VrRFFXRHcrR1Evb2t3Q09qSUlNbU9nRUJtWWlvVXF5S0d6c3BFem14c2NBR0JSSHA4SFdpQlNWampoZHljTURaUVpzak16SVRiTkdtY3h0Vm9VVUxsRUNqeFFrT0hKVDBWRTE3SUlITVpDS05RRXp3d1FZc0hTWktVZURneklpRkVqU01JVUdHNFFZRkplUmdpc1RBMjRZTkFrZU1xWUNBaEFlQ0FBNUJhL0VTbzBTTjd6M2l4T25oclFNSkJOd3RvQmc0UVFtb0dGNXFiTGlOZ1FzWERBSjU4QUo4R3ZRUXdHTTVPSElHRjlnSmhJRUNDZ0Fva0FvV2FLREREQU1NTkUwVFJXZzFFQjBRMGtHUUR6THdNTWRDSFJIMFlJUUxaWmlaQURYVUlFQnRCS21BQVFZcVRCUVFBQ0g1QkFVS0FONEFMQTBBRFFBYUFCb0FBQWovQUwwSkhFalFHNmRuenpnVlhNaVFZSXNRSVZvMGJEaWhZSW9JRVZJVUZCR0FZYlZLYWhRT0xJR3hCTUVoRUNpZ1dCZ0lqN01GVlFibXdaaG5ZQmNUajBoSld2aUN6NVFRY21KNnl4TXFWRTF2WFJyOStYQkZTSm1DYTI2RStMbmdrTGRXVDU2MDhyWm0wVkk3VG40d1pMUmdhcVppQXliSWtER2hnWnBFSCt4RUdER1IwYUJWYkRRZEtHamtVU0lUY0NZS1ZORkpFOE1zcnJhc0VjeDQ0QUNHYUNEZ2V1TkdVYklHZ2g5c1laTkFTNWd6UDBBc0dMM2dCZ2NzZ3BzRUEzT2hkVE1ZSUc2UU5rMTNZaE5SckZ1RFNTQ21sNXMzSUVEazZEaFJoQTBZSDdUQVlJTzZjVUVDemxITWlQTEFlVU5FTm1MUUdHSjlZUVliU0pqRVZTZ2tNRU9HN2g2RUlOSHhTa2dRYjBBdVhRTGkvRUVPR2t5UXVEanZ6Y0NPSFFaWUo4Z0pOQWdoeGtBR0NDQkFnTTZoSXNnb0toQkVnWUlVZE5jQWNRZ3F5R0IzQmFrQkFRUnFjTGhRRUVrazhaNWdBUUVBSWZrRUJRb0EzZ0FzRFFBTkFCb0FHQUFBQ1A4QXZRa2NTTkNiR0RkdXhCUmN5SkFnSlVlT0tEVmsyT0JCd1JZT0hMUW95S0xoTUV0Rk1oQThrZkVFUVFrV2tIVW8yQ0RIa1ROY3BBemtrSkhEUUN0OTZ2Z3hGSURnQkNXZ1luaXBJZE1iaDFLbGJIcXpZbWFGaVRwZlJCQUVjQWlLbHhnbEZKRHhwa1NWS2lYZU1qUTFrWW5WQmdJTEpYQXBJUWVURVlHYk5ua2JVQVNHaVJWOW9remNvTURCbVRRRkQ4akFrNkRQa0lrQ3lSZ0J2SkJGckVxSUVBOWtJSm1oanhmQzZDQ0FBR1FBNHA5SGFCR0Jka0lDQmdXb0ZkU0FvbmVpRVQ5aEVzaE9nQU5EamRTcld6ZDhIVnMyTVJ5ZkJHQ2dnd0hES2Nrc3ZqeDVRZ1RIRVNxVkYxS3UzQUhMQm9aWkxGbTRJNWtNaVRFYUpCUmlaSkNqUUFGQXRTWjZJSUdnd3BnUkJRTjRLckNrd0NRZ0RGRllhSS9neGNxQ1ZheEFYd0dRUUVkUUFEMW9VRUYvYUFEQUVDeTZETWhFRmdRTk1JTU9HbGlnQW1JOGFHR2VDeE1VTkFjUE12Z2dHUUZkYUxCREVBeDVGcDAzWllRNFVFQUFJZmtFQlFvQTNnQXNEUUFOQUJvQUdnQUFDUDhBdlFrY1NORGJKd1FJUGhWY3lKQ2dvaE1uRkRWa09DQkFRUkFMRm9Bb09LRWhxaDZqVkJCOGsvRU5RVTVxS2xWYktJZ0REU0ZpQm1MVU9MREtBbWQ0QWhWOGtJTUdFeVF1TWdnRWNlUEdSbTgvNUlTWXd1ZkZRZzlDWHVrQTZzTmJFdzRjbW5oREU0UElsQkEzMWpETTRBSUpreGl4R0FRWU1jSmlrMVdZUWl4Z05ER0RqVUUwcUN6VXRHclZJTG9UdlJFcVJPVUJRMDJkUkFaZUxKQUJRMEpGa2xBd3NNWFU0Z0E1VHFRb3dRdUttQ1FDUWd1QVlFTkNZQmxFbkVSWUhTRUZCUWlpSWV6WUVMZ1FrVkNzblhnSnNzZkFaQU04R2dSK2dDMUZuaElwT0ZSaHpMdzV3VWl0eERwZmFPVFJyVVZkcGovbzBlTkJneTJKUHZ4U2FRVEhPYk5mdjVoNWs3TG96d2M3VG40MGgzSGxDZ3lCWFJyWitYQkZTQm5tSDF4d3dRY0R3ZUhFRmFSSTBwd1dBbW94RUFCUlFQQUZDdk1KZUI5QkloaldIQnRnZ01IR2RBdGhrVUFDV0N3V0VBQWgrUVFGQ2dEZUFDd1BBQTBBR0FBYUFBQUkvd0M5Q1J3NE1JZ25UMEVJS2x5b1VBQVhMZ0lZU2xTSVFZRUNEQW9mTkZBNFI0OE1Id1RwV0tSRE1FTVJTOE1HRHBpaFE0TUZGUU1yWGh3b2hjdVpJemsyZWd2UVEwTUZCQzg4Q01SUW93WkdiMUpxZUlrQlNzbUVnU2dzSVBoSm9vTzNVMUNnblBKR1JrR0pHRjZnSEFKQUVJM1VDbkhTQ0l3U3hSdURTSmprbE9BaWdhRUhFbkZTM1ZrNDRvd0RCUnNtZGtpemwyRWFJMlFtQ2p5Z3VMRmpnY1lvdFRqaFN3ZWl4d05uSEduam9MTUREcGdGemxERnVYT2JGcUc5VFZEQ2djT0pGalRxRWh3d2tXempPd1prWlZrb1FoTzNEQk5yQVNwUUlBY0RnZ2RrNEVuUXh3cERJSk1LTENuZ0tVQ0FUWnNDRENnQ3c4UUtNME1VVW0rQkpMM0FwQi9lREV5YVpNQmJCak1ydkxQYVFFQmdGaWJsZFFFUmlFT2FOQndDV1FHZkNYVjhJWUpBRTdoQW5CWThEUFJFQWdrOE1kQVExTlRoaHlFQkZMU0RCbDNVSnhBUkVCSkJrQVFXR0dLTFFoT1VvUkFPRUFKSUVBc1pPblpFR0dFY2tScEJWT0NBQXhXTkJRUUFJZmtFQlFvQTNnQXNEUUFOQUJvQUdnQUFDUDhBdlFrY1NOQWJpa0NCVUJSY3lKRGduaDA3OWpTY1dOQ0FBQUVHQ2dZWVFMRWdoWXNVQ0tvWTFRTlZ4NEVXTVE0VUk0UUdCMEVuQlZLQUFDR2t0d3d1a0RDaGtlTkJURDB1WE9qeFJzaEdOaDJ2aEhpSTZhMkJCQWtOdkcwYXhBU0ppd3hNRjBhaE5NZ0cxcXdGSDFBcFJBZ3MyQjlud21oSndHYUx6NGtOa2lseTh3WVhCRFF3bWwzWUN5WllFNHBZT054WVFIZ0JpQVJnOWw0QUkrcnZ4QkdDQzk4QWdZVU5EQzBmWU5nUVFURkFEaEFnM3JqcEpZWWhnNGtFRHNSY1kyaGJReDZ5VkhUc3N1aldJeU1MWi9ESk5PakhSRGlOL254SXRLVkJneEVqb3M3YU5TVkVETjhMZnppeDgrSFBJaW5lY3BVcWxjdmJvUVVobXQ5YVdGT3dqSkFySCt3MDZpSXdSWWdRS1FSV2tST2V6NHVGa2toZGNRSm5ZSjRJRWVReEVDTUw4QUZJSUF1aDhBVUVVUUF3VUFrQWxrQ1FGR29vMFFGREQzQkdVQW9BeGtmUUJHQmQ0NFFUMTVoVlVCVXBwRkJGUndFQkFDSDVCQVVLQU40QUxBMEFEd0FhQUJnQUFBai9BTDBKOVBhZ3pNQ0RDQk1pOUZGQkF6Q0ZDMlhvbVlOd2dvc0NCUUFCZ1NoUWhRVU5PbVlNT0ppRlNZRWxCU0RCZ3VqaEJZS0dQUUlncEFMcFpJRVZWUkoySVBFU2dRVVVDbm5nc1hsSjVzRVJZeXI0Uk1NUkNDQ00zUmdnbEpBcURna1BIQVZLVU5iSllNSTdhVHBrSGRnZzZ3R0ZFazVBSTBMcmlKSUpXUWNBZ1lDQWpyQVhQbkFrMkpzZ2pCOGpXYU5BcWFHZ3NBSU1PSWp4OVF1WW8yRENoV3Rnb0hJRUI1RW5UNzZ3R0hzS0F3WTZHQVI4R2t1YVk0WmloVFlqWkRGQ0VOYXNWdm9rd0NQajdORXpEaFJJNFRqRXpBb1RNSXFNaEFQSEc0TkltT1NVVUxBaElZRU5ySDZ2TUpQQlc1RVVLWXA0STZPZ1JBd3ZVQTRCV3pnbzRrc2RFOU90Q0d6aHlGRUxnVkpxZUlrQjZ1M0JBSWI4MUtFMlpDQUhCdzV3TU5BR1hKemhTQTVsSFdTTElSWkljTkFKQUo1d1VBWkZOREdOUWdHb05sQUxBTDUzMEFPbERVUkRHMjNRRUNKRUc3VFFRbk5aQlFRQU93PT1cIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQURRQUFBQTBDQVlBQUFERmVCdnJBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUIzUkpUVVVINEFJSkZnc1Rvcm5xSHdBQUFROUpSRUZVYU43dG1rME9oU0FNaE9XRnUzQTR6dVBoT0EydTNzWlFrUDVRb3NNU01mWmpwb1VtaGxycjhhYnhPMTQyQUFRZ0FBRUlRQUFDa09LSTNCZFRTczM1OHp6SnUxVE9PY3grcDVReXRUNXc3M0ozb0I2SUJHd1dTTVZ5TXpDYzlVdUJ1TUZaUVlrczl6UmZKSGsxYTdtb3ZVT3RBUDl6bGxZVFc2NFYzR2kzVzgrMUlYR3dTa3N4NXl5Q1FnRDZBdERUYW1WZHVsVVZHZ1c3OVRsRVZTc3FhR3BldStwRmkxMWFvWVNKNWF6UEZKY2Nra0pwcTZuVzRFbURvemJHcldQdHdVbGFDZmYyd1R1L3Ryb3BhT1RUY3FDUmNsSW9GNFVzb2R3c1o1Vmpyam5VZytLcXRIWDd3SUZ5QjlLMjNoWUtVVkFjMkcwc2R3K2VxMXpBanhjQUFoQ0FBQVFnQUFIb08wQVhiT09OV1oxVysyb0FBQUFBU1VWT1JLNUNZSUk9XCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCb0FBQUFhQ0FZQUFBQ3BTa3pPQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUFVdEpSRUZVZU5yczFVMG9CR0VjeDNFcnIwVmljU2MxT1NxSmNyYUtpd01YQjBsU2JqanN6WVdVbTZTMGU4RmVsbHlVS0tXVUhLUTR1R2hTWG5JZ1IyRkxNYjVQL1E5UDIrZ1o2OWt0TmYvNk5MUFAwK3h2bjMxZUp1SjVYbEVoS2hJRy9lOGd4M0gwai9Wb3hTc3U4ZW4zak91NnZ0OVZIT0RIVkdNTlR6akdCZTR4K0pzUmxSajZTM0dBTHV4aEgxR01ZMHVlVDlzSUdwR1FPY3hxN1FtY1loazd5SmlDVEgvZEFGNHduOVgrakVXWnQrNGdJeklGTmVJQkh6NTlOM0p0c0JGMGh4YlUrdlMxeS9YV1JsQUs1VmhGbWRiZWhqaXVjV1pqTWV4aVF4WkZKdzVSaHo0Skh2NXBQK1d5ajBZeGhTK01vUjlIZU1jMmhtd0ZxYU5qQ2Myb1FnVjZjWVZLSk5Ga0kwaXZOeG1acWduWlB6WFl6SnJEUHdmcGRZNUp1ZS9BUXI2Q1ZLMWpSZTZuMFpPdklGVXpPSkZUUGVmbEhhVFVxUkdUdVhvTTM3QmhrTEcrQlJnQXdHQmFoYk4rdFVZQUFBQUFTVVZPUks1Q1lJST1cIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQURRQUFBQTBDQVlBQUFERmVCdnJBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUIzUkpUVVVINEFJSkZnb01OcXJXcXdBQUFROUpSRUZVYU43dG1rME9oU0FNaE9XRnUzQTR6dVBoT0EydTNzWlFrUDVRb3NNU01mWmpwb1VtaGxycjhhYnhPMTQyQUFRZ0FBRUlRQUFDa09LSTNCZFRTczM1OHp6SnUxVE9PY3grcDVReXRUNXc3M0ozb0I2SUJHd1dTTVZ5TXpDYzlVdUJ1TUZaUVlrczl6UmZKSGsxYTdtb3ZVT3RBUDl6bGxZVFc2NFYzR2kzVzgrMUlYR3dTa3N4NXl5Q1FnRDZBdERUYW1WZHVsVVZHZ1c3OVRsRVZTc3FhR3BldStwRmkxMWFvWVNKNWF6UEZKY2Nra0pwcTZuVzRFbURvemJHcldQdHdVbGFDZmYyd1R1L3Ryb3BhT1RUY3FDUmNsSW9GNFVzb2R3c1o1Vmpyam5VZytLcXRIWDd3SUZ5QjlLMjNoWUtVVkFjMkcwc2R3K2VxMXpBanhjQUFoQ0FBQVFnQUFIb08wQVhiT09OV1oxVysyb0FBQUFBU1VWT1JLNUNZSUk9XCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFEUUFBQUEwQ0FZQUFBREZlQnZyQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUFxWkpSRUZVZU5yc21WMUlGRkVVeDNldHlJb3lxVXlLcUlka3M1ZlFIc1MwRHlvS2drZ1R4SHF0UVBwNGtCQUZQNktlOGtHVXZpZ1FBck9NZ3Q2aVJBZ0pFaFFoZXJFMlFxR0lTTE1vMUFTcjdYL2dEQnd1TTdxekx1NFp1UWQrY08rWnViUDhaKzY5NTV5NzRWZ3NGbHBJbGhaYVlHWUZXVUZXa0JWa0JWbEJWbEFTYlhHaUF5T1JpTmVscFdBL3lBT3J3RmN3RExyQmhOL2ZpVWFqOHlQSXhWYURlbkNHaFpnMkJlNkRCdkJGKzVUYkRkNkNpeDVpeU5MQktmQU9sR29XVkFDNlFMYmgvd2o2d1FmRFQ0SWZneEtOZ3RhQ0oyQ1o4RDBFdVdBemk4M2g5aTN3ais5WkJOcjVtaXBCZFdDRDZGZUJFenl0eks5MURsU0F2K3hiQ1pvMENjb0VsYUxmQmxwbkdVTlQ3YkxvMDdUYnBrWFFZVjdvSVg3cmpYR09hd2JmdVIwR3g3UUl5aGZ0UGg5YjhTVEhKTWZ5dEFqS0V1MGhuMk9IUlh1OUZrRy9SSHU1ejdIcG92MVRpNkRQSHRNdkh0dnA4WnlVQ3VvVjdTM2dRSnpqYUZmYkpmb3Z0QWg2WldRQjEwREdMR09XZ05zY1dKM3AxcVZGRUVYOVM2Sy9IVHlkWVpFN0tjOWU0V3NCNHlyS0I3Wk9VQWFPYzcrSXY5b2Q4SXpYUnhaUHg3T2NLam4yR2x4TmRxWVFUdlFvV05SREt6aXVGUHA4QkwyRWwyQXNtZlZRTXJKdEt0b09naHZnajQ5eDEva0xIdFZZRDFIMHZ3QjJnSnZnazNIOUcrZ0FSOFJHc3BHcjI3dGdrNVkxWk5vZ09NK3M0NHlhRnYySXVJZHFwSzJpdndZOEFQdEVKcTd5a0dTVVU2S1JHZElleDRxTkxEeFFwejYwMVQ5MzhkZnlXZ3ljSUpwV0oxMFNXZ3EyOSthYXJLYnFYTzRIYjl1VGhqK2JTL08wb0FraWV3Tk91L2dQZ1pvZ0NuSXlqUllYL3hVamdRMk1JTEpxME9NU1R0cTVSQStjSU5va3lsMkNjV1lpY1ZMTFlmMG9ieEpUM0gvUGdYWTYxWm5DWEd3QTdPRXk1Qkg0UGEvWnRsYXpmM2haUVZhUUZXUUZXVUZXa0JYa2JmOEZHQUJkQW54MFo2SUtvUUFBQUFCSlJVNUVya0pnZ2c9PVwiIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBbGdBQUFBOENBWUFBQUM2bk1TNUFBQUFCSE5DU1ZRSUNBZ0lmQWhraUFBQUFBbHdTRmx6QUFBTjF3QUFEZGNCUWlpYmVBQUFBQmwwUlZoMFUyOW1kSGRoY21VQWQzZDNMbWx1YTNOallYQmxMbTl5WjV2dVBCb0FBQTE2U1VSQlZIaWM3ZDEvakJ4bmVRZnc3ek56dm90ZG4rOXNWUWt4b1JLb2FtbUJxcXBiazZ1VDVtTGZ2SFBuNDJ5bjFWRlJWQ0Vob0ZINUlZcG9TYVVDS2kxTmNHa2NmcmJDVlJGS0V3RzJhSExuODNwbUx2WTJDVHFUMUFtQ09CRTBFT1Q0QjBuQlB3L3NuYjJkcDMvc0xyNnM3N2k5MjNkdWQvYStIOG55N3R6TW84ZjNldWQ5OXAxMzNnR0lpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpRllHYVhZQ1JFVFVQTVlZcldlL01BelpYMlFRMjdkNU9wcWRBQkZST3hnWkdWbHo1Y3FWcnp1T2MxOFFCSlBOem9mc1l2dlNZclZjZ1RWZnRaMmw2bnBnWU9EWEhNYzVvS29ISGNmWkhRVEIyV2JuUkVUcEdSa1pXVk1vRkE2SXlPMnF1dFgzL1IxWjY0VG5POGZXT3dMU3p0aSttU0tEZzRNM2wwcWxuU0p5RzRDYkFGd1A0QnlBbHdFOHBhb1BYM2ZkZGNINCtQalAwMHlrNVFxc3JEUEd2QVpBSHNCclJlUk5xdnBlWTh4L2lNZzlRUkNjYVhKNlpJSHYreHRVZFJlQUhRQmVqL0lIR0FCT0FuaE9STVk2T2pvZW1waVlPTmUwSkMzelBNODRqak9xcXJmaTZyLzNSUUNQQWRnWGhtSFV2T3lhYTNSMDFMMXc0Y0pCQUxkVk5xMVcxVEhQODd3b2lyN1p6TnlvY1d6ZjdQQThiNHVJN0U2UzVBOUZycWtuYjZqOGVaT0l2S05RS1B6VTkvMS9kaHpudmx3dVYwZ2puNVliRmFwVzA5VnF1L1o5Szl1MmJkc05ydXZtVWU1MGF4VUFmTVYxM1gvSTVYSW5semN6ZTJ4LzI4bEN1MWIxOWZXdDd1N3UvaENBdndHd2JvSGRMNmpxN3VucDZUMVRVMU9YbHlHOVZBd09EdjVta2lSN0FkeTZ3SzZQbGtxbGR6L3l5Q1BmWDQ2OGJCa2FHdXFhbVptNUU4RGJSZVFOQU5Zc2NNaUxJckkxQ0lMbloyODB4cndId0wraGNrNFZrYWNCRExUUzZIVmFJeFd0L0JsbSt6YXVsZHUzYXRPbVRhczJiTmp3V1JHNXM3THBsS3ArVlVRT3VxNzcvYlZyMTc1ODl1elo5U0t5MFhHY0FWVWRGWkUvcU94N3pIWGRYV24weXkzMWk2c013LzRNeUY2QlpZeTVYbFdQaU1odkw3QnJyS3BmY3h6bkU3VWY0aXhZcVFXVzUza2JBVHcwNjBOWnIyOG5TYkp6Y25MeVJCcDVwY256dk50RTVDRUF2WFVlY2c3QXJqQU1IMDB4TFd1R2hvWnVLcFZLRXdCK3A4NURYblJkOS9aY0x2Y0RBT2p2Nzc4dW44OFhBQ2h3dFJNV2tXK2p4VHBmWU9WMXdHeGZPMXExZmF2Nit2cFdyMXUzYmx4VnR3SDR1YXIrL2ZUMDlPY1crbUpyakJrQmNDK0FYd2R3Qm9BSncvQVptN20xekMrdVVseU5BOWc2MTg5YnVaSDcrL3QvdGJPejh3aUFOeTdpc0tLcWZ0VjEzVThlT25Ub2UybmxadHRLTExBcUorcWpBRjY5eEJBbloyWm1iajU4K1BBcG0zbWxxVEp5ZFJUWEZsZEhBVXhWWHZjQnVMbm01K2RVOWMxUkZQMXYyamsyWW1ob3FLdFVLajJCK2p2ZkUwbVMzRDQ1T2ZsRDRPcWNIQURQaDJINEY2aDB3cDdudmExWUxPYnkrZno1ZERLbmVyQjlWd3p4ZmY4QlZYMGJnRk1BZG9aaGVLemVnNGVIaDljWGk4V3ZBZkFBdk9DNjdwdHp1ZHovV1V2T1ZxQkdWTzdPbUJDUi92bjJhZFdPdUwrL3Y3ZXpzM01Td0tZbGhrZ0FIQlNSandkQjhKVEYxRkt4MGdxc3ltWEJ4d0g4WG9PaC9pZU80MXZ6K2Z3VkczbWx6Ump6S0Y1NVdmQThnRDhMd3pBM2V6L1A4N2FMeUlNQWVxcmJWRFVmUmRIdHk1UHAwaGhqUGdEZ005WDNxbnEvaU53UFlNNVJDZGQxVDFSUHZMTTYzK3EvY2Uvc1RwaWFqKzI3TXZpK2Y2ZXEvaXVBaTY3cjl1Vnl1V2NYRzZOU2pCOEIwS2VxRTFFVXZjVldmazN2M09ZWnVYb3NqdVB0K1h4K3VsbDUxV05nWUtCSFJLSWxYRGFhUzZLcSs2TW8rbE1Mc1ZLejBnb3N6L00rS2lLZnNCVHViOE13dk1kU3JOUVlZendBWWMzbTdiWEZWWlh2KzhPcWVtRDJObFVkaUtMb2tiUnliSlF4NWxzQU5sZmVmaTRNd3cvVWVkeXZBRGdJNEk5bWJ4ZVJEd2RCOEM5MnMweUhyYzl3SzM5MjJiNk5hK1gyQllEKy92NjFuWjJkejZNOGNYMDBETVA5UzQyMWZmdjJWODNNekR3SG9OZm11Y3V4RVdTcHNseGNqWXlNckhFY1o4eFNjUVVBam9qOHZxVllaSUh2K3h0RTVNTVdROTQxUER5ODNtSzhWSWpJVzJzMkhaMnZ1QUtBSUFnbUFEeXhRSXhXTTN1dTVKNTZEaGdaR1ZrRFlCdzFuUytBcHdCODJWSmVaQWZidDgydFdyWHFQU2dYVjQ4MVVsd0J3TUdEQjMrc3FuY0RnSWg4MUVaK1FCTUxyS3dYVjVVaDVOb1BZcU15TittOW5hbnFIVmo0YnNIRjZJbmplS2ZGZUttb0xNVXcrLzJDdDZLTHlPTTFtMngvTm14YlczMFJodUdQRnRwNWpzdEdWVStKaU5kcUU1N3JFWWFoekI2bFdPejdGc2YyYmUvMmhZajhTZVhsdlRiaUZZdkZMd0s0RE9BV1k4ejFObUkycGNES2NuRTFPanJhV1NnVTl1UGFEMkxEUktTbEp3YXZRQ08yQTRySUR0c3hVN0J4c1Flb2F1MkplYWszQkRUREw3MmtVbS9uNjNuZWFGb0pVa1BZdm0zRzkvME5LTjlnYzdtcnE2dDJPc09TVkdxUFNRQ3VpQXphaUxuc0JWYVdpeXNBdUhEaHduNEFRMm5FVnRVZnBCR1hsdXdOS2NSY2FCbVBWcERNZmlNaVcrbzRwbmFmWk02OU1tWXhuVzlsc2o5bENOczNtMVQxdFNqWEw4OWFYbzM5V0NYKzYyd0VXOVlDSyt2RlZjWExLY2JtSmNMVzhxb1VZbVpoWk9mRm12YzNlNTYzZmI2ZGpURnZ3ZFVKeGZQRnlKeDZPMS9mOTk5YTZYejVaSXdNWWZ0bTJvMlZ2NjArSFVWRVRsZGVMbm9VZnk3TFZtQzFTWEVGVmYwWWdGU2VYNVFrQ1F1czl0ZnlJenNpY25TT2JRLzZ2ajljdTcxU1hQMW5QVEd5cGxBbzVGRFQrYXJxazNFY2I1czlKMGRWMmZsbUVOczN1MFJFZ1RtbkpqUmtWandyZDJJdXkzK2FkaW11QUNDS290UEdtQzhBK0d2TG9aT1ptWmtYTE1la0JvaklhVlg5RGN0aFR5KzhTM01sU1RJdUl1K3EyZHlqcWdlTU1VOEErQ1lBVWRVdEFPYThpelpKa3ZHMDgxd0cxOXhONWpqTzRCeUxUTHJMbFJCWnhmYk5yak1BSUNJM0xyVGpJbFZIcnF5TWpLVStndFZPeFZWVkhNZi9oSGtXckd2QWlhd3NRcmxTcU9xaUY2MXJSa3piT2pvNkFzeGZDRzRHOEZjQVB2aExsaWg1cVZnc1dwbDQya0l5ZXpjWjFZWHRteTAvUXZscXdHOVYxaTZ6WlJNQWlJaVYrZENwRmxqdFdGd0JRT1VienFjdGgrWGx3ZFpqZlJSR1JNWnN4N1N0OG1UNXp6Y1E0cjUyK0xLZ3FwOVMxVThCK0dUdFpTUEtQclp2ZGxYYWFnckFhbFUxTm1KV0NyVnRBRXFPNHh5eUVUTzFTNFR0V2x4VlhicDA2Yjd1N3U2L0JIQ1RqWGlxeWdLcnhZaklRNnA2TDJZOUJxWkI1MWV0V3RYeUJSWUF1Szc3aFZLcDlINWNuVXhhcnpPdTYzNHhqWnlXV3hSRmR6VTdCMG9QMnpmYlZQVWJJckxGY1p3UEFmaXZSdU9KeVB0VWRiV3E1bTA5anpDVkVheDJMNjRBWUdwcTZyS3EvcU90ZUk3anNNQnFNVUVRbkZYVjNiYmlxZXJkRXhNVDUyekZTMU11bDdzb0lvdnVnRVRrSTdsYzdtSWFPUkVSVlJXTHhTOEJlRWxWYi9GOXY2RW5SL2krZjZPcTNnVUFqdVBZZWpTYXZRTExHS1BWUDRWQzRXZDRaWEYxcEt1cmE3QmRpcXVxM3Q3ZWZ3ZnduS1Z3TExCYTBQVDA5QjVVMWtacDBCUEZZdkd6RnVJc215QUk3a2Y1dVd6MU9oZ0V3VFYzRkxhb1g1eUxLb3NXTGtuTnNaY2F5b2hzWXZ1MnVVbzk4VEVBVU5XOXZ1OHZhZDNDb2FHaExsWDlCb0JlQU9OQkVCeXhsZU55TE5Qd1dCekhPeXd2QnRZUzl1M2JWMUxWajFzS3h3S3JCVTFOVFYxMlhYY1hnRk1OaERtcHFuZGtjRjZTaXNpZkF6aFJ4NzZuNGpoK0J5emQzcndNamxkZnFPcVNWK3hQa21UMnl2ekg1OTJSbGh2YmR3VUl3M0F2Z0FjQXJGUFZjSEJ3Y0ZIUEJ2WjlmME9wVkRxQThxcndMOFJ4L0U2YitWa3ZzR3FmWjlST2x3WG5Fa1hSZmdEZmFqQ01Ycng0OFljMjhpSDdjcm5jU1ZYZHJLcFBMdlpZRVhrNlNaSXRVUlMxL1BJTWN3bUM0S3pqT0NNQWFtOWRuKzBTZ0ozNWZQNG55NVNXRFEvTWVyM0hHTFBvVHRnWU15SWl2M2dPbXFwbVpmUnVKV0Q3cmd3YXgvRzdVSDdFemNZa1NmN2JHSE5YWDEvZjZvVU85SDEvWitXY1BvRHlzZ3c3YkovRFVsOEhxNTJMcXdvVmtiOVQxV2lSeDhVb1gxNThSbFdmbkpxYXVweENibVJKRkVXbisvcjZidXZ1N3Y0Z2dJOWc0WW52NTBYa25rS2g4SmtNamx5OXdxRkRoNzdqKy82b3FvNEJxRDF4WFJhUlB3NkN3TVpsMUdYanV1NlhTcVhTT3dIOExvRDFBTWFNTWVjQTFQdEY1M1dWNHdDVUMrbWVucDY5OWpPbHBXRDdyaHo1ZlA1S2YzLy9VRmRYMTMycStsNEFkM2QzZDcvZkdQTjFFWmxRMWUvMTlQUzhkUGJzMmZXdTY5NGtJZ09xT3FxcW00RHk0cktsVXVtT3c0Y1BOM0tWWWs3V1ZrRTF4c3g1YVNCTFQrZHVoREVtUXJrU25zc1psSWVYbnhXUlk2cDZQSTdqNDFudmVGZXE0ZUhoOVhFYzd4U1JuUUJlajZ0M2twNUV1V2grT0k3amgrZFlzRERUZk4vZnJLcmpBS3BQbXY5cGtpUzdKaWNuSDI5bVhrdTFkZXZXVjNkMGRCeEF1Uk5lTWhGNXVsZ3NqcVJ4Z2s3RGZPZnF4V3IxY3p2YnR6R3QzcjV6R1J3YzdGUFYzYXA2eTBMN2lzaFBBSHg2M2JwMWUvYnQyeGVua1E4TExFdU1NWnRFNUpDcWZoZkFNd0NlU1pMa08ydldyRGsrTmpiR3laSFVGanpQMnlnaW53Y0FWWDFmVmk5OVZvMk9qbmFlUDMvKzNTTHlkZ0J2Qk5CZDU2R1hBSHhYVlIvczdlM2RtOVlKT2cwcnFRTm0reTVkRnRwM0htS00yUXhnRjhxcjliOEd3QTBBemdINE1ZQmpJakoyOGVMRmtGZU9pSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWlJaUlpSWhXZ3Y4SG5mZno0ZG13WTljQUFBQUFTVVZPUks1Q1lJST1cIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQVN3QUFBQWVDQVlBQUFDV3VDTm5BQUFBQkhOQ1NWUUlDQWdJZkFoa2lBQUFBQWx3U0ZsekFBQUc3QUFBQnV3QkhuVTROUUFBQUJsMFJWaDBVMjltZEhkaGNtVUFkM2QzTG1sdWEzTmpZWEJsTG05eVo1dnVQQm9BQUFidlNVUkJWSGljN2R0ZGJCeFhGUWZ3LzluWjNTUkt3QVA3VUZGVVFPb0hxR25Vb0VBb05naFg5dHl4VmNwRDFYMEorV2dpVVFtcGZVQjVBQ1NnRzFxSklLQVNxQklVSWF1cUFiV3NlSWxxYitiT1dIVlI2eTBGS1pCRXFkSVVRUk9JUkVHUngzRkZ2Ui8zOE9EWnN0M2EzbkU4WXdmditUMnQ3aHpkTTNmbGUvYk9uV3RBQ0NHRUVFSUlJWVFRUWdnaGhCQkNDQ0dFRUVJSUljUmEwRWJmZ0JEZEZJdEZLd3pEQWEzMTc1THVXeWxWQXZCSVIvTXhyWFVwNlZ4eDlkcDRWeU9iVkVkS0tXNTkxbG9uWGdpVlVnNkFIelB6azlsczltZVZTbVVoNlJ6WGt6MTc5dVFLaGNJZ00rOENBQ0k2VTZ2Vm5wK2VubTZrblh0NGVQaXVUQ2J6V1FBd3hsU0RJSGc1N1p3cm9EQU1ud0t3ejNYZEJ6elBHMDhoeHpzVE5wclFHMmxUanRkMTNXRm1mZ2hBUDRBK0FKY0FURmlXOVlOS3BmTDN1UDBrVWxpaVg0U0cxcHFVVXB4MHdYSmQ5L1BNWEFHd1BXcTZ5TXlQejgvUC83eGFyZjRueVZ3dDdRVjRKV2tVNTJpOFl3QnU2Ymgwd1JoekpBaUNGNVBPQ1FDRGc0TjJQcC8vTllEUmprdVR4cGg5UVJDRVNlWXJGb3Y1dWJtNVI1bjVBSUFQdFYxYVlPYjdCZ1lHVHBaS0plTzY3bEZtUHNiTTkvaSsvOEphOHk2enlsaE9ZcXVQWGhzdkFKUktwY3pNek13VEFJYUo2TEZHbytITnpzNWVLUlFLTnhQUkFXYitDb0FqV3V2bjR2UzM1c2tXRmFzeEFBZGJiVWxPWXFWVVB3QVB3STRsTHI4SjRLZVdaVDFlcVZUbWtzb1o1ZDJRZ2hVVkt4L0FsbVZDRnBoNXlQZjlsNUxNQ3dCS3FVa3NGcXN6UkhRY0FKajVHd0IyTWZPRTcvdGZUREtmNHpqSGllanJBRTRDdU5ocVorYmYyclk5RlliaEdCSDkyL084bzQ3ajNPajcvdVVrODYrM1hoc3ZBQ2lsSG1QbWdXM2J0bjNweElrVFZ6dXZqNHlNZk5vWTg1d3haaVFJZ2xQZCtsdlRaSXVxNXhpQVF3Q2U2ZXZyMjE4dWw1dHI2Yk5kOUdpaUFieXZTK2hGcmZWSGs4b0xiRXpCaWg0RHorRzlLNnQzSWFMWEZoWVdkaWI1ZUJoOTExVUE4d0J1MWxxL0NRQkRRME0zV0piMU9vQWRSUFFaei9OZVNTcW5VdW9mQUtwYTYvdmIyNk1md2FjQTdBZHdGY0NkV3V1L0pwVTN5bDFDOTFWSG9xdU5YaHZ2eU1qSXg0d3hyMWlXdGJOU3FmeHJ1VGpIY1I0QWNNajMvYnU3OVhuTmUxaHBGeXZIY1hZVDBRUzZGeXNBU0hSMXRWRUtoY0lndWhRckFHRG0yM0s1M0JjQVRDV1YyN0tzQVdZR2dQT3RZZ1VBVTFOVC8xUktuUWV3eHhqek9RQ0pGU3dBTndJNDI5N1F0bUxmRCtBdFpyNDNtODNPSjVpejNiR1UrbDFPVDQzWEdGTms1bWRYS2xZQVlOdjJlQmlHMzFkSzNhUzF2clJTYk9aYWJxUllMRnBwRmlzQUlLSnhBQitNR2Y1NmtyazMwTzY0Z1psTUpuWnNITXhzb284Zkh4b2F1cUhWSG4zK0JBQVFVYXhWNTdYcTJGNTRpNW52SWFKWG04MW1Zb1g1ZXRJRDQ5MUpSSC9zRmxRdWw1dEVkTW9ZYzN1MzJGVVhyTFl2T2JWaUJRRE0vTVFxd2k4a25YOGpFSkhwSHJYSUdKTm84V0RtMXNwcGgyVlpnZXU2KzVSU1g3WXNLOEQvWG5iOFBzbWNuZWJtNWg3RzR1Uzl5c3h1dE9IOFZRQzcwc3k3VVRiN2VJbUltVG5XbGdrelV5YVQ2ZnIzdjZxQzFmR0w4RXl0Vmp1UVJyRUNBTnUyZndIZzFUaXh6UHlYTk81aHZUSHo2VldFL3puSjNMN3Z6eEJSYTlQekRtYitGWUJmQXJnamFqdmQzOStmOXZHR0t3QUNaaDV0ZTZtd21jOEtidXJ4TXZPNVRDYnpxVzV4eFdMUkFyRGJzcXl1OHozMkh0WlN4U3JOTTBIbGNybnB1bTZKbVorTkViNHBIZ2xydGRyeitYeitBb0JidTRTZXI5ZnJhMzdkM1lFQmZCdkFrcStYbWZtYnBWSXA5Z3J3V25pZTl6U0FwOVBNY1QzWjdPUE5ack8vYVRRYWYxQktmYmQ5WDdSVEdJYUhtUGxjblBOWXNWWllTaWtPdzdBQjRDQXpqL2YxOWUxZmp3T01udWVWRWVNeEpKZkxiWXFDTlQwOTNUREdIQUd3MHFIWUJRQkgwdmorUGMrYllPYjNIRlJrNW5IZjl5ZVR6Z2ZnTWhGOXVFdk1UUUQrNzEvdlIzcHF2Sk9UazI4QWVCSkFlWFIwOVAxTHhiaXV1eGZBOXdCOExVNmZzVmRZclVPaHRtMGZUdXN4Y0FsTVJOK0t6aVV0NVNxQU0zdjM3cjAwT1puR2ZGcC9RUkM4NkRqT1VDYVRHV1BtMnpvdW44ZmlJYnVadFBMWDYvVUg4L244clFEdWlwcGVydGZyRDZhUkt5cU9SNVZTODFqaThaK0libWZtZ3dCK21FYis5ZFpyNHdXQS92NytSNnJWNmsrYXplWXB4M0VlemVWeUo3ZHYzMzVsZm43K2xrYWpjWkNaRHpQellkLzMveFNudjlnRnEzVXVhUjJMRlFEQTg3eEFLVlVCOEJFQVo2Tjluck5FZEVaci9UY0FyTFZPUEc4YUo5amo4bjMvcGNIQndaMWJ0bXg1NTE5em1QbDB2VjUvSWUyVjdmVDA5TnVqbzZOdXM5a2NBNEN0VzdjZTFscS9uVVl1MjdhL016czdDeUk2Z01WWC91L0N6SmVaK1VlMmJjYzlwYjFhWGM4bEpabXMxOFlMQU5FMndrT3U2OTRONE9GR28zRThETU1QQUhpRGlDYVkrWk9iNFlDc0VFSUlJWVFRUWdnaGhCQkNDQ0dFRUVJSUlZUVFRZ2doaEVqWWZ3R08rYjVkRk5zNE9nQUFBQUJKUlU1RXJrSmdnZz09XCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lJSE4wWVc1a1lXeHZibVU5SW01dklqOCtDanh6ZG1jS0lDQWdlRzFzYm5NNlpHTTlJbWgwZEhBNkx5OXdkWEpzTG05eVp5OWtZeTlsYkdWdFpXNTBjeTh4TGpFdklnb2dJQ0I0Yld4dWN6cGpZejBpYUhSMGNEb3ZMMk55WldGMGFYWmxZMjl0Ylc5dWN5NXZjbWN2Ym5Naklnb2dJQ0I0Yld4dWN6cHlaR1k5SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpFNU9Ua3ZNREl2TWpJdGNtUm1MWE41Ym5SaGVDMXVjeU1pQ2lBZ0lIaHRiRzV6T25OMlp6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lDaUFnSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUlLSUNBZ2VHMXNibk02ZUd4cGJtczlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5MekU1T1RrdmVHeHBibXNpQ2lBZ0lIaHRiRzV6T25OdlpHbHdiMlJwUFNKb2RIUndPaTh2YzI5a2FYQnZaR2t1YzI5MWNtTmxabTl5WjJVdWJtVjBMMFJVUkM5emIyUnBjRzlrYVMwd0xtUjBaQ0lLSUNBZ2VHMXNibk02YVc1cmMyTmhjR1U5SW1oMGRIQTZMeTkzZDNjdWFXNXJjMk5oY0dVdWIzSm5MMjVoYldWemNHRmpaWE12YVc1cmMyTmhjR1VpQ2lBZ0lIWnBaWGRDYjNnOUlqQWdNQ0EyTURBZ05qQWlDaUFnSUdobGFXZG9kRDBpTmpBaUNpQWdJSGRwWkhSb1BTSTJNREFpQ2lBZ0lHbGtQU0p6ZG1jME1qSTFJZ29nSUNCMlpYSnphVzl1UFNJeExqRWlDaUFnSUdsdWEzTmpZWEJsT25abGNuTnBiMjQ5SWpBdU9URWdjakV6TnpJMUlnb2dJQ0J6YjJScGNHOWthVHBrYjJOdVlXMWxQU0p6Y0hKcGRHVnphR1ZsZEM1emRtY2lDaUFnSUdsdWEzTmpZWEJsT21WNGNHOXlkQzFtYVd4bGJtRnRaVDBpTDJodmJXVXZabkIxWjJFdlpHVjJaV3h2Y0cxbGJuUXZkWEJ6ZEhKbFlXMHZhV05oY25SdkxreGxZV1pzWlhRdVpISmhkeTl6Y21NdmFXMWhaMlZ6TDNOd2NtbDBaWE5vWldWMExUSjRMbkJ1WnlJS0lDQWdhVzVyYzJOaGNHVTZaWGh3YjNKMExYaGtjR2s5SWprd0lnb2dJQ0JwYm10elkyRndaVHBsZUhCdmNuUXRlV1J3YVQwaU9UQWlQZ29nSUR4dFpYUmhaR0YwWVFvZ0lDQWdJR2xrUFNKdFpYUmhaR0YwWVRReU5UZ2lQZ29nSUNBZ1BISmtaanBTUkVZK0NpQWdJQ0FnSUR4all6cFhiM0pyQ2lBZ0lDQWdJQ0FnSUhKa1pqcGhZbTkxZEQwaUlqNEtJQ0FnSUNBZ0lDQThaR002Wm05eWJXRjBQbWx0WVdkbEwzTjJaeXQ0Yld3OEwyUmpPbVp2Y20xaGRENEtJQ0FnSUNBZ0lDQThaR002ZEhsd1pRb2dJQ0FnSUNBZ0lDQWdJSEprWmpweVpYTnZkWEpqWlQwaWFIUjBjRG92TDNCMWNtd3ViM0puTDJSakwyUmpiV2wwZVhCbEwxTjBhV3hzU1cxaFoyVWlJQzgrQ2lBZ0lDQWdJQ0FnUEdSak9uUnBkR3hsSUM4K0NpQWdJQ0FnSUR3dlkyTTZWMjl5YXo0S0lDQWdJRHd2Y21SbU9sSkVSajRLSUNBOEwyMWxkR0ZrWVhSaFBnb2dJRHhrWldaekNpQWdJQ0FnYVdROUltUmxabk0wTWpVMklpQXZQZ29nSUR4emIyUnBjRzlrYVRwdVlXMWxaSFpwWlhjS0lDQWdJQ0J3WVdkbFkyOXNiM0k5SWlObVptWm1abVlpQ2lBZ0lDQWdZbTl5WkdWeVkyOXNiM0k5SWlNMk5qWTJOallpQ2lBZ0lDQWdZbTl5WkdWeWIzQmhZMmwwZVQwaU1TSUtJQ0FnSUNCdlltcGxZM1IwYjJ4bGNtRnVZMlU5SWpFd0lnb2dJQ0FnSUdkeWFXUjBiMnhsY21GdVkyVTlJakV3SWdvZ0lDQWdJR2QxYVdSbGRHOXNaWEpoYm1ObFBTSXhNQ0lLSUNBZ0lDQnBibXR6WTJGd1pUcHdZV2RsYjNCaFkybDBlVDBpTUNJS0lDQWdJQ0JwYm10elkyRndaVHB3WVdkbGMyaGhaRzkzUFNJeUlnb2dJQ0FnSUdsdWEzTmpZWEJsT25kcGJtUnZkeTEzYVdSMGFEMGlNVGt5TUNJS0lDQWdJQ0JwYm10elkyRndaVHAzYVc1a2IzY3RhR1ZwWjJoMFBTSXhNRFUySWdvZ0lDQWdJR2xrUFNKdVlXMWxaSFpwWlhjME1qVTBJZ29nSUNBZ0lITm9iM2RuY21sa1BTSm1ZV3h6WlNJS0lDQWdJQ0JwYm10elkyRndaVHA2YjI5dFBTSXhMak14TURFNE5USWlDaUFnSUNBZ2FXNXJjMk5oY0dVNlkzZzlJakl6Tnk0MU5qa3lPQ0lLSUNBZ0lDQnBibXR6WTJGd1pUcGplVDBpTnk0eU5ERTVOakl4SWdvZ0lDQWdJR2x1YTNOallYQmxPbmRwYm1SdmR5MTRQU0l4T1RJd0lnb2dJQ0FnSUdsdWEzTmpZWEJsT25kcGJtUnZkeTE1UFNJeU5DSUtJQ0FnSUNCcGJtdHpZMkZ3WlRwM2FXNWtiM2N0YldGNGFXMXBlbVZrUFNJeElnb2dJQ0FnSUdsdWEzTmpZWEJsT21OMWNuSmxiblF0YkdGNVpYSTlJbk4yWnpReU1qVWlJQzgrQ2lBZ1BHY0tJQ0FnSUNCcFpEMGlaVzVoWW14bFpDSUtJQ0FnSUNCemRIbHNaVDBpWm1sc2JEb2pORFkwTmpRMk8yWnBiR3d0YjNCaFkybDBlVG94SWo0S0lDQWdJRHhuQ2lBZ0lDQWdJQ0JwWkQwaWNHOXNlV3hwYm1VaUNpQWdJQ0FnSUNCemRIbHNaVDBpWm1sc2JEb2pORFkwTmpRMk8yWnBiR3d0YjNCaFkybDBlVG94SWo0S0lDQWdJQ0FnUEhCaGRHZ0tJQ0FnSUNBZ0lDQWdaRDBpYlNBeE9Dd3pOaUF3TERZZ05pd3dJREFzTFRZZ0xUWXNNQ0I2SUcwZ05DdzBJQzB5TERBZ01Dd3RNaUF5TERBZ01Dd3lJSG9pQ2lBZ0lDQWdJQ0FnSUdsa1BTSndZWFJvTkRJeU9TSUtJQ0FnSUNBZ0lDQWdhVzVyYzJOaGNHVTZZMjl1Ym1WamRHOXlMV04xY25aaGRIVnlaVDBpTUNJS0lDQWdJQ0FnSUNBZ2MzUjViR1U5SW1acGJHdzZJelEyTkRZME5qdG1hV3hzTFc5d1lXTnBkSGs2TVNJZ0x6NEtJQ0FnSUNBZ1BIQmhkR2dLSUNBZ0lDQWdJQ0FnWkQwaWJTQXpOaXd4T0NBd0xEWWdOaXd3SURBc0xUWWdMVFlzTUNCNklHMGdOQ3cwSUMweUxEQWdNQ3d0TWlBeUxEQWdNQ3d5SUhvaUNpQWdJQ0FnSUNBZ0lHbGtQU0p3WVhSb05ESXpNU0lLSUNBZ0lDQWdJQ0FnYVc1cmMyTmhjR1U2WTI5dWJtVmpkRzl5TFdOMWNuWmhkSFZ5WlQwaU1DSUtJQ0FnSUNBZ0lDQWdjM1I1YkdVOUltWnBiR3c2SXpRMk5EWTBOanRtYVd4c0xXOXdZV05wZEhrNk1TSWdMejRLSUNBZ0lDQWdQSEJoZEdnS0lDQWdJQ0FnSUNBZ1pEMGliU0F5TXk0eE5ESXNNemt1TVRRMUlDMHlMakk0TlN3dE1pNHlPU0F4Tml3dE1UVXVPVGs0SURJdU1qZzFMREl1TWpnMUlIb2lDaUFnSUNBZ0lDQWdJR2xrUFNKd1lYUm9OREl6TXlJS0lDQWdJQ0FnSUNBZ2FXNXJjMk5oY0dVNlkyOXVibVZqZEc5eUxXTjFjblpoZEhWeVpUMGlNQ0lLSUNBZ0lDQWdJQ0FnYzNSNWJHVTlJbVpwYkd3Nkl6UTJORFkwTmp0bWFXeHNMVzl3WVdOcGRIazZNU0lnTHo0S0lDQWdJRHd2Wno0S0lDQWdJRHh3WVhSb0NpQWdJQ0FnSUNCcFpEMGljRzlzZVdkdmJpSUtJQ0FnSUNBZ0lHUTlJazBnTVRBd0xESTBMalUyTlNBNU55NDVNRFFzTXprdU16azFJRGd6TGpBM0xEUXlJRGMyTERJNExqYzNNeUE0Tmk0ME5qTXNNVGdnV2lJS0lDQWdJQ0FnSUdsdWEzTmpZWEJsT21OdmJtNWxZM1J2Y2kxamRYSjJZWFIxY21VOUlqQWlDaUFnSUNBZ0lDQnpkSGxzWlQwaVptbHNiRG9qTkRZME5qUTJPMlpwYkd3dGIzQmhZMmwwZVRveElpQXZQZ29nSUNBZ1BIQmhkR2dLSUNBZ0lDQWdJR2xrUFNKeVpXTjBZVzVuYkdVaUNpQWdJQ0FnSUNCa1BTSnRJREUwTUN3eU1DQXlNQ3d3SURBc01qQWdMVEl3TERBZ2VpSUtJQ0FnSUNBZ0lHbHVhM05qWVhCbE9tTnZibTVsWTNSdmNpMWpkWEoyWVhSMWNtVTlJakFpQ2lBZ0lDQWdJQ0J6ZEhsc1pUMGlabWxzYkRvak5EWTBOalEyTzJacGJHd3RiM0JoWTJsMGVUb3hJaUF2UGdvZ0lDQWdQSEJoZEdnS0lDQWdJQ0FnSUdsa1BTSmphWEpqYkdVaUNpQWdJQ0FnSUNCa1BTSnRJREl5TVN3ek1DQmpJREFzTmk0d056Z2dMVFF1T1RJMkxERXhJQzB4TVN3eE1TQXROaTR3TnpRc01DQXRNVEVzTFRRdU9USXlJQzB4TVN3dE1URWdNQ3d0Tmk0d056UWdOQzQ1TWpZc0xURXhJREV4TEMweE1TQTJMakEzTkN3d0lERXhMRFF1T1RJMklERXhMREV4SUhvaUNpQWdJQ0FnSUNCcGJtdHpZMkZ3WlRwamIyNXVaV04wYjNJdFkzVnlkbUYwZFhKbFBTSXdJZ29nSUNBZ0lDQWdjM1I1YkdVOUltWnBiR3c2SXpRMk5EWTBOanRtYVd4c0xXOXdZV05wZEhrNk1TSWdMejRLSUNBZ0lEeHdZWFJvQ2lBZ0lDQWdJQ0JwWkQwaWJXRnlhMlZ5SWdvZ0lDQWdJQ0FnWkQwaWJTQXlOekFzTVRrZ1l5QXROQzQ1TnpFc01DQXRPU3cwTGpBeU9TQXRPU3c1SURBc05DNDVOekVnTlM0d01ERXNNVElnT1N3eE5DQTBMakF3TVN3dE1pQTVMQzA1TGpBeU9TQTVMQzB4TkNBd0xDMDBMamszTVNBdE5DNHdNamtzTFRrZ0xUa3NMVGtnZWlCdElEQXNNVEl1TlNCaklDMHlMalE0TkN3d0lDMDBMalVzTFRJdU1ERTBJQzAwTGpVc0xUUXVOU0F3TEMweUxqUTROQ0F5TGpBeE5pd3ROQzQxSURRdU5Td3ROQzQxSURJdU5EZzFMREFnTkM0MUxESXVNREUySURRdU5TdzBMalVnTUN3eUxqUTROaUF0TWk0d01UVXNOQzQxSUMwMExqVXNOQzQxSUhvaUNpQWdJQ0FnSUNCcGJtdHpZMkZ3WlRwamIyNXVaV04wYjNJdFkzVnlkbUYwZFhKbFBTSXdJZ29nSUNBZ0lDQWdjM1I1YkdVOUltWnBiR3c2SXpRMk5EWTBOanRtYVd4c0xXOXdZV05wZEhrNk1TSWdMejRLSUNBZ0lEeG5DaUFnSUNBZ0lDQnBaRDBpWldScGRDSUtJQ0FnSUNBZ0lITjBlV3hsUFNKbWFXeHNPaU0wTmpRMk5EWTdabWxzYkMxdmNHRmphWFI1T2pFaVBnb2dJQ0FnSUNBOGNHRjBhQW9nSUNBZ0lDQWdJQ0JrUFNKdElETXpOeXd6TUM0eE5UWWdNQ3d3TGpRd055QXdMRFV1TmpBMElHTWdNQ3d4TGpZMU9DQXRNUzR6TkRRc015QXRNeXd6SUd3Z0xURXdMREFnWXlBdE1TNDJOVFVzTUNBdE15d3RNUzR6TkRJZ0xUTXNMVE1nYkNBd0xDMHhNQ0JqSURBc0xURXVOalUzSURFdU16UTFMQzB6SURNc0xUTWdiQ0EyTGpNME5Td3dJRE11TVRrc0xUTXVNVGNnTFRrdU5UTTFMREFnWXlBdE15NHpNVE1zTUNBdE5pd3lMalk0TnlBdE5pdzJJR3dnTUN3eE1DQmpJREFzTXk0ek1UTWdNaTQyT0Rjc05pQTJMRFlnYkNBeE1Dd3dJR01nTXk0ek1UUXNNQ0EyTEMweUxqWTROeUEyTEMwMklHd2dNQ3d0T0M0NE1Ea2dMVE1zTWk0NU5qZ2lDaUFnSUNBZ0lDQWdJR2xrUFNKd1lYUm9OREkwTUNJS0lDQWdJQ0FnSUNBZ2FXNXJjMk5oY0dVNlkyOXVibVZqZEc5eUxXTjFjblpoZEhWeVpUMGlNQ0lLSUNBZ0lDQWdJQ0FnYzNSNWJHVTlJbVpwYkd3Nkl6UTJORFkwTmp0bWFXeHNMVzl3WVdOcGRIazZNU0lnTHo0S0lDQWdJQ0FnUEhCaGRHZ0tJQ0FnSUNBZ0lDQWdaRDBpYlNBek16Z3VOeklzTWpRdU5qTTNJQzA0TGpnNU1pdzRMamc1TWlBdE1pNDRNamdzTUNBd0xDMHlMamd5T1NBNExqZzVMQzA0TGpnNUlIb2lDaUFnSUNBZ0lDQWdJR2xrUFNKd1lYUm9OREkwTWlJS0lDQWdJQ0FnSUNBZ2FXNXJjMk5oY0dVNlkyOXVibVZqZEc5eUxXTjFjblpoZEhWeVpUMGlNQ0lLSUNBZ0lDQWdJQ0FnYzNSNWJHVTlJbVpwYkd3Nkl6UTJORFkwTmp0bWFXeHNMVzl3WVdOcGRIazZNU0lnTHo0S0lDQWdJQ0FnUEhCaGRHZ0tJQ0FnSUNBZ0lDQWdaRDBpYlNBek16Z3VOamszTERFM0xqZ3lOaUEwTERBZ01DdzBJQzAwTERBZ2VpSUtJQ0FnSUNBZ0lDQWdkSEpoYm5ObWIzSnRQU0p0WVhSeWFYZ29MVEF1TnpBMk9UZ3pNellzTFRBdU56QTNNak13TVRnc01DNDNNRGN5TXpBeE9Dd3RNQzQzTURZNU9ETXpOaXcxTmpjdU5UVTVNVGNzTWpjMExqYzRNamN6S1NJS0lDQWdJQ0FnSUNBZ2FXUTlJbkJoZEdnME1qUTBJZ29nSUNBZ0lDQWdJQ0JwYm10elkyRndaVHBqYjI1dVpXTjBiM0l0WTNWeWRtRjBkWEpsUFNJd0lnb2dJQ0FnSUNBZ0lDQnpkSGxzWlQwaVptbHNiRG9qTkRZME5qUTJPMlpwYkd3dGIzQmhZMmwwZVRveElpQXZQZ29nSUNBZ1BDOW5QZ29nSUNBZ1BHY0tJQ0FnSUNBZ0lHbGtQU0p5WlcxdmRtVWlDaUFnSUNBZ0lDQnpkSGxzWlQwaVptbHNiRG9qTkRZME5qUTJPMlpwYkd3dGIzQmhZMmwwZVRveElqNEtJQ0FnSUNBZ1BIQmhkR2dLSUNBZ0lDQWdJQ0FnWkQwaWJTQXpPREVzTkRJZ01UZ3NNQ0F3TEMweE9DQXRNVGdzTUNBd0xERTRJSG9nYlNBeE5Dd3RNVFlnTWl3d0lEQXNNVFFnTFRJc01DQXdMQzB4TkNCNklHMGdMVFFzTUNBeUxEQWdNQ3d4TkNBdE1pd3dJREFzTFRFMElIb2diU0F0TkN3d0lESXNNQ0F3TERFMElDMHlMREFnTUN3dE1UUWdlaUJ0SUMwMExEQWdNaXd3SURBc01UUWdMVElzTUNBd0xDMHhOQ0I2SWdvZ0lDQWdJQ0FnSUNCcFpEMGljR0YwYURReU5EY2lDaUFnSUNBZ0lDQWdJR2x1YTNOallYQmxPbU52Ym01bFkzUnZjaTFqZFhKMllYUjFjbVU5SWpBaUNpQWdJQ0FnSUNBZ0lITjBlV3hsUFNKbWFXeHNPaU0wTmpRMk5EWTdabWxzYkMxdmNHRmphWFI1T2pFaUlDOCtDaUFnSUNBZ0lEeHdZWFJvQ2lBZ0lDQWdJQ0FnSUdROUltMGdNemsxTERJd0lEQXNMVFFnTFRFd0xEQWdNQ3cwSUMwMkxEQWdNQ3d5SURJeUxEQWdNQ3d0TWlBdE5pd3dJSG9nYlNBdE1pd3dJQzAyTERBZ01Dd3RNaUEyTERBZ01Dd3lJSG9pQ2lBZ0lDQWdJQ0FnSUdsa1BTSndZWFJvTkRJME9TSUtJQ0FnSUNBZ0lDQWdhVzVyYzJOaGNHVTZZMjl1Ym1WamRHOXlMV04xY25aaGRIVnlaVDBpTUNJS0lDQWdJQ0FnSUNBZ2MzUjViR1U5SW1acGJHdzZJelEyTkRZME5qdG1hV3hzTFc5d1lXTnBkSGs2TVNJZ0x6NEtJQ0FnSUR3dlp6NEtJQ0E4TDJjK0NpQWdQR2NLSUNBZ0lDQnBaRDBpWkdsellXSnNaV1FpQ2lBZ0lDQWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTVRJd0xEQXBJZ29nSUNBZ0lITjBlV3hsUFNKbWFXeHNPaU5pWW1KaVltSWlQZ29nSUNBZ1BIVnpaUW9nSUNBZ0lDQWdlR3hwYm1zNmFISmxaajBpSTJWa2FYUWlDaUFnSUNBZ0lDQnBaRDBpWldScGRDMWthWE5oWW14bFpDSUtJQ0FnSUNBZ0lIZzlJakFpQ2lBZ0lDQWdJQ0I1UFNJd0lnb2dJQ0FnSUNBZ2QybGtkR2c5SWpFd01DVWlDaUFnSUNBZ0lDQm9aV2xuYUhROUlqRXdNQ1VpSUM4K0NpQWdJQ0E4ZFhObENpQWdJQ0FnSUNCNGJHbHVhenBvY21WbVBTSWpjbVZ0YjNabElnb2dJQ0FnSUNBZ2FXUTlJbkpsYlc5MlpTMWthWE5oWW14bFpDSUtJQ0FnSUNBZ0lIZzlJakFpQ2lBZ0lDQWdJQ0I1UFNJd0lnb2dJQ0FnSUNBZ2QybGtkR2c5SWpFd01DVWlDaUFnSUNBZ0lDQm9aV2xuYUhROUlqRXdNQ1VpSUM4K0NpQWdQQzluUGdvZ0lEeHdZWFJvQ2lBZ0lDQWdjM1I1YkdVOUltWnBiR3c2Ym05dVpUdHpkSEp2YTJVNkl6UTJORFkwTmp0emRISnZhMlV0ZDJsa2RHZzZNanR6ZEhKdmEyVXRiV2wwWlhKc2FXMXBkRG8wTzNOMGNtOXJaUzFrWVhOb1lYSnlZWGs2Ym05dVpUdHpkSEp2YTJVdGIzQmhZMmwwZVRveElnb2dJQ0FnSUdsa1BTSmphWEpqYkdVdE15SUtJQ0FnSUNCa1BTSnRJRFU0TVM0Mk5UY3lOU3d6TUNCaklEQXNOaTR3TnpnZ0xUUXVPVEkyTERFeElDMHhNU3d4TVNBdE5pNHdOelFzTUNBdE1URXNMVFF1T1RJeUlDMHhNU3d0TVRFZ01Dd3ROaTR3TnpRZ05DNDVNallzTFRFeElERXhMQzB4TVNBMkxqQTNOQ3d3SURFeExEUXVPVEkySURFeExERXhJSG9pQ2lBZ0lDQWdhVzVyYzJOaGNHVTZZMjl1Ym1WamRHOXlMV04xY25aaGRIVnlaVDBpTUNJZ0x6NEtQQzl6ZG1jK0NnPT1cIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQURRQUFBQTBDQVFBQUFCdmNkTmdBQUFFc2tsRVFWUjRBV0w0VHlkSWhwWksxa3BXT2xnMHczWlhQNkQyc29CdEc0MmplSTZabVFUSHpBeGlUYlNKc1lMak85SGhQK1dPbWN1aGNpVm5tSFZRY0pucDdERnZTY293Wm9yYWQvK1YvZlZ6TWRNVDJnOUN2OWd1WEd2LzdwWU9yWGgyVStSUlIzZFNkOUpSeDZiSUZjL2VrcUhJMjlKQzZwSjVaRWgxeVdraGtiY0ZlU2p4Z3gzTDJtMWNiMUM3YmNleXhBK0NOalQvSWZmZisva0RrMnUvdy8zMy9JZUNNT1NhV1o0Z2xvc3FUM0RObk5aUTdDczU4LzNDZTVITDc4aVpIL3ZLVklhWWxxemZkTHU4Vmk3ZG52VWJFemE1SWR0MzZ0cXVaRmxkbDZONVovUE9Mb2YwWExLNjFtWkNtSlNXalZGOXRFalVsdXU3NElVWHZndHR1VklIRTdZeFNrYVloSlphbTd5aU05UHY4MkpZZmw5bnB0eFpheE1KRTRZU1B0eSt2RjArWTJ1cDlkM3d3aWpmalpiYWJxbS8zYlo5ZWNLSHNpR21SZmxubjFNVzRwakhmOW9MdWZ5bjJ6M3kxRDZuOGc4VFpoeHl6aXBMTlBuQVVwc09pdVdpbWc1MnBzclRaWW5PV1lORFRNdVdCV2EwdEpiNHJncTFVdm11dHBhWUViWmx3VTNDTEptL2F5WWpIVzUvaDd4V0xuOUhoMXZlcERreWY3ZEU3TXRUNUxSNGU3eVlwSHJraE9VcEVmc3NCTHEycFBoQXFvU1dLVWtrN0VEcWttSzZSckNFenFEamhORFdORStYU012a0pSRFdsWlRtQ1cwbDBQSFFHUlpZNXQxTDgza1QwWTNsMlNJdGs1SkFXSGwyZENPQm0rZlB1M2ZvNS8zdjYxUk1DTzlKeDJFRVlZaGIwcm1OUU1YL3ZtN2dxT0VKTGNYVEd3M0NBdVJOZXlhUFd3alI4UFJxS1ExUERBL2RwditvbjlTaG94NTJXRm54MEtZOG9uSGF5ckp6bTg3aTVoOXhHdy90ZmtldjBqR3NRaXpxZXpVS2prMTJoQk1LSjRrYkNxR1BWTlh1ZHl5clNob3ZHdzVDZ3hzUklDeEY2YVJtU2psQm5IUnpnN0d4OGZLcUV1YkkycmFoUVlkUjFZZ0RJUlFPN0p2UXlENTJob0lReDBteGEwT0R0VzJJb3puMWxlMmlJUmR6d1dld2VkeVp6ZXdpZHVlT0dxbHNuMU12Y25RcHVWd0xHRzMvSVIxaElLeENqZWxJRFo4bGRxV3oyNWpXQXNubGRFbkswWnhybzE5VEdWYjJmZklaRXNJTzg5RUlFRHZLTVByem1CT1FjS1ErcnJveWU2TmdSUnhxUjRVOEVBa3owQ0w2dVNHT202S1FDZFdqdmpSaVNQMUJQYWxDUlM1aVFZaUVJdnh1Qk1KRVdnelNvSEFEY1ZNdU43SXVxcVRleVVQcTIycUZpbUZ0eER5QkJKRXdOeXQ2VE04OGJsRkhhby82dFdXaHV1T000U0FLNEVJNFFtRkhBK1NFeVdscDRFUW9KMTNjWUd6TXU3eXN6RUlCT20yclZtSFVOcXdBSVFhYklTTk1Sc3RtZGhOV2NGTHNTbSswdGpKSDFNZFJ4TzVOeDBXRE1oQ3RnRDZPS2daZWxqSnFKS2M5cG84anVza1I5WE4wWTFsWjNtV2pMUjlKQ08xalJETWQwZnBZQzJWbnZqQlNFRmc3d0JFTmMwUjlIRmxiMHh2RjErVEJFcEY2OGQrREhSNklPV1Z2MkJFQ3R4bzQ2aE9GVUJkL0FQVTU3V0lvRXdKaElpMkNkcHlaWDBtOTNCWmlja3RNajFBUzlkQ2x0ZVVGQVVOVUlFeWdSWkN0aWs1elN4STlNdWJUQkgxR09pSHNpTEozT0NvU1prSUxhOVB4aU4wRWJ2aHNBbzh0ZEFmOVNlZXBkMzZsR1dIbXROQU5UdjVKZDB6NFFZeWVvL1VFSnF4S1JwZzVMWng2YnRMUHNPYUVtZE15eFlkbGM4TE1hSm5pa0RsaGNscW1QaVFuVEVwTFVJWkV3a1JhZ2pZa0VpYlFFcndoa1RBS0NMUUViVWdrekpRV2MvMFBzdEhIY2ZFZFErVUFBQUFBU1VWT1JLNUNZSUk9XCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCb0FBQUFhQ0FRQUFBQURRNFJGQUFBQ2YwbEVRVlI0QVkxVU0zZ2tBUlRlUGR2ZG9UeFhLYytxVGwzYVU1VTZiMktia3ozR3RxM1p3NnppTEdOUHpyWXg3OTQ2VHI2L2VlL1hlQ1E0RDN5a1B0TDV0SG5vNG4wZC9oMyt4ZnVXSEdMWDgxY243cjBpVE56anI3THJseENxUHRrYlRRRUhlcU9yVHk0WXl0M1ZDaS9JT0IwdjdyVkM3cTQ1UTNHcjVLNmp0KzNHbDVuQ29ERDRNdE8rajk2V3U4YXRtaEdxY05HSE9idWY4T00veDNBTXgzOCs0WjJzUHF6Q3hSRksyYUYyZTVKb2w1NlhUTHlnZ0FNVEw1NlhPTW9TMVc0cE95alVjR0dRZFp4VTZxUmg3QjlacCtQZnBPRmxxdDB6eURaY2tQaTF0dG1JcDAzalg4Z3lKOGEvUEcyeXV0cFMvVm9sN3BlWkliWmNLQkFFRWhlRUlBZ0ZiRGt6NUg2WnJrbTJoVldHaVhLaUY0WWN3MFJXS2R0QzE2UTdxZTNYNGlPTXhydW9uemVnSnpXYVhGclU5dXRPU3NMVW1yYzBZamVXWWpDVzRQRE1BREVscEpTU1EwdlF2QTFUbTYvSmxLbnFGczFFR3laaUZDcW5SWlRFSkpKaUtSWXpWWXpKY2syUm02UDRpSCtjbVNZMFl6aW1ZYThsMEV0VE9ERldoY01JTVZxZHNJMnVpVHZLbVRpc0lESEozb2Q1R0lMVmhCQ2FyQ2ZWUm1vNHVUamtocmh6a2lCVjdTc2FxUytUenJ6TTFxcEdHVUZ0MjhwSXlTUUhSNmg3RjZLU3dHV205N2F5K1orWnFNY0VqRVdlYkU3d3hDU1F3cGtoSnFvWkE1aXZDZFpEakplcHVKOUlRakdHVW11WEpkQkZVeWd4VnFWc3hGc0xNYkRlOFpiRFlWQ0dLeHMrVzA4MG1heDFoRkNhckNmVitDMUtBVHdjbnZFOWdSUnVNUDJwcmRiV0dvd20xS0IxeSt6d01NRU5rTTc1NWNKMnlQRHRxaFRJNkVEMU0vODJ5SUR0Qy80ajRCaWpqZU9iZmxwTzlJOU13WFRDc1NYOGpXQUZlSHIwNVdvTFRKNUc4SVFWUy83dndSNm9oaXJZTTdmNkh6WXBvZ2ZTM1IyT0FBQUFBRWxGVGtTdVFtQ0NcIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJrQUFBQXBDQVlBQUFEQWs0TE9BQUFGZ1VsRVFWUjRBYTFYQTVCaldSVE4yb1cxN2QzWWFadHIyOTYySFV6YkROcGpzelcyNG1SdDI4cDQ3djd6cS9iWFp0cnAvbFduWHIzMzdqM25QQ2U4NU5jeXBnU0ZkdWdDcFc1WW9EQU1SYUlNcVJpNmFLcTVFM1lxRFFPM3FBd2pWV3JEOE5jcS9SQnB5a2Q4b1pVYi9rYUp1dG93OHIxYVA5SUkwV21MS0xJc0p5djF3L2txdzlDaDJNWWRCKysxMk9ueGVlL1FNd3ZmNC9Eay9MZnAvaTRueFRYdE9vUTRwVzVBajd3cGljaTFBOWVyZEFOMk9INjR4OE9TUDlqM0Z0M2I3YVdrVGcvRm05MXNpVHJhMGY5b241c1FyOUlOZWpINkNVVVVwYXZqRk5xMUIrT2FkaHhtbmZhOFJmRW1OOFZOQXNRaFBxRjU1eEhrTXp6M2pTbUNoV1U2ZjcvWFpLTkgrOStoQkxPSFlvenVLUVB4eU1QVUtrclgvSzB1V25mRmFKR1MxUVBSdFpzT1B0cjNOc1cwdXloNk5OQ09rVTNZeitiWGJUM0k4RzN4RTVFWExYdENYYmJxd0NPOXpQUVlQUlRaNXZJRFhEN1UrdzdyRkRFb1VVZjdpYkhJUjR5NmJMVlBYcno4SlZaRXFsMTN0cnh3dWUvdURpdmQzZmtXUmJTNi9JQTJiSUQ0dWswVXBGMU44cUxsYkJsWHM0RWU3SExUZlYxajU0QVB2T0RuU2ZPV0JxdEtWdmpnTEt6RjVZZEVrNWV3UmtHbEswaTMzRW9mZmZjN0hUNTZqRDcvNlUrcUgzQ3g3U0JMTm50SDVZSVB2T0RueWZJWFpZUlZEUHFnSHRMczVBQkhEM1l6THVlc3BiN3Q3OUZZMzREak13clZyY1R1d2xUNTVZTVB2T0JuUnJKNFZYVGRObll1ZzV1Y0hMQmpFcHQzMDcwMUEzVHMrSEVhNzN1NmRUM0ZOV3dmbFk4NmVNSFBrK1l1K2k2cHpVcFJyVzdTTkRnNUpIUjRLYXBtTTVXdjJFOFRmY2IxSG9xcUhNSFUrdVdERDd6ZzU0bXo1LzJCU25pemk5VDFEZzRRUVhMVG9HTkNrYjZ0YjFOVStRQWxHcjErK2VBRHJ6aG4vdThRMllaaFFWbFo1K0NBT3RxZmJobWFVQ1MxZXpORlZtMmltRGJQbVBuZzV3bXorZ3doK29IRGNlMGVVdFE2T0dESXlSMHVVaFVzb08zdmZEbW1nT2V6SDBtWk41OXg3TUJpKytXREwxZy9lRWlVM2F2bGlkTzY3MWJrTGZ3Ync1WFYyUDhQem8weWR5NHQyLzBldTMzeFlTT01PRDhoVGY0Q3JCdEdNU29YZlBMY2hYK0owcnVTZVB3M0xaZUswanVQSmJZenJoa0gwaW83QjNrMTY0aGlHdmF3aE9LTUxrclFMeVZwWmc4ckhGVzdFMnVIT0w4ODhJQlBsTloxRlB6c3RTSk02OTRmV3I2UndwdmNKSzYwKzBIQ0lMVEJ6WkxGTmR0QXpKYW9oemU2MFQ4cUJ6eWg1WnVPZzVlN3V3UXBwb2ZFbWYyKytEWXZteVNxR0J1S2FpY0YxYmxRamh1SGR2Q0lNdnA4d2hUVGZaekk3UmxkcHd0U3pMK0YxK3drZFoyVEJPVzJnSUY4OFBCVHpEL2dwZVJFQU1FYnhuSmNhSkhOSHJwemppMGdRQ1M2aGRrRWVZdDlERi8ycVBjRUM4Uk0yOEh3bXIzc2ROeWh0MDBieUF1dDJrM2d1ZldOdGd0T0VPRkdVd2NYV05EYmROYnBnQkd4RXZLa09Rc3hpdkp4MzNpb3cwVnc1UzZTVlRycFZxMTF5c0EyUnA3Z1RmUGZrdGM2emh0WEJCQythZFJMc2hmNnNHMlJmSFBaNUVBYzRzVlo4M3lDTjAwRmsvNGtnZ3U0MFpUdklFbTVnMjRxdFU0S2pCcngvQlRUSDhpZlZBU0FHN2dLcm5XeEpEY1U3eDhYNkVjY3pobTNvNllpY3ZzTFhXZmgzQ2gxVzBrOHgwblhGKzBmRnhndDRwaHo4UXZ5cGl3Q0NGS01xWENucVhFeGpxMTBiZUgrVVVBNytuRzZtZEcvUHUwZjNMZ0ZjR3JsMnMwa05OanBtb0o5bzRCMjlDTU84ZE1UNFE1b3g4dWl0RjZmcXNySk9yOHFud05iUnp2NmhTbkc1d1ArNjRDN2g5bHAzMGhLTnRLZFdqdGRrYnVQQTE5bko3VHozelIvaWJnQVJiaGI0QWxoYXZjQmVibVRIY0ZsMmZ2WUVuVzBveDl4TXhLQlM4YnRKK0tpRWJxOXpBNFJ0aFFYRGhQYTBUOVRFZTY5Z1d1cHdjNnVCVXBocXVYZ2YrL0ZySWp3ZUhRUzQvcGR1TWU1RVJVTUhVZDl4djhaUjk4Q3hrUzRGMm4zRVVyVVoxMEVZTnc3QldtOXgxR2lQc3NpM0dnaUdSREtXUllaZlhsT04rZGZOYk0rR2dJd1lkd0FBQUFBU1VWT1JLNUNZSUk9XCIiXSwic291cmNlUm9vdCI6IiJ9