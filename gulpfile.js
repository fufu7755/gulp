var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    concat      = require('gulp-concat'),
    /* html */
    jade = require('gulp-jade'),
    /* css */
    stylus      = require('gulp-stylus'),
    minifycss   = require('gulp-minify-css'),
    /* js */
    coffee = require('gulp-coffee'),
    vendor = require('gulp-concat-vendor'),
    minifyjs    = require('gulp-uglify'),
    /* server */
    livereload  = require('gulp-livereload'),
    server = livereload();

/* build */
var build = {
	htmls: ['build/jade/*.jade'],
  styles: ['build/stylus/*.styl'],
  scripts: ['build/coffee/*.coffee']
}

gulp.task('htmls', function() {
	return gulp.src(build.htmls)
	.pipe(jade({
      pretty: true
  	}))
  .pipe(gulp.dest(''));
});

gulp.task('styles', function(){
  return gulp.src(build.styles)
    .pipe(stylus())
    .pipe(concat('styles.css'))
    .pipe(minifycss({keepBreaks:true}))
    .pipe(gulp.dest('assets/css/'));
});

gulp.task('vendor', function() {  
  return gulp.src('vendor/*')
    .pipe(vendor('vendor.js'))
    .pipe(minifyjs())
    .pipe(gulp.dest('assets/js/'))
});

gulp.task('scripts', function() {
  return gulp.src(build.scripts)
    .pipe(coffee({bare: true}))
    .pipe(concat('scripts.js'))
    .pipe(minifyjs())
    .pipe(gulp.dest('assets/js/'));
});

gulp.task('build', ['htmls', 'styles', 'scripts']);

/* livereload */
var paths = {
  client: [
  '*.html',
  'assets/js/*.js',
  'assets/css/*.css'
  ]
};
gulp.task('livereload', function() {
	gulp.watch(build.htmls, ['htmls']);
  gulp.watch(build.styles, ['styles']);
  gulp.watch(build.scripts, ['scripts']);
  gulp.watch(paths.client, function(e) {
    server.changed(e.path);
  });
});

gulp.task('default', ['build', 'vendor', 'livereload']);