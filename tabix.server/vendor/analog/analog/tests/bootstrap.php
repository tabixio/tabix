<?php

$filename = __DIR__ .'/../vendor/autoload.php';
if (!file_exists($filename)) {
    throw new Exception("You need to execute `composer install` before running the tests. (vendors are required for test execution)");
}

require_once $filename;
