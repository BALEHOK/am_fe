import React from 'react';
import L20nMessage from '../../intl/l20n-message';

export default class RowsControls extends React.Component {
    render(){
        return (
            <span className="table-search__rows-controls">
                <span className="table-search__add-row" onClick={this.props.addRow}>
                    <i className="icon icon-plus"></i>
                    {L20nMessage('searchAddRow', 'Add a new row')}
                </span>
                <span className="table-search__add-row icon-stack" onClick={this.props.addOpenParenthesis}>
                    <i className="icon icon-openpar icon-circle"></i>
                    {L20nMessage('searchOpenParenthesis', 'Add open parenthesis')}
                </span>
                <span className="table-search__add-row closepar" onClick={this.props.addClosingParenthesis}>
                    <i className="icon icon-closepar icon-circle"></i>
                    {L20nMessage('searchCloseParenthesis', 'Add closing parenthesis')}
                </span>
            </span>
        );
    }
}
