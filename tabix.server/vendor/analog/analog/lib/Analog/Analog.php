<?php

namespace Analog;

/**
 * Analog - PHP 5.3+ logging class
 *
 * Copyright (c) 2012 Johnny Broadway
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * A short and simple logging class for based on the idea of using closures for
 * configurability and extensibility. Functions as a static class, but you can
 * completely control the formatting and writing of log messages through closures.
 *
 * By default, this class will write to a file named /tmp/log.txt using a format
 * "machine - date - level - message\n".
 *
 * I wrote this because I wanted something simple and small like KLogger, and
 * preferably not torn out of a wider framework if possible. After searching,
 * I wasn't happy with the single-purpose libraries I found. With KLogger for
 * example, I didn't want an object instance but rather a static class, and I
 * wanted more flexibility in the back-end.
 *
 * I also found that the ones that had really flexible back-ends supported a lot
 * that I could never personally foresee needing, and could be easier to extend
 * with new back-ends that may be needed over time. Closures seem a natural fit for
 * this kind of thing.
 *
 * What about Analog, the logfile analyzer? Well, since it hasn't been updated
 * since 2004, I think it's safe to call a single-file PHP logging class the
 * same thing without it being considered stepping on toes :)
 *
 * Usage:
 *
 *     <?php
 *     
 *     require_once ('Analog.php');
 *     
 *     // Default logging to /tmp/analog.txt
 *     Analog::log ('Log this error');
 *     
 *     // Log to a MongoDB log collection
 *     Analog::handler (function ($info) {
 *         static $conn = null;
 *         if (! $conn) {
 *             $conn = new Mongo ('localhost:27017');
 *         }
 *         $conn->mydb->log->insert ($info);
 *     });
 *     
 *     // Log an alert
 *     Analog::log ('The sky is falling!', Analog::ALERT);
 *     
 *     // Log some debug info
 *     Analog::log ('Debugging info', Analog::DEBUG);
 *     
 *     ?>
 *
 * @package Analog
 * @author Johnny Broadway
 */
class Analog {
	/**
	 * List of severity levels.
	 */
	const URGENT   = 0; // It's an emergency
	const ALERT    = 1; // Immediate action required
	const CRITICAL = 2; // Critical conditions
	const ERROR    = 3; // An error occurred
	const WARNING  = 4; // Something unexpected happening
	const NOTICE   = 5; // Something worth noting
	const INFO     = 6; // Information, not an error
	const DEBUG    = 7; // Debugging messages

	/**
	 * The default format for log messages (machine, date, level, message)
	 * written to a file. To change the order of items in the string,
	 * use `%1$s` references.
	 */
	public static $format = "%s - %s - %d - %s\n";

	/**
	 * The default date/time format for log messages written to a file.
	 * Feeds into the `$format` property.
	 */
	public static $date_format = 'Y-m-d H:i:s';
	
	/**
	 * Timezone for date/time values.
	 */
	public static $timezone = 'GMT';
	
	/**
	 * Default log level.
	 */
	public static $default_level = 3;

	/**
	 * The method of saving the log output. See Analog::handler()
	 * for details on setting this.
	 */
	private static $handler = null;

	/**
	 * The name of the current machine, defaults to $_SERVER['SERVER_ADDR']
	 * on first call to format_message(), or 'localhost' if $_SERVER['SERVER_ADDR']
	 * is not set (e.g., during CLI use).
	 */
	public static $machine = null;

	/**
	 * Handler getter/setter. If no handler is provided, it will set it to
	 * sys_get_temp_dir() . '/analog.txt' as a default. Usage:
	 *
	 *    Analog::handler ('my_log.txt');
	 *
	 * Using a closure:
	 *
	 *     Analog::handler (function ($msg) {
	 *         return error_log ($msg);
	 *     });
 	 */
	public static function handler ($handler = false) {
		if ($handler) {
			self::$handler = $handler;
		} elseif (! self::$handler) {
			self::$handler = realpath (sys_get_temp_dir ()) . DIRECTORY_SEPARATOR . 'analog.txt';
		}
		return self::$handler;
	}

	/**
	 * Get the log info as an associative array.
	 */
	private static function get_struct ($message, $level) {
		if (self::$machine === null) {
			self::$machine = (isset ($_SERVER['SERVER_ADDR'])) ? $_SERVER['SERVER_ADDR'] : 'localhost';
		}

		$dt = new \DateTime ('now', new \DateTimeZone (self::$timezone));

		return array (
			'machine' => self::$machine,
			'date' => $dt->format (self::$date_format),
			'level' => $level,
			'message' => $message
		);
	}

	/**
	 * Write a raw message to the log using a function or the default
	 * file logging.
	 */
	private static function write ($struct) {
		$handler = self::handler ();

		if (! $handler instanceof \Closure) {
			$handler = \Analog\Handler\File::init ($handler);
		}
		return $handler ($struct);
	}

	/**
	 * This is the main function you will call to log messages.
	 * Defaults to severity level Analog::ERROR, which can be
	 * changed via the `$default_level` property.
	 * Usage:
	 *
	 *     Analog::log ('Debug info', Analog::DEBUG);
	 */
	public static function log ($message, $level = null) {
		$level = ($level !== null) ? $level : self::$default_level;
		return self::write (self::get_struct ($message, $level));
	}
	
	/**
	 * Shortcut method for Analog::log($info, Analog::URGENT)
	 * Usage:
	 *
	 *     Analog::urgent ('Debug info');
	 */
	public static function urgent ($message) {
		return self::write (self::get_struct ($message, self::URGENT));
	}
	
	/**
	 * Shortcut method for Analog::log($info, Analog::ALERT)
	 * Usage:
	 *
	 *     Analog::alert ('Debug info');
	 */
	public static function alert ($message) {
		return self::write (self::get_struct ($message, self::ALERT));
	}
	
	/**
	 * Shortcut method for Analog::log($info, Analog::ERROR)
	 * Usage:
	 *
	 *     Analog::error ('Debug info');
	 */
	public static function error ($message) {
		return self::write (self::get_struct ($message, self::ERROR));
	}
	
	/**
	 * Shortcut method for Analog::log($info, Analog::WARNING)
	 * Usage:
	 *
	 *     Analog::warning ('Debug info');
	 */
	public static function warning ($message) {
		return self::write (self::get_struct ($message, self::WARNING));
	}
	
	/**
	 * Shortcut method for Analog::log($info, Analog::NOTICE)
	 * Usage:
	 *
	 *     Analog::notice ('Debug info');
	 */
	public static function notice ($message) {
		return self::write (self::get_struct ($message, self::NOTICE));
	}
	
	/**
	 * Shortcut method for Analog::log($info, Analog::INFO)
	 * Usage:
	 *
	 *     Analog::info ('Debug info');
	 */
	public static function info ($message) {
		return self::write (self::get_struct ($message, self::INFO));
	}
	
	/**
	 * Shortcut method for Analog::log($info, Analog::DEBUG)
	 * Usage:
	 *
	 *     Analog::debug ('Debug info');
	 */
	public static function debug ($message) {
		return self::write (self::get_struct ($message, self::DEBUG));
	}
	
}