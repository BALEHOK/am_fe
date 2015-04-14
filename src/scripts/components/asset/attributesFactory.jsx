/**
 * @jsx React.DOM
 */

var React = require('react');

var AttributesFactory = {

  getViewAttribute: function(name, params, dispatcher) {
    var Component;
    if(!params.value) {
        Component = require('./attributes/view/nodata');
    } else {
        Component = require("./attributes/view/" + name + ".jsx");
    }
    return <Component dispatcher={dispatcher} params={params}/>;
  },

  getEditAttribute: function(name, params, actions, dispatcher, validation) {
    var Component;
    if (name == 'asset') {
        Component = require("./attributes/edit/assetPicker.jsx");
    } else if (name == 'assets') {
        Component = require("./attributes/edit/assetPicker.jsx");
    } else if (name == 'dynlist') {
        Component = require("./attributes/edit/listPicker.jsx");
    } else if (name == 'dynlists') {
        Component = require("./attributes/edit/listPicker.jsx");
    } else if (name == 'bool' || name == 'datetime') {
        Component = require("./attributes/edit/" + name + ".jsx");
    } else {
        Component = require("./attributes/edit/string.jsx");
    }
    return <Component dispatcher={dispatcher} params={params} actions={actions} validation={validation} />;
  }

};

module.exports = AttributesFactory;