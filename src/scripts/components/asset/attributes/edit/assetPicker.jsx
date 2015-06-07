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
        var value = values[0];
        this.props.params.value = { id: value.id, name: value.name };
        this.validate({id: this.props.params.id, value: this.props.params.value });
    },

    onItemsRequest: function(query, callback) {
        return this.props.actions.loadAssetsList({
           assetTypeId: this.props.params.relatedAssetTypeId,
           query: query,
           uid: this.props.params.uid
        });
    },

    render: function() {
        var items = this.props.params.value.id
            ? [this.props.params.value]
            : [];
        var value = this.props.params.value.id;
        var attributeUid = this.props.params.uid;
        var listStore = this.state.stores.list.assets[attributeUid];
        if(listStore && listStore.items) {
            items = _.unique(items.concat(listStore.items));
        }
        var classes = cx('select', 'select_size_small');
        return (
            <ControlWrapper
                name={this.props.params.name}
                className={classes}
                validationState={this.state.validation}>

                <ReactSelectize
                    multiple={this.props.isMultiple}
                    selectId={"attribute-asset-" + attributeUid}
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
