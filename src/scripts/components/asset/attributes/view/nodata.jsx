/**
 * @jsx React.DOM
 */

var React = require('react');

var Attribute = React.createClass({
    render: function() {
        var message = _.has(this.props.params, 'message')
            ? this.props.params.message
            : 'No data';
        var params = this.props.params;
        return (
            <div className="asset-data__param" data-param-id={params.id}>
                <span className="asset-data__param-title">{params.name}:</span>
                <span className="no-data">{message}</span>
            </div>
        );
    }
});

module.exports = Attribute;
