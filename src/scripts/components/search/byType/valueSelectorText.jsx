/**
 * @jsx React.DOM
 */

import React from 'react';
import _ from 'underscore';

export default class ValueSelectorText extends React.Component {
    txtValue = null

    componentDidMount(){
        this.txtValue = this.refs.txtValue.getDOMNode();
    }
    
    onValueChange = (e) => {
        this.props.onValueChange(this.txtValue.value);
    }

    render() {
        return (
            <label className="input-txt input-txt_width_full">
                <input type="text" className="input-txt__field" placeholder="Type search value"
                    name="txtValue" ref="txtValue"
                    value={this.props.value} onChange={_.debounce(this.onValueChange, 500)}/>
            </label>
        );
    }
}