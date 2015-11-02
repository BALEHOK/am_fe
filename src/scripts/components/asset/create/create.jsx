var React = require('react');
var Router = require('react-router');
var FixedDataTable = require('fixed-data-table');
var DataGrid = require('react-datagrid')
var Flux = require('delorean').Flux;
var Router = require('react-router');
var moment = require('moment');
var Loader = require('../../common/loader.jsx');
var LoaderMixin = require('../../../mixins/LoaderMixin');

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;
var Link = Router.Link;

var Create = React.createClass({
    mixins:[Flux.mixins.storeListener, LoaderMixin],

    watchStores: ['list'],

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            gridMaxHeight: 600,
            gridColumns: [
                {
                    name: 'displayName',
                    title: 'Name',
                    width: '25%',
                    render: function(value, data, cellProps) {
                        return <Link to="asset-create-from-type" params={{assetTypeId: data.id}}>{value}</Link>
                    },
                },
                {
                    name: 'description',
                    title: 'Description',
                    width: '45%',
                },
                {
                    name: 'revision',
                    title: 'Revision',
                    width: '12%',
                },
                {
                    name: 'updateDate',
                    title: 'Date',
                    width: '13%',
                    render: function(updateDate){
                        var date = moment(updateDate);
                        return date.format("DD.MM.YYYY");
                    }
                },
                {
                    name: 'link',
                    title: ' ',
                    width: '5%',
                    style: { textAlign: 'center' },
                    render: function(value, data, cellProps) {
                        return (
                            <Link to="asset-create-from-type" params={{assetTypeId: data.id}}>
                                <span className="icon icon_chevron-right"></span>
                            </Link>
                        )
                    },
                },
            ]
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

    render: function() {
        var assettypes = this.state.stores.list.assettypes;
        return (
            <div>
                <Loader loading={this.state.loading}>
                    <div>
                        <h1 className="page-title"><span className="icon icon_create"></span>New Asset</h1>
                        <h2>Please select an asset type</h2>
                    </div>
                </Loader>
                <div className="grid asset-create" ref="grid">
                    <div className="grid__item one-whole">
                        {assettypes && assettypes.activeTypes && assettypes.activeTypes.length > 0
                            ? <DataGrid
                                  idProperty="id"
                                  dataSource={assettypes.activeTypes}
                                  columns={this.state.gridColumns}
                                  style={{height: this.state.gridMaxHeight}}
                               />
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Create;
