/**
 * @jsx React.DOM
 */

var React = require('react');

var ValidationResult = React.createClass({
    render: function() {
    	var messages = _.chain(this.props.validation)
    		.values()
    		.pluck('message')
    		.uniq()
    		.value();
        return (
            <ul className="validation-summary">
            {messages.map((message, key) => {
            	return <li key={key}>{message}</li>;
        	})}
            </ul> 
        );
    }
});

module.exports = ValidationResult;