<?php

require '../lib/Analog.php';

$log_file = 'log.txt';

Analog::handler (Analog\Handler\File::init ($log_file));

Analog::log ('foo');
Analog::log ('bar');

echo file_get_contents ($log_file);
unlink ($log_file);

?>