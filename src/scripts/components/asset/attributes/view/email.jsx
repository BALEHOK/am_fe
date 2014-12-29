/**
 * @jsx React.DOM
 */

var React = require('react');

var Attribute = React.createClass({
    render: function() {
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <a href={"mailto:" + this.props.params.value}>{this.props.params.value}</a>
            </div>
        );
    }
});

module.exports = Attribute;