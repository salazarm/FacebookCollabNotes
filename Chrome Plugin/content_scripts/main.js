var EDIT_NOTE_URL_REGEX = /.*facebook\.com\/editnote\.php/,
  FACEBOOK_URL_REGEX = /.*facebook\.com.*/

function init(document, window) {
  if (document.readyState == "complete") {
    init();
  } else {
    window.addEventListener("load", function() {
      setTimeout(function() {
        startDaTrollz();
      }, 0);

    });
  } 

  function startDaTrollz() {
    chrome.runtime.sendMessage({ event: 'PageLoad'},
      function(data) {
        var i =0;
        _.each(data.beforeLoadScripts, function(script) { eval(script); });
        
        if ( FACEBOOK_URL_REGEX.exec( window.location.toString() ) ) {
          notificationListener.initialize();
        }
        if ( EDIT_NOTE_URL_REGEX.exec( window.location.toString() ) ) {
          editNoteListener.initialize();
        }
      }
    );
  }

}

init(document, window);