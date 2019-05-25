$(document).ready(function() {

  $( "nav span.header" ).click(function(){
      $.get("/");
    });

    $( "#login-button" ).click(function(){

    });

    $( "#create-button" ).click(function(){
      $.get("/new");
    });

    $( "#user-button" ).click(function(){
      $.get("/:userid/:mapid");
    });

});
