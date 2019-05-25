$(document).ready(function() {

  $(document).on( "click", "section.owned-container" , function(event) {
    $.get("/:userid/maps");
  });

});
