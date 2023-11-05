<?php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userData = json_decode(file_get_contents('php://input'), true);
    $username = $userData['username'];
    $password = $userData['password'];

    $sqlNewUser = "INSERT INTO users (username, password) VALUES (:username, :password)";

    try {
        $stmt = $pdo->prepare($sqlNewUser);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":password", $password );
        $stmt->execute();
    } catch (PDOException $e) {
        file_put_contents('server_log/log.txt', $e, FILE_APPEND);
        echo "Ошибка при сохранении пользователя: " . $e->getMessage();
    } finally {
        if ($pdo !== null) {
            $pdo = null;
        }
    }

} else {
    echo json_encode(['error' => 'Неверный метод запроса']);
}

?>