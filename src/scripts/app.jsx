﻿/**
 * @jsx React.DOM
 * This is our composition root: place where all components get tied together
 */

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
var ResultPage = require('./components/search/result.jsx');
var LoginPage = require('./components/login/main.jsx');

// Services and models
var SimpleSearch = require('./models/SimpleSearch.ts').SimpleSearch;
var simpleSearchModel = new SimpleSearch();

var SearchStore = require('./stores/SearchStore.ts').SearchStore;
var searchStore = SearchStore.getInstance();
var SearchCounterStore = require('./stores/SearchCounterStore.ts').SearchCounterStore;
var searchCounterStore = SearchCounterStore.getInstance();

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
  <Routes>
    <Route name="app" path="/" handler={Layout} model={app}>
      <Route name="login" handler={LoginPage}/>
      <Route name="search" handler={SearchPage} model={simpleSearchModel} />
      <Route name="result" path="/search/result" 
      		handler={ResultPage} 
      		SearchStore={searchStore} 
      		SearchCounterStore={searchCounterStore} />
      <DefaultRoute handler={SearchPage} model={simpleSearchModel} />
    </Route>
  </Routes>
);

React.renderComponent(routes, document.querySelector('.page-container'));
