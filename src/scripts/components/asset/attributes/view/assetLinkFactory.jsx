/**
 * @jsx React.DOM
 */

var Router = require('react-router');
var Link = Router.Link;

var AssetLinkFactory = {
    getDisplayValue: function (relatedAssetTypeId, assetId, assetName) {
        if (assetId) {
            //var relHref = this.context.router.makeHref('type-search',
            //    { assetTypeId: params.relatedAssetTypeId });
            var assetHref = {
                assetTypeId: relatedAssetTypeId,
                assetId: assetId
            };
            return (
                <span>
                    <strong>
                        <Link to="asset-view" params={assetHref}>{assetName}</Link>
                    </strong>{/* | <a href={relHref}>Related items</a>*/}
                </span>
            );
        } else {
            return '';
        }
    }
};

module.exports = AssetLinkFactory;
