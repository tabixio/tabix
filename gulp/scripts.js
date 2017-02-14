'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();


gulp.task('scripts-reload', ['scripts'], function() {
        browserSync.reload();
});

gulp.task('scripts', function() {
    return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.babel({
            presets: ['es2015', 'stage-0'],
            plugins: ["transform-es2015-modules-commonjs"]
        }))
        .on('error', conf.errorHandler('babel'))
        .pipe($.size());
});
