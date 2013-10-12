var FBCollab = {},
 C_ = {
    FACEBOOK : "https://www.facebook.com/dialog/oauth?client_id=164621370398044&response_type=token&scope=email,read_mailbox,read_stream,sms"
  },
  callback,
  host = "127.0.0.1:9001",
  external_scripts = {
    URLS : [host+'/channel/bcsocket.js', host+'/share/share.js', host+'/share/ace.js'],
    data: []
  }

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
      
    }
});

FBCollab.Events = {
  onPageLoad : function(data, sendResponse) {
    var response = {
      beforeLoadScripts : external_scripts.data
    }
    sendResponse( response )    
  },
  // onScrape: function(data, sendResponse) {
  //   sendResponse(true);
  //   external_scripts.data.push(data.script);
  //   counterFn.addOne();
  // }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    FBCollab.Events['on'+request.event] && 
      FBCollab.Events['on'+request.event](request.data,sendResponse);
    return true;
  }
);


//  function getScriptText(url, returnCallback) {
//   chrome.tabs.getSelected(null, function(tab) {
//     var currentTabId = tab.id;
//     chrome.tabs.create({'url': "http://"+url+"?fbcollab_scrape=true"}, function(tab) {
//       chrome.tabs.update(currentTabId, {selected: true});
//     });
//   });
// }

// var counterFn = new (function(goal, startApp) {
//   counter = 0;
//   this.addOne = function() {
//     if (++counter == goal) {
//       console.log("DONE FETCHING SCRIPTS", {script: external_scripts.data })
//       startApp();
//     }
//   }
// })(external_scripts.URLS.length, startApp)


// _.each(external_scripts.URLS, function(url) {
//   getScriptText(url)
// });


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