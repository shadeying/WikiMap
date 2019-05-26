$(document).ready(function() {

  $( "span.sign-up" ).click(function(){
    $( "span#sign-up-form" ).toggle( "slide" );
    $( "span.login" ).toggle( "slide" );
    $( "span.new-map" ).toggle( "slide" );
  });

  $( "span.login" ).click(function(){
    $( "span#login-form" ).toggle( "slide" );
    $( "span.sign-up" ).toggle( "slide" );
    $( "span.new-map" ).toggle( "slide" );
  });

  $( "span.new-map" ).click(function(){
    $.get("/new");
  });

  $( "button.login" ).click(function(){
    const username = $("input[name=userid]").val();
    $.get(`/users/${username}`, function(data){
        $.get(`/${username}/login`);
        window.location.href = this.url;
        $("body").html(data);
      });
  })

});

// [{"mapid":1,"ownerid":"alice","name":"a","description":"this is map a"},
// {"mapid":2,"ownerid":"bob","name":"b","description":"this is map b"},
// {"mapid":3,"ownerid":"charlie","name":"c","description":"this is map c"}]
