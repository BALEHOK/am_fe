var React = require('react');
var Flux = require('delorean').Flux;
var FixedDataTable = require('fixed-data-table');
var Loader = require('../common/loader.jsx');
var LoaderMixin = require('../../mixins/LoaderMixin');

var DataGrid = require('../common/grid');

var Column = FixedDataTable.Column;

var ReportsList = React.createClass({

    mixins: [LoaderMixin, Flux.mixins.storeListener],

    watchStores: ['report'],

    componentDidMount: function() {
        this.waitFor(this.props.actions.loadReports());
    },

    renderNameCell(cellData) {
        return <span className="link">{cellData}</span>
    },

    renderLinkCell(cellData) {
        return <span className="link"><span className="icon icon_chevron-right"></span></span>
    },

    renderFinancialCell(cellData) {
        return cellData ? 'Financial' : ''
    },

    onRowClick: function(event, rowIndex) {
        var id = this.state.stores.report.reports[rowIndex].id;
        var url = APIURL + '/customreports/index/' + id;
        var win = window.open(url, '_blank');
        win.focus();
    },

    render: function() {
        return (
                <Loader loading={this.state.loading}>
                    <div>
                        <h1 className="page-title">Reports list</h1>
                        <DataGrid
                            source={this.state.stores.report.reports}
                            onRowClick={this.onRowClick}
                            rowHeight={50}
                            maxHeight={600}
                            headerHeight={50}
                            filtering={true}
                            filterFields={[
                                {dataKey: 'name', label: 'Name', width: 0.4},
                                {dataKey: 'assetTypeName', label: 'Asset', width: 0.3},
                            ]}
                          >
                            <Column
                                label="Name"
                                width={0.4}
                                dataKey="name"
                                cellRenderer={this.renderNameCell}
                            />
                            <Column
                                label="Asset"
                                width={0.3}
                                dataKey="assetTypeName"
                            />
                            <Column
                                label="Financial"
                                width={0.25}
                                dataKey="isFinancial"
                                cellRenderer={this.renderFinancialCell}
                            />
                            <Column
                                label=" "
                                width={0.05}
                                dataKey="id"
                                cellRenderer={this.renderLinkCell}
                            />
                          </DataGrid>
                    </div>
                </Loader>
            );
    }
});

module.exports = ReportsList;
