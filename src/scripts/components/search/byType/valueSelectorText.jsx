import React from 'react';
import _ from 'underscore';

export default class ValueSelectorText extends React.Component {
    txtValue = null

    componentDidMount(){
        this.txtValue = this.refs.txtValue.getDOMNode();
    }
    
    onValueChange = (e) => {
        this.props.onValueChange({id: this.txtValue.value, name: this.txtValue.value});
    }

    render() {
        var defaultValue = this.props.value ? this.props.value.id : '';
        return (
            <label className="input-txt input-txt_width_full">
                <input type="text" className="input-txt__field" placeholder="Type search value"
                    name="txtValue" ref="txtValue"
                    defaultValue={defaultValue} onChange={_.debounce(this.onValueChange, 500)}/>
            </label>
        );
    }
}