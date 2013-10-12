var FBCollab = {},
  ID_MATCH_REGEX = /\/[0-9]+\./

var C_ = {
    FACEBOOK : "https://www.facebook.com/dialog/oauth?client_id=164621370398044&response_type=token&scope=email,read_mailbox,read_stream,sms"
  },
  callback

FBCollab.Events = {
  onPageLoad : function(data, sendResponse) {
    
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    Agora.Events['on'+request.event] && 
      Agora.Events['on'+request.event](request.data,sendResponse);
    return true;
  }
);

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "FBConnect");
  port.onMessage.addListener(function(msg) {
    console.assert(msg == "LinkFacebook");
    chrome.tabs.getSelected(null, function(tab) {
      var currentTabId = tab.id;
      chrome.tabs.create({'url': chrome.extension.getURL('options/options.html')}, function(tab) {
        chrome.tabs.update(tab.id, {
            url : C_.FACEBOOK+'&redirect_uri=http://stubhubredirect.herokuapp.com&state='+encodeURIComponent(chrome.extension.getURL('options/options.html')+"?showFB=1")
          }
        );
        callback = function(data) {
          port.postMessage(data);
        }
        chrome.tabs.update(currentTabId, {selected: true});
      });
    });
  });
});


chrome.extension.getBackgroundPage().onAccessTokenChange = function() { 
  $.ajax({
    url: "https://graph.facebook.com/me?fields=friends,name&"+sessionStorage.accessToken,
    success: function(userInfo) {
      sessionStorage.user = JSON.stringify(userInfo);
      callback(userInfo);
    }
  });
}




