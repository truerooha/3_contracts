<?php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $userData = json_decode(file_get_contents('php://input'), true);
    $username = filter_var(trim($userData['username']), FILTER_SANITIZE_STRING);
    $password = filter_var(trim($userData['password']), FILTER_SANITIZE_STRING);
    
    //TODO вывести в отдельную процедуру
    $sql = "SELECT * FROM `users` WHERE `username` = :username";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if(count($users) > 0) {
            $errorMessage = array('Message' => 'Пользователь с таким логином уже существует', 'Code' => '0001');
            header("Content-Type: application/json");
            header('HTTP/1.1 207 Multi-Status');
            echo json_encode($errorMessage);
            exit();
        }
    } catch (PDOException $e) {
        file_put_contents('server_log/log.txt', $e, FILE_APPEND);
        die("Ошибка при выполнении SQL-запроса: " . $e->getMessage());
    }

    $password = md5($password."itsalive");
    $sqlNewUser = "INSERT INTO users (username, password) VALUES (:username, :password)";

    try {
        $stmt = $pdo->prepare($sqlNewUser);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":password", $password );
        file_put_contents('server_log/log.txt',$username, FILE_APPEND);
        file_put_contents('server_log/log.txt',$password, FILE_APPEND);

        $stmt->execute();
    } catch (PDOException $e) {
        file_put_contents('server_log/log.txt', $e, FILE_APPEND);
        echo "Ошибка при сохранении пользователя: " . $e->getMessage();
    } finally {
        if ($pdo !== null) {
            $pdo = null;
        }
    }

} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE')  {

    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data["user_id"];

    try {
        $stmt = $pdo->prepare("DELETE FROM users WHERE id = :user_id");
        $stmt->bindParam(":user_id", $user_id, PDO::PARAM_INT);
        $stmt->execute();

        echo "Пользователь успешно удален.";
    } catch (PDOException $e) {
        echo "Ошибка при удалении пользователя: " . $e->getMessage();
    }

} else {
    echo json_encode(['error' => 'Неверный метод запроса']);
}

?>