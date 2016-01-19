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
        filteredRows: this.props.source,
        gridMaxHeight: 600,
        gridMaxWidth: 1200,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize.bind(this));
        this.setState({
            gridMaxWidth: React.findDOMNode(this.refs.gridContainer).offsetWidth
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }

    componentWillReceiveProps(nextProps) {
        this.filterRows();
    }

    filterRows() {
        var self = this;
        var filteredRows;;
        if (Object.keys(self.state.filterParams).length) {
            filteredRows = self.props.source.slice();
            Object.keys(self.state.filterParams).forEach(function(name){
                filteredRows = filteredRows.filter(function(row){
                    return row[name].toLowerCase().indexOf(self.state.filterParams[name].toLowerCase()) >= 0
                });
        	});
        } else {
            filteredRows = self.props.source;
        }
        this.setState({
            filteredRows: filteredRows
        });
    }

    onResize() {
		let gridNode = React.findDOMNode(this.refs.gridContainer);
        if (gridNode) {
    		this.setState({
                gridMaxWidth: gridNode.offsetWidth
    		});
        }
	}

    onFilterChange(dataKey, e) {
        this.state.filterParams[dataKey] = e.target.value;
        this.filterRows();
    }

    rowGetter(rowIndex) {
        return this.state.filteredRows[rowIndex];
    }

    renderChildren() {
        var self = this;
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                width: child.props.width * this.state.gridMaxWidth
            })
        });
    }

    render() {
        var filtering = this.props.filtering;
        var datagridClasses = classNames({
            'datagrid' : true,
            'datagrid_with_filter' : filtering,
            'datagrid_click': this.props.onRowClick
        });
        var self = this;
        return (
            <div className={datagridClasses}  ref="gridContainer">
                {filtering
                    ? <div className="datagrid__filter">
                        {this.props.filterFields.map(filterItem =>
                            <div
                                className="datagrid__filter-item"
                                style={
                                    {width: filterItem.width ? filterItem.width * this.state.gridMaxWidth : 'auto'}
                                }
                            >
                                <label className="input-txt input-txt_size_small input-txt_type_third input-txt_width_full">
                                    <input
                                        onChange={this.onFilterChange.bind(this, filterItem.dataKey)}
                                        type="text"
                                        className="input-txt__field"
                                    />
                                </label>
                            </div>
                        )}
                      </div>
                    : null
                }
                <Table
                    {...this.props}
                    width={this.props.width ? this.props.width : this.state.gridMaxWidth}
                    rowGetter={this.rowGetter.bind(this)}
                    rowsCount={this.state.filteredRows.length}
                    headerHeight={this.props.filtering ? this.props.headerHeight + 55 : this.props.headerHeight}
                >
                    {this.renderChildren()}
                </Table>
            </div>
        );
    }

}
