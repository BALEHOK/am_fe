/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

// Pages
var Layout = require('./components/common/layout.jsx');
var SearchPage = require('./components/search/main.jsx');
var ResultPage = require('./components/search/results_handler.jsx');
var LoginPage = require('./components/login/main.jsx');
var AssetCreatePage = require('./components/asset/create/createHandler.jsx');
var AssetViewPage = require('./components/asset/viewHandler.jsx');
var AssetEditPage = require('./components/asset/edit/editHandler.jsx');
var HistoryHandler = require('./components/history/historyHandler.jsx');

var routes = (
  <Route name="app" path="/" handler={Layout}>
    <Route name="login" handler={LoginPage}/>
    <Route name="search" handler={SearchPage} />
    <Route name="type-search"
      path="/search/type/:assetTypeId"
      handler={SearchPage} />
    <Route name="result"
      path="/search/result/?:searchId?"
      handler={ResultPage} />
    <Route name="asset-create"
      path="/create/?"
      handler={AssetCreatePage} />
    <Route name="asset-view"
      path="/assettype/:assetTypeId/asset/:assetId"
      handler={AssetViewPage} />
    <Route name="asset-revision"
      path="/assettype/:assetTypeId/asset/:assetId/revisions/:revision"
      handler={AssetViewPage} />
    <Route name="asset-create-from-type"
      path="/assettype/:assetTypeId/asset"
      handler={AssetEditPage} />
    <Route name="asset-edit"
      path="/assettype/:assetTypeId/asset/:assetId/edit"
      handler={AssetEditPage} />
    <Route name="asset-history"
      path="/assettype/:assetTypeId/asset/:assetId/history"
      handler={HistoryHandler} />
    <DefaultRoute handler={SearchPage} />
  </Route>
);

var appRouter = Router.create({ routes: routes });
module.exports = appRouter;
