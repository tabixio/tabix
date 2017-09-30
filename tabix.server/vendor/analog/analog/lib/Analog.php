<?php

/**
 * Register a very simple autoloader for the pre-built handlers
 * based on the current working directory.
 */
spl_autoload_register (function ($class) {
	$file = str_replace ('\\', DIRECTORY_SEPARATOR, ltrim ($class, '\\')) . '.php';
	if (file_exists (__DIR__ . DIRECTORY_SEPARATOR . $file)) {
		require_once $file;
		return true;
	}
	return false;
});

/**
 * We simply alias extend the main class so that Analog is
 * available as a global class. This saves us adding
 * `use \Analog\Analog` at the top of every file,
 * or worse, typeing `\Analog\Analog::log()` everywhere.
 */
class_alias ('\Analog\Analog', 'Analog');