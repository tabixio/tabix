module.exports = function (gulp, config, $, args) {

    // jshint/jscs all js files
    gulp.task('lint', function () {
        config.fn.log('Analyzing source with JSHint and JSCS');

        return gulp
            .src(config.js.all)
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
            .pipe($.jshint.reporter('fail'))
            .pipe($.jscs());
    });

};
