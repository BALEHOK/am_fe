/**
 * @jsx React.DOM
 */

import React from 'react';
import StoreWatchComponent from '../../common/StoreWatchComponent';
import ReactSelectize from '../../common/react-selectize';

export default class ValueSelectorDynList extends StoreWatchComponent {

    watchStores = ['dynamicAttributeStore']

    componentDidMount(){
        if (!this.state.stores.dynamicAttributeStore.dynLists[this.props.listId]){
            this.props.actions.loadDynList(loadDynList);
        }
    }

    onValueChange = (items) => {
        if (!items || !items.length){
            this.props.onValueChange(false);
        }

        this.props.onValueChange(items[0].value);
    }

    render() {
        return (
            <ReactSelectize
                items={this.state.stores.dynamicAttributeStore.dynLists[this.props.listId]}
                value={this.props.value}
                onChange={this.onValueChange}
                selectId="selectDynListValue"
                placeholder="Select value"
                label=" "
                clearable={false}
            />
        );
    }
}