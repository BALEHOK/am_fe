/**
 * @jsx React.DOM
 */

var React = require('react');
var DatTimePicker = require('react-bootstrap-datetimepicker');
var Input = require('react-bootstrap').Input;
var BooleanAttribute = React.createClass({
    render: function() {
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <Input 
                    type="text"
                    value={this.state.value}
                    ref="input"
                    bsStyle={this.validationState()}/>
            </li>
        );
    }
});

module.exports = BooleanAttribute;