<?php

namespace Analog\Handler;

/**
 * Send the log message to an Amon monitoring server (http://amon.cx/).
 *
 * Usage:
 *
 *     // First include the Amon classes
 *     require 'amon.php';
 *     
 *     // Initialize the Analog Amon handler
 *     Analog::handler (Analog\Handler\Amon::init (
 *         'http://127.0.0.1', // server address
 *         2464,               // port number
 *         'abc123def456'      // application key
 *     ));
 */
class Amon {
	public static function init ($host = 'http://127.0.0.1', $port = 2464, $key = false) {
		\Amon::config (array (
			'host' => $host,
			'port' => $port,
			'application_key' => $key
		));

		$tags = array (
			0 => 'urgent',
			1 => 'alert',
			2 => 'critical',
			3 => 'error',
			4 => 'warning',
			5 => 'notice',
			6 => 'info',
			7 => 'debug'
		);

		return function ($info) use ($tags) {
			\Amon::log ($info, array ($tags[$info['level']]));
		};
	}
}