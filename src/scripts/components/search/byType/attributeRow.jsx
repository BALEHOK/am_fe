/**
 * @jsx React.DOM
 */

import React from 'react';
import ReactSelectize from '../../common/react-selectize';

export default class AttributeRow extends React.Component {

    logicalOperators = [
        { name: 'And', id: 1},
        { name: 'Or', id: 2}
    ]

    state = {
        operators: []
    }

    constructor(props){
        super(props);

        this.willUpdateOperators(props);
    }

    componentWillReceiveProps(nextProps) {
        this.willUpdateOperators(nextProps);
    }

    willUpdateOperators(props) {
        var attr = props.attributes.find(a => a.id === props.selected.id);
        attr && props.operators(attr.dataType).then((ops) => {
            this.setState({
                operators: ops
            });
        });
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
        var newAttr = {
            index: this.props.selected.index,
            id: this.props.selected.id,
            operator: null,
            value: null,
            lo: this.props.selected.lo
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
                        placeholder="Select attribute"
                        label=" "
                        clearable={false}
                    />
                </div>
                <div className="table-search__row-item table-search__row-item_type_oper">
                    <ReactSelectize
                        items={this.state.operators}
                        value={this.props.selected.operator || 0}
                        onChange={this.onOperChange}
                        selectId="selectOperator"
                        placeholder="Select operator"
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