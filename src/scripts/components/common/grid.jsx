import React from "react";
import FixedDataTable from 'fixed-data-table';
import classNames from 'classnames';

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

export default class DataGrid extends React.Component {

    static defaultProps = {
        source: []
    }

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
        var datagridClasses = classNames({
            'datagrid' : true,
            'datagrid_with_filter' : filtering
        });
        return (
            <div className={datagridClasses}>
                {filtering
                    ? <div className="datagrid__filter">
                        {this.props.filterFields.map(filterItem =>
                            <div className="datagrid__filter-item" style={{width: filterItem.width ? filterItem.width : 'auto'}}>
                                <label className="input-txt input-txt_size_small input-txt_type_third input-txt_width_full">
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
                    headerHeight={this.props.filtering ? this.props.headerHeight + 55 : this.props.headerHeight}
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
