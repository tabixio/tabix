<?php

namespace Analog\Handler;

require_once __DIR__ . '/../../ChromePhp.php';

/**
 * Log to the [Chrome Logger](http://craig.is/writing/chrome-logger).
 * Based on the [ChromePhp library](https://github.com/ccampbell/chromephp).
 *
 * Usage:
 *
 *     Analog::handler (Analog\Handler\ChromeLogger::init ());
 *     
 *     // send a debug message
 *     Analog::debug ($an_object);
 *
 *     // send an ordinary message
 *     Analog::info ('An error message');
 */
class ChromeLogger {
	public static function init () {
		return function ($info) {
			switch ($info['level']) {
				case \Analog\Analog::DEBUG:
					\ChromePhp::log ($info['message']);
					break;
				case \Analog\Analog::INFO:
				case \Analog\Analog::NOTICE:
					\ChromePhp::info ($info['message']);
					break;
				case \Analog\Analog::WARNING:
					\ChromePhp::warn ($info['message']);
					break;
				case \Analog\Analog::ERROR:
				case \Analog\Analog::CRITICAL:
				case \Analog\Analog::ALERT:
				case \Analog\Analog::URGENT:
					\ChromePhp::error ($info['message']);
					break;
			}
		};
	}
}