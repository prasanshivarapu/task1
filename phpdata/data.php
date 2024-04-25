<?php

header("Access-Control-Allow-Origin: *");


header("Access-Control-Allow-Methods: GET, POST, DELETE");


header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->text) && !empty($data->day) && !empty($data->priority)) {
   
    $servername = "localhost";
    $username = "admin";
    $password = "1234";
    $dbname = "task";

  
    $conn = new mysqli($servername, $username, $password, $dbname);

 
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO taskdata (name, date, pri) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $data->text, $data->day, $data->priority);

    if ($stmt->execute()) {
       
        $response = array('status' => 'success', 'message' => 'Todo added successfully');
        echo json_encode($response);
    } else {
     
        $response = array('status' => 'error', 'message' => 'Failed to add todo');
        echo json_encode($response);
    }

 
    $stmt->close();
    $conn->close();
} else {
   
    $response = array('status' => 'error', 'message' => 'Incomplete data');
    echo json_encode($response);
}
?>
