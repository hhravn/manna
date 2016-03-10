var gulp = require('gulp');
var ignore = require('gulp-ignore');

var less = require('gulp-less');
var path = require('path');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var webserver = require('gulp-webserver');

var bases = {
 app: 'app/',
 dist: 'dist/',
};

var paths = {
 scripts: ['js/jquery.js', 'js/bootstrap.js', 'js/jquery.easing.min.js', 'js/classie.js', 'js/cbpAnimatedHeader.js', 'js/cbpAnimatedHeader.js', 'js/jqBootstrapValidation.js', 'js/contact_me.js', 'js/agency.js'],
 styles: ['css/**/*.css'],
 less: ['less/**/*.less'],
 html: ['index.html', '404.html'],
 images: ['img/**/*.png', 'img/**/*.jpg'],
 extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
};

// Process scripts and concatenate them into one output file
gulp.task('scripts', function() {
 gulp.src(paths.scripts, {cwd: bases.app})
 .pipe(concat('scripts.js'))
 .pipe(gulp.dest(bases.dist));
});

// Imagemin images and ouput them in dist
gulp.task('imagemin', function() {
 gulp.src(paths.images, {cwd: bases.app})
 .pipe(imagemin())
 .pipe(gulp.dest(bases.dist + 'img/'));
});

// Copy all other files to dist directly
gulp.task('copy', function() {
 // Copy cname
 gulp.src('CNAME', {cwd: bases.app})
 .pipe(gulp.dest(bases.dist));

  // Copy html
  gulp.src(paths.html, {cwd: bases.app})
  .pipe(gulp.dest(bases.dist));

 // Copy extra html5bp files
 gulp.src(paths.extras, {cwd: bases.app})
 .pipe(gulp.dest(bases.dist));
});

gulp.task('server', function() {
  gulp
    .src(bases.dist)
    .pipe(webserver({
      livereload: {
        enable: true,
        pollingInterval: 200
      }
    })
  );
});

gulp.task('less', function () {
  return gulp.src(paths.less, {cwd: bases.app})
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(bases.dist + 'css'));
});

// A development task to run anytime a file changes
gulp.task('watch', ['server'], function() {
 gulp.watch('app/**/*', ['build']);
});

gulp.task('default', ['build']);
gulp.task('build', ['scripts', 'imagemin', 'copy', 'less']);
