<?php

require '../lib/Analog.php';

Analog::handler (Analog\Handler\Buffer::init (
	Analog\Handler\Mail::init (
		'you@example.com',
		'Log messages',
		'noreply@example.com'
	)
));

// will all be sent as one email instead of three
Analog::log ('Message one');
Analog::log ('Message two');
Analog::log ('Message three');

?>