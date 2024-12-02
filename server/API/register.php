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
    $response = ["success" => true, "messages" => []];

    if (
        isset($data['name']) &&
        isset($data['password']) &&
        isset($data['address']) &&
        isset($data['phone_number']) &&
        isset($data['parent_info']) &&
        isset($data['max_service_hours_per_week']) &&
        isset($data['email'])
    ) {
        // insert into Member account
        $stmt = $conn->prepare("INSERT INTO Members (name, password, address, phone_number, parent_info, max_service_hours_per_week, care_money_balance, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssdss", $name, $password, $address, $phone_number, $parent_info, $max_service_hours_per_week, $care_money_balance, $email);

        $name = $data['name'];
        $password = password_hash($data['password'], PASSWORD_BCRYPT); 
        $address = $data['address'];
        $phone_number = $data['phone_number'];
        $parent_info = $data['parent_info'];
        $care_money_balance = 2000.00; 
        $max_service_hours_per_week = (int)$data['max_service_hours_per_week'];
        $email = $data['email'];

        if ($stmt->execute()) {
            $response["messages"][] = "Member registered successfully.";
        } else {
            $response["success"] = false;
            $response["messages"][] = "Error registering member: " . $stmt->error;
        }
        $stmt->close();

        //insert into CaregiverAccount
        $stmt2 = $conn->prepare("SELECT member_id FROM Members WHERE email = ?");
        $stmt2->bind_param("s", $data['email']);
        $stmt2->execute();
        $stmt2->store_result();
        $stmt2->bind_result($member_id);
        $stmt2->fetch();
        $stmt2->close();

        if ($member_id) {
            $stmt3 = $conn->prepare("INSERT INTO CaregiverAccount (member_id, review_score, review_count) VALUES (?, ?, ?)");
            $review_score = 0.00; // default review score
            $review_count = 0;   // default review count
            $stmt3->bind_param("idi", $member_id, $review_score, $review_count);

            if ($stmt3->execute()) {
                $response["messages"][] = "CaregiverAccount created successfully.";
            } else {
                $response["success"] = false;
                $response["messages"][] = "Error creating caregiver account: " . $stmt3->error;
            }
            $stmt3->close();
        } else {
            $response["success"] = false;
            $response["messages"][] = "Error retrieving member ID.";
        }
    } else {
        $response["success"] = false;
        $response["messages"][] = "Invalid input. Missing fields.";
    }

    $conn->close();
    echo json_encode($response);
?>