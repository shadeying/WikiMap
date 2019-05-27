$(document).ready(function() {

  $( "nav#nav-bar span.header" ).click(function(){
      $.get("/", function(data){
        window.location.href = this.url;
        $("body").html(data);
      });
  });

  $( "#login-button" ).click(function(){
    $.get("/api/users/current", function(userid){
      if(userid){
        $.post("/api/users/logout");
      }
    });
    $.get("/", function(data){
      window.location.href = this.url;
      $("body").html(data);
    });
  });

  $( "#create-button" ).submit(function(){
    $.get( "/api/users/current", function(userid){
      if(userid){
        $.post("/new");
      }else{
        $.get("/", function(data){
          window.location.href = this.url;
          $("body").html(data);
        });
      }
    });
  });

  $( "#user-button" ).click(function(){
    $.get("/api/users/current", function(userid){
      if(userid){
        $.get(`/users/${userid}`, function(data){
          window.location.href = this.url;
          $("body").html(data);
        });
      }else{
        $.get("/", function(data){
          window.location.href = this.url;
          $("body").html(data);
        });
      }
    });
  });

});
