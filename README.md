# clickhouse-frontend

## Prerequisites

1. Install [Node.js](http://nodejs.org)

2. Install these NPM packages globally

```bash
npm install -g bower gulp
```

3. Install the dependence packages

```bash
npm install
```

> it will run `bower install` automatically

## Launch Mock Server

Launch local mock server using `BrowserSync` in Chrome, it will automatically load your mock files under `client/source/test/e2e/mocks` folder, watch the files changes and reload the browser.

```bash
npm start
```

You can also launch the server with `gulp`:

* for development: `gulp serve:dev --mock`
* for production: `gulp serve:prod --mock`

> `--mock` will also include the API mock files

## Linting

Use `JSHint` and `JSCS` to lint your javascript files.

```bash
gulp lint
```

## Tests

* Unit Test: `gulp test:unit`
* Unit Test with auto watch: `gulp test:tdd`
* E2E Test: `gulp test:e2e`
    * run `./node_modules/protractor/bin/webdriver-manager update` first
    * make sure a local mock server is running

## Building

* for development: `gulp build:dev --mock`
* for production: `gulp build:prod --mock`

All the build files will in the sub folder of `client/build/`, development environment will use the original source files, production environment has some optimizations:

* All the Javascript/CSS files are minified and concated.
* All the template files used in Angular are processed by `$templateCache`.
* All the images used are optimized to smaller size.
* The compressed files will be suffixed by random hash.


