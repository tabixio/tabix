<?php

/**
 * This works with test_post.php to verify sent data.
 * Run me via:
 *
 *     php -S localhost:8080 server.php
 *
 * Note: Requires PHP 5.4+
 */
file_put_contents ('php://stdout', 'Logged: ' . join (' - ', $_POST) . "\n");

?>