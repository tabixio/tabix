<?php

namespace Analog\Handler;

/**
 * Send the log message to a Graylog2 server (http://graylog2.org/).
 *
 * Usage:
 *
 *     // First include the GELF classes from
 *     // https://github.com/Graylog2/gelf-php
 *     require 'GELFMessage.php';
 *     require 'GELFMessagePublisher.php';
 *     
 *     // Initialize the Analog GELF handler
 *     Analog::handler (Analog\Handler\GELF::init (
 *         '172.16.22.30'
 *     ));
 *     
 *     // Send a message with file and line number
 *     Analog::log (array ('Log me', __FILE__, __LINE__), Analog::DEBUG);
 *     
 *     // Send an ordinary message
 *     Analog::log ('An error message');
 */
class GELF {
	public static function init ($host = '127.0.0.1', $port = \GELFMessagePublisher::GRAYLOG2_DEFAULT_PORT) {
		$publisher = new \GELFMessagePublisher ($host, $port);

		return function ($info) use ($publisher) {
			$message = new \GELFMessage ();
			$message->setHost ($info['machine']);
			$message->setLevel ($info['level']);

			if (is_array ($info['message'])) {
				$message->setShortMessage ($info['message'][0]);
				$message->setFullMessage ($info['message'][0]);
				$message->setFile ($info['message'][1]);
				$message->setLine ($info['message'][2]);
			} else {
				$message->setShortMessage ($info['message']);
				$message->setFullMessage ($info['message']);
			}

			$publisher->publish ($message);
		};
	}
}