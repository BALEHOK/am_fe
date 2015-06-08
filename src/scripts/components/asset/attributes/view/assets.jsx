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
            <div className="asset-data__param">
                <span className="asset-data__param-title">{params.name}:</span>
                {assets.map(asset => {
                    return linkFactory.getDisplayValue(
                        params.relatedAssetTypeId, asset.id, asset.name);
                })}
            </div>
        );
    }
});

module.exports = Attribute;
