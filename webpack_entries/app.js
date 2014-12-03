/// libraries
var $ = require('script!jquery');
var _ = require('script!underscore');
var Backbone = require('script!backbone');
var selectize = require('script!../src/scripts/libs/selectize/dist/js/standalone/selectize.js');
var React = require('react');
require('script!backbone-react-component');

/// application initialization
require('../src/scripts/AppDispatcher.js');
require('../src/scripts/app.jsx');
