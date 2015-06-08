/**
 * @jsx React.DOM
 */

var React = require('react');
var linkFactory = require('./assetLinkFactory');

var Attribute = React.createClass({
    render: function() {
        var assets = this.props.params.value || [];
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                {assets.map(asset => {
                    var shallow = _.clone(this.props.params, true);
                    var params = _.extend(shallow, { value : {
                        id: asset.id,
                        name: asset.name
                    } });
                    return linkFactory.getDisplayValue(params);
                })}
            </div>
        );
    }
});

module.exports = Attribute;
