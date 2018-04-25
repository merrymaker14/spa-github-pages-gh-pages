'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Story = (function () {
  function Story() {
    _classCallCheck(this, Story);

    this.cacheElements();
    this.init();
    this.bindEvents();
  }

  _createClass(Story, [{
    key: 'cacheElements',
    value: function cacheElements() {
      this.$wrap = $('#wrap');
      this.$scene = this.$wrap.find('.story__scene');
      this.$sceneItem = this.$scene.find('.glide__slide');
      this.$bullets = this.$scene.find('.glide__bullets');
      this.$spoiler = $('#spoiler-area');
      this.$btnSpoiler = this.$wrap.find('.js-show-spoiler');
    }
  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      this.sceneSrc = [];

      this.$sceneItem.each(function (index, element) {
        _this.sceneSrc.push(element.childNodes[0].src);
      });

      this.$scene.glide({
        type: 'slideshow',
        animationDuration: 1000,
        afterInit: function afterInit() {
          _this.setBullets();
        }
      });
    }
  }, {
    key: 'setBullets',
    value: function setBullets() {
      var _this2 = this;

      this.$bullets.children().each(function (index, element) {
        $(element).css({
          width: 100 / 4 + '%',
          paddingTop: '14.1%',
          background: 'url(' + _this2.sceneSrc[index] + ') no-repeat center center',
          backgroundSize: 'cover'
        });
      });
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this3 = this;

      this.$btnSpoiler.on('click', function (evt) {
        evt.preventDefault();
        _this3.popAlert();
      });

      $('.js-return').on('click', function (evt) {
        evt.preventDefault();
        _this3.hideAlert();
      });

      $('.js-continue').on('click', function (evt) {
        evt.preventDefault();
        _this3.showSpoiler();
      });
    }
  }, {
    key: 'popAlert',
    value: function popAlert() {
      $.colorbox({
        inline: true,
        href: '#spoiler-alert'
      });
    }
  }, {
    key: 'hideAlert',
    value: function hideAlert() {
      $.colorbox.close();
    }
  }, {
    key: 'showSpoiler',
    value: function showSpoiler() {
      this.$btnSpoiler.remove();
      this.hideAlert();
      this.$spoiler.velocity('fadeIn', 1000);
    }
  }]);

  return Story;
})();

$(function () {
  new Story();
});