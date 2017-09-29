<?php

// 1. Install the GELF classes from https://github.com/Graylog2/gelf-php
require 'GELFMessage.php';
require 'GELFMessagePublisher.php';

require '../lib/Analog.php';

Analog::handler (Analog\Handler\GELF::init (
	'localhost'
));

Analog::log ('Error message');
Analog::log (array ('Debug info', __FILE__, __LINE__), Analog::DEBUG);

?>