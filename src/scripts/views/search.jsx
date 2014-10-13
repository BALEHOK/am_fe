/**
 * @jsx React.DOM
 */

var React = require('react');

var Layout = require('./components/common/layout');
var SearchPage = require('./../components/search/searchPage');
var Session = require('./models/Session').SessionModel;

React.renderComponent(
    <Layout user={user}>
        <SearchPage />
    </Layout>,
    document.querySelector('.page-container'));
