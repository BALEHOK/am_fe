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
  },

  getEditAttribute: function(name, params, actions) {
    var Component;
    if (name == 'asset') {
        Component = require("./attributes/edit/assetPicker.jsx"); 
    } else if (name == 'assets') {
        Component = require("./attributes/edit/assetPicker.jsx");
        //return <AssetPicker key={attribute.uid} attribute={attribute} isMultiple={true} />                        
    } else if (name == 'dynlist') {
        Component = require("./attributes/edit/listPicker.jsx");
    } else if (name == 'dynlists') {
        Component = require("./attributes/edit/listPicker.jsx");
        //return <ListAttribute key={attribute.uid} attribute={attribute} isMultiple={true} />
    } else if (name == 'bool' || name == 'text' || name == 'datetime') {
        Component = require("./attributes/edit/" + name + ".jsx");                       
    } else if (name == 'revision') {
        Component = require("./attributes/view/" + name + ".jsx");
    } else {
        Component = require("./attributes/edit/string.jsx");
    } 
    return <Component params={params} actions={actions} />;
  }

};

module.exports = AttributesFactory;