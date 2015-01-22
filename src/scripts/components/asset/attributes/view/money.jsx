/**
 * @jsx React.DOM
 */

var React = require('react');
var Euro = require('./euro');

var Attribute = React.createClass({
    render: function() {
        return <Euro params={this.props.params} />
    }
});

module.exports = Attribute;