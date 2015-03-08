/**
 * @jsx React.DOM
 */

var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;
var ReactSelectize = require('../common/react-selectize');
var AssetViewType1 = require('./view_types/type1/view');
var AssetViewType2 = require('./view_types/type2/view');
var AssetViewType3 = require('./view_types/type3/view');
var Flux = require('delorean').Flux;
var SearchResultsHeader = require('./searchResultsHeader');
var TaxonomyPath = require('./taxonomyPath');
var AssetToolbar = require('./assetToolbar');
var RevisionInfo = require('./revisionInfo');
var ValueTransformer = require('../../util/valueTransformer').ValueTransformer;

var views = {
    1: AssetViewType1,
    2: AssetViewType2,
    3: AssetViewType3
};

var AssetView = React.createClass({
    mixins:[Router.State, Flux.mixins.storeListener],

    componentDidMount: function() {
    },

    componentWillMount: function() {
        this.props.actions.loadAsset(this.getParams());
    },

    componentWillUnmount: function() {
    },

    onScreenChange: function(val) {
        this.setState({
            selectedScreen: parseInt(val)
        });
    },

    onAssetDelete: function() {
        this.props.actions.deleteAsset(this.getParams());
    },

    onAssetRestore: function() {
        this.props.actions.restoreAsset(this.getParams());
    },

    render: function() {
        var assetStore = this.state.stores.asset;
        var asset = assetStore.asset;
        var linkedAssets = assetStore.relatedAssets;

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

        var screens = asset.screens.map(function(el) {
            return {name: el.name, id: el.id};
        });
        var selected = this.state.selectedScreen || screens[0] && screens[0].id;
        var screen = asset.screens.filter(function(el) { return el.id === selected })[0];

        //TODO: change to parameter
        var ViewComponent = views[3];

        var dateTransform = new ValueTransformer(function (date) {
          return moment(date).format('DD.MM.YYYY HH:mm');
        });

        var cx = React.addons.classSet;
        var titleClasses = cx({
            'page-title__param': true,
            'light-grey': asset.isDeleted
        });

        return (
            <div>
                <SearchResultsHeader actions={this.props.actions} />
                <h1 className="page-title">
                    <span className={titleClasses}>
                        {asset.name}
                    </span>
                </h1>
                <RevisionInfo asset={asset} dateTransform={dateTransform} />
                <div className="grid">
                    <div className="grid__item two-twelfths">
                        <ReactSelectize
                            items={screens}
                            value={selected}
                            onChange={this.onScreenChange}
                            selectId="select-screen"
                            placeholder="Screen:"
                            label=" "
                            className="select_width_full"
                        />
                        <TaxonomyPath assetTypeId={asset.assetTypeId} actions={this.props.actions} />
                        <nav className="nav-block">
                            <span className="nav-block__title nav-block__title_type_second">Asset type</span>
                            <div className="nav-block__item">
                                <span>System <span className="icon icon_arrow_right"></span> <a href="#">admin</a></span>
                            </div>
                        </nav>
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
                            screen={screen || {panels: []}}
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
            </div>
        );
        }
});
module.exports = AssetView;
