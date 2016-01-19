var React = require('react');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var ContactPage = require('./contactPage.jsx');
var ContactDispatcher = require('../../dispatchers/ContactDispatcher');
var ContactActions = require('../../actions/ContactActions');

var ContactHandler = React.createClass({
    mixins:[AuthenticatedRouteMixin],

    displayName: 'Contact',

    componentWillMount: function() {
        this.dispatcher = ContactDispatcher;
        this.actions = new ContactActions(ContactDispatcher);
    },

    render: function() {
        return (
            <ContactPage actions={this.actions} dispatcher={this.dispatcher}/>
        )
    }
});

module.exports = ContactHandler;
