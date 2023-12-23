<?php
require_once 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $date = $data["date"];
    $formattedDate = date("Y-m-d", strtotime($date));

    $sqlContract = "INSERT INTO Contracts (contract_number, contract_date, counterparty_id, contract_amount) VALUES (:number, :date, :counterparty_id, :amount)";

    try {
        $stmt = $pdo->prepare($sqlContract);
        $stmt->bindParam(":number", $data["number"]);
        $stmt->bindParam(":date", $formattedDate);
        $stmt->bindParam(":counterparty_id", $data["counterparty_id"]);
        $stmt->bindParam(":amount", $data["amount"]);
        $stmt->execute();

        $contractId = $pdo->lastInsertId();

        if (!empty($data["attach"])) {

            $ownerType = "contracts"; // Тип владельца файла
            $sqlOwner = "INSERT INTO attachment_owners (contract_id, owner_type) VALUES (:contract_id, :owner_type)";
            $stmtOwner = $pdo->prepare($sqlOwner);
            $stmtOwner->bindParam(":contract_id", $contractId);
            $stmtOwner->bindParam(":owner_type", $ownerType);
            $stmtOwner->execute();

            $ownerId = $pdo->lastInsertId();
            $fileName = $data["attach"]["name"];
            $fileName = preg_replace('/[^\p{L}\p{N}\s]/u', '', $fileName);
            $fileData = $data["attach"]["data"];

            $sqlAttachment = "INSERT INTO attachment_files (owner_id, file_name, file_data) VALUES (:owner_id, :file_name, :file_data)";
            $stmtAttachment = $pdo->prepare($sqlAttachment);
            $stmtAttachment->bindParam(":owner_id", $ownerId);
            $stmtAttachment->bindParam(":file_name", $fileName);
            $stmtAttachment->bindParam(":file_data", $fileData);
            $stmtAttachment->execute();
            
        }

        echo "Договор успешно сохранен.";
    } catch (PDOException $e) {
        file_put_contents('server_log/log.txt', $e, FILE_APPEND);
        echo "Ошибка при сохранении договора: " . $e->getMessage();
    }
}

?>