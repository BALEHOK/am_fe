/**
 * @jsx React.DOM
 * This is our composition root: place where all components get tied together
 */

// Components
var React = require('react');
var router = require('./appRouter');

// Services and models
var Config = require('./models/Config.ts').Config;
var config = new Config();

var TokenStore = require('./models/TokenStore.ts').CookieTokenStore;
var tokenStore = new TokenStore();

var AuthService = require('./services/AuthService.ts').AuthService;
var authService = new AuthService();

// TODO: to use the service in static AuthenticateRouteMixin
window.authService = authService;

var Application = require('./models/Application.ts').Application;
var app = new Application(config, authService, tokenStore);

router.run(function (Handler, state) {
  React.render(<Handler model={app}/>, document.querySelector('.page-container'));
});
// enable react devtools
typeof window !== "undefined" && (window.React = React)
