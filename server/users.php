<?php
$users = [
    [
        'id' => 1,
        'username' => 'user1',
    ],
    [
        'id' => 2,
        'username' => 'user2',
    ],
    [
        'id' => 3,
        'username' => 'user3',
    ],
];

header('Content-Type: application/json');
echo json_encode($users);

?>