/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
var ControlWrapper = require('./controlWrapper');
var ValidationMixin = require('../../../../mixins/ValidationMixin');

var PasswordEdit = React.createClass({
    mixins: [ValidationMixin],

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    valueChanged: function(event) {
        this.props.params.value = event.target.value;
        this.validate({id: this.props.params.id, value: this.props.params.value});
        this.forceUpdate();
    },

    render: function() {
        return (
            <ControlWrapper
                id={this.props.params.id}
                name={this.props.params.name}
                className="input-txt input-txt_size_small"
                validationState={this.state.validation}>

                <input
                    type="password"
                    onChange={this.valueChanged}
                    className="input-txt__field form-control"
                    value={this.props.params.value} />

            </ControlWrapper>
        );
    }
});

module.exports = PasswordEdit;
