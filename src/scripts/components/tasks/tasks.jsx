var React = require('react');
var Flux = require('delorean').Flux;
var FixedDataTable = require('fixed-data-table');
var Loader = require('../common/loader.jsx');
var LoaderMixin = require('../../mixins/LoaderMixin');
var TaskRepository = require('../../services/TaskRepository');

var DataGrid = require('../common/grid');

var Column = FixedDataTable.Column;

var Tasks = React.createClass({

    mixins: [LoaderMixin, Flux.mixins.storeListener],

    watchStores: ['tasks'],

    componentWillMount: function() {
        this.taskRepo = new TaskRepository();
    },

    componentDidMount: function() {
        this.waitFor(this.props.actions.loadTasksList());
    },

    componentWillUpdate: function(nextProps, nextState) {
        if (!_.isEqual(this.state.stores.tasks.response, nextState.stores.tasks.response) && nextState.stores.tasks.response.status) {
            let response = nextState.stores.tasks.response;
            let params = {
                type: '',
                msg: ''
            };
            switch (response.status) {
                case 'ERROR':
                    params.type = 'error';
                    params.msg = 'Job "' + response.taskName +'" failed. \n' + response.errors.join(' ');
                    break;
                case 'SUCCESS':
                    params.type = 'success';
                    params.msg = 'Job "' + response.taskName +'" completed';
                    break;
            }
            this.props.notifications.show(params);
            if(response.shouldRedirectOnComplete) {
                this.taskRepo.redirectOnComlete(response.taskFunctionType, response.result);
            }
            this.props.actions.clearTaskResponse();
        }
    },

    renderNameCell(cellData) {
        return <span className="link">{cellData}</span>
    },

    renderLinkCell(cellData) {
        return <span className="link"><span className="icon icon_chevron-right"></span></span>
    },

    onRowClick: function(event, rowIndex, data) {
        this.props.actions.executeTask(data.id);
    },

    render: function() {
        return (
                <Loader loading={this.state.loading}>
                    <div>
                        <h1 className="page-title">Tasks</h1>
                        {<DataGrid
                            source={this.state.stores.tasks.tasks}
                            onRowClick={this.onRowClick}
                            rowHeight={50}
                            maxHeight={600}
                            headerHeight={50}
                            filtering={true}
                            filterFields={[
                                {dataKey: 'name', label: 'Name', width: 0.6},
                                {dataKey: 'dynEntityConfigName', label: 'Asset', width: 0.35},
                            ]}
                          >
                            <Column
                                label="Name"
                                width={0.6}
                                dataKey="name"
                                cellRenderer={this.renderNameCell}
                            />
                            <Column
                                label="Asset"
                                width={0.35}
                                dataKey="dynEntityConfigName"
                            />
                            <Column
                                label=" "
                                width={0.05}
                                dataKey="id"
                                cellRenderer={this.renderLinkCell}
                            />
                          </DataGrid>}
                    </div>
                </Loader>
            );
    }
});

module.exports = Tasks;
