$(document).ready(function() {

  $(document).on( "click", "div.point.hvr-grow" , function(event) {
    $(this).siblings( "div.edit-point" ).slideToggle();
    $(this).find( "input[name=pointtitle]" ).focus();
  });

  $(document).on( "click", "#delete-button", function(event) {
    $(this).parents("section.point-container").remove();
    // $(this).parents("section.point-container").attr("id").setMap(null);
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
      $.put("/api/maps/:mapid/addFavorite/", {userid: userid, mapid: mapid});
    }else{
      document.getElementsByClassName("fav-button")[0].style.color = "#5D576B";
    }
    $.delete("/api/maps/:mapid/fav/delete", { "userid": userid, "mapid": mapid});
  });

});
