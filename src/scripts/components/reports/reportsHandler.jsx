import React from 'react/addons'
import reactMixin from 'react-mixin'
import AuthenticatedRouteMixin from '../../mixins/AuthenticatedRouteMixin'
import ReportsList from './reportsList'
import ReportActions from '../../actions/ReportActions'
import ReportDispatcher from '../../dispatchers/ReportDispatcher'

@reactMixin.decorate(AuthenticatedRouteMixin)
export default class ReportsHandler extends React.Component {

    constructor(){
        super();
        this.dispatcher = ReportDispatcher;
        this.actions = new ReportActions(this.dispatcher);
    }

    render() {
        return (
                <ReportsList actions={this.actions} dispatcher={this.dispatcher} />
            );
    }
}
