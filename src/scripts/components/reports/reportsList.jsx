var React = require('react');
var Loader = require('../common/loader.jsx');
var LoaderMixin = require('../../mixins/LoaderMixin');
var Flux = require('delorean').Flux;

var ReportsList = React.createClass({

    mixins: [LoaderMixin, Flux.mixins.storeListener],

    componentDidMount: function() {
        this.waitFor(this.props.actions.loadReports());
    },

    render: function() {
        return (
                <Loader loading={this.state.loading}>
                    <div>
                        <h1 className="page-title">Reports list</h1>
                        <table>
                            <tr>
                                <th width="80%"></th>
                                <th width="20%"></th>
                            </tr>
                            {this.state.stores.report.reports.map(r => {
                                var url = APIURL + '/customreports/' + r.id;
                                return <tr>
                                    <td><a target="_blank" href={url}>{r.name}</a></td>
                                    <td></td>
                                </tr>;
                            })}
                        </table>
                    </div>
                </Loader>
            );
    }
});

module.exports = ReportsList;
