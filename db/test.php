<?php 
 
       $name   = urldecode($_POST['name']);
       $user   = urldecode($_POST['user']);
       $email  = urldecode($_POST['email']);
       $pass   = urldecode($_POST['pass']);
        
       print " ==== POST DATA =====
       Name  : $name
       Email : $email
       User  : $user
       Pass  : $pass"; 
 
 ?>