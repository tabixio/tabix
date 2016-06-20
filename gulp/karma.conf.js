module.exports = function (config) {

    var gulpConfig = require('./gulp.config')();

    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        exclude: gulpConfig.karmaOption.exclude,
        files: gulpConfig.karmaOption.files,
        preprocessors: gulpConfig.karmaOption.preprocessors,
        reporters: ['mocha', 'coverage', 'junit'],
        coverageReporter: gulpConfig.karmaOption.coverage,
        junitReporter: gulpConfig.karmaOption.junit,
        reportSlowerThan: 500,
        browsers: ['Chrome']
    });
};
