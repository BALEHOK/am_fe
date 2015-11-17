/**
 * @jsx React.DOM
 */

var React = require('react');
var linkFactory = require('./assetLinkFactory');

var Attribute = React.createClass({
    render: function() {
        var params = this.props.params;
        var assets = params.value || [];
        return (
            <div className="asset-data__param" data-param-id={params.id}>
                <span className="asset-data__param-title">{params.name}:</span>
                <span className="asset-data__param-content">
                    {assets.map(asset => {
                        var assetLink = linkFactory.getDisplayValue(params.relatedAssetTypeId, asset.id, asset.name);
                        return <div>{assetLink}</div>;
                    })}
                </span>
            </div>
        );
    }
});

module.exports = Attribute;
