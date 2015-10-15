/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;

// Pages
var Layout = require('./components/common/layout.jsx');
var SearchPage = require('./components/search/searchHandler.jsx');
var SearchSimplePage = require('./components/search/simple/searchSimpleHandler.jsx');
var SearchByTypePage = require('./components/search/byType/searchByTypeHandler.jsx');
var ResultPage = require('./components/search/results_handler.jsx');
var LoginPage = require('./components/login/IS3Login.jsx');
var AssetCreatePage = require('./components/asset/create/createHandler.jsx');
var AssetViewPage = require('./components/asset/viewHandler.jsx');
var AssetEditPage = require('./components/asset/edit/editHandler.jsx');
var HistoryHandler = require('./components/history/historyHandler.jsx');
var ReportsHandler = require('./components/reports/reportsHandler.jsx');

var routes = (
  <Route name="app" path="/" handler={Layout}>
    <Route name="login" handler={LoginPage}/>
    <Route name="search" handler={SearchPage}>
      <Route name="simple-search"
        path="/search"
        handler={SearchSimplePage} />
      <Route name="type-search"
        path="/search/type"
        handler={SearchByTypePage} />
    </Route>
    <Route name="reports" handler={ReportsHandler} />
    <Route name="result"
      path="/search/result/?:searchId?"
      handler={ResultPage} />
    <Route
      name="asset-create"
      path="create"
      handler={AssetCreatePage} />
    <Route
        name="asset-create-from-type"
        path="assettype/:assetTypeId/asset"
        handler={AssetEditPage} />
    <Route name="asset-view"
      path="/assettype/:assetTypeId/asset/:assetId"
      handler={AssetViewPage} />
    <Route name="asset-revision"
      path="/assettype/:assetTypeId/asset/:assetId/revisions/:revision"
      handler={AssetViewPage} />
    <Route name="asset-edit"
      path="/assettype/:assetTypeId/asset/:assetId/edit"
      handler={AssetEditPage} />
    <Route name="asset-history"
      path="/assettype/:assetTypeId/asset/:assetId/history"
      handler={HistoryHandler} />
    <Redirect from="/" to="simple-search" />
  </Route>
);

var appRouter = Router.create({ routes: routes });
module.exports = appRouter;
