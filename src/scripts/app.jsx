/**
 * @jsx React.DOM
 * This is our composition root: place where all components get tied together
 */

var React = require('react');
var router = require('./appRouter');
var RouterContainer = require('./services/RouterContainer');
var LoginActions = require('./actions/LoginActions');
var LoginStore = require('./stores/LoginStore').store;

RouterContainer.set(router);
let tokenString = localStorage.getItem('token');
if (tokenString) {
  LoginActions.loginUser(tokenString);
}

$.ajaxPrefilter(function (options) {
    options.url = APIURL + options.url;
    options.crossDomain = true;
    if (!options.beforeSend) {
        options.beforeSend = function (xhr) {
            if (LoginStore.access_token && options.url != APIURL + '/token')
                xhr.setRequestHeader('Authorization', 'Bearer ' + LoginStore.access_token);
        };
    }
});

$.ajaxSetup({
    statusCode: {
        401: () => {
            if (LoginStore.isLoggedIn()) {
                LoginActions.logoutUser({
                    nextPath: RouterContainer.get().getCurrentPath()
                });
            }
        }
    }
});

router.run(function (Handler, state) {
  React.render(<Handler {...state} />, document.querySelector('.page-container'));
});

// enable react devtools
typeof window !== "undefined" && (window.React = React)
