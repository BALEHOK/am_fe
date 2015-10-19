/**
 * @jsx React.DOM
 */

import React from 'react';
import ReactSelectize from '../../common/react-selectize';

export default class AttributeRow extends React.Component {
    items = [
        { name: 'True', id: 1, value: true},
        { name: 'False', id: 2, value: false}
    ]

    onValueChange = (items) => {
        if (!items || !items.length){
            this.props.onValueChange(false);
        }

        this.props.onValueChange(items[0].value);
    }

    render() {
        return (
            <ReactSelectize
                items={this.items}
                value={this.props.value ? 1 : 2}
                onChange={this.onValueChange}
                selectId="selectBoolValue"
                placeholder="Select value"
                label=" "
                clearable={false}
            />
        );
    }
}