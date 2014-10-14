/**
 * @jsx React.DOM
 * This is our composition root: place where all components get tied together
 */

var React = require('react');
var Layout = require('./components/common/layout.jsx');
var InterfaceComponent = require('./components/common/InterfaceComponent.jsx');
var Router = require('./models/Router').Router;
var Session = require('./models/Session').SessionModel;
var Application = require('./models/Application').Application;

var sessionModel = new Session();
var router = new Router(sessionModel);
var application = new Application(sessionModel);

application.start(function() {
    React.renderComponent(
        <Layout user={application.currentUser}>
            <InterfaceComponent router={router} />
        </Layout>, 
        document.querySelector('.page-container'));
});