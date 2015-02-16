/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link

var Attribute = React.createClass({
    mixins: [Router.State, Router.Navigation],
    render: function() {
        var params = this.getParams();
        var relHref = this.makeHref('type-search', { assetTypeUid: params.assetTypeUid });
        var rel = this.props.params;                
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{rel.name}:</span>
                <strong>
                    {rel.value}
                </strong> | <a href={relHref}>Related items</a>
            </div>
        );
    }
});

module.exports = Attribute;