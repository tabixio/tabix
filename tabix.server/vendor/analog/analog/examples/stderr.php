<?php

require '../lib/Analog.php';

Analog::handler (Analog\Handler\Stderr::init ());

Analog::log ('Output to php://stderr');

?>