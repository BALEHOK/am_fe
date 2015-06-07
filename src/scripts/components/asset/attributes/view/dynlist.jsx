/**
 * @jsx React.DOM
 */

var React = require('react');
var StringAttribute = require('./string');

var Attribute = React.createClass({
    render: function() {
        var params = {
            name: this.props.params.name,
            value: this.props.params.value
                ? this.props.params.value.value
                : ''
        };
        return <StringAttribute params={params}/>;
    }
});

module.exports = Attribute;
