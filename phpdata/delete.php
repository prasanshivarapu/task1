<?php

header("Access-Control-Allow-Origin: *");


header("Access-Control-Allow-Methods: GET, POST, DELETE");


header("Access-Control-Allow-Headers: Content-Type");


$servername = "localhost";
$username = "admin";
$password = "1234";
$dbname = "task";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  
    $id = $_GET['id'];

    $sql = "DELETE FROM taskdata WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
     
        $response = array(
            "status" => "success",
            "message" => "Todo deleted successfully"
        );
   
        echo json_encode($response);
    } else {
   
        $response = array(
            "status" => "error",
            "message" => "Failed to delete todo: " . $conn->error
        );
       
        echo json_encode($response);
    }
} else {
 
    $response = array(
        "status" => "error",
        "message" => "Invalid request method"
    );
  
    echo json_encode($response);
}


$conn->close();
?>
