<?php

require '../lib/Analog.php';

Analog::handler (Analog\Handler\ChromeLogger::init ());

// debug-level message
Analog::debug ($_SERVER);

// an info message
Analog::info ('An error message');

// a warning message
Analog::warning ('Turn back before it\'s too late');

// an error with no file/line #'s
Analog::log ('Another error message');

?>