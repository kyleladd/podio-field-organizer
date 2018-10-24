chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);
    // ----------------------------------------------------------
    // This part of the script triggers when page is done loading
    console.log("Hello. This message was sent from scripts/inject.js");
    // ----------------------------------------------------------
    $(document).arrive(".app-fields-list > li", function() {
      var $container = $('.app-fields-list');
      var $fields = $container.find('> li').detach();
      $fields = $fields.sort(function(a, b) {
        var aVal = $(a).find('.label-content-wrapper .label-content').text().replace(/\*/g, '').replace(/^\s+|\s+$/g, '').toLowerCase();
        var bVal = $(b).find('.label-content-wrapper .label-content').text().replace(/\*/g, '').replace(/^\s+|\s+$/g, '').toLowerCase();
        if(aVal < bVal) { return -1; }
        if(aVal > bVal) { return 1; }
        return 0;
      });

      $container.html($fields);
      var sortable = Sortable.create($container.get(0),{
        // Changed sorting within list
        onUpdate: function (evt) {
          // same properties as onEnd
          console.log("sortable - onUpdate")
        }
      });
    });
  }
  }, 10);
});