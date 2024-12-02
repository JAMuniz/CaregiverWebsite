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

    if (!isset($data['review_score'])) {
        echo json_encode(["success" => false, "message" => "Review score is required."]);
        exit;
    }

    if (!isset($data['contract_id'])) {
        echo json_encode(["success" => false, "message" => "Contract ID is required."]);
        exit;
    }

    $review_message = isset($data['review_message']) ? $data['review_message'] : null;

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

    // update CaregiverAccount
    $update_stmt = $conn->prepare("UPDATE CaregiverAccount SET review_score = ?, review_count = ? WHERE member_id = ?");
    $update_stmt->bind_param("dii", $new_average_score, $new_review_count, $data['caregiver_id']);
    $update_success = $update_stmt->execute();
    $update_stmt->close();

    // populate the review into the Ratings table
    $insert_stmt = $conn->prepare("INSERT INTO Ratings (contract_id, score, review_text, member_id) VALUES (?, ?, ?, ?)");
    $insert_stmt->bind_param("iisi", $data['contract_id'], $data['review_score'], $review_message, $data['caregiver_id']);
    $insert_success = $insert_stmt->execute();
    $insert_stmt->close();

    if ($update_success && $insert_success) {        
        echo json_encode(["success" => true, "message" => "Review submitted successfully!", "new_score" => $new_average_score]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to submit review."]);
    }

    $conn->close();
?>
