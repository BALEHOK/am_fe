var React = require('react');
var Router = require('react-router');
var FixedDataTable = require('fixed-data-table');
var Link = Router.Link;
var Flux = require('delorean').Flux;
var cx = require('classnames');
var FaqItem = require('./faqItem.jsx');
var LoaderMixin = require('../../mixins/LoaderMixin');
var Loader = require('../common/loader.jsx');
var DataGrid = require('../common/grid');
var L20nMessage = require('../intl/l20n-message')

var Column = FixedDataTable.Column;

var FaqAssets = React.createClass({
    mixins:[Flux.mixins.storeListener, LoaderMixin],

    watchStores: ['faq'],

    getInitialState: function() {
        return {
          faqItem: null
        };
    },

    componentDidMount: function() {
        this.waitFor(this.props.actions.loadFaq());
    },

    renderItem: function(item, index) {
        var key = 'faq-item_' + index;
        return (
            <FaqItem title={item.question} content={item.answer} key={key}/>
        )
    },

    faqCellRenderer: function(cellData) {
        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: cellData}}/>
            </div>
        )
    },

    sortNumber: function(a,b) {
        return a - b;
    },

    rowHeightGetter: function(index) {
        if (this.state.loading) {
            return 50;
        } else {
            var tableRef = React.findDOMNode(this.refs.datagrid);
            var tableRows = tableRef.querySelectorAll('.public_fixedDataTable_bodyRow');
            var thisRow = tableRows[index];
            if (thisRow) {
                var cells = thisRow.querySelectorAll('.public_fixedDataTableCell_cellContent');
                var cellHeights = Array.prototype.slice.call(cells).map((cell, index) => {
                    return cell.offsetHeight
                }).sort(this.sortNumber);
                var largestCell = cellHeights[cellHeights.length - 1];
                return largestCell;
            }
        }
    },

    onRowClick: function(event, rowIndex, data) {
        this.setState({
            faqItem: data
        });
    },

    render: function() {
        return (
            <div ref="datagrid">
                <h1 className="page-title">FAQ</h1>
                <Loader loading={this.state.loading}>
                    <div className="grid">
                        <div className="grid__item two-twelfths">
                            {this.state.stores.faq.id
                                ? <Link
                                    className="btn"
                                    to="asset-create-from-type"
                                    params={{assetTypeId: this.state.stores.faq.id}}
                                  >
                                    {L20nMessage('faqNewItem', 'Add FAQ item')}
                                  </Link>
                                : null
                            }
                        </div>
                        <div className="grid__item ten-twelfths">
                            {this.state.faqItem
                                ? <div className="asset-data " style={{marginBottom: '30px'}}>
                                    <div className="asset-data__header">
                                        <span className="asset-data__title">{L20nMessage('faqSelectedItem', 'Selected FAQ item')}</span>
                                    </div>
                                    <div className="asset-data__content">
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">{L20nMessage('faqColumnQeustion', 'Question')}: </span>
                                            <span className="asset-data__param-content">
                                                <div dangerouslySetInnerHTML={{__html: this.state.faqItem.question}}/>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="asset-data__content">
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">{L20nMessage('faqColumnAnswer', 'Answer')}: </span>
                                            <span className="asset-data__param-content">
                                                <div dangerouslySetInnerHTML={{__html: this.state.faqItem.answer}}/>
                                            </span>
                                        </div>
                                    </div>
                                  </div>
                                : null
                            }
                            {this.state.stores.faq.list.length > 0
                                ? <DataGrid
                                    source={this.state.stores.faq.list}
                                    onRowClick={this.onRowClick}
                                    rowHeight={50}
                                    maxHeight={600}
                                    headerHeight={50}
                                    filtering={true}
                                    filterFields={[
                                        {dataKey: 'question', label: 'Question', width: 0.5},
                                        {dataKey: 'answer', label: 'Answer', width: 0.5},
                                    ]}
                                  >
                                    <Column
                                        label={L20nMessage('faqColumnQeustion', 'Question')}
                                        width={0.5}
                                        dataKey="question"
                                        cellRenderer={this.faqCellRenderer}
                                    />
                                    <Column
                                        label={L20nMessage('faqColumnAnswer', 'Answer')}
                                        width={0.5}
                                        dataKey="answer"
                                        cellRenderer={this.faqCellRenderer}
                                    />
                                  </DataGrid>
                                : null
                            }
                        </div>
                    </div>
                </Loader>
            </div>

        );
    }

});

module.exports = FaqAssets;
