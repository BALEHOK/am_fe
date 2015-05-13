/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Attribute = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
        var params = this.props.params;
        var getDisplayValue = () => {            
            if (params.value.id) {
                //var relHref = this.context.router.makeHref('type-search', 
                //    { assetTypeId: params.relatedAssetTypeId });
                var assetHref = { 
                    assetTypeId: params.relatedAssetTypeId, 
                    assetId: params.value.id 
                }; 
                return (
                    <span>
                        <strong>
                            <Link to="asset-view" params={assetHref}>{params.value.name}</Link>
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