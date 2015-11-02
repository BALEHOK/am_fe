import React from 'react';
import ReactSelectize from '../../common/react-selectize';

export default class ValueSelectorBool extends React.Component {
    static items = [
        { name: 'True', id: 1},
        { name: 'False', id: 2}
    ]

    static defaultValue = { name: 'False', id: 2 }

    onValueChange = (items) => {
        if (!items || !items.length){
            this.props.onValueChange(ValueSelectorBool.defaultValue);
        }

        this.props.onValueChange(items[0]);
    }

    render() {
        return (
            <ReactSelectize
                items={ValueSelectorBool.items}
                value={this.props.value ? this.props.value.id : ValueSelectorBool.defaultValue.id}
                onChange={this.onValueChange}
                selectId="selectBoolValue"
                placeholder="Select value"
                label=" "
                clearable={false}
            />
        );
    }
}