var favicons = require('gulp-favicons'),
  gutil = require("gulp-util");
var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

gulp.task("favicons", function() {
  return gulp.src(path.join(conf.paths.src, '/assets/images/test-favicon.png')).pipe(favicons({
      path: "favicons/",
      display: "standalone",
      orientation: "portrait",
      online: false,
      html: false,
      replace: true,
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        windows: false,
        yandex: false
      }
    }))
    .on("error", gutil.log)
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/favicons/localhost/')));
});
