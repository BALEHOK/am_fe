/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../common/react-selectize');
var AssetViewType1 = require('./view_types/type1/view');
var AssetViewType2 = require('./view_types/type2/view');
var AssetViewType3 = require('./view_types/type3/view');

var views = {
    1: AssetViewType1,
    2: AssetViewType2,
    3: AssetViewType3
};

var LayoutSwitcher = React.createClass({

    getInitialState: function() {
        return {
            selectedScreen: undefined
        };
    },

    componentWillReceiveProps: function(nextProps) {
        var defaultScreen = _
            .chain(nextProps.screens)
            .findWhere({isDefault: true})
            .value();
        this.setState({
          selectedScreen: defaultScreen && defaultScreen.id
        });
    },

    onScreenChange: function(val) {
        this.setState({
            selectedScreen: val[0].id
        });
    },

    render: function() {
        var screens = this.props.screens.map(function(el) {
            return {name: el.name, id: el.id};
        });
        
        //var screen = this.props.screens.filter(function(el) { return el.id === selected })[0];
        //var viewComponent = screen && views[screen.layoutType] || views[1];

        //console.log(viewComponent)
        
    	return (
    		<ReactSelectize
                items={screens}
                value={this.state.selectedScreen}
                onChange={this.onScreenChange}
                selectId="select-screen"
                placeholder="Screen:"
                label=" "
                className="select_width_full" />
    	);
    }
});
module.exports = LayoutSwitcher;
