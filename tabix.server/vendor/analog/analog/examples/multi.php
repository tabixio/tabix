<?php

require '../lib/Analog.php';

$errors = "Errors:\n";
$warnings = "Warnings:\n";
$debug = "Debug:\n";

Analog::handler (Analog\Handler\Multi::init (array (
	Analog::ERROR   => Analog\Handler\Variable::init ($errors),
	Analog::WARNING => Analog\Handler\Variable::init ($warnings),
	Analog::DEBUG   => Analog\Handler\Variable::init ($debug)
)));

Analog::log ('First error');
Analog::log ('Emergency!', Analog::URGENT);
Analog::log ('A warning...', Analog::WARNING);
Analog::log ('Some info', Analog::INFO);
Analog::log ('Debugging output', Analog::DEBUG);

echo $errors;
echo "-----\n";
echo $warnings;
echo "-----\n";
echo $debug;

?>