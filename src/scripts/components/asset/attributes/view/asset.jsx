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
        var params = this.props.params;
        var getDisplayValue = () => {            
            if (params.value.id) {
                var relHref = this.context.router.makeHref('type-search', 
                    { assetTypeId: params.relatedAssetTypeId });
                var assetHref = this.context.router.makeHref('asset-view', 
                    { 
                        assetTypeId: params.relatedAssetTypeId, 
                        assetId: params.value.id 
                    }); 
                return (
                    <span>
                        <strong>
                            <a href={assetHref}>{params.value.name}</a>
                        </strong>{/* | <a href={relHref}>Related items</a>*/}
                    </span>
                );
            } else {
                return '';
            }
        };
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{params.name}:</span>
                {getDisplayValue()} 
            </div>
        );
    }
});

module.exports = Attribute;