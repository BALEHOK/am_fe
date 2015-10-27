/**
 * @jsx React.DOM
 */

var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Sticky = require('react-sticky');
var Link = Router.Link;
var Flux = require('delorean').Flux;
var SearchResultsHeader = require('./searchResultsHeader');
var TaxonomyPath = require('./taxonomyPath');
var AssetToolbar = require('./assetToolbar');
var RevisionInfo = require('./revisionInfo');
var ValueTransformer = require('../../util/valueTransformer').ValueTransformer;
var LayoutSwitcher = require('./layoutSwitcher');
var ViewsFactory = require('./viewsFactory');
var Loader = require('../common/loader.jsx');
var ReportsBlock = require('./reportsBlock');
var TasksSidebar = require('./tasksSidebar');
var Childs = require('./childAssetTypes');
var LoaderMixin = require('../../mixins/LoaderMixin');
var cx = require('classnames');
var NotFound = require('../errorPages/notFound.jsx');

var AssetView = React.createClass({
    mixins:[Flux.mixins.storeListener, LoaderMixin],

    watchStores: ['asset', 'report', 'task'],

    componentWillMount: function() {
        var params = _.extend({}, this.props.params, this.props.query);
        this.waitFor(this.props.actions.loadAsset(params));
        this.props.actions.loadReports(this.props.params.assetTypeId);
        this.props.actions.loadTasks(this.props.params.assetTypeId);
    },

    componentWillReceiveProps: function(nextProps) {
        if (!_.isEqual(this.props.params, nextProps.params) ||
            !_.isEqual(this.props.query, nextProps.query)) {
            var params = _.extend({}, nextProps.params, nextProps.query);
            this.waitFor(this.props.actions.loadAsset(params));
        }
    },

    componentWillUpdate: function(nextProps, nextState) {
        if (!_.isEqual(this.state.stores.task.response, nextState.stores.task.response) && nextState.stores.task.response.status) {
            let response = nextState.stores.task.response;
            let params = {
                type: '',
                msg: ''
            };
            switch (response.status) {
                case 'ERROR':
                    params.type = 'error';
                    params.msg = response.errors.join(' ');
                    break;
                case 'SUCCESS':
                    params.type = 'success';
                    params.msg = '';
                    break;
                default:
                    params.type = '';
                    params.msg = '';
            }
            this.props.notifications.show(params);
            this.props.actions.clearTaskResponse();
        }
    },

    onAssetDelete: function() {
        this.waitFor(
            this.props.actions.deleteAsset(this.props.params));
    },

    onAssetRestore: function() {
        this.waitFor(
            this.props.actions.restoreAsset(this.props.params));
    },

    onScreenChange: function(screenIndex) {
        this.props.actions.changeScreen(screenIndex);
    },

    onTaskExecution: function(taskId) {
        this.props.actions.executeTask(taskId);
    },

    render: function() {
        var assetStore = this.state.stores.asset;
        var asset = assetStore.asset;

        if (asset === null) {
            return <NotFound />;
        }

        var linkedAssets = assetStore.relatedAssets;
        var taxonomyPath = assetStore.taxonomyPath;
        var reports = this.state.stores.report.reports || [];
        var tasks = this.state.stores.task.tasks || [];
        var childAssetTypes = asset.childAssetTypes || [];

        var assetLinks = linkedAssets
            .filter(e => { return e.assets != null })
            .map((entity) => {
                var links = entity.assets.map(asset => {
                    return <Link className="nav-block__item-related"
                                 to="asset-view"
                                 params={{assetTypeId: asset.assetTypeId, assetId: asset.id}}>
                                {asset.name}
                            </Link>
                });
                return <div><span>{entity.name}: </span>{links}</div>;
            });

        var dateTransform = new ValueTransformer(function (date) {
          return moment(date).format('DD.MM.YYYY HH:mm');
        });

        var titleClasses = cx({
            'page-title__param': true,
            'light-grey': asset.isDeleted
        });

        var ViewComponent = ViewsFactory.getViewComponent(
            asset.screens, assetStore.currentScreen);

        return (
            <div className="asset-page">
                <SearchResultsHeader actions={this.props.actions} dispatcher={this.props.dispatcher} />
                <h1 className="page-title">
                    <span className={titleClasses}>
                        {asset.name}
                    </span>
                </h1>
                <RevisionInfo asset={asset} dateTransform={dateTransform} />
                <Loader loading={this.state.loading}>
                    <div className="grid">
                        <div className="grid__item two-twelfths asset-page__aside">

                            <LayoutSwitcher
                                screens={asset.screens}
                                selectedScreen={assetStore.currentScreen}
                                onChange={this.onScreenChange} />

                            <TaxonomyPath taxonomyPath={taxonomyPath} />

                            <nav className="nav-block">
                                <span className="nav-block__title nav-block__title_type_second">Linked assets</span>
                                <div className="nav-block__item">
                                    {assetLinks}
                                </div>
                            </nav>

                            <Childs childAssetTypes={childAssetTypes} />

                            <nav className="nav-block">
                                <ReportsBlock assetId={asset.id} assetTypeId={asset.assetTypeId} reports={reports} />
                            </nav>

                            <TasksSidebar
                                assetId={asset.id}
                                assetTypeId={asset.assetTypeId}
                                tasks={tasks}
                                onExecution={this.onTaskExecution} />
                        </div>
                        <div className="grid__item ten-twelfths asset-page__content">
                            <Sticky>
                                <AssetToolbar actions={this.props.actions}
                                              isHistory={asset.isHistory}
                                              isDeleted={asset.isDeleted}
                                              canEdit={asset.editable}
                                              canDelete={asset.deletable}
                                              onAssetDelete={this.onAssetDelete}
                                              onAssetRestore={this.onAssetRestore} />
                            </Sticky>
                            <ViewComponent screen={assetStore.currentScreen}
                                           actions={this.props.actions}
                                           dispatcher={this.props.dispatcher}
                                           assetTypeId={asset.assetTypeId} />
                        </div>
                    </div>
                </Loader>
            </div>
        );
        }
});
module.exports = AssetView;
