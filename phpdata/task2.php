<?php
echo "id\tsale_id\tsale_purchase_id\tlocation_name\tdelivery_date\tbalance_paid\ttax\n";

$servername = "192.154.228.83";
$username = "kashibos_ditinex";
$password = "RIar5wKyj5T+";
$dbname = "kashibos_ditinex";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT 
            se.id,
            se.sale_id,
            GROUP_CONCAT(se.sale_purchase_id SEPARATOR ',') AS sale_purchase_id,
            fl.franchise_name AS location_name,
            MAX(se.delivery_date) AS delivery_date,
            SUM(pe.balance_paid) AS balance_paid,
            (SUM(pe.balance_paid) * fl.tax / 100) AS tax
        FROM 
            sales_everything se
        JOIN 
            franchise_location fl ON se.location_id = fl.location_id
        JOIN 
            payment_everything pe ON se.sale_id = pe.sale_id
        WHERE 
            se.sale_discount_type NOT LIKE '%Benefit%'
            AND (se.transaction_type = 'New Portion Exchange' OR se.transaction_type = 'Sale')
        GROUP BY 
            se.sale_id
        LIMIT 
            0, 25";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    echo $row["id"] . "\t" . $row["sale_id"] . "\t" . $row["sale_purchase_id"] . "\t" . $row["location_name"] . "\t" . $row["delivery_date"] . "\t" . $row["balance_paid"] . "\t" . $row["tax"] . "\n";
  }
} else {
  echo "0 results";
}

$conn->close();
?>
