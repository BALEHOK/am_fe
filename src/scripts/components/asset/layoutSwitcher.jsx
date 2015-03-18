/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../common/react-selectize');

var LayoutSwitcher = React.createClass({

    onScreenChange: function(val) {
        var screen = this.props.screens.filter((el) => 
            { return el.id === val[0].id })[0];
        this.props.onChange(screen);
    },

    render: function() {
        var screens = this.props.screens.map((el) => {
            return {name: el.name, id: el.id};
        });
        var value = this.props.selectedScreen 
            ? screens.filter((el) => 
                { return el.id === this.props.selectedScreen.id })[0].id
            : undefined;
    	return _.size(screens) > 1
        		? <ReactSelectize
                    items={screens}
                    value={value}
                    onChange={this.onScreenChange}
                    selectId="select-screen"
                    placeholder="Screen:"
                    label=" "
                    className="select_width_full" />
                : false
    }
});
module.exports = LayoutSwitcher;
