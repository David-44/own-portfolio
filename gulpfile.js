"use strict";

var     gulp = require('gulp'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
     compass = require('gulp-compass'),
         del = require('del'),
autoprefixer = require('gulp-autoprefixer');


// Concatenate scripts
// -----------------------------------------------------------------

gulp.task("concatScripts", function() {
    return gulp.src([
        'scripts/jquery.js',
        'scripts/jquery-mobile.js',
        'scripts/helpers.js',
        'scripts/carousel.js',
        'scripts/work-panel.js',
        'scripts/indicators.js',
        'scripts/overlay.js',
        'scripts/easter.js',

        'scripts/widgets/calculator.js',
        'scripts/widgets/simon.js',
        'scripts/widgets/noughts.js',
        'scripts/widgets/wikipedia.js',

        'scripts/main.js'
        ])
    .pipe(concat('app.js'))
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

// CSS Autoprefixer
// -----------------------------------------------------------------

gulp.task('autoprefix', ["compileCompass"], function() {
  return gulp.src('css/main.css')
    .pipe(autoprefixer({
      browsers: ['> 1%'],
      cascade: false
    }))
    .pipe(gulp.dest('css'));
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
  gulp.watch('scss/**/*.scss',['autoprefix']);
  gulp.watch('scripts/**/*.js', ['concatScripts']);
})




// Serve and default task
// -----------------------------------------------------------------

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
