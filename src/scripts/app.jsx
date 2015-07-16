/**
 * @jsx React.DOM
 * This is our composition root: place where all components get tied together
 */

var React = require('react');
var router = require('./appRouter');
var RouterContainer = require('./services/RouterContainer');
var LoginActions = require('./actions/LoginActions');
var LoginStore = require('./stores/LoginStore').store;
import {} from "element-closest";

RouterContainer.set(router);
let tokenString = localStorage.getItem('token');
if (tokenString) {
  LoginActions.loginUser(tokenString);
}

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
