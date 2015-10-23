import React from 'react';
import DeloreanComponent from '../../common/DeloreanComponent';
import Loader from'../../common/loader.jsx';
import ReactSelectize from '../../common/react-selectize';
import AttributesTableHeader from './attributesTableHeader';
import ParenthesisRow from './parenthesisRow';
import AttributeRow from './attributeRow';

var assetTypeContext = {
    active: 1,
    history: 2
};

var parenthesisType = {
    none: 0,
    open: 1,
    closing: 2
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
            parenthesis: parenthesisType.none,
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

    addOpenParenthesis = () => {
        var assetType = this.state.searchModel.typeId;
        var allAttribs = this.state.stores.searchByType.assetAttributes;
        if (!assetType || !allAttribs[assetType]){
            return;
        }

        var index = this.state.searchModel.attributes.length;
        if (index != 0){
            this.state.searchModel.attributes[index - 1].lo = SearchByTypeForm.logicalOperators.and;
        }

        var selectedAttribModel = {
            index: index,
            parenthesis: parenthesisType.open,
            referenceAttrib: null,
            operators: null,
            operator: null,
            value: null,
            // logical operator
            lo: SearchByTypeForm.logicalOperators.none
        };

        this.state.searchModel.attributes.push(selectedAttribModel);

        this.forceUpdate();
    }

    addClosingParenthesis = () => {
        var assetType = this.state.searchModel.typeId;
        var allAttribs = this.state.stores.searchByType.assetAttributes;
        if (!assetType || !allAttribs[assetType]){
            return;
        }

        var index = this.state.searchModel.attributes.length;

        var selectedAttribModel = {
            index: index,
            parenthesis: parenthesisType.closing,
            referenceAttrib: null,
            operators: null,
            operator: null,
            value: null,
            // logical operator
            lo: SearchByTypeForm.logicalOperators.none
        };

        this.state.searchModel.attributes.push(selectedAttribModel);

        this.forceUpdate();
    }

    rowChanged = (attribute) => {
        this.state.searchModel.attributes[attribute.index] = attribute;

        if (attribute.parenthesis === parenthesisType.none && !attribute.operators.length){
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
        var attribs = this.state.searchModel.attributes;
        attribs.splice(index, 1);

        if (attribs.length !== 0){

            this.updateRowIndexes(index);

            fixLogicalOperator(index - 1);
        }

        this.forceUpdate();
    }

    fixLogicalOperator(index){
        var attribs = this.state.searchModel.attributes;
        var curAttrib = attribs[index];
        // last row has no LO
        if (index === attribs.length - 1){
            curAttrib.lo = SearchByTypeForm.logicalOperators.none;
        }

        // open parenthesis never has LO, skip it
        else if (curAttrib.parenthesis !== parenthesisType.open){
            // no LO before closing parenthesis
            if (attribs[index + 1].parenthesis === parenthesisType.closing){
                curAttrib.lo = SearchByTypeForm.logicalOperators.none;
            }
            // ensure there is LO before not closing parenthesis
            else if (curAttrib.lo === SearchByTypeForm.logicalOperators.none){
                curAttrib.lo = SearchByTypeForm.logicalOperators.and;
            }
        }
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

        if (index > 1){
            this.fixLogicalOperator(index - 2);
        }
        this.fixLogicalOperator(index - 1);
        this.fixLogicalOperator(index);

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

        if (index > 0){
            this.fixLogicalOperator(index - 1);
        }
        this.fixLogicalOperator(index);
        this.fixLogicalOperator(index + 1);

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
                var attr = selectedAttributes[i];
                if (attr.parenthesis > parenthesisType.none){
                    attributeRows.push(
                        <ParenthesisRow
                            selected={attr}
                            onChange={this.rowChanged}
                            onDelete={this.rowDeleted}
                            onMoveUp={this.rowMoveUp}
                            onMoveDown={this.rowMoveDown} />);
                } else {
                    attributeRows.push(
                        <AttributeRow attributes={allTypeAttribs}
                            selected={attr}
                            onChange={this.rowChanged}
                            onDelete={this.rowDeleted}
                            onMoveUp={this.rowMoveUp}
                            onMoveDown={this.rowMoveDown} />);
                }
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
                        <span className="table-search__add-row" onClick={this.addRow}>
                            <i className="icon icon-plus"></i>
                            Add a new row
                        </span>
                        <span className="table-search__add-row icon-stack" onClick={this.addOpenParenthesis}>
                            <i className="icon icon-openpar icon-circle"></i>
                            Add open parenthesis
                        </span>
                        <span className="table-search__add-row closepar" onClick={this.addClosingParenthesis}>
                            <i className="icon icon-closepar icon-circle"></i>
                            Add closing parenthesis
                        </span>
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
