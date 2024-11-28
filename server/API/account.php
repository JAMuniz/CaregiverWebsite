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
        $member_id = $data['member_id'];
        
        $stmt = $conn->prepare("SELECT balance, review_score FROM CaregiverAccount WHERE member_id = ?");
        $stmt->bind_param("i", $member_id);
        $stmt->execute();
        $stmt->store_result();

        $stmt2 = $conn->prepare("SELECT * FROM Members WHERE member_id = ?");
        $stmt2->bind_param("i", $member_id);
        $stmt2->execute();
        $stmt2->store_result();

        if ($stmt->num_rows > 0 && $stmt2->num_rows > 0) {
            $stmt->bind_result($balance, $review_score);
            $stmt->fetch();
            $stmt2->bind_result($mid, $name, $pass, $address, $phoneNum, $maxHours, $balance2, $parentInfo, $email);
            $stmt2->fetch();

            echo json_encode(["success" => true, "message" => "Account info found.",
                "balance" => $balance,
                "review_score" => $review_score,
                "mid" => $mid,
                "username" => $name,
                "address" => $address,
                "phone_number" => $phoneNum,
                "max_service_hours_per_week" => $maxHours,
                "parent_info" => $parentInfo,
                "email" => $email
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Could not retrieve account info."]);
        }

        $stmt->close();
        $stmt2->close();
    }

    $conn->close();
?>