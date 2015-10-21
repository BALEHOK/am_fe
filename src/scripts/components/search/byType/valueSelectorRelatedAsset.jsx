/**
 * @jsx React.DOM
 */

import React from 'react';
import DeloreanComponent from '../../common/DeloreanComponent';
import ReactSelectize from '../../common/react-selectize';

import reactMixin from 'react-mixin';
import {Flux} from 'delorean';

@reactMixin.decorate(Flux.mixins.storeListener)
export default class ValueSelectorRelatedAsset extends DeloreanComponent {

    watchStores = ['dynamicAttributeStore']

    constructor(props) {
        super(props);
        
        this.props.actions.loadRelated(this.props.attributeId);
    }

    componentWillReceiveProps(nextProps) {
        this.props.actions.loadRelated(this.props.attributeId);
    }

    onValueChange = (items) => {
        if (!items || !items.length){
            this.props.onValueChange(false);
        }

        this.props.onValueChange(items[0].key);
    }

    render() {
        return (
            <ReactSelectize
                items={this.state.stores.dynamicAttributeStore.relatedAssets[this.props.attributeId]}
                value={this.props.value}
                onChange={this.onValueChange}
                selectId="selectDynListValue"
                placeholder="Select value"
                label=" "
                clearable={false}
                valueField={'key'}
                labelField={'value'}
            />
        );
    }
}