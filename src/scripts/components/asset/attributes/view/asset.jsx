/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link

var Attribute = React.createClass({
    render: function() {
        var rel = this.props.params.relatedAsset;
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <strong>
                    <Link to="asset-view" params={{assetTypeUid: rel.assetTypeId, assetUid: rel.uid}}>{this.props.params.value}</Link>
                </strong> |  Related items
            </div>
        );
    }
});

module.exports = Attribute;