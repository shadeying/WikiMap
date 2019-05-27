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
      $.ajax({
         url: `/api/maps/:mapid/addFavorite`,
         type: 'PUT',
         success: function(response) {
           //...
         }
      });
    }else{
      document.getElementsByClassName("fav-button")[0].style.color = "#5D576B";
      $.ajax({
         url: `/api/maps/:mapid/deleteFavorite`,
         type: 'DELETE',
         success: function(response) {
           //...
         }
      });
    }
});
