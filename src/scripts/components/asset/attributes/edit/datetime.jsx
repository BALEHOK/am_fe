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
        return d.format('M/D/YYYY HH:mm:ss');
    },

    onChange(e, date) {
        this.breaker = true;
        let cd = moment(this.props.params.value);
        cd.set({year: date.year(), month: date.month(), date: date.date()});
        this.props.params.value = this.formatDate(cd)
        this.hideDatePicker();
        this.validate({id: this.props.params.id, value: this.props.params.value});
    },

    onClose() {
        this.validate({id: this.props.params.id, value: this.props.params.value});
    },

    onTimeChange(e, time) {
        let d = moment(this.props.params.value);
        d.set(time);
        this.props.params.value = this.formatDate(d);
        this.forceUpdate();
    },

    render() {
        var picker;
        if(this.state.opened) {
            picker = (
                <div className="asset-date-picker">
                    <DatePicker onChange={this.onChange} date={moment(this.props.params.value)} />
                    <TimePicker className="asset-date-picker__time" format="HH:mm" onChange={this.onTimeChange} value={moment(this.props.params.value).format('HH:mm')} />
                </div>
            )
        }
        return (
            <ControlWrapper
                name={this.props.params.name}
                className="input-txt input-txt_size_small"
                validationState={this.state.validation}>
                <input type="text"
                    className="input-txt__field form-control"
                    onClick={this.showDatePicker}
                    value={this.formatDate(moment(this.props.params.value))} />
                {picker}

            </ControlWrapper>
        );
    }
});

module.exports = DateTimeAttribute;