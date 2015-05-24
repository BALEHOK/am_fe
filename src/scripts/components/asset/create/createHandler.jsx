/**
 * @jsx React.DOM
 */

var React = require('react');
var AuthenticatedRouteMixin = require('../../../mixins/AuthenticatedRouteMixin');
var AssetActions = require('../../../actions/AssetActions');
var AssetDispatcher = require('../../../dispatchers/AssetDispatcher');
var Create = require('./create');

var AssetCreateHandler = React.createClass({
    mixins:[AuthenticatedRouteMixin],

    displayName: 'Create asset',

    componentWillMount: function() {
        this.dispatcher = AssetDispatcher;
        this.actions = new AssetActions(this.dispatcher);
    },

    render: function() {
        return <Create actions={this.actions} dispatcher={this.dispatcher} {...this.props} />
    }
});
module.exports = AssetCreateHandler;
