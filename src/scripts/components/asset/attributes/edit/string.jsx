/**
 * @jsx React.DOM
 */

var React = require('react');
var Input = require('react-bootstrap').Input;
var ValidationMixin = require('../../../../mixins/ValidationMixin');

var EditableAttribute = React.createClass({
    mixins: [ValidationMixin],
    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },
    getInitialState: function() {
        return {
            value: this.props.params.value,
        };
    },
    valueChanged: function(event) {
        var value = event.target.value;
        this.setState({
            value: value
        });
        this.props.params.value = value;
        this.validate({id: this.props.params.id, value: this.props.params.value});
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
                        bsStyle={this.state.validationState}
                        hasFeedback={this.state.hasFeedback}
                        onChange={this.valueChanged} />
                </label>
            </div>
        );
    }
});

module.exports = EditableAttribute;