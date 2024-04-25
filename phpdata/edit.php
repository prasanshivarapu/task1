<?php

header("Access-Control-Allow-Origin: *");


header("Access-Control-Allow-Methods: POST");


header("Access-Control-Allow-Headers: Content-Type");


$servername = "localhost";
$username = "admin";
$password = "1234";
$dbname = "task";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$postData = json_decode(file_get_contents("php://input"));


$id = $postData->id;
$text = $postData->text;
$day = $postData->day;
$priority = $postData->priority;


$sql = "UPDATE taskdata SET name='$text', date='$day', pri='$priority' WHERE id='$id'";


if ($conn->query($sql) === TRUE) {
   
    $response = array('status' => 'success', 'message' => 'Todo updated successfully');
    echo json_encode($response);
} else {
    
    $response = array('status' => 'error', 'message' => 'Error updating todo: ' . $conn->error);
    echo json_encode($response);
}

$conn->close();
?>
