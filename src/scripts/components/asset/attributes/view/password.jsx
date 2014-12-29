/**
 * @jsx React.DOM
 */

var React = require('react');

var Attribute = React.createClass({
    render: function() {
        return <div className="asset-data__param">
            <span className="asset-data__param-title">{this.props.params.name}:</span>
            <span className="no-data">No data</span>
        </div>
    }
});

module.exports = Attribute;