<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
date_default_timezone_set('Europe/Moscow');

define('LIB_PATH',__DIR__.'');

// --------------------------------------------------------------------------------------------------
// main lib
include_once 'autoloader.php';
include_once '../vendor/autoload.php';
// --------------------------------------------------------------------------------------------------
include_once 'SlimJson/Middleware.php';
include_once 'SlimJson/View.php';
include_once 'app.php';
