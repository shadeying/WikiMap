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

// [{"mapid":1,"ownerid":"alice","name":"a","description":"this is map a"},
// {"mapid":2,"ownerid":"bob","name":"b","description":"this is map b"},
// {"mapid":3,"ownerid":"charlie","name":"c","description":"this is map c"}]
