import React from 'react';

export default class RowActions extends React.Component {
    render(){
        return (
            <div className="table-search__row-item table-search__row-item_type_actions">
                <span className="table-search__row-action table-search__row-action_delete" title="Delete"
                    onClick={this.props.onDelete}></span>
                <span className="table-search__row-action table-search__row-action_up" title="Mover up"
                    onClick={this.props.onMoveUp}></span>
                <span className="table-search__row-action table-search__row-action_down" title="Move down"
                    onClick={this.props.onMoveDown}></span>
            </div>
        );
    }
}