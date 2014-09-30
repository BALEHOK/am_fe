var gulp = require('gulp');
var path = require("path");
var gutil = require("gulp-util");
var concat = require("gulp-concat");
var webpack = require("webpack");
var autoprefixer = require("gulp-autoprefixer");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var stylus = require("gulp-stylus");

var jsSrc = 'src/scripts/**/*.*';
var buildDest = 'dist';
var cssSrc = 'src/styles/*';

gulp.task("webpack:build", function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );
    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('css', function () {
    return gulp.src([cssSrc])
        .pipe(stylus())
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1']
        }))
        .pipe(gulp.dest(path.join(buildDest, "assets")));
});

// Production build
gulp.task("build", ["webpack:build", 'css']);

gulp.task('default', ['build']);