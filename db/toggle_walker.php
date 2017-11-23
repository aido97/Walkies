<?php

require_once('../data_config.php'); 
    
    $email = $_SESSION['email'];
    
    
    $result = mysqli_query($conn, "SELECT walker FROM walkies_web.users WHERE user_email = '$email'");
    $row = mysqli_fetch_assoc($result);
    
    $toggle = $row['walker'];
    
    echo $toggle;
    
    if ($toggle === 'Y'){
        
        $sql = "UPDATE walkies_web.users SET walker='N' WHERE user_email = '$email' ";

        if ($conn->query($sql) === TRUE) {
            echo "Record updated successfully";
        } else {
            echo "Error updating record: " . $conn->error;
        }
                
            }
            
    else {
        
        $sql = "UPDATE walkies_web.users SET walker='Y' WHERE user_email = '$email' ";

        if ($conn->query($sql) === TRUE) {
            echo "Record updated successfully";
        } else {
            echo "Error updating record: " . $conn->error;
        }
        
    }
    
    ?>