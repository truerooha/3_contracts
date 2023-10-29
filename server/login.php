<?php

$data = json_decode(file_get_contents("php://input"));

if ($data->username === 'user' && $data->password === 'password') {

    $response = array('authorized' => true);
} else {

    $response = array('authorized' => false);
}

header('Content-Type: application/json');

echo json_encode($response);
?>
