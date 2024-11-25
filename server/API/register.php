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

    $data = json_decode(file_get_contents("php://input"), true);

    if (
        isset($data['name']) &&
        isset($data['password']) &&
        isset($data['address']) &&
        isset($data['phone_number']) &&
        isset($data['parent_info']) &&
        isset($data['max_service_hours_per_week']) &&
        isset($data['email'])
    ) {
        $stmt = $conn->prepare("INSERT INTO Members (name, password, address, phone_number, parent_info, max_service_hours_per_week, care_money_balance, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssdss", $name, $password, $address, $phone_number, $parent_info, $max_service_hours_per_week, $care_money_balance, $email);

        $name = $data['name'];
        $password = password_hash($data['password'], PASSWORD_BCRYPT); 
        $address = $data['address'];
        $phone_number = $data['phone_number'];
        $parent_info = $data['parent_info'];
        $care_money_balance = 2000.00; 
        $max_service_hours_per_week = (int)$data['max_service_hours_per_week'];
        $email = $data['email'];

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Registration successful!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Invalid input. Missing fields"]);
    }

    $conn->close();
?>