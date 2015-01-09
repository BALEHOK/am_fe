/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Attribute = require('./attribute.jsx');
var Link = Router.Link;
var ReactSelectize = require('../common/react-selectize');
var AssetViewType1 = require('./view_types/type1/view');
var Flux = require('delorean').Flux;

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

    getLinkedAssets: function(asset) {
        var assets = [];
        if(!asset) {
            return assets;
        }
        asset.screens.forEach(screen => {
            screen.panels.forEach(panel => {
                panel.attributes.forEach(attr => {
                    if(attr.relatedAsset && attr.relatedAsset.uid) {
                        var rel = attr.relatedAsset;
                        assets.push({
                            uid: rel.uid,
                            typeId: rel.assetTypeId,
                            value: attr.value,
                            name: attr.name
                        });
                    }
                });
            });
        });
        return assets;
    },

    render: function() {
        var asset = this.state.stores.asset;
        var screens = asset.screens.map(function(el) {
            return {name: el.name, id: el.id};
        });
        var selected = this.state.selectedScreen || screens[0] && screens[0].id;

        var screen = asset.screens.filter(function(el) { return el.id === selected })[0];

        var linkedAssets = this.getLinkedAssets(asset);

        return <AssetViewType1
            screen={screen || {panels: []}}
            onScreenChange={this.onScreenChange}
            screens={screens}
            linkedAssets={linkedAssets}
            selectedScreen={selected}
            actions={this.actions} />;
    }
});
module.exports = AssetView;
