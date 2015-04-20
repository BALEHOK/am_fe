/**
 * @jsx React.DOM
 */

var React = require('react');

var ValidationResult = React.createClass({
    render: function() {
        return (
            <ul className="validation-summary">
            {this.props.validation.map((item) => {
            	return <li key={item.id}>{item.message}</li>;
        	})}
            </ul> 
        );
    }
});

module.exports = ValidationResult;