module.exports = function (gulp, config, $, args) {

    var browserSync = require('browser-sync');
    var port = process.env.PORT || config.browserSync.defaultPort;
    var historyApiFallback = require('connect-history-api-fallback');

    /**
     * serve the development environment
     * --mock: inject mock files
     */
    gulp.task('serve:dev', ['build:dev'], function () {
        startBrowserSync(true);
    });

    /**
     * serve the production environment
     * --mock: inject mock files
     */
    gulp.task('serve:prod', ['build:prod'], function () {
        startBrowserSync(false);
    });

    ///////////

    function startBrowserSync (isDev) {
        if (browserSync.active) {
            return;
        }

        config.fn.log('Starting BrowserSync on port ' + port);

        // only watch files for development environment
        var watchedFiles = [].concat(
            config.js.app.source,
            config.css.singleSource,
            config.html.source,
            config.templateCache.sourceJade
        );
        if (args.mock) {
            watchedFiles = watchedFiles.concat(config.js.test.stubs);
        }
        if (isDev) {
            gulp.watch(watchedFiles, ['build:dev', browserSync.reload])
                .on('change', changeEvent);
        }

        var baseDir = isDev ? config.build.dev : config.build.prod;
        var options = {
            port: port,
            online: false,
            logLevel: 'info',
            logPrefix: 'clickhouse-frontend',
            reloadDelay: config.browserSync.reloadDelay,
            server: {
                baseDir: baseDir,
                index: 'index.html',
                middleware: [
                    historyApiFallback()
                ]
            }
        };

        browserSync(options);
    }

    function changeEvent (event) {
        var srcPattern = new RegExp('/.*(?=/' + config.client.source + ')/');
        config.fn.log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
    }

};
