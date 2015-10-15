/**
 * @jsx React.DOM
 */

import React from 'react';
import DeloreanComponent from '../../common/DeloreanComponent';
import reactMixin from 'react-mixin';
import {Flux} from 'delorean';
import Loader from'../../common/loader.jsx';
import ReactSelectize from '../../common/react-selectize';
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

    onAssetTypeContextChanged = (e) => {
        this.setSearchModel({
            assetTypeContext: e.currentTarget.value
        });
    }

    addRow() {
        if (!this.state.searchModel.typeId){
            return;
        }

        this.state.searchModel.attributes.push({
            id: 0,
            operator: null,
            value: null
        });

        this.setState();
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

    componentWillUpdate(){
        console.log(this.state);
    }

    componentDidUpdate(){
        console.log(this.state);
    }

    render() {
        var attributeRows = [];
        var selectedType = this.state.searchModel.typeId;
        var selectedAttributes = this.state.searchModel.attributes;
        if (!!selectedType && selectedAttributes.length)
        {
            var allAttribs = this.state.stores.searchByType.assetAttributes[selectedType];
            for (var i = 0; i < selectedAttributes.length; i++) {
                attributeRows.push(
                    <AttributeRow attributes={allAttribs}
                        selected={selectedAttributes[i]} />);
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
                {attributeRows}
                <div className="table-search">
                    <footer className="table-search__footer">
                        <span className="table-search__add-row" onClick={this.addRow.bind(this)}>Add a new row</span>
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
