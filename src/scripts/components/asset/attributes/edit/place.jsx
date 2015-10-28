/**
 * @jsx React.DOM
 */

var React = require('react');
var List = require('./list');
var ValidationMixin = require('../../../../mixins/ValidationMixin');
var ControlWrapper = require('./controlWrapper');
var cx = require('classnames');

var EditableAttribute = React.createClass({

    mixins: [ValidationMixin],

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    handleChange: function(value) {
        this.validate({id: this.props.params.id, value: value});
    },

    render: function() {
        var classes = cx('select', 'select_size_small');
        var isRequired = this.props.params.required;
        return (
            <ControlWrapper
                id={this.props.params.id}
                name={this.props.params.name}
                className={classes}
                validationState={this.state.validation}
                isRequired={isRequired}
            >

                <List
                    params={this.props.params}
                    name="places"
                    actions={this.props.actions}
                    onChange={this.handleChange}
                    mapper={(el) => ({id: el.id, name: el.name})}
                    dispatcher={this.props.dispatcher} />

            </ControlWrapper>
        );
    }
});

module.exports = EditableAttribute;
