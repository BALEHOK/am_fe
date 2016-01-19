import React from 'react';
import DeloreanComponent from '../../../common/DeloreanComponent';
import ReactSelectize from '../../../common/react-selectize';

import reactMixin from 'react-mixin';
import {Flux} from 'delorean';

import List from '../../../asset/attributes/edit/list';

@reactMixin.decorate(Flux.mixins.storeListener)
export default class ValueSelectorDynList extends DeloreanComponent {

    watchStores = ['list']

    onValueChange = (value) => {
        this.props.onValueChange(!value ? null : value);
    }

    render() {
        var params = {
            id: this.props.attrId,
            value: {id: this.props.value ? this.props.value.id : 0}
        };

        return (
            <List
                params={params}
                name="places"
                actions={this.props.actions}
                dispatcher={this.props.dispatcher}
                onChange={this.onValueChange}
                mapper={(el) => ({id: el.id, name: el.name})} />
        );
    }
}