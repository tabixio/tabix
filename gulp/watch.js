'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['favicons','inject'], function () {

  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject-reload']);

  gulp.watch([
    path.join(conf.paths.src, '/less/**/*.css'),
    path.join(conf.paths.src, '/less/**/*.less')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(
      [
          path.join(conf.paths.src, '/app/**/*.js'),
          path.join(conf.paths.src, '/app/**/*.html')
      ],function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/app/assets/images/favicons/**/*'), function(event) {
    gulp.start('favicons');
  });


  gulp.watch(path.join(conf.paths.src, '/app/**/*.{json,html}'), function(event) {
	// browserSync.reload(event.path);
  });
});
