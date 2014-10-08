/**
 * @jsx React.DOM
 */

var React = require('react');

var Layout = require('./components/common/layout');
var SearchPage = require('./components/search/searchPage');

var model = require('./components/common/layoutModel.ts');

React.renderComponent(
    <Layout model={model}>
        <SearchPage />
    </Layout>,
    document.querySelector('.page-container'));
