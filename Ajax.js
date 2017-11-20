<script type = "text/javascript">
function send_data() {
/* global $ */$.ajax( { type : 'POST',
          data : { },
          url  : '../data_connect.php',              // <=== CALL THE PHP FUNCTION HERE (data_connect.php)
          success: function ( data ) {
                           
          },
          error: function ( xhr ) {
            
          }
        });
}

    </script>