import React from 'react';

export default class AttributesTableHeader extends React.Component {
  render(){
    return (
      <div className="table-search__row table-search__row_header">
        <div className="table-search__row-item table-search__row-item_type_actions">
          &#x23;
        </div>
        <div className="table-search__row-item table-search__row-item_type_attr">
          Attribute
        </div>
        <div className="table-search__row-item table-search__row-item_type_oper">
          Operator
        </div>
        <div className="table-search__row-item table-search__row-item_type_value">
          Search value
        </div>
        <div className="table-search__row-item table-search__row-item_type_additional">
          And / Or
        </div>
      </div>
    );
  }
}