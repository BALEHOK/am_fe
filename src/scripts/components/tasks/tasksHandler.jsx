import React from 'react/addons'
import reactMixin from 'react-mixin'
import AuthenticatedRouteMixin from '../../mixins/AuthenticatedRouteMixin'
import Tasks from './tasks'
import TaskActions from '../../actions/TaskActions'
import TaskDispatcher from '../../dispatchers/TaskDispatcher'
import NotificationsActions from '../../actions/NotificationsActions'
import NotificationsDispatcher from '../../dispatchers/NotificationsDispatcher'

@reactMixin.decorate(AuthenticatedRouteMixin)
export default class TasksHandler extends React.Component {

    constructor(){
        super();
        this.dispatcher = TaskDispatcher;
        this.actions = new TaskActions(this.dispatcher);
        this.notifications = new NotificationsActions(NotificationsDispatcher);
    }

    render() {
        return (
                <Tasks
                    actions={this.actions}
                    dispatcher={this.dispatcher}
                    notifications={this.notifications}
                    {...this.props}
                />
            );
    }
}

TasksHandler.displayName = "Tasks"
