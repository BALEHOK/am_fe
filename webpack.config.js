/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpak-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */

'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: {
    index: './webpack_entries/index.js',
    anotherPage: './webpack_entries/anotherPage.js',
    notes: './webpack_entries/notes.js',
  },

  output: {
    publicPath: '/assets',
    filename: 'bundle-[name].js',
  },

  cache: true,
  debug: true,
  devtool: false,

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['','.js','.jsx'],
    //alias: { jquery: '../scripts/libs/jquery/dist/jquery' }
  },

  module: {
    /*preLoaders: [{
      test: '\\.js$',
      exclude: 'node_modules',
      loader: 'jshint'
    }],*/

    loaders: [
      //{ test: /\.css$/, loader: 'style!css'},
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader') },
      { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif'},
      { test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg'},
      { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png'},
      { test: /\.jsx$/, loader: 'jsx-loader'}
    ]
  },

  plugins: [
    new ExtractTextPlugin('css/style.css', {
      allChunks: true
    })
  ]
};
