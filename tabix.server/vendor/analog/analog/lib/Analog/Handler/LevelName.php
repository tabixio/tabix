<?php

namespace Analog\Handler;

/**
 * Translates log level codes to their names
 *
 *
 * Usage:
 *
 *     // The log level (3rd value) must be formatted as a string
 *     Analog::$format = "%s - %s - %s - %s\n";
 * 
 *     Analog::handler (Analog\Handler\LevelName::init (
 *         Analog\Handler\File::init ($file)
 *     ));
 */
class LevelName {
	/**
	 * Translation list for log levels.
	 */
	private static $log_levels = array (
		\Analog\Analog::DEBUG    => 'DEBUG',
		\Analog\Analog::INFO     => 'INFO',
		\Analog\Analog::NOTICE   => 'NOTICE',
		\Analog\Analog::WARNING  => 'WARNING',
		\Analog\Analog::ERROR    => 'ERROR',
		\Analog\Analog::CRITICAL => 'CRITICAL',
		\Analog\Analog::ALERT    => 'ALERT',
		\Analog\Analog::URGENT   => 'URGENT'
	);

	/**
	 * This contains the handler to send to
	 */
	public static $handler;

	public static function init ($handler) {
		self::$handler = $handler;

		return function ($info) {
			if (isset(self::$log_levels[$info['level']])) {
				$info['level'] = self::$log_levels[$info['level']];
			}
			$handler = LevelName::$handler;
			$handler ($info);
		};
	}

}