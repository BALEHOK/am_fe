/**
 * @jsx React.DOM
 */

var React = require('react');

var Layout = require('./components/common/layout');
var SearchPage = require('./components/search/searchPage');

var UserModule = require('./models/userModel.ts');
var user = new UserModule.UserModel();

React.renderComponent(
    <Layout user={user}>
        <SearchPage />
    </Layout>,
    document.querySelector('.page-container'));
