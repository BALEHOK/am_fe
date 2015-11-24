var React = require('react');
var FixedDataTable = require('fixed-data-table');
var Flux = require('delorean').Flux;
var Router = require('react-router');
var moment = require('moment');
var Loader = require('../../common/loader.jsx');
var LoaderMixin = require('../../../mixins/LoaderMixin');
var DataGrid = require('../../common/grid');

var Column = FixedDataTable.Column;

var Create = React.createClass({
    mixins:[Flux.mixins.storeListener, LoaderMixin],

    watchStores: ['list'],

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            gridMaxHeight: 600,
        };
    },

    componentWillMount: function() {
        this.waitFor(this.props.actions.loadAssetTypes());
    },

    onRowClick: function(event, rowIndex, data) {
        let id = data.id
        this.context.router.transitionTo(
            'asset-create-from-type',
            {assetTypeId : id}
        );
    },

    renderDateCell(cellData) {
        var date = moment(cellData);
        return date.format("DD.MM.YYYY");
    },

    renderLinkCell() {
        return <span className="link"><span className="icon icon_chevron-right"></span></span>
    },

    renderNameCell(cellData) {
        return <span className="link">{cellData}</span>
    },

    render: function() {
        var assettypes = this.state.stores.list.assettypes;
        return (
            <Loader loading={this.state.loading}>
                <div>
                    <h1 className="page-title"><span className="icon icon_create"></span>New Asset</h1>
                    <h2>Please select an asset type</h2>
                    <div className="grid asset-create">
                        <div className="grid__item one-whole">
                            {assettypes && assettypes.activeTypes && assettypes.activeTypes.length > 0
                                ? <DataGrid
                                    source={this.state.stores.list.assettypes.activeTypes}
                                    rowHeight={50}
                                    maxHeight={this.state.gridMaxHeight}
                                    headerHeight={50}
                                    onRowClick={this.onRowClick}
                                    filtering={true}
                                    filterFields={[
                                        {dataKey: 'displayName', label: 'Name', width: 0.25},
                                        {dataKey: 'description', label: 'Description', width: 0.45},
                                    ]}
                                  >
                                        <Column
                                            cellRenderer={this.renderNameCell}
                                            label="Name"
                                            width={0.25}
                                            dataKey="displayName"
                                        />
                                        <Column
                                            label="Description"
                                            width={0.45}
                                            dataKey="description"
                                        />
                                        <Column
                                            label="Revision"
                                            width={0.12}
                                            dataKey="revision"
                                        />
                                        <Column
                                            cellRenderer={this.renderDateCell}
                                            label="Date"
                                            width={0.13}
                                            dataKey="updateDate"
                                        />
                                        <Column
                                            cellRenderer={this.renderLinkCell}
                                            label=" "
                                            width={0.05}
                                            dataKey="id"
                                        />
                                </DataGrid>
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
