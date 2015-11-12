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
            <ValueSelectorRelatedAsset
                onValueChange={this.props.onValueChange}
                params={params}
                dispatcher={this.props.assetDispatcher}
                actions={this.props.assetActions} />
        );
    }
}