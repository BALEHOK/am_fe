/**
 * @jsx React.DOM
 */

var React = require('react');
var StringAttribute = require('./stringHtml');

var Attribute = React.createClass({
    render: function() {
        return <StringAttribute params={this.props.params} />;
    }
});

module.exports = Attribute;
