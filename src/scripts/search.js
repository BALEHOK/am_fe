var React = require('react');
// Require the appropriate top level component

var Page = require('./components/search/searchForm');
var mountPoint = document.getElementById('search-form');

React.renderComponent(Page(null), mountPoint);
