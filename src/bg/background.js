var settings = [];
chrome.storage.sync.get(['fields'], function (obj) {
	settings = obj.fields;
  if(!settings){
    settings = [];
  }
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("request",request.action);
  console.log("bkgrd settings",settings);
	if(request.action === "get-settings"){
		sendResponse(settings);
		return;
	}
	if(request.action === "set-settings"){
    settings = request.settings;
    if(!request.settings){
      settings = [];
    }
		chrome.storage.sync.set({"fields": settings});
  	sendResponse(settings);
  	return;
	}
});