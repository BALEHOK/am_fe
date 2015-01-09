/**
 * @jsx React.DOM
 */

var React = require('react');

var Attribute = React.createClass({
    render: function() {
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                $ {parseFloat(this.props.params.value).toFixed(2)}
            </div>
        );
    }
});

module.exports = Attribute;