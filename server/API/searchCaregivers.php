<?php
    ini_set('log_errors', 1);
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    $host = 'localhost';
    $username = 'root';
    $password = 'jo651706';
    $dbname = 'CaregiverWebsite';

    $conn = new mysqli($host, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $query = "SELECT m.member_id, m.name, m.phone_number, m.max_service_hours_per_week, ca.review_score 
        FROM 
            CaregiverAccount ca
        JOIN 
            Members m ON ca.member_id = m.member_id;
    ";

    $result = $conn->query($query);

    if ($result) {
        $caregivers = [];
        while ($row = $result->fetch_assoc()) {
            $caregivers[] = $row;
        }
        echo json_encode(["success" => true, "caregivers" => $caregivers]);
    } else {
        echo json_encode(["success" => false, "message" => "Error fetching caregivers: " . $conn->error]);
    }

    $conn->close();
?>
