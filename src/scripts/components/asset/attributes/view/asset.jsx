/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link

var Attribute = React.createClass({
    render: function() {
        var rel = this.props.params;                
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{rel.name}:</span>
                <strong>
                    {rel.value}
                </strong> |  Related items
            </div>
        );
    }
});

module.exports = Attribute;