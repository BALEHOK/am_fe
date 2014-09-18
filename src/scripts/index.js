var React = require('react'),
// Require the appropriate top level component
  Page = require('./components/index/page'),
  mountPoint = document.querySelector('body');

require('../styles/ie/ie-lt-10.styl');
require('../styles/styles.styl');

React.renderComponent( Page(null) , mountPoint );

