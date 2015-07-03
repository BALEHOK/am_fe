/**
 * @jsx React.DOM
 * This is our composition root: place where all components get tied together
 */

var React = require('react');
var router = require('./appRouter');
var RouterContainer = require('./services/RouterContainer');
var LoginActions = require('./actions/LoginActions');

router.run(function (Handler, state) {
  React.render(<Handler {...state} />, document.querySelector('.page-container'));
});

RouterContainer.set(router);
let token = localStorage.getItem('token');
if (token) {
  LoginActions.loginUser(token);
}

$.ajaxPrefilter(function (options) {
    options.url = APIURL + options.url;
    options.crossDomain = true;
    if (!options.beforeSend) {
        options.beforeSend = function (xhr) {
            if (token && options.url != APIURL + '/token')
                xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token);
        };
    }
});

// enable react devtools
typeof window !== "undefined" && (window.React = React)
