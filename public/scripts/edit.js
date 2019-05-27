$(document).ready(function() {

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
