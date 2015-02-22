/**
 * @jsx React.DOM
 */

var React = require('react');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var AssetActions = require('../../actions/AssetActions');
var AssetDispatcher = require('../../dispatchers/AssetDispatcher');
var History = require('./history');

var HistoryHandler = React.createClass({
    mixins:[AuthenticatedRouteMixin],

    componentWillMount: function() {
        this.dispatcher = AssetDispatcher;
        this.actions = new AssetActions(this.dispatcher);
    },

    render: function() {
        return <History actions={this.actions} dispatcher={this.dispatcher} />
    }
});
module.exports = HistoryHandler;
