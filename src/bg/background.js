var settings = [];
chrome.storage.sync.get(['fields'], function (obj) {
	settings = obj.fields;
	console.log("settings",settings);
});

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	if(request.action === "get-settings"){
  		console.log("settings",settings);
  		sendResponse(settings);
  		return;
  	}
  	if(request.action === "set-settings"){
  		debugger;
  		chrome.storage.sync.set({"fields": request.settings});
  		settings = request.settings;
		sendResponse(settings);
		return;
  	}
  });