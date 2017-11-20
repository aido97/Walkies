
<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully\n";


$sql = "INSERT INTO walkies_web.users (user_email, first_name, last_name, gender, date_of_birth, addr1, addr2, zip, phone_number)
VALUES ('{$_SESSION['email']}', '{$_SESSION['fname']}', '{$_SESSION['lname']}', '{$_SESSION['gender']}','{$_SESSION['dob']}', '{$_SESSION['addr1']}','{$_SESSION['addr2']}', '{$_SESSION['zip']}','{$_SESSION['phone']}' )";

if ($conn->query($sql) === TRUE) {
    echo "\nNew record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
?>