var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var webpack = require('webpack');
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
var WebpackDevServer = require("webpack-dev-server");

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

gulp.task("webpack-dev-server", function(callback) {
    var myConfig = Object.create(webpackConfig);
    var compiler = webpack(webpackConfig);
    new WebpackDevServer(compiler, {
        quiet: false,
        noInfo: false,
        publicPath: '/Content/assets/js',
        contentBase: "./dist",
        watchDelay: 300,
        stats: { colors: true },
    }).listen(3000, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
    });
});

// Production build
gulp.task('build', ['views', 'images', 'fonts', 'css']);
gulp.task('server', ['build', 'watch', 'webpack-dev-server']);
gulp.task('default', ['build']);
gulp.task('deploy', ['replace']);
