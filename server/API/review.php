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

    if (!isset($data['caregiver_id'])) {
        echo json_encode(["success" => false, "message" => "Caregiver ID is required."]);
        exit;
    }

    $stmt = $conn->prepare("SELECT review_score, review_count FROM CaregiverAccount WHERE member_id = ?");
    $stmt->bind_param("i", $data['caregiver_id']);
    $stmt->execute();
    $stmt->bind_result($current_score, $review_count);
    $stmt->fetch();
    $stmt->close();

    if ($review_count === null) {
        $review_count = 0;
        $current_score = 0.0;
    }

    $new_review_count = $review_count + 1;
    $new_average_score = (($current_score * $review_count) + (float)$data['review_score']) / $new_review_count;

    $update_stmt = $conn->prepare("UPDATE CaregiverAccount SET review_score = ?, review_count = ? WHERE member_id = ?");
    $update_stmt->bind_param("dii", $new_average_score, $new_review_count, $data['caregiver_id']);

    if ($update_stmt->execute()) {        
        echo json_encode(["success" => true, "message" => "Review submitted successfully!", "new_score" => $new_average_score]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to submit review."]);
    }

    $update_stmt->close();
    $conn->close();
?>
