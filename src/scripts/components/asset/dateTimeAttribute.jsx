/**
 * @jsx React.DOM
 */

var React = require('react');
var DatTimePicker = require('react-bootstrap-datetimepicker');
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
                    bsStyle={this.validationState()}
                    onChange={this.valueChanged} />
            </li>
        );
    }
});

module.exports = BooleanAttribute;