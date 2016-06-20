module.exports = function (gulp, config, $, args) {

    gulp.task('styles', ['clean:styles'], function () {
        config.fn.log('Compiling Stylus file to CSS');

        return gulp
            .src(config.css.source)
            .pipe($.plumber()) // exit gracefully if something fails after this
            .pipe($.stylus())
            .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
            .pipe($.flatten())
            .pipe(gulp.dest(config.build.dev + 'static/styles'));
    });
};
