/**
 * @jsx React.DOM
 */

var React = require('react');

var Layout = require('./components/common/layout');
var SearchPage = require('./components/search/searchPage');

React.renderComponent(
    <Layout>
        <SearchPage />
    </Layout>,
    document.querySelector('.page-container'));
