/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
var ControlWrapper = require('./controlWrapper');
var ValidationMixin = require('../../../../mixins/ValidationMixin');

var BooleanAttribute = React.createClass({
    mixins: [ValidationMixin],

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

	getInitialState: function() { 
		return { isChecked: this.props.params.value ? true : false }; 
	},

    valueChanged: function(event) {
    	this.setState({isChecked: !this.state.isChecked});
        this.props.params.value = this.state.isChecked;
        this.validate({id: this.props.params.id, value: this.props.params.value});
    },

    render: function() {
        return (
            <ControlWrapper 
                name={this.props.params.name} 
                className="input-txt input-txt_size_small"
                validationState={this.state.validation}>

                <input type="checkbox" onChange={this.valueChanged} checked={this.state.isChecked} />

            </ControlWrapper>
        );
    }
});

module.exports = BooleanAttribute;