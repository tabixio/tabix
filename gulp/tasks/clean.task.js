module.exports = function (gulp, config, $, args) {

    var del = require('del');

    // Remove all files from the build dev folder
    gulp.task('clean:dev', function (done) {
        clean(config.build.dev, done);
    });

    // Remove all files from the build prod folder
    gulp.task('clean:prod', function (done) {
        clean(config.build.prod, done);
    });

    // Remove all files from the build folder
    gulp.task('clean', function (done) {
        clean(config.build.base, done);
    });

    // Remove all image files from the build folder
    gulp.task('clean:images', function (done) {
        clean(config.build.dev + 'static/images/**/*.*', done);
    });

    // Remove all font files from the build folder
    gulp.task('clean:fonts', function (done) {
        clean(config.build.dev + 'static/fonts/**/*.*', done);
    });

    // Remove all style files from the build folders
    gulp.task('clean:styles', function (done) {
        clean(config.build.dev + 'static/styles/*.css', done);
    });

    // Remove all javascript files from the build folders
    gulp.task('clean:js', function (done) {
        clean(config.js.app.target, done);
    });

    // Remove all html files from the build folders
    gulp.task('clean:html', function (done) {
        var files = [].concat(
            config.build.dev + 'index.html',
            config.build.dev + 'static/**/*.html'
        );
        clean(files, done);
    });

    // Remove all files from the temp folder
    gulp.task('clean:temp', function (done) {
        clean(config.build.temp, done);
    });

    // Remove all bower dependency files from the build folder
    gulp.task('clean:vendor', function (done) {
        clean(config.build.dev + 'static/vendor', done);
    });

    /////////

    // Log and delete the path
    function clean (path, done) {
        config.fn.log('Cleaning: ' + $.util.colors.blue(path));
        del(path, done);
    }
};
