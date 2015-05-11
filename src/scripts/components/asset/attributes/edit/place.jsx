/**
 * @jsx React.DOM
 */

var React = require('react');
var List = require('./list');

var EditableAttribute = React.createClass({

    render: function() {
        return (<List
            params={this.props.params}
            name="places"
            actions={this.props.actions}
            mapper={(el) => ({id: el.id, name: el.name})}
            dispatcher={this.props.dispatcher} />);
    }
});

module.exports = EditableAttribute;
