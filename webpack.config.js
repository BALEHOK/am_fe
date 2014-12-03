var webpack = require('webpack');

module.exports = {
    target: 'web',
    debug: true,
    devtool: 'source-map',
    stats: {
        colors: true,
        reasons: false
    },
    //entry: webpackEntries,
    output: {
        publicPath: '/Content/assets/js',
        filename: './bundle-[name].js'
    },
    plugins: [
       // new webpack.optimize.DedupePlugin(),
       // new webpack.optimize.UglifyJsPlugin()
       // new webpack.optimize.OccurenceOrderPlugin(),
       // new webpack.optimize.AggressiveMergingPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts'],
        modulesDirectories: ['bower_components', 'node_modules']
    },
    resolveLoader: {
        modulesDirectories: ['webpack-loaders', 'node_modules']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' },
            { test: /\.jsx$/, loader: 'jsx-loader'}
        ],
        noParse: /\.min\.js/
    }
};
