/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Flux = require('delorean').Flux;
var Link = Router.Link;
var TaxonomyPath = require('../asset/taxonomyPath.jsx');
var RevisionRow = require('./revisionRow.jsx');
var Loader = require('../common/loader.jsx');

var AssetHistoryLayout = React.createClass({

    mixins:[Router.State, Flux.mixins.storeListener],

    componentDidMount() {
        var params = this.getParams();
        this.props.actions.loadHistory(params);
        this.props.actions.loadAsset(params);
    },

    render() {
        var params = this.getParams();
        var history = this.state.stores.history.value;
        var asset = this.state.stores.asset.asset;
        var hloading = this.state.stores.history.loading;
        var aloading = this.state.stores.asset.loading;

        var rows = history.revisions.map((el) => <RevisionRow revision={el} />)
        return (
            <div>
                <h1 className="page-title"><span className="icon icon_history"></span>Asset history - <span className="page-title__param">{asset.name}</span></h1>
                <Loader loading={hloading || aloading}>
                    <div className="grid">
                        <div className="grid__item two-twelfths">
                            <Link className="back-btn"
                                to="asset-view"
                                params={{assetTypeId: params.assetTypeId, assetId: params.assetId}}>
                                <span className="icon icon_arrow-c_right"></span>Current revision
                            </Link>
                            <TaxonomyPath assetTypeId={params.assetTypeId} actions={this.props.actions} />
                        </div>
                        <div className="grid__item ten-twelfths">
                            <table className="table">
                                <tr>
                                    <th width="11%">Revision</th>
                                    <th width="15%">Update</th>
                                    <th width="14%">Field</th>
                                    <th width="27%">Revision Value</th>
                                    <th width="27%">Old Value</th>
                                    <th width="6%"><span className="small">Action</span></th>
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

module.exports = AssetHistoryLayout;
