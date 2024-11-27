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
        isset($data['password']) &&
        isset($data['email'])
    ) {
        $email = $data['email'];
        $password = $data['password'];

        $stmt = $conn->prepare("SELECT password, name, member_id FROM Members WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($hashed_password, $name, $memberID);
            $stmt->fetch();

            if (password_verify($password, $hashed_password)) {
                $stmt2 = $conn->prepare("SELECT account_id FROM CaregiverAccount WHERE member_id = ?");
                $stmt2->bind_param("i", $memberID);
                $stmt2->execute();
                $stmt2->store_result();

                if ($stmt2->num_rows == 0) {  //if no account exists, create one
                    $balance = 2000.00;
                    $default_review = 0.00;
                    $stmt3 = $conn->prepare("INSERT INTO CaregiverAccount (member_id, balance, review_score) VALUES (?, ?, ?)");
                    $stmt3->bind_param("idd", $memberID, $balance, $default_review);
                    $stmt3->execute();
                }
                
                echo json_encode(["success" => true, "message" => "Login successful.", "name" => $name]);
            } else {
                echo json_encode(["success" => false, "message" => "Invalid password."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "User not found."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Invalid input. Email and password are required."]);
    }

    $conn->close();
?>