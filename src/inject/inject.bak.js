var settings = [];
chrome.extension.sendMessage({"action": "get-settings", "app":"app"},
  function (response) {
    console.log("response",response);
    settings = response;
});
chrome.extension.sendMessage({}, function(response) {
  $(function() {
    $(document).arrive(".app-fields-list > li", function() {
      console.log("arrived");
      $(document).unbindArrive(".app-fields-list > li");
      var $container = $('.app-fields-list');
      // $container.find('> li').each(function(){
      //   // debugger;
      //   var $that = $(this);
      //   $that.data("sortableid",$that.attr("id"));
      //   console.log($that.data());
      // });
      var $fields = $container.find('> li').detach();
    
      console.log("container",$container);
      console.log("FIELDS",$fields);
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
      console.log("container",$container.get(0));
      $container.sortable({
        update: function( event, ui ) {
          console.log("UPDATE",$container);
        }
      });

      // var sortable = Sortable.create($container.get(0),{
      //   dataIdAttr: 'data-sortableid',
      //   draggable: 'li',
      //   store: {
      //     get: function (sortable) {
      //           // var order = localStorage.getItem(sortable.options.group);
      //           // return order ? order.split('|') : [];
      //           chrome.extension.sendMessage({"action": "get-settings", "app":"app"}, function (response) {
      //             console.log("settings response",response);
      //             return response;
      //           });
      //       },
      //       set: function (sortable) {
      //         var order = sortable.toArray();
      //         chrome.extension.sendMessage({"action": "set-settings", "settings": order}, function(response){
      //           console.log("response",response);
      //         });
      //           // var order = sortable.toArray();
      //           // console.log(order, 'baaaaaaaaaaaaaaaaaaaaaaaaar');
      //           // $('.visuaplayoutCol02').attr('value', order);
      //       }
      //   },
      //   // Changed sorting within list
      //   // onUpdate: function (evt) {
      //   //   // same properties as onEnd
      //   //   console.log("sortable - onUpdate", $fields);
      //   //   // console.log("array",this.toArray())
      //   //   console.log("new setting", $fields.map(function(){
      //   //     return $(this).attr('id');
      //   //   }).get());
      //   //   debugger;
      //   //   chrome.extension.sendMessage({"action": "set-settings", "settings": $fields.map(function(){
      //   //     return $(this).attr('id');
      //   //   }).get()},
      //   //   function (response) {
      //   //     console.log("response",response);
      //   //   });
      //   // }
      // });
    });
  });
});
