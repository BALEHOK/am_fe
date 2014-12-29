/**
 * @jsx React.DOM
 */

var React = require('react');

var AttributesFactory = {

  getViewAttribute: function(name, params) {
    var Component;
    if(!params.value) {
        Component = require('./attributes/view/nodata');
    } else {
        Component = require("./attributes/view/" + name + ".jsx");
    }
    return <Component params={params}/>;
  }

};

module.exports = AttributesFactory;