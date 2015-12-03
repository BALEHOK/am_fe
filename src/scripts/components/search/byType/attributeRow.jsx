import React from 'react';
import ReactSelectize from '../../common/react-selectize';
import RowActions from './rowActions';
import ValueSelectorBool from './valueSelectors/valueSelectorBool';
import ValueSelectorDate from './valueSelectors/valueSelectorDate';
import ValueSelectorDynList from './valueSelectors/valueSelectorDynList';
import ValueSelectorPlace from './valueSelectors/valueSelectorPlace';
import ValueSelectorText from './valueSelectors/valueSelectorText';
import ComplexValueSelectorRelatedAsset from './complexValue/ComplexValueSelectorRelatedAsset';

import AssetDispatcher from '../../../dispatchers/AssetDispatcher';
import AssetActions from '../../../actions/AssetActions';

import SearchDispatcher from '../../../dispatchers/SearchDispatcher';
import SearchByTypeActions from '../../../actions/SearchByTypeActions';

import L20nMessage from '../../intl/l20n-message';

export default class AttributeRow extends React.Component {

    constructor(props){
        super(props);

        this.assetDispatcher = AssetDispatcher;
        this.assetActions = new AssetActions(this.assetDispatcher);

        this.searchByTypeDispatcher = SearchDispatcher;
        this.searchByTypeActions = new SearchByTypeActions(this.searchByTypeDispatcher);
    }

    onMoveUp = () => {
        this.props.onMoveUp(this.props.selected.index);
    }

    onMoveDown = () => {
        this.props.onMoveDown(this.props.selected.index);
    }

    onDelete = () => {
        this.props.onDelete(this.props.selected.index);
    }

    onAttrChange = (values) => {
        if (!values || !values.length){
            return;
        }

        var referenceAttrib = values[0];

        var newAttr = this.createNewAttr({
            referenceAttrib: referenceAttrib,
            operators: [],
            operator: null,
            value: this.getDefaultValue(referenceAttrib),
            useComplexValue: false,
            complexValue: []
        });

        this.props.onChange(newAttr);
    }

    onOperChange = (values) => {
        if (!values || !values.length){
            return;
        }

        var newAttr = this.createNewAttr({
            operator: values[0].id
        });

        this.props.onChange(newAttr);
    }

    onValueChange = (value) => {
        var newAttr = this.createNewAttr({
            value: value
        });

        this.props.onChange(newAttr);
    }

    onLoChange = (values) => {
        if (!values || !values.length){
            return;
        }

        var newAttr = this.createNewAttr({
            lo: values[0].id
        });

        this.props.onChange(newAttr);
    }

    createNewAttr = (diff) => {
        return Object.assign({}, this.props.selected, diff);
    }

    getDefaultValue(referenceAttrib){
        var dataType = referenceAttrib.dataType.toLowerCase();
        var component;
        switch(dataType){
            case 'bool':
                component = ValueSelectorBool;
                break;

            case 'currentdate':
            case 'datetime':
                component = ValueSelectorDate;
                break;

            case 'dynlist':
                component = ValueSelectorDynList;
                break;

            case 'asset':
            case 'assets':
                component = ComplexValueSelectorRelatedAsset;
                break;

            case 'place':
                component = ValueSelectorPlace;
                break;

            default:
                component = ValueSelectorText;
        }

        return component.defaultValue || null;
    }

    render(){
        var valueSelector = null, complexValueSelector = null;
        var params;
        var dataType = this.props.selected.referenceAttrib.dataType.toLowerCase();

        var logicalOperators = [
            { name: L20nMessage('searchAnd', 'And'), id: 1},
            { name: L20nMessage('searchOr', 'Or'), id: 2}
        ];

        switch(dataType){
            case 'bool':
                valueSelector = <ValueSelectorBool
                    value={this.props.selected.value}
                    onValueChange={this.onValueChange} />;
                break;

            case 'currentdate':
            case 'datetime':
                valueSelector = <ValueSelectorDate
                    value={this.props.selected.value}
                    onValueChange={this.onValueChange} />;
                break;

            case 'dynlist':
                valueSelector = <ValueSelectorDynList
                    value={this.props.selected.value}
                    onValueChange={this.onValueChange}
                    attrId={this.props.selected.referenceAttrib.id}
                    dispatcher={this.assetDispatcher}
                    actions={this.assetActions} />;
                break;

            case 'asset':
            case 'assets':
                complexValueSelector = <ComplexValueSelectorRelatedAsset
                    onChange={this.props.onChange}
                    selected={this.props.selected}
                    assetDispatcher={this.assetDispatcher}
                    assetActions={this.assetActions}
                    dispatcher={this.searchByTypeDispatcher}
                    actions={this.searchByTypeActions}
                    level={this.props.level} />
                break;

            case 'place':
                valueSelector = <ValueSelectorPlace
                    value={this.props.selected.value}
                    onValueChange={this.onValueChange}
                    attrId={this.props.selected.referenceAttrib.id}
                    dispatcher={this.assetDispatcher}
                    actions={this.assetActions} />
                break;

            default:
                valueSelector = <ValueSelectorText value={this.props.selected.value}
                    onValueChange={this.onValueChange} />;
        }

        return (
            <div className="table-search__row">
                    <RowActions onDelete={this.onDelete} onMoveUp={this.onMoveUp} onMoveDown={this.onMoveDown} />
                    <div className="table-search__row-item table-search__row-item_type_attr">
                        <ReactSelectize
                            items={this.props.attributes}
                            value={this.props.selected.referenceAttrib.id}
                            onChange={this.onAttrChange}
                            selectId="selectAttr"
                            placeholder="Select attribute"
                            label=" "
                            clearable={false}
                            labelField={'displayName'}
                        />
                    </div>
                    <div className="table-search__row-item table-search__row-item_type_oper">
                        <ReactSelectize
                            items={this.props.selected.operators}
                            value={this.props.selected.operator || 0}
                            onChange={this.onOperChange}
                            selectId="selectOperator"
                            placeholder="Select operator"
                            label=" "
                            clearable={false}
                        />
                    </div>
                    <div className="table-search__row-item table-search__row-item_type_value">
                        {valueSelector}
                    </div>
                    <div className="table-search__row-item table-search__row-item_type_additional">
                        <div className={'connector-container ' + (!this.props.selected.lo ? 'hide' : '')}>
                            <div className="connector">
                               <ReactSelectize
                                    items={logicalOperators}
                                    value={this.props.selected.lo || 1}
                                    onChange={this.onLoChange}
                                    selectId="logicalOperator"
                                    placeholder="Select operator"
                                    label=" "
                                    clearable={false}
                                />
                            </div>
                        </div>
                    </div>

                    {complexValueSelector}

                <div className="table-search__row_separator">
                </div>
            </div>
        );
    }
}
