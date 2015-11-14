import React from 'react';
import ParenthesisRow from './parenthesisRow';
import AttributeRow from './attributeRow';
import Consts from './consts';

export default class AttributeRows extends React.Component {

    rowChanged = (attribute) => {
        this.props.actions.changeRow({
            attribute: attribute,
            attributes: this.props.attributes
        });
    }

    rowDeleted = (index) => {
        var attribs = this.state.searchModel.attributes;
        attribs.splice(index, 1);

        if (attribs.length !== 0){

            this.updateRowIndexes(index);

            if (index > 0){
                this.fixLogicalOperator(index - 1);
            }
        }

        this.forceUpdate();
    }

    fixLogicalOperator(index){
        var attribs = this.state.searchModel.attributes;
        var curAttrib = attribs[index];
        // last row has no LO
        if (index === attribs.length - 1){
            curAttrib.lo = Consts.logicalOperators.none;
        }

        // open parenthesis never has LO, skip it
        else if (curAttrib.parenthesis !== Consts.parenthesisType.open){
            // no LO before closing parenthesis
            if (attribs[index + 1].parenthesis === Consts.parenthesisType.closing){
                curAttrib.lo = Consts.logicalOperators.none;
            }
            // ensure there is LO before not closing parenthesis
            else if (curAttrib.lo === Consts.logicalOperators.none){
                curAttrib.lo = Consts.logicalOperators.and;
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
                            onMoveDown={this.rowMoveDown} />);
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