<?php

namespace Analog\Handler;

/**
 * Note: Deprecated because Null is a reserved word in PHP7.
 * Please use Analog\Handler\Ignore instead.
 *
 * Ignores anything sent to it so you can disable logging.
 *
 * Usage:
 *
 *     Analog::handler (Analog\Handler\Null::init ());
 *     
 *     Analog::log ('Log me');
 */
class Null {
	public static function init () {
		return function ($info) {
			// do nothing
		};
	}
}