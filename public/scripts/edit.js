$(document).ready(function() {

  $( "section.point-container" ).click(function(){
    $(this).find( "div.edit-point" ).slideToggle();
    $(this).find( "input[name=pointtitle]" ).focus();
  });

  $( "#delete-button" ).click(function(event){
    // event.preventDefault();
    $(this).parents("section.point-container").remove();
  })

  $( "#user-button" ).click(function(){
    $.get("/:userid", );
  });

  $( "#login-button" ).click(function(){

  });

  $( "#create-button" ).click(function(){
    $.get("/new");
  });

  let click = 0;
  $(document).on( "click", "button.fav-button", function(event) {
    event.preventDefault();
    if(click === 0){
      click ++;
    }else{
      click --;
    }

    if(click === 1){
      document.getElementsByClassName("fav-button")[0].style.color = "#FE938C";
    }else{
      document.getElementsByClassName("fav-button")[0].style.color = "#5D576B";
    }
  });

});
