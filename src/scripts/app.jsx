/**
 * @jsx React.DOM
 * This is our composition root: place where all components get tied together
 */

// Components
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

// Pages
var Layout = require('./components/common/layout.jsx');
var SearchPage = require('./components/search/main.jsx');
var ResultPage = require('./components/search/result.jsx');
var LoginPage = require('./components/login/main.jsx');
var AssetViewPage = require('./components/asset/view.jsx');
var AssetEditPage = require('./components/asset/edit.jsx');

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

var routes = (
  <Route name="app" path="/" handler={Layout} model={app}>
    <Route name="login" handler={LoginPage}/>
    <Route name="search" handler={SearchPage} />
    <Route name="result" path="/search/result" handler={ResultPage} />
    <Route name="asset-view"
      path="/assettype/:assetTypeUid/asset/:assetUid" handler={AssetViewPage} />
    <Route name="asset-edit"
      path="/assettype/:assetTypeUid/asset/:assetUid/edit"
      handler={AssetEditPage} />
    <DefaultRoute handler={SearchPage} />
  </Route>
);
Router.run(routes, function (Handler) {
  React.render(<Handler model={app}/>, document.querySelector('.page-container'));
});
// enable react devtools
typeof window !== "undefined" && (window.React = React)
