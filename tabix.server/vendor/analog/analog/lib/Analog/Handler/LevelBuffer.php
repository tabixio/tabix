<?php

namespace Analog\Handler;

/**
 * Buffers messages to be sent as a batch to another handler only when a
 * message of a certain level threshold has been received. This means for
 * example that you can trigger a handler only if an error has occurred.
 * Currently only works with the Mail handler.
 *
 * Inspired by the Monolog FingersCrossedHandler.
 *
 * Usage:
 *
 *     Analog::handler (Analog\Handler\LevelBuffer::init (
 *         Analog\Handler\Mail::init ($to, $subject, $from),
 *         Analog::ERROR
 *     ));
 *     
 *     // will all be buffered until something ERROR or above is logged
 *     Analog::log ('Message one', Analog::DEBUG);
 *     Analog::log ('Message two', Analog::WARNING);
 *     Analog::log ('Message three', Analog::URGENT);
 *
 * Note: Uses Analog::$format to format the messages as they're appended
 * to the buffer.
 */
class LevelBuffer {
	/**
	 * This builds a log string of all messages logged.
	 */
	public static $buffer = '';

	/**
	 * This contains the handler to send to on close.
	 */
	private static $handler;

	/**
	 * Accepts another handler function to be used on close().
	 * $until_level defaults to CRITICAL.
	 */
	public static function init ($handler, $until_level = 2) {
		self::$handler = $handler;

		return function ($info) use ($until_level) {
			LevelBuffer::$buffer .= vsprintf (\Analog\Analog::$format, $info);
			if ($info['level'] <= $until_level) {
				// flush and reset the buffer
				LevelBuffer::flush ();
				LevelBuffer::$buffer = '';
			}
		};
	}

	/**
	 * Passes the buffered log to the final $handler.
	 */
	public static function flush () {
		$handler = self::$handler;
		return $handler (self::$buffer, true);
	}
}