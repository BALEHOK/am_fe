/**
 * @jsx React.DOM
 */

var React = require('react');
var ImageAttribute = require('./image');

var Attribute = React.createClass({
    render: function() {
        return <ImageAttribute params={this.props.params} />
    }
});

module.exports = Attribute;