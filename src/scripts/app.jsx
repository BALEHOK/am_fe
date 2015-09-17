/**
 * @jsx React.DOM
 * This is our composition root: place where all components get tied together
 */

var React = require('react');
var router = require('./appRouter');
var RouterContainer = require('./services/RouterContainer');
var AuthService = require('./services/AuthService');
var LoginActions = require('./actions/LoginActions');
require('babel-core/polyfill');
import {} from "element-closest";
import {} from "whatwg-fetch";
import moment from 'moment';

RouterContainer.set(router);

if (AuthService.isLoggedIn()) {
  LoginActions.loginUser();
}

router.run(function (Handler, state) {
  React.render(<Handler {...state} />, document.querySelector('.page-container'));
});

// enable react devtools
typeof window !== "undefined" && (window.React = React)
