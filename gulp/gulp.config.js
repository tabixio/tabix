module.exports = function () {
    // dependencies used in this file
    var wiredep = require('wiredep');
    var bowerJson = require('../bower.json');
    var gulp = require('gulp');
    var gUtil = require('gulp-util');
    var gInject = require('gulp-inject');
    var gIf = require('gulp-if');
    var gOrder = require('gulp-order');
    // base folder
    var _root = './';
    var _clientBase = _root + 'client/';
    var _serverBase = _root + 'server/';
    var _buildBase = _clientBase + 'build/';
    // client folder
    var client = {
        base: _clientBase,
        source: _clientBase + 'source/',
        test: _clientBase + 'source/test/',
        app: _clientBase + 'source/app/'
    };
    // server folder
    var server = {
        base: _serverBase
    };
    // build folder
    var build = {
        base: _buildBase,
        dev: _buildBase + 'dev/',
        temp: _buildBase + '.temp/',
        prod: _buildBase + 'prod/'
    };
    // node dependency
    var nodeModules = _root + 'node_modules/';
    // bower dependency
    var bowerFiles = wiredep({devDependencies: true})['js'];
    var bower = {
        json: bowerJson,
        source: client.source + 'vendor/',
        target: build.dev + 'static/vendor/',
        mockDeps: [
            build.dev + 'static/vendor/angular-mocks/angular-mocks.js'
        ]
    };

    // all configuration which will be returned
    var config = {
        // folders
        root: _root,
        client: client,
        server: server,
        build: build,
        // js
        js: {
            all: [
                client.app + '**/*.js',
                client.test + '**/*.js',
                '!' + client.test + 'unit/results/**/*.js',
                _root + 'gulp/**/*.js',
                _root + '*.js'
            ],
            app: {
                source: [
                    client.app + '**/*.js'
                ],
                target: [
                    build.dev + 'static/**/*.js',
                    '!' + build.dev + 'static/vendor/**/*.*'
                ],
                production: [
                    client.app + '**/production/*.js'
                ]
            },
            test: {
                stubs: [
                    client.test + 'e2e/mocks/**/e2e.*.js'
                ],
                unit: {
                    specs: [
                        client.test + 'unit/specs/**/*.spec.js'
                    ]
                }
            },
            order: [
                '**/app.module.js',
                '**/*.module.js',
                '**/*.js'
            ]
        },
        // css
        css: {
            source: client.app + '**/*.styl',
            target: [
                build.dev + 'static/**/*.css',
                '!' + build.dev + 'static/vendor/**/*.*'
            ],
            singleSource: client.source + 'styles/**/*.styl'
        },
        // html
        html: {
            source: client.source + 'index.jade',
            target: build.dev + 'index.html'
        },
        templateCache: {
            sourceJade: client.app + '**/*.jade',
            sourceHtml: [
                build.dev + 'static/**/*.html',
                '!' + build.dev + 'static/vendor/**/*.*',
            ],
            target: 'templates.js',
            options: {
                module: 'app.core',
                root: 'static/',
                standAlone: false
            }
        },
        resource: {
            images: client.source + 'images/**/*.*',
            fonts: bower.source + 'mdi/fonts/*.*',
        },
        bower: bower,
        browserSync: {
            hostName: 'localhost',
            reloadDelay: 1000,
            defaultPort: 8088
        },
        optimized: {
            allCSS: '*.css',
            appJS: 'app.js',
            libJS: 'lib.js'
        },
        packages: [
            _root + 'package.json',
            _root + 'bower.json'
        ]
    };

    config.karmaOption = getKarmaOptions();
    config.wiredepOption = getWiredepDefaultOptions();
    config.protractorOption = getProtractorOptions();

    // common functions used by multiple tasks
    config.fn = {};
    config.fn.log = log;
    config.fn.inject = inject;

    return config;

    ////////////////

    // Options for wiredep
    function getWiredepDefaultOptions () {
        return {
            bowerJson: config.bower.json,
            directory: config.bower.target
        };
    }

    // Options for karma
    function getKarmaOptions () {
        var options = {
            files: [].concat(
                bowerFiles,
                client.app + '**/*.module.js',
                client.app + '**/*.js',
                config.js.test.unit.specs
            ),
            exclude: [],
            coverage: {
                dir: client.test + 'unit/results/coverage',
                reporters: [
                    // reporters not supporting the `file` property
                    {type: 'html', subdir: '.'},
                    {type: 'text-summary'}
                ]
            },
            junit: client.test + 'unit/results/unit-test-results.xml',
            preprocessors: {}
        };
        options.preprocessors[config.js.test.unit.specs] = ['coverage'];
        return options;
    }

    // Options for protractor
    function getProtractorOptions () {
        // options used in protractor.conf.js need to be based on it's own path
        return {
            specs: [client.test + 'e2e/specs/*.spec.js'],
            suites: {
                home: '.' + client.test + 'e2e/specs/home.spec.js',
                login: '.' + client.test + 'e2e/specs/login.spec.js',
                dashboard: '.' + client.test + 'e2e/specs/dashboard.spec.js',
                phone: '.' + client.test + 'e2e/specs/phone.spec.js'
            },
            helper: '.' + client.test + 'e2e/helper',
            screenshotDir: client.test + 'e2e/screenshots/'
        };
    }

    // Log function for both object type and primitive type
    function log (msg) {
        if (typeof(msg) === 'object') {
            for (var item in msg) {
                if (msg.hasOwnProperty(item)) {
                    gUtil.log(gUtil.colors.blue(msg[item]));
                }
            }
        } else {
            gUtil.log(gUtil.colors.blue(msg));
        }
    }

    // Helper function for gulp-inject
    function inject (src, label, order) {
        var options = {
            read: false,
            relative: true,
            ignorePath: '/client/build/dev'
        };
        if (label) {
            options.name = 'inject:' + label;
        }

        return gInject(orderSrc(src, order), options);
    }

    function orderSrc (src, order) {
        //order = order || ['**/*'];
        return gulp
            .src(src)
            .pipe(gIf(order, gOrder(order)));
    }
};
