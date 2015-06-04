/**
 * @jsx React.DOM
 */

var React = require('react');
var DateTime = require('./datetime');

var Attribute = React.createClass({
    render: function() {
        return <DateTime params={this.props.params} />;
    }
});

module.exports = Attribute;