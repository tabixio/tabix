<?php

require '../lib/Analog.php';

$log = '';

Analog::handler (Analog\Handler\LevelBuffer::init (
	Analog\Handler\Variable::init ($log),
	Analog::CRITICAL
));

// none of these will trigger sending the log
Analog::log ('Debugging...', Analog::DEBUG);
Analog::log ('Minor warning...', Analog::WARNING);
Analog::log ('An error...', Analog::ERROR);

echo "Log is still empty:\n" . $log . "\n";

// but this will, and will include all the others in the log
Analog::log ('Oh noes!', Analog::URGENT);

echo "Log now has everything:\n" . $log;

?>