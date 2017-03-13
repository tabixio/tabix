'use strict';

var path = require('path');
var gulp = require('gulp');
var tap = require('gulp-tap');
var conf = require('./conf');
var packageJson = require('../package.json');
var orderBowerComponents = require('./bower.js');

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
            path.join('!' + conf.paths.src, '/app/**/*.mock.js')
        ])
        .pipe($.babel({
            presets: ['es2015', 'stage-0'],
            plugins: ["transform-es2015-modules-commonjs"]
        }))
        .on('error', conf.errorHandler('babel'))
        .pipe($.angularFilesort())
        .on('error', conf.errorHandler('AngularFilesort'));

    var injectAssetScripts = gulp.src([
        path.join(conf.paths.src, '/assets/js/**/*.js')
    ]);

    var injectOptions = {
        ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
        addRootSlash: false
    };

    var rightNow = new Date();
    var TabixBuildDate = rightNow.toISOString().slice(0,10).replace(/-/g,"");

    return gulp.src(path.join(conf.paths.src, '/*.html'))
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe($.inject(injectAssetScripts, {
            ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
            addRootSlash: false,
            name: 'assets'
        }))
        .pipe($.replace('<!-- version -->', '<script type="text/javascript">window.TabixBuildDate="'+TabixBuildDate+'"; window.TabixVersion="' + packageJson.version + '";</script>'))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe(tap(orderBowerComponents))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
