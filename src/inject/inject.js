var settings = [];
chrome.extension.sendMessage({}, function(response) {
  $(function() {
    $(document).arrive(".app-fields-list", function() {
      $(document).unbindArrive(".app-fields-list");
      var $container = $('.app-fields-list');
      var $fields = $container.find('> li').detach();
      chrome.extension.sendMessage({"action": "get-settings", "app":"app"},
        function (response) {
          settings = response;
          $fields = $fields.sort(function(a, b) {
          var aVal = settings.indexOf($(a).attr('id'));
          var bVal = settings.indexOf($(b).attr('id'));
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
        $container.html($fields);
        var sortable = Sortable.create($container.get(0),{
          draggable: 'li',
          store: {
            get: function (sortable) {
              return [];
            },
            set: function (sortable) {
              var order = $container.find('> li').map(function(){
                return $(this).attr('id');
              }).get();
              chrome.extension.sendMessage({"action": "set-settings", "settings": order}, function(response){
              });
            }
          },
        });
      });
    });
  });
});