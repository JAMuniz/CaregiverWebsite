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

    if (isset($data['member_id'])) {
        $logged_in_member_id = $data['member_id'];

        $stmt = $conn->prepare("
            SELECT m.member_id, m.name, m.phone_number, m.max_service_hours_per_week, ca.review_score 
            FROM CaregiverAccount ca
            JOIN Members m ON ca.member_id = m.member_id
            WHERE m.member_id != ? AND ca.careStatus = 'active'
        ");
        $stmt->bind_param("i", $logged_in_member_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $caregivers = [];
        while ($row = $result->fetch_assoc()) {
            $caregivers[] = $row;
        }
        $stmt->close();

        echo json_encode(["success" => true, "caregivers" => $caregivers]);
    } else {
        echo json_encode(["success" => false, "message" => "Member ID is required."]);
    }

    $conn->close();
?>
