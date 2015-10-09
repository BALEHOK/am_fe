import React from 'react/addons'
import reactMixin from 'react-mixin'
import AuthenticatedRouteMixin from '../../mixins/AuthenticatedRouteMixin'
import ReportsList from './reportsList'
import ReportActions from '../../actions/ReportActions'
import ReportDispatcher from '../../dispatchers/ReportDispatcher'

var ReportsHandler = React.createClass({
    mixins: [AuthenticatedRouteMixin],

    componentWillMount: function() {
        this.dispatcher = ReportDispatcher;
        this.actions = new ReportActions(this.dispatcher);
    },

    render: function() {
        return (
            <ReportsList actions={this.actions} dispatcher={this.dispatcher} />
        );
    }
});

export default ReportsHandler;