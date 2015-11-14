import React from 'react';
import Tabs from 'react-simpletabs';
import ValueSelectorRelatedAsset from '../valueSelectors/valueSelectorRelatedAsset';

export default class ComplexValueSelectorRelatedAsset extends React.Component {
    render(){
        var params = {
            id: this.props.selected.referenceAttrib.id,
            relatedAssetTypeId: this.props.selected.referenceAttrib.relationId,
            datatype: this.props.selected.referenceAttrib.dataType,
            value: this.props.selected.value || []
        };

        return (
            <div className="table-search__row-item table-search__row-item_type_inner">
                <Tabs defaultActiveKey={1} animation={false} className="tabs-complex-value">
                    <Tabs.Panel key={1} title="Simple condition">
                        <div className="search-condition">
                            <div className="search-condition__content search-condition__content_simple">
                                <div className="search-condition__row">
                                    <div className="table-search__row-item">
                                        <ValueSelectorRelatedAsset
                                            onValueChange={this.props.onValueChange}
                                            params={params}
                                            dispatcher={this.props.dispatcher}
                                            actions={this.props.actions} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel key={2} title="Advanced condition">
                        <div className="search-condition">
                            <div className="search-condition__content">
                                <div className="search-condition__row">
                                    <div className="table-search__row-item">
                                        <ValueSelectorRelatedAsset
                                            onValueChange={this.props.onValueChange}
                                            params={params}
                                            dispatcher={this.props.dispatcher}
                                            actions={this.props.actions} />
                                    </div>
                                </div>
                                <div className="search-condition__row">
                                    <div className="table-search__row-item">
                                        <ValueSelectorRelatedAsset
                                            onValueChange={this.props.onValueChange}
                                            params={params}
                                            dispatcher={this.props.dispatcher}
                                            actions={this.props.actions} />
                                    </div>
                                </div>
                            </div>
                            <span className="search-condition__add-row">Add a new row</span>
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </div>
        );
    }
}