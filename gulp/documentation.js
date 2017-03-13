'use strict';

var gulp = require('gulp');
var ngdocs = require('gulp-ngdocs');
var conf = require('./conf');
var path = require('path');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

/**
 * Генерация основы ngDoc приложения
 */
gulp.task('docs:generate', [], function() {
	return gulp.src('./src/**/*.js')
		.pipe(ngdocs.process({
			scripts: [
				'bower_components/angular/angular.js',
				'bower_components/angular-animate/angular-animate.min.js'
			],
			loadDefaults: {},
			html5Mode: false,
			startPage: '/api',
			title: "Документация Tabix",
			image: "https://smi2.net/wp-content/uploads/2016/02/icon-smi2.png",
			imageLink: "http://smi2.net",
			titleLink: "/api"
		}))
		.pipe(gulp.dest('./' + conf.paths.docs));
});

/**
 * Запуск сервера, по-другому приложение
 * запускаться отказалось
 */
gulp.task('docs', ['docs:generate'], function() {
	browserSync.use(browserSyncSpa({
		selector: '[ng-app]' // Only needed for angular apps
	}));

	browserSync.instance = browserSync.init({
		startPath: '/',
		server: {
			baseDir: './' + conf.paths.docs
		},
		port: 3010,
		browser: 'default'
	});
	gulp.watch(path.join(conf.paths.src, '/**/*.js'), function(event) {
		gulp.start('docs:generate');
		browserSync.reload(event.path);
	});
});
