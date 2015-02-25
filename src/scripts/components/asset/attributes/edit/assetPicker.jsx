/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Flux = require('delorean').Flux;
var ReactSelectize = require('../common/react-selectize');
var AssetActions = require('../../actions/AssetActions');
var AssetDispatcher = require('../../dispatchers/AssetDispatcher');

var AssetPicker = React.createClass({
    mixins:[Flux.mixins.storeListener, Router.State],
    componentWillMount: function() {
    },
    componentWillUnmount: function() {
    },
    onChange: function(values) {
        var uid = this.props.attribute.uid;
        this.props.actions.updateAssetValue({values, uid});
    },
    onItemsRequest: function(query, callback) {
        return this.props.actions.loadAssetsList({
           assetTypeId: this.getRelatedAttribute().relatedAssetTypeId,
           query: query,
           uid: this.props.attribute.uid
        });
    },

    getRelatedAttribute: function() {
        var attributeUid = this.props.attribute.uid;
        return _
            .chain(this.state.stores.asset.relatedAssets)
            .findWhere({attributeUid: attributeUid})
            .value();
    },

    render: function() {
        var items = [];
        var value = null;
        var attributeUid = this.props.attribute.uid;
        var selectId = "attribute-asset-" + attributeUid;
        var listStore = this.state.stores.list.assets[attributeUid];
        if(listStore) {
            items = listStore.values || [];
            items = _.unique(items.concat(listStore.items || []));
            value = _.pluck(listStore.values, 'id');
        }

        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <ReactSelectize
                    multiple={this.props.isMultiple}
                    selectId={selectId}
                    valueField="id"
                    labelField="name"
                    sortField="id"
                    items={items}
                    onItemsRequest={this.onItemsRequest}
                    onChange={this.onChange}
                    value={value}
                    placeholder=" "
                    label=" " />
            </li>
        );
    }
});

module.exports = AssetPicker;