/**
 * @jsx React.DOM
 */

var React = require('react');

var Layout = require('./components/common/layout');
var SearchPage = require('./components/search/searchPage');
var Session = require('./components/common/Session').SessionModel;
var UserModel = require('./models/userModel.ts').UserModel;
var user = new UserModel();
user.fetch();

Session.getAuth(function(response){
    var router = new Router();
    Backbone.history.start();
});

React.renderComponent(
    <Layout user={user}>
        <SearchPage />
    </Layout>,
    document.querySelector('.page-container'));
