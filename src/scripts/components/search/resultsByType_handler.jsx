/**
 * @jsx React.DOM
 */

var React = require('react');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var SearchActions = require('../../actions/SearchActions');
var SearchDispatcher = require('../../dispatchers/SearchDispatcher');
var Result = require('./result.jsx');

var AssetViewHandler = React.createClass({
    mixins:[AuthenticatedRouteMixin],

    displayName: 'Search Results',

    componentWillMount: function() {
        this.dispatcher = SearchDispatcher;
        this.actions = new SearchActions(this.dispatcher);
    },

    render: function() {
        return <Result actions={this.actions} dispatcher={this.dispatcher} byType={true} />
    }
});
module.exports = AssetViewHandler;
