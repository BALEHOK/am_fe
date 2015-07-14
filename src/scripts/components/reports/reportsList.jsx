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
                        <h1>Reports list</h1>
                        {this.state.stores.report.reports.map(r => {
                            console.log(r)
                            return <span />;
                        })}
                    </div>
                </Loader>
            );
    }
});

module.exports = ReportsList;
