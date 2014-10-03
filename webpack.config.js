﻿module.exports = {
    target: "web",
    debug: true,
    devtool: "source-map",
    stats: {
        colors: true,
        reasons: false
    },
    output: {
        publicPath: "/assets/js",
        filename: "/assets/bundle-[name].js"
    },
    plugins: [
       // new webpack.optimize.DedupePlugin(),
       // new webpack.optimize.UglifyJsPlugin(),
       // new webpack.optimize.OccurenceOrderPlugin(),
       // new webpack.optimize.AggressiveMergingPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['bower_components', 'node_modules'],
    },
    module: {
        loaders: [
            //{ test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
            //{ test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
            //{ test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
            //{ test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png' },
            { test: /\.jsx$/, loader: 'jsx-loader' }
        ],
        noParse: /\.min\.js/
    }
}