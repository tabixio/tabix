<?php

require 'SplClassLoader.php';

$loader = new SplClassLoader ('Analog', '../lib');
$loader->register ();

use \Analog\Analog;

$log = '';

Analog::handler (\Analog\Handler\Variable::init ($log));

Analog::log ('Test one');
Analog::log ('Test two');

echo $log;

?>