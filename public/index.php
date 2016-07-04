<?php
require_once(__DIR__ . '/config.php');
$method = $_SERVER['REQUEST_METHOD'];

// отдаю index.html
if ($method == "GET") {
    readfile($_SERVER['DOCUMENT_ROOT'].'/app/index.html');
    exit;
}

// Запрос к БД
if ($method == "POST" && trim($_SERVER['REQUEST_URI']) && isset($_POST['sql']) && isset($_POST['auth'])) {
    if (!isset($_POST['sql'])) {
        header('HTTP/1.0 400 Bad Request');
        $message = ["status" => "error", "message" => "Bad Request"];
        echo json_encode($message);
        exit;
    }
    $ch = curl_init($configClickhouse["host"] . ":" . $configClickhouse["port"] . "/?query=". urlencode($_POST['sql']) . (isset($_POST['database']) ? "&database=" . $_POST['database'] : ""));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Basic " . $_POST['auth']]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($ch);
    $info = curl_getinfo($ch);
    curl_close($ch);
    if ($info['http_code'] != 200) {
        header('HTTP/1.0 400 Bad Request');
        $message = ["status" => "error", "message" => $output];
        echo json_encode($message);
        exit;
    } else {
        $message = ["status" => "ok", "message" => $output];
        echo json_encode($message);
    }
} else {
    header("HTTP/1.0 404 Not Found");
    $message = ["status" => "error", "message" => "Not Found Method"];
    echo json_encode($message);
    exit;
}
