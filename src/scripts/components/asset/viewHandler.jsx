/**
 * @jsx React.DOM
 */

var React = require('react');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var AssetActions = require('../../actions/AssetActions');
var AssetDispatcher = require('../../dispatchers/AssetDispatcher');
var View = require('./view');

var AssetViewHandler = React.createClass({
    mixins:[AuthenticatedRouteMixin],

    displayName: 'View asset',

    componentWillMount: function() {
        this.dispatcher = AssetDispatcher;
        this.actions = new AssetActions(this.dispatcher);
    },

    render: function() {
        return <View actions={this.actions} dispatcher={this.dispatcher} {...this.props} />
    }
});
module.exports = AssetViewHandler;
