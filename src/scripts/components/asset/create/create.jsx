/**
 * @jsx React.DOM
 */

var React = require('react');
var Flux = require('delorean').Flux;
var Router = require('react-router');
var Loader = require('../../common/loader.jsx');
var LoaderMixin = require('../../../mixins/LoaderMixin');
var AssetTypeRow = require('./assetTypeRow');

var Create = React.createClass({
    mixins:[Flux.mixins.storeListener, LoaderMixin],

    watchStores: ['list'],

    contextTypes: {
        router: React.PropTypes.func
    },

    componentWillMount: function() {
        this.waitFor(this.props.actions.loadAssetTypes());
    },

    onAssetTypeClick: function(assettype) {
        this.context.router.transitionTo(
            'asset-create-from-type',
            {assetTypeId : assettype.id});
    },

    render: function() {
        var rows = {};
        var assettypes = this.state.stores.list.assettypes;
        if (assettypes && assettypes.activeTypes && assettypes.activeTypes.length > 0)
         rows = assettypes.activeTypes.map(type => <AssetTypeRow type={type} onClick={this.onAssetTypeClick} />);
      return (
        <div>
                <h1 className="page-title"><span className="icon icon_create"></span>New Asset</h1>
                <h2>Please select an asset type</h2>
                <Loader loading={this.state.loading}>
                    <div className="grid asset-create">
                        <div className="grid__item ten-twelfths">
                            <table className="table">
                                <tr>
                                    <th width="25%">Name</th>
                                    <th width="45%">Description</th>
                                    <th width="12%">Revision</th>
                                    <th width="13%">Date</th>
                                    <th width="5%">&nbsp;</th>
                                </tr>
                                {rows}
                            </table>
                        </div>
                    </div>
                </Loader>
            </div>
      );
    }
});

module.exports = Create;
