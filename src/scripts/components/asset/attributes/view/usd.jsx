/**
 * @jsx React.DOM
 */

var React = require('react');

var Attribute = React.createClass({
    render: function() {
        var params = this.props.params;
        return (
            <div className="asset-data__param" data-param-id={params.id}>
                <span className="asset-data__param-title">{params.name}:</span>
                <span className="asset-data__param-content">
                    $ {parseFloat(params.value).toFixed(2)}
                </span>
            </div>
        );
    }
});

module.exports = Attribute;
