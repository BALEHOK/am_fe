/**
 * @jsx React.DOM
 */

var React = require('react');

var Attribute = React.createClass({
    render: function() {
        var message = _.has(this.props.params, 'message')
            ? this.props.params.message
            : 'No data';
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <span className="no-data">{message}</span>
            </div>
        );
    }
});

module.exports = Attribute;
