<?php
// Заглушка с данными
$contracts = [
    ["id" => 1, "number" => "0018", "date" => "2023-10-30", "counterparty" => "Контрагент 1", "amount" => "1000 руб."],
    ["id" => 2, "number" => "002", "date" => "2023-10-31", "counterparty" => "Контрагент 2", "amount" => "1500 руб."],
    ["id" => 3, "number" => "003", "date" => "2023-11-01", "counterparty" => "Контрагент 3", "amount" => "2000 руб."],
    // Добавьте другие данные о договорах
];

// Отправка данных в формате JSON в ответ на HTTP-запрос
header("Content-Type: application/json");
echo json_encode($contracts);

?>