/**
 * @jsx React.DOM
 */
var React = require('react');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var FaqAssets = require('./faqAsets.jsx');
var FaqDispatcher = require('../../dispatchers/FaqDispatcher');
var FaqActions = require('../../actions/FaqActions');

var FaqHandler = React.createClass({
    mixins:[AuthenticatedRouteMixin],

    displayName: 'FAQ',

    componentWillMount: function() {
        this.dispatcher = FaqDispatcher;
        this.actions = new FaqActions(FaqDispatcher);
    },

    render: function() {
        return (
            <FaqAssets actions={this.actions} dispatcher={this.dispatcher}/>
        )
    }
});

module.exports = FaqHandler;
