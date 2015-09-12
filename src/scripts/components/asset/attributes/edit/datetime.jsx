/**
 * @jsx React.DOM
 */

var React = require('react');
var DatePicker = require('react-date-picker');
var TimePicker = require('react-time-picker');
var moment = require('moment');
var ControlWrapper = require('./controlWrapper');
var ValidationMixin = require('../../../../mixins/ValidationMixin');
var FocusOutMixin = require('../../../../mixins/FocusOutMixin');

var DateTimeAttribute = React.createClass({
    mixins: [ValidationMixin, FocusOutMixin],

    getInitialState() {
        return { opened: false };
    },

    componentWillMount() {
        this.focusOutCls = '.asset-date-picker';
        this.setupValidation(this.props.actions);
    },

    showDatePicker(e) {
        if(this.breaker) {
            this.breaker = false;
            return false;
        }
        this.setState({
            opened: true
        });
    },

    hideDatePicker() {
        this.setState({
            opened: false
        });
    },

    formatDate(d) {
        return d ? d.format('M/D/YYYY HH:mm:ss') : d;
    },

    onChange(e, date) {
        this.breaker = true;
        let cd = this.props.params.value ? moment(this.props.params.value) : moment();
        cd.set({year: date.year(), month: date.month(), date: date.date()});
        var formattedDate = this.formatDate(cd);
        this.props.params.value = formattedDate
        this.hideDatePicker();
        this.validate({id: this.props.params.id, value: this.props.params.value});
    },

    onClose() {
        this.validate({id: this.props.params.id, value: this.props.params.value});
    },

    onTimeChange(e, time) {
        let d = this.props.params.value ? moment(this.props.params.value) : moment();
        d.set({'hour': time.hour(), 'minute': time.minute()});
        this.props.params.value = this.formatDate(d);
        this.forceUpdate();
    },

    clearValue(e) {
        e.preventDefault();
        this.props.params.value = null;
        this.resetValidation({id: this.props.params.id});
        this.forceUpdate();
    },

    render() {
        var dateValue = this.props.params.value
            ? moment(this.props.params.value)
            : undefined;
        var picker;
        if(this.state.opened) {
            picker = (
                <div className="asset-date-picker">
                    <DatePicker onChange={this.onChange} date={dateValue} />
                    <TimePicker className="asset-date-picker__time" format="HH:mm" onChange={this.onTimeChange} value={moment(this.props.params.value).format('HH:mm')} />
                </div>
            )
        }
        var validation = {
                feedbackClasses: "glyphicon form-control-feedback",
                groupClasses: "form-group",
                hasFeedback: false,
                isValid: undefined,
                message: undefined,
                validationState: undefined
            };
        return (
            <ControlWrapper
                name={this.props.params.name}
                className="input-txt input-txt_size_small"
                validationState={this.state.validation}>
                <input type="text"
                    className="input-txt__field form-control"
                    onClick={this.showDatePicker}
                    value={this.formatDate(dateValue)} />
                {picker}
                {dateValue && !this.state.opened
                    ? <span className="input-txt__clear" onClick={this.clearValue}>×</span>
                    : null
                }


            </ControlWrapper>
        );
    }
});

module.exports = DateTimeAttribute;
