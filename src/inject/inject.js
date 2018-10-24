chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);
    // ----------------------------------------------------------
    // This part of the script triggers when page is done loading
    console.log("Hello. This message was sent from scripts/inject.js");
    // ----------------------------------------------------------
    $(document).arrive(".app-fields-list > li", function() {
      // 'this' refers to the newly created element
      // var $newElem = $(this);
      var $container = $('.app-fields-list');
      var $fields = $('.app-fields-list > li').detach();
      console.log("container",$container);
      console.log("FIELDS",$fields);
      $fields = $fields.sort(function(a, b) {
        var aVal = $(a).find('.label-content-wrapper .label-content').text().replace(/\*/g, '').replace(/^\s+|\s+$/g, '').toLowerCase();
        var bVal = $(b).find('.label-content-wrapper .label-content').text().replace(/\*/g, '').replace(/^\s+|\s+$/g, '').toLowerCase();
        console.log("A",aVal,"B",bVal);
        if(aVal < bVal) { return -1; }
        if(aVal > bVal) { return 1; }
        return 0;
      });

      $container.html($fields);
    });
  }
  }, 10);
});