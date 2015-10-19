/**
 * @jsx React.DOM
 */

import React from 'react';
import ReactSelectize from '../../common/react-selectize';
import ValueSelectorBool from './valueSelectorBool';
import ValueSelectorText from './valueSelectorText';

export default class AttributeRow extends React.Component {

    logicalOperators = [
        { name: 'And', id: 1},
        { name: 'Or', id: 2}
    ]

    constructor(props){
        super(props);
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

        var newAttr = this.createNewAttr({
            referenceAttrib: values[0],
            operators: [],
            operator: null
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

    render(){
        var valueSelector;
        switch(this.props.selected.referenceAttrib.dataType){
            case 'bool':
                valueSelector = <ValueSelectorBool value={this.props.selected.value}
                    onValueChange={this.onValueChange} />;
                break;
            default:
                valueSelector = <ValueSelectorText value={this.props.selected.value}
                    onValueChange={this.onValueChange} />;
        }      

        return (
            <div className="table-search__row">
                <div className="table-search__row-item table-search__row-item_type_actions">
                    <span className="table-search__row-action table-search__row-action_delete" title="Delete"
                        onClick={this.onDelete}></span>
                    <span className="table-search__row-action table-search__row-action_up" title="Mover up"
                        onClick={this.onMoveUp}></span>
                    <span className="table-search__row-action table-search__row-action_down" title="Move down"
                        onClick={this.onMoveDown}></span>
                </div>
                <div className="table-search__row-item table-search__row-item_type_attr">
                    <ReactSelectize
                        items={this.props.attributes}
                        value={this.props.selected.referenceAttrib.id}
                        onChange={this.onAttrChange}
                        selectId="selectAttr"
                        placeholder="Select attribute"
                        label=" "
                        clearable={false}
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
                                items={this.logicalOperators}
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
            </div>
        );
    }
}