/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
var ControlWrapper = require('./controlWrapper');
var ValidationMixin = require('../../../../mixins/ValidationMixin');

var TypedMoney = React.createClass({
    mixins: [ValidationMixin],

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    valueChanged: function(event) {
        this.props.params.value = event.target.value.replace(this.getSign(), '');
        this.validate({id: this.props.params.id, value: this.props.params.value});
        this.forceUpdate();
    },

    getSign() {
        var signs = { usd: '$', euro: '€' };
        return signs[this.props.params.datatype];
    },

    render: function() {
        return (
            <ControlWrapper
                name={this.props.params.name}
                className="input-txt input-txt_size_small"
                validationState={this.state.validation}>

                <input
                    type="text"
                    onChange={this.valueChanged}
                    className="input-txt__field form-control"
                    value={ this.getSign() + this.props.params.value} />

            </ControlWrapper>
        );
    }
});

module.exports = TypedMoney;