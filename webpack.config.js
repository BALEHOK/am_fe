var webpack = require('webpack');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var constants = require('./envs/' + env);

module.exports = {
    target: 'web',
    debug: true,
    devtool: 'source-map',
    stats: {
        colors: true,
        reasons: false
    },
    entry: {
        main: ['./webpack_entries/app.js']
    },
    output: {
        path: path.join(__dirname, '/dist/assets/js'),
        filename: 'bundle-main.js'
    },
    plugins: [
        new webpack.DefinePlugin(constants)
       // new webpack.optimize.DedupePlugin(),
       // new webpack.optimize.UglifyJsPlugin()
       // new webpack.optimize.OccurenceOrderPlugin(),
       // new webpack.optimize.AggressiveMergingPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['bower_components', 'node_modules']
    },
    resolveLoader: {
        modulesDirectories: ['webpack-loaders', 'node_modules']
    },
    module: {
        loaders: [
            { test: /^(?!.*(bower_components|node_modules))+.+\.js$/, loader: '6to5-loader'},
            { test: /\.jsx$/, loader: 'jsx-loader!6to5-loader'}
        ],
        noParse: /\.min\.js/
    }
};
