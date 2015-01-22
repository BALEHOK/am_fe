/**
 * @jsx React.DOM
 */

var React = require('react');
var Asset = require('./asset');

var Attribute = React.createClass({
    render: function() {
        return <Asset params={this.props.params} />;
    }
});

module.exports = Attribute;