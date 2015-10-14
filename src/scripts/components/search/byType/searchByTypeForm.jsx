/**
 * @jsx React.DOM
 */

import React from 'react';
import DeloreanComponent from '../../common/DeloreanComponent';
import reactMixin from 'react-mixin';
import {Flux} from 'delorean';
import Loader from'../../common/loader.jsx';
import ReactSelectize from '../../common/react-selectize';

var assetTypeContext = {
    active: 1,
    history: 2
};

@reactMixin.decorate(Flux.mixins.storeListener)
export default class SearchByTypeForm extends DeloreanComponent {

    watchStores = ['searchByType']

    state = {
        searchModel: {
            typeId: 0,
            assetTypeContext: assetTypeContext.active
        },
        assetTypes: []
    }

    constructor(props){
        super(props);

        this.props.actions.loadAssetTypes();
    }

    handleAssetTypeChanged = (value) => {
        if (!value || !value.length){
            this.setSearchModel({
                typeId: 0
            });
            return;
        }

        this.setSearchModel({
            typeId: value[0].id
        });
    }

    onAssetTypeContextChanged = (e) => {
        this.setSearchModel({
            assetTypeContext: e.currentTarget.value
        });
    }

    doSearch(e) {
        e.preventDefault && e.preventDefault();
        this.props.actions.doSearch(this.state.searchModel);
    }

    setSearchModel(o){
        var searchModel = this.state.searchModel;
        for (var prop in o){
            searchModel[prop] = o[prop];
        }

        this.setState({
            searchModel: searchModel
        });
    }

    render() {
        return (
            <form className="form advanced-search">
                <header className="advanced-search__header">
                    <div className="input-group">
                        <span className="input-group__item">
                            <span className="input-group__item-title">
                                Asset type
                            </span>
                            <ReactSelectize
                                items={this.state.stores.searchByType.assetTypes}
                                value={this.state.searchModel.typeId}
                                onChange={this.handleAssetTypeChanged}
                                selectId="asset-type"
                                placeholder="Select asset"
                                label=" "
                                clearable={false}
                            />
                        </span>
                        <span className="input-group__item">
                            <span className="input-group__item-title">
                                Search in
                            </span>
                            <span className="radio-group">
                                <label className="radio-btn">
                                    <input type="radio" className="radio-btn__input" name="assetTypeState"
                                        value={assetTypeContext.active}
                                        checked={this.state.searchModel.assetTypeContext == assetTypeContext.active}
                                        onChange={this.onAssetTypeContextChanged} />
                                    <span className="radio-btn__icon"></span>
                                    Active assets
                                </label>
                                <label className="radio-btn">
                                    <input type="radio" className="radio-btn__input" name="assetTypeState"
                                        value={assetTypeContext.history}
                                        checked={this.state.searchModel.assetTypeContext == assetTypeContext.history}
                                        onChange={this.onAssetTypeContextChanged} />
                                    <span className="radio-btn__icon"></span>
                                    History
                                </label>
                            </span>
                        </span>
                    </div>
                </header>

                <div className="table-search">
                    <footer className="table-search__footer">
                        <span className="table-search__add-row">Add a new row</span>
                        <div className="table-search__footer-actions clearfix">
                            <button className="btn pull-right"
                                disabled={!this.state.searchModel.typeId}
                                onClick={this.doSearch.bind(this)}>
                                <i className="btn__icon btn__icon_search"></i>Start search
                            </button>
                        </div>
                    </footer>
                </div>
            </form>
        );
    }
}
