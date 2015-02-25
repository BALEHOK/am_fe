/**
 * @jsx React.DOM
 */

var React = require('react');
var BooleanAttribute = React.createClass({
	getInitialState: function() { 
		return { isChecked: this.props.attribute.value ? true : false }; 
	},
    valueChanged: function(event) {
    	this.setState({isChecked: !this.state.isChecked});
        this.props.attribute.value = this.state.isChecked;
    },
    render: function() {
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <input type="checkbox" onChange={this.valueChanged} checked={this.state.isChecked} />
            </li>
        );
    }
});

module.exports = BooleanAttribute;