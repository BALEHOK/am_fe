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

    render: function() {
        var classes = cx('select', 'select_size_small');
        return (
            <ControlWrapper
                id={this.props.params.id}
                name={this.props.params.name}
                className={classes}
                validationState={this.state.validation}>

                <List
                    params={this.props.params}
                    name="zips"
                    actions={this.props.actions}
                    mapper={(el) => ({id: el.id, name: el.code})}
                    dispatcher={this.props.dispatcher} />

            </ControlWrapper>
        );
    }
});

module.exports = EditableAttribute;
