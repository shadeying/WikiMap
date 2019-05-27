const initEdit = (userid) => {
  $(document).on( "click", "div.point.hvr-grow" , function(event) {
    $(this).siblings( "div.edit-point" ).slideToggle();
    $(this).find( "input[name=pointtitle]" ).focus();
  });

  $(document).on( "click", "#delete-button", function(event) {
    $(this).parents("section.point-container").remove();
    // $(this).parents("section.point-container").attr("id").setMap(null);
  });

};
