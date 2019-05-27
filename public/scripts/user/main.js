$(document).ready(function() {

  $( "span.sign-up" ).click(function(){
    $( "span#sign-up-form" ).toggle( "slide" );
    $( "span.new-map" ).toggle( "slide" );
  });

  $( "span.new-map" ).click(function(){
    $.get( "/api/users/current", function(userid){
      if(userid){
        $.post("/api/maps/new", function(data){
          window.location.href = data.url;
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

  $( "button.login" ).click(function(){
    const username = $("input[name=userid]").val();
    $.get(`/users/${username}`, function(data){
        $.get(`/api/users/${username}/login`);
        window.location.href = this.url;
        $("body").html(data);
      });
  })

});
