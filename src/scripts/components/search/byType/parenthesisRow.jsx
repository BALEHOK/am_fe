import React from 'react';
import ReactSelectize from '../../common/react-selectize';
import L20nMessage from '../../intl/l20n-message';

export default class ParenthesisRow extends React.Component {

    onMoveUp = () => {
        this.props.onMoveUp(this.props.selected.index);
    }

    onMoveDown = () => {
        this.props.onMoveDown(this.props.selected.index);
    }

    onDelete = () => {
        this.props.onDelete(this.props.selected.index);
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
        var showLo = this.props.selected.lo && this.props.selected.parenthesis > 1;

        var logicalOperators = [
            { name: L20nMessage('searchAnd', 'And'), id: 1},
            { name: L20nMessage('searchOr', 'Or'), id: 2}
        ];

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
                    <span className="parenthesis">{this.props.selected.parenthesis == 1 ? '(' : ')'}</span>
                </div>
                <div className="table-search__row-item table-search__row-item_type_oper">
                </div>
                <div className="table-search__row-item table-search__row-item_type_value">
                </div>
                <div className="table-search__row-item table-search__row-item_type_additional">
                    <div className={'connector-container ' + (showLo ? '' : 'hide')}>
                        <div className="connector">
                           <ReactSelectize
                                items={logicalOperators}
                                value={this.props.selected.lo || 1}
                                onChange={this.onLoChange}
                                selectId="logicalOperator"
                                placeholder={L20nMessage('searchSelectOperator', 'Select operator')}
                                label=" "
                                clearable={false}
                            />
                        </div>
                    </div>
                </div>

                <div className="table-search__row_separator">
                </div>
            </div>
        );
    }
}
