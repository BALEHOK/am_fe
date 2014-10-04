var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var webpack = require('gulp-webpack');
var autoprefixer = require('gulp-autoprefixer');
var webpackConfig = require('./webpack.config.js');
var stylus = require('gulp-stylus');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var filter = require('gulp-filter');
//var clean = require('gulp-clean');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

var buildDest = 'dist';
var jsSrc = 'src/scripts/**/*.*',
    jsDest = path.join(buildDest, 'assets/js');
var cssSrc = 'src/styles/*',
    cssDest = path.join(buildDest, 'assets/css');

/*gulp.task('clean', function () {
    return gulp.src(buildDest)
        .pipe(clean());
});*/

var env = process.env.npm_config_siows_env || process.env.NODE_ENV;

gulp.task('webpack:build', function (callback) {
    var myConfig = Object.create(webpackConfig);
    return gulp.src('webpack_entries/*.js')
        .pipe(webpack(myConfig))
        .pipe(gulp.dest(jsDest))
        .pipe(notify({ message: 'Webpack build task complete' }));
});

gulp.task('css', function () {
    return gulp.src([cssSrc])
        .pipe(stylus())
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1']
        }))
        .pipe(gulp.dest(cssDest))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDest))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('views', function() {
    return gulp.src(['src/*.html'])
        .pipe(gulp.dest(buildDest));
});

gulp.task('watch', function() {
    gulp.watch('src/', ['build']);
});

// Production build
gulp.task('build', ['views', 'css', 'webpack:build']);

gulp.task('default', ['build']);
