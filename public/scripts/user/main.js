$(document).ready(function() {

  $( "span.sign-up" ).click(function(){
    $.get("/users/:userid");
  });

  $( "span.login" ).click(function(){

  });

  $( "span.new-map" ).click(function(){
    $.get("/new");
  });

});
