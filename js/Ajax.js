 function toggle_status(){
     /* global $ */$.ajax( { type : 'POST',
          data : { },
          url  : '../db/toggle_walker.php',              // <=== CALL THE PHP FUNCTION HERE (action.php)
          success: function ( data ) {
                           
          },
          error: function ( xhr ) {
            
          }
        });
 }

function doalert(checkboxElem) {
  if (checkboxElem.checked) {
    toggle_status();
  } else {
    toggle_status();
  }
}