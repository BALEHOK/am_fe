/**
 * @jsx React.DOM
 */

import React from 'react';
import DeloreanComponent from '../../common/DeloreanComponent';
import Loader from'../../common/loader.jsx';
import ReactSelectize from '../../common/react-selectize';
import AttributesTableHeader from './attributesTableHeader';
import AttributeRow from './attributeRow';

var assetTypeContext = {
    active: 1,
    history: 2
};

import reactMixin from 'react-mixin';
import {Flux} from 'delorean';

@reactMixin.decorate(Flux.mixins.storeListener)
export default class SearchByTypeForm extends DeloreanComponent {

    static logicalOperators = {
        none: 0,
        and: 1,
        or: 2
    }

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

    handleAssetTypeChanged = (values) => {
        if (!values || !values.length){
            this.setSearchModel({
                typeId: 0,
                attributes: []
            });
            return;
        }

        var typeId = values[0].id;
        this.props.actions.loadAssetAttributes(typeId);
        this.setSearchModel({
            typeId: typeId,
            attributes: []
        });
    }

    onContextChanged = (e) => {
        this.setSearchModel({
            assetTypeContext: e.currentTarget.value
        });
    }

    addRow = () => {
        var assetType = this.state.searchModel.typeId;
        var allAttribs = this.state.stores.searchByType.assetAttributes;
        if (!assetType || !allAttribs[assetType]){
            return;
        }

        var index = this.state.searchModel.attributes.length;
        if (index != 0){
            this.state.searchModel.attributes[index - 1].lo = SearchByTypeForm.logicalOperators.and;
        }

        var attribute = allAttribs[assetType][0];

        var selectedAttribModel = {
            index: index,
            referenceAttrib: attribute,
            operators: [],
            operator: null,
            value: null,
            // logical operator
            lo: SearchByTypeForm.logicalOperators.none
        };

        this.setOperators(selectedAttribModel);

        this.state.searchModel.attributes.push(selectedAttribModel);

        this.forceUpdate();
    }

    rowChanged = (attribute) => {
        this.state.searchModel.attributes[attribute.index] = attribute;

        if (!attribute.operators.length){
            this.setOperators(attribute);
        }

        this.forceUpdate();
    }

    setOperators(selectedAttribute) {
        var dataTypeOperators = this.state.stores.searchByType.dataTypeOperators;
        var datatype = selectedAttribute.referenceAttrib.dataType;
        if (!loadFromStore())
        {
            this.props.actions.loadDataTypeOperators(datatype).then(() => {
                loadFromStore();
                this.forceUpdate();
            });
        }

        function loadFromStore() {
            var ops = dataTypeOperators[datatype];
            if (ops && ops.length){
                selectedAttribute.operators = ops;
                selectedAttribute.operator = ops[0].id;
                return true;
            }
            return false;
        }
    }

    rowDeleted = (index) => {
        this.state.searchModel.attributes.splice(index, 1);

        if (this.state.searchModel.attributes.length !== 0){

            this.updateRowIndexes(index);

            // fix logical operator
            if (index === this.state.searchModel.attributes.length){
                this.state.searchModel.attributes[index - 1].lo = SearchByTypeForm.logicalOperators.none;
            }
        }

        this.forceUpdate();
    }

    rowMoveUp = (index) => {
        if (index === 0){
            return;
        }

        var attribs = this.state.searchModel.attributes;
        var prevIndex = index - 1;
        var prev = attribs[prevIndex];
        attribs[prevIndex] = attribs[index];
        attribs[index] = prev;

        this.updateRowIndexes(prevIndex);

        // fix logical operator
        if (index === this.state.searchModel.attributes.length - 1){
            attribs[prevIndex].lo = SearchByTypeForm.logicalOperators.and;
            attribs[index].lo = SearchByTypeForm.logicalOperators.none;
        }

        this.forceUpdate();
    }

    rowMoveDown = (index) => {
        var attribs = this.state.searchModel.attributes;

        if (index === attribs.length - 1){
            return;
        }

        var nextIndex = index + 1;
        var next = attribs[nextIndex];
        attribs[nextIndex] = attribs[index];
        attribs[index] = next;

        this.updateRowIndexes(index);

        // fix logical operator
        if (index === attribs.length - 2){
            attribs[index].lo = SearchByTypeForm.logicalOperators.and;
            attribs[nextIndex].lo = SearchByTypeForm.logicalOperators.none;
        }

        this.forceUpdate();
    }

    updateRowIndexes(startFrom){
        var attribs = this.state.searchModel.attributes;
        for (var i = startFrom; i != attribs.length; i++){
            attribs[i].index = i;
        }
    }

    doSearch(e) {
        e.preventDefault && e.preventDefault();
        this.props.actions.doSearch(this.state.searchModel);
    }

    setSearchModel(diff){
        this.setState({
            searchModel: Object.assign(this.state.searchModel, diff)
        });
    }

    render() {
        var attributeRows = [];
        var assetType = this.state.searchModel.typeId;
        var selectedAttributes = this.state.searchModel.attributes;
        if (!!assetType && selectedAttributes.length)
        {
            var allTypeAttribs = this.state.stores.searchByType.assetAttributes[assetType];
            for (var i = 0; i < selectedAttributes.length; i++) {
                attributeRows.push(
                    <AttributeRow attributes={allTypeAttribs}
                        selected={selectedAttributes[i]}
                        onChange={this.rowChanged}
                        onDelete={this.rowDeleted}
                        onMoveUp={this.rowMoveUp}
                        onMoveDown={this.rowMoveDown} />);
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
