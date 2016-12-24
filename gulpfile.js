// Gulpfile

var gulp = require('gulp');
var watch = require('gulp-watch'); // Watch to have background tasks executing when some event is triggered
var karma = require('gulp-karma');  // Include Karma
var shell = require('gulp-shell');
var sass = require('gulp-sass');	// This is used to automatize the Sass tasks

gulp.task('default', [], function() {
    gulp.start('server');
});

gulp.task('server', function () {
//  return gulp.src('').pipe(shell([ 'node --harmony_destructuring server.js' ]));
  return gulp.src('').pipe(shell([ 'node server.js' ]));

});
