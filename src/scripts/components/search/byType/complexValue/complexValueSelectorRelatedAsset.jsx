import React from 'react';
import Tabs from 'react-simpletabs';
import classNames from 'classnames';
import ValueSelectorRelatedAsset from '../valueSelectors/valueSelectorRelatedAsset';
import AttributeRows from '../attributeRows';
import RowsControls from '../rowsControls';

import DeloreanComponent from '../../../common/DeloreanComponent';
import reactMixin from 'react-mixin';
import {Flux} from 'delorean';

@reactMixin.decorate(Flux.mixins.storeListener)
export default class ComplexValueSelectorRelatedAsset extends DeloreanComponent {

    watchStores = ['searchByType']

    componentDidMount(){
        this.props.actions.ensureAttributesLoaded(this.props.selected.referenceAttrib.relationId);
    }

    onSimpleConditionSelected = () => {
        this.onConditionChange(false);
    }

    onAdvancedConditionSelected = () => {
        this.onConditionChange(true);
    }

    onConditionChange(useComplexValue) {
        var newAttr = this.createNewAttr({
            useComplexValue: useComplexValue
        });

        this.props.onChange(newAttr);
    }

    onSimpleValueChange = (value) => {
        var newAttr = this.createNewAttr({
            value: value
        });

        this.props.onChange(newAttr);
    }

    addRow = () => {
        var selected = this.props.selected;
        this.props.actions.addRow({
            assetTypeId: selected.referenceAttrib.relationId,
            attributes: selected.complexValue
        });
    }

    addOpenParenthesis = () => {
        this.props.actions.addOpenParenthesis(this.props.selected.complexValue);
    }

    addClosingParenthesis = () => {
        this.props.actions.addClosingParenthesis(this.props.selected.complexValue);
    }

    createNewAttr = (diff) => {
        return Object.assign({}, this.props.selected, diff);
    }

    render(){
        var selected = this.props.selected;
        var referenceAttrib = selected.referenceAttrib;

        var tabs = this.props.level > 1
            ? null
            : (
                <nav className="tabs-navigation">
                    <ul className="tabs-menu">
                        <li className={classNames('tabs-menu-item', {'is-active': !selected.useComplexValue})}>
                            <a onClick={this.onSimpleConditionSelected}>Simple condition</a>
                        </li>
                        <li className={classNames('tabs-menu-item', {'is-active': selected.useComplexValue})}>
                            <a onClick={this.onAdvancedConditionSelected}>Advanced condition</a>
                        </li>
                    </ul>
                </nav>
            );

        var valueSelector;
        if (this.props.level > 1 || !selected.useComplexValue){
            var simpleConditionParams = {
                id: referenceAttrib.id,
                relatedAssetTypeId: referenceAttrib.relationId,
                datatype: referenceAttrib.dataType,
                value: selected.value || []
            };
            valueSelector = (
                <div className="search-condition search-condition_simple">
                    <div className="table-search__row">
                        <div className="table-search__row-item">
                            <ValueSelectorRelatedAsset
                                onValueChange={this.onSimpleValueChange}
                                params={simpleConditionParams}
                                dispatcher={this.props.assetDispatcher}
                                actions={this.props.assetActions} />
                        </div>
                    </div>
                </div>
            );
        } else {
            valueSelector = (
                <div className="search-condition">
                    <AttributeRows
                        actions={this.props.actions}
                        assetType={referenceAttrib.relationId}
                        attributes={selected.complexValue}
                        allTypeAttribs={this.state.stores.searchByType.assetAttributes[referenceAttrib.relationId]}
                        level={this.props.level + 1} />
                    
                    <RowsControls
                                addRow={this.addRow}
                                addOpenParenthesis={this.addOpenParenthesis}
                                addClosingParenthesis={this.addClosingParenthesis} />
                </div>
            );
        }

        return (
            <div className="table-search__row-item table-search__row-item_type_inner">
                <div className="tabs tabs-complex-value">
                    {tabs}
                    <article className="tab-panel">
                        {valueSelector}
                    </article>
                </div>
            </div>
        );
    }
}