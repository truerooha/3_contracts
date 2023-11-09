<?php
    require_once 'db_connect.php';
    $userData = json_decode(file_get_contents('php://input'), true);

    $username = filter_var(trim($userData['username']), FILTER_SANITIZE_STRING);
    $password = filter_var(trim($userData['password']), FILTER_SANITIZE_STRING);
    $password = md5($password."itsalive");

    $sql = "SELECT * FROM `users` WHERE `username` = :username AND `password` = :password";
    //TODO можно сделать запрос только по логину, чтобы можно было разделить ошибки

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);

        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if(count($users) == 0) {
            $response = array('authorized' => false);
            exit();
        } else {
            $response = array('authorized' => true);
        }

        header("Content-Type: application/json");
        echo json_encode($response);

    } catch (PDOException $e) {
        file_put_contents('server_log/log.txt', $e, FILE_APPEND);
        die("Ошибка при выполнении SQL-запроса: " . $e->getMessage());
    } finally {
        if ($pdo !== null) {
            $pdo = null;
        }
    }

?>