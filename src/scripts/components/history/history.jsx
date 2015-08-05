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
var LoaderMixin = require('../../mixins/LoaderMixin');

var AssetHistoryLayout = React.createClass({

    mixins:[Router.State, Flux.mixins.storeListener, LoaderMixin],

    watchStores: ['asset', 'history'],

    contextTypes: {
        router: React.PropTypes.func
    },

    componentDidMount() {
        var params = this.context.router.getCurrentParams();
        var hp = this.props.actions.loadHistory(params);
        var ap = this.props.actions.loadAsset(params);
        this.waitFor(hp, ap);
    },

    render() {
        var params = this.context.router.getCurrentParams();
        var history = this.state.stores.history;
        var asset = this.state.stores.asset.asset;

        var rows = history.revisions.map((el) => <RevisionRow revision={el} />)
        return (
            <div>
                <h1 className="page-title"><span className="icon icon_history"></span>Asset history - <span className="page-title__param">{asset.name}</span></h1>
                <Loader loading={this.state.loading}>
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
