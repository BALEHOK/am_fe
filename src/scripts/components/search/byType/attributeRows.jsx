import React from 'react';
import ParenthesisRow from './parenthesisRow';
import AttributeRow from './attributeRow';
import Consts from '../../../util/searchConsts';

export default class AttributeRows extends React.Component {

    rowChanged = (attribute) => {
        this.props.actions.changeRow({
            attribute: attribute,
            attributes: this.props.attributes
        });
    }

    rowDeleted = (index) => {
        this.props.actions.deleteRow({
            index: index,
            attributes: this.props.attributes
        });
    }

    rowMoveUp = (index) => {
        this.props.actions.moveRowUp({
            index: index,
            attributes: this.props.attributes
        });
    }

    rowMoveDown = (index) => {
        this.props.actions.moveRowDown({
            index: index,
            attributes: this.props.attributes
        });
    }

    render(){
        var attributeRows = [];
        var assetType = this.props.assetType;
        var assetTypeId = assetType ? assetType.id : 0;
        var selectedAttributes = this.props.attributes;
        if (!!assetType && selectedAttributes.length)
        {
            assetTypeId = assetType.id;
            for (var i = 0; i < selectedAttributes.length; i++) {
                var attr = selectedAttributes[i];
                if (attr.parenthesis > Consts.parenthesisType.none){
                    attributeRows.push(
                        <ParenthesisRow
                            selected={attr}
                            onChange={this.rowChanged}
                            onDelete={this.rowDeleted}
                            onMoveUp={this.rowMoveUp}
                            onMoveDown={this.rowMoveDown} />);
                } else {
                    attributeRows.push(
                        <AttributeRow attributes={this.props.allTypeAttribs}
                            selected={attr}
                            onChange={this.rowChanged}
                            onDelete={this.rowDeleted}
                            onMoveUp={this.rowMoveUp}
                            onMoveDown={this.rowMoveDown}
                            level={this.props.level || 1} 
                         />);
                }
            };
        }

        return (
            <div className="table-search__content">
                {attributeRows}
            </div>
        );
    }
}