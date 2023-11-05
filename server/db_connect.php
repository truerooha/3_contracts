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
    file_put_contents('server_log/log.txt', $e, FILE_APPEND);
}

?>
