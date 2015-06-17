/**
 * @jsx React.DOM
 */

var React = require('react');

var AttributesFactory = {

  getViewAttribute: function(name, params, dispatcher) {
    if (name == 'dynlists')
        return null;
    var Component;
    if(!params.value || _.isEmpty(params.value) || (_.has(params.value, 'id') && !params.value.id)) {
        Component = require('./attributes/view/nodata');
    } else {
        Component = require("./attributes/view/" + name + ".jsx");
    }
    return <Component dispatcher={dispatcher} params={params}/>;
  },

  getEditAttribute: function(name, params, actions, dispatcher, validation, selectedScreen) {
    var Component;
    switch(name) {
        case 'asset':
        case 'assets':
            if (params.editable)
                Component = require("./attributes/edit/assetPicker.jsx");
            else
                Component = require("./attributes/view/" + name + ".jsx");
            break;
        case 'dynlist':
            Component = require("./attributes/edit/listPicker.jsx");
            break;
        case 'dynlists':
            params = _.extend(params, {message: 'Dynlists datatype does not supported'})
            Component = require('./attributes/view/nodata');
        case 'file':
        case 'image':
        case 'bool':
        case 'password':
        case 'datetime':
        case 'currentdate':
        case 'richtext':
        case 'permission':
        case 'barcode':
        case 'role':
        case 'zipcode':
        case 'place':
        case 'document':
            Component = require("./attributes/edit/" + name + ".jsx");
            break;
        case 'usd':
        case 'euro':
            Component = require("./attributes/edit/typed_money.jsx");
            break;
        case 'googlemaps':
            Component = require("./attributes/edit/googlemaps.jsx");
            break;
        case 'revision':
            Component = require("./attributes/view/" + name + ".jsx");
            break;
        case 'email':
        case 'money':
        case 'url':
        case 'zipcode':
        default:
            Component = require("./attributes/edit/string.jsx");
    }
    return <Component dispatcher={dispatcher}
                      params={params}
                      actions={actions}
                      validation={validation}
                      selectedScreen={selectedScreen} />;
  }

};

module.exports = AttributesFactory;
