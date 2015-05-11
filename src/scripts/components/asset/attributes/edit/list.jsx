/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../../../common/react-selectize');
var Flux = require('delorean').Flux;

var EditableAttribute = React.createClass({
    mixins: [Flux.mixins.storeListener],

    handleChange: function(e) {
        this.props.params.value = e.name;
        this.id = e.id;
    },

    getItems: function() {
        var items = this.state.stores.list[this.props.name][this.props.params.id];
        if(items) {
            return items.data.map(this.props.mapper);
        } else {
            return [{name: this.props.params.value, id: 0}];
        }
    },

    requestItems: function(query) {
        return this.props.actions.loadList({
          id: this.props.params.id,
          filter: query || this.props.params.value,
          name: this.props.name
        });
    },

    render: function() {
        return (
            <ReactSelectize
                  items={this.getItems()}
                  value={this.id}
                  onItemsRequest={this.requestItems}
                  onChange={this.handleChange}
                  selectId={this.props.name + "-" + this.props.params.id}
                  placeholder=" "
                  label=" "
            />
        );
    }
});

module.exports = EditableAttribute;
