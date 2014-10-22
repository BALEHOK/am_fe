/**
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
var LoginPage = require('./components/login/main.jsx');

// Models
var Session = require('./models/Session').SessionModel;
var session = new Session();

var SimpleSearch = require('./models/SimpleSearch').SimpleSearch;
var SearchService = require('./services/SearchService').SearchService;
var simpleSearchModel = new SimpleSearch(new SearchService());

var routes = (
  <Routes>
    <Route name="app" path="/" handler={Layout} model={session}>
      <Route name="login" handler={LoginPage}/>
      <Route name="search" handler={SearchPage} model={simpleSearchModel} />
      <DefaultRoute handler={SearchPage} model={simpleSearchModel} />
    </Route>
  </Routes>
);

React.renderComponent(routes, document.querySelector('.page-container'));