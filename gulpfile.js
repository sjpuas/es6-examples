'use strict';

var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    clean = require('gulp-clean'),
    buffer = require('vinyl-buffer'),
    rename = require('gulp-rename');

gulp.task('clean', function () {
  return gulp.src('build', {force: true})
        .pipe(clean());
});


gulp.task('make-scripts',['clean'] ,function () {
  return browserify({
        entries: 'app/js/app.jsx',
        extensions: ['.jsx'],
        debug: true
      })
      .transform(babelify)
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(streamify(uglify()))
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('build/js'));
});

gulp.task('copy-html',['make-scripts'],function () {
  return gulp.src('app/**/*.html')
      .pipe(gulp.dest('build'));
});


gulp.task('build', ['copy-html']);
gulp.task('default', ['build']);
