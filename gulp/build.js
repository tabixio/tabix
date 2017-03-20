'use strict';

var path = require('path');
var gulp = require('gulp');
var tap = require('gulp-tap');
var conf = require('./conf');
//var loader = require('./loader');
var packageJson = require('../package.json');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

var binaryFiles = [];

gulp.task('partials', function () {
    return gulp.src([
        path.join(conf.paths.src, '/app/**/*.html'),
        path.join(conf.paths.src, '/app/**/*.json'),
        path.join(conf.paths.tmp, '/serve/app/**/*.html'),
        path.join(conf.paths.tmp, '/serve/app/**/*.json')
    ])
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: 'SMI2',
            root: 'app'
        }))
        .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
    var partialsInjectFile = gulp.src([
        path.join(conf.paths.src, '/app/**/*.app.js'),
        path.join(conf.paths.tmp, '/partials/templateCacheHtml.js')
    ], {
        read: false
    });
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: path.join(conf.paths.tmp, '/partials'),
        addRootSlash: false
    };

    var htmlFilter = $.filter('*.html', {
        restore: true
    });
    var jsFilter = $.filter('**/*.js', {
        restore: true
    });
    var jsVendor = $.filter(['**/*.js', '!**/vendor-*.js'], {
        restore: true
    });
    var cssFilter = $.filter('**/*.css', {
        restore: true
    });
    var assets;


    var rightNow = new Date();
    var TabixBuildDate = rightNow.toISOString().slice(0,10).replace(/-/g,".");


    return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
        .pipe($.inject(partialsInjectFile, partialsInjectOptions))
        .pipe(assets = $.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
        .pipe(jsVendor)
        .pipe($.babel({
            presets: ['es2015', 'stage-0'],
            plugins: []
        }))
        .on('error', conf.errorHandler('babel'))
        .pipe(jsVendor.restore)
        //.pipe($.replace('assets/', 'app/assets/'))
        //.pipe($.sourcemaps.init())
        .pipe($.ngAnnotate())
        .pipe($.uglify({
            preserveComments: $.uglifySaveLicense
        })).on('error', conf.errorHandler('Uglify'))
        //.pipe($.sourcemaps.write('maps'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.replace('url(./fonts/', 'url(../fonts/')) // костылек для lumx
        //.pipe($.sourcemaps.init())
        //для favicon production
        .pipe($.minifyCss({
          processImport: false
        }))
        //.pipe($.sourcemaps.write('maps'))
        .pipe(cssFilter.restore)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(tap(function(file) {
            if (/\/(vendor|app)-(.{10})/.test(file.path)) {
                binaryFiles.unshift(file.path.replace(/\.tmp\/serve/, conf.paths.dist));
            }
        }))
        .pipe(htmlFilter)
        .pipe($.replace('<!-- version -->', '<script type="text/javascript">window.TabixBuildDate="'+TabixBuildDate+'"; window.TabixVersion="' + packageJson.version + '";</script>'))
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
            conditionals: true
        }))
        // .pipe(tap(function(file) {
        //     loader(file);
        // }))
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
        .pipe($.size({
            title: path.join(conf.paths.dist, '/'),
            showFiles: true
        }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('other', function () {
    var fileFilter = $.filter(function (file) {
        return file.stat.isFile();
    });

    return gulp.src([
        path.join(conf.paths.src, '/**/*'),
        path.join('!' + conf.paths.src, '/**/*.{html,css,js,less,json}')
    ])
        .pipe(fileFilter)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});


gulp.task('clean', function () {
    return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('cname', function () {
    return gulp.src('./assets/*').pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('prebuild', ['html', 'fonts', 'other', 'cname']);

gulp.task('copy:appjs', ['prebuild'], function() {
    return gulp
        .src(binaryFiles.filter(function(item) { return /\.js$/.test(item); }))
        .pipe($.concat('app.js'))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/scripts')));
});

gulp.task('copy:appcss', ['prebuild'], function() {
    return gulp
        .src(binaryFiles.filter(function(item) { return /\.css$/.test(item); }))
        .pipe($.concat('app.css'))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/styles')));
});

gulp.task('build', ['copy:appjs', 'copy:appcss']);
