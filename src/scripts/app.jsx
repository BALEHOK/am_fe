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
import {} from "whatwg-fetch";

RouterContainer.set(router);
let tokenString = localStorage.getItem('token');
if (tokenString) {
  LoginActions.loginUser(tokenString);
}

router.run(function (Handler, state) {
  React.render(<Handler {...state} />, document.querySelector('.page-container'));
});

// enable react devtools
typeof window !== "undefined" && (window.React = React)
