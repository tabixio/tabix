'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var phpServer = require('node-php-server');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['favicons','inject'], function () {

    // // Create a PHP Server
    // phpServer.createServer({
    //     port: 8000,
    //     hostname: '127.0.0.1',
    //     base: '.',
    //     keepalive: false,
    //     open: false,
    //     bin: 'php',
    //     router: __dirname + '/index.php'
    // });
    //
    // // Close server
    // phpServer.close();

  // gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject-reload']);
  //
  // gulp.watch([
  //   path.join(conf.paths.src, '/less/**/*.css'),
  //   path.join(conf.paths.src, '/less/**/*.less')
  // ], function(event) {
  //   if(isOnlyChange(event)) {
  //     gulp.start('styles-reload');
  //   } else {
  //     gulp.start('inject-reload');
  //   }
  // });
  //
  // gulp.watch(path.join(conf.paths.src, '/app/**/*.js'), function(event) {
  //   if(isOnlyChange(event)) {
  //     gulp.start('scripts-reload');
  //   } else {
  //     gulp.start('inject-reload');
  //   }
  // });
  //
  // gulp.watch(path.join(conf.paths.src, '/app/assets/images/favicons/**/*'), function(event) {
  //   gulp.start('favicons');
  // });
  //
  //
  // gulp.watch(path.join(conf.paths.src, '/app/**/*.{json,html}'), function(event) {
  // rowserSync.reload(event.path);
  // });
});
