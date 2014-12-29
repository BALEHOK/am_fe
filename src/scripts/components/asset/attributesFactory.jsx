/**
 * @jsx React.DOM
 */

var React = require('react');

var AttributesFactory = {

  getViewAttribute: function(name, params) {
    var Component = require("./attributes/view/" + name + ".jsx");
    return <Component params={params}/>
  }

};

module.exports = AttributesFactory;