<?php

namespace Analog\Handler;

/**
 * Send the log message to the specified email address.
 *
 * Usage:
 *
 *     Analog::handler (Analog\Handler\Mail::init (
 *         'you@example.com',     // to
 *         'Subject line',        // subject
 *         'no-reply@example.com' // from
 *     ));
 */
class Mail {
	public static function init ($to, $subject, $from) {
		return function ($info, $buffered = false) use ($to, $subject, $from) {
			if($info=="") return; // do not send empty mail.
			$headers = sprintf ("From: %s\r\nContent-type: text/plain; charset=utf-8\r\n", $from);
			$body = ($buffered)
				? "Logged:\n" . $info
				: vsprintf ("Machine: %s\nDate: %s\nLevel: %d\nMessage: %s", $info);

			mail ($to, $subject, wordwrap ($body, 70), $headers);
		};
	}
}
