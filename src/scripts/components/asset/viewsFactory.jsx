/**
 * @jsx React.DOM
 */

var React = require('react');
var AssetViewType1 = require('./view_types/type1/view');
var AssetViewType2 = require('./view_types/type2/view');
var AssetViewType3 = require('./view_types/type3/view');

var views = {
    1: AssetViewType1,
    2: AssetViewType2,
    3: AssetViewType3
};

var ViewsFactory = {

  	getViewComponent: function(selectedScreen) {
        var viewComponent = selectedScreen && views[selectedScreen.layoutType] || views[1];
        return viewComponent;
    },

};

module.exports = ViewsFactory;