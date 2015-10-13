/**
 * @jsx React.DOM
 */
var React = require('react');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var ContactForm = require('./contactForm.jsx');

var ContactHandler = React.createClass({
    mixins:[AuthenticatedRouteMixin],

    displayName: 'Contact',

    render: function() {
        return (
            <div>
                <h1 className="page-title">Contact us</h1>
                <p>If you have any questions, comments or suggestions please contact us</p>
                <ContactForm/>
            </div>
        )
    }
});

module.exports = ContactHandler;
