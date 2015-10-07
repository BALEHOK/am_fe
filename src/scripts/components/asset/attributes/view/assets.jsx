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
                {assets.map(asset => {
                    var assetLink = linkFactory.getDisplayValue(params.relatedAssetTypeId, asset.id, asset.name);
                    return <div>{assetLink}</div>;
                })}
            </div>
        );
    }
});

module.exports = Attribute;
