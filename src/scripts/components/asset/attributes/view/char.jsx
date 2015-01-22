/**
 * @jsx React.DOM
 */

var React = require('react');

var Attribute = React.createClass({
    render: function() {
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                {this.props.params.value}
            </div>
        );
    }
});

module.exports = Attribute;