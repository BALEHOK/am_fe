/**
 * @jsx React.DOM
 */

var React = require('react');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var AssetActions = require('../../actions/AssetActions');
var AssetDispatcher = require('../../dispatchers/AssetDispatcher');
var NotificationsActions = require('../../actions/NotificationsActions');
var NotificationsDispatcher = require('../../dispatchers/NotificationsDispatcher')
var View = require('./view');

var AssetViewHandler = React.createClass({
    mixins:[AuthenticatedRouteMixin],

    displayName: 'View asset',

    componentWillMount: function() {
        this.dispatcher = AssetDispatcher;
        this.actions = new AssetActions(this.dispatcher);
        this.notifications = new NotificationsActions(NotificationsDispatcher);
    },

    render: function() {
        return (
            <View
                actions={this.actions}
                dispatcher={this.dispatcher}
                notifications={this.notifications}
                {...this.props}
            />
        )
    }
});
module.exports = AssetViewHandler;
