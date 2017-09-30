<?php

require '../lib/Analog.php';

Analog::handler (Analog\Handler\Syslog::init ('analog', 'user'));

Analog::log ('Error message', Analog::WARNING);

?>