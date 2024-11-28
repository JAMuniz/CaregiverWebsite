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
    
    // if (!isset($data['name']) &&
    //     !isset($data['password']) &&
    //     !isset($data['address']) &&
    //     !isset($data['phone_number']) &&
    //     !isset($data['parent_info']) &&
    //     !isset($data['email']) &&
    //     !isset($data['max_service_hours_per_week'])) {
    //         echo json_encode(["success" => true, "message" => "Update successful!"]);
    // }

    // $name = $data['orig_name'];
    // $pass = $data['orig_pass'];
    // $address = $data['orig_address'];
    // $phoneNum = $data['orig_phone_number'];
    // $parentInfo = $data['orig_parent_info'];
    // $email = $data['orig_email'];
    // $maxHours = $data['orig_max_service_hours_per_week'];
    // $memberID = $data['member_id'];

    // if (isset($data['name']) && $data['name'] != '' && $data['name'] != $data['orig_name']) {
    //     $name = $data['name'];
    // }
    // if (isset($data['password']) && $data['password'] != '') {
    //     $pass = password_hash($data['password'], PASSWORD_BCRYPT);
    // }
    // if (isset($data['address']) && $data['address'] != '' && $data['address'] != $data['orig_address']) {
    //     $address = $data['address'];
    // }
    // if (isset($data['phone_number']) && $data['phone_number'] != '' && $data['phone_number'] != $data['orig_phone_number']) {
    //     $phoneNum = $data['phone_number'];
    // }
    // if (isset($data['parent_info']) && $data['parent_info'] != '' && $data['parent_info'] != $data['orig_parent_info']) {
    //     $parentInfo = $data['parent_info'];
    // }
    // if (isset($data['email']) && $data['email'] != '' && $data['email'] != $data['orig_email']) {
    //     $email = $data['email'];
    // }
    // if (isset($data['max_service_hours_per_week']) && $data['max_service_hours_per_week'] !== '' && $data['max_service_hours_per_week'] != $data['orig_max_service_hours_per_week']) {
    //     $maxHours = (int)$data['max_service_hours_per_week'];
    // }

    
    // $stmt = $conn->prepare("UPDATE `Members` SET `name` = ?, `password` = ?, `address` = ?, `phone_number` = ?, `parent_info` = ?, `email` = ?, `max_service_hours_per_week` = ? WHERE `member_id` = ?;");
    // $stmt->bind_param("ssssssii", $name, $pass, $address, $phoneNum, $parentInfo, $email, $maxHours, $memberID);
    // if ($stmt->execute()) {
    //     echo json_encode(["success" => true, "message" => "Update successful!", "name" => $data['name']]);
    // } else {
    //     echo json_encode(["success" => false, "message" => "Error: " . $query]);
    // }
    // $stmt->close();
    if (
        !isset($data['member_id']) ||
        !isset($data['name']) ||
        !isset($data['address']) ||
        !isset($data['phone_number']) ||
        !isset($data['parent_info']) ||
        !isset($data['email']) ||
        !isset($data['max_service_hours_per_week'])
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

    $sql = "UPDATE `Members` 
            SET `name` = ?, `address` = ?, `phone_number` = ?, `parent_info` = ?, `email` = ?, `max_service_hours_per_week` = ? 
            WHERE `member_id` = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssi", $name, $address, $phoneNum, $parentInfo, $email, $maxHours, $memberID);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Update successful!", "name" => $name]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
?>