/**
 * @jsx React.DOM
 */

var React = require('react');
var moment = require('moment');
var Router = require('react-router');
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
var LoaderMixin = require('../../mixins/LoaderMixin');
var cx = require('classnames');

var AssetView = React.createClass({
    mixins:[Flux.mixins.storeListener, LoaderMixin],

    getInitialState: function() {
        return {
            selectedScreen: undefined
        };
    },

    componentWillMount: function() {
        var params = _.extend({}, this.props.params, this.props.query);
        this.waitFor(this.props.actions.loadAsset(params));
        this.props.actions.loadReports(this.props.params.assetTypeId);
    },

    componentWillReceiveProps: function(nextProps) {
        if (!_.isEqual(this.props.params, nextProps.params)) {
            this.setState({selectedScreen: undefined});
            var params = _.extend({}, nextProps.params, nextProps.query);
            this.waitFor(this.props.actions.loadAsset(params));
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

    storeDidChange: function (storeName) {
        if (storeName != 'asset') return;

        var asset = this.state.stores.asset.asset;
        var defaultScreen = _
            .chain(asset.screens)
            .findWhere({isDefault: true})
            .value();

        if (!this.state.selectedScreen) {
            this.setState({
                selectedScreen: defaultScreen
            });
        }
    },

    onScreenChange: function(screen) {
        this.setState({
            selectedScreen: screen
        });
    },

    render: function() {
        var assetStore = this.state.stores.asset;
        var asset = assetStore.asset;
        var linkedAssets = assetStore.relatedAssets;
        var taxonomyPath = assetStore.taxonomyPath;
        var reports = this.state.stores.report.reports || [];

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
            asset.screens, this.state.selectedScreen);

        return (
            <div>
                <SearchResultsHeader actions={this.props.actions} dispatcher={this.props.dispatcher} />
                <h1 className="page-title">
                    <span className={titleClasses}>
                        {asset.name}
                    </span>
                </h1>
                <RevisionInfo asset={asset} dateTransform={dateTransform} />
                <Loader loading={this.state.loading}>
                    <div className="grid">
                        <div className="grid__item two-twelfths">
                            <LayoutSwitcher
                                screens={asset.screens}
                                selectedScreen={this.state.selectedScreen}
                                onChange={this.onScreenChange} />
                            <TaxonomyPath taxonomyPath={taxonomyPath} />
                            <nav className="nav-block">
                                <span className="nav-block__title nav-block__title_type_second">Linked assets</span>
                                <div className="nav-block__item">
                                    {assetLinks}
                                </div>
                            </nav>

                            <nav className="nav-block">
                                <ReportsBlock assetId={asset.id} assetTypeId={asset.assetTypeId} reports={reports} />
                            </nav>

                            {/*
                            <nav className="nav-block">
                                <span className="nav-block__title nav-block__title_type_second">Export</span>
                                <ul className="nav-block__list">
                                    <li className="nav-block__item">
                                        <span className="link link_second"><span className="icon icon_download"></span>.txt</span>
                                    </li>
                                    <li className="nav-block__item">
                                        <span className="link link_second"><span className="icon icon_download"></span>.xml</span>
                                    </li>
                                    <li className="nav-block__item">
                                        <span className="link link_second"><span className="icon icon_download"></span>.doc</span>
                                    </li>
                                    <li className="nav-block__item">
                                        <span className="link link_second"><span className="icon icon_download"></span>.zip all</span>
                                    </li>
                                </ul>
                            </nav>
                            */}
                        </div>
                        <div className="grid__item ten-twelfths">
                            <ViewComponent
                                screen={this.state.selectedScreen || {panels: []}}
                                actions={this.props.actions}
                                dispatcher={this.props.dispatcher}
                                assetTypeId={asset.assetTypeId} />
                            <AssetToolbar isHistory={asset.isHistory}
                                          isDeleted={asset.isDeleted}
                                          canEdit={asset.editable}
                                          canDelete={asset.deletable}
                                          onAssetDelete={this.onAssetDelete}
                                          onAssetRestore={this.onAssetRestore} />
                        </div>
                    </div>
                </Loader>
            </div>
        );
        }
});
module.exports = AssetView;
