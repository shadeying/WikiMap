$(document).ready(function() {

  $( marker ).click(function(){
    addInfoWindow('Hello WikiMap :|');
    infowindow.open(map, marker);
  });

});
