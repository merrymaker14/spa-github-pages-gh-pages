'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = (function () {
  function Common() {
    _classCallCheck(this, Common);

    this.cacheElements();
    this.bindEvents();
    this.init();
  }

  _createClass(Common, [{
    key: 'cacheElements',
    value: function cacheElements() {
      this.$window = $(window);
      this.$wrap = $('#wrap');
      this.$mask = $('#mask');
      this.$tab = this.$wrap.find('.js-tab').children();
      this.$tabContent = this.$wrap.find('.content-tab-container');
      this.$movie = this.$wrap.find('.js-movie');
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$tab.on('click', function (evt) {
        var hash = evt.target.hash;

        evt.preventDefault();

        _this.$tab.removeClass('active');
        $(evt.currentTarget).addClass('active');
        _this.switchTab(hash);
        _this.changeHash(hash);
      });

      this.$movie.colorbox({
        iframe: true,
        width: 800,
        height: 450
      });

      this.$window.on('load', function () {
        _this.$mask.velocity('fadeOut', 600);
      });
    }
  }, {
    key: 'init',
    value: function init() {
      this.initSidebarBanners();
      this.generateShareButton();
      if (this.$tab.length) this.initSwitchContent();
    }
  }, {
    key: 'initSidebarBanners',
    value: function initSidebarBanners() {
      $('.side__banners').glide({
        type: 'carousel',
        autoplay: false
      });
    }
  }, {
    key: 'initSwitchContent',
    value: function initSwitchContent() {
      var hash = location.hash;

      this.$tabContent.hide();

      if (hash) {
        this.$tab.children('[href=' + hash + ']').trigger('click');
      } else {
        this.$tab.filter('.active').children('a').trigger('click');
      }
    }
  }, {
    key: 'switchTab',
    value: function switchTab(contentId) {
      contentId = contentId.substr(1);

      this.$tabContent.hide();
      this.$tabContent.filter('[data-content-id=' + contentId + ']').show();
    }
  }, {
    key: 'changeHash',
    value: function changeHash(hash) {
      location.hash = hash;
    }
  }, {
    key: 'generateShareButton',
    value: function generateShareButton() {
      new SmartSnsBox({
        selector: '.content-share .share-items',
        text: document.querySelector('meta[property$=title]').content,
        url: location.href,
        hashtag: 'erasedanimeusa',
        service: 'twitter facebook'
      });

      new SmartSnsBox({
        selector: '.footer__share .share-items',
        text: 'That day... she died. Animation ERASED Streaming Starts January 7th 2016.',
        url: 'http://erasedusa.com/',
        hashtag: 'erasedanimeusa',
        service: 'twitter facebook'
      });
    }
  }]);
  return Common;
})();

$(function () {
  new Common();
  $('.cbox').colorbox();
});