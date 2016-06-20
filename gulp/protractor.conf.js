var gulpConfig = require('./gulp.config')();
var port = process.env.PORT || gulpConfig.browserSync.defaultPort;

exports.config = {
    baseUrl: 'http://' + gulpConfig.browserSync.hostName + ':' + port,
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },
    specs: gulpConfig.protractorOption.specs,
    suites: gulpConfig.protractorOption.suites,
    capabilities: {
        'browserName': 'chrome'
    },
    onPrepare: function () {
        browser._ = require(gulpConfig.protractorOption.helper)();
    },
    params: {
        timeout: 10000,
        screenshotDir: gulpConfig.protractorOption.screenshotDir
    }
};
