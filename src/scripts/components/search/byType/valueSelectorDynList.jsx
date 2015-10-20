/**
 * @jsx React.DOM
 */

import React from 'react';
import DeloreanComponent from '../../common/DeloreanComponent';
import ReactSelectize from '../../common/react-selectize';

import reactMixin from 'react-mixin';
import {Flux} from 'delorean';

@reactMixin.decorate(Flux.mixins.storeListener)
export default class ValueSelectorDynList extends DeloreanComponent {

    watchStores = ['dynamicAttributeStore']

    constructor(props) {
        super(props);
        
        this.props.actions.loadDynList(this.props.listId);
    }

    componentWillReceiveProps(nextProps) {
        this.props.actions.loadDynList(nextProps.listId);
    }

    onValueChange = (items) => {
        if (!items || !items.length){
            this.props.onValueChange(false);
        }

        this.props.onValueChange(items[0].id);
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