/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Flux = require('delorean').Flux;
var ReactSelectize = require('../../../common/react-selectize');
var ValidationMixin = require('../../../../mixins/ValidationMixin');
var cx = require('classnames');
//var ControlWrapper = require('./controlWrapper');
var SelectWrapper = require('./selectWrapper');

var ListPicker = React.createClass({
    mixins:[Flux.mixins.storeListener, ValidationMixin],

    watchStores: ['list'],

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    onChange: function(values) {
        this.props.params.value = values[0];
        this.validate({id: this.props.params.id, value: this.props.params.value});
    },

    onItemsRequest: function() {
        this.props.actions.loadDynamicList({
            attributeId: this.props.params.id
        });
    },

    render: function() {
        var items = [this.props.params.value];
        var value = this.props.params.value.id;
        var attributeId = this.props.params.id;
        var selectId = "attribute-dynlist-" + attributeId;
        var listStore = this.state.stores.list.dynlists[attributeId];
        if (listStore) {
            items = _.unique(items.concat(listStore.items));
        }
        var classes = cx('select', 'select_size_small');
        return (
           <SelectWrapper
                name={this.props.params.name}
                className={classes}
                validationState={this.state.validation}>

                    <ReactSelectize
                        multiple={this.props.isMultiple}
                        selectId={selectId}
                        valueField="id"
                        labelField="value"
                        items={items}
                        onItemsRequest={this.onItemsRequest}
                        onChange={this.onChange}
                        value={value}
                        placeholder=" "
                        label=" " />

            </SelectWrapper>
        );
    }
});

module.exports = ListPicker;
