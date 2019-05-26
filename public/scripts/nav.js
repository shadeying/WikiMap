$(document).ready(function() {

  $( "nav#nav-bar span.header" ).click(function(){
      $.get("/", function(data){
        window.location.href = "/";
        $("body").html(data);
      });
  });

  $( "#login-button" ).click(function(){
    $.get("/", function(data){
        window.location.href = "/";
        $("body").html(data);
      });
  });

  $( "#create-button" ).click(function(){
    $.post("/new", function(data){
      $.get(`/${data.mapid}`);
    });
  });

  $( "#user-button" ).click(function(){
    //not complete
    $.get("/current", function(data){
      $.get(`/users/${data.userid}`, function(data2){
        window.location.href = `/users/${data.userid}`;
        $("body").html(data);
      });
    });
  });

});
