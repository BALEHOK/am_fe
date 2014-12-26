/**
 * @jsx React.DOM
 */

var React = require('react');
var TextAttribute = React.createClass({
	getInitialState: function() { 
		return { isChecked: this.props.attribute.value ? true : false }; 
	},
    valueChanged: function(event) {
    	this.props.attribute.value = event.target.value;        
    },
    render: function() {
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <textarea onChange={this.valueChanged} defaultValue={this.props.attribute.value} />
            </li>
        );
    }
});

module.exports = TextAttribute;