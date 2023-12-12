<?php
require_once 'db_connect.php';

$contract_id = isset($_GET['contract_id']) ? $_GET['contract_id'] : null;

if ($contract_id === null) {
    die("Отсутствует параметр contract_id");
}

$sql = "SELECT * FROM contracts WHERE contract_id = :contract_id";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':contract_id', $contract_id, PDO::PARAM_INT);
    $stmt->execute();
    
    $contract = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$contract) {
        die("Запись с contract_id = $contract_id не найдена");
    }

    header('Content-Type: application/json');
    echo json_encode($contract);
} catch (PDOException $e) {
    file_put_contents('server_log/log.txt', $e, FILE_APPEND);
    die("Ошибка при выполнении SQL-запроса: " . $e->getMessage());
} finally {
    if ($pdo !== null) {
        $pdo = null;
    }
}
?>