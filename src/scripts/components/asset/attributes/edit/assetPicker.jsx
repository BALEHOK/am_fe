/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Flux = require('delorean').Flux;
var ReactSelectize = require('../../../common/react-selectize');
//var ControlWrapper = require('./controlWrapper');
var SelectWrapper = require('./selectWrapper');
var ValidationMixin = require('../../../../mixins/ValidationMixin');
var cx = require('classnames');

var AssetPicker = React.createClass({
    mixins:[Flux.mixins.storeListener, Router.State, ValidationMixin],

    watchStores: ['list'],

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    onChange: function(values) {
        if (this.props.params.datatype == 'assets') {
            this.props.params.value = values;
        } else {
            this.props.params.value = values[0];
        }
        this.validate({id: this.props.params.id, value: this.props.params.value});
    },

    onItemsRequest: function(query, callback) {
        return this.props.actions.loadAssetsList({
           assetTypeId: this.props.params.relatedAssetTypeId,
           query: query,
           id: this.props.params.id
        });
    },

    createNew: function() {
      this.props.actions.pushAsset();
      this.context.router.transitionTo('asset-create-from-type', {
          assetTypeId: this.props.params.relatedAssetTypeId
      }, {
          forAttr: this.props.params.id
      });
    },

    render: function() {
        var items = _.flatten([this.props.params.value]);
        var value = _.pluck(items, 'id');
        var attrId = this.props.params.id;
        var listStore = this.state.stores.list.assets[attrId];
        if(listStore && listStore.items) {
            items = _.unique(items.concat(listStore.items));
        }
        var classes = cx('select', 'select_size_small');
        var maxItems = undefined;
        if (this.props.params.datatype == 'assets') {
            maxItems = 100;
        }
        return (
            <SelectWrapper
                id={this.props.params.id}
                name={this.props.params.name}
                className={classes}
                validationState={this.state.validation}>

                <ReactSelectize
                    maxItems={maxItems}
                    selectId={"attribute-asset-" + attrId}
                    valueField="id"
                    labelField="name"
                    sortField="id"
                    items={items}
                    onItemsRequest={this.onItemsRequest}
                    onChange={this.onChange}
                    value={value}
                    placeholder=" "
                    label=" " />
                <div
                    className="btn btn_type_one btn_size_small asset-data__param-btn"
                    onClick={this.createNew}>
                    <i className="btn__icon btn__icon_plus_circle"></i>Add new
                </div>

            </SelectWrapper>
        );
    }
});

module.exports = AssetPicker;
