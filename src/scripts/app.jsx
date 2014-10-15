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

var session = new Session();
var router = new Router(session);
var application = new Application(session);

application.start(function() {
    React.renderComponent(
        <Layout model={session}>
            <InterfaceComponent router={router} session={session} />
        </Layout>, 
        document.querySelector('.page-container'));
});