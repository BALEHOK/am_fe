/**
 * @jsx React.DOM
 * This is our composition root: place where all components get tied together
 */

var React = require('react');
var router = require('./appRouter');
var RouterContainer = require('./services/RouterContainer');
var LoginActions = require('./actions/LoginActions');
var LoginStore = require('./stores/LoginStore').store;
require('babel-core/polyfill');
import {} from "element-closest";
import {} from "whatwg-fetch";
import moment from 'moment';

RouterContainer.set(router);
let tokenString = localStorage.getItem('token');
if (tokenString) {
    let savedToken = JSON.parse(tokenString);
    let tokenIssued = moment(savedToken['.issued']);
    let tokenExpires = moment(savedToken['.issued']).add(savedToken['expires_in'], 'seconds');
    if (moment().isBetween(tokenIssued, tokenExpires)) {
        LoginActions.loginUser(tokenString);
    } else {
        LoginActions.logoutUser();
    }
}

router.run(function (Handler, state) {
  React.render(<Handler {...state} />, document.querySelector('.page-container'));
});

// enable react devtools
typeof window !== "undefined" && (window.React = React)
