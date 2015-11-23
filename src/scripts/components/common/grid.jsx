import React from "react";
import FixedDataTable from 'fixed-data-table';

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

export default class DataGrid extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        source: [],
        filterBy: null,
        filteredRows: [],
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            source: nextProps.source,
            filteredRows: nextProps.source
        });
    }

    filterRowsBy(key, filterBy) {
        var rows = this.state.source.slice();
        var filteredRows = filterBy ? rows.filter(function(row){
            return row[key].toLowerCase().indexOf(filterBy.toLowerCase()) >= 0
        }) : rows;

        console.log(filteredRows);

        this.setState({
            filteredRows: filteredRows
        })
    }

    onFilterChange(dataKey, e) {
        this.filterRowsBy(dataKey, e.target.value);
    }

    rowGetter(rowIndex) {
        return this.state.filteredRows[rowIndex];
    }

    render() {
        var filtering = this.props.filtering;
        console.log(this.state.filteredRows.length);
        return (
            <div className="datagrid">
                {filtering
                    ? <div className="datagrid__filter">
                        {this.props.filterFields.map(filterItem =>
                            <div className="datagrid__filter-item" style={{width: filterItem.width ? filterItem.width : 'auto'}}>
                                <label className="input-txt input-txt_width_full">
                                    <input
                                        onChange={this.onFilterChange.bind(this, filterItem.dataKey)}
                                        type="text"
                                        className="input-txt__field"
                                        placeholder={filterItem.label}
                                    />
                                </label>
                            </div>
                        )}
                      </div>
                    : null
                }
                <Table
                    {...this.props}
                    rowGetter={this.rowGetter.bind(this)}
                    rowsCount={this.state.filteredRows.length}
                >
                    {this.props.children.map(item => {
                        //console.log(item.props);
                    })}
                    {this.props.children}
                </Table>
            </div>
        );
    }

}
