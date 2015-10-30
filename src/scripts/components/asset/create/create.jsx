var React = require('react');
var FixedDataTable = require('fixed-data-table');
var Flux = require('delorean').Flux;
var Router = require('react-router');
var moment = require('moment');
var Loader = require('../../common/loader.jsx');
var LoaderMixin = require('../../../mixins/LoaderMixin');
var AssetTypeRow = require('./assetTypeRow');

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var Create = React.createClass({
    mixins:[Flux.mixins.storeListener, LoaderMixin],

    watchStores: ['list'],

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            gridMaxHeight: 600
        };
    },

    componentWillMount: function() {
        this.waitFor(this.props.actions.loadAssetTypes());
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (prevState.loading && !this.state.loading) {
            let gridNode = React.findDOMNode(this.refs.grid);
            this.setState({
                gridMaxHeight:  window.innerHeight - gridNode.getBoundingClientRect().top - 60
            });
        }
    },

    onRowClick: function(event, rowIndex) {
        let id = this.state.stores.list.assettypes.activeTypes[rowIndex].id
        this.context.router.transitionTo(
            'asset-create-from-type',
            {assetTypeId : id}
        );
    },

    rowGetter(rowIndex) {
        return this.state.stores.list.assettypes.activeTypes[rowIndex];
    },

    renderDateCell(cellData) {
        var date = moment(cellData);
        return date.format("DD.MM.YYYY");
    },

    render: function() {
        var assettypes = this.state.stores.list.assettypes;
        return (
            <Loader loading={this.state.loading}>
                <div>
                    <h1 className="page-title"><span className="icon icon_create"></span>New Asset</h1>
                    <h2>Please select an asset type</h2>
                    <div className="grid asset-create" ref="grid">
                        <div className="grid__item ten-twelfths">
                            {assettypes && assettypes.activeTypes && assettypes.activeTypes.length > 0
                                ? <Table
                                    rowHeight={50}
                                    rowGetter={this.rowGetter}
                                    rowsCount={assettypes.activeTypes.length}
                                    width={1200}
                                    maxHeight={this.state.gridMaxHeight}
                                    headerHeight={50}
                                    onRowClick={this.onRowClick}
                                  >
                                        <Column
                                            label="Name"
                                            width={300}
                                            dataKey="displayName"
                                        />
                                        <Column
                                            label="Description"
                                            width={600}
                                            dataKey="description"
                                        />
                                        <Column
                                            label="Revision"
                                            width={120}
                                            dataKey="revision"
                                        />
                                        <Column
                                            cellRenderer={this.renderDateCell}
                                            label="Date"
                                            width={180}
                                            dataKey="updateDate"
                                        />
                                    </Table>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </Loader>
        );
    }
});

module.exports = Create;
