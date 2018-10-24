var settings = [];
chrome.extension.sendMessage({"action": "get-settings", "app":"app"},
  function (response) {
    console.log("response",response);
    settings = response;
});
chrome.extension.sendMessage({}, function(response) {
  $(function() {
    $(document).arrive(".app-fields-list > li", function() {
      var $container = $('.app-fields-list');
      var $fields = $container.find('> li').detach();
    
      // console.log("container",$container);
      // console.log("FIELDS",$fields);
      $fields = $fields.sort(function(a, b) {
        // var aVal = $(a).find('.label-content-wrapper .label-content').text().replace(/\*/g, '').replace(/^\s+|\s+$/g, '').toLowerCase();
        // var bVal = $(b).find('.label-content-wrapper .label-content').text().replace(/\*/g, '').replace(/^\s+|\s+$/g, '').toLowerCase();
        var aVal = settings.indexOf($(a).attr('id'));
        var bVal = settings.indexOf($(b).attr('id'));
        // console.log("A",aVal,"B",bVal);
        if(aVal === -1 && bVal === -1){
          return 0;
        }
        else if(aVal === -1){
          return 1;
        }
        else if(bVal === -1){
          return -1;
        }
        if(aVal < bVal) { return -1; }
        if(aVal > bVal) { return 1; }
        return 0;
      });
      console.log("$fields",$fields);
      $container.html($fields);
      var sortable = Sortable.create($container.get(0),{
        // Changed sorting within list
        onUpdate: function (evt) {
          // same properties as onEnd
          console.log("sortable - onUpdate", $fields);
          // console.log("array",this.toArray())
          console.log("new setting", $fields.map(function(){
            return $(this).attr('id');
          }).get());
          debugger;
          chrome.extension.sendMessage({"action": "set-settings", "settings": $fields.map(function(){
            return $(this).attr('id');
          }).get()},
          function (response) {
            console.log("response",response);
          });
        }
      });
    });
  });
});
