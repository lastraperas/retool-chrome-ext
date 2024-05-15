// https://gist.github.com/smhmic/4434c2cc0f44962a72c51125669106df
/**
 * @function onDomInsert - Listener for nodes inserted into DOM.
 *                         Does NOT monitor when things are removed.
 *                         Based on http://stackoverflow.com/a/14570614/445295
 * @param [DOMNode]  el  - Optional. The element to listen on. Defaults to document.
 * @param [Function] cb  - Callback. Called with inserted element as only arg.
 */
const onDomInsert = (function () {
  "use strict";

  var MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;

  // For Chrome 18+, Firefox 14+, Safari 6+, IE 11+.
  if (MutationObserver) {
    return function (el, callback) {
      if (!callback) {
        callback = el;
        el = document;
      }
      new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations[0].addedNodes.length; i++) {
          callback(mutations[0].addedNodes[i]);
        }
      }).observe(el, { childList: true, subtree: true });
    };
  }

  // For Firefox, Safari, Opera 9.6+, IE 9+.
  // TODO: or IE 10+?  The DOMNodeInserted event is documented as buggy in IE9, but it worked in browser testing.  Should fallback to below method in IE9? Or check event via this method: http://stackoverflow.com/a/3219767/445295 ?
  if (document.addEventListener) {
    // This method can have substantial perf impact (http://j.mp/2aQwJqh). TODO: Alternatives?
    return function (el, callback) {
      if (!callback) {
        callback = el;
        el = document;
      }
      el.addEventListener(
        "DOMNodeInserted",
        function (evt) {
          callback(evt.target);
        },
        false
      );
    };
  }

  // For IE <= 9.
  // TODO: Reliability of this method not confirmed.
  /* if( document.attachEvent ){
      return function( el, callback ){
          if( !callback ){ callback = el; el = document; }
          el.attachEvent( 'onpropertychange', function( evt ){
              callback( evt && evt.target || evt.srcElement );
          });
      }
  } */
})();
