<?php

// 1. Install the Amon PHP lib from http://amon.cx/guide/clients/php/
require 'amon.php';

require '../lib/Analog.php';

Analog::handler (Analog\Handler\Amon::init (
	'http://127.0.0.1',
	2464
));

Analog::log ('Error message');
Analog::log ('Debug info', Analog::DEBUG);

?>