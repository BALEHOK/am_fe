/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: {
    index: './webpack_entries/index.js',
    anotherPage: './webpack_entries/anotherPage.js',
    notes: './webpack_entries/notes.js',
  },

  output: {
    publicPath: '/assets/js',
    path: 'dist/assets',
    filename: 'bundle-[name].js',
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
    new webpack.optimize.AggressiveMergingPlugin(),
    /*new ExtractTextPlugin('style.css', {
      allChunks: true
    })*/
  ],

  resolve: {
    extensions: ['','.js','.jsx']
  },

  module: {
    /*preLoaders: [{
      test: '\\.js$',
      exclude: 'node_modules',
      loader: 'jshint'
    }],*/

    loaders: [
      //{ test: /\.css$/, loader: 'style!css'},
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      //{ test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader') },
      { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif'},
      { test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg'},
      { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png'},
      { test: /\.jsx$/, loader: 'jsx-loader'}
    ]
  },
};
