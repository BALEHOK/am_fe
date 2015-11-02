var React = require('react');
var FixedDataTable = require('fixed-data-table');
var Flux = require('delorean').Flux;
var Router = require('react-router');
var moment = require('moment');
var Loader = require('../../common/loader.jsx');
var LoaderMixin = require('../../../mixins/LoaderMixin');

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
            gridMaxHeight: 600,
            gridMaxWidth: 1200,
        };
    },

    componentWillMount: function() {
        this.waitFor(this.props.actions.loadAssetTypes());
    },

    componentDidMount: function() {
        window.addEventListener("resize", this.onResize);
        this.setState({
            gridMaxWidth: document.querySelector('.container').offsetWidth
        });
    },
    componentWillUnmount: function() {
        window.removeEventListener("resize", this.onResize);
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (prevState.loading && !this.state.loading) {
            let gridNode = React.findDOMNode(this.refs.grid);
            this.setState({
                gridMaxHeight:  window.innerHeight - gridNode.getBoundingClientRect().top - 60
            });
        }
    },

    onResize: function() {
		let gridNode = React.findDOMNode(this.refs.grid);
		this.setState({
            gridMaxHeight:  window.innerHeight - gridNode.getBoundingClientRect().top - 60,
            gridMaxWidth: document.querySelector('.container').offsetWidth
		});
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
                    <div className="grid asset-create" ref="grid">
                        <div className="grid__item one-whole" ref="gridContainer">
                            {assettypes && assettypes.activeTypes && assettypes.activeTypes.length > 0
                                ? <Table
                                    rowHeight={50}
                                    rowGetter={this.rowGetter}
                                    rowsCount={assettypes.activeTypes.length}
                                    width={this.state.gridMaxWidth}
                                    maxHeight={this.state.gridMaxHeight}
                                    headerHeight={50}
                                    onRowClick={this.onRowClick}
                                  >
                                        <Column
                                            cellRenderer={this.renderNameCell}
                                            label="Name"
                                            width={this.state.gridMaxWidth*0.25}
                                            dataKey="displayName"
                                        />
                                        <Column
                                            label="Description"
                                            width={this.state.gridMaxWidth*0.45}
                                            dataKey="description"
                                        />
                                        <Column
                                            label="Revision"
                                            width={this.state.gridMaxWidth*0.12}
                                            dataKey="revision"
                                        />
                                        <Column
                                            cellRenderer={this.renderDateCell}
                                            label="Date"
                                            width={this.state.gridMaxWidth*0.13}
                                            dataKey="updateDate"
                                        />
                                        <Column
                                            cellRenderer={this.renderLinkCell}
                                            label=" "
                                            width={this.state.gridMaxWidth*0.05}
                                            dataKey="id"
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
