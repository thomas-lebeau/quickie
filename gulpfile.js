'use strict';
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var del = require('del');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var wiredep = require('wiredep').stream;

// Compile & autoprefix scss files
gulp.task('styles', function () {
  return gulp.src('app/assets/styles/main.scss')
    .pipe(plumber())
    .pipe(sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    })).on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(gulp.dest('.tmp/assets/styles'))
    .pipe(browserSync.stream());
});

// Wire Bower dependencies
gulp.task('wiredep', function () {
  return gulp.src('app/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('.tmp'));
});

// Clean .tmp directory
gulp.task('clean', function () {
  return del('.tmp/**');
});

// Run a development server with browsersync
gulp.task('serve', ['styles', 'wiredep'], function () {
  browserSync({
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  // watch for changes
  gulp.watch([
    '.tmp/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*'
  ]).on('change', browserSync.reload);

  gulp.watch('app/assets/styles/**/*.scss', ['styles']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('default', ['serve']);
