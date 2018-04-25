'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Home = (function () {
  function Home() {
    _classCallCheck(this, Home);

    this.Introduction = new Introduction();

    this.cacheElements();
    this.bindEvents();
  }

  _createClass(Home, [{
    key: 'cacheElements',
    value: function cacheElements() {
      this.$window = $(window);
      this.$wrap = $('#wrap');
      this.$content = this.$wrap.find('.content');
      this.$skip = $('.js-skip');
      this.$replay = $('.js-replay');
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$window.on('DOMContentLoaded', function () {
        if (!$.cookie('introduction')) {
          _this.Introduction.start();
          $.cookie('introduction', true, { expires: 7 });
        } else {
          _this.Introduction.stop();
        }
      });

      this.$window.on('DOMContentLoaded resize', function () {
        _this.$content.css('height', _this.$window.height());
      });

      this.$skip.on('click', function () {
        _this.Introduction.stop();
      });

      this.$replay.on('click', function () {
        _this.Introduction.start();
        return false;
      });
    }
  }]);

  return Home;
})();

$(function () {
  new Home();
});