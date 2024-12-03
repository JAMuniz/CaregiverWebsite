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

    if (!isset($data['contract_id'])) {
        echo json_encode(["success" => false, "message" => "Contract ID is required."]);
        exit;
    }

    $contract_id = $data['contract_id'];

    $stmt = $conn->prepare("UPDATE Contracts SET status = 'terminated' WHERE contract_id = ?");
    $stmt->bind_param("i", $contract_id);

    if ($stmt->execute()) {
        $stmt->store_result();

        $stmt2 = $conn->prepare("SELECT member_id, caregiver_id, start_date, end_date, daily_hours FROM Contracts WHERE contract_id = ?");
        $stmt2->bind_param("i", $contract_id);
        
        if ($stmt2->execute()) {
            $stmt2->store_result();
            $stmt2->bind_result($mem_id, $ca_id, $startDate, $endDate, $dailyHrs);
            $stmt2->fetch();

            $date1 = strtotime($startDate);
            $date2 = strtotime($endDate);
            $secDiff = abs($date2 - $date1);
            $timeDiff = floor(($secDiff) / (3600 * 24));
            $hoursUsed = $timeDiff * $dailyHrs;
            $moneyAmt = $hoursUsed * 30.00;

            $stmt3 = $conn->prepare("UPDATE Members SET remaining_hours = remaining_hours + ?, care_money_balance = care_money_balance + ? WHERE member_id = ?");
            $stmt3->bind_param("iii", $hoursUsed, $moneyAmt, $ca_id);
            if (!$stmt3->execute()) {
                echo json_encode(["success" => false, "message" => "Error updating caregiver info: " . $stmt->error]);
            }
            $stmt3->close();

            $stmt3 = $conn->prepare("UPDATE Members SET care_money_balance = care_money_balance - ? WHERE member_id = ?");
            $stmt3->bind_param("ii", $moneyAmt, $mem_id);
            if (!$stmt3->execute()) {
                echo json_encode(["success" => false, "message" => "Error updating caregiver info: " . $stmt->error]);
            }
            $stmt3->close();

            $stmt2->free_result();
        } else {
            echo json_encode(["success" => false, "message" => "Error fetching caregiver data: " . $stmt->error]);
        }

        $stmt->free_result();
        
        echo json_encode(["success" => true, "message" => "Contract terminated successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error terminating contract: " . $stmt->error]);
    }

    $stmt->close();
    $stmt2->close();
    $conn->close();
?>
