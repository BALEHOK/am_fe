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
    switch(name) {
        case 'asset':
        case 'assets':
            Component = require("./attributes/edit/assetPicker.jsx");
            break;
        case 'dynlist':
        case 'dynlists':
            Component = require("./attributes/edit/listPicker.jsx");
            break;
        case 'bool':
        case 'datetime':
            Component = require("./attributes/edit/" + name + ".jsx");
            break;
        default:
            Component = require("./attributes/edit/string.jsx");
    }
    return <Component dispatcher={dispatcher} params={params} actions={actions} validation={validation} />;
  }

};

module.exports = AttributesFactory;