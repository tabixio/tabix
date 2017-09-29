<?php

require '../lib/Analog.php';

Analog::handler (Analog\Handler\FirePHP::init ());

// debug-level message
Analog::log (array ('A debug message', __FILE__, __LINE__), Analog::DEBUG);

// an info message
Analog::log (array ('An error message', __FILE__, __LINE__), Analog::INFO);

// an error with no file/line #'s
Analog::log ('Another error message');

?>