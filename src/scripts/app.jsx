/**
 * @jsx React.DOM
 * This is our composition root: place where all components get tied together
 */
// Setup
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    // TODO: inject via config
    options.url = 'http://am.local' + options.url ;
});

// Components
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Routes = Router.Routes;
var Link = Router.Link;

// Pages
var Layout = require('./components/common/layout.jsx');
var SearchPage = require('./components/search/main.jsx');
var LoginPage = require('./components/login/main.jsx');

// Services and models
var SearchService = require('./services/SearchService').SearchService;
var searchService = new SearchService();

var SimpleSearch = require('./models/SimpleSearch').SimpleSearch;
var simpleSearchModel = new SimpleSearch(searchService);

var AuthService = require('./services/AuthService').AuthService;
var authService = new AuthService();

var Application = require('./models/Application').Application;
var app = new Application(authService);

var routes = (
  <Routes>
    <Route name="app" path="/" handler={Layout} model={app}>
      <Route name="login" handler={LoginPage}/>
      <Route name="search" handler={SearchPage} model={simpleSearchModel} />
      <DefaultRoute handler={SearchPage} model={simpleSearchModel} />
    </Route>
  </Routes>
);

React.renderComponent(routes, document.querySelector('.page-container'));