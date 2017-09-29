<?php

require '../lib/Analog.php';

Analog::handler (Analog\Handler\Mail::init (
	'you@example.com',
	'Log message',
	'noreply@example.com'
));

Analog::log ('Error message');

?>