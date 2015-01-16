/**
 * @jsx React.DOM
 */

var React = require('react');
var DateTimeField = require('react-bootstrap-datetimepicker/DateTimeField');
var Input = require('react-bootstrap').Input;
var DateTimeAttribute = React.createClass({
    onChange: function() {},
    render: function() {
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <DateTimeField onChange={this.onChange} />
            </li>
        );
    }
});

module.exports = DateTimeAttribute;