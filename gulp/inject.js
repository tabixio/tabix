'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function() {
	browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], function() {
	var injectStyles = gulp.src([
		path.join(conf.paths.tmp, '/serve/app/**/*.css'),
		path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
	], {
		read: false
	});

	var injectScripts = gulp.src([
			path.join(conf.paths.src, '/app/**/*.app.js'),
			path.join(conf.paths.src, '/app/**/*.js'),
			path.join('!' + conf.paths.src, '/app/**/*.test.js'),
			path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
		])
        .pipe($.babel({
            presets: ['es2015', 'stage-0']
        }))
        .on('error', conf.errorHandler('babel'))
		.pipe($.angularFilesort())
        .on('error', conf.errorHandler('AngularFilesort'));

	var injectOptions = {
		ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
		addRootSlash: false
	};

	return gulp.src(path.join(conf.paths.src, '/*.html'))
		.pipe($.inject(injectStyles, injectOptions))
		.pipe($.inject(injectScripts, injectOptions))
		.pipe(wiredep(_.extend({}, conf.wiredep)))
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
