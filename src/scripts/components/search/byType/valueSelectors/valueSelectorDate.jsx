import React from 'react';
import reactMixin from 'react-mixin';

import moment from 'moment';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import FocusOutMixin from '../../../../mixins/FocusOutMixin';

@reactMixin.decorate(FocusOutMixin)
export default class ValueSelectorDate extends React.Component {

    focusOutCls = '.asset-date-picker'

    state = {
        opened: false,
        date: null
    }

    constructor(props){
        super(props);

        this.state.date = props.value ? moment(props.value.id) : moment();
    }

    componentWillReceiveProps(nextProps) {
        this.state.date = nextProps.value ? moment(nextProps.value.id) : moment();
    }

    onDateChange = (e, date) => {
        this.state.date.set({year: date.year(), month: date.month(), date: date.date()});

        this.hideDatePicker();
        
        this.updateValue();
    }

    onTimeChange = (e, time) => {
        this.state.date.set({'hour': time.hour(), 'minute': time.minute()});
        this.forceUpdate();
    }

    updateValue(){
        this.props.onValueChange({
            id: this.state.date.format('YYYY-MM-DDTHH:mm:ssZ'),
            name: this.displayDateFormat(this.state.date)
        });
    }

    displayDateFormat(d) {
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
                    value={this.props.value ? this.displayDateFormat(this.state.date) : ''} />
                {picker}
            </div>
        );
    }
}