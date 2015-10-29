import React from 'react';
import DeloreanComponent from '../../common/DeloreanComponent';
import ReactSelectize from '../../common/react-selectize';

import reactMixin from 'react-mixin';
import {Flux} from 'delorean';

@reactMixin.decorate(Flux.mixins.storeListener)
export default class ValueSelectorDynList extends DeloreanComponent {

    watchStores = ['list']

    constructor(props) {
        super(props);
        
        this.props.actions.loadDynamicList({
            attributeId: this.props.attrId
        });
    }

    componentWillReceiveProps(nextProps) {
        var items = this.getItems(nextProps.attrId);
        if (items && items.length){
            return;
        }

        this.props.actions.loadDynamicList({
            attributeId: nextProps.attrId
        });
    }

    onValueChange = (items) => {
        if (!items || !items.length){
            this.props.onValueChange(false);
        }

        this.props.onValueChange(items[0]);
    }

    getItems = (attrId) => {
        var itemsStore = this.state.stores.list.dynlists[attrId];
        return (itemsStore && itemsStore.items) ? itemsStore.items : [];
    }

    render() {
        return (
            <ReactSelectize
                items={this.getItems(this.props.attrId)}
                value={this.props.value.id}
                onChange={this.onValueChange}
                selectId="selectDynListValue"
                placeholder="Select value"
                label=" "
                clearable={false}
                valueField="id"
                labelField="value"
            />
        );
    }
}