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

    if (!isset($data['contract_id'])) {
        echo json_encode(["success" => false, "message" => "Contract ID is required."]);
        exit;
    }

    $contract_id = $data['contract_id'];

    $stmt = $conn->prepare("UPDATE Contracts SET status = 'terminated' WHERE contract_id = ?");
    $stmt->bind_param("i", $contract_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Contract terminated successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error terminating contract: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
?>
