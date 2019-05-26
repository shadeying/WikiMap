$(document).ready(function() {

  $( "nav#nav-bar span.header" ).click(function(){
      $.get("/");
  });

  $( "#login-button" ).click(function(){
    $.get("/current", function(data){
      $.get(`/:${data.userid}`);
    });
  });

  $( "#create-button" ).click(function(){
    $.post("/new", function(data){
      $.get(`/${data.mapid}`);
    });
  });

  $( "#user-button" ).click(function(){
    $.get("/current", function(data){
      $.get(`/:${data.userid}`);
    });
  });

});
