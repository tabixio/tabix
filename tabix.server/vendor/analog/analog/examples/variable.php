<?php

require '../lib/Analog.php';

$log = '';

Analog::handler (Analog\Handler\Variable::init ($log));

Analog::log ('foo');
Analog::log ('bar');

echo $log;

?>