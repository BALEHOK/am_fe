/**
 * @jsx React.DOM
 */

var React = require('react');
var AuthenticatedRouteMixin = require('../../../mixins/AuthenticatedRouteMixin');
var AssetActions = require('../../../actions/AssetActions');
var AssetDispatcher = require('../../../dispatchers/AssetDispatcher');
var Edit = require('./edit');

var AssetEditHandler = React.createClass({

    displayName: function() {
        return 'Edit asset';
    },

    statics: {
        willTransitionTo: function(transition, params, query) {
            let asset = AssetDispatcher.getStore('asset').getState().asset;
            if(asset.assetTypeId !== parseInt(params.assetTypeId)
                || asset.id !== parseInt(params.assetId)) {
                    var actions = new AssetActions(AssetDispatcher);
                    actions.loadAsset(params);
              }
        }
    },

    componentWillMount: function() {
        this.dispatcher = AssetDispatcher;
        this.actions = new AssetActions(this.dispatcher);
    },

    render: function() {
        return <Edit actions={this.actions} dispatcher={this.dispatcher} />
    }
});
module.exports = AssetEditHandler;
