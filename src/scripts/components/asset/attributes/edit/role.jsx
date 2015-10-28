/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
//var ControlWrapper = require('./controlWrapper');
var SelectWrapper = require('./selectWrapper');
var ValidationMixin = require('../../../../mixins/ValidationMixin');
var ReactSelectize = require('../../../common/react-selectize');
var Flux = require('delorean').Flux;

var EditableAttribute = React.createClass({
    mixins: [ValidationMixin, Flux.mixins.storeListener],

    watchStores: ['list'],

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    handleChange: function(e) {
        console.log(e);
        this.props.params.value = e[0];
    },

    getItems: function() {
        if(this.state.stores.list.roles.length > 0) {
            return this.state.stores.list.roles;
        } else {
            return [this.props.params.value];
        }
    },

    requestItems: function() {
        this.props.actions.loadRoles();
    },

    render: function() {
        var classes = cx('select', 'select_size_small');
        var value = this.props.params.value
            ? this.props.params.value.id
            : 0;
        var isRequired = this.props.params.required;
        return (
            <SelectWrapper
                id={this.props.params.id}
                name={this.props.params.name}
                className={classes}
                validationState={this.state.validation}
                isRequired={isRequired}
            >
                <ReactSelectize
                    items={this.getItems()}
                    value={value}
                    onItemsRequest={this.requestItems}
                    onChange={this.handleChange}
                    selectId={"roles-" + this.props.params.id}
                    placeholder=" "
                    label=" "
                />
            </SelectWrapper>
        );
    }
});

module.exports = EditableAttribute;
