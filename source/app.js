(function () {
  'use strict'

  if (!window.addEventListener) return // Check for IE9+

  var options = INSTALL_OPTIONS
  var element

  // initializeSlaask runs every time the options are updated.
  // Most of your code will end up inside this function.
  function initializeSlaask () {
    (function() {
      var slk = window.document.createElement('script');
      slk.src = 'https://cdn.slaask.com/chat.js';
      slk.type = 'text/javascript';
      slk.async = 'true';
      slk.onload = slk.onreadystatechange = function() {
        var rs = this.readyState;
        if (rs && rs != 'complete' && rs != 'loaded') return;
        try {
          _slaask.init(options.api_key);
        } catch (e) {}
      };
      var s = window.document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(slk, s);
    })();
  }

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSlaask)
  } else {
    initializeSlaask()
  }

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions (nextOptions) {
      options = nextOptions

      initializeSlaask()
    }
  }
}())
