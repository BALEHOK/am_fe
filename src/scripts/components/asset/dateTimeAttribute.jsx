/**
 * @jsx React.DOM
 */

var React = require('react');
var DateTimeField = require('react-datetimepicker');
var moment = require('moment');

var DateTimeAttribute = React.createClass({
    render: function() {
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <DateTimeField selectedDate={moment(this.props.attribute.value)}/>
            </li>
        );
    }
});

module.exports = DateTimeAttribute;