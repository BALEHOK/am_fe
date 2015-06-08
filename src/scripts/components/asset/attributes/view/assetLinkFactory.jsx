/**
 * @jsx React.DOM
 */

var Router = require('react-router');
var Link = Router.Link;

var AssetLinkFactory = {
    getDisplayValue: function (params) {
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
    }
};

module.exports = AssetLinkFactory;
