$(document).ready(function() {

  $(document).on( "click", "section.point-container" , function(event) {
    $(this).find( "div.edit-point" ).slideToggle();
    $(this).find( "input[name=pointtitle]" ).focus();
  });

  $(document).on( "click", "#delete-button", function(event) {
    $(this).parents("section.point-container").remove();
    // $(this).parents("section.point-container").attr("id").setMap(null);
  });

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
    $.post("/:mapid/fav/", { "userid": userid, "mapid": mapid, "fav": click });
  });

});
