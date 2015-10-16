/**
 * @jsx React.DOM
 */

import React from 'react';
import DeloreanComponent from '../../common/DeloreanComponent';
import reactMixin from 'react-mixin';
import {Flux} from 'delorean';
import Loader from'../../common/loader.jsx';
import ReactSelectize from '../../common/react-selectize';
import AttributesTableHeader from './attributesTableHeader';
import AttributeRow from './attributeRow';

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
            assetTypeContext: assetTypeContext.active,
            attributes: []
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

        var typeId = value[0].id;
        this.setSearchModel({
            typeId: typeId
        });

        this.props.actions.loadAssetAttributes(typeId);
    }

    onContextChanged = (e) => {
        this.setSearchModel({
            assetTypeContext: e.currentTarget.value
        });
    }

    addRow = () => {
        var selectedType = this.state.searchModel.typeId;
        var allAttribs = this.state.stores.searchByType.assetAttributes;
        if (!selectedType || !allAttribs[selectedType]){
            return;
        }

        this.state.searchModel.attributes.push({
            index: this.state.searchModel.attributes.length,
            id: allAttribs[selectedType][0].id,
            operator: null,
            value: null
        });

        this.forceUpdate();
    }

    rowChanged(attribute){
        this.state.searchModel.attributes[attribute.index] = attribute;
        this.forceUpdate();
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
        var attributeRows = [];
        var selectedType = this.state.searchModel.typeId;
        var selectedAttributes = this.state.searchModel.attributes;
        if (!!selectedType && selectedAttributes.length)
        {
            var allTypeAttribs = this.state.stores.searchByType.assetAttributes[selectedType];
            for (var i = 0; i < selectedAttributes.length; i++) {
                attributeRows.push(
                    <AttributeRow attributes={allTypeAttribs}
                        selected={selectedAttributes[i]}
                        onChange={this.rowChanged.bind(this)} />);
            };
        }

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
                                        onChange={this.onContextChanged} />
                                    <span className="radio-btn__icon"></span>
                                    Active assets
                                </label>
                                <label className="radio-btn">
                                    <input type="radio" className="radio-btn__input" name="assetTypeState"
                                        value={assetTypeContext.history}
                                        checked={this.state.searchModel.assetTypeContext == assetTypeContext.history}
                                        onChange={this.onContextChanged} />
                                    <span className="radio-btn__icon"></span>
                                    History
                                </label>
                            </span>
                        </span>
                    </div>
                </header>

                <div className="table-search">
                    <div className={!selectedAttributes.length?'hide':''}>
                        <AttributesTableHeader />
                        <div className="table-search__content">
                            {attributeRows}
                        </div>
                    </div>
                    <footer className="table-search__footer">
                        <span className="table-search__add-row" onClick={this.addRow}>Add a new row</span>
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
