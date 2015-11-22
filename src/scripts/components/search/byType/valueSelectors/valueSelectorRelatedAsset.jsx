import React from 'react';
import Router from 'react-router';
import DeloreanComponent from '../../../common/DeloreanComponent';
import ReactSelectize from '../../../common/react-selectize';

import reactMixin from 'react-mixin';
import {Flux} from 'delorean';

@reactMixin.decorate(Flux.mixins.storeListener)
export default class ValueSelectorRelatedAsset extends DeloreanComponent {

    static contextTypes = {
        router: React.PropTypes.func.isRequired
    }

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
            this.props.onValueChange(null);
        }

        this.props.onValueChange(items[0]);
    }

    getUrlForNew = () => {
        return this.context.router.makeHref('asset-create-from-type', {
            assetTypeId: this.props.params.relatedAssetTypeId
        }, {
            forAttr: this.props.params.id
        });
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
        var items = (itemsStore && itemsStore.items) ? itemsStore.items : [this.props.params.value];

        return (
            <div className="with-action_wrapper">
                <ReactSelectize
                    valueField="id"
                    labelField="name"
                    sortField="id"
                    items={items}
                    onItemsRequest={this.onItemsRequest}
                    onChange={this.onValueChange}
                    value={this.props.params.value.id}
                    placeholder=" "
                    label=" "
                    clearable={false} />
                <a className="btn btn_type_one btn_size_small asset-data__param-btn"
                    href={this.getUrlForNew()}
                    target="_blank">
                    <i className="btn__icon btn__icon_plus_circle"></i>
                </a>
            </div>
        );
    }
}