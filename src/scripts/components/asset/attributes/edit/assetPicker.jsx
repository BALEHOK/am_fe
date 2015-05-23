/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Flux = require('delorean').Flux;
var ReactSelectize = require('../../../common/react-selectize');
var ControlWrapper = require('./controlWrapper');
var ValidationMixin = require('../../../../mixins/ValidationMixin');
var cx = require('classnames');

var AssetPicker = React.createClass({
    mixins:[Flux.mixins.storeListener, Router.State, ValidationMixin],

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    onChange: function(values) {
        var uid = this.props.params.uid;
        this.props.actions.updateAssetValue({values, uid});
        this.validate({id: this.props.params.id, value: values});
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

        var classes = cx('select', 'select_size_small');
        return (
            <ControlWrapper
                name={this.props.params.name}
                className={classes}
                validationState={this.state.validation}>

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

            </ControlWrapper>
        );
    }
});

module.exports = AssetPicker;
