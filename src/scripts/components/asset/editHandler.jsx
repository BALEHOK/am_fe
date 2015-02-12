/**
 * @jsx React.DOM
 */

var React = require('react');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var AssetActions = require('../../actions/AssetActions');
var AssetDispatcher = require('../../dispatchers/AssetDispatcher');
var Edit = require('./edit');

var AssetEditHandler = React.createClass({
    mixins:[AuthenticatedRouteMixin],

    componentWillMount: function() {
        this.dispatcher = AssetDispatcher;
        this.actions = new AssetActions(this.dispatcher);
    },

    render: function() {
        return <Edit actions={this.actions} dispatcher={this.dispatcher} />
    }
});
module.exports = AssetEditHandler;
