import React from 'react';
import reactMixin from 'react-mixin';

import moment from 'moment';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import FocusOutMixin from '../../../mixins/FocusOutMixin';

@reactMixin.decorate(FocusOutMixin)
export default class ValueSelectorBool extends React.Component {

    date = null

    state = {
        opened: false,
        date: null
    }

    constructor(props){
        super(props);

        this.state.date = props.value ? moment(props.value) : moment();
    }

    componentWillReceiveProps(nextProps) {
        this.state.date = nextProps.value ? moment(nextProps.value) : moment();
    }

    focusOutCls = '.asset-date-picker'

    onDateChange = (e, date) => {
        this.state.date.set({year: date.year(), month: date.month(), date: date.date()});

        this.hideDatePicker();
        
        this.updateValue();
    }

    onTimeChange = (e, time) => {
        this.state.date.set({'hour': time.hour(), 'minute': time.minute()});
        this.forceUpdate();
    }

    updateValue(value){
        this.props.onValueChange(this.formatDate(this.state.date));
    }

    formatDate(d) {
        return d ? d.format('M/D/YYYY HH:mm') : d;
    }

    showDatePicker = (e) =>  {
        this.setState({
            opened: true
        });
    }

    hideDatePicker() {
        this.setState({
            opened: false
        });
    }

    onClose() {
        this.updateValue();
    }

    render() {
        var picker;
        if(this.state.opened) {
            picker = (
                <div className="asset-date-picker">
                    <DatePicker onChange={this.onDateChange} date={this.state.date} />
                    <TimePicker className="asset-date-picker__time" format="HH:mm" onChange={this.onTimeChange} value={this.state.date.format('HH:mm')} />
                </div>
            )
        }

        return (
            <div>
                <input type="text"
                    className="input-txt__field form-control"
                    onClick={this.showDatePicker}
                    value={this.formatDate(this.state.date)} />
                {picker}
            </div>
        );
    }
}