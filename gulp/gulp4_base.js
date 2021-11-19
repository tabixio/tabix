var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del'); // rm -rf
// var cleanCSS = require('gulp-clean-css');
var browser = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');

var port = process.env.SERVER_PORT || 3000;

// personally written JS
var jsFiles = [
    'app/app.js',
    'app/app.routing.js',
    'app/components/**/*.js',
    'app/services/**/*.js',
    'app/assets/scripts/**/*.js',
    '!app/assets/scripts/ga.js',
]

// personally written CSS
var cssFiles = [
    'app/assets/**/*.css'
]

/*
  THIRD PARTY VENDOR FILES SECTION
*/
var codemirrorFiles = [
    'app/vendor/codemirror/mode/javascript/javascript.js',
    'app/vendor/codemirror/mode/python/python.js',
    'app/vendor/codemirror/mode/clike/clike.js',
    'app/vendor/codemirror/mode/php/php.js',
    'app/vendor/codemirror/mode/css/css.js',
    'app/vendor/codemirror/mode/xml/xml.js',
    'app/vendor/codemirror/mode/htmlmixed/htmlmixed.js',
    'app/vendor/codemirror/mode/htmlembedded/htmlembedded.js'
]

// includes jquery, angular and firebase
// with other crucial files, see items
var vendorFiles = [
    'app/vendor/jquery/dist/jquery.min.js',
    'app/vendor/angular/angular.js',
    'app/vendor/firebase/firebase.js',
    'app/vendor/angular-ui-router/release/angular-ui-router.min.js',
    'app/vendor/angularfire/dist/angularfire.min.js',
    'app/vendor/codemirror/lib/codemirror.js',
    'app/vendor/angular-ui-codemirror/ui-codemirror.js',
    'app/vendor/angular-ui-router-title/angular-ui-router-title.js',
    'app/vendor/ngMeta/dist/ngMeta.min.js',
    'app/vendor/ngprogress/build/ngprogress.min.js',
    'app/vendor/toastr/toastr.min.js',
    'app/vendor/offline/offline.min.js',
    'app/vendor/bootstrap/dist/js/bootstrap.min.js'
]

var vendorCSS = [
    'app/vendor/bootstrap/dist/css/bootstrap.css',
    'app/vendor/codemirror/lib/codemirror.css',
    'app/vendor/toastr/toastr.min.css',
    'app/vendor/ngprogress/ngProgress.css'
]

// refers to my build directory and or files to
// to delete
var toDelete = [
    'app/build/*.js',
]

// TASKS BEGIN

// deletes files
gulp.task('clean', function() {
    return del(toDelete); // rm -rf
});

// put Bootstrap fonts into build directory
gulp.task('copyFont', function() {
    return gulp.src('app/vendor/bootstrap/dist/fonts/**/*')
        .pipe(gulp.dest('app/build/fonts'))
})

// concats and minifys all codemirror vendor files
gulp.task('codemirror', function() {
    var stream = gulp.src(codemirrorFiles)
        .pipe(concat('allcodemirror.js'))
        .pipe(gulp.dest('app/build/js'))
        .pipe(rename('allcodemirror.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/build/js'))
    return stream;
})

// concats and minifys all AngularJS and others vendor files
gulp.task('vendor', function() {
    var stream = gulp.src(vendorFiles)
        .pipe(concat('allvendor.js'))
        .pipe(gulp.dest('app/build/js'))
        .pipe(rename('allvendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/build/js'))
    return stream;
})

// concacts and minifys all personally written JS
gulp.task('scripts', function() {
    var stream = gulp.src(jsFiles)
        .pipe(concat('codeside.js'))
        .pipe(gulp.dest('app/build/js'))
        .pipe(rename('codeside.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/build/js'));
    return stream;
});

// Minify personally written css to at least ie8 compatibility
gulp.task('stylesheets', function() {
    var stream = gulp.src(cssFiles)
        .pipe(concat('codeside.css'))
        .pipe(gulp.dest('app/build/css'))
        .pipe(rename('codeside.min.css'))
        // .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('app/build/css'));
    return stream;
})

// Minify vendor CSS
gulp.task('vendorCSS', function() {
    var stream = gulp.src(vendorCSS)
        .pipe(concat('allvendor.css'))
        .pipe(gulp.dest('app/build/css'))
        .pipe(rename('allvendor.min.css'))
        // .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('app/build/css'));
    return stream;
})

// Bring up the browser and serve app
gulp.task('browser', function() {
    browser.init({
        server: 'app/',
        port: port,
        // ensure URL rewrites to support non-hash URLs
        // in AngularJS
        middleware: [historyApiFallback()]
    });
    // watch and rebuild .js files
    gulp.watch(jsFiles, gulp.parallel('scripts'))
        .on('change', browser.reload);

    // watch and rebuild .css files
    gulp.watch(cssFiles, gulp.parallel('stylesheets'))
        .on('change', browser.reload);

    // Reload when html changes
    gulp.watch('app/**/*.html')
        .on('change', browser.reload);
})

// Clean is forced to run *FIRST* using gulp.series
// Then subsequent tasks can be asynchronous in executing
gulp.task('serve', gulp.series('clean',
    gulp.parallel(
        'vendor',
        'vendorCSS',
        'codemirror',
        'scripts',
        'stylesheets',
        'copyFont'),
    'browser'));

// attach a default task, so when when just gulp the thing runs
gulp.task('default', gulp.series('serve'));
