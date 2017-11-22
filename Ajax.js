<script type = "text/javascript">
function toggle_walker() {
/* global $ */$.ajax( { type : 'POST',
          data : { },
          url  : 'db/toggle_walker.php',              // <=== CALL THE PHP FUNCTION HERE (data_connect.php)
          success: function ( data ) {
                           
          },
          error: function ( xhr ) {
            
          }
        })
}

    </script>