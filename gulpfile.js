var gulp = require('gulp'),
    path = require("path"),
    gutil = require("gulp-util"),
    concat = require("gulp-concat"),
    webpack = require("gulp-webpack"),
    autoprefixer = require("gulp-autoprefixer"),
    WebpackDevServer = require("webpack-dev-server"),
    webpackConfig = require("./webpack.config.js"),
    stylus = require("gulp-stylus"),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css');

var jsSrc = 'src/scripts/**/*.*';
var buildDest = 'dist';
var cssSrc = 'src/styles/*';

gulp.task("webpack:build", function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    //myConfig.plugins = myConfig.plugins.concat(
    //    new webpack.DefinePlugin({
    //        "process.env": {
    //            // This has effect on the react lib size
    //            "NODE_ENV": JSON.stringify("production")
    //        }
    //    }),
    //    new webpack.optimize.DedupePlugin(),
    //    new webpack.optimize.UglifyJsPlugin()
    //);
    return gulp.src('webpack_entries/search.js')
        .pipe(webpack(myConfig))
        .pipe(gulp.dest(buildDest));
    // run webpack
    //webpack(myConfig, function (err, stats) {
    //    if (err) throw new gutil.PluginError("webpack:build", err);
    //    gutil.log("[webpack:build]", stats.toString({
    //        colors: true
    //    }));
    //    callback();
    //});
});

gulp.task('css', function () {
    return gulp.src([cssSrc])
        .pipe(stylus())
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1']
        }))
        .pipe(gulp.dest(path.join(buildDest, "assets")))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(path.join(buildDest, "assets")))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('watch', function() {
    gulp.watch('src/', ['build']);
});

// Production build
gulp.task("build", ["webpack:build", "css"]);

gulp.task('default', ['build']);