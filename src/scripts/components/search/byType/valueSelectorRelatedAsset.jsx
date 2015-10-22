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

    watchStores = ['list']

    onItemsRequest = (query, callback) => {
        return this.props.actions.loadAssetsList({
           assetTypeId: this.props.params.relatedAssetTypeId,
           query: query,
           id: this.props.params.id
        });
    }

    onValueChange = (items) => {
        if (!items || !items.length){
            this.props.onValueChange(false);
        }
        var value;
        if (this.props.params.datatype == 'assets') {
            value = items.map(i => i.id);
        } else {
            value = [items[0].id];
        }

        this.props.onValueChange(value);
    }

    createNew = () => {
        this.props.actions.pushAsset();
        this.context.router.transitionTo('asset-create-from-type', {
            assetTypeId: this.props.params.relatedAssetTypeId
        }, {
            forAttr: this.props.params.id
        });
    }

    render() {
        var attrId = this.props.params.id;
        var itemsStore = this.state.stores.list.assets[attrId];
        var items = (itemsStore && itemsStore.items) ? itemsStore.items : [];
        var value = this.props.params.values;
        var maxItems = undefined;
        if (this.props.params.datatype == 'assets') {
            maxItems = 100;
        }

        return (
            <div>
                <ReactSelectize
                    maxItems={maxItems}
                    valueField="id"
                    labelField="name"
                    sortField="id"
                    items={items}
                    onItemsRequest={this.onItemsRequest}
                    onChange={this.onValueChange}
                    value={value}
                    placeholder=" "
                    label=" " />
                <div
                    className="btn btn_type_one btn_size_small asset-data__param-btn"
                    onClick={this.createNew}>
                    <i className="btn__icon btn__icon_plus_circle"></i>
                </div>
            </div>
        );
    }
}