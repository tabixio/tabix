var gulp = require('gulp');
var glob = require('glob');
/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
glob.sync('./gulp2/*.js').forEach(function (file) {
    require(file);
});
/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
// gulp.task('default', ['clean'], function () {
//    gulp.start('build');
// });
