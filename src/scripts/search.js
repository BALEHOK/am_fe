var React = require('react');
// Require the appropriate top level component

var UserInfo = require('./components/common/userInfo');
var SearchForm = require('./components/search/searchForm');

React.renderComponent(UserInfo(null), document.getElementById('user-info'));
React.renderComponent(SearchForm(null), document.getElementById('search-form'));
