/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../common/react-selectize');

var LayoutSwitcher = React.createClass({

    onScreenChange: function(val) {
        var screenIndex = _.chain(this.props.screens)
          .findIndex({id: val[0].id})
          .value();
        this.props.onChange(screenIndex);
    },

    render: function() {
        var screens = this.props.screens.map((el) => {
            return {name: el.name, id: el.id};
        });
        var value;
        this.props.selectedScreen &&
          screens
            .filter(el => el.id === this.props.selectedScreen.id)
            .forEach(el => value = el.id);
        return _.size(screens) > 1
            ? <nav className="nav-block">
                  <ReactSelectize
                      items={screens}
                      value={value}
                      onChange={this.onScreenChange}
                      selectId="select-screen"
                      placeholder="Screen:"
                      label=" "
                      className="select_width_full"
                      clearable={false}
                      searchable={false} />
              </nav>
            : false
    }
});
module.exports = LayoutSwitcher;
