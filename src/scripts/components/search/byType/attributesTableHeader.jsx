import React from 'react';
import L20nMessage from '../../intl/l20n-message';

export default class AttributesTableHeader extends React.Component {
  render(){
    return (
      <div className="table-search__row table-search__row_header">
        <div className="table-search__row-item table-search__row-item_type_actions">
          &#x23;
        </div>
        <div className="table-search__row-item table-search__row-item_type_attr">
          {L20nMessage('searchColumnAttr', 'Attribute')}
        </div>
        <div className="table-search__row-item table-search__row-item_type_oper">
          {L20nMessage('searchColumnOper', 'Operator')}
        </div>
        <div className="table-search__row-item table-search__row-item_type_value">
          {L20nMessage('searchColumnVal', 'Search value')}
        </div>
        <div className="table-search__row-item table-search__row-item_type_additional">
          {L20nMessage('searchColumnSelect', 'And / Or')}
        </div>
      </div>
    );
  }
}
