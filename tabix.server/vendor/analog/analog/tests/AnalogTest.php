<?php

require_once ('lib/Analog.php');

class AnalogTest extends PHPUnit_Framework_TestCase {
	public static $log = '';

	/**
	 * @covers Analog::handler
	 * @covers Analog::log
	 * @covers Analog\Handler\File::init
	 */
	function test_default () {
		@unlink (Analog::handler ());

		// Check it wrote correctly to temp file
		Analog::log ('Foo');
		$this->assertStringMatchesFormat (
			"localhost - %d-%d-%d %d:%d:%d - 3 - Foo\n",
			file_get_contents (Analog::handler ())
		);
		unlink (Analog::handler ());
	}

	/**
	 * @depends test_default
	 */
	function test_format () {
		// Test changing the format string and write again
		Analog::$format = "%s, %s, %d, %s\n";
		Analog::log ('Foo');
		$this->assertStringMatchesFormat (
			"localhost, %d-%d-%d %d:%d:%d, 3, Foo\n",
			file_get_contents (Analog::handler ())
		);
		unlink (Analog::handler ());
	}
	
	/**
	 * @depends test_format
	 */
	function test_tz_and_dates () {
		// Test changing the date_format
		Analog::$date_format = 'r'; // RFC2822 format
		Analog::log ('Foo');
		$this->assertStringMatchesFormat (
			"localhost, %s, %d %s %d %d:%d:%d +0000, 3, Foo\n",
			file_get_contents (Analog::handler ())
		);
		unlink (Analog::handler ());

		// Test changing the timezone
		Analog::$timezone = 'CST';
		Analog::log ('Foo');

		$dt = new \DateTime ('now', new \DateTimeZone (Analog::$timezone));
		$zone_offset = $dt->format ('O');

		$this->assertStringMatchesFormat (
			"localhost, %s, %d %s %d %d:%d:%d $zone_offset, 3, Foo\n",
			file_get_contents (Analog::handler ())
		);
		unlink (Analog::handler ());
		
		Analog::$date_format = 'Y-m-d H:i:s';
		Analog::$timezone = 'GMT';
	}

	/**
	 * @depends test_tz_and_dates
	 */
	function test_handler () {
		// Test logging using a closure
		Analog::handler (function ($msg) {
			AnalogTest::$log .= vsprintf (Analog::$format, $msg);
		});

		Analog::log ('Testing');
		$this->assertStringMatchesFormat (
			"localhost, %d-%d-%d %d:%d:%d, 3, Testing\n",
			self::$log
		);

		self::$log = '';
	}
	
	/**
	 * @depends test_handler
	 */
	function test_level () {
		// Test default_level change
		Analog::$default_level = 1;
		Analog::log ('Testing');
		$this->assertStringMatchesFormat (
			"localhost, %d-%d-%d %d:%d:%d, 1, Testing\n",
			self::$log
		);
		
		Analog::$default_level = 3;
	}
	
	/*
	 * @depends test_level
	 * @covers Analog::urgent
	 * @covers Analog::alert
	 * @covers Analog::critical
	 * @covers Analog::error
	 * @covers Analog::warning
	 * @covers Analog::notice
	 * @covers Analog::info
	 * @covers Analog::debug
	 */
	function test_aliases () {
		self::$log = '';

		Analog::urgent ('Testing');
		$this->assertStringMatchesFormat (
			"localhost, %d-%d-%d %d:%d:%d, 0, Testing\n",
			self::$log
		);

		self::$log = '';

		Analog::alert ('Testing');
		$this->assertStringMatchesFormat (
			"localhost, %d-%d-%d %d:%d:%d, 1, Testing\n",
			self::$log
		);

		self::$log = '';

		Analog::error ('Testing');
		$this->assertStringMatchesFormat (
			"localhost, %d-%d-%d %d:%d:%d, 3, Testing\n",
			self::$log
		);

		self::$log = '';

		Analog::warning ('Testing');
		$this->assertStringMatchesFormat (
			"localhost, %d-%d-%d %d:%d:%d, 4, Testing\n",
			self::$log
		);

		self::$log = '';

		Analog::notice ('Testing');
		$this->assertStringMatchesFormat (
			"localhost, %d-%d-%d %d:%d:%d, 5, Testing\n",
			self::$log
		);

		self::$log = '';

		Analog::info ('Testing');
		$this->assertStringMatchesFormat (
			"localhost, %d-%d-%d %d:%d:%d, 6, Testing\n",
			self::$log
		);

		self::$log = '';

		Analog::debug ('Testing');
		$this->assertStringMatchesFormat (
			"localhost, %d-%d-%d %d:%d:%d, 7, Testing\n",
			self::$log
		);

		self::$log = '';
	}
}

?>