<?php

namespace Analog\Handler;

/**
 * Post the log info to the specified address.
 *
 * Usage:
 *
 *     $address = 'http://my-log-server/log-me';
 *     Analog::handler (Analog\Handler\Post::init ($address));
 *
 * The server will receive an HTTP POST request with four
 * parameters:
 *
 * - machine
 * - date
 * - level
 * - message
 *
 * Note: Requires cURL.
 */
class Post {
	public static function init ($address) {
		return function ($info) use ($address) {
			if (! extension_loaded ('curl')) {
				throw new \LogicException ('CURL extension not loaded.');
			}

			$ch = curl_init ();
			curl_setopt ($ch, CURLOPT_URL, $address);
			curl_setopt ($ch, CURLOPT_MAXREDIRS, 3);
			curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, 0);
			curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt ($ch, CURLOPT_VERBOSE, 0);
			curl_setopt ($ch, CURLOPT_HEADER, 0);
			curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 10);
			curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, 0);
			curl_setopt ($ch, CURLOPT_SSL_VERIFYHOST, 0);
			curl_setopt ($ch, CURLOPT_POST, 1);
			curl_setopt ($ch, CURLOPT_POSTFIELDS, $info);
			curl_exec ($ch);
			curl_close ($ch);
		};
	}
}