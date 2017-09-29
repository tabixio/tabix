<?php

require '../lib/Analog.php';

$log = '';

Analog::handler (Analog\Handler\Threshold::init (
	Analog\Handler\Variable::init ($log),
	Analog::ERROR
));

// these will be ignored
Analog::log ('Debugging...', Analog::DEBUG);
Analog::log ('Minor warning...', Analog::WARNING);

echo "Log is still empty:\n" . $log . "\n";

// but these will be logged
Analog::log ('An error...', Analog::ERROR);
Analog::log ('Oh noes!', Analog::URGENT);

echo "Log now has everything:\n" . $log;

?>