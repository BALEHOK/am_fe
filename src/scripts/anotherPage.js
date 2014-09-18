var React = require('react'),
// Require the appropriate top level component
  Page = require('./components/anotherPage/page'),
  mountPoint = document.querySelector('body');

React.renderComponent( Page(null) , mountPoint );
