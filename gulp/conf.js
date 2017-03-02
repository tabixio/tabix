/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
	src: 'src',
	dist: 'build',
	tmp: '.tmp',
	e2e: 'e2e',
	docs: 'help'
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
	exclude: [/\/bootstrap\.js$/, /\/bootstrap\.css/],
	directory: 'bower_components',
	overrides: {
		'ace-builds': {
			main: [
				'src-min-noconflict/ace.js',
				'src-min-noconflict/ext-language_tools.js',
				'src-min-noconflict/ext-beautify.js',
				'src-min-noconflict/ext-statusbar.js',
				'src-min-noconflict/ext-settings_menu.js',

				'src-min-noconflict/mode-sqlserver.js',
				'src-min-noconflict/theme-ambiance.js',
				'src-min-noconflict/theme-crimson_editor.js',
				'src-min-noconflict/theme-iplastic.js',
				'src-min-noconflict/theme-mono_industrial.js',
				'src-min-noconflict/theme-terminal.js',
				'src-min-noconflict/theme-tomorrow_night.js',
				'src-min-noconflict/theme-chaos.js',
				'src-min-noconflict/theme-dawn.js',
				'src-min-noconflict/theme-katzenmilch.js',
				'src-min-noconflict/theme-monokai.js',
				'src-min-noconflict/theme-textmate.js',
				'src-min-noconflict/theme-twilight.js',
				'src-min-noconflict/theme-chrome.js',
				'src-min-noconflict/theme-dreamweaver.js',
				'src-min-noconflict/theme-kr_theme.js',
				'src-min-noconflict/theme-pastel_on_dark.js',
				'src-min-noconflict/theme-tomorrow.js',
				'src-min-noconflict/theme-vibrant_ink.js',
				'src-min-noconflict/theme-clouds.js',
				'src-min-noconflict/theme-eclipse.js',
				'src-min-noconflict/theme-kuroir.js',
				'src-min-noconflict/theme-solarized_dark.js',
				'src-min-noconflict/theme-tomorrow_night_blue.js',
				'src-min-noconflict/theme-xcode.js',
				'src-min-noconflict/theme-clouds_midnight.js',
				'src-min-noconflict/theme-github.js',
				'src-min-noconflict/theme-merbivore.js',
				'src-min-noconflict/theme-solarized_light.js',
				'src-min-noconflict/theme-tomorrow_night_bright.js',
				'src-min-noconflict/theme-cobalt.js',
				'src-min-noconflict/theme-idle_fingers.js',
				'src-min-noconflict/theme-merbivore_soft.js',
				'src-min-noconflict/theme-sqlserver.js',
				'src-min-noconflict/theme-tomorrow_night_eighties.js'
			]
		}
	}
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
	'use strict';

	return function(err) {
		gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
		this.emit('end');
	};
};
