'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Introduction = (function () {
  function Introduction() {
    var _this = this;

    _classCallCheck(this, Introduction);

    this.SNOW_IMAGES = ['/assets/img/top/introduction/snow/small/1.png', '/assets/img/top/introduction/snow/small/2.png', '/assets/img/top/introduction/snow/small/3.png', '/assets/img/top/introduction/snow/small/4.png', '/assets/img/top/introduction/snow/small/5.png', '/assets/img/top/introduction/snow/large/1.png', '/assets/img/top/introduction/snow/large/2.png', '/assets/img/top/introduction/snow/large/3.png'];

    this.TIMER_QUEUE = [];

    this.TIMELINE = {
      '#wrap': [{
        'start': 0,
        'animations': [{ 'properties': { 'opacity': 0 } }]
      }, {
        'start': 15000,
        'animations': [{ 'properties': { 'opacity': 1 } }]
      }],
      '.intro__item--logo': [{
        'start': 1000,
        'animations': [{ 'properties': { 'opacity': 1 } }]
      }, {
        'start': 3000,
        'animations': [{ 'properties': { opacity: 0 } }]
      }],
      '.intro__item--onair': [{
        'start': 4000,
        'animations': [{ 'properties': { 'opacity': 1 } }]
      }, {
        'start': 6000,
        'animations': [{ 'properties': { opacity: 0 } }]
      }],
      '.intro__item--pkg': [{
        'start': 7000,
        'animations': [{ 'properties': { 'opacity': 1 } }]
      }, {
        'start': 9000,
        'animations': [{ 'properties': { opacity: 0 } }]
      }],
      '.intro__item--catch': [{
        'start': 10000,
        'animations': [{ 'properties': { 'opacity': 1 } }]
      }, {
        'start': 15000,
        'animations': [{ 'properties': { opacity: 0 } }]
      }],
      '.intro__scene': [{
        'start': 0,
        'animations': [{ 'properties': { opacity: 1 } }, { duration: 0 }]
      }, {
        'start': 10000,
        'animations': [{ 'properties': { opacity: 0 }, 'opacity': { duration: 1000 } }]
      }],
      '#intro': [{
        'start': 0,
        'animations': [{
          'properties': 'fadeIn',
          'options': {
            'duration': 0,
            'complete': function complete() {
              setTimeout(function () {
                _this.initSnow();
              }, 0);
            }
          }
        }]
      }, {
        'start': 13000,
        'animations': [{ 'properties': 'fadeOut' }, { duration: 3000 }]
      }]
    };
  }

  _createClass(Introduction, [{
    key: 'init',
    value: function init() {
      $('#intro').css('visibility', 'visible');

      $.each(this.TIMELINE, function (element) {
        $(element).css('opacity', 0);
      });
    }
  }, {
    key: 'initSnow',
    value: function initSnow() {
      $.each(this.SNOW_IMAGES, function (i, image) {
        $('.intro__scene').snowfall({ image: image, flakeCount: 5, minSize: 10, maxSize: 32 });
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      this.init();

      $.each(this.TIMELINE, function (selector, triggers) {
        $.each(triggers, function (i, trigger) {
          var timer = setTimeout(function () {
            var $element = $(selector).css('opacity', 1);
            $.each(trigger.animations, function (j, animation) {
              $element.velocity(animation.properties, animation.options);
            });
          }, trigger.start || 0);

          _this2.TIMER_QUEUE.push(timer);
        });
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      var _this3 = this;

      $.each(this.TIMELINE, function (selector) {
        $(selector).velocity('stop');
      });

      $.each(this.TIMER_QUEUE, function (index, timer) {
        clearTimeout(timer);
      });

      $('#intro').velocity('stop').velocity('fadeOut', 1000);
      $('#wrap').velocity('stop').velocity('fadeIn', 1000, function () {
        $.each(_this3.SNOW_IMAGES, function (i) {
          $('.intro__scene').snowfall('clear');
        });
      });
    }
  }]);

  return Introduction;
})();