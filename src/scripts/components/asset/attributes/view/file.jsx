/**
 * @jsx React.DOM
 */

var React = require('react');
var Url = require('./url')

var Attribute = React.createClass({
    render: function() {
        return <Url params={this.props.params}/>;
    }
});

module.exports = Attribute;