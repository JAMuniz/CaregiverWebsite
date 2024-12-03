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
        !isset($data['member_id']) ||
        !isset($data['name']) ||
        !isset($data['address']) ||
        !isset($data['phone_number']) ||
        !isset($data['parent_info']) ||
        !isset($data['email']) ||
        !isset($data['max_service_hours_per_week']) ||
        !isset($data['careStatus'])
    ) {
        echo json_encode(["success" => false, "message" => "Invalid input. Missing required fields."]);
        exit;
    }

    $memberID = $data['member_id'];
    $name = $data['name'];
    $address = $data['address'];
    $phoneNum = $data['phone_number'];
    $parentInfo = $data['parent_info'];
    $email = $data['email'];
    $maxHours = (int)$data['max_service_hours_per_week'];
    $careStatus = $data['careStatus'];

    $sql = "UPDATE `Members` 
            SET `name` = ?, `address` = ?, `phone_number` = ?, `parent_info` = ?, `email` = ?, `max_service_hours_per_week` = ? 
            WHERE `member_id` = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssi", $name, $address, $phoneNum, $parentInfo, $email, $maxHours, $memberID);

    $sql2 = "UPDATE `CaregiverAccount` 
            SET `careStatus` = ? 
            WHERE `member_id` = ?";

    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("si", $careStatus, $memberID);

    if ($stmt->execute() && $stmt2->execute()) {
        echo json_encode(["success" => true, "message" => "Update successful!", "name" => $name]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }

    $stmt->close();
    $stmt2->close();
    $conn->close();
?>