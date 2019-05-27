$(document).ready(function() {
  $(document).on( "click", "article.point-container.hvr-grow" , function(event) {
    $(this).find( "footer" ).slideToggle();
  });
  $(document).on( "click", ".delete-button", function(event) {
    $(this).parents("article.point-container").remove();
    // $(this).parents("section.point-container").attr("id").setMap(null);
  });

};
