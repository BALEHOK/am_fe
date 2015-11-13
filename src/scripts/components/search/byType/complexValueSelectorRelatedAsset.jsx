import React from 'react';
import ValueSelectorRelatedAsset from './valueSelectorRelatedAsset';

export default class ComplexValueSelectorRelatedAsset extends React.Component {
    render(){
        var params = {
            id: this.props.selected.referenceAttrib.id,
            relatedAssetTypeId: this.props.selected.referenceAttrib.relationId,
            datatype: this.props.selected.referenceAttrib.dataType,
            value: this.props.selected.value || []
        };

        return (
            <div className="table-search__row_complex-value">
                <div className="table-search__row-item table-search__row-item_offset-13">
                </div>
                <div className="table-search__row-item table-search__row-item_complex-value_connector">
                    here will be an arrow
                </div>
                <div className="table-search__row-item table-search__row-item_complex-value">
                    <ValueSelectorRelatedAsset
                        onValueChange={this.props.onValueChange}
                        params={params}
                        dispatcher={this.props.dispatcher}
                        actions={this.props.actions} />
                </div>
            </div>
        );
    }
}