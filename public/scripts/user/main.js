$(document).ready(function() {

  $( "span.sign-up" ).click(function(){
    $( "span#sign-up-form" ).toggle( "slide" );
    $( "span.new-map" ).toggle( "slide" );
  });

  $( "span.new-map" ).click(function(){
    $.post("/new", function(data){
      $("body").html(data);
          console.log(data);
          console.log(this);
        });
  });
  //   $.get("/current", function(userid){
  //     if(userid){
  //       $.post("/new", function(data){
  //         alert(data);
  //         console.log(this);
  //       });
  //     }else{
  //       $.get("/", function(data){
  //         window.location.href = this.url;
  //         $("body").html(data);
  //       });
  //     }
  //   });
  // });

  $( "button.login" ).click(function(){
    const username = $("input[name=userid]").val();
    $.get(`/users/${username}`, function(data){
        $.get(`/${username}/login`);
        window.location.href = this.url;
        $("body").html(data);
      });
  })

});
