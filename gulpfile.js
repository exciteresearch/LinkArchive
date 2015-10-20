// Dependancies
// Include Gulp Core
var gulp = require('gulp');
// Include other plugins
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
// var jshint = require('gulp-jshint');
// var uglify= require('gulp-uglify');

// Build Dependencies
var browserify = require('gulp-browserify');
// Uglify only when ready to publish otherwise it's difficult to debug
// var uglify = require('gulp-uglify');

// Style Dependencies
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// Development Dependencies
var jshint = require('gulp-jshint');

// Test Dependencies
var mochaPhantomjs = require('gulp-mocha-phantomjs');


var paths = {
  sass: ['./scss/**/*.scss'],
  lintwww: ['./www/**/*.js'],
  linttest: ['./test/**/*.js']
};

// GULP lint wwww 
gulp.task('lint-www', function() {
  return gulp.src(paths.lintwww)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lint-test', function() {
  return gulp.src(paths.linttest)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('browserify-client', ['lint-www'], function() {
  return gulp.src('www/js/*.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('bundle.js'))
//    .pipe(gulp.dest('build'));
    .pipe(gulp.dest('./public/javascripts'));
});

gulp.task('browserify-test', ['lint-test'], function() {
  return gulp.src('test/client/index.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('client-test.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch('www/**/*.js', ['browserify-client']);
  gulp.watch('test/**/*.js', ['browserify-test']);
});

// IONIC Gulp tasks below
gulp.task('default', ['sass']);

// Gulp sass
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

// Gulp watch sass
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

// Gulp install git-check using bower.commands.install()
gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

// Gulp define task git-check
gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
