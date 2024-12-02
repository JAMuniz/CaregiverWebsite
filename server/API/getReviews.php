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
        $stmt1 = $conn->prepare("SELECT AVG(score) AS average_score FROM Ratings WHERE member_id = ?");
        $stmt1->bind_param("i", $data['member_id']);
        $stmt1->execute();
        $stmt1->bind_result($average_score);
        $stmt1->fetch();
        $stmt1->close();

        if (is_null($average_score)) {
            $average_score = 0.00;
        }

        $stmt2 = $conn->prepare("SELECT score, review_text, contract_id FROM Ratings WHERE member_id = ? ORDER BY rating_id DESC LIMIT 10");
        $stmt2->bind_param("i", $data['member_id']);
        $stmt2->execute();
        $result = $stmt2->get_result();

        $ratings = [];
        while ($row = $result->fetch_assoc()) {
            $ratings[] = $row;
        }
        $stmt2->close();

        echo json_encode(["success" => true, "ratings" => $ratings, "average_score" => $average_score]);
    } else {
        echo json_encode(["success" => false, "message" => "Member ID is required."]);
    }

    $conn->close();
?>
