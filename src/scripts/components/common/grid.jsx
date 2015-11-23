import React from "react";
import FixedDataTable from 'fixed-data-table';

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

export default class DataGrid extends React.Component {

    state = {
        filterParams: {},
        filteredRows: [],
    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        this.filterRows();
    }

    filterRows() {
        var self = this;
        var filteredRows = self.props.source.slice();
        if (Object.keys(self.state.filterParams).length) {
            Object.keys(self.state.filterParams).forEach(function(name){
                filteredRows = filteredRows.filter(function(row){
                    return row[name].toLowerCase().indexOf(self.state.filterParams[name].toLowerCase()) >= 0
                });
        	});
        }
        this.setState({
            filteredRows: filteredRows
        });
    }

    onFilterChange(dataKey, e) {
        this.state.filterParams[dataKey] = e.target.value;
        this.filterRows();
    }

    rowGetter(rowIndex) {
        return this.state.filteredRows[rowIndex];
    }

    render() {
        var filtering = this.props.filtering;
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
