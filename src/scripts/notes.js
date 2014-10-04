var React = require('react');

var Page = require('./components/notes/page');
var mountPoint = document.querySelector('#content');

React.renderComponent( Page(null) , mountPoint );
