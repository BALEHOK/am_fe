/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var NotFoundRoute = Router.NotFoundRoute;

// Pages
var Layout = require('./components/common/layout.jsx');
var SearchPage = require('./components/search/searchHandler.jsx');
var SearchSimplePage = require('./components/search/simple/searchSimpleHandler.jsx');
var SearchByTypePage = require('./components/search/byType/searchByTypeHandler.jsx');
var ResultPage = require('./components/search/results_handler.jsx');
var ResultByTypePage = require('./components/search/resultsByType_handler.jsx');
var LoginPage = require('./components/login/IS3Login.jsx');
var AssetCreatePage = require('./components/asset/create/createHandler.jsx');
var AssetViewPage = require('./components/asset/viewHandler.jsx');
var AssetEditPage = require('./components/asset/edit/editHandler.jsx');
var HistoryHandler = require('./components/history/historyHandler.jsx');
var ReportsHandler = require('./components/reports/reportsHandler.jsx');
var NotFound = require('./components/errorPages/notFound.jsx');
var ContactHandler = require('./components/contact/contactHandler.jsx');
var FaqHandler = require('./components/faq/faqHandler.jsx');
var TasksHandler = require('./components/tasks/tasksHandler');

var routes = (
  <Route name="app" path="/" handler={Layout}>
    <Route name="login" handler={LoginPage}/>
    <Route name="contact" handler={ContactHandler} />
    <Route name="faq" handler={FaqHandler}/>
    <Route name="search" handler={SearchPage}>
      <Route name="simple-search"
        path="/search"
        handler={SearchSimplePage} />
      <Route name="type-search"
        path="/search/type"
        handler={SearchByTypePage} />
    </Route>
    <Route name="reports" handler={ReportsHandler} />
    <Route name="tasks" handler={TasksHandler} />
    <Route name="result"
      path="/search/result/?:searchId?"
      handler={ResultPage} />
    <Route name="resultByType"
      path="/search/type/result/?:searchId?"
      handler={ResultByTypePage} />
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
    <NotFoundRoute name="404" path="/404" handler={NotFound}/>
  </Route>
);

var appRouter = Router.create({ routes: routes });
module.exports = appRouter;
