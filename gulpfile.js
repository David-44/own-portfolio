"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
 compass = require('gulp-compass'),
     del = require('del');


// Concatenate scripts
// -----------------------------------------------------------------

gulp.task("concatScripts", function() {
    return gulp.src([
        'scripts/main.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('scripts'));
});


// Minify the output of concat
// -----------------------------------------------------------------

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("scripts/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('scripts'));
});


// Compass compile
// -----------------------------------------------------------------

gulp.task('compileCompass', function() {
  return gulp.src("scss/main.scss")
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'scss',
      sourcemap: 'true'
    }));
});

gulp.task('compileCompassLive', function() {
  return gulp.src("scss/main.scss")
    .pipe(compass({
      config_file: './config.rb',
      style: 'compressed',
      css: 'css',
      sass: 'scss',
      sourcemap: 'true'
    }));
});


// Clean
// -----------------------------------------------------------------

gulp.task('clean', function() {
  del(['dist', 'css/main.css*', 'scripts/app*.js*']);
});


// Build -> Default task
// -----------------------------------------------------------------

gulp.task("build", ['minifyScripts', 'compileCompassLive'], function() {
  return gulp.src(["css/main.css", "scripts/app.min.js", 'index.html',
                   "img/**", "fonts/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});


// Watcher -> Called by serve
// -----------------------------------------------------------------

gulp.task('watchFiles', function() {
  gulp.watch('scss/**/*.scss', ['compileCompass']);
  gulp.watch('scripts/*.js', ['minifyScripts']);
})




// Serve and default task
// -----------------------------------------------------------------

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
