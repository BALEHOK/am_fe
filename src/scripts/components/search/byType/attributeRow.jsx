/**
 * @jsx React.DOM
 */

import React from 'react';
import ReactSelectize from '../../common/react-selectize';

export default class AttributeRow extends React.Component {
    constructor(props){
        super(props);
    }

    getOperators(){
        return [
            { name: 'LIKE', id: 1},
            { name: 'EQUAL', id: 2},
            { name: 'OPTION', id: 3}
        ];
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
            id: values[0].id
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

    createNewAttr = (diff) => {
        var newAttr = {
            index: this.props.selected.index,
            id: this.props.selected.id,
            operator: null,
            value: null
        };

        return Object.assign(newAttr, diff);
    }

    render(){
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
                        value={this.props.selected.id}
                        onChange={this.onAttrChange}
                        selectId="selectAttr"
                        placeholder="Select asset"
                        label=" "
                        clearable={false}
                    />
                </div>
                <div className="table-search__row-item table-search__row-item_type_oper">
                    <ReactSelectize
                        items={this.getOperators()}
                        value={this.props.selected.operator || 1}
                        onChange={this.onOperChange}
                        selectId="selectOperator"
                        placeholder="Select asset"
                        label=" "
                        clearable={false}
                    />
                </div>
                <div className="table-search__row-item table-search__row-item_type_value">
                    <label className="input-txt input-txt_width_full">
                        <input type="text" className="input-txt__field" placeholder="Type search value"
                            name="txtValue"/>
                    </label>
                </div>
                <div className="table-search__row-item table-search__row-item_type_additional">

                </div>
            </div>
        );
    }
}