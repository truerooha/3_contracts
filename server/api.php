<?php

$host = 'localhost';
$port = 8889;
$database = 'contracts';
$username = 'root';
$password = 'root'; 

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Ошибка подключения к базе данных: " . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $data = json_decode(file_get_contents("php://input"), true);
    $contract_id = $data["contract_id"];
    
    try {
        $stmt = $pdo->prepare("DELETE FROM Contracts WHERE contract_id = :contract_id");
        $stmt->bindParam(":contract_id", $contract_id, PDO::PARAM_INT);
        $stmt->execute();
        
        echo "Договор успешно удален.";
    } catch (PDOException $e) {
        echo "Ошибка при удалении договора: " . $e->getMessage();
    }
}

$sql = "SELECT Contracts.contract_id AS id, Contracts.contract_number AS number, Contracts.contract_date AS date,  Contracts.contract_amount AS amount, counterparties.name AS CPname
FROM Contracts
INNER JOIN counterparties ON Contracts.counterparty_id = counterparties.id;
";

try {
    $stmt = $pdo->query($sql);
    $contracts = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Ошибка выполнения SQL-запроса: " . $e->getMessage());
}

// Отправка данных в формате JSON в ответ на HTTP-запрос
header("Content-Type: application/json");
echo json_encode($contracts);

?>