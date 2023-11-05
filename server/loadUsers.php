<?php
require_once 'db_connect.php';
$sql = "SELECT * FROM users";

try {
    $stmt = $pdo->query($sql);
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    header('Content-Type: application/json');
    echo json_encode($users);
} catch (PDOException $e) {
    file_put_contents('server_log/log.txt', $e, FILE_APPEND);
    die("Ошибка при выполнении SQL-запроса: " . $e->getMessage());
} finally {
    if ($pdo !== null) {
        $pdo = null;
    }
}

?>  