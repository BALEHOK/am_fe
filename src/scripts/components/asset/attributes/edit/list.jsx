/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
var ControlWrapper = require('./controlWrapper');
var ValidationMixin = require('../../../../mixins/ValidationMixin');
var ReactSelectize = require('../../../common/react-selectize');
var Flux = require('delorean').Flux;

const ROW_NUMBER = 10;

var EditableAttribute = React.createClass({
    mixins: [ValidationMixin, Flux.mixins.storeListener],

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    handleChange: function(e) {
        this.props.params.value = e[0];
        this.id = e.id;
    },

    getItems: function() {
        var items = this.state.stores.list[this.props.name][this.props.params.id];
        if(items) {
            return items.data.map(this.props.mapper);
        } else {
            return [this.props.params.value];
        }
    },

    requestItems: function(query) {
        return this.props.actions.loadList({
          id: this.props.params.id,
          filter: query || this.props.params.value,
          name: this.props.name
        });
    },

    render: function() {
        return (
            <ControlWrapper
                name={this.props.params.name}
                validationState={this.state.validation}>
                <ReactSelectize
                    items={this.getItems()}
                    value={this.id}
                    onItemsRequest={this.requestItems}
                    onChange={this.handleChange}
                    selectId={this.props.name + "-" + this.props.params.id}
                    placeholder=" "
                    label=" "
                />
            </ControlWrapper>
        );
    }
});

module.exports = EditableAttribute;
