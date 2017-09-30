<?php

namespace Analog;

use Psr\Log\LoggerInterface;
use Psr\Log\LogLevel;
use Psr\Log\InvalidArgumentException;

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
 * Implements the PSR-3 standard as a wrapper to Analog. For more information,
 * see:
 *
 * https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md
 *
 * Usage:
 *
 *     <?php
 *     
 *     require_once ('vendor/autoload.php');
 *
 *     $log = new Analog\Logger ();
 *     
 *     $log->notice ('Things are really happening right now.');
 *     
 *     ?>
 *
 * @package Analog
 * @author Johnny Broadway
 */
class Logger implements LoggerInterface {
	/**
	 * Converts from PSR-3 log levels to Analog log levels.
	 */
	public function convert_log_level ($level, $reverse = false) {
		if ($reverse) {
			switch ($level) {
				case Analog::URGENT:
					return LogLevel::EMERGENCY;
				case Analog::ALERT:
					return LogLevel::ALERT;
				case Analog::CRITICAL:
					return LogLevel::CRITICAL;
				case Analog::ERROR:
					return LogLevel::ERROR;
				case Analog::WARNING:
					return LogLevel::WARNING;
				case Analog::NOTICE:
					return LogLevel::NOTICE;
				case Analog::INFO:
					return LogLevel::INFO;
				case Analog::DEBUG:
					return LogLevel::DEBUG;
			}
			throw new InvalidArgumentException ('Level "' . $level . '" is not defined.');
		} else {
			switch ($level) {
				case LogLevel::EMERGENCY:
					return Analog::URGENT;
				case LogLevel::ALERT:
					return Analog::ALERT;
				case LogLevel::CRITICAL:
					return Analog::CRITICAL;
				case LogLevel::ERROR:
					return Analog::ERROR;
				case LogLevel::WARNING:
					return Analog::WARNING;
				case LogLevel::NOTICE:
					return Analog::NOTICE;
				case LogLevel::INFO:
					return Analog::INFO;
				case LogLevel::DEBUG:
					return Analog::DEBUG;
			}
			throw new InvalidArgumentException ('Level "' . $level . '" is not defined.');
		}
	}

	/**
	 * Interpolates context values into the message placeholders.
	 */
	private function interpolate ($message, array $context = array ()) {
		if (is_array ($message)) {
			return $message;
		}

		// build a replacement array with braces around the context keys
		$replace = array ();
		foreach ($context as $key => $val) {
			if (is_object ($val) && get_class ($val) === 'DateTime') {
				$val = $val->format ('Y-m-d H:i:s');
			} elseif (is_object ($val)) {
				$val = json_encode ($val);
			} elseif (is_array ($val)) {
				$val = json_encode ($val);
			} elseif (is_resource ($val)) {
				$val = (string) $val;
			}
			$replace['{' . $key . '}'] = $val;
		}
		
		// interpolate replacement values into the the message and return
		return strtr ($message, $replace);
	}

	/**
	 * Sets the Analog log handler.
	 */
	public function handler ($handler) {
		Analog::handler ($handler);
	}

	/**
	 * Sets the log message format.
	 */
	public function format ($format) {
		Analog::$format = $format;
	}

	/**
	 * System is unusable.
	 */
	public function emergency ($message, array $context = array ()) {
		$this->_log (Analog::URGENT, $message, $context);
	}

	/**
	 * Action must be taken immediately.
	 */
	public function alert ($message, array $context = array ()) {
		$this->_log (Analog::ALERT, $message, $context);
	}

	/**
	 * Critical conditions.
	 */
	public function critical ($message, array $context = array ()) {
		$this->_log (Analog::CRITICAL, $message, $context);
	}

	/**
	 * Runtime errors that do not require immediate action but should typically
	 * be logged and monitored.
	 */
	public function error ($message, array $context = array ()) {
		$this->_log (Analog::ERROR, $message, $context);
	}

	/**
	 * Exceptional occurrences that are not errors.
	 */
	public function warning ($message, array $context = array ()) {
		$this->_log (Analog::WARNING, $message, $context);
	}

	/**
	 * Normal but significant events.
	 */
	public function notice ($message, array $context = array ()) {
		$this->_log (Analog::NOTICE, $message, $context);
	}

	/**
	 * Interesting events.
	 */
	public function info ($message, array $context = array ()) {
		$this->_log (Analog::INFO, $message, $context);
	}

	/**
	 * Detailed debug information.
	 */
	public function debug ($message, array $context = array ()) {
		$this->_log (Analog::DEBUG, $message, $context);
	}

	/**
	 * Logs with an arbitrary level.
	 */
	public function log ($level, $message, array $context = array ()) {
		$this->_log (
			$this->convert_log_level ($level),
			$message,
			$context
		);
	}

	/**
	 * Perform the logging to Analog after the log level has been converted.
	 */
	private function _log ($level, $message, $context) {
		Analog::log (
			$this->interpolate ($message, $context),
			$level
		);
	}
}