<?php

header("Access-Control-Allow-Origin: *");


header("Access-Control-Allow-Methods: GET, POST");


header("Access-Control-Allow-Headers: Content-Type");


$servername = "localhost";
$username = "admin";
$password = "1234";
$dbname = "task";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT * FROM taskdata";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  
    $todos = array();
   
    while($row = $result->fetch_assoc()) {
        $todo = array(
            'id' => $row['id'],
            'text' => $row['name'],
            'day' => $row['date'],
            'priority' => $row['pri']
        );
   
        array_push($todos, $todo);
    }
 
    echo json_encode($todos);
} else {

    $response = array('status' => 'error', 'message' => 'No todos found');
  
    echo json_encode($response);
}


$conn->close();
?>
