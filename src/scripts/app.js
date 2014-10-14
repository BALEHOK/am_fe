//var Session = require('./models/Session').SessionModel;
//var UserModel = require('./models/User.ts').UserModel;
//Session.getAuth(function (response) {
//    var router = new Router();
//    Backbone.history.start();
//});
var React = require('react');

var Application = require('./models/Application').Application;
var SearchPage = require('./components/search/main.jsx');

var application = new Application();
var pageView = new SearchPage({ model: application });

React.renderComponent(pageView, document.querySelector('.page-container'));
