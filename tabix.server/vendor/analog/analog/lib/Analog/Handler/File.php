<?php

namespace Analog\Handler;

/**
 * Append to the specified log file. Does the same thing as the default
 * handling.
 *
 * Usage:
 *
 *     $log_file = 'log.txt';
 *     Analog::handler (Analog\Handler\File::init ($log_file));
 *     
 *     Analog::log ('Log me');
 *
 * Note: Uses Analog::$format for the appending format.
 */
class File {
	public static function init ($file) {
		return function ($info, $buffered = false) use ($file) {
			$f = fopen ($file, 'a+');
			if (! $f) {
				throw new \LogicException ('Could not open file for writing');
			}
	
			if (! flock ($f, LOCK_EX)) {
				throw new \RuntimeException ('Could not lock file');
			}
	
			fwrite ($f, ($buffered)
				? $info
				: vsprintf (\Analog\Analog::$format, $info));
			flock ($f, LOCK_UN);
			fclose ($f);
		};
	}
}
