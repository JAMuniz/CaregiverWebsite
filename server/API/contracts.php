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

    if (!isset($data['member_id'])) {
        echo json_encode(["success" => false, "message" => "Missing member_id."]);
        exit;
    }

    $memberID = $data['member_id'];

    // hiring contracts
    $hiringContracts = [];
    $stmt = $conn->prepare("SELECT c.contract_id, c.member_id, c.caregiver_id, c.start_date, c.end_date, c.daily_hours, c.rate_per_hour, m.name AS caregiver_name
    FROM 
        Contracts c
    JOIN 
        Members m ON c.caregiver_id = m.member_id
    WHERE 
        c.member_id = ?");
    $stmt->bind_param("i", $memberID);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($contract_id, $member_id, $caregiver_id, $start_date, $end_date, $daily_hours, $rate_per_hour, $caregiver_name);

    while ($stmt->fetch()) {
        $hiringContracts[] = [
            "contract_id" => $contract_id,
            "member_id" => $member_id,
            "caregiver_name" => $caregiver_name,
            "caregiver_id" => $caregiver_id,
            "start_date" => $start_date,
            "end_date" => $end_date,
            "daily_hours" => $daily_hours,
            "rate_per_hour" => $rate_per_hour,
        ];
    }
    $stmt->close();

    // caregiver contracts
    $caregiverContracts = [];
    $stmt = $conn->prepare("SELECT * FROM Contracts WHERE caregiver_id = ?");
    $stmt->bind_param("i", $memberID);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($contract_id, $member_id, $caregiver_id, $start_date, $end_date, $daily_hours, $rate_per_hour);

    while ($stmt->fetch()) {
        $caregiverContracts[] = [
            "contract_id" => $contract_id,
            "member_id" => $member_id,
            "caregiver_id" => $caregiver_id,
            "start_date" => $start_date,
            "end_date" => $end_date,
            "daily_hours" => $daily_hours,
            "rate_per_hour" => $rate_per_hour,
        ];
    }
    $stmt->close();

    echo json_encode([
        "success" => true,
        "hiring_contracts" => $hiringContracts,
        "caregiver_contracts" => $caregiverContracts
    ]);

    $conn->close();
?>
