$(document).ready(function() {

  $( "div.point" ).click(function(){
    $( "div.edit-point" ).slideToggle();
    $( "input[name=pointtitle]" ).focus();
  });

});
