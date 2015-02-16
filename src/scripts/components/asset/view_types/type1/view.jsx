/**
 * @jsx React.DOM
 */

var React = require('react');
var Panel = require('./panel');
// var Router = require('react-router');
// var Link = Router.Link;

var AssetViewType1 = React.createClass({
    render: function() {
        var panels = this.props.screen.panels.map(function(el) {
            return <Panel data={el} title={el.name}/>
        });

        // var linkedAssets = this.props.linkedAssets.filter(function(e) { return e.assets != null }).map((entity) => {
        //     var links = entity.assets.map(function(asset){
        //         return <Link className="nav-block__item-related"
        //                      to="asset-view"
        //                      params={{assetTypeUid: asset.assetTypeId, assetUid: asset.assetId}}>
        //                     {asset.name}
        //                 </Link>
        //     });
        //     return <div><span>{entity.name}: </span>{links}</div>;
        // });

        return (
            <div>
                {panels}
            </div>
        );
    }
});
module.exports = AssetViewType1;
