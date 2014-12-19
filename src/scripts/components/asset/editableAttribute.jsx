/**
 * @jsx React.DOM
 */

var React = require('react');
var Input = require('react-bootstrap').Input;

var EditableAttribute = React.createClass({
    getInitialState: function() {
    return {
            value: this.props.attribute.value
        };
    },
    validationState: function() {
        // TODO
        var length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    },
    valueChanged: function(event) {
        value = this.refs.input.getValue();
        this.setState({
            value: value
        });
        this.props.attribute.value = value;
    },
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

module.exports = EditableAttribute;