/**
 * @jsx React.DOM
 * This is our composition root: place where all components get tied together
 */

// Components
var React = require('react');
var router = require('./appRouter');
// Services and models
var TokenStore = require('./models/TokenStore.js').CookieTokenStore;
var tokenStore = new TokenStore();

var AuthService = require('./services/AuthService.js').AuthService;
var authService = new AuthService();

var Application = require('./models/Application.js').Application;
var app = new Application(authService, tokenStore);

// TODO: to use in static AuthenticateRouteMixin
window.app = app;

router.run(function (Handler, state) {
  React.render(<Handler app={app}/>, document.querySelector('.page-container'));
});
// enable react devtools
typeof window !== "undefined" && (window.React = React)
