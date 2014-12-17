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
//var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var replace = require('gulp-replace');
var through = require('through2');

var buildDest = 'dist';
var assetsDest = 'Content/assets';
var jsSrc = 'src/scripts/**/*.*',
    jsDest = path.join(buildDest, assetsDest, 'js');
var cssSrc = 'src/styles/*',
    cssDest = path.join(buildDest, assetsDest, 'css');

/*gulp.task('clean', function () {
    return gulp.src(buildDest)
        .pipe(clean());
});*/

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

function replaceConstants() {
    var env = process.env.NODE_ENV || 'development';
    var constants = require('./envs/' + env);
    return through.obj(function(file, type, done) {
        var contents = file.contents.toString();
        Object.keys(constants).forEach(function(key) {
            contents = contents.replace(key, constants[key]);
        });
        file.contents = new Buffer(contents, 'utf-8');
        done(null, file);
    });
}

gulp.task('webpack:build', function (callback) {
    var myConfig = Object.create(webpackConfig);
    return gulp.src('webpack_entries/*.js')
        .pipe(webpack(myConfig))
        .pipe(replaceConstants())
        .pipe(gulp.dest(jsDest))
        .pipe(notify({ message: 'Webpack build task complete' }));
});

gulp.task('css', function () {
    return gulp.src([cssSrc])
        .pipe(stylus())
        .on('error', handleError)
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1']
        }))
        .pipe(gulp.dest(cssDest))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .on('error', handleError)
        .pipe(gulp.dest(cssDest))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('views', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest(buildDest));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist/',
            //directory: true,
            routes: {
                "/assets": "../"
            },
            proxy: 'local.dev'
        }
    });
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest(path.join(buildDest, assetsDest, 'fonts')));
});
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest(path.join(buildDest, assetsDest, 'images')));
});
gulp.task('watch', function() {
    gulp.watch('src/**/*.html', ['views', browserSync.reload]);
    gulp.watch(['src/**/*.{js,ts,jsx}', 'webpack_entries/*.js'], ['webpack:build', browserSync.reload]);
    gulp.watch('src/**/*.{styl,css}', ['css', browserSync.reload]);
    gulp.watch('src/fonts/*.*', ['fonts', browserSync.reload]);
    gulp.watch('src/images/*.*', ['images', browserSync.reload]);
});
gulp.task('replace', ['build'], function() {
    return gulp.src(path.join(buildDest, 'index.html'))
        .pipe(replace(/(assets)/g, 'Content/assets'))
        .pipe(gulp.dest(buildDest));
});

// Production build
gulp.task('build', ['views', 'images', 'fonts', 'css', 'webpack:build']);
gulp.task('server', ['build', 'watch', 'browser-sync']);
gulp.task('default', ['build']);
gulp.task('deploy', ['replace']);
