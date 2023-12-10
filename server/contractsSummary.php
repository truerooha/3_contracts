<?php
require_once 'db_connect.php';

try {
    $sql = "
        SELECT
            COUNT(*) AS total_contracts,
            SUM(CASE WHEN expiration_date < CURRENT_DATE THEN 1 ELSE 0 END) AS expired_contracts
        FROM
            Contracts
    ";

    $stmt = $pdo->query($sql);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($result);
} catch (PDOException $e) {
    file_put_contents('server_log/log.txt', $e, FILE_APPEND);
    die("Ошибка при выполнении SQL-запроса: " . $e->getMessage());
} finally {
    if ($pdo !== null) {
        $pdo = null;
    }
}
?>