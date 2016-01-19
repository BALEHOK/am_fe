/**
 * @jsx React.DOM
 */

var React = require('react');

var Attribute = React.createClass({
    render: function() {
        var params = this.props.params;
        var value = this.props.params.value;
        if(value.length > 40) {
            value = value.slice(0, 30) + "..." + value.slice(-7);
        }
        var url = this.props.params.url || this.props.params.value;
        return (
            <div className="asset-data__param" data-param-id={params.id}>
                <span className="asset-data__param-title">{params.name}:</span>
                <span className="asset-data__param-content">
                    <a href={url} target="_blank">{value}</a>
                </span>
            </div>
        );
    }
});

module.exports = Attribute;
