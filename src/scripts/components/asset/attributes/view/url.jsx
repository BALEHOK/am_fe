/**
 * @jsx React.DOM
 */

var React = require('react');

var Attribute = React.createClass({
    render: function() {
        var value = this.props.params.value;
        if(value.length > 40) {
            value = value.slice(0, 30) + "..." + value.slice(-7);
        }
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <a href={this.props.params.value} target="_blank">{value}</a>
            </div>
        );
    }
});

module.exports = Attribute;