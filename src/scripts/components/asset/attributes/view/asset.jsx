/**
 * @jsx React.DOM
 */

var React = require('react');
var linkFactory = require('./assetLinkFactory');

var Attribute = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
        var params = this.props.params;
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{params.name}:</span>
                {linkFactory.getDisplayValue(params)}
            </div>
        );
    }
});

module.exports = Attribute;
