/**
 * @jsx React.DOM
 */

var React = require('react');

var Attribute = React.createClass({
    render: function() {
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <span>{this.props.attribute.value}</span>
            </li>
        );
    }
});

module.exports = Attribute;