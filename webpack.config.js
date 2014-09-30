var path = require("path");
var webpack = require("webpack");
var webpackEntries = require("./webpack.entries.js");

module.exports = {
    entry: webpackEntries,
    output: {
        publicPath: '/assets/js',
        path: path.join(__dirname, "dist", "assets"),
        filename: 'bundle-[name].js'
    },
    debug: false,
    devtool: false,
    stats: {
        colors: true,
        reasons: false
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
            { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
            { test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
            { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png' },
            { test: /\.jsx$/, loader: 'jsx-loader' }
        ]
    }
}