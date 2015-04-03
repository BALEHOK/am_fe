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
var LoaderMixin = require('../../mixins/LoaderMixin');

var AssetView = React.createClass({
    mixins:[Router.State, Flux.mixins.storeListener, LoaderMixin],

    getInitialState: function() {
        return {
            selectedScreen: undefined
        };
    },

    componentWillMount: function() {
        var params = _.extend({}, this.getParams(), this.getQuery());
        this.waitFor(this.props.actions.loadAsset(params));
    },

    onAssetDelete: function() {
        this.props.actions.deleteAsset(this.getParams());
    },

    onAssetRestore: function() {
        this.props.actions.restoreAsset(this.getParams());
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

        var assetLinks = linkedAssets.filter(function(e) { return e.assets != null }).map((entity) => {
            var links = entity.assets.map(function(asset){
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

        var cx = React.addons.classSet;
        var titleClasses = cx({
            'page-title__param': true,
            'light-grey': asset.isDeleted
        });

        var ViewComponent = ViewsFactory.getViewComponent(
            asset.screens, this.state.selectedScreen);

        return (
            <div>
                <SearchResultsHeader actions={this.props.actions} />
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
                                <span className="nav-block__title nav-block__title_type_second">Search result report</span>
                                <ul className="nav-block__list">
                                    <li className="nav-block__item">
                                        <span className="link link_second"><span className="icon icon_download"></span>Default Reports</span>
                                    </li>
                                    <li className="nav-block__item">
                                        <span className="link link_second"><span className="icon icon_download"></span>Report with child assets</span>
                                    </li>
                                </ul>
                            </nav>
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
                        </div>
                        <div className="grid__item ten-twelfths">
                            <ViewComponent
                                screen={this.state.selectedScreen || {panels: []}}
                                actions={this.props.actions}
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
