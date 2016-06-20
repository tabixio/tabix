module.exports = function (gulp, config, $, args) {

    // Run unit test once
    gulp.task('test:unit', function (done) {
        startUnitTests(true, done);
    });

    // Run unit test and watch for file changes then re-run tests
    gulp.task('test:tdd', function (done) {
        startUnitTests(false , done);
    });

    // Run e2e test
    // support --suite
    gulp.task('test:e2e', function (done) {
        var protractor = $.protractor.protractor;
        var options = {
            // debug: true,
            configFile: __dirname + '/../protractor.conf.js'
        };
        if (args.suite) {
            options['args'] = ['--suite', args.suite];
        }

        return gulp
            .src(config.protractorOption.specs)
            .pipe(protractor(options))
            .on('error', function (e) {
                throw e;
            });
    });

    /////////////

    function startUnitTests (singleRun, done) {
        var child;
        var fork = require('child_process').fork;
        var karma = require('karma').server;

        if (singleRun) {
            karma.start({
                configFile: __dirname + '/../karma.conf.js',
                singleRun: !!singleRun
            }, karmaCompleted);
        } else {
            // use phantomjs when auto-run tests
            karma.start({
                configFile: __dirname + '/../karma.conf.js',
                singleRun: !!singleRun,
                browsers: ['PhantomJS']
            }, karmaCompleted);
        }

        ////////////////

        function karmaCompleted (karmaResult) {
            config.fn.log('Karma completed');
            if (child) {
                config.fn.log('shutting down the child process');
                child.kill();
            }
            if (karmaResult === 1) {
                done('karma: tests failed with code ' + karmaResult);
            } else {
                done();
            }
        }
    }

};
