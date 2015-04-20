/**
 * @jsx React.DOM
 */

var React = require('react');
var DateTimeField = require('react-datetimepicker');
var moment = require('moment');
var ControlWrapper = require('./controlWrapper');
var ValidationMixin = require('../../../../mixins/ValidationMixin');

var DateTimeAttribute = React.createClass({
    mixins: [ValidationMixin],

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    render: function() {
        return (
            <ControlWrapper
                name={this.props.params.name} 
                className="input-txt input-txt_size_small"
                validationState={this.state.validation}>

                <DateTimeField selectedDate={moment(this.props.params.value)}/>

            </ControlWrapper>
        );
    }
});

module.exports = DateTimeAttribute;