<?php

namespace Analog\Handler;

/**
 * Send the log message to the specified email address using WordPress wp_mail.
 *
 * You can also specify a template in your theme to style how the email looks like.
 *
 * Usage:
 *
 *     Analog::handler (Analog\Handler\WPMail::init (
 *         'you@example.com',       // to
 *         'Subject line',          // subject
 *         'no-reply@example.com',  // from
 *         'log-email-template.php' // email template in theme
 *     ));
 */
class WPMail {
	public static function init ($to, $subject, $from, $template='') {
		return function ($info, $buffered = false) use ($to, $subject, $from, $template) {
			$body = ($buffered)
				? "Logged:\n" . $info
				: vsprintf ("Machine: %s\nDate: %s\nLevel: %d\nMessage: %s", $info);


			$log_template = locate_template( $template );

			if ( ! empty( $log_template ) ) {
				ob_start();
				include_once $log_template;
				$body = ob_get_clean();
			} else {
				$body = wordwrap( $body, 70 );
			}

			add_filter( 'wp_mail_content_type', array( __CLASS__, 'set_email_content_type' ) );

			wp_mail( $to, $subject, $body );

			remove_filter( 'wp_mail_content_type', array( __CLASS__, 'set_email_content_type' ) );

		};
	}

	public static function set_email_content_type() {
		return 'text/html';
	}
}