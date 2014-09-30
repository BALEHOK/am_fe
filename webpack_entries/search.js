var $ = require('script!../src/scripts/libs/jquery/dist/jquery');
var _ = require('script!../src/scripts/libs/underscore/underscore');
var Backbone = require('script!../src/scripts/libs/backbone/backbone');

require('../src/scripts/search.js');

// Expose React as a global variable.
// This lets the react module to appear in the chrome dev tools.
require('expose?React!react');
