<?php
    require_once 'db_connect.php';
    $userData = json_decode(file_get_contents('php://input'), true);

    $username = filter_var(trim($userData['username']), FILTER_SANITIZE_STRING);
    $password = filter_var(trim($userData['password']), FILTER_SANITIZE_STRING);
    $password = md5($password."itsalive");

    //TODO все эти параметры валидации должны соблюдаться и при создании пользователя
    //возможно надо сделать валидацию отдельным методом

    // if(mb_strlen($username) < 5 || mb_strlen($username) > 90) {
    //     echo "Недопустимая длина логина";
    //     exit();
    // }

    // if(mb_strlen($password) < 5 || mb_strlen($password) > 8) {
    //     echo "Пароль должен содержать от 2 до 8 символов";
    //     exit();
    // }

    $sql = "SELECT * FROM `users` WHERE `username` = :username AND `password` = :password";
    //TODO можно сделать запрос только по логину, чтобы можно было разделить ошибки

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);
        file_put_contents('server_log/log.txt',$username, FILE_APPEND);
        file_put_contents('server_log/log.txt',$password, FILE_APPEND);

        $stmt->execute();
        file_put_contents('server_log/log.txt','запрос сработал', FILE_APPEND);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        file_put_contents('server_log/log.txt',$users, FILE_APPEND);


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