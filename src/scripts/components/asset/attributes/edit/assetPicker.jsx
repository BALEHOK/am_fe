/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Flux = require('delorean').Flux;
var ReactSelectize = require('../../../common/react-selectize');

var AssetPicker = React.createClass({
    mixins:[Flux.mixins.storeListener, Router.State],
    componentWillMount: function() {
    },
    componentWillUnmount: function() {
    },
    onChange: function(values) {
        var uid = this.props.params.uid;
        this.props.actions.updateAssetValue({values, uid});
    },
    onItemsRequest: function(query, callback) {
        return this.props.actions.loadAssetsList({
           assetTypeId: this.getRelatedAttribute().relatedAssetTypeId,
           query: query,
           uid: this.props.params.uid
        });
    },

    getRelatedAttribute: function() {
        var attributeUid = this.props.params.uid;
        return _
            .chain(this.state.stores.asset.relatedAssets)
            .findWhere({attributeUid: attributeUid})
            .value();
    },

    render: function() {
        var items = [];
        var value = null;
        var attributeUid = this.props.params.uid;
        var selectId = "attribute-asset-" + attributeUid;
        var listStore = this.state.stores.list.assets[attributeUid];
        if(listStore) {
            items = listStore.values || [];
            items = _.unique(items.concat(listStore.items || []));
            value = _.pluck(listStore.values, 'id');
        }

        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <div className="input-group">
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
                        label=" "
                        className="select_size_small" />
                
                    <button className="btn btn_size_small btn_type_second">
                        <i className="btn__icon btn__icon_plus_circle"></i>
                    </button>
                </div>
            </div>
        );
    }
});

module.exports = AssetPicker;