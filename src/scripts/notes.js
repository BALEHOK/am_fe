var React = require('react');
// Require the appropriate top level component


var Page = require('./components/notes/page');
var mountPoint = document.querySelector('body');

React.renderComponent( Page(null) , mountPoint );
