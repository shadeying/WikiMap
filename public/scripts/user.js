$(document).ready(function() {

  $(document).on( "click", "section.owned-container" , function(event) {
    $.get("/:userid/maps");
  });

  $( "#user-button" ).click(function(){
    $.get("/:userid/maps");
  });

  $( "#login-button" ).click(function(){

  });

  $( "#create-button" ).click(function(){
    $.get("/new");
  });

});
