var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var webpack = require('webpack');
var gwebpack = require('gulp-webpack');
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
var webpackDevMiddleware = require("webpack-dev-middleware");

var buildDest = 'dist';
var assetsDest = 'assets';
var jsSrc = 'src/scripts/**/*.*',
    jsDest = path.join(buildDest, assetsDest, 'js');
var cssSrc = 'src/styles/*',
    cssVendorSrc = 'src/styles/vendor-css/*',
    fontsCss = 'src/styles/fonts/*',
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
        .pipe(gwebpack(myConfig))
        .pipe(gulp.dest(jsDest));
});
gulp.task('css:fonts', function () {
    return gulp.src([fontsCss])
        .pipe(stylus({
            url: {
                name: 'url64',
                limit: false
            }
        }))
        .on('error', handleError)
        .pipe(gulp.dest(cssDest))
        .on('error', handleError)
        .pipe(gulp.dest(cssDest));
});

gulp.task('css', function () {
    var styl = filter('**/*.styl');
    return gulp.src([cssSrc, cssVendorSrc])
        .pipe(styl)
        .pipe(stylus())
        .pipe(styl.restore())
        .on('error', handleError)
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1']
        }))
        .pipe(gulp.dest(cssDest))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .on('error', handleError)
        .pipe(gulp.dest(cssDest));
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
    return gulp.src(['src/fonts/**/*', 'src/scripts/libs/bootstrap-stylus/fonts/*'])
        .pipe(gulp.dest(path.join(buildDest, assetsDest, 'fonts')));
});
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest(path.join(buildDest, assetsDest, 'images')));
});
gulp.task('watch', function() {
    gulp.watch('src/**/*.html', ['views', browserSync.reload]);
    gulp.watch('src/**/*.{styl,css}', ['css', 'css:fonts', browserSync.reload]);
    gulp.watch('src/fonts/*.*', ['fonts', browserSync.reload]);
    gulp.watch('src/images/*.*', ['images', browserSync.reload]);
});
gulp.task('webconfig', function() {
    return gulp.src('web.config')
        .pipe(gulp.dest(buildDest));
});

gulp.task("dev-server", function(callback) {
    var myConfig = Object.create(webpackConfig);
    var compiler = webpack(webpackConfig);
    var middleware = webpackDevMiddleware(compiler, {
        quiet: false,
        noInfo: false,
        publicPath: '/assets/js',
        contentBase: "./dist",
        watchDelay: 300,
        stats: { colors: true },
    });
    browserSync({
        server: {
            baseDir: 'dist/',
            proxy: 'local.dev',
            middleware: middleware
        }
    });
});

// Production build
gulp.task('build', ['fonts', 'css:fonts', 'images', 'css', 'webpack:build', 'views', 'webconfig']);
gulp.task('server', ['fonts', 'css:fonts', 'images', 'css', 'watch', 'dev-server', 'views']);
gulp.task('default', ['build']);
gulp.task('deploy', ['build']);
