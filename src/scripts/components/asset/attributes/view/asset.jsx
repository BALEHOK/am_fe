/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');

var Attribute = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
        var params = this.context.router.getCurrentParams();
        var relHref = this.context.router.makeHref('type-search', { assetTypeId: params.assetTypeId });
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