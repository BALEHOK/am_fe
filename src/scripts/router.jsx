/**
 * @jsx React.DOM
 * This is our composition root: place where all components get tied together
 */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

// Pages
var Layout = require('./components/common/layout.jsx');
var SearchPage = require('./components/search/main.jsx');
var ResultPage = require('./components/search/result.jsx');
var LoginPage = require('./components/login/main.jsx');
var AssetViewPage = require('./components/asset/view.jsx');
var AssetEditPage = require('./components/asset/edit.jsx');

var routes = (
  <Route name="app" path="/" handler={Layout}>
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

var router = Router.create({ routes: routes });

module.exports = router;