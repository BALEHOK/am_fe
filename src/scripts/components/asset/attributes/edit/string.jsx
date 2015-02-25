/**
 * @jsx React.DOM
 */

var React = require('react');
var Input = require('react-bootstrap').Input;

var EditableAttribute = React.createClass({
    getInitialState: function() {
    return {
            value: this.props.params.value
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
        this.props.params.value = value;
    },
    render: function() {
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <label className="input-txt input-txt_size_small">
                    <Input 
                        type="text"
                        className="input-txt__field"
                        value={this.state.value}
                        ref="input"
                        bsStyle={this.validationState()}
                        onChange={this.valueChanged} />
                </label>
            </div>
        );
    }
});

module.exports = EditableAttribute;