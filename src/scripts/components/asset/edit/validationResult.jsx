/**
 * @jsx React.DOM
 */

var React = require('react');
var Flux = require('delorean').Flux;

var ValidationResult = React.createClass({
    render: function() {
        var messages = this.props.validation.map((item) => {
            return <li key={item.id}>{item.message}</li>;
        });
        return (
            <ul className="validation-summary">{messages}</ul> 
        );
    }
});

module.exports = ValidationResult;