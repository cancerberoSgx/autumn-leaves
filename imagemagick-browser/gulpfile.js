var gulp = require('gulp');
var jasmineBrowser = require('gulp-jasmine-browser');
var webpack = require('webpack-stream');
// var watch = require('gulp-watch');

gulp.task('jasmine-headless', function() {
  return gulp.src(['dist/**/*Spec.js'])
    .pipe(webpack({output: {filename: 'spec.js'}, mode: 'development'}))
    .pipe(jasmineBrowser.specRunner({console: true}))
    .pipe(jasmineBrowser.headless({driver: 'chrome'}))
});

gulp.task('jasmine-server', function() {
  return gulp.src(['dist/**/*Spec.js'])
    .pipe(webpack({watch: true, output: {filename: 'spec.js'}, mode: 'development'}))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server());
});