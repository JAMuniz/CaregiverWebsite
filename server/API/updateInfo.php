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

    //if you wanna have a go at this, be my guest

    /*
    if (!isset($data['name']) &&
        !isset($data['password']) &&
        !isset($data['address']) &&
        !isset($data['phone_number']) &&
        !isset($data['parent_info']) &&
        !isset($data['email']) &&
        !isset($data['max_service_hours_per_week'])) {
            echo json_encode(["success" => true, "message" => "Update successful!"]);
    }

    $comma = false;
    $query = "UPDATE Members SET ";

    if (strlen($data['name']) > 0 && $data['name'] != $data['orig_name']) {
        if ($comma) {
            $query = $query . ", ";
        }
        $comma = true;
        $query = $query . "name = \"" . $data['name'] . "\"";
    }
    if (strlen($data['password']) > 0) {
        if ($comma) {
            $query = $query . ", ";
        }
        $comma = true;
        $query = $query . "password = \"" . password_hash($data['password'], PASSWORD_BCRYPT) . "\"";
    }
    if (strlen($data['address']) > 0 && $data['address'] != $data['orig_address']) {
        if ($comma) {
            $query = $query . ", ";
        }
        $comma = true;
        $query = $query . "address = \"" . $data['address'] . "\"";
    }
    if (strlen($data['phone_number']) > 0 && $data['phone_number'] != $data['orig_phone_number']) {
        if ($comma) {
            $query = $query . ", ";
        }
        $comma = true;
        $query = $query . "phone_number = \"" . $data['phone_number'] . "\"";
    }
    if (strlen($data['parent_info']) > 0 && $data['parent_info'] != $data['orig_parent_info']) {
        if ($comma) {
            $query = $query . ", ";
        }
        $comma = true;
        $query = $query . "parent_info = \"" . $data['parent_info'] . "\"";
    }
    if (strlen($data['email']) > 0 && $data['email'] != $data['orig_email']) {
        if ($comma) {
            $query = $query . ", ";
        }
        $comma = true;
        $query = $query . "email = \"" . $data['email'] . "\"";
    }
    if (strlen($data['max_service_hours_per_week']) > 0 && $data['max_service_hours_per_week'] != $data['orig_max_service_hours_per_week']) {
        if ($comma) {
            $query = $query . ", ";
        }
        $comma = true;
        $query = $query . "max_service_hours_per_week = " . $data['max_service_hours_per_week'];
    }

    $query . " WHERE member_id = " . $data['member_id'];

    echo '<script>console.log('.$query.'); </script>';

    $stmt = $conn->prepare($query);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Update successful!", "name" => $data['name']]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }
    $stmt->close();
    */

    $conn->close();
?>