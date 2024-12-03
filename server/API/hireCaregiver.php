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
        isset($data['member_id']) &&
        isset($data['caregiver_id']) &&
        isset($data['start_date']) &&
        isset($data['end_date']) &&
        isset($data['daily_hours']) &&
        isset($data['rate_per_hour']) &&
        isset($data['status'])
    ) {
        $stmt = $conn->prepare("INSERT INTO Contracts (member_id, caregiver_id, start_date, end_date, daily_hours, rate_per_hour, status) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param(
            "iissids",
            $data['member_id'],
            $data['caregiver_id'],
            $data['start_date'],
            $data['end_date'],
            $data['daily_hours'],
            $data['rate_per_hour'],
            $data['status']
        );

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Caregiver hired successfully!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error hiring caregiver: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Invalid input. All fields are required."]);
    }

    $conn->close();
?>
