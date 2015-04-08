/**
 * @jsx React.DOM
 */

var React = require('react');
var Input = require('react-bootstrap').Input;
var Flux = require('delorean').Flux;

var EditableAttribute = React.createClass({
    mixins: [Flux.mixins.storeListener],
    componentWillMount: function () {
        var self = this;
        this.delayedValidation = _.debounce(() => {
            self.props.actions.validateAttribute({
                attributeId: self.props.params.id,
                value: self.props.params.value
            });
        }, 500);
    },
    getInitialState: function() {
        return {
            value: this.props.params.value,
            hasFeedback: false,
            validationState: undefined,
        };
    },
    storeDidChange: function (storeName) {
        if (storeName != 'asset') return;
        var valResult = this.state.stores.asset.validation[this.props.params.id];
        if (valResult) {
            this.setState({
                hasFeedback: true,
                validationState:  valResult.isValid ? 'success' : 'error',
            });
        }
    },
    valueChanged: function(event) {
        var value = event.target.value;
        this.setState({
            value: value
        });
        this.props.params.value = value;
        this.delayedValidation();
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